# SEO Implementation Plan: freetoolonline.com (Phase 2)

**Date:** April 15, 2026
**Based on:** 20+ independent SEO analyses (Claude Opus 4.6, Claude Sonnet 4, Haiku 4.5, GPT-5.2, GPT-5.4 Mini, GPT-4o, Codex 5.2, Kimi K2.5, Cursor Composer, CursorAgent Router, Grok 4.20, and multiple Composer/Auto variants)
**Data sources:** GSC, GA4, AdSense, Semrush, live Playwright crawls, codebase audit, prior implementation plan verification
**Predecessor:** `seo-reports/20260415/IMPLEMENTATION_PLAN.md` (Phase 1)

---

## 1. Executive Summary

Phase 1 of the SEO plan successfully eliminated the three most critical risks: fabricated rating schema, polluted internal UTM links, and missing FAQ structured data. Phase 2 now shifts focus from **crisis mitigation** to **structural optimization** -- fixing the remaining on-page and schema issues that all 20+ analyses unanimously identified as growth bottlenecks.

### Current Performance Snapshot

| Metric | Value | Trend |
|--------|-------|-------|
| Clicks (3 months, GSC) | ~76K | Growing |
| Impressions (3 months, GSC) | ~1.3M | Growing |
| Average CTR | ~5.8% | Down from peak |
| Average Position | ~9.6 | Improved |
| Core Web Vitals | 55/55 Good | Stable |
| Crawl Response Time | 89ms avg | Excellent |
| GA4 Users (30d) | ~37K | +20.4% |
| AdSense Revenue (28d) | ~$106 | -85% vs prior |
| Authority Score (Semrush) | 18-26 | Low |
| Referring Domains | ~31 | Very low |

### Resolved in Phase 1

1. ✅ **Fabricated AggregateRating removed** -- API-backed per-page ratings now live (range 1.6-4.7, credible variance)
2. ✅ **UTM parameters stripped** from all internal links -- clean attribution, no crawl waste
3. ✅ **FAQPage JSON-LD added** -- working on 43/50 tool pages with FAQ HTML content

### Key Opportunities (Phase 2)

1. **Fix heading hierarchy** -- 56/63 pages have duplicate `<h1>` tags, diluting topic signals for every page
2. **Unlock hidden link equity** -- ~500-900 related-tools internal links are JavaScript-only, invisible to crawlers
3. **Strengthen cluster authority** -- Hub pages average 100-200 words and use the wrong schema type, failing to establish topical authority
4. **Improve crawl freshness** -- Sitemaps lack `<lastmod>`, giving Google no signal about content updates
5. **Enable rich navigation snippets** -- No BreadcrumbList schema despite clear Home > Hub > Tool hierarchy

### Overall Strategy

Phase 2 is **structural cleanup with zero layout risk**: fix semantic HTML, complete the structured data layer, and make the existing internal link graph fully visible to crawlers. Every action preserves the current site design and user experience while unlocking SEO signals that are already present but technically hidden.

---

## 1.5 Implementation Status (Carried Forward from Phase 1)

**Last verified:** April 15, 2026 (staging + production deploy + audit)
**Scope:** Staging (`https://dangkhoaow.github.io/freetoolonline-web-test`) + Production (`https://freetoolonline.com`)

**Phase 1 CRITICAL items**
- ✅ Remove Fabricated AggregateRating Schema (API-backed ratings live)
- ✅ Remove UTM Parameters from Internal Links (clean in production)
- ✅ Add FAQPage Structured Data (present on tool pages with FAQ HTML)

**Phase 1 Quick Wins**
- ✅ Remove fake AggregateRating schema
- ✅ Remove UTM params from internal links
- ✅ Fix multiple H1 tags → **Phase 2 item 2.1** (deployed; 56/58 sitemap routes have a single H1)
- ✅ Add FAQPage JSON-LD schema
- ✅ Add `<lastmod>` to sitemaps → **Phase 2 item 2.3** (live `sitemap-tools.xml`, `sitemap-hubs.xml`, `sitemap-pages.xml`)

**Phase 1 HIGH/MEDIUM items still pending**
- ✅ Server-Side Render Related Tools Links → **Phase 2 item 2.4** (SSR list visible in view-source)
- ✅ Add BreadcrumbList Structured Data → **Phase 2 item 2.6** (tool + hub routes verified)
- ⏳ Audit and Fix 4XX Crawl Errors → **Phase 2 item 2.11**
- ⏳ Enrich Content on Top Tool Pages → **Phase 2 item 2.8**
- ⏳ Implement Cross-Cluster Linking → **Phase 2 Optional**

