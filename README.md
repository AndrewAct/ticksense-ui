# ticksense-ui

Showcase site for [TickSense](https://github.com/AndrewAct/ticksense) — a real-time crypto market lakehouse built end-to-end.

**Live:** [ticksense.ai](https://ticksense.ai)

---

## What this is

A single-page static site that introduces the TickSense pipeline architecture and links to the source code. No backend, no API calls, no fabricated data. Every number on the page traces to a real measurement or the backend README.

---

## Stack

| | |
|---|---|
| Framework | [Nuxt 3](https://nuxt.com) + TypeScript |
| Styles | [Tailwind CSS](https://tailwindcss.com) |
| Font | JetBrains Mono |
| Animation | Pure CSS `@keyframes` — no libraries |
| Deploy | [Vercel](https://vercel.com) (free tier, static output) |

---

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
```

> **Note:** if `npm install` fails with `EACCES`, run `npm install --cache /tmp/npm-cache-ts` — a prior `sudo npm` left root-owned files in the cache.

---

## Building for production

```bash
npm run generate   # static output → .output/public/
npm run preview    # local preview of the static build
```

Vercel picks up `vercel.json` and runs `nuxt generate` automatically on push.

---

## Project structure

```
components/
  AppNavbar.vue          fixed nav, blur-on-scroll
  HeroSection.vue        typewriter animation, CTA buttons
  PipelineSection.vue    two-row SVG pipeline diagram with CSS particle animation
  MedallionSection.vue   Bronze / Silver / Gold Iceberg layer breakdown
  StatsSection.vue       real load-test numbers + throughput estimates
  TechStackSection.vue   12 technology cards with selection rationale
  AppFooter.vue          GitHub links, phase roadmap

composables/
  useTypewriter.ts       types out a string on mount, cursor blinks
  useScrollReveal.ts     IntersectionObserver-based scroll reveal

assets/css/main.css      all @keyframes and animation utility classes
pages/index.vue          assembles sections in order
```

---

## Design notes

- **Monospace-only:** JetBrains Mono is the sole font. The terminal aesthetic is intentional.
- **Dark + cyan:** background `#070c18`, primary accent `cyan-400` (`#22d3ee`). No purple, no gradients with light blue — those read as generic AI output.
- **Pipeline animation:** SVG nodes with CSS `translateX/Y` particles. ~19 animated elements total. GPU-accelerated, `prefers-reduced-motion` respected.
- **No fabricated data:** `~5M ticks/day` is an estimated capacity figure — the pipeline runs locally on demand, not continuously. `p95 = 10ms` at `1,000 req/s` is a real k6 load test result (single-machine Docker stack, 2026-05-18).

---

## Backend

The pipeline this site describes: **[AndrewAct/ticksense](https://github.com/AndrewAct/ticksense)**

```
Binance WS → Redpanda → PyFlink → Iceberg on MinIO → Trino → dbt → FastAPI
```
