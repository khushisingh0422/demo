<script setup lang="ts">
import { navLinks } from '~/data/site'

const scrolled = ref(false)
const open = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 40 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
const close = () => { open.value = false }
</script>

<template>
  <header class="header" :class="{ scrolled, open }">
    <div class="container nav">
      <BrandLogo @click="close" />

      <nav class="links" aria-label="Main">
        <a v-for="l in navLinks" :key="l.href" :href="l.href" @click="close">{{ l.label }}</a>
        <a class="nav-cta" href="#consultation" @click="close">Speak to an Expert&nbsp; ↗</a>
      </nav>

      <button class="menu" :aria-expanded="open" aria-label="Toggle navigation" @click="open = !open">
        <span /><span /><span />
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed; inset: 0 0 auto; z-index: 50; color: var(--white);
  border-bottom: 1px solid rgba(255,255,255,.2);
  transition: background .3s ease, border-color .3s ease;
}
.header.scrolled, .header.open { background: var(--navy); border-color: rgba(197,163,106,.35); }
.nav { height: 94px; display: flex; align-items: center; justify-content: space-between; gap: 25px; transition: height .3s; }
.scrolled .nav { height: 76px; }
.links { display: flex; align-items: center; gap: 29px; font-size: .72rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; }
.links a { opacity: .9; transition: color .2s; }
.links a:hover { color: var(--gold2); opacity: 1; }
.nav-cta { padding: 11px 16px; border: 1px solid var(--gold); color: var(--gold2); font-size: .7rem; letter-spacing: .1em; margin-left: 6px; }
.nav-cta:hover { background: var(--gold); color: var(--navy) !important; }

.menu { display: none; background: none; border: 0; padding: 8px; cursor: pointer; }
.menu span { display: block; width: 24px; height: 2px; background: var(--white); margin: 5px 0; transition: .3s; }
.open .menu span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.open .menu span:nth-child(2) { opacity: 0; }
.open .menu span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 1080px) { .links { gap: 18px; } .nav-cta { display: none; } }
@media (max-width: 900px) {
  .nav, .scrolled .nav { height: 78px; }
  .menu { display: block; }
  .links {
    position: absolute; top: 78px; left: 0; right: 0; background: var(--navy);
    flex-direction: column; align-items: flex-start; gap: 0; padding: 8px 24px 22px;
    display: none;
  }
  .open .links { display: flex; }
  .links a { width: 100%; padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,.08); }
  .nav-cta { display: inline-block; width: auto !important; margin: 16px 0 0; border-bottom: 1px solid var(--gold) !important; padding: 11px 16px !important; }
}
</style>
