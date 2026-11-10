<script setup lang="ts">
import { contact, navLinks, projects } from '~/data/site'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="grid">
        <div class="brand-col">
          <BrandLogo />
          <p>Building relationships through thoughtful real estate development, transparent guidance and customer-first service.</p>
          <div v-if="contact.socials.length" class="social">
            <a v-for="s in contact.socials" :key="s.name" :href="s.href" target="_blank" rel="noopener">{{ s.name }}</a>
          </div>
        </div>
        <div class="col">
          <h4>Explore</h4>
          <a v-for="l in navLinks.slice(1)" :key="l.href" :href="l.href">{{ l.label }}</a>
        </div>
        <div class="col">
          <h4>Our Projects</h4>
          <a v-for="p in projects" :key="p.name" href="#projects">{{ p.name }}</a>
        </div>
        <div class="col">
          <h4>Get in touch</h4>
          <p>{{ contact.address }}</p>
          <a :href="`tel:${contact.phoneHref}`">{{ contact.phone }}</a>
          <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        </div>
      </div>
      <div class="bottom">
        <span>© {{ year }} VD Vanchers. All rights reserved.</span>
        <span>Noida · Greater Noida · Vrindavan · Dehradun</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: var(--navy-deep); color: var(--white); padding: 65px 0 22px; }
.grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1.2fr; gap: 40px; padding-bottom: 42px; }
.brand-col p { max-width: 310px; color: rgba(255,255,255,.62); font-size: .85rem; margin-top: 24px; }
.social { display: flex; gap: 14px; flex-wrap: wrap; font-size: .75rem; }
.social a { color: var(--gold2); }
h4 { font-size: .7rem; letter-spacing: .15em; text-transform: uppercase; color: var(--gold2); margin: 5px 0 19px; }
.col a, .col p { display: block; color: rgba(255,255,255,.68); font-size: .82rem; margin: 0 0 11px; transition: color .2s; }
.col a:hover { color: var(--gold2); }
.bottom { border-top: 1px solid rgba(255,255,255,.14); padding-top: 20px; display: flex; justify-content: space-between; gap: 20px; color: rgba(255,255,255,.48); font-size: .68rem; }
@media (max-width: 900px) { .grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 680px) {
  .grid { gap: 28px; }
  .brand-col { grid-column: 1 / -1; }
  .bottom { flex-direction: column; }
}
</style>
