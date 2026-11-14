<script setup lang="ts">
import { directors } from '~/data/site'
import { ref, computed, onMounted, onUnmounted } from 'vue'

useHead({
  title: 'About Us | VD Vanchers — Premium Farmhouse Living',
  meta: [{ name: 'description', content: 'Discover VD Vanchers: 15+ years of crafting premium farmhouse communities and land investments across Noida, Vrindavan, and Dehradun.' }],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Manrope:wght@400;500;600;700;800&display=swap',
    },
  ],
})

const prefersReduce = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

/* ---------- Text Reveal (word mask) ---------- */
const vTextReveal = {
  mounted(el: HTMLElement) {
    const textElements = el.querySelectorAll('.reveal-text')
    let n = 0
    textElements.forEach((textEl) => {
      const text = textEl.textContent || ''
      textEl.innerHTML = text
        .split(' ')
        .map((word) => `<span class="word-mask" style="--i:${n++}"><span class="word">${word}</span></span>`)
        .join(' ')
    })
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('is-revealed')
        observer.disconnect()
      }
    }, { threshold: 0.2 })
    observer.observe(el)
  }
}

/* ---------- Fade Up ---------- */
const vReveal = {
  mounted(el: HTMLElement, binding: any) {
    const delay = binding.value?.delay ?? 0
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    el.style.transition = `opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)`
    el.style.transitionDelay = `${delay}ms`
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('is-revealed')
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
  }
}

/* ---------- In-view flag ---------- */
const vInView = {
  mounted(el: HTMLElement) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('in-view')
        observer.disconnect()
      }
    }, { threshold: 0.25 })
    observer.observe(el)
  }
}

/* ---------- Count-up numbers ---------- */
const vCountUp = {
  mounted(el: HTMLElement) {
    const raw = (el.textContent || '').trim()
    const m = raw.match(/^(\d+)(.*)$/)
    if (!m || prefersReduce()) return
    const target = +m[1]
    const suffix = m[2]
    el.textContent = '0' + suffix
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const dur = 1800
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur)
        const eased = 1 - Math.pow(1 - p, 4)
        el.textContent = Math.round(target * eased) + suffix
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(el)
  }
}

/* ---------- Magnetic button ---------- */
const vMagnetic = {
  mounted(el: HTMLElement) {
    if (prefersReduce() || !isFinePointer()) return
    el.addEventListener('mousemove', (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) * 0.22
      const y = (e.clientY - r.top - r.height / 2) * 0.35
      el.style.transform = `translate(${x}px, ${y}px)`
    })
    el.addEventListener('mouseleave', () => { el.style.transform = '' })
  }
}

/* ---------- Scroll parallax: sets --p on a section, children read it in CSS ---------- */
const progress = ref(0)
const parallaxEls = new Set<HTMLElement>()
let rafId = 0

const updateScroll = () => {
  rafId = 0
  const vh = window.innerHeight
  parallaxEls.forEach((el) => {
    const r = el.getBoundingClientRect()
    const p = (r.top + r.height / 2 - vh / 2) / vh
    el.style.setProperty('--p', Math.max(-1.5, Math.min(1.5, p)).toFixed(3))
  })
  const max = document.documentElement.scrollHeight - vh
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
}
const onScroll = () => { if (!rafId) rafId = requestAnimationFrame(updateScroll) }

const vParallax = {
  mounted(el: HTMLElement) {
    if (prefersReduce()) return
    parallaxEls.add(el)
    onScroll()
  },
  unmounted(el: HTMLElement) { parallaxEls.delete(el) },
}

/* ---------- Custom cursor ring (desktop only) ---------- */
const cursorRef = ref<HTMLElement | null>(null)
let cx = 0, cy = 0, tx = 0, ty = 0
let cursorRaf = 0
let cursorOn = false

const tickCursor = () => {
  cx += (tx - cx) * 0.18
  cy += (ty - cy) * 0.18
  if (cursorRef.value) cursorRef.value.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
  if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) cursorRaf = requestAnimationFrame(tickCursor)
  else cursorRaf = 0
}

const moveCursor = (e: MouseEvent) => {
  tx = e.clientX
  ty = e.clientY
  if (!cursorOn) {
    cursorOn = true
    cx = tx
    cy = ty
    cursorRef.value?.classList.add('on')
  }
  const hit = (e.target as HTMLElement | null)?.closest?.('a, button, .pro-card, .dest-panel')
  cursorRef.value?.classList.toggle('hover', !!hit)
  if (!cursorRaf) cursorRaf = requestAnimationFrame(tickCursor)
}

const hideCursor = () => {
  cursorOn = false
  cursorRef.value?.classList.remove('on')
}

/* ---------- 3D Cube: autonomous rotation + manual navigation ---------- */
const cubeRef = ref<HTMLElement | null>(null)
const sceneRef = ref<HTMLElement | null>(null)
const activeFace = ref(0)
let startTimer: ReturnType<typeof setTimeout> | undefined
let spinTimer: ReturnType<typeof setInterval> | undefined
let angle = 0
let reduceMotion = false

const setAngle = (deg: number) => {
  cubeRef.value?.style.setProperty('--ry', `${deg}deg`)
}

const rotateBy = (steps: number) => {
  angle -= 90 * steps
  setAngle(angle)
  activeFace.value = ((Math.round(-angle / 90) % 4) + 4) % 4
}

const startSpin = () => {
  if (spinTimer) clearInterval(spinTimer)
  spinTimer = setInterval(() => rotateBy(1), 4200)
}

const goTo = (i: number) => {
  const delta = (i - activeFace.value + 4) % 4
  if (delta) rotateBy(delta)
  if (!reduceMotion) startSpin()
}

const onHeroMove = (e: MouseEvent) => {
  if (reduceMotion || !sceneRef.value) return
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  sceneRef.value.style.setProperty('--tx', x.toFixed(3))
  sceneRef.value.style.setProperty('--ty', y.toFixed(3))
}
const onHeroLeave = () => {
  sceneRef.value?.style.setProperty('--tx', '0')
  sceneRef.value?.style.setProperty('--ty', '0')
}

/* ---------- Director cards: tilt + spotlight ---------- */
const onCardMove = (e: MouseEvent) => {
  if (reduceMotion) return
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  el.style.setProperty('--mx', (x * 100).toFixed(1) + '%')
  el.style.setProperty('--my', (y * 100).toFixed(1) + '%')
  el.style.setProperty('--rx', ((0.5 - y) * 6).toFixed(2) + 'deg')
  el.style.setProperty('--ry', ((x - 0.5) * 8).toFixed(2) + 'deg')
}
const onCardLeave = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}

onMounted(() => {
  reduceMotion = prefersReduce()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  onScroll()

  if (!reduceMotion && isFinePointer()) {
    document.addEventListener('mousemove', moveCursor)
    document.documentElement.addEventListener('mouseleave', hideCursor)
  }

  if (reduceMotion) {
    setAngle(0)
    return
  }
  requestAnimationFrame(() => setAngle(0))
  startTimer = setTimeout(startSpin, 2800)
})

onUnmounted(() => {
  if (startTimer) clearTimeout(startTimer)
  if (spinTimer) clearInterval(spinTimer)
  if (rafId) cancelAnimationFrame(rafId)
  if (cursorRaf) cancelAnimationFrame(cursorRaf)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  document.removeEventListener('mousemove', moveCursor)
  document.documentElement.removeEventListener('mouseleave', hideCursor)
  parallaxEls.clear()
})

/* ---------- Marquee content ---------- */
const marqueeItems = [
  'Noida', 'Vrindavan', 'Dehradun',
  'Farmhouse Communities', 'Land Investments', 'Legal Transparency',
]

/* ---------- Floating gold dust ---------- */
const dust = Array.from({ length: 18 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  y: (i * 53 + 7) % 100,
  s: 2 + (i % 3),
  d: +((i * 0.7) % 6).toFixed(1),
  t: 7 + (i % 5) * 2,
}))

