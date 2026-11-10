<script setup lang="ts">
import { testimonials } from '~/data/site'

const current = ref(0)
let timer: ReturnType<typeof setInterval> | undefined
function go(i: number) {
  current.value = (i + testimonials.length) % testimonials.length
  clearInterval(timer)
  timer = setInterval(() => { current.value = (current.value + 1) % testimonials.length }, 7000)
}
const initials = (n: string) => n.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()
onMounted(() => go(0))
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <!-- OSR Realtech reviews layout -->
  <section id="testimonials" class="section reviews">
    <div class="container">
      <div class="head">
        <span class="kicker">Client Reviews &amp; Feedback</span>
        <h2 class="h2">What Our Buyers &amp; Investors Say</h2>
      </div>

      <div class="card">
        <svg class="qm" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M10 7H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3v1a3 3 0 0 1-3 3M20 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3v1a3 3 0 0 1-3 3" /></svg>
        <div class="viewport">
          <div class="slides" :style="{ transform: `translateX(-${current * 100}%)` }">
            <figure v-for="(t, i) in testimonials" :key="i" :aria-hidden="i !== current">
              <blockquote>“{{ t.quote }}”</blockquote>
              <figcaption>
                <span class="avatar">{{ initials(t.name) }}</span>
                <span><strong>{{ t.name }}</strong><small>{{ t.role }}</small></span>
              </figcaption>
            </figure>
          </div>
        </div>
        <div class="foot">
          <button class="circle-btn" aria-label="Previous review" @click="go(current - 1)">‹</button>
          <button class="circle-btn" aria-label="Next review" @click="go(current + 1)">›</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews { background: var(--white); border-top: 1px solid var(--navy-900); }
.head { text-align: center; margin-bottom: 44px; }
.head .h2 { margin-top: 14px; font-weight: 700; }
.card { position: relative; max-width: 1024px; margin: 0 auto; background: var(--card); border: 1px solid var(--line); border-radius: 36px; padding: 40px 64px 34px; box-shadow: 0 14px 30px -22px rgba(15,28,46,.4); }
.qm { color: #c9ced6; margin-left: -26px; }
.viewport { overflow: hidden; }
.slides { display: flex; transition: transform .7s cubic-bezier(.7,0,.3,1); }
figure { flex: 0 0 100%; margin: 0; padding: 10px 0 0; }
blockquote { font-family: var(--serif); font-size: clamp(20px, 2.3vw, 27px); line-height: 1.5; color: var(--navy-900); margin: 0 0 30px; }
figcaption { display: flex; align-items: center; gap: 14px; }
.avatar { width: 52px; height: 52px; border-radius: 50%; background: var(--navy-900); color: var(--gold-light); display: grid; place-items: center; font-weight: 700; letter-spacing: .04em; }
figcaption strong { display: block; color: var(--navy-900); font-size: 16px; }
figcaption small { color: var(--muted); font-size: 13.5px; }
.foot { display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid var(--line); margin-top: 30px; padding-top: 24px; }
@media (max-width: 640px) { .card { padding: 30px 24px 26px; border-radius: 24px; } .qm { margin-left: 0; } }
</style>
