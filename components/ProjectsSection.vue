<script setup lang="ts">
import projectsData from '~/data/projects.json'

const projects = projectsData

const tabs = ['All', ...new Set(projects.map((p) => p.city))]
const active = ref('All')
const visible = computed(() => active.value === 'All' ? projects : projects.filter((p) => p.city === active.value))

const track = ref<HTMLElement | null>(null)
const atStart = ref(true)
const atEnd = ref(false)

function update() {
  const el = track.value
  if (!el) return
  atStart.value = el.scrollLeft <= 4
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
}

function scroll(dir: 1 | -1) {
  const el = track.value
  if (!el) return
  const card = el.querySelector<HTMLElement>('.card')
  el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 24), behavior: 'smooth' })
}

watch(active, () => nextTick(() => { track.value?.scrollTo({ left: 0 }); update() }))
onMounted(() => { update(); window.addEventListener('resize', update) })
onBeforeUnmount(() => window.removeEventListener('resize', update))
</script>

<template>
  <section id="projects" class="section projects">
    <div class="container">
      <div class="head">
        <div>
          <span class="kicker">Verified Property Inventory</span>
          <h2 class="h2">Featured Real Estate Projects</h2>
          <p>Browse verified farmhouses, farm plots and residential plot developments across Noida, the Yamuna Expressway, Vrindavan and Dehradun.</p>
        </div>
        <div class="head-actions">
          <NuxtLink to="/projects" class="view-all">View All Properties <span>→</span></NuxtLink>
          <button class="circle-btn" :disabled="atStart" aria-label="Previous projects" @click="scroll(-1)">‹</button>
          <button class="circle-btn" :disabled="atEnd" aria-label="Next projects" @click="scroll(1)">›</button>
        </div>
      </div>

      <div class="tabs" role="tablist">
        <button
          v-for="t in tabs"
          :key="t"
          role="tab"
          :aria-selected="active === t"
          :class="{ on: active === t }"
          @click="active = t"
        >
          <svg v-if="t !== 'All'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          {{ t }}
        </button>
      </div>

      <div ref="track" class="track" @scroll.passive="update">
        <article v-for="p in visible" :key="p.name" class="card">
          <div class="img">
            <img :src="p.cardImage || p.image" :alt="p.name" loading="lazy" />
            <span class="status">{{ p.status }}</span>
          </div>
          <div class="body">
            <div class="meta"><span>{{ p.type }}</span><span class="dev">VD Vanchers</span></div>
            <h3>{{ p.name }}</h3>
            <p class="loc">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
              {{ p.location }}
            </p>
            <p class="desc">{{ p.shortSummary }}</p>
            <div class="foot">
              <div class="price"><small>Starts from</small><strong>{{ p.price }}</strong></div>
              <NuxtLink :to="{ name: 'projects-slug', params: { slug: p.slug } }" class="explore">Explore
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" /></svg>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects { background: var(--card); }
.head { display: flex; justify-content: space-between; align-items: flex-end; gap: 28px; margin-bottom: 34px; }
.head .h2 { margin: 12px 0 16px; max-width: 520px; }
.head p { color: var(--muted); max-width: 580px; font-size: 16px; }
.head-actions { display: flex; align-items: center; gap: 12px; flex: none; }
.view-all { font-size: 13px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--navy-900); border-bottom: 1px solid var(--navy-900); padding-bottom: 6px; margin-right: 16px; }
.view-all:hover { color: var(--accent-blue); border-color: var(--accent-blue); }

.tabs { display: flex; gap: 10px; flex-wrap: wrap; padding-bottom: 18px; border-bottom: 1px solid var(--line); margin-bottom: 40px; }
.tabs button { display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--line); background: var(--white); color: #5a6573; padding: 11px 22px; border-radius: 999px; font: 700 12.5px var(--sans); letter-spacing: .12em; text-transform: uppercase; cursor: pointer; transition: .2s; }
.tabs button:hover { border-color: var(--navy-900); color: var(--navy-900); }
.tabs button.on { background: var(--navy-900); border-color: var(--navy-900); color: var(--white); }

.track { display: grid; grid-auto-flow: column; grid-auto-columns: calc((100% - 48px) / 3); gap: 24px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 4px 4px 24px; scrollbar-width: none; }
.track::-webkit-scrollbar { display: none; }
.card { scroll-snap-align: start; background: #fbfaf7; border: 1px solid var(--line); border-radius: 28px; overflow: hidden; box-shadow: 0 10px 26px -18px rgba(15,28,46,.35); display: flex; flex-direction: column; transition: transform .3s, box-shadow .3s; }
.card:hover { transform: translateY(-4px); box-shadow: 0 18px 36px -18px rgba(15,28,46,.4); }
.img { position: relative; aspect-ratio: 16/10; overflow: hidden; background: #eef0f2; }
.img img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s; }
.card:hover .img img { transform: scale(1.05); }
.status { position: absolute; top: 16px; left: 16px; background: var(--navy-900); color: var(--white); font-size: 10.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; padding: 7px 13px; border-radius: 999px; }
.body { padding: 22px 24px 24px; display: flex; flex-direction: column; flex: 1; }
.meta { display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #5a6573; padding-bottom: 12px; border-bottom: 1px solid var(--line); }
.meta .dev { color: var(--accent-blue); }
h3 { font-size: 22px; color: var(--navy-900); margin: 18px 0 10px; }
.loc { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #5a6573; margin-bottom: 12px; }
.desc { font-size: 14px; color: var(--muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; flex: 1; }
.foot { display: flex; justify-content: space-between; align-items: center; gap: 12px; border-top: 1px solid var(--line); margin-top: 18px; padding-top: 18px; }
.price small { display: block; font-size: 10.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #5a6573; }
.price strong { font-family: var(--serif); font-size: 19px; color: var(--accent-blue); }
.explore { display: inline-flex; align-items: center; gap: 8px; background: var(--navy-900); color: var(--white); padding: 12px 20px; border-radius: 999px; font-size: 11.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; transition: .2s; }
.explore:hover { background: var(--gold); color: var(--navy-900); }

@media (max-width: 1000px) { .track { grid-auto-columns: calc((100% - 24px) / 2); } }
@media (max-width: 760px) {
  .head { flex-direction: column; align-items: flex-start; }
  .track { grid-auto-columns: 86%; }
}
</style>
