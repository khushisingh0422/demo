<script setup lang="ts">
import { whoWeAre } from '~/data/site'
const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <!-- Layout follows dvayu.co.in "Who We Are" -->
  <section id="about" ref="root" class="section about">
    <div class="container grid">
      <div class="media reveal">
        <div class="frame"><img :src="whoWeAre.image" alt="VD Vanchers farmhouse" loading="lazy" /></div>
        <div class="badge"><strong>{{ whoWeAre.badge.value }}</strong><span>{{ whoWeAre.badge.label }}</span></div>
        <img :src="whoWeAre.circle" alt="Our team with clients" class="circle" loading="lazy" />
      </div>

      <div class="text reveal">
        <span class="label">Who We Are</span>
        <h2 class="h2">{{ whoWeAre.title }}</h2>
        <p v-html="whoWeAre.body" />
        <a href="#consultation" class="btn-sq">About Us</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 90px; align-items: center; }
.media { position: relative; padding-bottom: 70px; }
.frame { border: 1px solid var(--line); border-radius: 18px; padding: 14px; width: 86%; }
.frame img { width: 100%; aspect-ratio: 6/5; object-fit: cover; border-radius: 12px; }
.badge {
  position: absolute; right: 0; top: 34%; width: 196px; height: 196px; border-radius: 50%;
  background: var(--navy-800); color: var(--white); display: grid; place-content: center; text-align: center;
  border: 10px solid var(--white); box-shadow: 0 10px 30px -12px rgba(0,0,0,.35); z-index: 2;
}
.badge strong { font-family: var(--serif); font-size: 44px; line-height: 1; color: var(--gold-light); }
.badge span { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; margin-top: 6px; padding: 0 16px; }
.circle { position: absolute; right: 9%; bottom: 0; width: 270px; height: 270px; border-radius: 50%; object-fit: cover; border: 10px solid var(--white); box-shadow: 0 10px 30px -12px rgba(0,0,0,.35); }
.text .h2 { margin: 18px 0 22px; }
.text p { color: #3d4a57; font-size: 17px; margin-bottom: 34px; }
.text p :deep(strong) { color: var(--navy-900); }
@media (max-width: 960px) {
  .grid { grid-template-columns: 1fr; gap: 48px; }
}
@media (max-width: 560px) {
  .frame { width: 100%; }
  .badge { width: 140px; height: 140px; border-width: 6px; top: auto; bottom: 120px; }
  .badge strong { font-size: 32px; }
  .circle { width: 170px; height: 170px; border-width: 6px; }
}
</style>
