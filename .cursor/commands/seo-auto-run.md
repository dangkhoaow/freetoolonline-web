# SEO AUTO LOOP COMMAND (SAFE MODE)

## 🎯 MODE

* DRY_RUN = true
* Execute cluster by cluster (sequential)
* Stop if validation fails

---

# 🧠 GLOBAL RULES

* DO NOT modify existing content
* DO NOT change URLs
* ONLY append new sections
* Avoid duplicate insertion
* Follow seo-plan.md + heuristics.md

---

# 🔁 EXECUTION FLOW

## STEP 1 — AUTO DETECT CLUSTERS

Use auto-cluster.md to detect:

Expected clusters:

* zip
* image-editing
* image-conversion
* pdf
* dev

---

## STEP 2 — LOOP EACH CLUSTER

For each cluster:

### 2.1 Identify pages

* primary page
* supporting pages

---

### 2.2 Generate hub page

Pattern:

IF cluster = zip
→ /zip-tools.html

IF cluster = image-editing
→ /image-tools.html

IF cluster = image-conversion
→ /image-converter-tools.html

IF cluster = pdf
→ /pdf-tools.html

IF cluster = dev
→ /dev-tools.html

---

### 2.3 Update pages

For EACH page in cluster:

#### (A) Add hub link

<a href="[hub-url]">← Back to [Cluster Name]</a>

---

#### (B) Add Related Tools block

<h2>Related Tools</h2>
<ul>
  [2–4 internal links within same cluster]
  <li><a href="[hub-url]">All Tools</a></li>
</ul>

---

### 2.4 VALIDATION (CRITICAL)

Check:

* No duplicate sections
* No content overwritten
* No broken HTML
* Links are valid

IF FAIL:
→ STOP execution

---

## STEP 3 — OUTPUT

Return:

{
"clusters_processed": [],
"files_created": [],
"files_modified": [],
"skipped": [],
"issues": []
}

---

# ⚠️ SPECIAL RULES

## IMAGE CONVERSION

* heic-to-jpg MUST belong to image-conversion
* DO NOT mix with image editing tools

---

## CANNIBALIZATION

IF multiple pages share same intent:
→ keep primary page
→ DO NOT merge automatically
→ flag for review

---

# 🚫 DO NOT

* Do NOT rewrite content
* Do NOT change layout
* Do NOT cross-link unrelated clusters

---

# 🚀 EXECUTE

Run:

1. detect clusters
2. loop each cluster
3. generate hub
4. inject links
5. validate
6. output diff

---

# END
