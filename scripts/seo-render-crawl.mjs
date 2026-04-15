import { execFile as execFileCb } from 'node:child_process';
import { promisify } from 'node:util';

const execFile = promisify(execFileCb);

const ORIGIN = process.env.SEO_ORIGIN?.trim() || 'https://freetoolonline.com';
const CHROME =
  process.env.CHROME_PATH?.trim() ||
  String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`;
const CURL = process.env.CURL_EXE?.trim() || 'curl.exe';

const CONCURRENCY = Number.parseInt(process.env.SEO_CONCURRENCY || '2', 10);
const VIRTUAL_TIME_BUDGET_MS = Number.parseInt(
  process.env.SEO_VIRTUAL_TIME_BUDGET_MS || '3000',
  10
);
const RENDER_TIMEOUT_MS = Number.parseInt(
  process.env.SEO_RENDER_TIMEOUT_MS || '60000',
  10
);
const MAX_BUFFER = Number.parseInt(
  process.env.SEO_MAX_BUFFER_BYTES || String(80 * 1024 * 1024),
  10
);
const SITEMAP_FETCH_TIMEOUT_S =
  process.env.SEO_SITEMAP_FETCH_TIMEOUT_S?.trim() || '30';

function uniq(items) {
  return [...new Set(items)];
}

function normalizeUrl(url) {
  try {
    const u = new URL(url);
    u.hash = '';
    // Drop query (UTM/noads/etc) since canonicals are query-less.
    u.search = '';
    const normalized = `${u.origin}${u.pathname}`;
    return u.pathname === '/' && normalized.endsWith('/') ? u.origin : normalized;
  } catch {
    return String(url);
  }
}

async function curlGetText(url) {
  const { stdout } = await execFile(
    CURL,
    ['--ssl-no-revoke', '-L', '--max-time', SITEMAP_FETCH_TIMEOUT_S, url],
    { maxBuffer: 10 * 1024 * 1024 }
  );
  return stdout;
}

async function curlPerf(url) {
  const format =
    '%{http_code} %{time_starttransfer} %{time_total} %{size_download} %{url_effective}';
  const { stdout } = await execFile(
    CURL,
    ['--ssl-no-revoke', '-L', '-s', '-o', 'NUL', '-w', format, url],
    { maxBuffer: 1024 * 1024 }
  );
  const parts = stdout.trim().split(' ');
  const [httpCode, ttfb, total, bytes] = parts;
  return {
    url,
    httpCode,
    ttfbSec: Number(ttfb),
    totalSec: Number(total),
    bytes: Number(bytes),
  };
}

function extractLocs(xml) {
  return Array.from(String(xml).matchAll(/<loc>([^<]+)<\/loc>/gi)).map((m) =>
    m[1].trim()
  );
}

async function loadSitemapUrls() {
  const robotsTxt = await curlGetText(`${ORIGIN}/robots.txt`);
  const robotsSitemap =
    /Sitemap:\s*(\S+)/i.exec(robotsTxt)?.[1] || `${ORIGIN}/sitemap.xml`;

  const indexXml = await curlGetText(robotsSitemap);
  const subSitemaps = extractLocs(indexXml);

  const locs = [];
  for (const sitemapUrl of subSitemaps) {
    const xml = await curlGetText(sitemapUrl);
    locs.push(...extractLocs(xml));
  }

  const urls = uniq(locs.map(normalizeUrl))
    .filter((u) => u.startsWith(ORIGIN))
    .sort();

  return { robotsSitemap, subSitemaps, urls };
}

function stripTags(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractAll(html, regex, limit = 50) {
  const out = [];
  for (const match of String(html).matchAll(regex)) {
    out.push(match);
    if (out.length >= limit) break;
  }
  return out;
}

function parseJsonLdTypes(html) {
  const scripts = extractAll(
    html,
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    5
  );
  const types = [];
  let hasAggregateRating = false;

  for (const m of scripts) {
    const raw = (m[1] || '').trim();
    if (!raw) continue;
    try {
      const json = JSON.parse(raw);
      const nodes = Array.isArray(json) ? json : [json];
      for (const node of nodes) {
        const type = node?.['@type'];
        if (type) types.push(String(type));
        if (node?.aggregateRating) hasAggregateRating = true;
      }
    } catch {
      // Ignore invalid JSON.
    }
  }

  return { types: uniq(types), hasAggregateRating };
}

function parsePage(html, url) {
  const title =
    (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1]?.trim() || '';
  const description =
    (html.match(
      /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i
    ) || [])[1]?.trim() || '';
  const robots =
    (html.match(
      /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i
    ) || [])[1]?.trim() || '';
  const canonical =
    (html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i) || [])[1]?.trim() ||
    '';
  const hreflang =
    (html.match(
      /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*>/i
    ) || [])[1]?.trim() || '';
  const lang =
    (html.match(/<html[^>]*lang="([^"]+)"/i) || [])[1]?.trim() || '';

  const h1s = extractAll(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi, 5)
    .map((m) => stripTags(m[1]))
    .filter(Boolean);
  const h2Count = (html.match(/<h2\b/gi) || []).length;

  const scriptCount = extractAll(
    html,
    /<script\b[^>]*src="[^"]+"[^>]*>/gi,
    300
  ).length;
  const cssCount = extractAll(
    html,
    /<link\b[^>]*rel="stylesheet"[^>]*href="[^"]+"[^>]*>/gi,
    100
  ).length;

  const aHrefs = extractAll(html, /<a\b[^>]*href="([^"]+)"[^>]*>/gi, 500).map(
    (m) => m[1]
  );
  const internalLinks = uniq(
    aHrefs
      .map((href) => {
        if (!href) return '';
        if (href.startsWith('#')) return '';
        if (
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          href.startsWith('javascript:')
        ) {
          return '';
        }
        if (href.startsWith('/')) return normalizeUrl(`${ORIGIN}${href}`);
        if (href.startsWith(ORIGIN)) return normalizeUrl(href);
        return '';
      })
      .filter(Boolean)
  );

  const hasSeoRelatedBlock = html.includes('SEO_BLOCK:RELATED_TOOLS');
  const hasFaqBlock = /Frequently Asked Questions|class="[^"]*faq[^"]*"/i.test(
    html
  );
  const hasLastUpdated =
    /<time\b[^>]*itemprop="dateUpdated"/i.test(html) ||
    /Last updated:/i.test(html);
  const { types: jsonLdTypes, hasAggregateRating } = parseJsonLdTypes(html);

  const visibleTextChars = stripTags(html).length;

  return {
    url,
    title,
    description,
    robots,
    canonical,
    hreflang,
    lang,
    h1Count: h1s.length,
    h1s,
    h2Count,
    scriptCount,
    cssCount,
    internalLinkCount: internalLinks.length,
    hasSeoRelatedBlock,
    hasFaqBlock,
    hasLastUpdated,
    jsonLdTypes,
    hasAggregateRating,
    visibleTextChars,
  };
}

async function renderDom(url) {
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-default-apps',
    '--disable-sync',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--metrics-recording-only',
    '--safebrowsing-disable-auto-update',
    '--disable-popup-blocking',
    '--disable-features=TranslateUI',
    '--blink-settings=imagesEnabled=false',
    '--dump-dom',
    `--virtual-time-budget=${VIRTUAL_TIME_BUDGET_MS}`,
    url,
  ];

  const { stdout } = await execFile(CHROME, args, {
    timeout: RENDER_TIMEOUT_MS,
    maxBuffer: MAX_BUFFER,
  });
  return stdout;
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const poolSize = Math.max(1, Math.min(limit, items.length));

  const runners = new Array(poolSize).fill(0).map(async () => {
    while (true) {
      const idx = nextIndex++;
      if (idx >= items.length) return;
      results[idx] = await worker(items[idx], idx);
    }
  });

  await Promise.all(runners);
  return results;
}

function summarize(ok) {
  const byTitle = new Map();
  const byCanonical = new Map();

  const multiH1 = [];
  const missingDesc = [];
  const missingCanon = [];
  const nonEn = [];
  const hasNoindex = [];
  const noLastUpdated = [];
  const noFaq = [];
  const aggregateRatingPages = [];

  for (const r of ok) {
    if (r.title) {
      const key = r.title.toLowerCase();
      byTitle.set(key, (byTitle.get(key) || []).concat([r.url]));
    }
    if (r.canonical) {
      const key = r.canonical.toLowerCase();
      byCanonical.set(key, (byCanonical.get(key) || []).concat([r.url]));
    }

    if (r.h1Count > 1) multiH1.push(r.url);
    if (!r.description) missingDesc.push(r.url);
    if (!r.canonical) missingCanon.push(r.url);
    if (
      r.lang &&
      r.lang.toLowerCase() !== 'en' &&
      r.lang.toLowerCase() !== 'en-us' &&
      r.lang.toLowerCase() !== 'en_us'
    ) {
      nonEn.push({ url: r.url, lang: r.lang });
    }
    if (/noindex/i.test(r.robots || ''))
      hasNoindex.push({ url: r.url, robots: r.robots });
    if (!r.hasLastUpdated) noLastUpdated.push(r.url);
    if (!r.hasFaqBlock && r.url !== ORIGIN) noFaq.push(r.url);
    if (r.hasAggregateRating) aggregateRatingPages.push(r.url);
  }

  const duplicateTitles = [];
  for (const [title, urls] of byTitle.entries()) {
    if (urls.length > 1)
      duplicateTitles.push({ title, count: urls.length, urls: urls.slice(0, 6) });
  }
  duplicateTitles.sort((a, b) => b.count - a.count);

  const duplicateCanonicals = [];
  for (const [canonical, urls] of byCanonical.entries()) {
    if (urls.length > 1)
      duplicateCanonicals.push({
        canonical,
        count: urls.length,
        urls: urls.slice(0, 6),
      });
  }
  duplicateCanonicals.sort((a, b) => b.count - a.count);

  return {
    pagesCrawled: ok.length,
    multiH1Count: multiH1.length,
    missingDescriptionCount: missingDesc.length,
    missingCanonicalCount: missingCanon.length,
    nonEnCount: nonEn.length,
    noindexCount: hasNoindex.length,
    noLastUpdatedCount: noLastUpdated.length,
    noFaqCount: noFaq.length,
    aggregateRatingCount: aggregateRatingPages.length,
    examples: {
      multiH1: multiH1.slice(0, 10),
      missingDescription: missingDesc.slice(0, 10),
      missingCanonical: missingCanon.slice(0, 10),
      nonEn: nonEn.slice(0, 10),
      noindex: hasNoindex.slice(0, 10),
      noLastUpdated: noLastUpdated.slice(0, 10),
      noFaq: noFaq.slice(0, 10),
      aggregateRatingPages: aggregateRatingPages.slice(0, 10),
      duplicateTitles: duplicateTitles.slice(0, 10),
      duplicateCanonicals: duplicateCanonicals.slice(0, 10),
    },
  };
}

async function main() {
  const { robotsSitemap, subSitemaps, urls } = await loadSitemapUrls();
  console.log(
    JSON.stringify(
      { phase: 'seed', robotsSitemap, subSitemaps, urlCount: urls.length },
      null,
      2
    )
  );

  const results = await mapLimit(urls, CONCURRENCY, async (url) => {
    try {
      const dom = await renderDom(url);
      return parsePage(dom, url);
    } catch (e) {
      return { url, error: String(e?.message || e) };
    }
  });

  const ok = results.filter((r) => !r.error);
  const failed = results.filter((r) => r.error);
  const summary = summarize(ok);

  const perfSampleUrls = [
    ORIGIN,
    `${ORIGIN}/zip-file.html`,
    `${ORIGIN}/remove-zip-password.html`,
    `${ORIGIN}/md5-converter.html`,
    `${ORIGIN}/lcd-test.html`,
    `${ORIGIN}/camera-test.html`,
    `${ORIGIN}/zip-tools.html`,
  ];

  const perfSample = [];
  for (const u of perfSampleUrls) {
    try {
      perfSample.push(await curlPerf(u));
    } catch (e) {
      perfSample.push({ url: u, error: String(e?.message || e) });
    }
  }

  const topInternalLinkPages = ok
    .slice()
    .sort((a, b) => b.internalLinkCount - a.internalLinkCount)
    .slice(0, 10)
    .map((r) => ({
      url: r.url,
      internalLinkCount: r.internalLinkCount,
      scriptCount: r.scriptCount,
      h1Count: r.h1Count,
    }));

  console.log(
    JSON.stringify(
      {
        phase: 'results',
        crawledOk: ok.length,
        crawledFailed: failed.length,
        failed: failed.slice(0, 15),
        summary,
        perfSample,
        topInternalLinkPages,
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

