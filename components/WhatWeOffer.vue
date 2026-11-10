<script setup lang="ts">
import { offer } from '~/data/site'
const root = ref<HTMLElement | null>(null)
const openFaq = ref<number | null>(0)
useReveal(root)
</script>

<template>
  <!-- Layout follows dvayu.co.in "What We Offer" -->
  <section id="offer" ref="root" class="section offer">
    <div class="container grid">
      <div class="left reveal">
        <span class="label gold">What We Offer</span>
        <h2 class="h2">{{ offer.title }}</h2>
        <div class="faqs">
          <div v-for="(f, i) in offer.faqs" :key="f.q" class="q" :class="{ open: openFaq === i }">
            <button :aria-expanded="openFaq === i" @click="openFaq = openFaq === i ? null : i">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" /></svg>
              {{ f.q }}
            </button>
            <div class="a"><p v-html="f.a" /></div>
          </div>
        </div>
      </div>

      <div class="tiles reveal">
        <div v-for="t in offer.tiles" :key="t.title" class="tile" :class="{ photo: t.image }">
          <img v-if="t.image" :src="t.image" alt="" loading="lazy" />
          <span>{{ t.title }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.offer { background: var(--mint); }
.grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 90px; align-items: center; }
.gold { color: #9a7b45; }
.left .h2 { margin: 18px 0 34px; }
.q + .q { border-top: 1px solid var(--navy-700); }
.q button { width: 100%; display: flex; align-items: center; gap: 20px; text-align: left; background: none; border: 0; padding: 18px 0; font: 600 19px var(--sans); color: var(--ink); cursor: pointer; }
.q button svg { flex: none; transition: transform .3s; }
.q.open button svg { transform: rotate(180deg); }
.a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s ease; }
.a > p { overflow: hidden; color: #3d4a57; font-size: 16px; }
.a > p :deep(strong) { color: var(--navy-900); }
.open .a { grid-template-rows: 1fr; }
.open .a > p { padding-bottom: 26px; }

.tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.tile { position: relative; aspect-ratio: 13/10; border-radius: 14px; overflow: hidden; background: var(--navy-800); display: flex; align-items: center; padding: 34px; }
.tile:nth-child(4) { background: var(--navy-700); }
.tile img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .6s; }
.tile.photo::after { content: ''; position: absolute; inset: 0; background: rgba(15,28,46,.45); }
.tile:hover img { transform: scale(1.05); }
.tile span { position: relative; z-index: 1; color: var(--white); font-size: 26px; font-weight: 300; line-height: 1.3; }
.tile:not(.photo) span::before { content: ''; display: block; width: 40px; height: 2px; background: var(--gold); margin-bottom: 18px; }
@media (max-width: 1000px) { .grid { grid-template-columns: 1fr; gap: 48px; } }
@media (max-width: 560px) { .tile { padding: 20px; } .tile span { font-size: 18px; } .tiles { gap: 12px; } }
</style>
