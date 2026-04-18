# Implementation Progress: Phase 4 (20260416)

**Last updated:** 2026-04-18  
**Scope source:** `./freetoolonline-web/seo-reports/20260416/IMPLEMENTATION_PLAN.md`  
**Reality source:** Staging site `https://dangkhoaow.github.io/freetoolonline-web-test/`

## Status legend

- **Not Started**
- **In Progress**
- **Done**
- **Blocked**

## Pillar status (Plan scope)

| Pillar item | Status | Notes |
|---|---|---|
| **2.1 Titles + meta (CTR recovery, non-ZIP)** | In Progress | Implemented in `web-test` and mirrored into `web` (non-ZIP priority queue). Remaining: confirm “top 20 by impressions” and US queries from GSC exports (ZIP excluded). |
| **2.2 GA4 Unassigned attribution** | In Progress | Requires GA4 Admin verification + rule changes (repo code is GTM-driven). |
| **2.3 Hub enrichment (non-ZIP hubs)** | Done | Hub longform content is in parity between `web-test` and `web` (ZIP hub deferred). |
| **2.4 Citable answer blocks (AI Overview defense)** | Done | Added to the priority non-ZIP tool pages in `web-test` and mirrored into `web`. |
| **2.5 US CTR tune-up (non-ZIP)** | Not Started | Requires GSC export filtered by Country=US. |

**Overall completion estimate:** 2 / 5 pillar items done, 2 in progress, 1 not started.

## Cycle log

### Cycle 1 - 2026-04-17 (Code parity + rollout prep)

**Code changes (staging-first):**
- **Staging repo (`freetoolonline-web-test`)**: commit `213fdaa` (local; pending push) - improved non-ZIP titles/meta + added answer blocks.
- **Production repo (`freetoolonline-web`)**: commit `6964e3d` on branch `seo-boost` (local; pending push) - mirrored non-ZIP changes + device-test tag alignment.

**Validation (local export):**
- `web-test`: `npm run export` ✅; spot-checked rendered `<title>`, meta descriptions, and answer blocks in `dist/`.
- `web`: `npm run export` ✅; spot-checked the same.

**Next required (to align PLAN = PROGRESS = ACTUAL):**
- Push staging commit to update the **actual** staging site.
- Run the mandatory Playwright rendered audit + layout alignment checks (screenshots + logs) against staging URLs.
- Update this file with evidence (paths, pass/fail, root causes, fixes).

### Cycle 2 - 2026-04-17 (QA noads footer alignment fix + full audit pass)

**Code changes (staging-first):**
- **Staging repo (`freetoolonline-web-test`)**: commit `be8d819` preserved `?noads=1` through redirect pages so QA routes stay on the audited page.
- **Staging repo (`freetoolonline-web-test`)**: commit `0274371` fixed the home page footer in `qa-noads` mode by removing the extra mobile footer padding before alignment is measured.

**Root cause found:**
- Tool pages aligned correctly once ads were removed, but the home page still had a `12px` footer inset on mobile, which made the footer drift away from the full-bleed hero when `?noads=1` was active.

**Fix applied:**
- `extended-body-content.html` now zeroes the footer padding for the home page in `qa-noads` mode before the footer alignment routine runs.
- Redirect pages now preserve `window.location.search` so the QA flag survives route rewrites.

**Validation (live staging + browser audit):**
- Live smoke check on `/?noads=1` at `390px` now reports `hero` and `footer` both at `0..390` with `footerPad: 0px`.
- Live smoke check on a tool page (`split-pdf-by-range.html?noads=1`) at `390px` remains aligned at `10..380`.
- Full rendered audit output: `./freetoolonline-web-test/test/20260416/screenshoot/20260417T155804Z/`
- Audit coverage: `73` routes x `3` viewports (`390`, `1440`, `1920`) = `219` checks.
- Audit result: `0` failures, `0` warnings recorded as failures, screenshots + diagnostic folders written successfully.

**Status impact:**
- PLAN scope did not change; no plan-file update was required.
- PROGRESS now reflects the final staging reality for the QA loop.

### Cycle 3 - 2026-04-17 (Audit runner stabilization + confirmation rerun)

**Code changes (staging-first):**
- **Staging repo (`freetoolonline-web-test`)**: commit `fd42b50` keeps the Playwright browser alive across viewports (prevents intermittent `browser.newContext` crash).

**Validation (rendered audit, full-page screenshots):**
- Full rendered audit output: `./freetoolonline-web-test/test/20260416/screenshoot/20260417T163049Z/`
- Audit coverage: `73` routes x `3` viewports (`390`, `1440`, `1920`) = `219` checks.
- Audit result: `0` failures; `73` screenshots per viewport; diagnostic folders empty (no failures).

### Cycle 4 - 2026-04-18 (Related tools regression fix + shorter answer panels + targeted 1920 evidence)

**Issue found (staging reality):**
- "Related tools:" list regressed on pages whose `BODYTITLE*` changed (commonly collapsing to only a self-link).

**Root cause:**
- Related tools logic (SSR in `scripts/page-renderer.mjs` + client `static/script/related-tools.js`) identified the current page by matching rendered title text against `urlMaps[].title`. Title edits from `213fdaa` broke that match, so current tags were empty and SSR output degraded.

**Fix applied (staging-first):**
- **Staging repo (`freetoolonline-web-test`)**: commit `eb9ec64` matches the current page by **route/URL** (SSR + client), so Related Tools no longer depends on title strings.
- Rewrote the 10 pale-green answer panels from `213fdaa` (`BODYHTML*`) to be shorter and non-duplicative (kept below the tool UI).
- Updated the Playwright audit runner to be hang-safe (8s fetch abort + explicit navigation timeouts) and support targeted runs (`--routes`, `--viewport`, `--mode`).

**Validation (live staging + Playwright full-page screenshots @ 1920px):**
- Output: `./freetoolonline-web-test/test/20260416/screenshoot/20260418T025116Z/`
- Coverage:
  - `noads/`: `10` routes x `1` viewport (`1920`) = `10` checks, `0` failures.
  - `ads/`: `10` routes x `1` viewport (`1920`) = `10` full-page screenshots captured.
- Routes validated: `heic-to-jpg`, `pdf-to-text`, `md5-converter`, `json-parser`, `css-minifier`, `js-minifier`, `microphone-test`, `camera-test`, `lcd-test`, `keyboard-test`.

**Production mirror (no commit/push):**
- Mirrored the same Related Tools + `BODYHTML*` answer panel updates into `freetoolonline-web/` working tree and re-validated with `npm run export` ✅.

