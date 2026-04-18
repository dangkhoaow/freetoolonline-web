# SEO reports (implementation plans + audits)

This directory is the **documentation hub** for the SEO program: implementation plans (by phase/date), progress logs, and supporting audit outputs.

## Overview

- **Plans**: Each phase has an `IMPLEMENTATION_PLAN.md` that defines scope, priorities, and acceptance criteria.
- **Progress**: Some phases include an `IMPLEMENTATION_PROGRESS.md` to record what was actually shipped, evidence, and follow-ups.
- **Analyses (“analyts/”)**: Supporting audit artifacts from different models and/or evaluations. Most phases have an `analyts/INDEX.md` that links deliverables.
- **Prompt**: `seo-prompt.md` is the reusable prompt/workflow seed used to generate or rerun analyses.

## Quick navigation (wired index)

### Phase 4 - `20260416/` (CTR recovery + AI-overview defense)

- **Plan**: [`20260416/IMPLEMENTATION_PLAN.md`](./20260416/IMPLEMENTATION_PLAN.md)
- **Progress**: [`20260416/IMPLEMENTATION_PROGRESS.md`](./20260416/IMPLEMENTATION_PROGRESS.md)
- **Analysis index**: [`20260416/analyts/INDEX.md`](./20260416/analyts/INDEX.md)

### Phase 3 - `20260415-3/` (content depth + semantic completeness)

- **Plan**: [`20260415-3/IMPLEMENTATION_PLAN.md`](./20260415-3/IMPLEMENTATION_PLAN.md)
- **Analysis index**: [`20260415-3/analyts/INDEX.md`](./20260415-3/analyts/INDEX.md)

### Phase 2 - `20260415-2/` (structural optimization)

- **Plan**: [`20260415-2/IMPLEMENTATION_PLAN.md`](./20260415-2/IMPLEMENTATION_PLAN.md)
- **Analysis index**: [`20260415-2/analyts/INDEX.md`](./20260415-2/analyts/INDEX.md)

### Phase 1 - `20260415/` (trust cleanup + structural fixes)

- **Plan**: [`20260415/IMPLEMENTATION_PLAN.md`](./20260415/IMPLEMENTATION_PLAN.md)
- **Analyses**: See the folder [`20260415/analyts/`](./20260415/analyts/)

### Shared workflow prompt

- [`seo-prompt.md`](./seo-prompt.md)

## How to use these docs (recommended workflow)

1. **Pick the phase you’re executing** and read its `IMPLEMENTATION_PLAN.md` first.
2. **Work staging-first**, validate with export + rendered QA evidence, then record reality in `IMPLEMENTATION_PROGRESS.md` (when present).
3. **Before writing content**, check the phase’s analysis outputs for intent priorities (and to avoid reinventing copy).

## Integration points (for automation + reuse)

These reusable agent skills live outside this folder under `.agent/skills/`:

- **Sync staging → production (git-safe)**: [`../../.agent/skills/sync-staging-into-prod/SKILL.md`](../../.agent/skills/sync-staging-into-prod/SKILL.md)
- **Append-only SEO workflow**: [`../../.agent/skills/tech-design-seo-workflow-safe-mode/SKILL.md`](../../.agent/skills/tech-design-seo-workflow-safe-mode/SKILL.md)
- **Cluster detection**: [`../../.agent/skills/tech-design-seo-cluster-detection/SKILL.md`](../../.agent/skills/tech-design-seo-cluster-detection/SKILL.md)
- **Implementation state pointers**: [`../../.agent/skills/technical-seo-implementation-progress/SKILL.md`](../../.agent/skills/technical-seo-implementation-progress/SKILL.md)
- **(New) SEO agency check**: `../../.agent/skills/seo-agency-check/`
- **(New) SEO content writer**: `../../.agent/skills/seo-content-writer/`

## Duplication prevention (page-level content)

When adding “supporting copy” to tool pages, keep **each section’s job distinct** to prevent duplication across:

- `BODYHTML*`: short, scannable, “what this tool does + how to use” (tight, high signal).
- `BODYWELCOME*`: deeper “why / use cases / trust” content, plus hub backlink.
- `FAQ*`: Q&A only (don’t restate the same steps list).

Use the `seo-content-writer` skill to follow a consistent anti-duplication template.

## Maintenance

- When a new phase folder is added, update this `README.md` so the navigation stays complete.
- Prefer adding a phase-level `analyts/INDEX.md` that links the deliverables for that phase.