/* ---------- Gallery images (swap with your real project photos) ---------- */
const gallery = [
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80', alt: 'Farmhouse exterior', k: '-50px', ratio: '4 / 5', offset: '0px' },
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80', alt: 'Modern farmhouse living', k: '40px', ratio: '3 / 4', offset: '70px' },
  { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80', alt: 'Farmhouse interior', k: '-25px', ratio: '4 / 5', offset: '20px' },
]

/* ---------- Presence: destinations (panels) + India map ---------- */
const view = ref<'panels' | 'map'>('panels')
const activePanel = ref<string>('noida')
const activeLoc = ref<string | null>(null)

const SCALE = 14
const project = (lon: number, lat: number): [number, number] => [
  +((lon - 68) * SCALE).toFixed(1),
  +((37.5 - lat) * SCALE).toFixed(1),
]

const outline: [number, number][] = [
  [74.3, 37.0], [75.9, 36.6], [77.8, 35.5], [78.9, 34.3], [78.4, 32.6], [79.0, 31.3], [80.2, 30.4],
  [80.1, 28.8], [81.4, 28.2], [82.7, 27.6], [84.1, 27.4], [85.6, 26.8], [87.3, 26.4], [88.1, 26.5],
  [88.2, 27.3], [88.8, 27.9], [89.0, 27.2], [89.8, 26.7], [91.5, 26.8], [92.1, 27.0], [92.5, 27.9],
  [93.8, 28.6], [95.2, 29.3], [96.3, 28.9], [97.3, 28.2], [96.9, 27.2], [96.0, 26.6], [95.2, 26.0],
  [94.6, 25.0], [94.2, 23.8], [93.4, 23.0], [93.1, 22.2], [92.5, 22.9], [92.3, 24.0], [91.6, 24.1],
  [91.2, 25.2], [90.0, 25.2], [89.8, 26.0], [89.0, 26.0], [88.4, 25.3], [88.1, 24.3], [88.7, 23.3],
  [89.0, 22.2], [88.9, 21.6], [87.0, 21.5], [86.9, 20.7], [86.0, 19.9], [85.1, 19.3], [84.0, 18.3],
  [82.3, 16.7], [81.2, 16.0], [80.3, 15.5], [80.2, 13.4], [79.9, 11.9], [79.8, 10.3], [79.3, 9.3],
  [78.2, 8.9], [77.5, 8.1], [76.6, 8.9], [75.8, 11.0], [74.8, 12.9], [74.0, 15.0], [73.4, 16.8],
  [72.8, 19.0], [72.8, 20.5], [72.7, 21.3], [72.2, 21.0], [71.0, 20.7], [70.0, 21.0], [69.0, 22.3],
  [70.0, 22.8], [68.9, 23.4], [68.2, 23.7], [68.7, 24.3], [70.0, 24.2], [71.0, 25.4], [70.2, 26.0],
  [70.0, 27.2], [71.0, 27.9], [72.2, 29.0], [73.4, 29.9], [74.5, 31.0], [74.6, 32.0], [74.0, 32.9],
  [74.6, 33.4], [73.8, 34.5],
]

const indiaPath = computed(
  () => 'M' + outline.map(([lon, lat]) => project(lon, lat).join(',')).join(' L') + ' Z'
)

const PILL_W = 140
const PILL_H = 38

// img: replace with real photos of each location
const locations = [
  {
    key: 'noida', name: 'Noida', note: 'Delhi NCR growth corridor',
    blurb: 'A growth corridor where land holds its value, minutes from the city.',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
    lon: 77.39, lat: 28.54, side: 'left', lx: -40, ly: 106,
  },
  {
    key: 'vrindavan', name: 'Vrindavan', note: 'Spiritual corridor',
    blurb: 'Temple lanes and a calmer pace, close to the spiritual heart of the region.',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    lon: 77.7, lat: 27.58, side: 'right', lx: 250, ly: 154,
  },
  {
    key: 'dehradun', name: 'Dehradun', note: 'Serene foothills',
    blurb: 'Quiet foothills where daily life slows down and the air turns clean.',
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
    lon: 78.03, lat: 30.32, side: 'right', lx: 250, ly: 56,
  },
]

const markers = computed(() =>
  locations.map((l, i) => {
    const [x, y] = project(l.lon, l.lat)
    const ax = l.side === 'right' ? l.lx : l.lx + PILL_W
    const ay = l.ly + PILL_H / 2
    return { ...l, x, y, ax, ay, i }
  })
)

// route runs north to south: Dehradun -> Noida -> Vrindavan
const routePath = computed(() => {
  const pts = [...markers.value].sort((a, b) => a.y - b.y)
  return pts
    .map((p, i) =>
      i === 0
        ? `M${p.x},${p.y}`
        : `Q${((pts[i - 1].x + p.x) / 2 + 26).toFixed(1)},${((pts[i - 1].y + p.y) / 2).toFixed(1)} ${p.x},${p.y}`
    )
    .join(' ')
})

const focusLoc = (key: string) => {
  activePanel.value = key
  activeLoc.value = key
}
</script>

<template>
  <main class="about-page">
    <!-- scroll progress -->
    <div class="scroll-progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true"></div>

    <!-- custom cursor ring (desktop) -->
    <div class="cursor" ref="cursorRef" aria-hidden="true"><i></i></div>

    <!-- ========== TOP HERO ========== -->
    <section class="classy-hero" v-parallax>
      <div class="bg-grid"></div>
      <div class="hero-glow"></div>
      <span class="hero-watermark" aria-hidden="true">VD</span>

      <div class="container hero-wrapper">
        <div class="hero-content">

          <div class="kicker-wrap" v-reveal>
            <div class="line"></div>
            <span class="classy-kicker">EST. 2019 — PREMIUM LIVING</span>
          </div>

          <h1 class="hero-title" v-text-reveal>
            <span class="reveal-text">We build more than homes.</span>
            <br />
            <span class="reveal-text highlight-text">We craft lasting legacies.</span>
          </h1>

          <p class="hero-desc" v-text-reveal>
            <span class="reveal-text">
              From the growth corridors of Noida to the spiritual landscape of Vrindavan, we guide buyers toward land and homes that appreciate in value.
            </span>
          </p>

          <div class="hero-actions" v-reveal="{ delay: 800 }">
            <NuxtLink to="/projects" class="btn-primary" v-magnetic>
              <span>Explore Projects</span>
            </NuxtLink>
            <NuxtLink to="/contact" class="btn-secondary">
              <span>Speak to Advisor</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- 3D Cube -->
        <div class="hero-visual" @mousemove="onHeroMove" @mouseleave="onHeroLeave">
          <div class="cube-stage">
            <div class="scene" ref="sceneRef">
              <div class="cube" ref="cubeRef">
                <div class="cube-face face-1">
                  <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" alt="Farmhouse 1" />
                </div>
                <div class="cube-face face-2">
                  <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" alt="Farmhouse 2" />
                </div>
                <div class="cube-face face-3">
                  <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80" alt="Farmhouse 3" />
                </div>
                <div class="cube-face face-4">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="Farmhouse 4" />
                </div>
              </div>
            </div>
            <div class="cube-shadow"></div>
          </div>

          <!-- Rotating seal -->
          <div class="seal" v-reveal="{ delay: 2000 }" aria-hidden="true">
            <svg viewBox="0 0 120 120" class="seal-ring">
              <defs>
                <path id="vd-seal-path" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <text class="seal-text" textLength="272" lengthAdjust="spacing">
                <textPath href="#vd-seal-path">VD VANCHERS — PREMIUM FARMHOUSE LIVING — </textPath>
              </text>
            </svg>
            <span class="seal-mark">VD</span>
          </div>

          <!-- Floating Badge -->
          <div class="floating-card" v-reveal="{ delay: 1800 }">
            <div class="card-inner">
              <span class="float-num">15+</span>
              <span class="float-txt">Years of<br>Excellence</span>
            </div>
          </div>

          <!-- Face selector -->
          <div class="face-nav" role="tablist" aria-label="Choose farmhouse image">
            <button
              v-for="n in 4"
              :key="n"
              type="button"
              class="face-dot"
              :class="{ active: activeFace === n - 1 }"
              :aria-label="'Show farmhouse ' + n"
              :aria-selected="activeFace === n - 1"
              role="tab"
              @click="goTo(n - 1)"
            ></button>
            <span class="face-count">0{{ activeFace + 1 }} / 04</span>
          </div>
        </div>
      </div>

      <!-- Marquee strip -->
      <div class="marquee" aria-hidden="true">
        <div class="marquee-track">
          <div class="marquee-group" v-for="g in 2" :key="g">
            <span v-for="(item, i) in marqueeItems" :key="g + '-' + i" class="marquee-item">
              {{ item }}<i class="diamond"></i>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== PRESENCE: destination panels (default) or map ========== -->
    <section class="presence" v-parallax>
      <div class="dust" aria-hidden="true">
        <span
          v-for="(d, i) in dust"
          :key="i"
          class="dust-dot"
          :style="{ left: d.x + '%', top: d.y + '%', width: d.s + 'px', height: d.s + 'px', animationDelay: d.d + 's', animationDuration: d.t + 's' }"
        ></span>
      </div>

      <div class="container presence-grid">
        <div class="presence-copy" v-reveal>
          <span class="classy-kicker light-kicker">OUR PRESENCE</span>
          <h2 class="presence-title" v-text-reveal>
            <span class="reveal-text">Where you want a quieter life,</span>
            <br />
            <span class="reveal-text gold-text">we are already there.</span>
          </h2>
          <p class="presence-desc">
            From Noida's growth corridor to Vrindavan's temple lanes and the Dehradun foothills, VD Vanchers communities sit where land holds its value and daily life slows down.
          </p>

          <ul class="loc-list">
            <li v-for="m in markers" :key="m.key" v-reveal="{ delay: 300 + m.i * 140 }">
              <button
                type="button"
                class="loc-row"
                :class="{ active: activePanel === m.key }"
                @mouseenter="focusLoc(m.key)"
                @mouseleave="activeLoc = null"
                @focus="focusLoc(m.key)"
                @blur="activeLoc = null"
                @click="focusLoc(m.key)"
              >
                <span class="loc-pin"></span>
                <span class="loc-text">
                  <strong>{{ m.name }}</strong>
                  <em>{{ m.note }}</em>
                </span>
                <span class="loc-tag">VD Vanchers</span>
              </button>
            </li>
          </ul>
        </div>

        <div class="presence-stage" v-reveal="{ delay: 200 }">
          <!-- view switch -->
          <div class="view-toggle" role="tablist" aria-label="Choose view">
            <span class="vt-pill" :class="view" aria-hidden="true"></span>
            <button type="button" role="tab" :aria-selected="view === 'panels'" :class="{ on: view === 'panels' }" @click="view = 'panels'">Destinations</button>
            <button type="button" role="tab" :aria-selected="view === 'map'" :class="{ on: view === 'map' }" @click="view = 'map'">Map</button>
          </div>

          <div class="stage-body">
            <Transition name="view" mode="out-in">

              <!-- DESTINATION PANELS -->
              <div v-if="view === 'panels'" key="panels" class="dest">
                <article
                  v-for="m in markers"
                  :key="m.key"
                  class="dest-panel"
                  :class="{ active: activePanel === m.key }"
                  tabindex="0"
                  @mouseenter="focusLoc(m.key)"
                  @mouseleave="activeLoc = null"
                  @focus="focusLoc(m.key)"
                  @click="focusLoc(m.key)"
                >
                  <div class="dest-bg" :style="{ backgroundImage: `url(${m.img})` }"></div>
                  <div class="dest-shade"></div>
                  <span class="dest-vname" aria-hidden="true">{{ m.name }}</span>
                  <div class="dest-body">
                    <span class="dest-note">{{ m.note }}</span>
                    <h3 class="dest-name">{{ m.name }}</h3>
                    <p class="dest-blurb">{{ m.blurb }}</p>
                    <span class="dest-tag">VD Vanchers</span>
                  </div>
                </article>
              </div>

              <!-- MAP -->
              <div v-else key="map" class="map-frame" v-in-view>
                <div class="radar" aria-hidden="true"></div>

                <svg viewBox="-50 0 500 420" class="india-svg" role="img" aria-label="Map of India showing VD Vanchers locations">
                  <defs>
                    <pattern id="vd-dots" width="7" height="7" patternUnits="userSpaceOnUse">
                      <circle cx="3.5" cy="3.5" r="0.9" fill="#c5a36a" />
                    </pattern>
                    <clipPath id="vd-india">
                      <path :d="indiaPath" />
                    </clipPath>
                    <radialGradient id="vd-glow" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stop-color="#c5a36a" stop-opacity="0.16" />
                      <stop offset="100%" stop-color="#c5a36a" stop-opacity="0" />
                    </radialGradient>
                  </defs>

                  <ellipse cx="140" cy="190" rx="220" ry="200" fill="url(#vd-glow)" class="map-glow" />

                  <g clip-path="url(#vd-india)">
                    <rect x="-50" y="0" width="500" height="420" fill="url(#vd-dots)" class="land-dots" />
                  </g>

                  <path :d="indiaPath" pathLength="1" class="india-outline" />
                  <path :d="routePath" pathLength="1" class="route" />
                  <circle r="2.6" class="traveler">
                    <animateMotion :path="routePath" dur="5s" repeatCount="indefinite" />
                  </circle>

                  <g class="leaders">
                    <line
                      v-for="m in markers" :key="'l-' + m.key"
                      :x1="m.x" :y1="m.y" :x2="m.ax" :y2="m.ay"
                      class="leader"
                      :class="{ on: activeLoc === m.key, dim: activeLoc && activeLoc !== m.key }"
                      :style="{ transitionDelay: 1.6 + m.i * 0.25 + 's' }"
                    />
                  </g>

                  <g
                    v-for="m in markers" :key="m.key"
                    class="loc"
                    :class="{ on: activeLoc === m.key, dim: activeLoc && activeLoc !== m.key }"
                    :style="{ transitionDelay: 1.4 + m.i * 0.25 + 's' }"
                    @mouseenter="focusLoc(m.key)"
                    @mouseleave="activeLoc = null"
                  >
                    <circle :cx="m.x" :cy="m.y" r="5" class="ring" :style="{ animationDelay: m.i * 0.5 + 's' }" />
                    <circle :cx="m.x" :cy="m.y" r="5" class="ring" :style="{ animationDelay: m.i * 0.5 + 1.3 + 's' }" />
                    <circle :cx="m.x" :cy="m.y" r="10" class="halo" />
                    <circle :cx="m.x" :cy="m.y" r="4.5" class="core" />

                    <rect :x="m.lx" :y="m.ly" :width="PILL_W" :height="PILL_H" rx="3" class="pill" />
                    <text :x="m.lx + 12" :y="m.ly + 16" class="pill-name">{{ m.name }}</text>
                    <text :x="m.lx + 12" :y="m.ly + 30" class="pill-note">{{ m.note }}</text>
                  </g>
                </svg>

                <div class="map-legend">
                  <span class="legend-dot"></span> VD Vanchers location
                </div>
              </div>

            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== DIRECTORS (Leadership) ========== -->
    <section class="section directors-pro">
      <div class="container">
        <div class="section-title-center" v-reveal>
          <span class="classy-kicker">LEADERSHIP</span>
          <h2 class="classy-h2" v-text-reveal>
            <span class="reveal-text">The Visionaries</span>
          </h2>
          <div class="title-rule" v-in-view></div>
          <p class="section-sub">A small, hands-on team with deep roots in North India's real estate landscape.</p>
        </div>

        <div class="pro-grid">
          <article
            v-for="(person, idx) in directors.people"
            :key="person.name"
            class="pro-card"
            v-reveal="{ delay: idx * 150 }"
            v-in-view
            tabindex="0"
          >
            <div class="pro-tilt" @mousemove="onCardMove" @mouseleave="onCardLeave">
              <div class="pro-img-frame">
                <img :src="person.photo" :alt="person.name" loading="lazy" class="motion-img" />

                <span class="corner tl"></span>
                <span class="corner br"></span>
                <span class="spotlight"></span>

                <div class="slide-details-panel">
                  <div class="panel-content">
                    <span class="hover-role">{{ person.role }}</span>
                    <h3 class="hover-name">{{ person.name }}</h3>
                    <p class="hover-quote">"{{ person.quote }}"</p>
                    <p class="hover-bio">{{ person.bio || 'A seasoned professional dedicated to curating premium living spaces and ensuring legal transparency at every step.' }}</p>
                  </div>
                </div>
              </div>

              <div class="pro-details">
                <h3>{{ person.name }}</h3>
                <span class="pro-role">{{ person.role }}</span>
                <span class="pro-underline"></span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ========== PHILOSOPHY ========== -->
    <section class="section rich-story" v-parallax>
      <span class="story-mark" aria-hidden="true">VD</span>

      <div class="container">
        <div class="rich-story-grid">
          <div class="rich-left" v-reveal>
            <span class="classy-kicker">OUR PHILOSOPHY</span>
            <h2 class="classy-h2" v-text-reveal>
              <span class="reveal-text">Refined rural living,</span>
              <br />
              <span class="reveal-text">without compromise.</span>
            </h2>
            <div class="draw-line" v-in-view></div>
          </div>
          <div class="rich-right" v-reveal="{ delay: 200 }">
            <p class="rich-desc">
              VD Vanchers was founded on a singular belief: a property investment should deliver both emotional belonging and financial confidence.
            </p>
            <p class="rich-desc">
              Every project is shaped by location intelligence, legal transparency, and design-first thinking.
            </p>
            <div class="rich-stats" v-in-view>
              <div class="r-stat">
                <span class="r-num" v-count-up>700+</span>
                <span class="r-lbl">Families Settled</span>
              </div>
              <div class="r-stat">
                <span class="r-num" v-count-up>5</span>
                <span class="r-lbl">Prime Locations</span>
              </div>
              <div class="r-stat">
                <span class="r-num" v-count-up>15+</span>
                <span class="r-lbl">Years of Experience</span>
              </div>
            </div>
          </div>
        </div>

        <!-- three pillars -->
        <div class="pillars" v-in-view>
          <div class="pillar" v-reveal="{ delay: 0 }">
            <svg viewBox="0 0 24 24" class="pillar-icon" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path pathLength="1" d="M12 21s-6-5.4-6-10a6 6 0 1112 0c0 4.6-6 10-6 10z" />
              <circle pathLength="1" cx="12" cy="11" r="2.2" />
            </svg>
            <h3>Location intelligence</h3>
            <p>Land chosen for growth, access and long-term demand.</p>
          </div>
          <div class="pillar" v-reveal="{ delay: 150 }">
            <svg viewBox="0 0 24 24" class="pillar-icon" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path pathLength="1" d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
              <path pathLength="1" d="M9 12l2 2 4-4" />
            </svg>
            <h3>Legal transparency</h3>
            <p>Clear titles and paperwork, explained at every step.</p>
          </div>
          <div class="pillar" v-reveal="{ delay: 300 }">
            <svg viewBox="0 0 24 24" class="pillar-icon" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path pathLength="1" d="M3 21l3-1 12-12-2-2L4 18l-1 3z" />
              <path pathLength="1" d="M14 6l4 4" />
            </svg>
            <h3>Design-first thinking</h3>
            <p>Layouts planned around how families actually live.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== PULL QUOTE ========== -->
    <section class="quote-band" v-parallax>
      <span class="q-mark" aria-hidden="true">&ldquo;</span>
      <div class="container quote-inner">
        <blockquote class="quote" v-text-reveal>
          <span class="reveal-text">We don’t chase volume. We build trust, one family at a time.</span>
        </blockquote>
        <div class="quote-sign" v-reveal="{ delay: 500 }">
          <span class="sign-line"></span>
          <span class="sign-text">The VD Vanchers promise</span>
          <span class="sign-line"></span>
        </div>
      </div>
    </section>

    <!-- ========== GALLERY (parallax columns) ========== -->
    <section class="gallery" v-parallax>
      <div class="container">
        <div class="gallery-head">
          <div v-reveal>
            <span class="classy-kicker">THE LIFESTYLE</span>
            <h2 class="classy-h2 gallery-title" v-text-reveal>
              <span class="reveal-text">Spaces made for slower days.</span>
            </h2>
          </div>
          <NuxtLink to="/projects" class="btn-secondary gallery-link" v-reveal="{ delay: 200 }">
            <span>View all projects</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="gallery-grid">
          <div
            v-for="(g, i) in gallery"
            :key="i"
            class="g-col"
            :style="{ marginTop: g.offset }"
            v-reveal="{ delay: i * 150 }"
            v-in-view
          >
            <div class="g-item" :style="{ '--k': g.k, aspectRatio: g.ratio }">
              <img :src="g.src" :alt="g.alt" loading="lazy" />
              <span class="g-frame"></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== CTA ========== -->
    <section class="cta-rich">
      <span class="cta-blob b1" aria-hidden="true"></span>
      <span class="cta-blob b2" aria-hidden="true"></span>
      <span class="cta-ring r1" aria-hidden="true"></span>
      <span class="cta-ring r2" aria-hidden="true"></span>

      <div class="container text-center cta-inner" v-reveal>
        <span class="classy-kicker light-kicker">BEGIN YOUR JOURNEY</span>
        <h2 class="classy-h2 light-title" v-text-reveal>
          <span class="reveal-text">Ready to find your sanctuary?</span>
        </h2>
        <p class="cta-desc">Speak with a VD Vanchers advisor. No pressure. Just clarity.</p>
        <NuxtLink to="/contact" class="btn-gold" v-magnetic>Book a Private Consultation</NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* ============================================================
   BASE
   ============================================================ */
.about-page {
  --serif: "Cormorant Garamond", Georgia, serif;
  --sans: "Manrope", "Helvetica Neue", Arial, sans-serif;
  --gold: #c5a36a;
  --bronze: #8c6b55;
  --ink: #111111;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);

  background: #ffffff;
  color: var(--ink);
  overflow-x: hidden;
  font-family: var(--sans);
  position: relative;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--bronze), var(--gold));
  transform-origin: left;
  transform: scaleX(0);
  z-index: 100;
  pointer-events: none;
}