**Phase 2 (Top 3 groups) implementation status**
- ✅ 2.1–2.7 deployed to staging + production; all 58 sitemap routes pass plan checks except two pages missing `<h1>` (see Follow-up).
- ✅ JSON-LD now uses `https://schema.org` for WebApplication/WebSite/BreadcrumbList/CollectionPage.
- ✅ Related Tools SSR confirmed in view-source; client injection guarded to avoid duplicates.

**Follow-up (outside Phase 2 scope)**
- ⏳ Add missing `<h1>` to CMS for `/cong-cu-chuyen-doi-chu-quoc-ngu-tieng-viet-thanh-tieq-viet-kieu-moi.html` and `/do-nong-do-con-truc-tuyen.html`.

---

## 2. Priority Action List

### CRITICAL -- Do Immediately (Protect Rankings)

> **Two-Repo Execution & Rollout Gate**
>
> **Step 1 - Work in `./freetoolonline-web-test`**
> - Apply the change under `freetoolonline-web-test/`
> - Run `npm run export` and validate output artifacts (HTML + sitemaps + JSON-LD)
> - Run a lightweight crawl/verification pass focused on the changed SEO surface
>
> **Step 2 - Roll out to `./freetoolonline-web`**
> - Port the identical patch (no extra refactors)
> - Re-run the same validations (`npm run export` + spot-check affected pages in `dist/`)
> - Deploy + monitor (GSC coverage, structured data, crawl stats)

#### 2.1 Fix Duplicate H1 Tags ✅

| Attribute | Detail |
|-----------|--------|
| **Report consensus** | 20/20+ reports flag (GPT-5.2 confirms 56/63 pages affected via Playwright crawl) |
| **Issue** | Template header renders a navigation `<h1>` for the page name, while CMS content also includes an `<h1>` -- resulting in 2+ H1 tags on 56 of 63 pages. This dilutes topic clarity and confuses snippet selection |
| **Root cause** | `scripts/page-renderer.mjs` lines 59-61 (Kimi K2.5 trace): `renderHeader()` wraps `navPageName` in `<h1>`, and the body content block also contains an `<h1>` at lines 353-355 |
| **Recommended fix** | Change the navigation header `<h1>` to a non-heading element (`<span>`, `<p>`, or `<div>`) with equivalent CSS styling. Keep only the CMS content `<h1>` as the single page heading |
| **Expected SEO impact** | **MEDIUM-HIGH** -- Improves on-page topic clarity and heading hierarchy for 56/63 pages in a single template change. Enables cleaner snippet selection, estimated +2-3% CTR lift |
| **Implementation difficulty** | **LOW** (30 minutes -- one template change + CSS adjustment) |
| **Risk level** | **LOW** -- Semantic improvement only; no visual change if styled correctly |

---

#### 2.2 Fix Invalid Author Meta Tag ✅

| Attribute | Detail |
|-----------|--------|
| **Report consensus** | 15/20+ reports flag |
| **Issue** | Pages use `<meta rel="author">` which is invalid HTML syntax. The `rel` attribute does not exist on `<meta>` elements |
| **Root cause** | `scripts/page-renderer.mjs` line 24 (Kimi K2.5 trace) |
| **Recommended fix** | Replace `<meta rel="author" content="...">` with `<link rel="author" href="...">` or remove entirely if no author URL is available |
| **Expected SEO impact** | **LOW** -- Minor credibility/trust signal cleanup. Eliminates HTML validation errors |
| **Implementation difficulty** | **TRIVIAL** (15 minutes -- single line change) |
| **Risk level** | **LOW** -- No user-facing impact |

---

#### 2.3 Add `<lastmod>` to Sitemaps ✅

