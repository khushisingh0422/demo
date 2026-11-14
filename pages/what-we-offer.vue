<script setup lang="ts">
import { offer, stats } from '~/data/site'

useHead({
  title: 'What We Offer | VD Vanchers',
  meta: [{
    name: 'description',
    content: 'Explore premium farmhouse communities, residential plots, thoughtfully planned amenities, and personal guidance from VD Vanchers.',
  }],
})

const openFaq = ref<number | null>(0)

const experiences = [
  {
    number: '01',
    title: 'Farmhouse communities',
    text: 'Space to slow down, breathe, and make a home of your own—within thoughtfully planned communities in sought-after locations.',
    image: '/images/IMG_0112-scaled.jpg',
    alt: 'Open landscape at a VD Vanchers farmhouse community',
  },
  {
    number: '02',
    title: 'Residential plots',
    text: 'A considered starting point for your future home, with project options near developing infrastructure and key corridors.',
    image: '/images/IMG_9996-scaled.jpg',
    alt: 'Residential development by VD Vanchers',
  },
  {
    number: '03',
    title: 'A more personal approach',
    text: 'Get clear answers, explore the location, and understand the next steps with support from our property team.',
    image: '/images/IMG_9984-scaled-e1754563184490.jpg',
    alt: 'VD Vanchers property advisor assisting a client',
  },
]

const values = [
  { title: 'Room to belong', text: 'Landscaped surroundings and generous open space create a more relaxed pace of living.' },
  { title: 'Comfort in the details', text: 'From practical parking to security and leisure, everyday needs are part of the conversation.' },
  { title: 'Guidance, not guesswork', text: 'Our team helps you compare locations, explore a project, and plan a personal site visit.' },
]
</script>

