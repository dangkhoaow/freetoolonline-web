# CURSOR SEO AUTO-WORKFLOW (SAFE MODE)

For: freetoolonline-web (GitHub Pages static site)

---

# 🎯 GOAL

Automate:

* internal linking
* hub page creation
* content enhancement (non-destructive)

WITHOUT:

* modifying existing core content
* changing URLs
* breaking layout

---

# 🧠 GLOBAL RULES (MUST FOLLOW)

* NEVER delete existing content
* NEVER rewrite existing paragraphs
* ONLY append new sections
* AVOID duplicate insertion (check before adding)
* KEEP HTML structure consistent

---

# 🧩 STEP 1 — DETECT TOOL PAGES

## PROMPT

Scan the repository and identify all tool pages.

Criteria:

* HTML files with tool UI (input, file upload, conversion logic)
* Exclude index.html and landing pages

Output:
Return a JSON list:
[
{
"url": "/zip-file.html",
"cluster": "zip",
"intent": "compress zip"
}
]

---

# 🧩 STEP 2 — GROUP INTO CLUSTERS

## PROMPT

Group all pages into clusters based on intent similarity.

Clusters:

* zip
* image
* pdf
* dev
* other

Return:
{
"zip": ["/zip-file.html", "/remove-zip-password.html"],
"image": [...]
}

---

# 🧩 STEP 3 — GENERATE HUB PAGES

## PROMPT

For each cluster, create a hub page.

File name:

* /zip-tools.html
* /image-tools.html

Structure:

<h1>[Cluster Name] Tools</h1>

<p>Short intro (max 120 words)</p>

<ul>
  <li>
    <a href="/zip-file.html">Compress ZIP File</a>
    <p>Short description</p>
  </li>
</ul>

Rules:

* Keep content concise
* No keyword stuffing
* Focus on usability

---

# 🧩 STEP 4 — ADD RELATED TOOLS BLOCK

## PROMPT

For each tool page:

1. Check if "Related Tools" section exists
2. If NOT, append this block at the end:

<div class="related-tools">
  <h2>Related Tools</h2>
  <ul>
    [Insert 2–4 related tools from same cluster]
  </ul>
</div>

3. Also add link to hub page

Rules:

* Avoid duplicate insertion
* Only link relevant tools

---

# 🧩 STEP 5 — ADD HUB LINK (PARENT)

## PROMPT

For each tool page:

Add a small navigation link above or below the tool:

<a href="/zip-tools.html">← Back to ZIP Tools</a>

Rules:

* Do not break layout
* Keep minimal styling

---

# 🧩 STEP 6 — ADD SUPPORTING CONTENT

## PROMPT

For each tool page:

Append a new section ONLY if not exists:

<h2>About this tool</h2>

Include:

* 2–3 sentence explanation
* 2 use cases
* 1 limitation

Rules:

* Keep under 150 words
* Avoid generic content
* Do not repeat existing text

---

# 🧩 STEP 7 — ADD FAQ (OPTIONAL)

## PROMPT

If page has no FAQ:

Append:

<h2>FAQ</h2>

3–4 questions:

* Is it safe?
* Are files stored?
* What formats are supported?

Keep answers short.

---

# 🧩 STEP 8 — CTR IMPROVEMENT (SAFE)

## PROMPT

Update ONLY <title> and meta description.

Rules:

* Add action + outcome
* Keep under 60 chars (title)
* No keyword stuffing

---

# 🧩 STEP 9 — VALIDATION

## PROMPT

Check all modified files:

* No duplicated sections
* No broken HTML
* All links valid
* No content overwritten

Return summary of changes.

---

# 🧠 OPTIONAL — DRY RUN MODE

Add flag:

DRY_RUN = true

→ Only show diff, do not apply changes

---

# 🚀 EXECUTION ORDER

1. Detect pages
2. Cluster pages
3. Generate hubs
4. Add links
5. Add content
6. Validate

---

# 🧾 OUTPUT FORMAT

Each step should output:

* Files modified
* Changes made
* Any skipped files (with reason)

---

# END
