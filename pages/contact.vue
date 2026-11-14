<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

useHead({
  title: 'Contact Us | VD Vanchers — Premium Farmhouse Living',
  meta: [{ name: 'description', content: 'Connect with VD Vanchers for private consultations, property inquiries, and secure registrations.' }],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Manrope:wght@400;500;600;700;800&display=swap',
    },
  ],
})

/* ---------- Active Info Tab (Office vs Banking) ---------- */
const activeTab = ref<'office' | 'banking'>('office')

/* ---------- Banking details (with copy buttons) ---------- */
const bankRows = [
  { key: 'name', label: 'Account Name', value: 'Sakman Infra Pvt Ltd', mono: false },
  { key: 'acc', label: 'Account No', value: '50200083329282', mono: true },
  { key: 'ifsc', label: 'IFSC Code', value: 'HDFC0001603', mono: true },
  { key: 'bank', label: 'Bank Name', value: 'HDFC Bank', mono: false },
]

const copiedKey = ref<string | null>(null)
let copyTimer: ReturnType<typeof setTimeout> | undefined

const copyValue = async (key: string, value: string) => {
  try {
    await navigator.clipboard.writeText(value)
    copiedKey.value = key
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => (copiedKey.value = null), 1800)
  } catch {
    copiedKey.value = null
  }
}

/* ---------- Form State ---------- */
const interests = ['Farmhouse', 'Land investment', 'Site visit', 'Registration']

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  interests: [] as string[],
})
const submitted = ref(false)
const sending = ref(false)

const toggleInterest = (item: string) => {
  const list = form.value.interests
  const i = list.indexOf(item)
  if (i === -1) list.push(item)
  else list.splice(i, 1)
}

let sendTimer: ReturnType<typeof setTimeout> | undefined

const handleSubmit = () => {
  if (sending.value) return
  sending.value = true
  // TODO: replace this short delay with your real API call
  sendTimer = setTimeout(() => {
    sending.value = false
    submitted.value = true
  }, 1100)
}

const resetForm = () => {
  form.value = { firstName: '', lastName: '', email: '', message: '', interests: [] }
  submitted.value = false
}

/* ---------- Card spotlight (follows cursor) ---------- */
const onCardMove = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px')
  el.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px')
}

onUnmounted(() => {
  if (copyTimer) clearTimeout(copyTimer)
  if (sendTimer) clearTimeout(sendTimer)
})

/* ---------- Directives ---------- */
const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isFinePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

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

