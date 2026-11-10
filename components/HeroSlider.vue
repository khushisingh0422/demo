<script setup lang="ts">
import { heroSlides } from '~/data/site'

const INTERVAL = 5000 // 5 seconds per slide
const current = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

const go = (i: number) => { current.value = (i + heroSlides.length) % heroSlides.length; restart() }
const next = () => go(current.value + 1)
const prev = () => go(current.value - 1)
function restart() {
  clearInterval(timer)
  timer = setInterval(() => { current.value = (current.value + 1) % heroSlides.length }, INTERVAL)
}
onMounted(restart)
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
      <img :src="s.image" :alt="s.title" class="bg" :loading="i === 0 ? 'eager' : 'lazy'" />
      <div class="overlay" />
      <div class="container content">
        <span class="eyebrow">{{ s.eyebrow }}</span>
        <h1>{{ s.title }}</h1>
        <p>{{ s.subtitle }}</p>
        <div class="actions">
          <a href="#projects" class="btn btn-primary">Explore Verified Properties</a>
          <a href="#consultation" class="btn btn-outline">Talk to Property Advisor</a>
        </div>
      </div>
    </div>

    <button class="arrow left" aria-label="Previous slide" @click="prev">‹</button>
    <button class="arrow right" aria-label="Next slide" @click="next">›</button>

    <div class="dots">
      <button
        v-for="(_, i) in heroSlides"
        :key="i"
        :class="{ active: i === current }"
        :aria-label="`Go to slide ${i + 1}`"
        @click="go(i)"
      />
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; height: 100vh; min-height: 600px; max-height: 960px; overflow: hidden; background: var(--navy-900); }
.slide { position: absolute; inset: 0; opacity: 0; visibility: hidden; transition: opacity 1.2s ease, visibility 1.2s; }
.slide.active { opacity: 1; visibility: visible; }
.bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform: scale(1.08); transition: transform 6s ease-out; }
.slide.active .bg { transform: scale(1); }
.overlay { position: absolute; inset: 0; background: linear-gradient(100deg, rgba(16,30,48,.88) 0%, rgba(16,30,48,.55) 50%, rgba(16,30,48,.15) 100%); }
.content { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: center; color: var(--white); padding-top: 110px; }
.content > * { max-width: 680px; opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s ease; }
.slide.active .content > * { opacity: 1; transform: none; }
.slide.active .content > :nth-child(2) { transition-delay: .15s; }
.slide.active .content > :nth-child(3) { transition-delay: .3s; }
.slide.active .content > :nth-child(4) { transition-delay: .45s; }
h1 { font-size: clamp(40px, 6.5vw, 76px); margin: 18px 0 20px; font-weight: 600; }
p { font-size: clamp(15px, 1.6vw, 18px); color: rgba(255,255,255,.85); margin: 0 0 36px; font-weight: 300; }
.actions { display: flex; gap: 14px; flex-wrap: wrap; }

.arrow {
  position: absolute; top: 50%; transform: translateY(-50%); z-index: 3;
  width: 52px; height: 52px; border-radius: 50%; border: 1px solid rgba(255,255,255,.4);
  background: rgba(16,30,48,.25); color: var(--white); font-size: 28px; line-height: 1; cursor: pointer;
  backdrop-filter: blur(4px); transition: background .2s;
}
.arrow:hover { background: var(--gold); color: var(--navy-900); border-color: var(--gold); }
.left { left: 24px; } .right { right: 24px; }
.dots { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); z-index: 3; display: flex; gap: 10px; }
.dots button { width: 10px; height: 10px; border-radius: 999px; border: 0; background: rgba(255,255,255,.45); cursor: pointer; transition: width .3s, background .3s; padding: 0; }
.dots button.active { width: 34px; background: var(--gold); }
@media (max-width: 768px) { .arrow { display: none; } }
</style>

<style scoped>
.content .eyebrow { font-size: 12px; letter-spacing: .14em; background: rgba(197,163,106,.14); border: 1px solid rgba(197,163,106,.45); padding: 8px 16px; border-radius: 999px; width: fit-content; }
.content .eyebrow::before { display: none; }
</style>
