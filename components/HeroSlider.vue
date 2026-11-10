<script setup lang="ts">
import { heroSlides } from '~/data/site'

const INTERVAL = 5000 // 5 seconds per slide
const current = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

function go(i: number) {
  current.value = (i + heroSlides.length) % heroSlides.length
  clearInterval(timer)
  timer = setInterval(() => { current.value = (current.value + 1) % heroSlides.length }, INTERVAL)
}
const pad = (n: number) => String(n).padStart(2, '0')
onMounted(() => go(0))
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section id="home" class="hero" aria-roledescription="carousel">
    <div
      v-for="(s, i) in heroSlides"
      :key="i"
      class="slide"
      :class="{ active: i === current }"
      :aria-hidden="i !== current"
    >
      <img :src="s.image" alt="" class="bg" :loading="i === 0 ? 'eager' : 'lazy'" />
      <div class="container content">
        <div class="eyebrow">{{ s.eyebrow }}</div>
        <h1 v-html="s.title" />
        <p>{{ s.subtitle }}</p>
        <div class="actions">
          <a class="btn light" href="#projects">Explore Our Projects <span>↗</span></a>
          <a class="btn ghost" href="#consultation">Talk to Our Team</a>
        </div>
      </div>
    </div>

    <div class="container hero-bottom">
      <div class="count">{{ pad(current + 1) }} / {{ pad(heroSlides.length) }}</div>
      <div class="note">Real estate with responsibility</div>
      <div class="dots">
        <button
          v-for="(_, i) in heroSlides"
          :key="i"
          :class="{ active: i === current }"
          :aria-label="`Slide ${i + 1}`"
          @click="go(i)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { height: min(830px, 100vh); min-height: 660px; position: relative; overflow: hidden; background: var(--navy); color: var(--white); }
.slide { position: absolute; inset: 0; opacity: 0; visibility: hidden; transition: opacity 1.2s, visibility 1.2s; }
.slide.active { opacity: 1; visibility: visible; }
.bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform: scale(1.06); transition: transform 6s ease-out; }
.slide.active .bg { transform: scale(1); }
.slide::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, rgba(13,28,46,.88), rgba(13,28,46,.56) 52%, rgba(13,28,46,.16)),
              linear-gradient(0deg, rgba(13,28,46,.5), transparent 50%);
}
.content { position: relative; z-index: 2; padding-top: 225px; }
.content > * { max-width: 800px; opacity: 0; transform: translateY(22px); transition: opacity .8s ease, transform .8s ease; }
.slide.active .content > * { opacity: 1; transform: none; }
.slide.active .content > :nth-child(2) { transition-delay: .15s; }
.slide.active .content > :nth-child(3) { transition-delay: .3s; }
.slide.active .content > :nth-child(4) { transition-delay: .45s; }
h1 { font-size: clamp(3.3rem, 7vw, 6.4rem); margin: 20px 0 22px; }
p { font-size: 1.08rem; color: rgba(255,255,255,.83); max-width: 570px !important; margin-bottom: 32px; }
.actions { display: flex; gap: 14px; flex-wrap: wrap; }

.hero-bottom { position: absolute; z-index: 3; bottom: 36px; left: 0; right: 0; display: flex; justify-content: space-between; align-items: center; }
.count, .note { font-size: .7rem; letter-spacing: .15em; text-transform: uppercase; color: rgba(255,255,255,.8); }
.dots { display: flex; gap: 9px; }
.dots button { width: 34px; height: 3px; border: 0; background: rgba(255,255,255,.45); padding: 0; cursor: pointer; transition: background .3s; }
.dots button.active { background: var(--gold); }

@media (max-width: 680px) {
  .hero { min-height: 650px; height: 88vh; }
  .content { padding-top: 165px; }
  h1 { font-size: 2.9rem; }
  p { font-size: .98rem; }
  .note { display: none; }
}
</style>
