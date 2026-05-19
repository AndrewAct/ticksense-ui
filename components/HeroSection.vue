<script setup lang="ts">
const { displayed, cursor } = useTypewriter(
  'Binance WS → Redpanda → PyFlink → Iceberg → Trino → FastAPI',
  36,
)
</script>

<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14">
    <!-- Background: subtle dot grid -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background-image: radial-gradient(circle, #1c2d4a 1px, transparent 1px); background-size: 40px 40px; opacity: 0.35;"
    />
    <!-- Radial glow behind title -->
    <div
      class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
      style="background: radial-gradient(ellipse, rgba(34,211,238,0.06) 0%, transparent 70%);"
    />

    <div class="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
      <!-- Status badge -->
      <div class="inline-flex items-center gap-2 px-3 py-1 mb-10 rounded-full border border-border text-xs text-slate-500 bg-surface/60 backdrop-blur-sm">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        open source · 6 phases complete · phase 6 in progress
      </div>

      <!-- Title -->
      <h1 class="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-8">
        <span class="block text-slate-100">Real-time Crypto</span>
        <span class="block text-cyan-400">Market Lakehouse</span>
      </h1>

      <!-- Typewriter pipeline chain -->
      <div
        class="inline-flex items-center gap-0 px-4 py-2.5 mb-8 rounded-md border border-border bg-surface/80 backdrop-blur-sm text-xs sm:text-sm overflow-hidden max-w-full"
      >
        <span class="text-slate-600 mr-2 select-none shrink-0">$</span>
        <span class="text-slate-300 truncate">{{ displayed }}</span>
        <span
          :class="cursor ? 'opacity-100' : 'opacity-0'"
          class="inline-block w-[2px] h-[1em] bg-cyan-400 ml-0.5 shrink-0 transition-opacity duration-75 align-middle"
        />
      </div>

      <!-- Description -->
      <p class="text-slate-500 text-sm max-w-xl mx-auto mb-12 leading-relaxed">
        An end-to-end streaming data platform for crypto market microstructure&nbsp;analysis.
        ~5M ticks/day · 50 pairs · sub-30s freshness.
        Built to production engineering standards.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="https://github.com/AndrewAct/ticksense"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-5 py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
          style="color: #070c18;"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          view source
        </a>
        <a
          href="#pipeline"
          class="flex items-center gap-2 px-5 py-2.5 rounded border border-border hover:border-border-bright text-slate-400 hover:text-slate-200 text-sm transition-all duration-200"
        >
          explore pipeline
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Scroll cue -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-700 text-[10px] tracking-widest">
      <span>SCROLL</span>
      <div class="w-px h-10 bg-gradient-to-b from-slate-700 to-transparent" />
    </div>
  </section>
</template>
