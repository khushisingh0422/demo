<script setup lang="ts">
import { contact, navLinks, projects } from '~/data/site'

const icons: Record<string, string> = {
  facebook: 'M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-1.5h.01',
  youtube: 'M22 8.5a3 3 0 0 0-2-2C18.3 6 12 6 12 6s-6.3 0-8 .5a3 3 0 0 0-2 2A31 31 0 0 0 2 12a31 31 0 0 0 0 3.5 3 3 0 0 0 2 2c1.7.5 8 .5 8 .5s6.3 0 8-.5a3 3 0 0 0 2-2 31 31 0 0 0 0-7zM10 15V9l5 3-5 3z',
  linkedin: 'M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 6h4v2c.6-1.1 2-2.2 4-2.2 4 0 4.5 2.6 4.5 6V21h-4v-5.5c0-1.4 0-3.2-2-3.2s-2.4 1.5-2.4 3.1V21H10z',
}
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container cols">
      <div class="brand">
        <BrandLogo />
        <p>Experience modern farmhouse living surrounded by greenery, comfort, and peace — all just minutes away from Noida.</p>
        <div class="social">
          <a v-for="s in contact.socials" :key="s.name" :href="s.href" target="_blank" rel="noopener" :aria-label="s.name">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path :d="icons[s.icon]" /></svg>
          </a>
        </div>
      </div>

      <div>
        <h4>Quick Links</h4>
        <ul><li v-for="l in navLinks" :key="l.href"><a :href="l.href">{{ l.label }}</a></li></ul>
      </div>

      <div>
        <h4>Our Projects</h4>
        <ul><li v-for="p in projects" :key="p.name"><a href="#projects">{{ p.name }}</a></li></ul>
      </div>

      <div>
        <h4>Find Us</h4>
        <ul class="contact">
          <li>{{ contact.address }}</li>
          <li><a :href="`tel:${contact.phone}`">{{ contact.phone }}</a></li>
          <li><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></li>
        </ul>
        <a href="#consultation" class="btn btn-primary book">Book Now</a>
      </div>
    </div>

    <div class="bottom">
      <div class="container">
        <span>© {{ year }} VD Vanchers. All rights reserved.</span>
        <span>Sector 135, Noida · Uttar Pradesh</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: var(--navy-900); color: rgba(255,255,255,.75); padding-top: 80px; font-size: 14.5px; }
.cols { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1.3fr; gap: 48px; padding-bottom: 56px; }
.brand p { margin: 24px 0; max-width: 320px; }
.social { display: flex; gap: 10px; }
.social a { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255,255,255,.2); display: grid; place-items: center; color: var(--white); transition: .25s; }
.social a:hover { background: var(--gold); border-color: var(--gold); color: var(--navy-900); }
h4 { font-family: var(--serif); font-size: 22px; color: var(--white); margin-bottom: 20px; position: relative; padding-bottom: 12px; }
h4::after { content: ''; position: absolute; left: 0; bottom: 0; width: 36px; height: 2px; background: var(--gold); }
ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
ul a { transition: color .2s, padding .2s; }
ul a:hover { color: var(--gold-light); padding-left: 4px; }
.book { margin-top: 22px; padding: 12px 24px; }
.bottom { border-top: 1px solid rgba(255,255,255,.08); padding: 22px 0; font-size: 13px; color: rgba(255,255,255,.5); }
.bottom .container { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
@media (max-width: 960px) { .cols { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px) { .cols { grid-template-columns: 1fr; gap: 36px; } }
</style>
