<script setup lang="ts">
import { projects } from '~/data/site'
const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="projects" ref="root" class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Our Projects</span>
        <h2 class="section-title">Farms That Transform Your Living</h2>
        <p>Handpicked locations, thoughtfully planned communities and farmhouses built to be lived in for generations.</p>
      </div>

      <div class="cards">
        <article v-for="(p, i) in projects" :key="p.name" class="card reveal" :style="{ transitionDelay: `${i * 0.12}s` }">
          <div class="img">
            <img :src="p.image" :alt="p.name" loading="lazy" />
            <span class="status">{{ p.status }}</span>
          </div>
          <div class="body">
            <p class="loc">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
              {{ p.location }}
            </p>
            <h3>{{ p.name }}</h3>
            <p class="desc">{{ p.text }}</p>
            <div class="foot">
              <span>{{ p.size }}</span>
              <a href="#consultation" class="more">Enquire →</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.card { background: var(--white); border-radius: var(--radius); overflow: hidden; box-shadow: 0 6px 30px -12px rgba(11,18,56,.18); transition: transform .35s ease, box-shadow .35s ease, opacity .8s ease; }
.card.is-visible:hover { transform: translateY(-6px); box-shadow: var(--shadow); }
.img { position: relative; aspect-ratio: 4/3; overflow: hidden; }
.img img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; }
.card:hover .img img { transform: scale(1.06); }
.status { position: absolute; top: 16px; left: 16px; background: var(--navy-800); color: var(--white); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; padding: 7px 14px; border-radius: 999px; font-weight: 600; }
.body { padding: 24px 26px 26px; }
.loc { display: flex; align-items: center; gap: 6px; color: var(--sky); font-size: 13px; font-weight: 500; margin: 0 0 8px; filter: brightness(.8); }
h3 { font-size: 28px; color: var(--navy-900); margin-bottom: 10px; }
.desc { color: var(--muted); font-size: 14.5px; margin: 0 0 22px; }
.foot { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eceef3; padding-top: 16px; font-size: 13px; font-weight: 600; color: var(--navy-700); }
.more { color: var(--navy-800); letter-spacing: .06em; }
.more:hover { color: var(--sky); }
@media (max-width: 960px) { .cards { grid-template-columns: 1fr 1fr; } }
@media (max-width: 620px) { .cards { grid-template-columns: 1fr; } }
</style>
