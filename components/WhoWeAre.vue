<script setup lang="ts">
import { whoWeAre } from '~/data/site'
const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="about" ref="root" class="section about">
    <div class="container grid">
      <div class="media reveal">
        <img :src="whoWeAre.images[0]" alt="Farmhouse garden" class="main" loading="lazy" />
        <img :src="whoWeAre.images[1]" alt="Farmhouse exterior" class="inset" loading="lazy" />
        <div class="badge"><strong>41+</strong><span>Years of<br />Legacy</span></div>
      </div>

      <div class="text reveal">
        <span class="eyebrow">Who We Are</span>
        <h2 class="section-title">{{ whoWeAre.title }}</h2>
        <p class="lead">{{ whoWeAre.lead }}</p>
        <p class="body">{{ whoWeAre.body }}</p>

        <ul class="points">
          <li v-for="p in whoWeAre.points" :key="p.title">
            <span class="tick">✓</span>
            <div><h4>{{ p.title }}</h4><p>{{ p.text }}</p></div>
          </li>
        </ul>
        <a href="#consultation" class="btn btn-dark">Schedule a Visit</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about { background: var(--cream); }
.grid { display: grid; grid-template-columns: 1fr 1.05fr; gap: 72px; align-items: center; }
.media { position: relative; padding: 0 60px 60px 0; }
.main { width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: var(--radius); box-shadow: var(--shadow); }
.inset { position: absolute; right: 0; bottom: 0; width: 52%; aspect-ratio: 4/3; object-fit: cover; border-radius: var(--radius); border: 8px solid var(--cream); box-shadow: var(--shadow); }
.badge {
  position: absolute; top: 32px; left: -24px; background: var(--navy-800); color: var(--white);
  padding: 18px 22px; border-radius: var(--radius); display: flex; align-items: center; gap: 12px; box-shadow: var(--shadow);
  border-bottom: 3px solid var(--gold);
}
.badge strong { font-family: var(--serif); font-size: 44px; color: var(--gold-light); line-height: 1; }
.badge span { font-size: 12px; letter-spacing: .1em; text-transform: uppercase; line-height: 1.4; }
.lead { font-family: var(--serif); font-size: 23px; color: var(--navy-700); font-style: italic; margin: 0 0 16px; line-height: 1.45; }
.body { color: var(--muted); margin: 0 0 28px; }
.points { list-style: none; padding: 0; margin: 0 0 36px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px 28px; }
.points li { display: flex; gap: 14px; }
.tick { flex: none; width: 30px; height: 30px; border-radius: 50%; background: var(--gold-soft); color: var(--navy-800); display: grid; place-items: center; font-size: 14px; font-weight: 700; }
.points h4 { font-family: var(--sans); font-size: 15px; font-weight: 600; color: var(--navy-900); margin-bottom: 2px; }
.points p { margin: 0; font-size: 14px; color: var(--muted); line-height: 1.55; }
@media (max-width: 960px) {
  .grid { grid-template-columns: 1fr; gap: 48px; }
  .badge { left: 12px; }
}
@media (max-width: 520px) {
  .points { grid-template-columns: 1fr; }
  .media { padding: 0 30px 40px 0; }
}
</style>