| Attribute | Detail |
|-----------|--------|
| **Report consensus** | 18/20+ reports recommend |
| **Issue** | `sitemap-writer.mjs` only generates `<loc>` elements in sitemap XML. Google has no signal about when content was last updated, reducing recrawl prioritization |
| **Root cause** | `buildUrlSetXml()` function in `scripts/sitemap-writer.mjs` (line 33, per Kimi K2.5) omits the `<lastmod>` element |
| **Recommended fix** | Modify `buildUrlSetXml()` to include `<lastmod>` using CMS content file modification timestamps (`fs.statSync(filePath).mtime`). Use ISO 8601 date format (YYYY-MM-DD) |
| **Expected SEO impact** | **MEDIUM** -- Google uses `<lastmod>` to prioritize re-crawling of recently updated content. Improves freshness signal for all 63 URLs |
| **Implementation difficulty** | **LOW** (1-2 hours) |
| **Risk level** | **LOW** -- Additive change to sitemap; no impact on existing URLs |

---

### HIGH PRIORITY -- Do This Week

> **Two-Repo Execution & Rollout Gate**
>
> **Step 1 - Work in `./freetoolonline-web-test`**
> - Apply the change under `freetoolonline-web-test/`
> - Run `npm run export` and validate output artifacts (HTML + sitemaps + JSON-LD)
> - Run a lightweight crawl/verification pass focused on the changed SEO surface
>
> **Step 2 - Roll out to `./freetoolonline-web`**
> - Port the identical patch (no extra refactors)
> - Re-run the same validations (`npm run export` + spot-check affected pages in `dist/`)
> - Deploy + monitor (GSC coverage, structured data, crawl stats)

#### 2.4 Pre-Render Related Tools Links (Server-Side) ✅

| Attribute | Detail |
|-----------|--------|
| **Report consensus** | 20/20+ reports flag as top priority |
| **Issue** | The "Related Tools" section is rendered entirely via client-side JavaScript (`related-tools.js`, 261 lines). Approximately 8-15 internal links per page (~500-900 total) are invisible to static HTML crawlers. Composer analysis confirms ~30% link deficit: 20-30 static links vs 35-45 total with JS |
| **Root cause** | `related-tools.js` runs tag-matching logic in the browser and injects links via `$.html()`. Static HTML crawl sees only nav + footer links |
| **Recommended fix** | During the GitHub Pages build (in `scripts/export-site.mjs` / `scripts/page-renderer.mjs`), generate SSR HTML for the Related Tools section using the same `urlMaps` data and selection logic as `related-tools.js`. Inject the generated `<ul>` directly into `<div class="relatedTools">` and inject the `Tags:` paragraph immediately after it, so the server-rendered DOM matches the post-JS DOM exactly (same markup, same inline styles, same CSS classes). Keep the existing client-side loader as **progressive enhancement only**, guarded so it does not overwrite SSR output when `.relatedTools` is already populated |
| **Expected SEO impact** | **HIGH** -- Single largest internal linking improvement available. Makes ~500-900 cross-links visible to crawlers, significantly improving PageRank distribution across all tool pages |
| **Implementation difficulty** | **MEDIUM** (4-8 hours) |
| **Risk level** | **LOW** -- No layout, UI, or CSS changes; same links and markup, rendered server-side instead of client-side |

**Technical Notes - item 2.4**

- **Requirement:** The GitHub Pages build must generate *the exact same* Related Tools list as `related-tools.js` - same selection rules, same ordering, same `<ul>` markup, same inline styles (e.g., `margin-top: 0px; display: block; padding-inline-start: 40px; list-style-type: disc;`), same `<li class="d-inline">` structure, same green tag links - while preserving current UI/CSS and client behavior.

- **Implementation approach (in `scripts/page-renderer.mjs` or `scripts/export-site.mjs`):**
  1. Import `urlMaps` from the same source used by `related-tools.js` (or parse it from `source/web/.../static/script/related-tools.js` at build time).
  2. Replicate the two-pass selection logic: (a) tag-overlap matching (green links), then (b) title-word matching requiring 2+ overlapping words (blue links).
  3. Build the identical `<ul style="margin-top: 0px;display: block;padding-inline-start: 40px;list-style-type: disc;">...<li class="d-inline">...</li>...</ul>` string and the `<p>Tags: ...</p>` block using the same inline styles.
  4. Inject the `<ul>` as the initial inner HTML of `<div class="relatedTools">` and append the `Tags:` paragraph immediately after the div.
  5. Guard the client loader: before executing `$.html(list)`, check if `.relatedTools` already contains children (i.e., SSR populated it) and skip injection if so, to prevent duplicates and preserve current styling.

- **Non-goals:** No UI changes, no CSS changes, no mock/fallback data.

