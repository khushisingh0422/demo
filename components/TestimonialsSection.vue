<script setup lang="ts">
import { testimonials } from '~/data/site'

const current = ref(0)
let timer: ReturnType<typeof setInterval> | undefined
function go(i: number) {
  current.value = (i + testimonials.length) % testimonials.length
  clearInterval(timer)
  timer = setInterval(() => { current.value = (current.value + 1) % testimonials.length }, 6000)
}
onMounted(() => go(0))
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section id="testimonials" class="section reviews">
    <div class="container wrap">
      <div class="eyebrow">Client words</div>
      <div class="quote-mark" aria-hidden="true">“</div>

      <div class="viewport">
        <div class="track" :style="{ transform: `translateX(-${current * 100}%)` }">
          <figure v-for="(t, i) in testimonials" :key="i" class="slide" :aria-hidden="i !== current">
            <blockquote class="quote">“{{ t.quote }}”</blockquote>
            <figcaption class="by">{{ t.name }} · {{ t.role }}</figcaption>
          </figure>
        </div>
      </div>

      <div v-if="testimonials.length > 1" class="controls">
        <button class="arrow" aria-label="Previous testimonial" @click="go(current - 1)">←</button>
        <div class="dots">
          <button v-for="(_, i) in testimonials" :key="i" :class="{ active: i === current }" :aria-label="`Testimonial ${i + 1}`" @click="go(i)" />
        </div>
        <button class="arrow" aria-label="Next testimonial" @click="go(current + 1)">→</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews { background: #e7e2d8; text-align: center; }
.wrap { max-width: 850px; }
.quote-mark { font-family: var(--serif); font-size: 5rem; color: var(--gold); line-height: .8; }
.viewport { overflow: hidden; }
.track { display: flex; transition: transform .7s cubic-bezier(.7,0,.3,1); }
.slide { flex: 0 0 100%; margin: 0; padding: 0 8px; }
.quote { font-family: var(--serif); font-size: clamp(1.45rem, 3vw, 2.1rem); line-height: 1.45; color: var(--navy); margin: 20px 0 24px; }
.by { font-size: .7rem; letter-spacing: .13em; text-transform: uppercase; color: var(--muted); }
.controls { display: flex; align-items: center; justify-content: center; gap: 22px; margin-top: 36px; }
.arrow { width: 44px; height: 44px; border: 1px solid var(--gold); background: none; color: var(--navy); cursor: pointer; transition: .25s; }
.arrow:hover { background: var(--gold); }
.dots { display: flex; gap: 9px; }
.dots button { width: 28px; height: 3px; border: 0; padding: 0; background: rgba(21,38,61,.2); cursor: pointer; }
.dots button.active { background: var(--gold); }
</style>
