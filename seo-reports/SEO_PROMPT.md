
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

Incorporate insights from (refer attached files/images at ./freetoolonline-web/seo-reports/20260415-2/raw/ dir):

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
./freetoolonline-web/seo-reports/20260415-2/analyts/SEO_ANALYSIS_[LLM_MODEL_NAME_USAGE]_[CURRENT_DATE_IN_YYYYMMDDHHMMSS_7GMT24HFORMAT].md
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
freetoolonline-web\seo-reports\20260415-2\analyts
freetoolonline-web/seo-reports/20260415/IMPLEMENTATION_PLAN.md
```

---

### **Task**

Based on these analysis files, create an **implementation plan** at with style follow previous plan files:

```
freetoolonline-web\seo-reports\20260415-2\IMPLEMENTATION_PLAN.md
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

at the freetoolonline-web\seo-reports\20260415-2\IMPLEMENTATION_PLAN.md (i just renamed)

pls make the implemetation plan to do at ./freetoolonline-web-test first, for 'CRITICAL -- Do Immediately (Protect Rankings)' items

at 'Remove Fabricated AggregateRating Schema', is there any a way when running the github pages building. Fetch by the api get rating (based what pages we had), then parse the response and push it to json ld by the curl and response below:

Request:
curl ^"https://service.us-east-1a.freetool.online/ajax/get-rating?pageName=heic-to-jpg^" ^
  -H ^"Accept: application/json, text/javascript, */*; q=0.01^" ^
  -H ^"Accept-Language: en-US,en;q=0.9,vi;q=0.8^" ^
  -H ^"Cache-Control: no-cache^" ^
  -H ^"Connection: keep-alive^" ^
  -H ^"Content-Type: application/json; charset=UTF-8^" ^
  -H ^"Origin: https://freetoolonline.com^" ^
  -H ^"Pragma: no-cache^" ^
  -H ^"Referer: https://freetoolonline.com/^" ^
  -H ^"Sec-Fetch-Dest: empty^" ^
  -H ^"Sec-Fetch-Mode: cors^" ^
  -H ^"Sec-Fetch-Site: cross-site^" ^
  -H ^"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36^" ^
  -H ^"sec-ch-ua: ^\^"Not)A;Brand^\^";v=^\^"8^\^", ^\^"Chromium^\^";v=^\^"138^\^", ^\^"Google Chrome^\^";v=^\^"138^\^"^" ^
  -H ^"sec-ch-ua-mobile: ?0^" ^
  -H ^"sec-ch-ua-platform: ^\^"Windows^\^"^" ^
  --data-raw ^"^{^}^"

Response:
  {"one":74,"two":32,"three":75,"four":130,"five":2232,"total":2543,"avg":4.7}


=======

At the freetoolonline-web\seo-reports\20260415-2\IMPLEMENTATION_PLAN.md

Pls make the implemetation plan to do at ./freetoolonline-web-test first, then roll out needed changes into ./freetoolonline-web 

For 
- CRITICAL -- Do Immediately (Protect Rankings)
- HIGH PRIORITY -- Do This Week
- Quick Wins (High Impact - Low Effort)

Technical Noted:
- For 'Pre-render related tools links (SSR)' - use github build to generated related tools for extractly what related-tools.js did. Keep the css style, UI, UI logic rule as current (refer the current project setup, and follow)
