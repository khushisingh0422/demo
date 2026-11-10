<script setup lang="ts">
import { testimonials } from '~/data/site'

const current = ref(0)
let timer: ReturnType<typeof setInterval> | undefined
const go = (i: number) => {
  current.value = (i + testimonials.length) % testimonials.length
  clearInterval(timer)
  timer = setInterval(() => go(current.value + 1), 6000)
}
const initials = (n: string) => n.split(/\s+/).filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join('')
onMounted(() => go(0))
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section id="testimonials" class="section testi">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Client Testimonials</span>
        <h2 class="section-title light">What Our Families Say</h2>
      </div>

      <div class="stage">
        <span class="quote-mark" aria-hidden="true">“</span>
        <div class="track" :style="{ transform: `translateX(-${current * 100}%)` }">
          <figure v-for="t in testimonials" :key="t.name" class="slide">
            <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
            <blockquote>{{ t.quote }}</blockquote>
            <figcaption>
              <span class="avatar">{{ initials(t.name) }}</span>
              <span><strong>{{ t.name }}</strong><small>{{ t.role }}</small></span>
            </figcaption>
          </figure>
        </div>

        <div class="controls">
          <button aria-label="Previous testimonial" @click="go(current - 1)">←</button>
          <div class="dots">
            <button v-for="(_, i) in testimonials" :key="i" :class="{ active: i === current }" :aria-label="`Testimonial ${i + 1}`" @click="go(i)" />
          </div>
          <button aria-label="Next testimonial" @click="go(current + 1)">→</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testi { background: var(--navy-900); color: var(--white); position: relative; overflow: hidden; }
.testi::before { content: ''; position: absolute; width: 520px; height: 520px; border-radius: 50%; background: radial-gradient(circle, rgba(127,178,224,.18), transparent 70%); top: -180px; right: -160px; }
.light { color: var(--white); }
.stage { position: relative; max-width: 860px; margin: 0 auto; overflow: hidden; text-align: center; }
.quote-mark { font-family: var(--serif); font-size: 180px; line-height: .6; color: var(--sky); opacity: .35; display: block; height: 70px; }
.track { display: flex; transition: transform .7s cubic-bezier(.7,0,.3,1); }
.slide { flex: 0 0 100%; margin: 0; padding: 0 12px; }
.stars { color: #f3c969; letter-spacing: 4px; margin-bottom: 18px; }
blockquote { font-family: var(--serif); font-size: clamp(22px, 2.6vw, 30px); line-height: 1.45; margin: 0 0 32px; font-style: italic; color: rgba(255,255,255,.92); }
figcaption { display: inline-flex; align-items: center; gap: 14px; text-align: left; }
.avatar { width: 52px; height: 52px; border-radius: 50%; background: var(--sky); color: var(--navy-900); display: grid; place-items: center; font-weight: 600; letter-spacing: .05em; }
figcaption strong { display: block; font-size: 16px; }
figcaption small { color: var(--silver); font-size: 13px; }
.controls { display: flex; align-items: center; justify-content: center; gap: 24px; margin-top: 40px; }
.controls > button { width: 46px; height: 46px; border-radius: 50%; border: 1px solid rgba(255,255,255,.3); background: none; color: var(--white); cursor: pointer; font-size: 18px; transition: .2s; }
.controls > button:hover { background: var(--sky); border-color: var(--sky); color: var(--navy-900); }
.dots { display: flex; gap: 8px; }
.dots button { width: 8px; height: 8px; border-radius: 999px; border: 0; padding: 0; background: rgba(255,255,255,.35); cursor: pointer; transition: width .3s; }
.dots button.active { width: 28px; background: var(--sky); }
</style>
