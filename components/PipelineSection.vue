<script setup lang="ts">
const { el, isVisible } = useScrollReveal(0.05)

const stages = [
  {
    id: 'binance',
    label: 'Binance WS',
    color: '#f59e0b',
    layer: 'Source',
    desc: 'L2 order book snapshots + diffs streamed over WebSocket for 50 trading pairs. On startup: REST snapshot → buffer diffs → apply in sequence. Gap detected → reconnect with exponential backoff.',
  },
  {
    id: 'redpanda',
    label: 'Redpanda',
    color: '#22d3ee',
    layer: 'Broker',
    desc: 'Kafka-compatible broker with no ZooKeeper. Topics: market.raw.orderbook, market.normalized.*, market.agg.ohlcv_1m, market.dlq. Idempotent producer with deterministic message keys.',
  },
  {
    id: 'flink',
    label: 'PyFlink',
    color: '#22d3ee',
    layer: 'Processing',
    desc: 'Two stateful streaming jobs: (1) normalize + deduplicate → book ticker + spread + imbalance; (2) tumbling 1-min window → OHLCV. Event-time watermarks, late-event DLQ routing.',
  },
  {
    id: 'iceberg',
    label: 'Iceberg / MinIO',
    color: '#22d3ee',
    layer: 'Storage',
    desc: 'Three-layer lakehouse: raw.* (append-only, full Kafka metadata), normalized.* (typed, deduped), marts.* (aggregated, API-facing). Full Kafka offset preserved for replay.',
  },
  {
    id: 'trino',
    label: 'Trino',
    color: '#22d3ee',
    layer: 'Query',
    desc: 'Trino 457 queries Iceberg via REST catalog. MPP engine decouples storage from compute. In-process read model pre-loads 60 bars/symbol; hot-path requests skip Trino entirely.',
  },
  {
    id: 'dbt',
    label: 'dbt',
    color: '#22d3ee',
    layer: 'Analytics',
    desc: 'Transformation-as-code. Staging → intermediate → marts lineage. Tests baked into the model graph. dbt models drive the marts layer consumed by FastAPI.',
  },
  {
    id: 'fastapi',
    label: 'FastAPI',
    color: '#10b981',
    layer: 'API',
    desc: 'Async REST API with Pydantic v2 response models. Background poller refreshes in-memory read model every 30–60s. p95 latency 10ms at 1,000 req/s (local benchmark).',
  },
  {
    id: 'cdc',
    label: 'Postgres + Debezium',
    color: '#f97316',
    layer: 'CDC',
    desc: 'WAL-based change data capture. Postgres 16 with logical replication. Symbol config changes propagate to Redpanda without polling. Zero impact on OLTP write path.',
  },
]
</script>

