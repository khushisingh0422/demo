<script setup lang="ts">
import { offerings, faqs } from '~/data/site'
const root = ref<HTMLElement | null>(null)
const openFaq = ref<number | null>(0)
useReveal(root)

const icons: Record<string, string> = {
  garden: 'M12 22V12M12 12c0-4 3-7 7-7 0 4-3 7-7 7zm0 0c0-4-3-7-7-7 0 4 3 7 7 7zM5 22h14',
  home: 'M3 11l9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11z',
  pool: 'M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M2 22c2 0 2-1.5 4-1.5S8 22 10 22s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M8 15V5a2 2 0 0 1 4 0M16 15V5a2 2 0 0 0-4 0M8 9h8',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
}
</script>

<template>
  <section id="offer" ref="root" class="section offer">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">What We Offer</span>
        <h2 class="section-title">Everything You Need for Countryside Living</h2>
        <p>Every farmhouse comes with amenities designed for comfort, privacy and celebration.</p>
      </div>

      <div class="grid">
        <div v-for="(o, i) in offerings" :key="o.title" class="item reveal" :style="{ transitionDelay: `${i * 0.1}s` }">
          <span class="icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path :d="icons[o.icon]" /></svg>
          </span>
          <h3>{{ o.title }}</h3>
          <p>{{ o.text }}</p>
        </div>
      </div>

      <div class="faq-wrap reveal">
        <div class="faq-img">
          <img src="/images/real-estate-agent.jpg" alt="Farmhouse" loading="lazy" />
        </div>
        <div class="faq">
          <span class="eyebrow">Common Questions</span>
          <h3 class="faq-title">Good to Know</h3>
          <div v-for="(f, i) in faqs" :key="f.q" class="q" :class="{ open: openFaq === i }">
            <button :aria-expanded="openFaq === i" @click="openFaq = openFaq === i ? null : i">
              {{ f.q }} <span>{{ openFaq === i ? '−' : '+' }}</span>
            </button>
            <div class="a"><p>{{ f.a }}</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.offer { background: var(--cream); }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.item { background: var(--white); border-radius: var(--radius); padding: 34px 28px; border: 1px solid #ebe8e0; transition: transform .35s, box-shadow .35s, border-color .35s, opacity .8s; }
.item.is-visible:hover { transform: translateY(-6px); box-shadow: var(--shadow); border-color: transparent; }
.icon { width: 60px; height: 60px; border-radius: 16px; background: var(--navy-800); color: var(--gold); display: grid; place-items: center; margin-bottom: 22px; }
.item h3 { font-size: 22px; color: var(--navy-900); margin-bottom: 10px; }
.item p { color: var(--muted); font-size: 14.5px; margin: 0; }

.faq-wrap { margin-top: 80px; display: grid; grid-template-columns: 1fr 1.1fr; gap: 56px; align-items: center; }
.faq-img img { width: 100%; aspect-ratio: 5/4; object-fit: cover; border-radius: var(--radius); box-shadow: var(--shadow); }
.faq-title { font-size: 36px; color: var(--navy-900); margin: 10px 0 24px; }
.q { border-bottom: 1px solid #e2dfd6; }
.q button { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; text-align: left; background: none; border: 0; padding: 20px 0; font: 600 16px var(--sans); color: var(--navy-900); cursor: pointer; }
.q button span { font-size: 22px; color: var(--gold); }
.a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s ease; }
.a > p { overflow: hidden; margin: 0; color: var(--muted); }
.open .a { grid-template-rows: 1fr; }
.open .a > p { padding-bottom: 20px; }
@media (max-width: 1024px) { .grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 860px) { .faq-wrap { grid-template-columns: 1fr; gap: 36px; } }
@media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }
</style>
