<script setup lang="ts">
import { heroSlides } from '~/data/site'

const INTERVAL = 5000 // auto-slide every 5 seconds
const current = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

function go(i: number) {
  current.value = (i + heroSlides.length) % heroSlides.length
  clearInterval(timer)
  timer = setInterval(() => { current.value = (current.value + 1) % heroSlides.length }, INTERVAL)
}
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
      <div class="overlay" />
      <div class="container content">
        <!-- OSR Realtech banner pattern -->
        <span class="tag"><i />{{ s.label }}</span>
        <h1>{{ s.title }}<br /><em>{{ s.accent }}</em></h1>
        <p>{{ s.subtitle }}</p>
        <div class="actions">
          <a href="#projects" class="pill pill-gold">Explore Verified Properties <span>→</span></a>
          <a href="#consultation" class="pill pill-outline">Talk to Property Advisor</a>
        </div>
      </div>
    </div>

    <button class="arrow left" aria-label="Previous slide" @click="go(current - 1)">‹</button>
    <button class="arrow right" aria-label="Next slide" @click="go(current + 1)">›</button>
    <div class="dots">
      <button v-for="(_, i) in heroSlides" :key="i" :class="{ active: i === current }" :aria-label="`Slide ${i + 1}`" @click="go(i)" />
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; height: calc(100vh - 156px); min-height: 560px; max-height: 820px; overflow: hidden; background: var(--navy-900); color: var(--white); }
.slide { position: absolute; inset: 0; opacity: 0; visibility: hidden; transition: opacity 1.2s ease, visibility 1.2s; }
.slide.active { opacity: 1; visibility: visible; }
.bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform: scale(1.06); transition: transform 6s ease-out; }
.slide.active .bg { transform: scale(1); }
.overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(15,28,46,.9) 0%, rgba(15,28,46,.62) 48%, rgba(15,28,46,.15) 100%); }
.content { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding-left: 48px; }
.content > * { opacity: 0; transform: translateY(22px); transition: opacity .8s ease, transform .8s ease; }
.slide.active .content > * { opacity: 1; transform: none; }
.slide.active .content > :nth-child(2) { transition-delay: .15s; }
.slide.active .content > :nth-child(3) { transition-delay: .3s; }
.slide.active .content > :nth-child(4) { transition-delay: .45s; }

.tag { display: inline-flex; align-items: center; gap: 10px; background: var(--navy-900); border: 1px solid rgba(255,255,255,.15); padding: 9px 20px; border-radius: 999px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; box-shadow: 0 8px 20px -10px rgba(0,0,0,.6); }
.tag i { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); }
h1 { font-size: clamp(40px, 5.6vw, 72px); font-weight: 700; margin: 28px 0 26px; line-height: 1.08; max-width: 820px; }
h1 em { font-weight: 400; font-style: italic; color: var(--gold-light); }
p { max-width: 640px; font-size: clamp(15px, 1.4vw, 18px); color: rgba(255,255,255,.82); border-left: 2px solid var(--gold); padding-left: 24px; margin-bottom: 40px; }
.actions { display: flex; gap: 16px; flex-wrap: wrap; }
.actions .pill-outline { color: var(--white); border-color: rgba(255,255,255,.7); }

.arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 3; width: 48px; height: 48px; border-radius: 50%; border: 1px solid rgba(255,255,255,.4); background: rgba(15,28,46,.3); color: var(--white); font-size: 26px; cursor: pointer; transition: .2s; }
.arrow:hover { background: var(--gold); border-color: var(--gold); color: var(--navy-900); }
.left { left: 20px; } .right { right: 20px; }
.dots { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 3; display: flex; gap: 10px; }
.dots button { width: 10px; height: 10px; border-radius: 999px; border: 0; padding: 0; background: rgba(255,255,255,.45); cursor: pointer; transition: width .3s, background .3s; }
.dots button.active { width: 34px; background: var(--gold); }
@media (max-width: 768px) {
  .arrow { display: none; }
  .content { padding-left: 0; }
  .tag { font-size: 10px; letter-spacing: .06em; padding: 8px 14px; }
  .hero { height: auto; min-height: 640px; }
}
</style>