/* custom cursor */
.cursor {
  position: fixed;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  z-index: 120;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.cursor.on { opacity: 1; }

.cursor i {
  position: absolute;
  left: -17px;
  top: -17px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--gold);
  background: rgba(197,163,106,0);
  transition: transform 0.45s var(--ease), background 0.45s, border-color 0.45s;
}

.cursor.hover i { transform: scale(1.7); background: rgba(197,163,106,0.14); }

@media (hover: none), (pointer: coarse) { .cursor { display: none; } }

.classy-kicker {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--bronze);
  margin-bottom: 20px;
}

.light-kicker { color: var(--gold); }

.classy-h2 {
  font-family: var(--serif);
  font-size: clamp(36px, 4vw, 58px);
  line-height: 1.15;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin-bottom: 24px;
}

.light-title { color: #f4f1ea; }

/* word-mask reveal (spans are injected at runtime, so :deep is required) */
.about-page :deep(.word-mask) {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding: 0 0.08em 0.3em 0;
  margin-bottom: -0.3em;
}

.about-page :deep(.word) {
  display: inline-block;
  transform: translateY(115%);
  transition: transform 1.1s var(--ease);
  transition-delay: calc(var(--i, 0) * 45ms + 100ms);
}

.is-revealed :deep(.word) { transform: translateY(0); }

/* ============================================================
   HERO
   ============================================================ */
.classy-hero {
  position: relative;
  padding: 80px 0 140px;
  background: #faf8f4;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px);
  background-size: 80px 80px;
  -webkit-mask-image: radial-gradient(75% 80% at 60% 45%, #000 40%, transparent 100%);
  mask-image: radial-gradient(75% 80% at 60% 45%, #000 40%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}

.hero-glow {
  position: absolute;
  width: 760px;
  height: 760px;
  right: -140px;
  top: -160px;
  background: radial-gradient(circle, rgba(197,163,106,0.22), transparent 65%);
  pointer-events: none;
  animation: glowBreath 9s ease-in-out infinite;
}

@keyframes glowBreath {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}

.hero-watermark {
  position: absolute;
  right: 2%;
  bottom: -10%;
  font-family: var(--serif);
  font-weight: 700;
  font-size: clamp(240px, 36vw, 560px);
  line-height: 1;
  color: rgba(140,107,85,0.05);
  transform: translate3d(0, calc(var(--p, 0) * -70px), 0);
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.hero-wrapper {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.kicker-wrap { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
.kicker-wrap .classy-kicker { margin-bottom: 0; }

.kicker-wrap .line {
  width: 56px;
  height: 1px;
  background: linear-gradient(90deg, var(--bronze), var(--gold));
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 1.2s var(--ease) 0.2s;
}

.kicker-wrap.is-revealed .line { transform: scaleX(1); }

.hero-title {
  font-family: var(--serif);
  font-size: clamp(40px, 5vw, 74px);
  line-height: 1.15;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 28px;
}

.highlight-text :deep(.word) {
  font-style: italic;
  font-weight: 700;
  color: transparent;
  background-image: linear-gradient(110deg, #4d2f22 0%, #7c4d29 25%, #b8863b 50%, #7c4d29 75%, #4d2f22 100%);
  background-size: 260% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: goldShimmer 7s linear infinite;
  filter: drop-shadow(0 2px 8px rgba(140,88,48,0.25));
}

@keyframes goldShimmer {
  0% { background-position: 120% 0; }
  100% { background-position: -140% 0; }
}

.hero-desc { font-size: 16.5px; line-height: 1.75; color: #5a5651; margin-bottom: 36px; max-width: 520px; }

.hero-actions { display: flex; align-items: center; gap: 28px; }

.btn-primary {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--ink);
  color: #ffffff;
  padding: 17px 38px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  border-radius: 2px;
  transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease), border-color 0.4s;
  border: 1px solid var(--ink);
  isolation: isolate;
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--bronze);
  transform: translateY(101%);
  transition: transform 0.5s var(--ease);
  z-index: -1;
}

.btn-primary:hover { border-color: var(--bronze); box-shadow: 0 14px 34px rgba(140, 107, 85, 0.28); }
.btn-primary:hover::before { transform: translateY(0); }

.btn-secondary {
  position: relative;
  color: var(--ink);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 4px;
  transition: gap 0.3s ease, color 0.3s;
}

.btn-secondary::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0.35);
  transform-origin: left;
  transition: transform 0.5s var(--ease);
}

.btn-secondary:hover { gap: 14px; color: var(--bronze); }
.btn-secondary:hover::after { transform: scaleX(1); }

/* ============================================================
   3D CUBE
   ============================================================ */
.hero-visual {
  --s: 480px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(var(--s) + 120px);
}

.cube-stage {
  position: relative;
  width: var(--s);
  height: var(--s);
  animation: dropFromLeft 2.2s cubic-bezier(0.22, 0.9, 0.3, 1) 0.3s both;
}

.cube-stage::before {
  content: '';
  position: absolute;
  inset: 0;
  transform: translate(22px, 22px);
  border: 1px solid rgba(140,107,85,0.4);
  border-radius: 8px;
  z-index: -1;
}

@keyframes dropFromLeft {
  0%   { transform: translate3d(-80vw, -60px, 0) rotateZ(-20deg); opacity: 0; }
  15%  { opacity: 1; }
  62%  { transform: translate3d(15px, 5px, 0) rotateZ(2deg); }
  100% { transform: translate3d(0, 0, 0) rotateZ(0deg); opacity: 1; }
}

.scene {
  --tx: 0;
  --ty: 0;
  width: 100%;
  height: 100%;
  position: relative;
  perspective: 1600px;
  transform-style: preserve-3d;
  transform: rotateX(calc(var(--ty) * -7deg)) rotateY(calc(var(--tx) * 9deg));
  transition: transform 0.6s ease-out;
}

.cube {
  --ry: -270deg;
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transform: translateZ(calc(var(--s) / -2)) rotateY(var(--ry));
  transition: transform 1.6s var(--ease);
}

.cube-face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 8px;
  backface-visibility: hidden;
  box-shadow: 0 30px 60px rgba(26,26,26,0.18), inset 0 0 0 1px rgba(255,255,255,0.25);
}

.cube-face::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(255,255,255,0.14), transparent 40%, rgba(26,26,26,0.14));
  pointer-events: none;
}

.cube-face img { width: 100%; height: 100%; object-fit: cover; display: block; }

.face-1 { transform: rotateY(0deg)   translateZ(calc(var(--s) / 2)); }
.face-2 { transform: rotateY(90deg)  translateZ(calc(var(--s) / 2)); }
.face-3 { transform: rotateY(180deg) translateZ(calc(var(--s) / 2)); }
.face-4 { transform: rotateY(270deg) translateZ(calc(var(--s) / 2)); }

.cube-shadow {
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: -40px;
  height: 32px;
  background: radial-gradient(ellipse at center, rgba(26,26,26,0.3) 0%, transparent 70%);
  filter: blur(6px);
  pointer-events: none;
}

.seal {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 110px;
  height: 110px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #faf8f4;
  box-shadow: 0 12px 30px rgba(26,26,26,0.12);
  z-index: 6;
}

.seal-ring { position: absolute; inset: 0; width: 100%; height: 100%; animation: spin 22s linear infinite; }
.seal-text { font-family: var(--sans); font-size: 8.4px; font-weight: 700; letter-spacing: 0.12em; fill: var(--bronze); }
.seal-mark { font-family: var(--serif); font-size: 28px; font-weight: 700; color: var(--ink); line-height: 1; }

@keyframes spin { to { transform: rotate(360deg); } }

.floating-card {
  position: absolute;
  bottom: 60px;
  left: -20px;
  background: rgba(255,255,255,0.88);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  padding: 20px 28px;
  box-shadow: 0 24px 50px rgba(26,26,26,0.16);
  display: flex;
  align-items: center;
  gap: 16px;
  border-left: 3px solid var(--bronze);
  z-index: 5;
  animation: floatBadge 4s ease-in-out infinite;
}

@keyframes floatBadge {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -8px; }
}

