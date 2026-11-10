<script setup lang="ts">
import { stats } from '~/data/site'

const root = ref<HTMLElement | null>(null)
const animated = (s: (typeof stats)[number]) => (s as any).count !== false
const shown = ref(stats.map(s => (animated(s) ? 0 : s.value)))
const format = (n: number, s: (typeof stats)[number]) => (animated(s) ? n.toLocaleString('en-IN') : String(n))

onMounted(() => {
  if (!root.value) return
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    io.disconnect()
    const duration = 1800
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      shown.value = stats.map(s => (animated(s) ? Math.round(s.value * eased) : s.value))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, { threshold: 0.3 })
  io.observe(root.value)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <section ref="root" class="stats">
    <div class="container grid">
      <div v-for="(s, i) in stats" :key="s.label" class="stat">
        <strong>{{ format(shown[i], s) }}{{ s.suffix }}</strong>
        <span>{{ s.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats { background: var(--navy); color: var(--white); padding: 48px 0; }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.stat { padding: 10px 26px; border-right: 1px solid rgba(255,255,255,.18); }
.stat:first-child { padding-left: 0; }
.stat:last-child { border: 0; }
strong { font-family: var(--serif); font-size: 2.8rem; font-weight: 500; display: block; color: var(--gold2); line-height: 1.15; font-variant-numeric: tabular-nums; }
span { font-size: .68rem; letter-spacing: .13em; text-transform: uppercase; color: rgba(255,255,255,.7); }
@media (max-width: 900px) { .stat { padding: 10px 15px; } }
@media (max-width: 680px) {
  .grid { grid-template-columns: 1fr 1fr; row-gap: 24px; }
  .stat:nth-child(2) { border: 0; }
  .stat:nth-child(3) { padding-left: 0; }
  strong { font-size: 2.3rem; }
}
</style>
