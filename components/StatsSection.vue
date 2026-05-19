<script setup lang="ts">
const { el, isVisible } = useScrollReveal(0.1)

const stats = [
  {
    value: '~5M',
    unit: 'ticks / day *',
    label: 'throughput.daily_events',
    desc: 'Estimated throughput at full capacity across 50 pairs. The pipeline runs locally on demand — not a continuously operated system.',
  },
  {
    value: '50',
    unit: 'pairs',
    label: 'ingest.symbol_count',
    desc: 'Concurrent trading pairs tracked via a single multiplexed WebSocket',
  },
  {
    value: '<30s',
    unit: 'E2E',
    label: 'pipeline.end_to_end_latency',
    desc: 'Exchange wire → Iceberg silver layer, under normal operating conditions',
  },
  {
    value: '1,000',
    unit: 'req / s',
    label: 'api.peak_qps_tested',
    desc: 'Peak load tested with k6; 0% error rate sustained throughout',
  },
  {
    value: '10ms',
    unit: 'p95',
    label: 'api.latency_p95',
    desc: 'API response time at 95th percentile. Local benchmark — not production.',
  },
  {
    value: '89%',
    unit: 'coverage',
    label: 'tests.line_coverage',
    desc: '100+ unit and integration tests across ingest, flink, and API layers',
  },
]
</script>

<template>
  <section id="stats" class="relative py-24 border-t border-border/40">
    <!-- Background accent -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse at 50% 100%, rgba(34,211,238,0.03) 0%, transparent 65%);"
    />

    <div ref="el" class="max-w-6xl mx-auto px-6">
      <!-- Heading -->
      <div :class="['mb-12 reveal', isVisible && 'visible']">
        <p class="text-[10px] text-cyan-600 tracking-[0.3em] uppercase mb-2">// performance</p>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-100">By the numbers</h2>
        <p class="mt-2 text-slate-600 text-xs max-w-xl">
          Local benchmark. Single-machine Docker stack — not a production deployment.
          Numbers reflect the engineering quality of the pipeline design.
        </p>
      </div>

      <!-- Stats grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40 rounded overflow-hidden border border-border/40">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          :class="['bg-bg p-6 reveal', isVisible && 'visible']"
          :style="{ transitionDelay: `${i * 70}ms` }"
        >
          <!-- Label in terminal style -->
          <p class="text-[10px] text-slate-700 mb-3 truncate">
            <span class="text-cyan-600">›</span> {{ stat.label }}
          </p>

          <!-- Big number -->
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">{{ stat.value }}</span>
            <span class="text-xs text-slate-600">{{ stat.unit }}</span>
          </div>

          <!-- Description -->
          <p class="text-slate-600 text-[11px] leading-relaxed">{{ stat.desc }}</p>
        </div>
      </div>

      <!-- Footnote -->
      <p class="mt-5 text-[10px] text-slate-700 text-right">
        * ~5M ticks/day is an estimate at full capacity — pipeline runs locally on demand, not continuously.
        p95 measured with k6, single-machine Docker stack, 2026-05-18
      </p>
    </div>
  </section>
</template>
