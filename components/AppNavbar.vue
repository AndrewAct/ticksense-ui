<script setup lang="ts">
const scrolled = ref(false)

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 40 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'border-b border-border bg-bg/90 backdrop-blur-md'
        : 'border-b border-transparent bg-transparent',
    ]"
  >
    <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
      <!-- Logo -->
      <a href="#" class="text-sm font-semibold tracking-tight">
        <span class="text-cyan-400">tick</span><span class="text-slate-300">sense</span>
        <span class="text-slate-600">.ai</span>
      </a>

      <!-- Nav links -->
      <div class="hidden md:flex items-center gap-7 text-xs text-slate-500">
        <a href="#pipeline" class="hover:text-cyan-400 transition-colors duration-150">pipeline</a>
        <a href="#stats" class="hover:text-cyan-400 transition-colors duration-150">stats</a>
        <a href="#stack" class="hover:text-cyan-400 transition-colors duration-150">stack</a>
        <a
          href="https://github.com/AndrewAct/ticksense"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border hover:border-cyan-600/60 hover:text-slate-200 transition-all duration-150 text-xs"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          github
        </a>
      </div>
    </div>
  </nav>
</template>
