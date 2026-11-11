<script setup lang="ts">
import { directors, brand } from '~/data/site'
const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="directors" ref="root" class="directors">
    <img class="watermark" :src="brand.logo" alt="" aria-hidden="true" loading="lazy" />

    <div class="container">
      <header class="head reveal">
        <span class="kick"><i />{{ directors.kicker }}<i /></span>
        <h2>{{ directors.title }} <em>{{ directors.accent }}</em></h2>
        <p>{{ directors.intro }}</p>
      </header>

      <div class="cards">
        <article
          v-for="(d, i) in directors.people"
          :key="d.name"
          class="card reveal"
          :style="{ transitionDelay: `${i * 140}ms` }"
        >
          <div class="portrait">
            <img v-if="d.photo" :src="d.photo" :alt="d.name" loading="lazy" />
            <div v-else class="monogram" aria-hidden="true">
              <span>{{ d.initials }}</span>
            </div>
            <span class="corner tl" /><span class="corner br" />
            <span class="index">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>

          <div class="body">
            <span class="role">{{ d.role }}</span>
            <h3>{{ d.name }}</h3>
            <span class="rule" />
            <blockquote>{{ d.quote }}</blockquote>
            <span class="sign">{{ d.name }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.directors {
  position: relative; overflow: hidden; isolation: isolate;
  padding: 130px 0 140px; color: #d9dee6;
  background:
    radial-gradient(900px 500px at 85% -10%, rgba(197, 163, 106, .16), transparent 60%),
    radial-gradient(700px 500px at -10% 110%, rgba(47, 95, 143, .28), transparent 60%),
    linear-gradient(180deg, #0b1625 0%, var(--navy-900) 100%);
}
/* faint architectural grid */
.directors::before {
  content: ''; position: absolute; inset: 0; z-index: -1; opacity: .5;
  background-image:
    linear-gradient(rgba(226, 205, 167, .05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(226, 205, 167, .05) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
}
.watermark {
  position: absolute; right: -120px; bottom: -140px; width: 560px; z-index: -1;
  opacity: .05; filter: grayscale(1) brightness(2.2); pointer-events: none;
}

/* Heading */
.head { max-width: 720px; margin: 0 auto 80px; text-align: center; }
.kick {
  display: inline-flex; align-items: center; gap: 16px;
  font: 600 12px/1 var(--sans); letter-spacing: .38em; text-transform: uppercase; color: var(--gold);
}
.kick i { width: 42px; height: 1px; background: linear-gradient(90deg, transparent, var(--gold)); }
.kick i:last-child { transform: scaleX(-1); }
.head h2 { margin: 26px 0 22px; font-size: clamp(36px, 5vw, 60px); font-weight: 500; color: var(--white); letter-spacing: -.01em; }
.head h2 em {
  font-style: italic; display: block;
  background: linear-gradient(100deg, var(--gold-light) 10%, var(--gold) 50%, #f3e6cc 90%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.head p { font-size: 17px; line-height: 1.8; color: #9fabba; }

/* Cards */
.cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px; max-width: 1080px; margin: 0 auto; }
.card {
  position: relative; display: grid; grid-template-columns: 0.9fr 1fr; align-items: stretch;
  border-radius: 4px; overflow: hidden;
  background: linear-gradient(160deg, rgba(255,255,255,.06), rgba(255,255,255,.015));
  border: 1px solid rgba(226, 205, 167, .16);
  box-shadow: 0 40px 80px -40px rgba(0, 0, 0, .7);
  backdrop-filter: blur(6px);
  transition: opacity .9s ease, transform .9s cubic-bezier(.2,.7,.2,1), border-color .4s, box-shadow .4s;
}
.card:hover {
  border-color: rgba(197, 163, 106, .55);
  box-shadow: 0 50px 90px -40px rgba(0, 0, 0, .8), 0 0 0 1px rgba(197, 163, 106, .15);
}
.card.is-visible:hover { transform: translateY(-6px); }

/* Portrait / monogram */
.portrait { position: relative; min-height: 360px; overflow: hidden; background: #0a1422; }
.portrait img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: grayscale(.25) contrast(1.05); transition: transform 1.2s ease; }
.card:hover .portrait img { transform: scale(1.05); }
.monogram {
  position: absolute; inset: 0; display: grid; place-items: center;
  background:
    radial-gradient(circle at 50% 40%, rgba(197, 163, 106, .22), transparent 62%),
    repeating-linear-gradient(135deg, rgba(226,205,167,.035) 0 1px, transparent 1px 14px),
    linear-gradient(180deg, #13243a, #0a1422);
}
.monogram span {
  font-family: var(--serif); font-style: italic; font-weight: 500; font-size: 96px; letter-spacing: .02em;
  background: linear-gradient(160deg, #f6ead2 0%, var(--gold) 55%, #8d6d3c 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,.45));
  transition: transform .8s ease;
}
.card:hover .monogram span { transform: scale(1.06); }
/* sheen sweep */
.portrait::after {
  content: ''; position: absolute; inset: -20%; pointer-events: none;
  background: linear-gradient(115deg, transparent 40%, rgba(255,255,255,.12) 50%, transparent 60%);
  transform: translateX(-100%); transition: transform 1.1s ease;
}
.card:hover .portrait::after { transform: translateX(100%); }
.corner { position: absolute; width: 26px; height: 26px; border: 0 solid var(--gold); opacity: .8; }
.corner.tl { top: 18px; left: 18px; border-top-width: 1px; border-left-width: 1px; }
.corner.br { bottom: 18px; right: 18px; border-bottom-width: 1px; border-right-width: 1px; }
.index {
  position: absolute; left: 22px; bottom: 16px;
  font: 500 13px/1 var(--sans); letter-spacing: .3em; color: rgba(226, 205, 167, .7);
}

/* Text */
.body { padding: 44px 36px 40px; display: flex; flex-direction: column; justify-content: center; }
.role { font: 600 11px/1.4 var(--sans); letter-spacing: .3em; text-transform: uppercase; color: var(--gold); }
.body h3 { margin: 14px 0 0; font-size: 30px; font-weight: 500; color: var(--white); line-height: 1.15; }
.rule { display: block; width: 48px; height: 1px; margin: 24px 0; background: var(--gold); transition: width .5s ease; }
.card:hover .rule { width: 88px; }
blockquote {
  position: relative; margin: 0; padding-left: 0;
  font-family: var(--serif); font-style: italic; font-size: 18px; line-height: 1.6; color: #c6cfdb;
}
blockquote::before {
  content: '\201C'; display: block; height: 30px; margin-bottom: 4px;
  font-size: 64px; line-height: 1; color: var(--gold); opacity: .55;
}
.sign {
  margin-top: 26px; font-family: var(--serif); font-style: italic; font-size: 15px;
  color: rgba(226, 205, 167, .55); letter-spacing: .04em;
}

@media (max-width: 1024px) {
  .cards { grid-template-columns: 1fr; max-width: 640px; }
}
@media (max-width: 560px) {
  .directors { padding: 84px 0 96px; }
  .head { margin-bottom: 52px; }
  .card { grid-template-columns: minmax(0, 1fr); }
  .portrait { min-height: 260px; }
  .monogram span { font-size: 80px; }
  .body { padding: 32px 24px 34px; }
  .body h3 { font-size: 26px; }
  .watermark { width: 340px; right: -100px; bottom: -80px; }
}
@media (prefers-reduced-motion: reduce) {
  .card, .portrait img, .monogram span, .portrait::after, .rule { transition: none; }
}
</style>
