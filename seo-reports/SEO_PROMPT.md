
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

Incorporate insights from (refer attached files/images/csv at ./freetoolonline-web/seo-reports/20260415-3/raw/ dir):

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
./freetoolonline-web/seo-reports/20260415-3/analyts/SEO_ANALYSIS_[LLM_MODEL_NAME_USAGE]_[CURRENT_DATE_TIME_IN_MILLSECOND].md
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

============================================================================================

First, read and analyze **all report files** and prev plan located in:

```
freetoolonline-web\seo-reports\20260415-3\analyts
freetoolonline-web/seo-reports/20260415/IMPLEMENTATION_PLAN.md
freetoolonline-web/seo-reports/20260415-2/IMPLEMENTATION_PLAN.md
```

---

### **Task**

Based on these analysis files, create an **implementation plan** at with style follow previous plan files:

```
freetoolonline-web\seo-reports\20260415-3\IMPLEMENTATION_PLAN.md
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


============================================================================================


At the freetoolonline-web\seo-reports\20260415-3\IMPLEMENTATION_PLAN.md

For 
- CRITICAL -- Do Immediately (Protect Rankings)
- HIGH PRIORITY -- Do This Week
- Quick Wins (High Impact - Low Effort)

Pls make the implemetation plan to implement all items for 3 groups above at ./freetoolonline-web-test first, then roll out needed changes into ./freetoolonline-web 


Technical Noted:
- For 'Pre-render related tools links (SSR)' - use github build to generated related tools for extractly what related-tools.js did. Keep the css style, UI, UI logic rule as current (refer the current project setup, and follow)

======

At the freetoolonline-web\seo-reports\20260415-3\IMPLEMENTATION_PLAN.md

For 
- CRITICAL -- Do Immediately (Protect Rankings)
- HIGH PRIORITY -- Do This Week
- Quick Wins (High Impact - Low Effort)

Pls make the implemetation plan to implement all items for 3 groups above at ./freetoolonline-web-test first, then roll out needed changes into ./freetoolonline-web 


======

I have deployed to staging site, the latest change on at https://dangkhoaow.github.io/freetoolonline-web-test/zip-file.html  and view-source:https://dangkhoaow.github.io/freetoolonline-web-test/zip-file.html and more other all rest routes/pages

Pls run check and audit if they are were implemented follow the plan?

======

I have deployed to prod site, the latest change on at https://freetoolonline.com/zip-file.html  and view-source:https://freetoolonline.com/zip-file.html and more other all rest routes/pages

Pls run check and audit if they are were implemented follow the plan?

======

Finally, pls update the plan ./freetoolonline-web/seo-reports/20260415-3/IMPLEMENTATION_PLAN.md for current context and implemetation status
