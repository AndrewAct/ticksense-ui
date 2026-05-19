# TickSense UI

Static showcase site for the TickSense crypto market lakehouse. Single-page, deployed to Vercel at ticksense.ai.

## Before any work on this repo

Read the project skill first:

```
.skills/ticksense-ui-dev/SKILL.md
```

It covers: design system, component patterns, animation rules, content rules (no fabricated data), deploy workflow, and the end-of-session memory update protocol.

## Quick reference

- **Dev:** `npm run dev` → http://localhost:3000
- **npm install fails:** `npm install --cache /tmp/npm-cache-ts` (root-owned cache issue)
- **Static build:** `npm run generate` → `.output/public/`
- **Backend repo:** `/Users/andrewchen/dev/ticksense`

## Stack

| | |
|---|---|
| Framework | Nuxt 3 + TypeScript |
| Styles | Tailwind CSS |
| Font | JetBrains Mono (only font — monospace-first) |
| Animation | Pure CSS `@keyframes` in `assets/css/main.css` |
| Deploy | Vercel free tier, `nuxt generate` static output |

## Non-negotiable rules

- No API calls. No mock data. No fabricated statistics.
- All claims must trace to the backend README, dbt SQL, or actual load test results.
- `~5M ticks/day` is an estimate — always label it as such.
- Only use `transform` and `opacity` for animation (GPU-accelerated, no layout triggers).
- After any significant change: update `.skills/ticksense-ui-dev/SKILL.md` and the project memory file.