.card-inner { display: flex; align-items: center; gap: 16px; }
.float-num { font-family: var(--serif); font-size: 44px; font-weight: 700; color: var(--ink); line-height: 0.9; }
.float-txt { font-size: 11px; font-weight: 700; color: #666; text-transform: uppercase; letter-spacing: 0.1em; line-height: 1.4; }

.face-nav {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 6;
}

.face-dot {
  width: 22px;
  height: 3px;
  padding: 0;
  border: 0;
  background: rgba(26,26,26,0.18);
  border-radius: 2px;
  cursor: pointer;
  transition: width 0.5s var(--ease), background 0.3s;
}

.face-dot:hover { background: rgba(140,107,85,0.6); }
.face-dot.active { width: 40px; background: var(--bronze); }
.face-dot:focus-visible { outline: 2px solid var(--bronze); outline-offset: 4px; }

.face-count {
  margin-left: 10px;
  font-family: var(--serif);
  font-size: 14px;
  font-weight: 600;
  color: var(--bronze);
  letter-spacing: 0.06em;
}

.marquee {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px 0;
  border-top: 1px solid rgba(140,107,85,0.18);
  background: rgba(250,248,244,0.7);
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  z-index: 2;
}

.marquee-track { display: flex; width: max-content; animation: marquee 38s linear infinite; }
.marquee-group { display: flex; align-items: center; }

.marquee-item {
  display: inline-flex;
  align-items: center;
  font-family: var(--serif);
  font-size: 24px;
  font-style: italic;
  font-weight: 500;
  color: rgba(26,26,26,0.62);
  white-space: nowrap;
}

.diamond {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 0 32px;
  background: var(--gold);
  transform: rotate(45deg);
}

@keyframes marquee { to { transform: translateX(-50%); } }

/* ============================================================
   PRESENCE
   ============================================================ */
.presence {
  position: relative;
  padding: 120px 0;
  background: #111111;
  color: #ffffff;
  overflow: hidden;
}

.presence::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60% 50% at 75% 45%, rgba(197,163,106,0.1), transparent 70%),
    linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
  background-size: auto, 64px 64px, 64px 64px;
  background-position: 0 0, 0 calc(var(--p, 0) * 40px), 0 calc(var(--p, 0) * 40px);
  pointer-events: none;
}

