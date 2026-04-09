# CLUSTER DETECTION HEURISTICS

## 🎯 RULE 1 — TYPE > ACTION

Cluster theo "object", không theo verb

GOOD:

* compress image → image
* resize image → image

BAD:

* compress → cluster riêng ❌

---

## 🎯 RULE 2 — CONVERSION ≠ NEW CLUSTER

heic → jpg
png → jpg

→ vẫn thuộc IMAGE cluster

---

## 🎯 RULE 3 — PASSWORD / SECURITY = SAME CLUSTER

remove zip password
encrypt zip

→ vẫn thuộc ZIP

---

## 🎯 RULE 4 — PRIMARY PAGE = BROADEST INTENT

compress zip file → primary
reduce zip size → secondary

---

## 🎯 RULE 5 — AVOID OVER-SPLITTING

Do NOT create:

* compress cluster
* convert cluster

---

## 🎯 RULE 6 — LIMIT CLUSTERS

Max clusters:

* zip
* image
* pdf
* dev
* misc

---

# END
