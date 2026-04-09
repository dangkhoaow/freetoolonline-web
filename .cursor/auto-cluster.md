# AUTO CLUSTER DETECTION SCRIPT (CURSOR)

## 🎯 GOAL

Automatically:

* Detect all tool pages
* Classify them into clusters
* Identify primary intent per page
* Detect potential cannibalization

---

# 🧠 STEP 1 — SCAN FILES

PROMPT:

Scan the repository and list all HTML files.

Exclude:

* index.html
* 404.html
* generic landing pages

Only include files that:

* contain tool functionality
* have interactive UI (input, upload, conversion)

Return:
[
{
"file": "zip-file.html",
"url": "/zip-file.html"
}
]

---

# 🧠 STEP 2 — EXTRACT INTENT

PROMPT:

For each page, analyze:

* filename
* title tag
* h1 (if exists)
* visible tool function

Infer:

* primary intent (short phrase)
* file type (zip, image, pdf, dev, etc.)
* action (compress, convert, remove, etc.)

Return:

[
{
"url": "/zip-file.html",
"intent": "compress zip file",
"type": "zip",
"action": "compress"
}
]

---

# 🧠 STEP 3 — CLUSTER GROUPING

PROMPT:

Group pages based on:

* same file type
* similar intent

Clusters should be:

* zip
* image
* pdf
* dev
* misc

Rules:

* cluster by USER INTENT, not just keyword similarity
* "compress image" and "resize image" → same cluster (image)
* "heic to jpg" → image cluster but conversion subtype

Return:

{
"zip": [...],
"image": [...],
"pdf": [...],
"dev": [...],
"misc": [...]
}

---

# 🧠 STEP 4 — PRIMARY PAGE DETECTION

PROMPT:

For each cluster:

Identify the PRIMARY page based on:

* most generic intent
* highest coverage (broad query match)

Example:

* "compress zip file" → primary
* "remove zip password" → secondary

Return:

{
"zip": {
"primary": "/zip-file.html",
"supporting": [
"/remove-zip-password.html",
"/unzip-file.html"
]
}
}

---

# 🧠 STEP 5 — CANNIBALIZATION DETECTION

PROMPT:

Within each cluster:

Detect if multiple pages share overlapping intent.

Example:

* compress zip
* zip compressor
* reduce zip size

If overlap:

* flag as "cannibalization risk"

Return:

[
{
"cluster": "zip",
"pages": ["/zip-file.html", "/compress-folder.html"],
"issue": "overlapping intent"
}
]

---

# 🧠 STEP 6 — HUB PAGE SUGGESTION

PROMPT:

For each cluster:

Suggest:

* hub page name
* hub URL

Example:
zip → /zip-tools.html

---

# 🧾 FINAL OUTPUT FORMAT

{
"clusters": {
"zip": {
"primary": "...",
"supporting": [...],
"hub": "/zip-tools.html"
}
},
"cannibalization": [...],
"summary": {
"total_pages": X,
"total_clusters": Y
}
}

---

# END