- **Validation gate:**
  - Pick 5–10 representative tool pages across clusters (e.g., `/zip-file.html`, `/heic-to-jpg.html`, `/json-formatter.html`, `/compress-image.html`, `/pdf-to-word.html`).
  - For each page, compare: (a) SSR-generated Related Tools HTML in `dist/` vs (b) the current `related-tools.js` client output (run via headless browser).
  - Require an exact match: same link count, same `href` values, same order, same `Tags:` block content.

---

#### 2.5 Convert Hub Page Schema to CollectionPage + ItemList ✅

| Attribute | Detail |
|-----------|--------|
| **Report consensus** | 15/20+ reports recommend |
| **Issue** | Hub pages (e.g., `/pdf-tools.html`, `/image-tools.html`) use `WebApplication` schema, which is semantically incorrect. Hub pages are directory/collection pages, not applications |
| **Root cause** | `scripts/page-renderer.mjs` lines 78-95 (Kimi K2.5 trace) applies the same schema logic to both tool pages and hub pages without distinguishing page type |
| **Recommended fix** | Add hub page detection: `const isHubPage = normalizedRoute.endsWith('-tools.html')`. For hubs, generate `CollectionPage` + `ItemList` JSON-LD listing the tools in that cluster. Keep `WebApplication` for individual tool pages |
| **Expected SEO impact** | **MEDIUM** -- Correct schema typing helps Google understand page purpose, potentially enabling rich results for collection/list pages |
| **Implementation difficulty** | **MEDIUM** (4-6 hours -- new JSON-LD builder function + hub detection logic) |
| **Risk level** | **LOW** -- Replaces incorrect schema with correct schema; no user-facing change |

---

#### 2.6 Add BreadcrumbList Structured Data ✅

| Attribute | Detail |
|-----------|--------|
| **Report consensus** | 15/20+ reports recommend |
| **Issue** | The hub-spoke hierarchy (Home > Hub > Tool) exists programmatically in `seo-clusters.mjs` but no `BreadcrumbList` JSON-LD is generated. Navigation breadcrumbs are missing from SERP appearance |
| **Root cause** | Not implemented in `page-renderer.mjs` despite data being available via `resolveHubBacklink()` |
| **Recommended fix** | Generate `BreadcrumbList` JSON-LD using existing cluster data. Tool pages: Home > [Hub Name] > [Tool Name]. Hub pages: Home > [Hub Name]. Home page: omit (single level) |
| **Expected SEO impact** | **MEDIUM** -- Breadcrumb rich snippets improve SERP appearance, navigation context, and click-through rates |
| **Implementation difficulty** | **MEDIUM** (2-3 hours) |
| **Risk level** | **LOW** -- Additive schema; does not modify existing markup |

---

#### 2.7 Standardize JSON-LD @context to HTTPS ✅

| Attribute | Detail |
|-----------|--------|
| **Report consensus** | 10/20+ reports note |
| **Issue** | Some JSON-LD blocks use `"@context": "http://schema.org"` while others use `"https://schema.org"`. Google recommends HTTPS consistently |
| **Root cause** | Inconsistent string literals in `scripts/page-renderer.mjs` across different JSON-LD builder functions |
| **Recommended fix** | Find-and-replace all `http://schema.org` with `https://schema.org` in the page renderer |
| **Expected SEO impact** | **LOW** -- Minor consistency improvement; Google accepts both but HTTPS is canonical |
| **Implementation difficulty** | **TRIVIAL** (15 minutes -- find-and-replace) |
| **Risk level** | **LOW** -- No functional change |

---

### MEDIUM PRIORITY -- Do This Month

#### 2.8 Enrich Hub Page Content (400-600 Words Each) ⏳

| Attribute | Detail |
|-----------|--------|
| **Report consensus** | 18/20+ reports recommend |
| **Issue** | Hub pages average 100-200 words of content -- essentially navigation scaffolding. This makes them vulnerable to the February 2026 Helpful Content Update which targets thin, unhelpful pages |
| **Root cause** | Hub pages were designed as tool directories, not topical authority pages |
| **Recommended fix** | Expand each of the 8 hub pages to 400-600 words with unique intro content: cluster overview, use cases, comparison of tools, tips. Target hubs: ZIP tools, Image tools, PDF tools, Developer tools, Video tools, Device test, Utility tools, Image converter |
| **Expected SEO impact** | **MEDIUM-HIGH** -- Transforms hubs from navigation scaffolding into ranking cluster authority pages. Strengthens E-E-A-T signals for the entire cluster |
| **Implementation difficulty** | **MEDIUM-HIGH** (4-8 hours per hub -- content writing + CMS updates) |
| **Risk level** | **LOW** -- Additive content; existing structure preserved |

