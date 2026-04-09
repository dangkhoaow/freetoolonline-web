# IMAGE CONVERSION RUN (SAFE MODE)

## 🎯 MODE

* DRY_RUN = true
* Scope = IMAGE-CONVERSION ONLY

---

# 🧠 GLOBAL RULES

* DO NOT modify existing content
* DO NOT change URLs
* ONLY append new sections
* Avoid duplicate insertion
* Follow seo-plan.md and heuristics.md

---

# 🧩 CLUSTER: IMAGE-CONVERSION

## OBJECTIVE

Create a dedicated cluster for image format conversion tools

---

## CRITICAL RULE

* /heic-to-jpg.html MUST belong to image-conversion cluster
* DO NOT group with:

  * /compress-image.html
  * /resize-image.html
  * /crop-image.html

---

## TASKS

### 1. Create hub page

File:

* /image-converter-tools.html

---

### Content:

<h1>Image Converter Tools</h1>

<p>
Convert images between formats like HEIC, JPG, PNG, and WebP quickly and for free.
</p>

<ul>
  <li>
    <a href="/heic-to-jpg.html">HEIC to JPG</a>
    <p>Convert iPhone HEIC images to JPG format</p>
  </li>
</ul>

---

### 2. Update tool page

Target:

* /heic-to-jpg.html

---

### 3. Append (if NOT exists)

<h2>Related Tools</h2>
<ul>
  <li><a href="/image-converter-tools.html">All Image Converters</a></li>
</ul>

---

### 4. Add hub link

<a href="/image-converter-tools.html">← Back to Image Converters</a>

---

# 🧾 OUTPUT

Return:

* files created
* files modified
* diff preview

---

# ⚠️ VALIDATION

* No duplicate insertion
* No layout broken
* Only HEIC page modified
* No cross-cluster links

---

# 🚫 DO NOT

* Do NOT link to /image-tools.html
* Do NOT rewrite content
* Do NOT merge clusters

---

# 🚀 EXECUTION

1. Create hub
2. Update HEIC page
3. Validate
4. Return diff

---

# END
