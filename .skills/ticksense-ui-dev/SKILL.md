---
name: ticksense-ui-dev
description: Use before any work on the ticksense-ui repo. Covers design system, component patterns, content rules, animation approach, deploy workflow, and the end-of-session memory update protocol.
---

# TickSense UI — Development Skill

## What this repo is

A **single-page static showcase site** for the TickSense crypto market lakehouse project.
Target: `ticksense.ai` · Deployed: Vercel free tier · Built with: Nuxt 3 + TypeScript + Tailwind CSS.

Purpose: introduce the pipeline architecture and share source code.
**No SaaS features, no auth, no API calls, no fabricated data — ever.**

The backend lives at `/Users/andrewchen/dev/ticksense`.
When you need to verify stats or table names, read the backend README or dbt SQL — do not guess.

---

## Before starting any work

1. **Read this file.**
2. Skim the current components to understand what already exists:
   ```bash
   ls components/ composables/ assets/css/
   ```
3. Confirm dev server works: `npm run dev` → http://localhost:3000
4. If `npm install` fails with EACCES: `npm install --cache /tmp/npm-cache-ts`

---

## Page structure

| Order | Component | Section id |
|---|---|---|
| 1 | `AppNavbar.vue` | — |
| 2 | `HeroSection.vue` | — |
| 3 | `PipelineSection.vue` | `#pipeline` |
| 4 | `MedallionSection.vue` | — |
| 5 | `StatsSection.vue` | `#stats` |
| 6 | `TechStackSection.vue` | `#stack` |
| 7 | `AppFooter.vue` | — |

Add new sections by creating a new `*.vue` component and inserting it into `pages/index.vue`.

---

## Design system — follow exactly

### Colors

| Purpose | Tailwind class | Hex |
|---|---|---|
| Page background | `bg-bg` | `#070c18` |
| Card / surface | `bg-surface` | `#0c1220` |
| Default border | `border-border` | `#1c2d4a` |
| Hover border | `border-border-bright` | `#2a4166` |
| Primary accent | `text-cyan-400` / `bg-cyan-400` | `#22d3ee` |
| Section label color | `text-cyan-600` | `#0891b2` |
| Success / API layer | `text-emerald-400` | `#10b981` |
| Source / Binance | `text-amber-400` | `#f59e0b` |
| CDC / Debezium | `text-orange-400` | `#f97316` |
| Medallion — Bronze | inline `#b87333` | — |
| Medallion — Silver | inline `#94a3b8` | — |
| Medallion — Gold | inline `#ca8a04` | — |

**Do not** add a custom `cyan` key to `tailwind.config.ts` — it would replace Tailwind's full built-in cyan scale and break `cyan-400`/`cyan-600` classes.

### Typography

- **One font only: JetBrains Mono** — applied globally in `body` via `assets/css/main.css`.
- No Inter, no sans-serif, no display fonts. The monospace-only aesthetic is intentional.
- Section labels use: `text-[10px] text-cyan-600 tracking-[0.3em] uppercase` + `// prefix`
- Big section headings: `text-2xl md:text-3xl font-bold text-slate-100`
- Body copy: `text-slate-600 text-xs` or `text-[11px]`
- Data values: `text-3xl font-bold text-slate-100 tracking-tight`

### Spacing rhythm

- Section vertical padding: `py-24` (24 · 6 = 96px)
- Max content width: `max-w-6xl mx-auto px-6`
- Card padding: `p-4` or `p-5`
- Card gap: `gap-3` or `gap-4`

---

## Adding a new section — checklist

1. Create `components/MySection.vue` following this shell:

```vue
<script setup lang="ts">
const { el, isVisible } = useScrollReveal(0.1)
</script>

<template>
  <section class="relative py-24 border-t border-border/40">
    <div ref="el" class="max-w-6xl mx-auto px-6">

      <!-- Section header (always this exact pattern) -->
      <div :class="['mb-10 reveal', isVisible && 'visible']">
        <p class="text-[10px] text-cyan-600 tracking-[0.3em] uppercase mb-2">// label</p>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-100">Title</h2>
        <p class="mt-2 text-slate-600 text-xs max-w-2xl">One-line description.</p>
      </div>

      <!-- Content with staggered reveal -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div
          v-for="(item, i) in items"
          :key="item.id"
          :class="['p-4 rounded border border-border bg-surface/50 reveal', isVisible && 'visible']"
          :style="{ transitionDelay: `${i * 70}ms` }"
        >
          <!-- card content -->
        </div>
      </div>

    </div>
  </section>
</template>
```