---

#### 2.9 Add Hreflang Tags for EN/VI Pairs ⏳

| Attribute | Detail |
|-----------|--------|
| **Report consensus** | 12/20+ reports recommend |
| **Issue** | Vietnamese pages exist but lack reciprocal `hreflang` tags. English pages don't reference Vietnamese alternates, causing potential language signal dilution |
| **Root cause** | Not implemented in `page-renderer.mjs`; only `en-us` present |
| **Recommended fix** | Implement proper reciprocal `hreflang` tags: English pages get `<link rel="alternate" hreflang="vi" href="...">` and Vietnamese pages get `<link rel="alternate" hreflang="en" href="...">`. Both include `x-default` pointing to English |
| **Expected SEO impact** | **MEDIUM** -- Proper international targeting reduces duplicate content risk and improves ranking in Vietnamese search results |
| **Implementation difficulty** | **MEDIUM** (3-5 hours -- mapping EN/VI URL pairs + template changes) |
| **Risk level** | **LOW** -- Additive meta tags; no content changes |

---

#### 2.10 Optimize Meta Descriptions for Top Pages ⏳

| Attribute | Detail |
|-----------|--------|
| **Report consensus** | 12/20+ reports recommend |
| **Issue** | Current meta descriptions average ~103 characters across all pages. Best practice is 140-160 characters for maximum SERP real estate. Top-impression pages (`/zip-file.html`, `/remove-zip-password.html`, `/md5-converter.html`, `/heic-to-jpg.html`) have the most to gain |
| **Root cause** | CMS content descriptions were written short; no length optimization was applied |
| **Recommended fix** | Rewrite meta descriptions for the top 20 pages by impression volume. Include primary keyword, value proposition, and call-to-action within 140-160 characters |
| **Expected SEO impact** | **MEDIUM** -- Better descriptions improve CTR from search results. At 1.3M impressions/3mo, even a 0.5% CTR improvement = ~2,000 additional clicks per quarter |
| **Implementation difficulty** | **LOW** (2-3 hours -- content writing in CMS) |
| **Risk level** | **LOW** -- No structural changes |

---

#### 2.11 Audit and Fix 4XX Crawl Errors ⏳

| Attribute | Detail |
|-----------|--------|
| **Report consensus** | 12/20+ reports mention |
| **Issue** | ~6% of crawl requests (approximately 421 per GSC data) return 4XX errors -- wasted crawl budget and lost link equity from external links to old URLs |
| **Root cause** | Missing alias routes for renamed/removed URLs in `site-data.mjs` |
| **Recommended fix** | (1) Check GSC > Indexing > Pages for specific 4XX URLs. (2) Add new entries to `ALIAS_ROUTES` in `scripts/site-data.mjs` for URLs that should redirect. (3) Create a custom `404.html` page to guide users to popular tools |
| **Expected SEO impact** | **MEDIUM** -- Recovers wasted crawl budget and potentially recaptures traffic from external links to old URLs |
| **Implementation difficulty** | **MEDIUM** (2-4 hours for investigation + fixes) |
| **Risk level** | **LOW** |

---

## 3. Quick Wins (High Impact - Low Effort)

These items are the fastest, safest changes with the highest immediate ROI:

| # | Action | Time | Impact | File(s) to Change |
|---|--------|------|--------|-------------------|
| 1 | ✅ Fix duplicate H1 tags | 30 min | Heading hierarchy for 56/63 pages | `scripts/page-renderer.mjs` |
| 2 | ✅ Fix invalid author meta tag | 15 min | HTML validation cleanup | `scripts/page-renderer.mjs` |
| 3 | ✅ Add `<lastmod>` to sitemaps | 1-2 hrs | Crawl freshness signals for 63 URLs | `scripts/sitemap-writer.mjs` |
| 4 | ✅ Standardize `@context` to HTTPS | 15 min | JSON-LD consistency | `scripts/page-renderer.mjs` |
| 5 | ✅ Add BreadcrumbList JSON-LD | 2-3 hrs | Rich breadcrumb snippets in SERP | `scripts/page-renderer.mjs` |