<template>
  <section id="pipeline" class="relative py-24 overflow-hidden">
    <!-- Section heading -->
    <div ref="el" :class="['max-w-6xl mx-auto px-6 mb-12 reveal', isVisible && 'visible']">
      <p class="text-[10px] text-cyan-600 tracking-[0.3em] uppercase mb-2">// architecture</p>
      <h2 class="text-2xl md:text-3xl font-bold text-slate-100">End-to-end pipeline</h2>
      <p class="mt-2 text-slate-600 text-xs max-w-2xl">
        Every message is tracked from exchange wire to API response.
        Streaming ingestion layer on top; storage and query layer below.
      </p>
    </div>

    <!-- SVG pipeline animation -->
    <div class="max-w-7xl mx-auto px-4 overflow-x-auto pb-2">
      <!--
        Two-row layout:
        Row 1 (cy=130): Binance(85) → Redpanda(285) → PyFlink(485) → Iceberg(710)
          CDC below Redpanda: Debezium(285, cy=270) ─── upward 86px ──→ Redpanda
        Vertical turn: Iceberg(710) ──── down 162px ──→ Trino(710, cy=350)
        Row 2 (cy=350): Trino(710) → dbt(910) → FastAPI(1110)

        ViewBox: 1200 × 440
        Node box: 120 × 58, half-width=60, half-height=29
      -->
      <svg
        viewBox="0 0 1200 440"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full"
        style="min-width: 700px; max-height: 440px;"
        role="img"
        aria-label="TickSense data pipeline architecture"
      >
        <defs>
          <marker id="arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#2a4166" />
          </marker>
          <marker id="arr-down" markerWidth="5" markerHeight="7" refX="2.5" refY="6" orient="auto">
            <polygon points="0 0, 5 0, 2.5 7" fill="#2a4166" />
          </marker>
          <marker id="arr-up" markerWidth="5" markerHeight="7" refX="2.5" refY="1" orient="auto">
            <polygon points="0 7, 5 7, 2.5 0" fill="#1c2d4a" />
          </marker>
        </defs>

        <!-- ── Row 1 layer labels ─────────────────────────── -->
        <text x="85"  y="82" text-anchor="middle" fill="#374151" font-family="'JetBrains Mono',monospace" font-size="8" letter-spacing="1.5">SOURCE</text>
        <text x="285" y="82" text-anchor="middle" fill="#374151" font-family="'JetBrains Mono',monospace" font-size="8" letter-spacing="1.5">BROKER</text>
        <text x="485" y="82" text-anchor="middle" fill="#374151" font-family="'JetBrains Mono',monospace" font-size="8" letter-spacing="1.5">PROCESSING</text>
        <text x="710" y="82" text-anchor="middle" fill="#374151" font-family="'JetBrains Mono',monospace" font-size="8" letter-spacing="1.5">STORAGE</text>

        <!-- ── Row 2 layer labels ─────────────────────────── -->
        <text x="710"  y="308" text-anchor="middle" fill="#374151" font-family="'JetBrains Mono',monospace" font-size="8" letter-spacing="1.5">QUERY</text>
        <text x="910"  y="308" text-anchor="middle" fill="#374151" font-family="'JetBrains Mono',monospace" font-size="8" letter-spacing="1.5">ANALYTICS</text>
        <text x="1110" y="308" text-anchor="middle" fill="#374151" font-family="'JetBrains Mono',monospace" font-size="8" letter-spacing="1.5">API</text>

        <!-- ── Row 1 connection lines ─────────────────────── -->
        <!-- Binance → Redpanda -->
        <line x1="145" y1="130" x2="225" y2="130" stroke="#1c2d4a" stroke-width="1.5" marker-end="url(#arr)" />
        <!-- Redpanda → PyFlink -->
        <line x1="345" y1="130" x2="425" y2="130" stroke="#1c2d4a" stroke-width="1.5" marker-end="url(#arr)" />
        <!-- PyFlink → Iceberg (105px, wider gap before the turn) -->
        <line x1="545" y1="130" x2="650" y2="130" stroke="#1c2d4a" stroke-width="1.5" marker-end="url(#arr)" />

        <!-- ── Vertical turn: Iceberg → Trino ────────────── -->
        <line x1="710" y1="159" x2="710" y2="318" stroke="#1c2d4a" stroke-width="1.5" marker-end="url(#arr-down)" />
        <!-- Corner dot at Iceberg bottom -->
        <circle cx="710" cy="159" r="3" fill="#1c2d4a" />

        <!-- ── Row 2 connection lines ─────────────────────── -->
        <!-- Trino → dbt -->
        <line x1="770" y1="350" x2="850" y2="350" stroke="#1c2d4a" stroke-width="1.5" marker-end="url(#arr)" />
        <!-- dbt → FastAPI -->
        <line x1="970" y1="350" x2="1050" y2="350" stroke="#1c2d4a" stroke-width="1.5" marker-end="url(#arr)" />

        <!-- ── CDC: Debezium → Redpanda (dashed, upward) ──── -->
        <line x1="285" y1="241" x2="285" y2="159" stroke="#1c2d4a" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arr)" />
        <text x="302" y="205" fill="#374151" font-family="'JetBrains Mono',monospace" font-size="8">WAL / CDC</text>

        <!-- ── Row 1 nodes ────────────────────────────────── -->

        <!-- Binance WS -->
        <rect x="25"  y="101" width="120" height="58" rx="6" fill="#0c1220" stroke="#f59e0b" stroke-width="1" class="node-amber" />
        <circle cx="37"  cy="112" r="2.5" fill="#f59e0b" class="corner-dot" />
        <text x="85"  y="127" text-anchor="middle" fill="#f59e0b" font-family="'JetBrains Mono',monospace" font-size="10.5" font-weight="600">Binance WS</text>
        <text x="85"  y="144" text-anchor="middle" fill="#4b5563" font-family="'JetBrains Mono',monospace" font-size="8.5">L2 Order Book</text>

        <!-- Redpanda -->
        <rect x="225" y="101" width="120" height="58" rx="6" fill="#0c1220" stroke="#22d3ee" stroke-width="1" class="node-cyan" />
        <circle cx="237" cy="112" r="2.5" fill="#22d3ee" class="corner-dot" style="animation-delay:0.4s" />
        <text x="285" y="127" text-anchor="middle" fill="#22d3ee" font-family="'JetBrains Mono',monospace" font-size="10.5" font-weight="600">Redpanda</text>
        <text x="285" y="144" text-anchor="middle" fill="#4b5563" font-family="'JetBrains Mono',monospace" font-size="8.5">Kafka-compat</text>

        <!-- PyFlink -->
        <rect x="425" y="101" width="120" height="58" rx="6" fill="#0c1220" stroke="#22d3ee" stroke-width="1" class="node-cyan" style="animation-delay:0.3s" />
        <circle cx="437" cy="112" r="2.5" fill="#22d3ee" class="corner-dot" style="animation-delay:0.7s" />
        <text x="485" y="127" text-anchor="middle" fill="#22d3ee" font-family="'JetBrains Mono',monospace" font-size="10.5" font-weight="600">PyFlink</text>
        <text x="485" y="144" text-anchor="middle" fill="#4b5563" font-family="'JetBrains Mono',monospace" font-size="8.5">Stream proc.</text>

        <!-- Iceberg / MinIO -->
        <rect x="650" y="101" width="120" height="58" rx="6" fill="#0c1220" stroke="#22d3ee" stroke-width="1" class="node-cyan" style="animation-delay:0.6s" />
        <circle cx="662" cy="112" r="2.5" fill="#22d3ee" class="corner-dot" style="animation-delay:1.0s" />
        <text x="710" y="124" text-anchor="middle" fill="#22d3ee" font-family="'JetBrains Mono',monospace" font-size="10.5" font-weight="600">Iceberg</text>
        <text x="710" y="138" text-anchor="middle" fill="#22d3ee" font-family="'JetBrains Mono',monospace" font-size="8" opacity="0.5">on MinIO</text>
        <text x="710" y="152" text-anchor="middle" fill="#4b5563" font-family="'JetBrains Mono',monospace" font-size="8">Lakehouse</text>

        <!-- ── CDC node ────────────────────────────────────── -->
        <rect x="225" y="241" width="120" height="52" rx="6" fill="#0c1220" stroke="#f97316" stroke-width="1" class="node-orange" />
        <circle cx="237" cy="252" r="2.5" fill="#f97316" class="corner-dot" style="animation-delay:1.5s" />
        <text x="285" y="264" text-anchor="middle" fill="#f97316" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">Debezium</text>
        <text x="285" y="280" text-anchor="middle" fill="#4b5563" font-family="'JetBrains Mono',monospace" font-size="8.5">Postgres CDC</text>

        <!-- ── Row 2 nodes ────────────────────────────────── -->

        <!-- Trino -->
        <rect x="650" y="321" width="120" height="58" rx="6" fill="#0c1220" stroke="#22d3ee" stroke-width="1" class="node-cyan" style="animation-delay:0.9s" />
        <circle cx="662" cy="332" r="2.5" fill="#22d3ee" class="corner-dot" style="animation-delay:1.3s" />
        <text x="710" y="347" text-anchor="middle" fill="#22d3ee" font-family="'JetBrains Mono',monospace" font-size="10.5" font-weight="600">Trino</text>
        <text x="710" y="364" text-anchor="middle" fill="#4b5563" font-family="'JetBrains Mono',monospace" font-size="8.5">Query engine</text>

        <!-- dbt -->
        <rect x="850" y="321" width="120" height="58" rx="6" fill="#0c1220" stroke="#22d3ee" stroke-width="1" class="node-cyan" style="animation-delay:1.1s" />
        <circle cx="862" cy="332" r="2.5" fill="#22d3ee" class="corner-dot" style="animation-delay:1.5s" />
        <text x="910" y="347" text-anchor="middle" fill="#22d3ee" font-family="'JetBrains Mono',monospace" font-size="10.5" font-weight="600">dbt</text>
        <text x="910" y="364" text-anchor="middle" fill="#4b5563" font-family="'JetBrains Mono',monospace" font-size="8.5">Transformations</text>

        <!-- FastAPI -->
        <rect x="1050" y="321" width="120" height="58" rx="6" fill="#0c1220" stroke="#10b981" stroke-width="1" class="node-emerald" />
        <circle cx="1062" cy="332" r="2.5" fill="#10b981" class="corner-dot" style="animation-delay:0.6s" />
        <text x="1110" y="347" text-anchor="middle" fill="#10b981" font-family="'JetBrains Mono',monospace" font-size="10.5" font-weight="600">FastAPI</text>
        <text x="1110" y="364" text-anchor="middle" fill="#4b5563" font-family="'JetBrains Mono',monospace" font-size="8.5">REST API</text>

        <!-- ── Particles: Row 1 ───────────────────────────── -->

        <!-- B → R  (amber, 80px) -->
        <circle cx="145" cy="130" r="2.5" fill="#f59e0b" class="particle-h" style="animation-delay:0s" />
        <circle cx="145" cy="130" r="2.5" fill="#f59e0b" class="particle-h" style="animation-delay:-0.47s" />
        <circle cx="145" cy="130" r="2.5" fill="#f59e0b" class="particle-h" style="animation-delay:-0.93s" />

        <!-- R → P  (cyan, 80px) -->
        <circle cx="345" cy="130" r="2.5" fill="#22d3ee" class="particle-h" style="animation-delay:-0.15s" />
        <circle cx="345" cy="130" r="2.5" fill="#22d3ee" class="particle-h" style="animation-delay:-0.62s" />
        <circle cx="345" cy="130" r="2.5" fill="#22d3ee" class="particle-h" style="animation-delay:-1.08s" />

        <!-- P → I  (cyan, 105px) -->
        <circle cx="545" cy="130" r="2.5" fill="#22d3ee" class="particle-h105" style="animation-delay:-0.25s" />
        <circle cx="545" cy="130" r="2.5" fill="#22d3ee" class="particle-h105" style="animation-delay:-0.78s" />
        <circle cx="545" cy="130" r="2.5" fill="#22d3ee" class="particle-h105" style="animation-delay:-1.32s" />

        <!-- ── Particle: Iceberg → Trino (down 162px) ─────── -->
        <circle cx="710" cy="159" r="2.5" fill="#22d3ee" class="particle-v-down" style="animation-delay:0s" />
        <circle cx="710" cy="159" r="2.5" fill="#22d3ee" class="particle-v-down" style="animation-delay:-0.67s" />
        <circle cx="710" cy="159" r="2.5" fill="#22d3ee" class="particle-v-down" style="animation-delay:-1.33s" />

        <!-- ── Particles: Row 2 ───────────────────────────── -->

        <!-- T → dbt  (cyan, 80px) -->
        <circle cx="770" cy="350" r="2.5" fill="#22d3ee" class="particle-h" style="animation-delay:-0.3s" />
        <circle cx="770" cy="350" r="2.5" fill="#22d3ee" class="particle-h" style="animation-delay:-0.77s" />
        <circle cx="770" cy="350" r="2.5" fill="#22d3ee" class="particle-h" style="animation-delay:-1.23s" />

        <!-- dbt → FastAPI  (cyan, 80px) -->
        <circle cx="970" cy="350" r="2.5" fill="#22d3ee" class="particle-h" style="animation-delay:-0.1s" />
        <circle cx="970" cy="350" r="2.5" fill="#22d3ee" class="particle-h" style="animation-delay:-0.57s" />
        <circle cx="970" cy="350" r="2.5" fill="#22d3ee" class="particle-h" style="animation-delay:-1.03s" />

        <!-- ── Particle: CDC upward (86px) ───────────────── -->
        <circle cx="285" cy="241" r="2" fill="#f97316" class="particle-v-up" style="animation-delay:0s" />
        <circle cx="285" cy="241" r="2" fill="#f97316" class="particle-v-up" style="animation-delay:-0.57s" />
      </svg>
    </div>

    <!-- Stage descriptions -->
    <div class="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div
        v-for="(stage, i) in stages"
        :key="stage.id"
        class="p-4 rounded border border-border bg-surface/50 reveal"
        :class="isVisible && 'visible'"
        :style="{ transitionDelay: `${i * 70}ms` }"
      >
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full shrink-0" :style="{ backgroundColor: stage.color }" />
          <span class="text-[9px] tracking-widest uppercase" :style="{ color: stage.color }">{{ stage.layer }}</span>
        </div>
        <p class="text-slate-200 text-xs font-semibold mb-1.5">{{ stage.label }}</p>
        <p class="text-slate-600 text-[11px] leading-relaxed">{{ stage.desc }}</p>
      </div>
    </div>
  </section>
</template>
