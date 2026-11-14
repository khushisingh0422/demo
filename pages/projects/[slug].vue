<script setup lang="ts">
import projectsData from '~/data/projects.json'

definePageMeta({
  key: (route) => route.fullPath,
})

const route = useRoute()
const project = projectsData.find((p) => p.slug === String(route.params.slug))

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

useHead({
  title: `${project.name} | VD Vanchers`,
  meta: [{ name: 'description', content: project.shortSummary }],
})

const PHONE = '+919289245099'
const PHONE_LABEL = '+91-9289245099'
const EMAIL = 'info@vanchers.com'

const others = projectsData.filter((p) => p.slug !== project.slug).slice(0, 3)

/* Video: supports .mp4/.webm files or YouTube links */
const photos = [...new Map([{ src: project.image, caption: project.name }, ...project.gallery].map((g) => [g.src, g])).values()]
const shown = photos.slice(0, 5)

const video = project.video
const ytId = computed(() => {
  const m = video?.src?.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)
  return m ? m[1] : ''
})
const isFile = computed(() => /\.(mp4|webm|mov)(\?|$)/i.test(video?.src ?? ''))
const playing = ref(false)

/* Lightbox */
const lightbox = ref<number | null>(null)
const open = (i: number) => (lightbox.value = i)
const close = () => (lightbox.value = null)
const step = (d: number) => {
  if (lightbox.value === null) return
  const n = photos.length
  lightbox.value = (lightbox.value + d + n) % n
}
const onKey = (e: KeyboardEvent) => {
  if (lightbox.value === null) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

/* Enquiry form -> opens mail app (swap for your API later) */
const form = reactive({ name: '', phone: '', message: '' })
const sent = ref(false)
const submit = () => {
  const body = `Name: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Enquiry: ' + project.name)}&body=${encodeURIComponent(body)}`
  sent.value = true
}
</script>

<template>
  <main class="detail">
    <!-- HERO -->
    <div class="topband" aria-hidden="true" />

    <section class="intro">
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span>
          <NuxtLink to="/projects">Projects</NuxtLink><span>/</span>
          <span class="current">{{ project.name }}</span>
        </nav>
        <div class="intro-grid">
          <div>
            <span class="chip" :class="{ done: project.status === 'Delivered' }">{{ project.status }}</span>
            <h1>{{ project.name }}</h1>
            <p class="tagline">{{ project.tagline }}</p>
            <p class="where">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" /></svg>
              {{ project.location }}
            </p>
          </div>
          <div class="price-box">
            <small>Starts from</small>
            <strong>{{ project.price }}</strong>
            <a href="#enquire" class="btn-gold">Book a site visit</a>
          </div>
        </div>

        <div class="mosaic-wrap">
          <div class="mosaic" :class="`m${shown.length}`">
            <button v-for="(g, i) in shown" :key="g.src" type="button" class="tile" :class="{ big: i === 0 }" :aria-label="`View ${g.caption}`" @click="open(i)">
              <img :src="g.src" :alt="g.caption" :loading="i === 0 ? 'eager' : 'lazy'" />
            </button>
          </div>
          <button v-if="photos.length > 1" type="button" class="all-photos" @click="open(0)">View all {{ photos.length }} photos</button>
        </div>
      </div>
    </section>

    <!-- FACTS -->
    <section class="facts">
      <div class="container facts-grid">
        <div v-for="f in project.facts" :key="f.label">
          <small>{{ f.label }}</small>
          <strong>{{ f.value }}</strong>
        </div>
      </div>
    </section>

    <!-- OVERVIEW + ENQUIRY -->
    <section class="section overview">
      <div class="container two-col">
        <div>
          <h2>About {{ project.name }}</h2>
          <p v-for="(para, i) in project.overview" :key="i" class="lead" :class="{ first: i === 0 }">{{ para }}</p>

          <div v-if="project.documents.length" class="docs">
            <a v-for="d in project.documents" :key="d.url" :href="d.url" target="_blank" rel="noopener" class="doc">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M9 13h6M9 17h6" /></svg>
              <span>{{ d.label }}</span>
              <em>PDF</em>
            </a>
          </div>
        </div>

        <aside id="enquire" class="enquiry">
          <h3>Plan a visit</h3>
          <p>Our team will call you back and arrange a site visit.</p>
          <form @submit.prevent="submit">
            <label>Full name<input v-model="form.name" required autocomplete="name" /></label>
            <label>Phone<input v-model="form.phone" required type="tel" autocomplete="tel" /></label>
            <label>Message<textarea v-model="form.message" rows="3" /></label>
            <button type="submit" class="btn-gold full">Send enquiry</button>
          </form>
          <p v-if="sent" class="ok">Your mail app should open with the enquiry ready to send.</p>
          <div class="direct">
            <a :href="`tel:${PHONE}`">{{ PHONE_LABEL }}</a>
            <a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
          </div>
        </aside>
      </div>
    </section>

    <!-- VIDEO -->
    <section v-if="video && video.src" class="section video-sec">
      <div class="container">
        <h2>Watch the project</h2>
        <div class="video-frame">
          <video v-if="isFile" :src="video.src" :poster="video.poster" controls playsinline preload="metadata" />
          <template v-else-if="ytId">
            <iframe
              v-if="playing"
              :src="`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`"
              :title="video.title"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowfullscreen
            />
            <button v-else type="button" class="play" :style="{ backgroundImage: `url(${video.poster})` }" :aria-label="`Play ${video.title}`" @click="playing = true">
              <span><svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="M8 5v14l11-7z" /></svg></span>
            </button>
          </template>
        </div>
      </div>
    </section>

    <!-- CONNECTIVITY -->
    <section v-if="project.highlights.length" class="section connect">
      <div class="container">
        <h2>Everything within reach</h2>
        <div class="connect-grid">
          <div v-for="h in project.highlights" :key="h.name" class="stop">
            <strong>{{ h.minutes }}<small> min</small></strong>
            <span>{{ h.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- AMENITIES -->
    <section v-if="project.amenities.length" class="section amenities">
      <div class="container">
        <h2>Amenities</h2>
        <ul>
          <li v-for="a in project.amenities" :key="a">{{ a }}</li>
        </ul>
      </div>
    </section>

    <!-- GALLERY -->

    <!-- LOCATION -->
    <section class="section location">
      <div class="container two-col">
        <div>
          <h2>Location</h2>
          <p class="lead first">{{ project.location }}</p>
          <a :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.name + ' ' + project.location)}`" target="_blank" rel="noopener" class="btn-outline">Open in Google Maps</a>
        </div>
        <img :src="project.mapImage" :alt="`Map of ${project.name}`" loading="lazy" />
      </div>
    </section>

    <!-- OTHER PROJECTS -->
    <section class="section more">
      <div class="container">
        <h2>More projects</h2>
        <div class="more-grid">
          <NuxtLink v-for="o in others" :key="o.slug" :to="{ name: 'projects-slug', params: { slug: o.slug } }" class="mini">
            <img :src="o.cardImage || o.image" :alt="o.name" loading="lazy" />
            <div>
              <small>{{ o.city }} · {{ o.status }}</small>
              <strong>{{ o.name }}</strong>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Mobile call bar -->
    <div class="callbar">
      <a :href="`tel:${PHONE}`">Call</a>
      <a href="#enquire" class="gold">Book a site visit</a>
    </div>

    <!-- Lightbox -->
    <div v-if="lightbox !== null" class="lightbox" role="dialog" aria-modal="true" @click.self="close">
      <button class="lb-close" aria-label="Close" @click="close">&times;</button>
      <button class="lb-nav prev" aria-label="Previous" @click="step(-1)">&lsaquo;</button>
      <figure>
        <img :src="photos[lightbox].src" :alt="photos[lightbox].caption" />
        <figcaption>{{ photos[lightbox].caption }} ({{ lightbox + 1 }}/{{ photos.length }})</figcaption>
      </figure>
      <button class="lb-nav next" aria-label="Next" @click="step(1)">&rsaquo;</button>
    </div>
  </main>
</template>

<style scoped>
.detail { --ivory: #f7f4ee; --ink: #1d1b18; --stone: #6f6a62; --hair: #e4ded3; background: var(--ivory); color: var(--ink); }
.section { padding: 110px 0; }
.detail h2 { font: 400 clamp(32px, 3.8vw, 52px) / 1.08 var(--serif); letter-spacing: -.01em; margin-bottom: 40px; }
.two-col { display: grid; grid-template-columns: 1.5fr 1fr; gap: 80px; align-items: start; }

/* INTRO */
.topband { height: 92px; background: var(--ink); }
.intro { padding: 36px 0 70px; background: var(--ivory); }
.crumbs { display: flex; flex-wrap: wrap; gap: 8px; font-size: 13px; color: var(--stone); margin-bottom: 36px; }
.crumbs a { color: inherit; text-decoration: none; }
.crumbs a:hover, .crumbs .current { color: var(--ink); }
.intro-grid { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: end; margin-bottom: 44px; }
.chip { display: inline-block; padding: 7px 16px; border: 1px solid #b08d4a; color: #8a6b2c; font: 600 12px var(--sans); letter-spacing: .06em; }
.chip.done { border-color: var(--ink); color: var(--ink); }
.intro h1 { margin-top: 22px; font: 400 clamp(46px, 6.6vw, 96px) / .98 var(--serif); letter-spacing: -.02em; }
.tagline { margin-top: 14px; font: italic 400 clamp(18px, 2vw, 26px) var(--serif); color: var(--stone); }
.where { display: flex; align-items: center; gap: 8px; margin-top: 20px; font-size: 16px; color: var(--ink); }
.where svg { color: var(--gold); flex: none; }
.price-box { min-width: 280px; padding-left: 40px; border-left: 1px solid var(--hair); }
.price-box small { display: block; font-size: 12px; letter-spacing: .04em; color: var(--stone); }
.price-box strong { display: block; margin: 6px 0 20px; font: 400 32px var(--serif); }

.mosaic-wrap { position: relative; }
.mosaic { display: grid; gap: 10px; height: clamp(320px, 50vw, 580px); }
.mosaic.m1 { grid-template-columns: 1fr; }
.mosaic.m2 { grid-template-columns: 1fr 1fr; }
.mosaic.m3 { grid-template-columns: 2fr 1fr; grid-template-rows: 1fr 1fr; }
.mosaic.m4 { grid-template-columns: 2fr 1fr; grid-template-rows: repeat(3, 1fr); }
.mosaic.m5 { grid-template-columns: 2fr 1fr 1fr; grid-template-rows: 1fr 1fr; }
.tile { position: relative; padding: 0; border: 0; overflow: hidden; background: var(--hair); cursor: zoom-in; min-height: 0; }
.tile.big { grid-row: 1 / -1; }
.tile img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .9s ease; }
.tile:hover img { transform: scale(1.04); }
.all-photos { position: absolute; right: 16px; bottom: 16px; padding: 12px 20px; border: 0; background: #fff; color: var(--ink); font: 600 14px var(--sans); cursor: pointer; box-shadow: 0 10px 30px -10px rgba(29,27,24,.5); }
.all-photos:hover { background: var(--gold); }

/* BUTTONS */
.btn-gold, .btn-outline { display: inline-flex; align-items: center; justify-content: center; padding: 0 36px; min-height: 54px; font: 600 14px var(--sans); letter-spacing: .03em; text-decoration: none; cursor: pointer; border: 0; transition: filter .2s ease, background .2s ease, color .2s ease; }
.btn-gold { background: var(--gold); color: var(--ink); }
.btn-gold:hover { filter: brightness(1.08); }
.btn-gold.full { width: 100%; }
.btn-outline { border: 1px solid var(--ink); color: var(--ink); margin-top: 12px; }
.btn-outline:hover { background: var(--ink); color: #fff; }
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }

/* FACTS */
.facts { background: #fff; border-bottom: 1px solid var(--hair); }
.facts-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.facts-grid > div { padding: 34px 24px 34px 0; }
.facts-grid > div + div { padding-left: 32px; border-left: 1px solid var(--hair); }
.facts small { display: block; font-size: 12px; letter-spacing: .04em; color: var(--stone); }
.facts strong { display: block; margin-top: 8px; font: 400 22px var(--serif); }

/* OVERVIEW */
.lead { max-width: 62ch; font-size: 17px; line-height: 1.85; color: var(--stone); margin-top: 20px; }
.lead.first { font: 400 clamp(22px, 2.3vw, 30px) / 1.4 var(--serif); color: var(--ink); margin-top: 0; }
.docs { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 44px; }
.doc { display: inline-flex; align-items: center; gap: 12px; padding: 15px 22px; border: 1px solid var(--ink); color: var(--ink); text-decoration: none; font-weight: 600; transition: background .2s ease, color .2s ease; }
.doc:hover { background: var(--ink); color: #fff; }
.doc svg { color: var(--gold); }
.doc em { font: 600 11px var(--sans); opacity: .6; }

.enquiry { position: sticky; top: 96px; padding: 40px 36px; background: #fff; border-top: 3px solid var(--gold); box-shadow: 0 40px 80px -40px rgba(29,27,24,.35); }
.enquiry h3 { font: 400 32px var(--serif); }
.enquiry > p { margin-top: 10px; font-size: 15px; color: var(--stone); line-height: 1.6; }
.enquiry form { display: grid; gap: 18px; margin-top: 28px; }
.enquiry label { display: grid; gap: 6px; font-size: 13px; color: var(--stone); }
.enquiry input, .enquiry textarea { width: 100%; padding: 12px 0; border: 0; border-bottom: 1px solid #cfc8bb; background: transparent; color: var(--ink); font: 16px var(--sans); border-radius: 0; }
.enquiry input:focus, .enquiry textarea:focus { border-bottom-color: var(--gold); outline: none; }
.enquiry .ok { margin-top: 14px; font-size: 14px; color: #8a6b2c; }
.direct { display: grid; gap: 6px; margin-top: 26px; padding-top: 22px; border-top: 1px solid var(--hair); }
.direct a { color: var(--ink); text-decoration: none; font-weight: 600; }
.direct a:hover { color: #8a6b2c; }

/* VIDEO */
.video-sec { background: var(--ink); color: #fff; }
.video-frame { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: #000; }
.video-frame video, .video-frame iframe { width: 100%; height: 100%; border: 0; display: block; }
.play { width: 100%; height: 100%; border: 0; cursor: pointer; background: center / cover no-repeat; display: grid; place-items: center; }
.play span { display: grid; place-items: center; width: 92px; height: 92px; border-radius: 50%; background: rgba(255,255,255,.14); border: 1px solid #fff; color: #fff; backdrop-filter: blur(6px); transition: background .2s ease, color .2s ease; }
.play:hover span { background: var(--gold); border-color: var(--gold); color: var(--ink); }

/* CONNECTIVITY */
.connect { background: #fff; }
.connect-grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: 80px; }
.stop { display: flex; align-items: baseline; gap: 22px; padding: 22px 0; border-bottom: 1px solid var(--hair); }
.stop strong { flex: none; min-width: 120px; font: 400 52px / 1 var(--serif); color: var(--ink); }
.stop strong small { display: inline; font: 600 14px var(--sans); color: #8a6b2c; margin-left: 6px; }
.stop span { font-size: 17px; color: var(--stone); }

/* AMENITIES */
.amenities ul { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0 48px; }
.amenities li { position: relative; padding: 20px 0 20px 26px; border-bottom: 1px solid var(--hair); font: 400 21px var(--serif); }
.amenities li::before { content: ''; position: absolute; left: 0; top: 50%; width: 8px; height: 8px; margin-top: -4px; background: var(--gold); transform: rotate(45deg); }

/* LOCATION */
.location img { width: 100%; border: 1px solid var(--hair); }

/* MORE */
.more { background: #fff; border-top: 1px solid var(--hair); }
.more-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.mini { color: inherit; text-decoration: none; }
.mini img { width: 100%; aspect-ratio: 4 / 3.2; object-fit: cover; transition: opacity .3s ease; }
.mini:hover img { opacity: .88; }
.mini div { padding-top: 16px; }
.mini small { display: block; font-size: 13px; color: var(--stone); }
.mini strong { display: block; margin-top: 4px; font: 400 26px var(--serif); }
.mini:hover strong { text-decoration: underline; text-decoration-color: var(--gold); text-underline-offset: 6px; }

.callbar { display: none; }

/* LIGHTBOX */
.lightbox { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; background: rgba(14,12,9,.95); padding: 24px; }
.lightbox figure { margin: 0; max-width: min(1100px, 86vw); }
.lightbox img { max-width: 100%; max-height: 78vh; display: block; margin: 0 auto; }
.lightbox figcaption { margin-top: 14px; text-align: center; color: rgba(255,255,255,.8); font-size: 14px; }
.lb-close, .lb-nav { position: absolute; background: none; border: 0; color: #fff; cursor: pointer; line-height: 1; }
.lb-close { top: 18px; right: 26px; font-size: 44px; }
.lb-nav { top: 50%; transform: translateY(-50%); font-size: 64px; padding: 10px 18px; }
.lb-nav.prev { left: 10px; }
.lb-nav.next { right: 10px; }

@media (max-width: 1000px) {
  .section { padding: 72px 0; }
  .two-col { grid-template-columns: 1fr; gap: 48px; }
  .enquiry { position: static; }
  .connect-grid { grid-template-columns: 1fr; }
  .amenities ul { grid-template-columns: 1fr 1fr; }
  .facts-grid { grid-template-columns: 1fr 1fr; }
  .facts-grid > div:nth-child(3) { padding-left: 0; border-left: 0; }
  .more-grid { grid-template-columns: 1fr 1fr; }
  .intro-grid { grid-template-columns: 1fr; gap: 28px; }
  .price-box { padding-left: 0; border-left: 0; padding-top: 24px; border-top: 1px solid var(--hair); }
}
@media (max-width: 700px) {
  .section { padding: 56px 0; }
  .mosaic { grid-template-columns: 1fr !important; grid-template-rows: none !important; height: 300px; }
  .tile:not(.big) { display: none; }
  .price-box .btn-gold { display: none; }
  .stop strong { font-size: 40px; min-width: 96px; }
  .amenities ul { grid-template-columns: 1fr; }
  .more-grid { grid-template-columns: 1fr; }
  .detail { padding-bottom: 64px; }
  .callbar { position: fixed; z-index: 50; left: 0; right: 0; bottom: 0; display: grid; grid-template-columns: 1fr 2fr; }
  .callbar a { display: grid; place-items: center; height: 56px; font: 600 15px var(--sans); background: var(--ink); color: #fff; text-decoration: none; }
  .callbar a.gold { background: var(--gold); color: var(--ink); }
}
@media (prefers-reduced-motion: reduce) {
  .tile img, .play span { transition: none; }
}
</style>