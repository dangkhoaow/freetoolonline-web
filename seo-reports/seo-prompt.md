
First, perform a **high-level evaluation of the website [https://freetoolonline.com](https://freetoolonline.com)**, covering:

* UX/UI
* Performance (speed, loading behavior)
* Content quality
* Overall site structure

---

Next, conduct a **deep SEO audit**, including:

* SEO structure (on-page SEO, internal linking, hierarchy)
* Sitemap (structure, coverage, validity)
* Content clustering strategy (existing clusters and implementation)

---

### **Important Requirements**

* Do not rely on static HTML only.
* You must **crawl the entire website and render it using a browser engine (e.g., Playwright)** in order to:

  * Visualize the real layout
  * Analyze actual rendered sections, components, and page structure
* Ensure full crawl coverage:

  * Prevent XML fetch failures by trying multiple approaches (e.g., `curl`, `wget`, fallback methods)

---

### **Analysis Context (Must Be Incorporated)**

Incorporate insights from (refer attached files/images/csv and at ./freetoolonline-web/seo-reports/20260416/raw/ dir):

* GA4
* Google AdSense
* Semrush
* Google Search Console (GSC)

Also consider the impact of the following **recent Google Core Updates**:

* [https://status.search.google.com/incidents/VbnSXAH4SmEcxPtx4YSD](https://status.search.google.com/incidents/VbnSXAH4SmEcxPtx4YSD)
* [https://status.search.google.com/incidents/mYbNTqV1ytDc2fA8hUz4](https://status.search.google.com/incidents/mYbNTqV1ytDc2fA8hUz4)

---

### **Thinking & Perspective Requirements**

* Analyze with the mindset of a **20-year SEO expert (context: year 2026)**
* Connect all data sources (crawl + analytics + core updates) into a **coherent, end-to-end reasoning flow**
* Go deep enough to **understand and analyze the codebase**

---

### **Output Format**

Generate a file named:

```
./freetoolonline-web/seo-reports/20260416/analyts/SEO_ANALYSIS_[LLM_MODEL_NAME_USAGE]_[CURRENT_DATE_TIME_IN_MILLSECOND].md
```

The file should include:

1. **Executive Summary**
2. **Detailed Analysis**

   * Technical SEO
   * Content
   * Site structure
   * Clustering strategy
3. **Impact of Google Core Updates**
4. **Key Issues (Root Causes)**
5. **Recommendations**

   * Prioritized by **impact level**
   * Focus on solutions that:

     * Require **minimal structural changes**
     * Deliver **maximum SEO improvement**
  

===========================================================================

First, read and analyze **all report files** and prev plan located in:

```
freetoolonline-web/seo-reports/*/analyts
freetoolonline-web/seo-reports/*/IMPLEMENTATION_PLAN.md
```

---

### **Task**

Based on these analysis files, create an **implementation plan** at with style follow previous plan files:

```
freetoolonline-web\seo-reports\20260416\IMPLEMENTATION_PLAN.md
```

---

### **Requirements for the Plan**

The plan should:

* Identify and list **top-priority SEO fixes and improvements**
* Focus on actions that:

  * Have **high impact on SEO performance and ranking potential**
  * Are **easy to implement**
  * Have **minimal risk or negative impact** on:

    * Existing structure
    * Current rankings or traffic gains

---

### **Output Structure**

The implementation plan should include:

1. **Executive Summary**

   * Key opportunities and overall strategy

2. **Priority Action List**

   * Each item should include:

     * Description of the issue
     * Recommended fix
     * Expected SEO impact
     * Implementation difficulty (low / medium / high)
     * Risk level (low / medium / high)

3. **Quick Wins (High Impact – Low Effort)**

   * Clearly separated section for fastest gains

4. **Optional Next Steps**

   * Additional improvements that can be considered later


======


At the freetoolonline-web\seo-reports\20260416\IMPLEMENTATION_PLAN.md under 

For pillars
- CRITICAL 
- HIGH PRIORITY
- Quick Wins (High Impact - Low Effort)

Pls make the implemetation plan:
1 - recheck the codebase and older plan, and update them to latest status (can be include the latest plan if any item already done, update it as well) by in progress of done icon (✅, ⏳) at each item or row on table
2 - to implement all items for 3 groups above at ./freetoolonline-web-test first, then roll out needed changes into ./freetoolonline-web 

Positioning: Act as 20 year expirence content writer and 10 years SEO expertize

Technical Noted:
- Pls make the plan for priority to implement follow 3 pillars above, but exclude top performance cluster is zip-tools
- Focus other high ROI cluster that with high impression but low CTR or low position like heic-to-jpg, device test,...
- Implement at ./freetoolonline-web-test first, then roll out needed changes into ./freetoolonline-web 
- For prod repo, do not commit or push into 'main' branch. Always push it into 'seo-boost' branch
 
======

I have deployed to staging site, the latest change on at https://dangkhoaow.github.io/freetoolonline-web-test/zip-file.html  and view-source:https://dangkhoaow.github.io/freetoolonline-web-test/zip-file.html and more other all rest routes/pages

Pls run check and audit if they are were implemented follow the plan?

======

I have deployed to prod site, the latest change on at https://freetoolonline.com/zip-file.html  and view-source:https://freetoolonline.com/zip-file.html and more other all rest routes/pages

Pls run check and audit if they are were implemented follow the plan?

======

# **Continuous QA + Fix Loop (Plan-Driven, Staging-First, Git-Safe)**

## **Core Principles**

* PLAN = source of truth for scope
* PROGRESS = source of truth for execution status
* ACTUAL (staging site) = source of truth for reality

👉 The goal is to continuously converge:
**PLAN = PROGRESS = ACTUAL**

---

# **Continuous QA + Fix Loop (Plan-Driven, Staging-First, Git-Safe)**

Please execute a **continuous validation and improvement loop** based on the **single source of truth**:

* Plan file (WHAT must be done):
  `./freetoolonline-web\seo-reports\20260416\IMPLEMENTATION_PLAN.md`

* Progress file (WHAT has been done):
  `./freetoolonline-web\seo-reports\20260416\IMPLEMENTATION_PROGRESS.md`

---

## **Core Principles**

* PLAN = source of truth for scope
* PROGRESS = source of truth for execution status
* ACTUAL (staging site) = source of truth for reality

👉 The goal is to continuously converge:
**PLAN = PROGRESS = ACTUAL**

---###---

## **Continuous Execution Loop**

Repeat the following steps **in every cycle** until fully aligned:

---

### **Step 1 — Cross-check (Plan vs Progress vs Reality)**

* Compare:

  * PLAN (expected)
  * PROGRESS (reported)
  * ACTUAL staging site (rendered result)

* Identify gaps:

  * Marked “Done” but not actually implemented
  * Implemented but not tracked
  * Missing / partial items

---

### **Step 2 — Full Rendered Audit (Mandatory)**

* Do NOT rely on static HTML
* Use a **browser engine (e.g., Playwright)**

#### Required:

* Test both **desktop + mobile**
* Perform **visual QA (UI/UX)**, not just functional checks
* Validate:

  * Layout, spacing, alignment
  * Typography, contrast
  * Component behavior
  * Responsiveness across breakpoints

#### Breakpoints:

* 320 / 390 / 768 / 1024 / 1440

#### Screenshot output:

```
./freetoolonline-web-test/test/20260416/screenshoot/[TIMESTAMP]/
```

#### Coverage:

* Crawl all pages/routes
* Use fallback methods (`fetch`, `curl`, `wget`) to avoid missing content

---

### **Step 3 — Strict Visual QA Rules**

Treat these as **REAL FAILURES**:

* Low contrast / unreadable text
* Overlapping or clipped UI
* Layout shift / CLS issues
* Broken mobile layout
* Horizontal scroll
* Sticky elements blocking content
* Misalignment between sections
* Any inconsistency vs other pages
* Any mismatch vs reference screenshots

---

### **Step 4 — Layout Alignment Audit (Programmatic)**

For each breakpoint:

* Render via browser
* Compute layout using `getBoundingClientRect()`

Validate:

* Left/right alignment consistency across:

  * Main container
  * Hero
  * Key sections/cards
  * Footer

Rules:

* Alignment delta must be ≤ 1px
* Any deviation → FAIL

Log results into PROGRESS:

* `{viewport, positions, deltas}`
* Include diagnostic screenshots (with guide lines)

---

### **Step 5 — Fix & Re-verify (Staging Only)**

If ANY issue is found:

1. Identify **root cause in code**
2. Apply **real fix (no workaround)**
3. Commit → push to **staging repo only** (trigger build & deploy) to make change at https://dangkhoaow.github.io/freetoolonline-web-test/
4. Re-run full audit (Step 2 → Step 4) at https://dangkhoaow.github.io/freetoolonline-web-test/*
5. Repeat until all issues are resolved

---

## **Git Flow Rules (STRICT)**

* ❌ DO NOT push directly to `main` (production)
* ✅ All changes must go through **staging branch/repo**

After staging is verified and stable:

* Only **mirror necessary file changes** from staging → production
* No direct development on production

---

## **End-of-Cycle Mandatory Updates**

At the **end of EACH loop iteration**:

### 1. Update PROGRESS file

`./freetoolonline-web\seo-reports\20260416\IMPLEMENTATION_PROGRESS.md`

* Correct status (Not Started / In Progress / Done / Blocked)
* Add:

  * Issues found
  * Root causes
  * Fixes applied
  * Test evidence (screenshots, logs)

---

### 2. Sync back to PLAN (if needed)

Update PLAN file ONLY if:

* Scope clarification is required, or
* A previously undefined but necessary fix is identified

File:
`./freetoolonline-web\seo-reports\20260416\IMPLEMENTATION_PLAN.md`

---

## **Exit Condition (STOP LOOP ONLY WHEN)**

* 100% PLAN items implemented
* PROGRESS fully accurate and up-to-date
* All visual + layout + responsive tests pass
* No regression across breakpoints
* Staging matches expected 2026 UX/UI quality

---

## **Final Output (Per Cycle)**

Provide:

* Completion % vs PLAN
* List of gaps found
* List of fixes applied in this cycle
* Remaining issues (if any)
* Confirmation of:

  * Rendering audit completed
  * Visual QA passed or failed
  * PROGRESS updated
