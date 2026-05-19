export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'TickSense — Real-time Crypto Market Lakehouse',
      meta: [
        {
          name: 'description',
          content:
            'End-to-end crypto market lakehouse: Binance L2 WebSocket → Redpanda → PyFlink → Iceberg → Trino → FastAPI. 5M ticks/day, 50 pairs, sub-30s end-to-end latency.',
        },
        { property: 'og:title', content: 'TickSense — Real-time Crypto Market Lakehouse' },
        {
          property: 'og:description',
          content:
            'Open-source streaming data platform for crypto market microstructure analysis. Built with Redpanda, PyFlink, Apache Iceberg, Trino, dbt, and FastAPI.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://ticksense.ai' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'theme-color', content: '#070c18' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  ssr: true,

  nitro: {
    preset: 'static',
  },

  compatibilityDate: '2024-11-01',
})
