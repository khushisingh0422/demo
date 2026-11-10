<script setup lang="ts">
import { projects } from '~/data/site'
const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="projects" ref="root" class="section projects">
    <div class="container">
      <div class="head reveal">
        <div>
          <div class="eyebrow">Our portfolio</div>
          <h2>Find a place for your next chapter.</h2>
          <p class="intro-text">From residential plots to farmhouse communities, explore developments shaped around location, lifestyle and long-term potential.</p>
        </div>
        <a class="btn" href="#consultation">Enquire About a Project ↗</a>
      </div>

      <div class="grid">
        <article
          v-for="(p, i) in projects"
          :key="p.name"
          class="card reveal"
          :style="{ transitionDelay: `${(i % 3) * 0.1}s` }"
        >
          <div class="img">
            <img :src="p.image" :alt="p.name" loading="lazy" />
            <span class="tag">{{ p.tag }}</span>
          </div>
          <div class="body">
            <h3>{{ p.name }}</h3>
            <p>{{ p.text }}</p>
            <div class="meta">
              <span>{{ p.location }}</span>
              <a href="#consultation">Know more ↗</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects { background: var(--sand); }
.head { display: flex; justify-content: space-between; align-items: end; gap: 28px; margin-bottom: 40px; }
.head .intro-text { margin-bottom: 0; }
.head .btn { flex: none; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.card { background: var(--white); box-shadow: 0 14px 38px rgba(21,38,61,.07); transition: transform .3s, opacity .8s; }
.card.is-visible:hover { transform: translateY(-7px); }
.img { height: 260px; position: relative; overflow: hidden; }
.img img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s; }
.card:hover .img img { transform: scale(1.05); }
.tag { position: absolute; top: 17px; left: 17px; background: var(--navy); color: var(--gold2); padding: 7px 11px; font-size: .6rem; letter-spacing: .13em; text-transform: uppercase; }
.body { padding: 25px; }
h3 { font-size: 1.65rem; margin-bottom: 8px; }
.body p { font-size: .86rem; color: var(--muted); min-height: 70px; }
.meta { display: flex; justify-content: space-between; gap: 10px; align-items: center; border-top: 1px solid var(--line); padding-top: 15px; margin-top: 18px; font-size: .69rem; color: var(--muted); }
.meta a { font-weight: 800; color: var(--navy); letter-spacing: .08em; text-transform: uppercase; white-space: nowrap; }
.meta a:hover { color: var(--gold); }
@media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 680px) {
  .head { display: block; }
  .head .btn { margin-top: 15px; }
  .grid { grid-template-columns: 1fr; }
  .body p { min-height: 0; }
  .img { height: 235px; }
}
</style>
