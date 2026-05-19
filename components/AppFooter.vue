<script setup lang="ts">
const phases = [
  { n: 0, label: 'Scaffolding — CLAUDE.md, skills, uv workspace, CI', done: true },
  { n: 1, label: 'Local stack + ingest — Binance WS → Kafka (100+ tests, 89% cov)', done: true },
  { n: 2, label: 'Flink processing — normalize, dedup, OHLCV → Iceberg silver', done: true },
  { n: 3, label: 'CDC + replay — Debezium, Flink upsert, replay CLI', done: true },
  { n: 4, label: 'Analytics — dbt + Trino, FastAPI, Prometheus, Grafana', done: true },
  { n: 5, label: 'Ops + observability — Airflow, Great Expectations, SLA alerts', done: true },
  { n: 6, label: 'Demo + blog + web — ticksense.ai, demo video, blog posts', done: false },
]
</script>

<template>
  <footer class="border-t border-border/40 py-16">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <!-- Left: branding + description -->
        <div>
          <p class="text-lg font-bold mb-3">
            <span class="text-cyan-400">tick</span><span class="text-slate-300">sense</span><span class="text-slate-700">.ai</span>
          </p>
          <p class="text-slate-600 text-xs leading-relaxed max-w-sm mb-6">
            Real-time crypto market lakehouse built as a portfolio project and engineering reference.
            Binance L2 WebSocket → Redpanda → PyFlink → Iceberg → Trino → FastAPI.
          </p>
          <div class="flex items-center gap-4">
            <a
              href="https://github.com/AndrewAct/ticksense"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-200 transition-colors duration-150"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              AndrewAct/ticksense
            </a>
            <a
              href="https://github.com/AndrewAct/ticksense-ui"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-200 transition-colors duration-150"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              AndrewAct/ticksense-ui
            </a>
          </div>
        </div>

        <!-- Right: phase roadmap -->
        <div>
          <p class="text-[10px] text-slate-700 tracking-widest uppercase mb-4">roadmap</p>
          <ul class="space-y-2">
            <li
              v-for="phase in phases"
              :key="phase.n"
              class="flex items-start gap-2.5 text-[11px]"
            >
              <span
                :class="[
                  'shrink-0 mt-0.5 w-4 h-4 rounded-sm flex items-center justify-center text-[9px] font-bold',
                  phase.done
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-cyan-500/10 text-cyan-400 border border-cyan-800/40',
                ]"
              >{{ phase.done ? '✓' : phase.n }}</span>
              <span :class="phase.done ? 'text-slate-600' : 'text-slate-400'">
                <span class="text-slate-500">phase {{ phase.n }}</span> — {{ phase.label }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] text-slate-700">
        <span>ticksense.ai · open source · MIT license</span>
        <span>local benchmark · not a production deployment</span>
      </div>
    </div>
  </footer>
</template>
