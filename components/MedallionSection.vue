<script setup lang="ts">
const { el, isVisible } = useScrollReveal(0.1)

const layers = [
  {
    tier: 'Bronze',
    hex: '#b87333',
    prefix: 'raw.*',
    tables: ['raw.orderbook_diffs'],
    badge: 'append-only',
    properties: [
      'Full Kafka metadata preserved (topic · partition · offset)',
      'Raw Binance L2 payload — never mutated',
      'Replay-safe: any offset range re-processable',
      'Written by PyFlink normalize job on arrival',
    ],
    note: null,
  },
  {
    tier: 'Silver',
    hex: '#94a3b8',
    prefix: 'normalized.*',
    tables: ['normalized.book_ticker', 'normalized.ohlcv_1m'],
    badge: 'deduplicated',
    properties: [
      'Typed + schema-enforced, dedup by last_update_id',
      'Event-time indexed, 30s watermark',
      'Late events routed to market.dlq',
      'Spread, mid-price, top-5 imbalance computed by Flink',
    ],
    note: 'dbt source for staging models',
  },
  {
    tier: 'Gold',
    hex: '#ca8a04',
    prefix: 'marts.*',
    tables: ['marts.mart_ohlcv', 'marts.mart_liquidity', 'marts.mart_exchange_health'],
    badge: 'API-facing',
    properties: [
      'Produced by dbt: staging → intermediate → marts',
      'mart_ohlcv: VWAP, OHLC per 1m window',
      'mart_liquidity: latest spread_bps, imbalance signal',
      'mart_exchange_health: per-symbol freshness + SLA status',
    ],
    note: 'Queried directly by FastAPI read model',
  },
]
</script>

<template>
  <section class="relative py-20 border-t border-border/40 overflow-hidden">
    <!-- Subtle background gradient accent -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse at 30% 50%, rgba(184,115,51,0.03) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(202,138,4,0.03) 0%, transparent 50%);"
    />

    <div ref="el" class="relative max-w-6xl mx-auto px-6">
      <!-- Heading -->
      <div :class="['mb-10 reveal', isVisible && 'visible']">
        <p class="text-[10px] text-cyan-600 tracking-[0.3em] uppercase mb-2">// storage layers</p>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-100">Medallion architecture</h2>
        <p class="mt-2 text-slate-600 text-xs max-w-2xl">
          Three Iceberg layers on MinIO. Data is never deleted from bronze — each layer
          adds structure and removes noise, preserving full replay capability at every stage.
        </p>
      </div>

      <!-- Flow indicator: Bronze → Silver → Gold -->
      <div
        :class="['flex items-center gap-2 mb-8 reveal', isVisible && 'visible']"
        style="transition-delay: 80ms"
      >
        <span class="text-xs font-semibold" style="color:#b87333">Bronze</span>
        <svg class="w-5 h-3 text-border" viewBox="0 0 20 12" fill="none">
          <path d="M0 6h18M14 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="text-xs font-semibold" style="color:#94a3b8">Silver</span>
        <svg class="w-5 h-3 text-border" viewBox="0 0 20 12" fill="none">
          <path d="M0 6h18M14 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="text-xs font-semibold" style="color:#ca8a04">Gold</span>
        <span class="ml-3 text-[10px] text-slate-700">raw → curated → business-facing</span>
      </div>

      <!-- Three tier cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="(layer, i) in layers"
          :key="layer.tier"
          class="relative rounded border bg-surface/50 overflow-hidden reveal"
          :class="isVisible && 'visible'"
          :style="{ borderColor: layer.hex + '40', transitionDelay: `${i * 100}ms` }"
        >
          <!-- Top accent bar -->
          <div class="h-px w-full" :style="{ backgroundColor: layer.hex }" />

          <div class="p-5">
            <!-- Header -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <!-- Metal dot -->
                  <span
                    class="w-2.5 h-2.5 rounded-full"
                    :style="{ backgroundColor: layer.hex, boxShadow: `0 0 6px ${layer.hex}60` }"
                  />
                  <span
                    class="text-base font-bold tracking-tight"
                    :style="{ color: layer.hex }"
                  >{{ layer.tier }}</span>
                </div>
                <code
                  class="text-[11px] px-1.5 py-0.5 rounded"
                  :style="{ color: layer.hex + 'cc', backgroundColor: layer.hex + '12', border: `1px solid ${layer.hex}25` }"
                >{{ layer.prefix }}</code>
              </div>
              <!-- Badge -->
              <span
                class="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border mt-0.5"
                :style="{ color: layer.hex, borderColor: layer.hex + '30', backgroundColor: layer.hex + '0d' }"
              >{{ layer.badge }}</span>
            </div>

            <!-- Actual table names -->
            <div class="mb-4 space-y-1">
              <p class="text-[9px] text-slate-700 uppercase tracking-widest mb-1.5">tables</p>
              <div
                v-for="table in layer.tables"
                :key="table"
                class="flex items-center gap-1.5"
              >
                <span class="w-1 h-1 rounded-full shrink-0" :style="{ backgroundColor: layer.hex + '80' }" />
                <code class="text-[10px] text-slate-400 font-mono">{{ table }}</code>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t mb-4" :style="{ borderColor: layer.hex + '20' }" />

            <!-- Properties -->
            <ul class="space-y-1.5">
              <li
                v-for="prop in layer.properties"
                :key="prop"
                class="flex items-start gap-2 text-[11px] text-slate-600 leading-snug"
              >
                <span class="shrink-0 mt-0.5" :style="{ color: layer.hex + '80' }">›</span>
                {{ prop }}
              </li>
            </ul>

            <!-- Note (only silver + gold) -->
            <p
              v-if="layer.note"
              class="mt-4 text-[10px] pt-3 border-t"
              :style="{ color: layer.hex + '90', borderColor: layer.hex + '15' }"
            >
              ↳ {{ layer.note }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