.dust { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }

.dust-dot {
  position: absolute;
  border-radius: 50%;
  background: var(--gold);
  opacity: 0;
  animation-name: dustFloat;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes dustFloat {
  0%   { transform: translateY(30px); opacity: 0; }
  30%  { opacity: 0.7; }
  100% { transform: translateY(-80px); opacity: 0; }
}

.presence-grid {
  position: relative;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 56px;
  align-items: center;
}

.presence-title {
  font-family: var(--serif);
  font-size: clamp(36px, 4vw, 58px);
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 24px;
  color: #f4f1ea;
}

.gold-text { color: var(--gold); font-style: italic; }

.presence-desc { font-size: 16px; line-height: 1.8; color: #a0a0a0; margin-bottom: 40px; max-width: 460px; }

.loc-list { list-style: none; padding: 0; margin: 0; border-top: 1px solid rgba(255,255,255,0.1); }

.loc-row {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px 4px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: padding 0.4s var(--ease), background 0.4s;
}

.loc-row::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40%;
  left: -50%;
  background: linear-gradient(100deg, transparent, rgba(197,163,106,0.16), transparent);
  transform: skewX(-18deg);
  pointer-events: none;
}

.loc-row:hover::after { left: 120%; transition: left 0.9s var(--ease); }

.loc-row:hover,
.loc-row.active,
.loc-row:focus-visible {
  padding-left: 16px;
  background: linear-gradient(90deg, rgba(197,163,106,0.1), transparent);
  outline: none;
}

.loc-row:focus-visible { box-shadow: inset 2px 0 0 var(--gold); }

.loc-pin {
  position: relative;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 0 4px rgba(197,163,106,0.18);
  flex-shrink: 0;
}

.loc-pin::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1px solid var(--gold);
  opacity: 0;
}

