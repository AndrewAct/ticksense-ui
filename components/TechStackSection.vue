<script setup lang="ts">
const { el, isVisible } = useScrollReveal(0.1)

interface TechItem {
  layer: string
  tech: string
  role: string
  why: string
  color: string
}

const stack: TechItem[] = [
  {
    layer: 'ingestion',
    tech: 'Python 3.13 + aiokafka',
    role: 'Binance WebSocket → Kafka producer',
    why: 'Async I/O handles 50 concurrent streams; idempotent producer with DLQ routing',
    color: '#f59e0b',
  },
  {
    layer: 'broker',
    tech: 'Redpanda v24.3',
    role: 'Kafka-compatible event broker',
    why: 'No ZooKeeper dependency; drop-in Kafka replacement with better tail latency',
    color: '#22d3ee',
  },
  {
    layer: 'processing',
    tech: 'PyFlink 1.18',
    role: 'Stateful stream processing',
    why: 'Exactly-once semantics, event-time watermarks, native Iceberg sink connector',
    color: '#22d3ee',
  },
  {
    layer: 'storage',
    tech: 'Apache Iceberg 1.6',
    role: 'Open table format on MinIO / GCS',
    why: 'ACID transactions, time-travel queries, schema evolution — without a proprietary warehouse',
    color: '#22d3ee',
  },
  {
    layer: 'cdc',
    tech: 'Debezium + Postgres 16',
    role: 'WAL-based change data capture',
    why: 'Zero-impact CDC via logical replication; symbol config changes propagate in real time',
    color: '#f97316',
  },
  {
    layer: 'query',
    tech: 'Trino 457',
    role: 'Federated SQL over Iceberg',
    why: 'MPP query engine; decouples storage from compute; familiar SQL interface for analysts',
    color: '#22d3ee',
  },
  {
    layer: 'analytics',
    tech: 'dbt',
    role: 'Transformation-as-code',
    why: 'Staging → intermediate → marts lineage; tests baked into the model graph',
    color: '#22d3ee',
  },
  {
    layer: 'api',
    tech: 'FastAPI + Pydantic v2',
    role: 'Async REST API, in-memory read model',
    why: 'Hot path serves from pre-loaded in-memory model; cold path falls back to Trino',
    color: '#10b981',
  },
  {
    layer: 'catalog',
    tech: 'Iceberg REST (tabulario)',
    role: 'Open catalog for Flink + Trino',
    why: 'Standard REST catalog spec; both Flink and Trino register tables without coordination',
    color: '#22d3ee',
  },
  {
    layer: 'orchestration',
    tech: 'Airflow',
    role: 'DAG-based pipeline orchestration',
    why: 'Idempotent backfill DAGs; sensor-based SLA alerting; retry policies per task',
    color: '#64748b',
  },
  {
    layer: 'backfill',
    tech: 'Apache Spark',
    role: 'Distributed compaction & backfill',
    why: 'Small-file compaction for Iceberg; parallel historical replay across partitions',
    color: '#64748b',
  },
  {
    layer: 'observability',
    tech: 'Prometheus + Grafana',
    role: 'Metrics, latency, pipeline health',
    why: 'Custom Prometheus middleware on FastAPI; Grafana panels track p50/p95/p99 per endpoint',
    color: '#64748b',
  },
]
</script>

<template>
  <section id="stack" class="relative py-24 border-t border-border/40">
    <div ref="el" class="max-w-6xl mx-auto px-6">
      <!-- Heading -->
      <div :class="['mb-12 reveal', isVisible && 'visible']">
        <p class="text-[10px] text-cyan-600 tracking-[0.3em] uppercase mb-2">// tech stack</p>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-100">Every layer, intentional</h2>
        <p class="mt-2 text-slate-600 text-xs max-w-xl">
          No technology was chosen by default. Each replaces a mainstream alternative with a deliberate tradeoff.
        </p>
      </div>

      <!-- Stack grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div
          v-for="(item, i) in stack"
          :key="item.layer"
          :class="['group p-4 rounded border border-border bg-surface/40 hover:border-border-bright hover:bg-surface transition-all duration-200 reveal', isVisible && 'visible']"
          :style="{ transitionDelay: `${i * 55}ms` }"
        >
          <!-- Layer badge + tech name -->
          <div class="flex items-start justify-between gap-2 mb-2">
            <span
              class="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded border"
              :style="{ color: item.color, borderColor: item.color + '40', backgroundColor: item.color + '0d' }"
            >{{ item.layer }}</span>
          </div>

          <p class="text-slate-200 text-xs font-semibold mb-0.5 leading-tight">{{ item.tech }}</p>
          <p class="text-slate-600 text-[10px] mb-2">{{ item.role }}</p>

          <!-- Why line, dimmed until hover -->
          <p class="text-slate-700 group-hover:text-slate-500 text-[10px] leading-relaxed transition-colors duration-200 border-t border-border/50 pt-2">
            <span class="text-cyan-700">›</span> {{ item.why }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