const vMagnetic = {
  mounted(el: any) {
    if (prefersReduced() || !isFinePointer()) return
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`
    }
    const leave = () => { el.style.transform = '' }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    el._magCleanup = () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  },
  unmounted(el: any) { el._magCleanup?.() }
}
</script>

<template>
  <main class="contact-page">

    <!-- ========== EDITORIAL SPLIT SCREEN ========== -->
    <section class="contact-hero-section">
      <div class="bg-grid"></div>
      <div class="hero-glow"></div>
      <span class="hero-watermark" aria-hidden="true">VD</span>

      <div class="container contact-split-grid">

        <!-- LEFT: editorial info -->
        <div class="left-editorial" v-reveal>
          <div class="kicker-wrap">
            <div class="line"></div>
            <span class="classy-kicker">GET IN TOUCH</span>
          </div>

          <h1 class="editorial-title" v-text-reveal>
            <span class="reveal-text">Let us curate</span><br />
            <span class="reveal-text highlight-text">your conversation.</span>
          </h1>

          <p class="editorial-desc">
            Connect directly with our senior advisors for private viewings, land allotments, or corporate registrations.
          </p>

          <!-- Info switcher -->
          <div class="info-switcher">
            <div class="switcher-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                class="switch-tab"
                :class="{ active: activeTab === 'office' }"
                :aria-selected="activeTab === 'office'"
                @click="activeTab = 'office'"
              >Headquarters</button>
              <button
                type="button"
                role="tab"
                class="switch-tab"
                :class="{ active: activeTab === 'banking' }"
                :aria-selected="activeTab === 'banking'"
                @click="activeTab = 'banking'"
              >Online Registration &amp; Banking</button>
            </div>

            <div class="switcher-content">
              <Transition name="pane" mode="out-in">
                <!-- Office -->
                <div v-if="activeTab === 'office'" key="office" class="tab-pane">
                  <span class="pane-subtitle">Corporate Office</span>
                  <p class="pane-text">
                    A-33, 5th Floor, Sector-136,<br />
                    Noida - 201304
                  </p>
                  <a href="tel:+919289245099" class="call-line">
                    <span class="call-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
                      </svg>
                    </span>
                    <span class="call-text">
                      <span class="action-label">Direct Line</span>
                      <span class="action-value">+91-9289245099</span>
                    </span>
                  </a>
                </div>

                <!-- Banking -->
                <div v-else key="banking" class="tab-pane">
                  <span class="pane-subtitle">Sakman Infra Pvt Ltd</span>
                  <ul class="clean-bank-list">
                    <li v-for="row in bankRows" :key="row.key">
                      <span class="bank-label">{{ row.label }}</span>
                      <strong :class="{ mono: row.mono }">{{ row.value }}</strong>
                      <button
                        type="button"
                        class="copy-btn"
                        :class="{ copied: copiedKey === row.key }"
                        :aria-label="'Copy ' + row.label"
                        @click="copyValue(row.key, row.value)"
                      >
                        <svg v-if="copiedKey !== row.key" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 012-2h9" />
                        </svg>
                        <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M5 12l5 5 9-10" />
                        </svg>
                        <span class="copy-tip">{{ copiedKey === row.key ? 'Copied' : 'Copy' }}</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- RIGHT: form card -->
        <div class="right-form-pane" v-reveal="{ delay: 200 }" @mousemove="onCardMove">
          <span class="spot" aria-hidden="true"></span>
          <span class="corner tl" aria-hidden="true"></span>
          <span class="corner br" aria-hidden="true"></span>

          <div class="form-inner">
            <div class="form-title-group">
              <h2>Send a Message</h2>
              <p>Fill out the details below and our team will reach out discreetly.</p>
            </div>

            <Transition name="swap" mode="out-in">
              <div v-if="submitted" key="done" class="success-screen">
                <svg class="success-check" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                  <circle class="sc-ring" cx="32" cy="32" r="28" pathLength="1" />
                  <path class="sc-tick" d="M20 33l8 8 16-17" pathLength="1" />
                </svg>
                <h3>Inquiry received.</h3>
                <p>Thank you for reaching out, {{ form.firstName }}. An advisor will connect with you shortly.</p>
                <button type="button" class="text-link" @click="resetForm">Send another message</button>
              </div>

              <form v-else key="form" @submit.prevent="handleSubmit" class="editorial-form">
                <div class="input-row">
                  <div class="input-group">
                    <input type="text" id="firstName" v-model="form.firstName" placeholder=" " autocomplete="given-name" required />
                    <label for="firstName">First Name</label>
                    <span class="input-line"></span>
                  </div>
                  <div class="input-group">
                    <input type="text" id="lastName" v-model="form.lastName" placeholder=" " autocomplete="family-name" required />
                    <label for="lastName">Last Name</label>
                    <span class="input-line"></span>
                  </div>
                </div>

                <div class="input-group">
                  <input type="email" id="email" v-model="form.email" placeholder=" " autocomplete="email" required />
                  <label for="email">Email Address</label>
                  <span class="input-line"></span>
                </div>

                <fieldset class="chips">
                  <legend>I'm interested in</legend>
                  <button
                    v-for="item in interests"
                    :key="item"
                    type="button"
                    class="chip"
                    :class="{ on: form.interests.includes(item) }"
                    :aria-pressed="form.interests.includes(item)"
                    @click="toggleInterest(item)"
                  >{{ item }}</button>
                </fieldset>

                <div class="input-group textarea-group">
                  <textarea id="message" v-model="form.message" rows="4" placeholder=" " required></textarea>
                  <label for="message">Message</label>
                  <span class="input-line"></span>
                </div>

                <button type="submit" class="btn-gold submit-btn" :class="{ loading: sending }" :disabled="sending" v-magnetic>
                  <span class="btn-label">{{ sending ? 'Sending' : 'Send Message' }}</span>
                  <span v-if="sending" class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
                </button>
              </form>
            </Transition>
          </div>
        </div>

      </div>
    </section>

    <!-- ========== CONCIERGE CALL WIDGET ========== -->
    <div class="advisor-call-widget">
      <a href="tel:+919289245099" class="advisor-card" aria-label="Call a senior advisor now">
        <div class="avatar-container">
          <div class="pulse-wave"></div>
          <div class="pulse-wave delay"></div>
          <span class="avatar-mark">VD</span>
          <span class="avatar-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
            </svg>
          </span>
        </div>
        <div class="advisor-info">
          <span class="advisor-status"><span class="live-dot"></span> Senior Advisor Online</span>
          <span class="advisor-action">Call now</span>
        </div>
      </a>
    </div>

  </main>
</template>

<style scoped>
/* ============================================================
   BASE
   ============================================================ */
.contact-page {
  --serif: "Cormorant Garamond", Georgia, "Times New Roman", serif;
  --sans: "Manrope", "Helvetica Neue", Arial, sans-serif;
  --gold: #c5a36a;
  --bronze: #8c6b55;
  --ink: #1a1a1a;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);

  background: #faf8f4;
  color: var(--ink);
  overflow-x: hidden;
  font-family: var(--sans);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.classy-kicker {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--bronze);
}

/* word-mask reveal (spans are injected at runtime, so :deep is required) */
.contact-page :deep(.word-mask) {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding: 0 0.06em 0.12em 0;
  margin-right: -0.06em;
}

.contact-page :deep(.word) {
  display: inline-block;
  transform: translateY(115%);
  transition: transform 1.1s var(--ease);
  transition-delay: calc(var(--i, 0) * 45ms + 100ms);
}

.is-revealed :deep(.word) { transform: translateY(0); }

/* ============================================================
   HERO / SPLIT
   ============================================================ */
.contact-hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 90px 0;
  overflow: hidden;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,0,0,0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.022) 1px, transparent 1px);
  background-size: 80px 80px;
  -webkit-mask-image: radial-gradient(75% 80% at 60% 45%, #000 40%, transparent 100%);
  mask-image: radial-gradient(75% 80% at 60% 45%, #000 40%, transparent 100%);
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  width: 760px;
  height: 760px;
  right: -160px;
  top: -200px;
  background: radial-gradient(circle, rgba(197,163,106,0.24), transparent 65%);
  animation: breath 9s ease-in-out infinite;
  pointer-events: none;
}

@keyframes breath {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}

.hero-watermark {
  position: absolute;
  left: -2%;
  bottom: -16%;
  font-family: var(--serif);
  font-weight: 700;
  font-size: clamp(260px, 38vw, 600px);
  line-height: 1;
  color: rgba(140,107,85,0.05);
  pointer-events: none;
  user-select: none;
}

.contact-split-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 88px;
  align-items: center;
  width: 100%;
}

/* ---------- Left ---------- */
.left-editorial { display: flex; flex-direction: column; }

.kicker-wrap { display: flex; align-items: center; gap: 16px; margin-bottom: 26px; }

.kicker-wrap .line {
  width: 56px;
  height: 1px;
  background: linear-gradient(90deg, var(--bronze), var(--gold));
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 1.2s var(--ease) 0.3s;
}

.left-editorial.is-revealed .line { transform: scaleX(1); }

.editorial-title {
  font-family: var(--serif);
  font-size: clamp(46px, 5.4vw, 84px);
  line-height: 1;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 28px;
}

.highlight-text :deep(.word) {
  font-style: italic;
  color: transparent;
  background-image: linear-gradient(100deg, #8c6b55 15%, #dcbb82 42%, #8c6b55 68%);
  background-size: 260% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shimmer 7s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 120% 0; }
  100% { background-position: -140% 0; }
}

.editorial-desc {
  font-size: 16.5px;
  line-height: 1.8;
  color: #5a5651;
  margin-bottom: 44px;
  max-width: 480px;
}

/* ---------- Switcher ---------- */
.info-switcher { border-top: 1px solid #e2dccf; padding-top: 30px; }

.switcher-tabs { display: flex; gap: 28px; margin-bottom: 28px; flex-wrap: wrap; }

.switch-tab {
  position: relative;
  background: none;
  border: none;
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8f8a82;
  cursor: pointer;
  padding: 0 0 8px;
  transition: color 0.3s;
}

.switch-tab:hover { color: var(--ink); }
.switch-tab:focus-visible { outline: 2px solid var(--bronze); outline-offset: 4px; }

.switch-tab::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, var(--bronze), var(--gold));
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s var(--ease);
}

.switch-tab.active { color: var(--ink); }
.switch-tab.active::after { transform: scaleX(1); transform-origin: left; }

.switcher-content { min-height: 190px; }
.tab-pane { display: flex; flex-direction: column; gap: 14px; }

.pane-enter-active, .pane-leave-active { transition: opacity 0.3s ease, transform 0.45s var(--ease); }
.pane-enter-from { opacity: 0; transform: translateY(12px); }
.pane-leave-to { opacity: 0; transform: translateY(-8px); }

.pane-subtitle {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--bronze);
}

.pane-text {
  font-family: var(--serif);
  font-size: 30px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.2;
  margin: 0;
}

.call-line {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  margin-top: 10px;
  text-decoration: none;
  color: inherit;
  width: fit-content;
}

.call-icon {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(140,107,85,0.4);
  border-radius: 50%;
  color: var(--bronze);
  transition: background 0.4s var(--ease), color 0.4s, transform 0.4s var(--ease);
}

.call-line:hover .call-icon { background: var(--bronze); color: #fff; transform: rotate(-12deg) scale(1.05); }

.call-text { display: flex; flex-direction: column; gap: 2px; }
.action-label { font-size: 11px; color: #7b766e; text-transform: uppercase; letter-spacing: 0.1em; }
.action-value { font-family: var(--serif); font-size: 26px; font-weight: 600; color: var(--ink); transition: color 0.3s; line-height: 1.1; }
.call-line:hover .action-value { color: var(--bronze); }

/* bank list */
.clean-bank-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; }

.clean-bank-list li {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  align-items: center;
  gap: 14px;
  font-size: 14px;
  padding: 12px 0;
  border-bottom: 1px solid #ebe5d9;
}

.bank-label { color: #7b766e; font-size: 12px; letter-spacing: 0.04em; }
.clean-bank-list strong { color: var(--ink); font-weight: 600; word-break: break-word; }
.clean-bank-list .mono { font-family: ui-monospace, "SF Mono", Menlo, monospace; letter-spacing: 0.06em; }

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid #e0d9cb;
  color: var(--bronze);
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}

.copy-btn:hover { background: var(--bronze); color: #fff; border-color: var(--bronze); }
.copy-btn.copied { background: #1a1a1a; color: var(--gold); border-color: #1a1a1a; }
.copy-btn:focus-visible { outline: 2px solid var(--bronze); outline-offset: 2px; }

/* ============================================================
   FORM CARD
   ============================================================ */
.right-form-pane {
  --mx: 50%;
  --my: 0%;
  position: relative;
  background: rgba(255,255,255,0.82);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  border: 1px solid #ece6da;
  border-radius: 10px;
  padding: 60px;
  box-shadow: 0 40px 80px rgba(26,26,26,0.08), 0 1px 0 rgba(255,255,255,0.8) inset;
  overflow: hidden;
}

.spot {
  position: absolute;
  inset: 0;
  background: radial-gradient(340px circle at var(--mx) var(--my), rgba(197,163,106,0.16), transparent 65%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}

.right-form-pane:hover .spot { opacity: 1; }

.corner {
  position: absolute;
  width: 34px;
  height: 34px;
  border: 0 solid var(--gold);
  pointer-events: none;
}

.corner.tl { top: 16px; left: 16px; border-top-width: 1px; border-left-width: 1px; }
.corner.br { bottom: 16px; right: 16px; border-bottom-width: 1px; border-right-width: 1px; }

.form-inner { position: relative; }

.form-title-group { margin-bottom: 40px; }

.form-title-group h2 {
  font-family: var(--serif);
  font-size: 44px;
  font-weight: 600;
  line-height: 1.05;
  color: var(--ink);
  margin: 0 0 10px;
}

.form-title-group p { font-size: 14.5px; line-height: 1.7; color: #666; margin: 0; }

.editorial-form { display: flex; flex-direction: column; gap: 34px; }
.input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }

.input-group { position: relative; display: flex; flex-direction: column; }

.input-group input,
.input-group textarea {
  width: 100%;
  border: none;
  border-bottom: 1px solid #ddd6c8;
  background: transparent;
  padding: 12px 0 10px;
  font-family: var(--sans);
  font-size: 16px;
  color: var(--ink);
  outline: none;
  border-radius: 0;
  transition: border-color 0.3s;
}

.input-group input:hover,
.input-group textarea:hover { border-bottom-color: #bfb6a4; }

.input-group textarea { resize: none; }

.input-group label {
  position: absolute;
  top: 12px;
  left: 0;
  font-size: 14px;
  color: #7b766e;
  pointer-events: none;
  transition: all 0.35s var(--ease);
}

.input-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--bronze), var(--gold));
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s var(--ease);
}

.input-group input:focus ~ label,
.input-group input:not(:placeholder-shown) ~ label,
.input-group textarea:focus ~ label,
.input-group textarea:not(:placeholder-shown) ~ label {
  top: -16px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--bronze);
}

.input-group input:focus ~ .input-line,
.input-group textarea:focus ~ .input-line { transform: scaleX(1); transform-origin: left; }

/* interest chips */
.chips { border: 0; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 10px; }

.chips legend {
  float: left;
  width: 100%;
  padding: 0;
  margin-bottom: 14px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--bronze);
}

.chip {
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 600;
  color: #5a5651;
  background: transparent;
  border: 1px solid #ddd6c8;
  padding: 9px 18px;
  border-radius: 40px;
  cursor: pointer;
  transition: background 0.35s var(--ease), color 0.35s, border-color 0.35s, transform 0.35s var(--ease);
}

.chip:hover { border-color: var(--bronze); color: var(--ink); transform: translateY(-1px); }
.chip.on { background: var(--ink); border-color: var(--ink); color: var(--gold); }
.chip:focus-visible { outline: 2px solid var(--bronze); outline-offset: 2px; }

/* button */
.btn-gold {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--gold);
  color: #111;
  padding: 19px 48px;
  font-family: var(--sans);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: transform 0.35s var(--ease), background 0.4s, box-shadow 0.4s var(--ease);
}

.submit-btn { width: 100%; margin-top: 6px; }

.btn-gold::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40%;
  left: -60%;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent);
  transform: skewX(-20deg);
  animation: shine 4.5s ease-in-out infinite;
}

@keyframes shine {
  0%, 55% { left: -60%; }
  100% { left: 140%; }
}

.btn-gold:hover { background: #d4af6a; box-shadow: 0 14px 40px rgba(197,163,106,0.4); }
.btn-gold:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
.btn-gold:disabled { cursor: progress; }

.dots { display: inline-flex; gap: 4px; }
.dots i { width: 5px; height: 5px; border-radius: 50%; background: #111; animation: dotBounce 1s ease-in-out infinite; }
.dots i:nth-child(2) { animation-delay: 0.15s; }
.dots i:nth-child(3) { animation-delay: 0.3s; }

@keyframes dotBounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-5px); opacity: 1; }
}

/* form <-> success swap */
.swap-enter-active, .swap-leave-active { transition: opacity 0.35s ease, transform 0.5s var(--ease); }
.swap-enter-from { opacity: 0; transform: translateY(16px); }
.swap-leave-to { opacity: 0; transform: translateY(-10px); }

/* success */
.success-screen { text-align: center; padding: 40px 0 24px; }

.success-check { width: 84px; height: 84px; margin-bottom: 18px; }

.sc-ring, .sc-tick {
  stroke: var(--gold);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: drawStroke 0.9s var(--ease) forwards;
}

.sc-tick { animation-delay: 0.6s; stroke: var(--bronze); }

@keyframes drawStroke { to { stroke-dashoffset: 0; } }

.success-screen h3 { font-family: var(--serif); font-size: 40px; font-weight: 600; color: var(--ink); margin: 0 0 10px; }
.success-screen p { color: #666; font-size: 15.5px; line-height: 1.7; max-width: 380px; margin: 0 auto 22px; }

.text-link {
  background: none;
  border: none;
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 700;
  color: var(--bronze);
  cursor: pointer;
  padding: 0 0 4px;
  border-bottom: 1px solid currentColor;
  transition: color 0.3s;
}

.text-link:hover { color: var(--ink); }

/* ============================================================
   CONCIERGE WIDGET
   ============================================================ */
.advisor-call-widget { position: fixed; bottom: 30px; right: 30px; z-index: 999; }

.advisor-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(17,17,17,0.92);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(197,163,106,0.4);
  padding: 8px 22px 8px 8px;
  border-radius: 60px;
  text-decoration: none;
  box-shadow: 0 18px 44px rgba(0,0,0,0.32);
  transition: transform 0.4s var(--ease), border-color 0.3s, box-shadow 0.4s;
}

.advisor-card:hover { transform: translateY(-4px); border-color: var(--gold); box-shadow: 0 24px 54px rgba(0,0,0,0.38); }
.advisor-card:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }

.avatar-container {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, #2a2620, #14120f);
  border: 1px solid rgba(197,163,106,0.5);
}

.avatar-mark { font-family: var(--serif); font-size: 20px; font-weight: 700; color: var(--gold); line-height: 1; }

.avatar-badge {
  position: absolute;
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--gold);
  border: 2px solid #111;
}

.pulse-wave {
  position: absolute;
  inset: -2px;
  border: 1px solid var(--gold);
  border-radius: 50%;
  animation: waveExpand 2.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  pointer-events: none;
}

.pulse-wave.delay { animation-delay: 1.2s; }

@keyframes waveExpand {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.7); opacity: 0; }
}

.advisor-info { display: flex; flex-direction: column; gap: 2px; }

.advisor-status { display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: #a9a49a; font-weight: 500; }

.live-dot {
  width: 6px;
  height: 6px;
  background: #4ade80;
  border-radius: 50%;
  box-shadow: 0 0 6px #4ade80;
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

.advisor-action { font-family: var(--serif); font-size: 20px; font-weight: 600; color: #f4f1ea; line-height: 1.1; }

/* ============================================================
   REDUCED MOTION
   ============================================================ */
@media (prefers-reduced-motion: reduce) {
  .hero-glow, .btn-gold::after, .pulse-wave, .live-dot, .dots i,
  .highlight-text :deep(.word) { animation: none; }
  .highlight-text :deep(.word) { color: var(--bronze); background: none; }
  .contact-page :deep(.word) { transition: none; transform: none; }
  .kicker-wrap .line { transition: none; transform: scaleX(1); }
  .sc-ring, .sc-tick { animation: none; stroke-dashoffset: 0; }
  .pane-enter-active, .pane-leave-active, .swap-enter-active, .swap-leave-active { transition: none; }
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 1024px) {
  .contact-split-grid { grid-template-columns: 1fr; gap: 56px; }
  .right-form-pane { padding: 48px 36px; }
}

@media (max-width: 768px) {
  .contact-hero-section { padding: 48px 0 110px; }
  .right-form-pane { padding: 40px 22px; }
  .form-title-group h2 { font-size: 36px; }
  .input-row { grid-template-columns: 1fr; gap: 34px; }
  .clean-bank-list li { grid-template-columns: 92px 1fr auto; gap: 10px; }
  .copy-tip { display: none; }
  .copy-btn { padding: 7px 8px; }
  .pane-text { font-size: 26px; }
  .advisor-call-widget { bottom: 20px; right: 20px; }
  .advisor-info { display: none; }
  .advisor-card { padding: 6px; border-radius: 50%; }
}
</style>