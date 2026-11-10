<script setup lang="ts">
import { navLinks, contact } from '~/data/site'

const open = ref(false)
const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 40 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
const close = () => { open.value = false }
</script>

<template>
  <header class="header" :class="{ scrolled, open }">
    <!-- Top strip (dvayu.co.in) -->
    <div class="topbar">
      <div class="container tb">
        <div class="tb-info">
          <a :href="`mailto:${contact.email}`"><span class="ic">✉</span>{{ contact.email }}</a>
          <span class="addr"><span class="ic">➤</span>{{ contact.shortAddress }}</span>
        </div>
        <div v-if="contact.socials.length" class="tb-social">
          <a v-for="s in contact.socials" :key="s.name" :href="s.href" target="_blank" rel="noopener" :aria-label="s.name">
            <SocialIcon :name="s.icon" />
          </a>
        </div>
        <a v-else :href="`tel:${contact.phoneHref}`" class="tb-phone">{{ contact.phone }}</a>
      </div>
    </div>

    <!-- Main bar: logo where Dvayu's logo sits, menu next to it, Call Now on the right -->
    <div class="container bar">
      <BrandLogo dark @click="close" />

      <nav class="nav" aria-label="Main">
        <a v-for="l in navLinks" :key="l.href" :href="l.href" @click="close">{{ l.label }}</a>
        <a :href="`tel:${contact.phoneHref}`" class="call" @click="close">Call Now</a>
      </nav>

      <button class="burger" :aria-expanded="open" aria-label="Toggle menu" @click="open = !open">
        <span /><span /><span />
      </button>
    </div>
  </header>
</template>

<style scoped>
.header { position: sticky; top: 0; z-index: 50; background: var(--mint); transition: box-shadow .3s; }
.header.scrolled { box-shadow: 0 6px 20px -12px rgba(15,28,46,.35); }

.topbar { background: var(--mint-2); font-size: 14px; color: #3d4a57; max-height: 48px; overflow: hidden; transition: max-height .3s ease; }
.scrolled .topbar { max-height: 0; }
.tb { height: 48px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.tb-info { display: flex; gap: 26px; align-items: center; min-width: 0; }
.tb-info > * { display: inline-flex; align-items: center; gap: 10px; white-space: nowrap; }
.ic { width: 28px; height: 28px; border-radius: 50%; background: var(--navy-800); color: var(--white); display: grid; place-items: center; font-size: 12px; }
.tb-social { display: flex; gap: 8px; }
.tb-social a { width: 28px; height: 28px; border-radius: 50%; background: var(--navy-800); color: var(--white); display: grid; place-items: center; }
.tb-social a :deep(svg) { width: 14px; height: 14px; }
.tb-phone { font-weight: 600; color: var(--navy-800); }

.bar { display: flex; align-items: center; justify-content: space-between; gap: 24px; height: 108px; transition: height .3s; }
.scrolled .bar { height: 84px; }
.nav { display: flex; align-items: center; gap: 34px; }
.nav a:not(.call) { font-size: 13.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--navy-900); position: relative; padding: 6px 0; }
.nav a:not(.call)::after { content: ''; position: absolute; left: 0; bottom: 0; height: 2px; width: 0; background: var(--gold); transition: width .25s; }
.nav a:not(.call):hover::after { width: 100%; }
.call { background: var(--navy-800); color: var(--white); padding: 12px 24px; border-radius: 6px; font-size: 13.5px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; margin-left: 10px; transition: .2s; }
.call:hover { background: var(--gold); color: var(--navy-900); }

.burger { display: none; background: none; border: 0; padding: 8px; cursor: pointer; }
.burger span { display: block; width: 26px; height: 2px; background: var(--navy-900); margin: 6px 0; transition: .3s; }
.open .burger span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.open .burger span:nth-child(2) { opacity: 0; }
.open .burger span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

@media (max-width: 1080px) { .nav { gap: 22px; } }
@media (max-width: 960px) {
  .bar, .scrolled .bar { height: 80px; }
  .burger { display: block; }
  .nav {
    position: absolute; top: 100%; left: 0; right: 0; background: var(--mint);
    flex-direction: column; align-items: stretch; gap: 0; padding: 0 16px;
    max-height: 0; overflow: hidden; transition: max-height .35s ease, padding .35s;
    box-shadow: 0 12px 20px -14px rgba(0,0,0,.3);
  }
  .open .nav { max-height: 480px; padding: 8px 16px 22px; }
  .nav a:not(.call) { padding: 14px 0; border-bottom: 1px solid var(--line); }
  .call { margin: 16px 0 0; text-align: center; }
}
@media (max-width: 640px) { .addr { display: none; } .tb { font-size: 13px; } }
</style>