2. Insert `<MySection />` in `pages/index.vue` at the right position.
3. **Run the dev server and verify the section renders before committing.**
4. Follow the end-of-session protocol below.

---

## Animation — rules and patterns

**Only use `transform` and `opacity`** — GPU-accelerated, no layout/paint triggers.

All `@keyframes` live in `assets/css/main.css`. Add new ones there, never inline.

### Existing particle classes

| Class | Keyframe | Description |
|---|---|---|
| `.particle-h` | `flow-h80` | 80 px right (most horizontal segments) |
| `.particle-h105` | `flow-h105` | 105 px right (PyFlink → Iceberg gap) |
| `.particle-v-up` | `flow-v86up` | 86 px upward (CDC → Redpanda) |
| `.particle-v-down` | `flow-v162down` | 162 px downward (Iceberg → Trino turn) |

### Existing node animation classes

| Class | Effect |
|---|---|
| `.node-cyan` | Border opacity pulse (3s, ease-in-out) |
| `.node-amber` | Border opacity pulse (3.5s) |
| `.node-emerald` | Border opacity pulse (3.2s, delay 0.8s) |
| `.node-orange` | Border opacity pulse (4s, delay 1.2s) |
| `.corner-dot` | Dot radius + opacity pulse (2.5s) |

### Scroll reveal

Use `useScrollReveal()` from `composables/useScrollReveal.ts`.
Apply class `reveal` to the element, add `visible` when `isVisible` is true.
The CSS transition is defined in `main.css` under `.reveal` / `.reveal.visible`.

### Performance rules

- Max ~20 animated SVG elements total in the pipeline diagram.
- `prefers-reduced-motion` kills all animation — already handled in `main.css`.
- No `will-change` on static elements. No canvas. No WebGL. No animation libraries.

---

## Content rules — non-negotiable

- **No fabricated data.** Every number, table name, and claim must trace to:
  - `/Users/andrewchen/dev/ticksense/README.md`
  - dbt models in `/Users/andrewchen/dev/ticksense/dbt/models/`
  - FastAPI routers in `/Users/andrewchen/dev/ticksense/api/src/api/routers/`
  - The k6 load test screenshots (Grafana: p95=10ms, 1000 req/s, 2026-05-18)

- **~5M ticks/day is an estimate.** Always label it as estimated capacity; the pipeline runs locally on demand, not continuously.
- **p95=10ms, 1000 req/s** are real — but always note "local benchmark, not production".
- **Medallion table names** (`raw.orderbook_diffs`, `normalized.book_ticker`, `normalized.ohlcv_1m`, `marts.mart_ohlcv`, `marts.mart_liquidity`, `marts.mart_exchange_health`) are verified in dbt SQL and FastAPI router.

Before adding any new stat or claim, grep the backend to confirm it exists.

---

## Deploy

```bash
# Static build
npm run generate          # outputs to .output/public/

# Local preview of the static build
npm run preview

# Vercel (first time)
npx vercel --prod

# Vercel (subsequent — push to GitHub, auto-deploys via vercel.json)
```

`vercel.json`:
```json
{ "buildCommand": "npm run generate", "outputDirectory": ".output/public", "framework": null }
```

Custom domain `ticksense.ai` is pointed at Vercel. HTTPS is automatic.

---

## End-of-session protocol

After any significant change (new section, design system change, new content), run these two steps:

### 1 — Update this skill file

If you introduced a new pattern, component, color, animation class, or content source:
- Add it to the relevant table or section above.
- Update the "existing particle classes" or "existing node animation classes" tables if you added CSS.
- If a new section was added, add it to the page structure table.

### 2 — Update the project memory

Edit `/Users/andrewchen/.claude/projects/-Users-andrewchen-dev/memory/project_ticksense_ui.md`:
- Update "What's built" table if sections changed.
- Update design system table if new tokens were introduced.
- Update "Content rules" if new verified stats were added.
- Update "Common issues" if a new gotcha was discovered.

If MEMORY.md doesn't have an entry for this project yet, add:
```
- [TickSense UI — frontend project](project_ticksense_ui.md) — Nuxt 3 static showcase at ticksense.ai: design system, content rules, pipeline SVG layout, deploy workflow, npm cache fix
```

**Keep both files honest and current.** Future Claude sessions will rely on them.
