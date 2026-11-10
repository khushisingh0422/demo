<script setup lang="ts">
import { stats } from '~/data/site'

const root = ref<HTMLElement | null>(null)
const shown = ref(stats.map(() => 0))

onMounted(() => {
  if (!root.value) return
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    io.disconnect()
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1800, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      shown.value = stats.map(s => Math.round(s.value * eased))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, { threshold: 0.4 })
  io.observe(root.value)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <!-- OSR Realtech numbers card -->
  <section ref="root" class="stats">
    <div class="container">
      <div class="card">
        <div v-for="(s, i) in stats" :key="s.label" class="stat">
          <strong>{{ shown[i].toLocaleString('en-IN') }}<span>{{ s.suffix }}</span></strong>
          <p>{{ s.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats { background: linear-gradient(to bottom, var(--white) 50%, var(--card) 50%); padding: 10px 0 30px; }
.card {
  display: grid; grid-template-columns: repeat(4, 1fr); background: var(--white);
  border-radius: 28px; border-top: 2px solid var(--gold); overflow: hidden;
  box-shadow: 0 20px 50px -24px rgba(15,28,46,.3);
}
.stat { padding: 40px 34px; }
.stat + .stat { border-left: 1px solid var(--navy-900); }
strong { font-family: var(--serif); font-size: clamp(36px, 3.6vw, 50px); font-weight: 700; color: var(--navy-900); line-height: 1; display: block; font-variant-numeric: tabular-nums; }
strong span { color: var(--gold); font-weight: 400; }
p { margin-top: 14px; font-size: 11.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--navy-900); }
@media (max-width: 860px) {
  .card { grid-template-columns: 1fr 1fr; }
  .stat:nth-child(3) { border-left: 0; }
  .stat:nth-child(n+3) { border-top: 1px solid var(--line); }
  .stat { padding: 28px 22px; }
}
</style>