.loc-row.active .loc-pin::after { animation: pinPing 1.5s ease-out infinite; }

@keyframes pinPing {
  0% { transform: scale(1); opacity: 0.9; }
  100% { transform: scale(3); opacity: 0; }
}

.loc-text { display: flex; flex-direction: column; gap: 3px; flex: 1; }
.loc-text strong { font-family: var(--serif); font-size: 26px; font-weight: 600; color: #f4f1ea; line-height: 1.1; }
.loc-text em { font-style: normal; font-size: 13px; color: #8f8f8f; }

.loc-tag {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--gold);
  border: 1px solid rgba(197,163,106,0.35);
  padding: 5px 10px;
  border-radius: 2px;
  white-space: nowrap;
}

/* stage + toggle */
.presence-stage { display: flex; flex-direction: column; align-items: stretch; gap: 22px; width: 100%; max-width: 660px; margin-left: auto; }

.view-toggle {
  position: relative;
  align-self: flex-end;
  display: flex;
  padding: 4px;
  border: 1px solid rgba(197,163,106,0.3);
  border-radius: 40px;
  background: rgba(255,255,255,0.03);
}

.view-toggle button {
  position: relative;
  z-index: 1;
  min-width: 118px;
  padding: 9px 20px;
  border: 0;
  background: transparent;
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #a9a49a;
  border-radius: 40px;
  cursor: pointer;
  transition: color 0.4s;
}

.view-toggle button.on { color: #111; }
.view-toggle button:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

.vt-pill {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc(50% - 4px);
  background: var(--gold);
  border-radius: 40px;
  transition: transform 0.6s var(--ease);
}

.vt-pill.map { transform: translateX(100%); }

.stage-body { position: relative; min-height: 560px; }

.view-enter-active, .view-leave-active { transition: opacity 0.35s ease, transform 0.6s var(--ease); }
.view-enter-from { opacity: 0; transform: translateY(18px); }
.view-leave-to { opacity: 0; transform: translateY(-10px); }

/* destination panels */
.dest { display: flex; gap: 12px; height: 540px; }

.dest-panel {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  background: #1c1914;
  isolation: isolate;
  outline: none;
  transition: flex 0.9s var(--ease);
}

.dest-panel.active { flex: 3.4; }

.dest-panel::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 8px;
  border: 1px solid rgba(197,163,106,0.22);
  pointer-events: none;
  z-index: 3;
  transition: border-color 0.5s;
}

.dest-panel.active::after,
.dest-panel:focus-visible::after { border-color: rgba(197,163,106,0.75); }

.dest-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.14);
  filter: grayscale(0.7) brightness(0.65);
  transition: transform 1.6s var(--ease), filter 0.9s;
  z-index: -2;
}

.dest-panel.active .dest-bg { transform: scale(1); filter: none; }

.dest-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,9,7,0.9), rgba(10,9,7,0.12) 58%, rgba(10,9,7,0.32));
  z-index: -1;
}

.dest-vname {
  position: absolute;
  left: 50%;
  bottom: 28px;
  writing-mode: vertical-rl;
  transform: translateX(-50%) rotate(180deg);
  font-family: var(--serif);
  font-size: 30px;
  font-style: italic;
  font-weight: 600;
  color: #f4f1ea;
  white-space: nowrap;
  transition: opacity 0.4s;
}

.dest-panel.active .dest-vname { opacity: 0; }

.dest-body {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 34px;
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.3s, transform 0.5s var(--ease);
}

.dest-panel.active .dest-body { opacity: 1; transform: none; transition: opacity 0.6s 0.35s, transform 0.9s var(--ease) 0.3s; }

