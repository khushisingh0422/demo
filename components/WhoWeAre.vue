<script setup lang="ts">
import { whoWeAre } from '~/data/site'
const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="about" ref="root" class="section about">
    <div class="container grid">
      <div class="media reveal">
        <img :src="whoWeAre.image" alt="Contemporary residential architecture" loading="lazy" />
        <div class="note">
          <strong>{{ whoWeAre.note.value }}</strong>
          <span>{{ whoWeAre.note.text }}</span>
        </div>
      </div>

      <div class="copy reveal">
        <div class="eyebrow">Who we are</div>
        <h2>{{ whoWeAre.title }}</h2>
        <p class="lead">{{ whoWeAre.lead }}</p>
        <p v-for="(p, i) in whoWeAre.body" :key="i">{{ p }}</p>
        <a class="text-link" href="#consultation">Know more about VD Vanchers ↗</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about { background: var(--paper); }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 78px; align-items: center; }
.media { position: relative; min-height: 530px; }
.media img { width: 88%; height: 500px; object-fit: cover; }
.note { position: absolute; right: 0; bottom: 20px; background: var(--navy); color: var(--white); padding: 26px 30px; max-width: 220px; border-bottom: 4px solid var(--gold); }
.note strong { font-family: var(--serif); font-size: 2.2rem; display: block; color: var(--gold2); line-height: 1.1; font-weight: 500; }
.note span { font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; }
.lead { font-family: var(--serif); font-size: 1.45rem; line-height: 1.48; color: var(--navy); }
.copy p:not(.lead) { color: var(--muted); }
.text-link { display: inline-flex; gap: 12px; margin-top: 14px; padding-bottom: 7px; border-bottom: 1px solid var(--gold); font-size: .74rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: var(--navy); transition: color .2s; }
.text-link:hover { color: var(--gold); }
@media (max-width: 900px) { .grid { gap: 40px; } }
@media (max-width: 680px) {
  .grid { grid-template-columns: 1fr; }
  .media { min-height: 390px; }
  .media img { height: 360px; }
  .note { padding: 18px 20px; }
}
</style>
