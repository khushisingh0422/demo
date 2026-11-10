<script setup lang="ts">
import { navLinks, contact } from '~/data/site'

const scrolled = ref(false)
const open = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 40 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
const close = () => { open.value = false }
</script>

<template>
  <header class="header" :class="{ scrolled, open }">
    <div class="container bar">
      <a href="#home" class="logo" @click="close">
        <img src="/images/Dvayu-logo-scaled.jpg" alt="Dvayu Farms" width="64" height="64" />
        <span class="wordmark">
          <strong>DVAYU</strong>
          <small>Farms</small>
        </span>
      </a>

      <nav class="nav" aria-label="Main">
        <a v-for="l in navLinks" :key="l.href" :href="l.href" @click="close">{{ l.label }}</a>
        <a :href="`tel:${contact.phone}`" class="btn btn-primary call" @click="close">Call Now</a>
      </nav>

      <button class="burger" :aria-expanded="open" aria-label="Toggle menu" @click="open = !open">
        <span /><span /><span />
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed; inset: 0 0 auto; z-index: 50;
  transition: background .3s ease, box-shadow .3s ease, padding .3s ease;
  padding: 14px 0;
  background: linear-gradient(to bottom, rgba(11,18,56,.75), rgba(11,18,56,0));
}
.header.scrolled, .header.open {
  background: var(--navy-900);
  box-shadow: 0 8px 24px -12px rgba(0,0,0,.5);
  padding: 8px 0;
}
.bar { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.logo { display: flex; align-items: center; gap: 12px; color: var(--white); }
.logo img { width: 56px; height: 56px; border-radius: 10px; object-fit: cover; transition: width .3s, height .3s; }
.scrolled .logo img { width: 48px; height: 48px; }
.wordmark { display: flex; flex-direction: column; line-height: 1; }
.wordmark strong { font-family: var(--serif); font-size: 26px; letter-spacing: .14em; font-weight: 600; }
.wordmark small { font-size: 10px; letter-spacing: .45em; text-transform: uppercase; color: var(--silver); margin-top: 4px; }

.nav { display: flex; align-items: center; gap: 30px; }
.nav a:not(.btn) {
  color: rgba(255,255,255,.88); font-size: 13px; font-weight: 500; letter-spacing: .08em;
  text-transform: uppercase; position: relative; padding: 6px 0;
}
.nav a:not(.btn)::after {
  content: ''; position: absolute; left: 0; bottom: 0; height: 1px; width: 0;
  background: var(--sky); transition: width .25s ease;
}
.nav a:not(.btn):hover { color: var(--white); }
.nav a:not(.btn):hover::after { width: 100%; }
.call { padding: 12px 22px; }

.burger { display: none; background: none; border: 0; padding: 8px; cursor: pointer; }
.burger span { display: block; width: 26px; height: 2px; background: var(--white); margin: 6px 0; transition: .3s; }
.open .burger span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.open .burger span:nth-child(2) { opacity: 0; }
.open .burger span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

@media (max-width: 980px) {
  .burger { display: block; }
  .nav {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; align-items: stretch; gap: 0;
    background: var(--navy-900); padding: 8px 16px 24px;
    max-height: 0; overflow: hidden; opacity: 0; pointer-events: none;
    transition: max-height .35s ease, opacity .25s ease;
  }
  .open .nav { max-height: 520px; opacity: 1; pointer-events: auto; }
  .nav a:not(.btn) { padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.08); }
  .call { margin-top: 16px; }
}
</style>