.dest-note { display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); margin-bottom: 10px; }
.dest-name { font-family: var(--serif); font-size: 52px; font-weight: 600; line-height: 1; color: #fff; margin: 0 0 14px; }
.dest-blurb { font-size: 14.5px; line-height: 1.7; color: #d4cfc4; max-width: 340px; margin: 0 0 20px; }

.dest-tag {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--gold);
  border: 1px solid rgba(197,163,106,0.45);
  padding: 5px 10px;
  border-radius: 2px;
}

/* map */
.map-frame { position: relative; width: 100%; }

.radar {
  position: absolute;
  width: 78%;
  aspect-ratio: 1;
  left: 50%;
  top: 44%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: conic-gradient(from 0deg, rgba(197,163,106,0) 0deg, rgba(197,163,106,0.16) 50deg, rgba(197,163,106,0) 52deg);
  -webkit-mask-image: radial-gradient(circle, #000 25%, transparent 70%);
  mask-image: radial-gradient(circle, #000 25%, transparent 70%);
  opacity: 0;
  transition: opacity 2s ease 1s;
  animation: spinR 9s linear infinite;
  pointer-events: none;
}

.in-view .radar { opacity: 1; }

@keyframes spinR { to { rotate: 360deg; } }

.india-svg { position: relative; width: 100%; height: auto; display: block; overflow: visible; }
.map-glow { transform-box: fill-box; transform-origin: center; animation: glowBreath 8s ease-in-out infinite; }
.land-dots { opacity: 0; transition: opacity 2s ease 0.8s; }
.in-view .land-dots { opacity: 0.38; }

.india-outline {
  fill: rgba(197,163,106,0.03);
  stroke: var(--gold);
  stroke-opacity: 0.55;
  stroke-width: 1.2;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 3.2s cubic-bezier(0.5, 0, 0.2, 1);
}

.in-view .india-outline { stroke-dashoffset: 0; }

.route {
  fill: none;
  stroke: var(--gold);
  stroke-width: 1.2;
  stroke-opacity: 0.7;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 1.6s ease 2.2s;
}

.in-view .route { stroke-dashoffset: 0; }
.traveler { fill: #fff7e0; opacity: 0; filter: drop-shadow(0 0 4px #c5a36a); transition: opacity 0.6s ease 3.2s; }
.in-view .traveler { opacity: 1; }

.leader {
  stroke: var(--gold);
  stroke-opacity: 0;
  stroke-width: 1;
  stroke-dasharray: 3 3;
  transition: stroke-opacity 0.8s ease, stroke-width 0.3s;
}
.in-view .leader { stroke-opacity: 0.5; animation: dashFlow 1.4s linear infinite; }
.in-view .leader.on { stroke-opacity: 1; stroke-width: 1.4; }
.in-view .leader.dim { stroke-opacity: 0.18; }

@keyframes dashFlow { to { stroke-dashoffset: -12; } }

.loc { opacity: 0; transition: opacity 0.9s ease; cursor: pointer; }
.in-view .loc { opacity: 1; }
.in-view .loc.dim { opacity: 0.45; }

.loc .core { fill: var(--gold); stroke: #111; stroke-width: 1.5; }
.loc .halo { fill: rgba(197,163,106,0.16); }

.loc .ring {
  fill: none;
  stroke: var(--gold);
  stroke-width: 1.2;
  transform-box: fill-box;
  transform-origin: center;
  animation: ringPulse 2.6s ease-out infinite;
}

@keyframes ringPulse {
  0%   { transform: scale(1);   opacity: 0.9; }
  100% { transform: scale(5.5); opacity: 0; }
}

.pill {
  fill: rgba(17,17,17,0.88);
  stroke: rgba(197,163,106,0.35);
  stroke-width: 1;
  transition: stroke 0.3s, fill 0.3s;
}

.loc.on .pill { stroke: var(--gold); fill: #1a1712; }

.pill-name { font-size: 12.5px; font-weight: 700; fill: #f4f1ea; letter-spacing: 0.02em; }
.pill-note { font-size: 9.5px; fill: #a8a08f; }

.map-legend {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 8px;
  font-size: 12px;
  color: #8f8f8f;
  letter-spacing: 0.04em;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 0 4px rgba(197,163,106,0.18);
}

/* ============================================================
   DIRECTORS
   ============================================================ */
.directors-pro { padding: 120px 0; background: #faf8f4; }

.section-title-center { text-align: center; margin-bottom: 64px; }

.title-rule {
  width: 72px;
  height: 1px;
  margin: 4px auto 0;
  background: linear-gradient(90deg, transparent, var(--bronze), transparent);
  transform: scaleX(0);
  transition: transform 1.4s var(--ease) 0.3s;
}

.title-rule.in-view { transform: scaleX(1); }

.section-sub { font-size: 15px; color: #777; max-width: 500px; margin: 20px auto 0; line-height: 1.7; }

.pro-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
  max-width: 920px;
  margin: 0 auto;
}

.pro-card { display: flex; flex-direction: column; perspective: 1100px; outline: none; }

.pro-tilt {
  --rx: 0deg;
  --ry: 0deg;
  --mx: 50%;
  --my: 50%;
  transform: rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.5s var(--ease);
  transform-style: preserve-3d;
}

.pro-img-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 4/5;
  overflow: hidden;
  background: #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 20px 50px rgba(26,26,26,0.12);
  clip-path: inset(0 0 100% 0);
  transition: clip-path 1.4s var(--ease), box-shadow 0.5s;
}

.pro-card.in-view .pro-img-frame { clip-path: inset(0 0 0 0); }
.pro-card:hover .pro-img-frame { box-shadow: 0 34px 70px rgba(26,26,26,0.22); }

.motion-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  animation: kenBurns 20s ease-in-out infinite alternate;
  transition: transform 0.6s var(--ease);
}

@keyframes kenBurns {
  0% { transform: scale(1); }
  100% { transform: scale(1.08); }
}

.corner {
  position: absolute;
  width: 0;
  height: 0;
  border: 0 solid var(--gold);
  z-index: 3;
  opacity: 0;
  pointer-events: none;
  transition: width 0.6s var(--ease), height 0.6s var(--ease), opacity 0.3s;
}

.corner.tl { top: 16px; left: 16px; border-top-width: 1px; border-left-width: 1px; }
.corner.br { bottom: 16px; right: 16px; border-bottom-width: 1px; border-right-width: 1px; }

.pro-card:hover .corner,
.pro-card:focus-within .corner { width: 44px; height: 44px; opacity: 1; }

.spotlight {
  position: absolute;
  inset: 0;
  background: radial-gradient(260px circle at var(--mx) var(--my), rgba(255,243,215,0.26), transparent 65%);
  mix-blend-mode: soft-light;
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
  z-index: 1;
}

.pro-card:hover .spotlight { opacity: 1; }

.slide-details-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 62%;
  background: linear-gradient(to top, rgba(17,17,17,0.96) 0%, rgba(17,17,17,0.86) 70%, transparent 100%);
  padding: 32px 26px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transform: translateY(100%);
  transition: transform 0.6s var(--ease);
  z-index: 2;
}

.panel-content {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease 0.2s, transform 0.5s var(--ease) 0.2s;
}

.hover-role { display: block; font-size: 10px; color: var(--gold); text-transform: uppercase; letter-spacing: 0.15em; font-weight: 700; margin-bottom: 8px; }
.hover-name { font-family: var(--serif); font-size: 30px; font-weight: 600; color: #ffffff; margin-bottom: 12px; line-height: 1.05; }
.hover-quote { font-family: var(--serif); font-size: 17px; color: var(--gold); font-style: italic; line-height: 1.45; margin-bottom: 12px; border-left: 2px solid var(--gold); padding-left: 12px; }
.hover-bio { font-size: 13px; color: #cccccc; line-height: 1.65; }

.pro-card:hover .slide-details-panel,
.pro-card:focus-within .slide-details-panel { transform: translateY(0); }

.pro-card:hover .panel-content,
.pro-card:focus-within .panel-content { opacity: 1; transform: translateY(0); }

.pro-card:hover .motion-img { animation-play-state: paused; transform: scale(1.1); }

.pro-details { position: relative; padding-top: 22px; text-align: left; }
.pro-details h3 { font-family: var(--serif); font-size: 28px; font-weight: 600; color: var(--ink); margin: 0 0 6px 0; line-height: 1.1; transition: color 0.3s; }
.pro-card:hover .pro-details h3 { color: var(--bronze); }
.pro-role { display: block; font-size: 11px; color: var(--bronze); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; }
.pro-underline { display: block; height: 1px; width: 100%; margin-top: 16px; background: linear-gradient(90deg, var(--gold), transparent); transform: scaleX(0.12); transform-origin: left; transition: transform 0.8s var(--ease); }
.pro-card:hover .pro-underline { transform: scaleX(1); }

/* ============================================================
   PHILOSOPHY
   ============================================================ */
.rich-story { position: relative; padding: 120px 0; background: #ffffff; overflow: hidden; }

.story-mark {
  position: absolute;
  right: -3%;
  top: 38%;
  font-family: var(--serif);
  font-weight: 700;
  font-size: clamp(260px, 34vw, 520px);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(140,107,85,0.16);
  transform: translate3d(calc(var(--p, 0) * -140px), -50%, 0);
  pointer-events: none;
  user-select: none;
}

.rich-story .container { position: relative; z-index: 1; }

.rich-story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }

.draw-line {
  width: 120px;
  height: 1px;
  margin-top: 8px;
  background: linear-gradient(90deg, var(--bronze), var(--gold));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.6s var(--ease) 0.4s;
}

.draw-line.in-view { transform: scaleX(1); }

.rich-desc { font-size: 16.5px; line-height: 1.85; color: #555; margin-bottom: 24px; }

.rich-stats { position: relative; display: flex; gap: 56px; margin-top: 48px; padding-top: 32px; }

.rich-stats::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #e5e5e5;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.6s var(--ease);
}

.rich-stats.in-view::before { transform: scaleX(1); }

.r-num {
  display: block;
  font-family: var(--serif);
  font-size: 54px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1;
  margin-bottom: 10px;
  font-variant-numeric: tabular-nums;
}

.r-lbl { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.08em; }

.pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 90px; }

.pillar {
  position: relative;
  padding: 36px 32px 34px;
  border: 1px solid #ece7de;
  background: #fdfcfa;
  border-radius: 6px;
  overflow: hidden;
}

.pillar::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--bronze), var(--gold));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.7s var(--ease);
}

.pillar:hover::before { transform: scaleX(1); }

.pillar-icon { width: 44px; height: 44px; color: var(--bronze); margin-bottom: 22px; }

.pillar-icon :is(path, circle) {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 1.8s ease 0.3s;
}

.pillars.in-view .pillar-icon :is(path, circle) { stroke-dashoffset: 0; }

.pillar h3 { font-family: var(--serif); font-size: 26px; font-weight: 600; margin: 0 0 8px; color: var(--ink); line-height: 1.1; }
.pillar p { margin: 0; font-size: 14.5px; line-height: 1.7; color: #666; }

/* ============================================================
   PULL QUOTE
   ============================================================ */
.quote-band {
  position: relative;
  padding: 150px 0;
  background:
    radial-gradient(50% 70% at 50% 50%, rgba(197,163,106,0.13), transparent 70%),
    #faf8f4;
  border-top: 1px solid rgba(140,107,85,0.15);
  border-bottom: 1px solid rgba(140,107,85,0.15);
  overflow: hidden;
  text-align: center;
}

.q-mark {
  position: absolute;
  left: 50%;
  top: 4%;
  font-family: var(--serif);
  font-size: clamp(280px, 34vw, 520px);
  line-height: 1;
  font-weight: 700;
  color: rgba(140,107,85,0.09);
  transform: translate3d(-50%, calc(var(--p, 0) * 80px), 0);
  pointer-events: none;
  user-select: none;
}

.quote-inner { position: relative; z-index: 1; }

.quote {
  font-family: var(--serif);
  font-size: clamp(34px, 5.2vw, 78px);
  line-height: 1.12;
  font-style: italic;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--ink);
  max-width: 1000px;
  margin: 0 auto;
}

.quote-sign { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 48px; }
.sign-line { width: 48px; height: 1px; background: linear-gradient(90deg, var(--bronze), var(--gold)); }
.sign-text { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--bronze); }

/* ============================================================
   GALLERY
   ============================================================ */
.gallery { padding: 120px 0 140px; background: #ffffff; overflow: hidden; }

.gallery-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
  margin-bottom: 64px;
}

.gallery-title { margin-bottom: 0; max-width: 560px; }
.gallery-link { flex-shrink: 0; margin-bottom: 10px; }

.gallery-grid { display: grid; grid-template-columns: 1fr 1.15fr 1fr; gap: 28px; align-items: start; }

.g-item {
  --k: -40px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 24px 60px rgba(26,26,26,0.14);
  transform: translate3d(0, calc(var(--p, 0) * var(--k)), 0);
  will-change: transform;
}

.g-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.2);
  transition: transform 2s var(--ease);
}

.g-col.in-view .g-item img { transform: scale(1); }
.g-col.in-view .g-item:hover img { transform: scale(1.06); transition-duration: 1.2s; }

.g-frame {
  position: absolute;
  inset: 14px;
  border: 1px solid rgba(255,255,255,0.55);
  border-radius: 4px;
  opacity: 0;
  transform: scale(0.96);
  transition: opacity 0.5s, transform 0.8s var(--ease);
  pointer-events: none;
}

.g-item:hover .g-frame { opacity: 1; transform: scale(1); }

/* ============================================================
   CTA
   ============================================================ */
.cta-rich { position: relative; padding: 130px 0; background: #111111; text-align: center; overflow: hidden; }
.cta-inner { position: relative; z-index: 2; }
.text-center { text-align: center; }
.cta-desc { color: #a0a0a0; font-size: 16px; margin: 24px auto 44px; max-width: 500px; }

.cta-blob {
  position: absolute;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(197,163,106,0.28), transparent 65%);
  filter: blur(40px);
  pointer-events: none;
}

.cta-blob.b1 { left: -140px; top: -180px; animation: drift 14s ease-in-out infinite alternate; }
.cta-blob.b2 { right: -160px; bottom: -220px; animation: drift 17s ease-in-out infinite alternate-reverse; }

@keyframes drift {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(90px, 50px) scale(1.2); }
}

.cta-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 360px;
  height: 360px;
  margin: -180px 0 0 -180px;
  border-radius: 50%;
  border: 1px solid rgba(197,163,106,0.35);
  opacity: 0;
  pointer-events: none;
  animation: ringOut 7s ease-out infinite;
}

