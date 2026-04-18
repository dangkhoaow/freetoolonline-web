# SEO & holistic site analysis - freetoolonline.com

**Analyst lens:** Principal SEO (20+ years), 2026 search ecosystem  
**Primary domain:** [https://freetoolonline.com](https://freetoolonline.com)  
**Local analysis timestamp (GMT+7):** `20260415205023`  
**Model tag:** `Cursor_Composer_Auto`

**Verification methods (this run)**

| Method | Purpose |
|--------|---------|
| **`curl -sS -L`** | `robots.txt`, sitemap index, sub-sitemaps, TTFB line |
| **Node `fetch()`** | Same XML as secondary path (no `wget` on this host) |
| **Playwright Chromium** | Full **63/63** sitemap URLs; `domcontentloaded` + **1800 ms** settle; `page.content()` for rendered DOM (headings, JSON-LD) |

**Bundled analytics context (`./seo-reports/20260415-2/raw/`):**  
The workspace snapshot did **not** include raster/PDF exports from that folder; themes below for **GA4, AdSense, Semrush, and GSC** are **triangulated** from the consolidated internal summary [`ANALYSIS_SUMMARY.md`](./ANALYSIS_SUMMARY.md) (dated 2026-04-15) and aligned with live crawl + codebase review. Where a KPI is cited, treat it as **reported in that summary** unless you re-export dashboards.

---

## 1. Executive Summary

**freetoolonline.com** is a **static-export** tool site (GitHub Pages–oriented build in `freetoolonline-web`) with a **hub → tool** architecture, **split XML sitemaps**, **canonical + JSON-LD** in the export pipeline (`scripts/page-renderer.mjs`, `scripts/export-site.mjs`), and **strong lab-style load behavior** in headless Chromium (median full navigation ~**2.1 s** including intentional post-load wait).

**What is working well**

- **Performance:** Rendered-page timings are tight and consistent (min **2037 ms**, median **2120 ms**, p90 **2200 ms**, max **2565 ms** for domcontentloaded + 1.8 s - includes artificial wait). This matches the **“excellent CWV / fast TTFB”** narrative in the internal GSC-themed summary.
- **Structured data coverage:** Live DOM shows **`WebApplication`** on **58** URLs, **`FAQPage`** on **43** (paired with tools that ship FAQ HTML), **`WebSite`** on the remaining **5** “info” style URLs - consistent with `buildWebApplicationJsonLd` / `buildFaqJsonLd` / `buildWebSiteJsonLd` in `page-renderer.mjs`.
- **Spam-risk reduction:** `aggregateRating` is **not** hardcoded sitewide; the exporter can call the rating API (`loadAggregateRating` in `export-site.mjs`), which is the right direction for **March 2026 spam update** resilience *if* visible UI and JSON-LD stay aligned.
- **Cluster logic:** Eight topical groups are **explicitly defined** in `scripts/seo-clusters.mjs` (hub route + member tools) - good **internal modeling** for related-tool and hub backlinks.

**Highest-impact gaps**

1. **Heading semantics:** **56 / 63** URLs show **more than one `<h1>`** in the rendered DOM (Playwright). That pattern usually **splits** the primary topic signal (snippets, accessibility, some quality heuristics).
2. **Hub / collection schema:** Hubs still emit **`WebApplication`** JSON-LD (e.g. `/zip-tools.html`) - semantically weaker than **`CollectionPage` + `ItemList`** for category pages (see `page-renderer.mjs` hub detection via `isHubPage` / `endsWith('-tools.html')`).
3. **Internal discovery of related tools:** Related tools are injected behind **`SEO_BLOCK:RELATED_TOOLS`** and **`related-tools.js`** - crawlers that weight **first HTML** see fewer contextual links than users see after JS.
4. **Sitemap freshness:** Live `sitemap-*.xml` **omits `<lastmod>`** (verified via `curl`), while `sitemap-writer.mjs` **can** emit `lastmod` when CMS file mtimes resolve - production may be an older build or CMS paths not resolving at publish time.
5. **Business / monetization pressure (from bundled-summary themes):** **AdSense revenue** and **query mix** stress are called out in [`ANALYSIS_SUMMARY.md`](./ANALYSIS_SUMMARY.md); **February 2026 Discover update** quality bar reinforces **thin or ad-first** experiences as risky for **Discover**, not only blue-link SEO.

---

## 2. Detailed Analysis

### 2.1 Technical SEO

| Topic | Finding | Evidence |
|--------|---------|----------|
| **robots.txt** | Allows crawl; declares sitemap | `curl` → HTTP **200**; `Sitemap: https://freetoolonline.com/sitemap.xml` |
| **Sitemap index** | Valid; **3** child sitemaps | `/sitemap.xml` → `sitemap-tools.xml`, `sitemap-hubs.xml`, `sitemap-pages.xml` |
| **URL counts** | **50 + 8 + 5 = 63** | `grep -c '<loc>'` per child file |
| **Validity** | Well-formed XML | Parsed from live responses |
| **`<lastmod>`** | **Absent** on live child sitemaps | `curl` first lines show `<loc>` only; generator supports lastmod in `sitemap-writer.mjs` |
| **Canonical** | Emitted per page | `renderMetaTags` → `<link rel="canonical" href="...">` in `page-renderer.mjs` |
| **hreflang** | Single `alternate` with `hreflang` per page | Same function - **not** a full EN/VI matrix |
| **JSON-LD** | `WebSite` / `WebApplication` / `FAQPage` | Parsed from rendered HTML; `@context` uses **`http://schema.org/`** in code - minor consistency opportunity vs `https` |
| **Meta author** | **Invalid pattern** | `<meta rel="author" ...>` should be `<link rel="author" ...>` per HTML5 |
| **Cache headers** | Aggressive `no-cache` meta | May interact with CDN/browser caching strategy |
| **Ratings** | Conditional `aggregateRating` | `export-site.mjs` + `buildWebApplicationJsonLd`; omit when API invalid |

**Playwright crawl (this run)**

- **63 / 63** URLs **OK**, **0** failures.  
- **Duplicate `<h1>`:** **56** pages with `h1Count > 1`.  
- **JSON-LD types (counts across crawled pages):** `WebApplication` **58**, `FAQPage` **43**, standalone `WebSite` **5** (home, about, contact, privacy, tags pattern).

### 2.2 Content

| Dimension | Assessment |
|-----------|------------|
| **Tool pages** | Generally **strong**: FAQs drive **`FAQPage`** markup when `extractFaqItems` succeeds (`page-renderer.mjs`). |
| **Hub pages** | Often **thin** vs best-practice pillar depth (internal summaries flag ~100–300 words); limits **topical authority** for clusters. |
| **Homepage** | Title pattern **"Home Page - Free Tool Online"** under-uses commercial/utility keywords (prior analyses and CMS copy). |
| **Vietnamese / niche tools** | Dedicated routes (e.g. Tiếq Việt converter, Đo nồng độ cồn) - good **long-tail** coverage; ensure **one H1** and consistent language meta. |

### 2.3 Site structure

- **Information architecture:** **Hubs** (`*-tools.html`) → **tools** (`*.html`) + **info** routes (`/`, `/about-us.html`, etc.).  
- **Internal links:** Global nav + footer are **static HTML**; **related tools** load after **`DOMContentLoaded`** (`renderToolSections` in `page-renderer.mjs`).  
- **Aliases:** `ALIAS_ROUTES` in `site-data.mjs` consolidates legacy URLs - good for consolidation; monitor GSC for **404** noise on old paths.

### 2.4 Clustering strategy

**Implemented in code (`seo-clusters.mjs`):**

| Cluster key | Hub | Example member routes |
|-------------|-----|------------------------|
| `zip` | `/zip-tools.html` | `zip-file`, `unzip-file`, `remove-zip-password` |
| `image-editing` | `/image-tools.html` | compress, resize, crop, photo-editor, … |
| `image-conversion` | `/image-converter-tools.html` | heic-to-jpg, svg-to-png, … |
| `pdf` | `/pdf-tools.html` | compose, split, merge, protect, … |
| `developer` | `/developer-tools.html` | json-parser, minifiers, md5, … |
| `video` | `/video-tools.html` | video-converter, ffmpeg, video-maker |
| `device-test` | `/device-test-tools.html` | mic, camera, lcd, keyboard tests |
| `utility` | `/utility-tools.html` | time converters, QR, locale-specific utilities |

**SEO evaluation**

- **Strength:** Clusters are **first-class data**, driving hub backlinks via `resolveHubBacklink`.  
- **Gap:** **Topical clusters** are not fully **expressed in schema** (no `BreadcrumbList`, hubs not `CollectionPage`). **Thin hub copy** limits how much **entity + intent** Google can associate with each pillar.

---

## 3. Impact of Google Core Updates

Official incident pages (fetched 2026-04-15):

1. **[March 2026 spam update](https://status.search.google.com/incidents/VbnSXAH4SmEcxPtx4YSD)**  
   - **Window:** 2026-03-24 12:00 – 2026-03-25 07:30 US/Pacific; **global**, all languages.  
   - **Relevance:** Targets **spam** and **manipulation** (includes misleading / low-trust patterns).  
   - **Site tie-in:** The prior **uniform fake `aggregateRating`** pattern (historical) was exactly the class of **structured-data spam** this update family punishes. **Current** API-backed ratings + omission on failure are **directionally correct**. Residual risk = **mismatch** between JSON-LD and visible reviews, or **low-volume** counts that look **synthetic**.

2. **[February 2026 Discover core update](https://status.search.google.com/incidents/mYbNTqV1ytDc2fA8hUz4)**  
   - **Window:** 2026-02-05 – 2026-02-27 US/Pacific; **English US** Discover first.  
   - **Relevance:** Emphasizes **overall Discover quality** (not only traditional SEO).  
   - **Site tie-in:** **Thin hubs**, **ad-heavy** tool pages, and **duplicate H1** / template feel can cap **Discover** eligibility even when blue-link SEO is fine. Aligns with **AdSense / engagement** stress noted in internal summaries.

**Coherent reasoning chain:** Fast **CWV** + clean crawl path **support** technical trust. **March spam** update pressures **honest reviews and schema**. **Discover** update pressures **content depth and satisfaction** on high-impression templates. Together they push this site toward **fewer template artifacts** (duplicate H1, thin hubs) and **provable** quality signals (real ratings, visible FAQ, substantive intros).

---

## 4. Key Issues (Root Causes)

| Issue | Root cause (code / ops) | Why it hurts SEO |
|-------|-------------------------|------------------|
| **Multiple `<h1>`** | Header + body both expose **top-level** headings in many templates (`renderHeader` + body titles) | Dilutes **primary topic**; accessibility; may affect snippet choice |
| **Hub `WebApplication` schema** | `buildWebApplicationJsonLd` used for hub routes when `showAds` true (`page-renderer.mjs`) | Mismatched **entity type** vs **collection** intent |
| **Related tools mostly post-JS** | `loadRelatedTools` after `DOMContentLoaded` (`renderToolSections`) | Less anchor text / link equity in **raw HTML** |
| **Missing `<lastmod>` in live XML** | Deployed sitemaps don’t include tags the generator can produce (`sitemap-writer.mjs`) | Weaker **freshness** hints vs competitors |
| **Invalid author meta** | `<meta rel="author">` in `renderMetaTags` | Parser ignores; missed **authorship** signal |
| **Mixed schema.org HTTP/HTTPS** | `'@context': 'http://schema.org/'` | Minor; prefer **https** everywhere |
| **Traffic / revenue concentration** | Few ZIP / utility URLs drive outsized clicks (per internal GSC-themed summary) | **Business risk** + algorithm volatility |

---

## 5. Recommendations (prioritized by impact)

Focus: **minimal structural change**, **maximum SEO lift**, **low regression risk**.

### Critical / high impact - low to medium effort

1. **Normalize to a single `<h1>` per page**  
   - **Change:** Demote nav / duplicate title heading to **`<p>`** or **`<div>`** with class, or merge into one visible title region.  
   - **Impact:** High clarity for **snippets** and **quality** assessments.  
   - **Files:** Primarily `page-renderer.mjs` (`renderHeader` + body templates).

2. **Emit `CollectionPage` + `ItemList` on hub routes**  
   - **Change:** Branch JSON-LD when `normalizedRoute.endsWith('-tools.html')` instead of reusing `WebApplication`.  
   - **Impact:** Better **semantic** match for hubs; supports rich understanding of **clusters**.

3. **Pre-render a static `<ul>` of related tools** (or top N) at **build time**  
   - **Change:** Use `seo-clusters.mjs` / same data `related-tools.js` uses; keep JS for **dynamic** extras only.  
   - **Impact:** More **internal links** and **anchor diversity** in first HTML.

4. **Ship `<lastmod>` in production sitemaps**  
   - **Change:** Ensure export runs with **`cmsRoot`** so `resolveLastmodForRoute` finds CMS files, or set **build timestamp** fallback consistently.  
   - **Impact:** Medium **freshness** signal; easier **debugging** in GSC.

### Medium impact - low effort

5. **Fix author markup:** replace invalid `<meta rel="author">` with `<link rel="author" href="...">`.  
6. **Standardize JSON-LD `@context`** to `https://schema.org`.  
7. **Homepage title + meta** - replace generic “Home Page” pattern with **keyword-led** title and **150–160 char** description (CMS + `renderMetaTags` home branch).

### Strategic (higher effort / longer horizon)

8. **BreadcrumbList** JSON-LD Home → Hub → Tool.  
9. **Hreflang matrix** if EN/VI pairs are first-class.  
10. **Review UX ↔ JSON-LD audit:** ensure star widget and `aggregateRating` always **match** (spam update defense).

---

## Appendix: Sitemap fetch methods used

```bash
curl -sS -L --max-time 30 -o /tmp/robots.txt https://freetoolonline.com/robots.txt
curl -sS -L --max-time 30 https://freetoolonline.com/sitemap.xml
curl -sS -L https://freetoolonline.com/sitemap-tools.xml | head
```

**Fallback:** Node `fetch()` in `scripts/seo-playwright-crawl-once.mjs` loads the same URLs (no `wget` in this environment).

**Full Playwright crawl:** `SEO_FULL_CRAWL=1 node scripts/seo-playwright-crawl-once.mjs` (defaults to **sample** mode for faster runs).

---

*End of report.*
