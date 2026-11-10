<script setup lang="ts">
import { stats } from '~/data/site'

const root = ref<HTMLElement | null>(null)
const shown = ref(stats.map(() => 0))

const format = (n: number) => n.toLocaleString('en-IN')

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
      shown.value = stats.map((s) => Math.round(s.value * eased))
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
    <div class="container row">
      <div v-for="(s, i) in stats" :key="s.label" class="stat">
        <strong>{{ format(shown[i]) }}<span>{{ s.suffix }}</span></strong>
        <p>{{ s.label }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats {
  background:
    linear-gradient(rgba(11,18,56,.92), rgba(11,18,56,.92)),
    url('/images/IMG_0112-scaled.jpg') center/cover fixed;
  color: var(--white); padding: 80px 0;
}
.row { display: grid; grid-template-columns: repeat(4, 1fr); }
.stat { text-align: center; padding: 8px 16px; }
.stat + .stat { border-left: 1px solid rgba(255,255,255,.12); }
strong { font-family: var(--serif); font-size: clamp(44px, 5vw, 64px); font-weight: 600; line-height: 1; display: block; }
strong span { color: var(--sky); }
p { margin: 12px 0 0; font-size: 13px; letter-spacing: .18em; text-transform: uppercase; color: var(--silver); }
@media (max-width: 768px) {
  .stats { background-attachment: scroll; }
  .row { grid-template-columns: 1fr 1fr; row-gap: 40px; }
  .stat:nth-child(3) { border-left: 0; }
}
</style>