.cta-ring.r2 { animation-delay: 3.5s; }

@keyframes ringOut {
  0%   { transform: scale(0.5); opacity: 0.6; }
  100% { transform: scale(3.2); opacity: 0; }
}

.btn-gold {
  position: relative;
  overflow: hidden;
  display: inline-block;
  background: var(--gold);
  color: #111;
  padding: 19px 52px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-decoration: none;
  border-radius: 2px;
  transition: transform 0.35s var(--ease), background 0.4s, box-shadow 0.4s var(--ease);
}

.btn-gold::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40%;
  left: -60%;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent);
  transform: skewX(-20deg);
  animation: btnShine 4.5s ease-in-out infinite;
}

@keyframes btnShine {
  0%, 55% { left: -60%; }
  100% { left: 140%; }
}

.btn-gold:hover { background: #d4af6a; box-shadow: 0 14px 40px rgba(197,163,106,0.38); }

/* ============================================================
   REDUCED MOTION
   ============================================================ */
@media (prefers-reduced-motion: reduce) {
  .cube-stage { animation: none; }
  .cube { --ry: 0deg; transition: none; }
  .scene { transition: none; }
  .floating-card, .motion-img, .loc .ring, .seal-ring, .marquee-track,
  .hero-glow, .map-glow, .radar, .dust-dot, .cta-blob, .cta-ring, .btn-gold::after,
  .highlight-text :deep(.word), .in-view .leader, .loc-row.active .loc-pin::after { animation: none; }
  .highlight-text :deep(.word) { color: var(--bronze); background: none; filter: none; }
  .india-outline, .route { transition: none; stroke-dashoffset: 0; }
  .land-dots, .loc, .leader, .traveler { transition: none; }
  .traveler { display: none; }
  .pro-img-frame { clip-path: none; transition: none; }
  .pillar-icon :is(path, circle) { transition: none; stroke-dashoffset: 0; }
  .draw-line, .title-rule, .rich-stats::before { transition: none; transform: scaleX(1); }
  .about-page :deep(.word) { transition: none; transform: none; }
  .dest-panel, .dest-bg, .dest-body, .vt-pill, .g-item img { transition: none; }
  .g-item img { transform: none; }
  .view-enter-active, .view-leave-active { transition: none; }
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 1024px) {
  .hero-wrapper { grid-template-columns: 1fr; gap: 40px; text-align: center; }
  .hero-actions { justify-content: center; }
  .hero-desc { margin-left: auto; margin-right: auto; }
  .kicker-wrap { justify-content: center; }
  .hero-visual { --s: 360px; order: -1; }
  .presence-grid, .rich-story-grid { grid-template-columns: 1fr; gap: 50px; }
  .presence-stage { margin: 0 auto; }
  .presence-desc { max-width: none; }
  .pillars { grid-template-columns: 1fr; margin-top: 64px; }
  .gallery-grid { grid-template-columns: 1fr 1fr; }
  .gallery-grid .g-col:nth-child(3) { display: none; }
}

@media (max-width: 768px) {
  .classy-hero { padding: 40px 0 110px; }
  .hero-title { font-size: 36px; }
  .hero-actions { flex-direction: column; align-items: center; }
  .pro-grid { grid-template-columns: 1fr; }
  .hero-visual { --s: 280px; }
  .cube-stage::before { transform: translate(12px, 12px); }
  .floating-card { left: 0; bottom: 60px; padding: 14px 18px; }
  .float-num { font-size: 34px; }
  .seal { width: 84px; height: 84px; right: 0; top: 0; }
  .seal-mark { font-size: 22px; }
  .marquee-item { font-size: 20px; }
  .diamond { margin: 0 24px; }

  .presence, .rich-story, .directors-pro, .cta-rich, .gallery { padding: 80px 0; }
  .quote-band { padding: 100px 0; }
  .loc-tag { display: none; }
  .pill-note { font-size: 10.5px; }
  .rich-stats { gap: 28px; flex-wrap: wrap; }
  .r-num { font-size: 42px; }

  .view-toggle { align-self: center; }
  .stage-body { min-height: 0; }
  .dest { flex-direction: column; height: auto; }
  .dest-panel { flex: none; height: 84px; transition: height 0.8s var(--ease); }
  .dest-panel.active { flex: none; height: 380px; }
  .dest-vname { writing-mode: horizontal-tb; transform: translateY(-50%); left: 24px; top: 50%; bottom: auto; font-size: 26px; }
  .dest-body { padding: 24px; }
  .dest-name { font-size: 40px; }

  .gallery-head { flex-direction: column; align-items: flex-start; gap: 20px; margin-bottom: 40px; }
  .gallery-grid { grid-template-columns: 1fr; gap: 20px; }
  .gallery-grid .g-col { margin-top: 0 !important; }
  .gallery-grid .g-col:nth-child(3) { display: block; }
  .g-item { transform: none; }
}
</style>