**Estimated total for all quick wins: ~4-6 hours**
**Expected outcome: Clean heading hierarchy sitewide, proper meta tags, improved sitemap signals, breadcrumb rich snippets enabled (completed in staging + production).**

> **Staging-first gate:** Every item in this table follows the same two-repo rollout - implement in `freetoolonline-web-test` → validate (`npm run export` + spot-check) → port identical change to `freetoolonline-web` → validate + deploy. Quick Wins do not bypass the `web-test` safety step.

---

## 4. Optional Next Steps

These are lower-priority improvements to consider after completing the items above:

### Content & Growth

| Action | Effort | Notes |
|--------|--------|-------|
| Diversify traffic beyond ZIP cluster (60% concentration) | Ongoing | Business risk -- one algorithm shift affects majority of traffic and revenue |
| Implement real user review system | HIGH (weeks) | Strengthens `aggregateRating` credibility beyond API-backed values |
| Generate tool-specific OG images during build | 4-8 hrs | Improves social sharing CTR (currently all pages use the same generic logo) |
| Create a blog/educational content section | Ongoing | Captures upper-funnel informational queries |
| Build backlinks (currently only ~31 referring domains) | Ongoing | Authority Score 18-26 is low for the niche |
| Implement cross-cluster linking for bridge tools | 3-4 hrs | `/images-to-pdf.html` <-> `/image-tools.html`, `/pdf-to-images.html` <-> `/image-converter-tools.html` |

### Technical Cleanup

| Action | Effort | Notes |
|--------|--------|-------|
| Separate Vietnamese pages into `/vi/` subdirectory | 2-4 hrs | Fixes language signal dilution in the English utility cluster |
| Create custom `404.html` page | 1-2 hrs | GitHub Pages supports this; guides users to popular tools |
| Remove `user-scalable=no` from viewport meta | 5 min | Accessibility improvement (flagged by multiple reports) |
| Remove ineffective `http-equiv` cache meta tags | 15 min | Legacy code; browsers/CDNs ignore these meta cache directives |
| Unify related-tools tag system with SEO clusters | 3-4 hrs | Two competing classification systems currently exist |
| Optimize meta titles for top ZIP queries | 2-3 hrs | Align with GSC top queries for CTR lift |
| Add HowTo structured data for step-by-step tool pages | 3-4 hrs | Additional SERP real estate via step-by-step rich results |
| Audit AdSense policy and CPC trends | 1-2 hrs | Revenue collapsed -85% despite +20% traffic growth -- investigate ad category restrictions and query CPC mix |
| Monitor Mobile CWV trends | Ongoing | One report (Claude Sonnet 4) flagged potential mobile regression -- contradicted by GSC 55/55 Good data, but worth monitoring |

---

## 5. Files Reference

> **Dual-repo convention:** All relative paths below apply **first** to `freetoolonline-web-test/<path>` (staging) and **then**, after staging validation passes, to `freetoolonline-web/<path>` (production). Never edit `freetoolonline-web/` directly without a green staging run.

| File | Path (relative to package root) | Role |
|------|------|------|
| `page-renderer.mjs` | `scripts/page-renderer.mjs` | Meta tags, JSON-LD, H1, page layout -- **most changes here** |
| `seo-clusters.mjs` | `scripts/seo-clusters.mjs` | Content cluster definitions, hub backlinks, breadcrumb data |
| `sitemap-writer.mjs` | `scripts/sitemap-writer.mjs` | Sitemap generation -- add `<lastmod>` |
| `site-data.mjs` | `scripts/site-data.mjs` | Route definitions, alias redirects for 4XX fixes |
| `export-site.mjs` | `scripts/export-site.mjs` | Main build script, static HTML generation, SSR entry point |
| `related-tools.js` | `source/web/.../static/script/related-tools.js` | Client-side related tools (to be pre-rendered server-side) |
| `footer.html` | `source/static/.../view/footer.html` | Footer template |
| `l-menu.html` | `source/static/.../view/l-menu.html` | Left sidebar navigation |
| `extended-js-third-party.html` | `source/static/.../view/extended-js-third-party.html` | Legacy UA tracking code |

---

*Synthesized from 20+ independent SEO analyses conducted on April 15, 2026.*
*Phase 2 builds on completed Phase 1 fixes. All recommendations prioritize high-impact, low-risk actions that preserve the existing site structure and user experience.*