<template>
  <main class="offer-page">
    <section class="offer-hero">
      <div class="hero-image" aria-hidden="true" />
      <div class="hero-shade" aria-hidden="true" />
      <div class="container hero-content">
        <p class="eyebrow"><span /> A better way to find your place</p>
        <h1>Space to live<br /><em>life your way.</em></h1>
        <p class="hero-copy">From considered plots to private farmhouse living, discover a more personal approach to finding land and a place to call your own.</p>
        <div class="hero-actions">
          <NuxtLink to="/projects" class="button button-gold">Explore our projects <span aria-hidden="true">↗</span></NuxtLink>
          <a href="#experience" class="text-link">Discover what we offer <span aria-hidden="true">↓</span></a>
        </div>
        <div class="hero-foot"><span>VD VANCHERS</span><span>NOIDA · VRINDAVAN · DEHRADUN</span></div>
      </div>
      <div class="hero-index" aria-hidden="true">01 <span>/</span> 03</div>
    </section>

    <section class="intro section-pad">
      <div class="container intro-grid">
        <p class="eyebrow dark"><span /> Thoughtfully considered</p>
        <div>
          <h2>More than a plot.<br /><em>A place to make yours.</em></h2>
          <p class="intro-copy">We bring together open landscapes, practical community features, and a human approach to property. Whether you are looking for a weekend retreat or planning for the future, our team helps you find the right next step.</p>
          <div class="proof-row">
            <div v-for="item in stats.slice(0, 2)" :key="item.label" class="proof">
              <strong>{{ item.value }}{{ item.suffix }}</strong>
              <span>{{ item.label }}</span>
            </div>
            <div class="proof note"><strong>Personal</strong><span>guidance at every step</span></div>
          </div>
        </div>
      </div>
    </section>

    <section id="experience" class="experiences section-pad">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow dark"><span /> What we offer</p>
            <h2>Find the setting<br /><em>that feels like you.</em></h2>
          </div>
          <p>Every journey is different. Explore the ways we help you bring your plans for land and living closer to reality.</p>
        </div>

        <div class="experience-list">
          <article v-for="item in experiences" :key="item.number" class="experience-card">
            <div class="experience-photo"><img :src="item.image" :alt="item.alt" loading="lazy" /></div>
            <div class="experience-content">
              <span class="number">{{ item.number }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
              <NuxtLink to="/projects" class="arrow-link">Explore projects <span aria-hidden="true">↗</span></NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="amenities section-pad">
      <div class="container amenity-grid">
        <div class="amenity-copy">
          <p class="eyebrow light"><span /> Made for the everyday</p>
          <h2>Little details.<br /><em>A richer life.</em></h2>
          <p>Our communities are designed around the things that make time at home feel special—from open green space to places to gather, unwind, and enjoy time together.</p>
          <NuxtLink to="/contact" class="button button-outline">Talk to our team <span aria-hidden="true">↗</span></NuxtLink>
        </div>
        <div class="amenity-tiles">
          <article v-for="(tile, index) in offer.tiles" :key="tile.title" class="amenity-tile" :class="{ photo: tile.image, wide: index === 0 || index === 3 }">
            <img v-if="tile.image" :src="tile.image" alt="" loading="lazy" />
            <span class="tile-number">0{{ index + 1 }}</span>
            <h3>{{ tile.title }}</h3>
            <span class="tile-mark" aria-hidden="true">↗</span>
          </article>
        </div>
      </div>
    </section>

    <section class="values section-pad">
      <div class="container">
        <div class="section-heading values-heading">
          <div>
            <p class="eyebrow dark"><span /> The VD Vanchers difference</p>
            <h2>Thoughtful from<br /><em>the very beginning.</em></h2>
          </div>
          <p>A property decision deserves clarity and care. We stay close to the details so you can focus on what matters to you.</p>
        </div>
        <div class="value-grid">
          <article v-for="(value, index) in values" :key="value.title" class="value-card">
            <span>0{{ index + 1 }}</span>
            <h3>{{ value.title }}</h3>
            <p>{{ value.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="faqs section-pad">
      <div class="container faq-grid">
        <div class="faq-heading">
          <p class="eyebrow dark"><span /> A few helpful answers</p>
          <h2>Good to<br /><em>know.</em></h2>
          <p>Have another question? Our team is happy to help you explore the details.</p>
          <NuxtLink to="/contact" class="arrow-link">Get in touch <span aria-hidden="true">↗</span></NuxtLink>
        </div>
        <div class="faq-list">
          <article v-for="(faq, index) in offer.faqs" :key="faq.q" class="faq-item" :class="{ expanded: openFaq === index }">
            <h3>
              <button type="button" :aria-expanded="openFaq === index" @click="openFaq = openFaq === index ? null : index">
                <span>{{ faq.q }}</span><span class="faq-icon" aria-hidden="true">{{ openFaq === index ? '−' : '+' }}</span>
              </button>
            </h3>
            <div class="faq-answer" :class="{ visible: openFaq === index }">
              <p>{{ faq.a.replace(/<\/?strong>/g, '') }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="closing-cta">
      <div class="container cta-inner">
        <p class="eyebrow light"><span /> Your next chapter starts here</p>
        <h2>Let's find a place<br /><em>that feels like yours.</em></h2>
        <NuxtLink to="/contact" class="button button-gold">Plan a conversation <span aria-hidden="true">↗</span></NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.offer-page { --cream: #f5f2eb; --deep: #101d2e; --gold: #c5a36a; background: var(--cream); color: var(--deep); }
.section-pad { padding: clamp(76px, 10vw, 140px) 0; }
.offer-hero { position: relative; min-height: min(810px, calc(100svh - 108px)); display: flex; align-items: flex-end; overflow: hidden; background: var(--deep); color: white; }
.hero-image, .hero-shade { position: absolute; inset: 0; }
.hero-image { background: url('/images/IMG_0112-scaled.jpg') center 54% / cover no-repeat; transform: scale(1.015); }
.hero-shade { background: linear-gradient(90deg, rgba(10,18,29,.83) 0%, rgba(10,18,29,.53) 52%, rgba(10,18,29,.1) 100%), linear-gradient(0deg, rgba(10,18,29,.55), transparent 35%); }
.hero-content { position: relative; z-index: 1; padding-top: 110px; padding-bottom: 48px; }
.eyebrow { display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,.82); font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; }
.eyebrow > span { width: 30px; height: 1px; background: var(--gold); }
.eyebrow.dark { color: #78818a; }
.offer-hero h1 { margin-top: 30px; font: 400 clamp(58px, 9.5vw, 132px)/.91 var(--serif); letter-spacing: -.045em; }
.offer-hero h1 em, .offer-page h2 em { color: var(--gold); font-weight: 400; }
.hero-copy { max-width: 470px; margin-top: 28px; color: rgba(255,255,255,.78); font-size: 16px; line-height: 1.8; }
.hero-actions { display: flex; align-items: center; gap: 28px; margin-top: 34px; }
.button { min-height: 52px; display: inline-flex; align-items: center; justify-content: center; gap: 24px; padding: 0 23px; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; transition: .25s ease; }
.button-gold { background: var(--gold); color: var(--deep); }
.button-gold:hover { background: #e0c58e; transform: translateY(-2px); }
.text-link { color: white; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,.45); padding: 9px 0; }
.text-link span { margin-left: 8px; color: var(--gold); }
.hero-foot { display: flex; justify-content: space-between; margin-top: 76px; padding-top: 17px; border-top: 1px solid rgba(255,255,255,.25); color: rgba(255,255,255,.68); font-size: 10px; font-weight: 600; letter-spacing: .16em; }
.hero-index { position: absolute; right: 4.5%; bottom: 52%; color: white; font: 400 14px var(--sans); letter-spacing: .12em; writing-mode: vertical-rl; }
.hero-index span { color: var(--gold); padding: 8px 0; }

.intro { background: var(--cream); }
.intro-grid { display: grid; grid-template-columns: .7fr 1.3fr; gap: 8%; }
.offer-page h2 { font: 400 clamp(38px, 5vw, 68px)/1.08 var(--serif); letter-spacing: -.025em; }
.intro h2 { margin-top: 23px; }
.intro h2 em, .section-heading h2 em, .faq-heading h2 em { color: #9e8051; }
.intro-copy { max-width: 650px; margin-top: 24px; color: #66717a; font-size: 16px; line-height: 1.9; }
.proof-row { display: flex; gap: clamp(28px, 6vw, 78px); margin-top: 44px; padding-top: 23px; border-top: 1px solid #dcd8cf; }
.proof { display: grid; gap: 2px; }
.proof strong { font: 500 31px var(--serif); }
.proof span { color: #78818a; font-size: 11px; letter-spacing: .1em; text-transform: uppercase; }
.proof.note strong { font-size: 23px; }

.experiences { background: #fff; }
.section-heading { display: flex; justify-content: space-between; align-items: end; gap: 42px; margin-bottom: 56px; }
.section-heading h2 { margin-top: 18px; }
.section-heading > p { max-width: 360px; color: #6b747c; font-size: 15px; line-height: 1.8; }
.experience-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.experience-card { background: var(--cream); }
.experience-photo { aspect-ratio: 1.16 / 1; overflow: hidden; background: #ddd8ce; }
.experience-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform .7s ease; }
.experience-card:hover .experience-photo img { transform: scale(1.04); }
.experience-content { position: relative; min-height: 255px; padding: 27px 28px 30px; }
.number { color: #a68a5d; font-size: 11px; letter-spacing: .15em; }
.experience-content h3 { margin-top: 18px; font: 500 26px/1.2 var(--serif); }
.experience-content p { margin-top: 12px; color: #68727a; font-size: 14px; line-height: 1.75; }
.arrow-link { display: inline-flex; align-items: center; gap: 13px; margin-top: 24px; color: var(--deep); font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.arrow-link span { color: #a68a5d; font-size: 16px; transition: transform .2s; }
.arrow-link:hover span { transform: translate(3px, -3px); }

.amenities { background: var(--deep); color: white; }
.amenity-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 8%; align-items: center; }
.amenity-copy h2 { margin-top: 24px; }
.amenity-copy > p:not(.eyebrow) { max-width: 430px; margin-top: 22px; color: rgba(255,255,255,.68); font-size: 15px; line-height: 1.85; }
.button-outline { margin-top: 30px; border: 1px solid rgba(255,255,255,.46); color: white; }
.button-outline:hover { background: white; color: var(--deep); }
.amenity-tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
.amenity-tile { position: relative; min-height: 190px; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; padding: 22px; background: #1b2c40; }
.amenity-tile.wide { min-height: 230px; }
.amenity-tile.photo::before { content: ''; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(7,14,23,.82), rgba(7,14,23,.04)); z-index: 1; }
.amenity-tile img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .7s; }
.amenity-tile:hover img { transform: scale(1.05); }
.tile-number, .amenity-tile h3, .tile-mark { position: relative; z-index: 2; }
.tile-number { position: absolute; top: 16px; left: 18px; color: rgba(255,255,255,.75); font-size: 10px; letter-spacing: .12em; }
.amenity-tile h3 { max-width: 220px; font: 400 23px/1.2 var(--serif); }
.tile-mark { position: absolute; right: 18px; bottom: 21px; color: var(--gold); }

.values { background: var(--cream); }
.value-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid #dcd8cf; }
.value-card { padding: 27px 34px 20px 0; }
.value-card + .value-card { padding-left: 34px; border-left: 1px solid #dcd8cf; }
.value-card > span { color: #a68a5d; font-size: 11px; letter-spacing: .15em; }
.value-card h3 { margin-top: 24px; font: 500 27px var(--serif); }
.value-card p { margin-top: 12px; max-width: 340px; color: #6b747c; font-size: 14px; line-height: 1.8; }

.faqs { background: white; }
.faq-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 10%; }
.faq-heading h2 { margin-top: 20px; }
.faq-heading > p:not(.eyebrow) { max-width: 300px; margin-top: 22px; color: #6b747c; font-size: 14px; line-height: 1.8; }
.faq-list { border-top: 1px solid #dedbd4; }
.faq-item { border-bottom: 1px solid #dedbd4; }
.faq-item h3 { font: inherit; }
.faq-item button { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 23px 0; border: 0; background: none; text-align: left; color: var(--deep); font: 500 18px var(--serif); cursor: pointer; }
.faq-icon { color: #a68a5d; font: 300 25px var(--sans); }
.faq-answer { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease; }
.faq-answer p { overflow: hidden; max-width: 600px; color: #6b747c; font-size: 14px; line-height: 1.8; }
.faq-answer.visible { grid-template-rows: 1fr; }
.faq-answer.visible p { padding: 0 35px 22px 0; }

.closing-cta { padding: 92px 0; background: linear-gradient(90deg, rgba(10,18,29,.92), rgba(10,18,29,.68)), url('/images/IMG_9996-scaled.jpg') center 48% / cover; color: white; }
.cta-inner { display: flex; flex-direction: column; align-items: flex-start; }
.closing-cta h2 { margin-top: 23px; font-size: clamp(42px, 6vw, 76px); }
.closing-cta .button { margin-top: 30px; }

@media (max-width: 900px) {
  .intro-grid, .amenity-grid, .faq-grid { grid-template-columns: 1fr; gap: 44px; }
  .experience-list { grid-template-columns: 1fr 1fr; }
  .experience-card:last-child { grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; }
  .experience-card:last-child .experience-photo { height: 100%; }
  .section-heading { align-items: flex-start; flex-direction: column; gap: 20px; }
  .hero-index { display: none; }
}
@media (max-width: 600px) {
  .offer-hero { min-height: 700px; min-height: min(760px, calc(100svh - 80px)); }
  .hero-content { padding-bottom: 28px; }
  .offer-hero h1 { font-size: clamp(56px, 16vw, 82px); }
  .hero-actions { align-items: flex-start; flex-direction: column; gap: 14px; }
  .hero-foot { margin-top: 48px; font-size: 8px; }
  .intro-grid { gap: 24px; }
  .proof-row { gap: 22px; flex-wrap: wrap; }
  .proof strong { font-size: 26px; }
  .experience-list { grid-template-columns: 1fr; }
  .experience-card:last-child { grid-column: auto; display: block; }
  .experience-card:last-child .experience-photo { aspect-ratio: 1.16 / 1; }
  .amenity-tiles { gap: 9px; }
  .amenity-tile, .amenity-tile.wide { min-height: 170px; padding: 16px; }
  .amenity-tile h3 { font-size: 19px; }
  .tile-mark { right: 12px; bottom: 14px; }
  .value-grid { grid-template-columns: 1fr; }
  .value-card, .value-card + .value-card { padding: 24px 0; border-left: 0; border-bottom: 1px solid #dcd8cf; }
  .value-card h3 { margin-top: 13px; }
  .faq-item button { font-size: 17px; }
  .closing-cta { padding: 70px 0; }
}
@media (prefers-reduced-motion: reduce) {
  .experience-photo img, .amenity-tile img, .button, .arrow-link span { transition: none; }
}
</style>
