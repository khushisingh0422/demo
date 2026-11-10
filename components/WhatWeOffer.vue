<script setup lang="ts">
import { services } from '~/data/site'
const root = ref<HTMLElement | null>(null)
useReveal(root)
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <section id="services" ref="root" class="section services">
    <div class="container">
      <div class="reveal">
        <div class="eyebrow">Our expertise</div>
        <h2 v-html="services.title" />
        <p class="intro-text">{{ services.intro }}</p>
      </div>

      <div class="grid reveal">
        <div v-for="(s, i) in services.items" :key="s.title" class="service">
          <div class="num">{{ pad(i + 1) }}</div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services { background: var(--navy); color: var(--white); position: relative; overflow: hidden; }
.services::before {
  content: 'VD'; position: absolute; right: -25px; top: -130px;
  font-family: var(--display); font-size: 26rem; font-weight: 800; color: rgba(255,255,255,.025); line-height: 1; pointer-events: none;
}
.intro-text { color: rgba(255,255,255,.68); margin-bottom: 40px; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,.17); border: 1px solid rgba(255,255,255,.17); position: relative; }
.service { padding: 30px 26px; background: var(--navy); min-height: 190px; transition: background .3s; }
.service:hover { background: var(--navy2); }
.num { font-family: var(--serif); font-size: 1.8rem; color: var(--gold); margin-bottom: 20px; }
h3 { font-size: 1.35rem; margin-bottom: 10px; }
.service p { font-size: .82rem; color: rgba(255,255,255,.65); margin: 0; }
@media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 680px) { .grid { grid-template-columns: 1fr; } }
</style>
