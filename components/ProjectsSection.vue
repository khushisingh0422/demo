<script setup lang="ts">
import { projects } from '~/data/site'
const root = ref<HTMLElement | null>(null)
useReveal(root)

// OSR Realtech-style filter tabs
const tabs = ['All', ...new Set(projects.map(p => p.type))]
const active = ref('All')
const visible = computed(() => active.value === 'All' ? projects : projects.filter(p => p.type === active.value))
</script>

<template>
  <section id="projects" ref="root" class="section">
    <div class="container">
      <div class="head reveal">
        <div>
          <span class="eyebrow">Verified Farm Properties</span>
          <h2 class="section-title">Featured Farmhouse Projects</h2>
          <p>Browse our luxury farmhouses, gated farm communities and premium farm plots across Sector 135, Noida and the Noida Expressway belt.</p>
        </div>
        <a href="#consultation" class="btn btn-dark">View All Properties</a>
      </div>

      <div class="tabs reveal" role="tablist">
        <button
          v-for="t in tabs"
          :key="t"
          role="tab"
          :aria-selected="active === t"
          :class="{ on: active === t }"
          @click="active = t"
        >{{ t }}</button>
      </div>

      <TransitionGroup name="card" tag="div" class="cards">
        <article v-for="p in visible" :key="p.name" class="card">
          <div class="img">
            <img :src="p.image" :alt="p.name" loading="lazy" />
            <span class="status">{{ p.status }}</span>
          </div>
          <div class="body">
            <span class="type">{{ p.type }} · {{ p.location.split(',')[0] }}</span>
            <h3>{{ p.name }}</h3>
            <p class="loc">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
              {{ p.location }}
            </p>
            <p class="desc">{{ p.text }}</p>
            <div class="foot">
              <div class="price"><small>Starts from</small><strong>{{ p.price }}</strong></div>
              <a href="#consultation" class="btn btn-primary explore">Explore</a>
            </div>
          </div>
        </article>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: flex-end; gap: 28px; margin-bottom: 28px; }
.head p { color: var(--muted); margin: 0; max-width: 640px; }
.head .btn { flex: none; }
.tabs { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; }
.tabs button {
  border: 1px solid #dcd6c8; background: var(--white); color: var(--navy-800);
  padding: 10px 22px; border-radius: 999px; font: 600 13px var(--sans); letter-spacing: .04em; cursor: pointer; transition: .2s;
}
.tabs button:hover { border-color: var(--gold); }
.tabs button.on { background: var(--navy-800); border-color: var(--navy-800); color: var(--gold-light); }

.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.card { background: var(--white); border-radius: var(--radius); overflow: hidden; box-shadow: 0 6px 30px -12px rgba(21,38,61,.18); transition: transform .35s ease, box-shadow .35s ease; display: flex; flex-direction: column; }
.card:hover { transform: translateY(-6px); box-shadow: var(--shadow); }
.img { position: relative; aspect-ratio: 4/3; overflow: hidden; }
.img img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; }
.card:hover .img img { transform: scale(1.06); }
.status { position: absolute; top: 16px; left: 16px; background: var(--navy-800); color: var(--gold-light); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; padding: 7px 14px; border-radius: 999px; font-weight: 600; }
.body { padding: 22px 24px 24px; display: flex; flex-direction: column; flex: 1; }
.type { font-size: 11px; letter-spacing: .14em; text-transform: uppercase; font-weight: 600; color: #9a7b45; }
h3 { font-size: 26px; color: var(--navy-900); margin: 6px 0 6px; }
.loc { display: flex; align-items: center; gap: 6px; color: var(--muted); font-size: 13px; margin: 0 0 12px; }
.desc { color: var(--muted); font-size: 14.5px; margin: 0 0 20px; flex: 1; }
.foot { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eceef3; padding-top: 16px; gap: 12px; }
.price small { display: block; font-size: 11px; color: var(--muted); letter-spacing: .06em; text-transform: uppercase; }
.price strong { font-family: var(--serif); font-size: 18px; color: var(--navy-900); }
.explore { padding: 11px 22px; font-size: 12px; }

.card-enter-active, .card-leave-active { transition: opacity .35s ease, transform .35s ease; }
.card-enter-from, .card-leave-to { opacity: 0; transform: scale(.96); }
.card-leave-active { position: absolute; }

@media (max-width: 960px) { .cards { grid-template-columns: 1fr 1fr; } }
@media (max-width: 720px) { .head { display: block; } .head .btn { margin-top: 18px; } }
@media (max-width: 620px) { .cards { grid-template-columns: 1fr; } }
</style>
