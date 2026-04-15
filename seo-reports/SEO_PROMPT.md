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

Incorporate insights from (refer attached files/images):

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
SEO_ANALYSIS_[LLM_MODEL_NAME_USAGE].md
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

