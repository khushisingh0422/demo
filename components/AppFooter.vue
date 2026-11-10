<script setup lang="ts">
import { contact, footer } from '~/data/site'

const email = ref('')
const sent = ref(false)
async function book() {
  if (!email.value) return
  // Reuses the consultation endpoint so the lead lands in the same sheet/inbox.
  await $fetch('/api/consultation', { method: 'POST', body: { name: 'Footer "Book Now" request', email: email.value, message: 'Asked to be contacted (left email only).' } }).catch(() => {})
  sent.value = true
  email.value = ''
}
const year = new Date().getFullYear()
</script>

<template>
  <!-- Layout follows dvayu.co.in footer -->
  <footer class="footer">
    <div class="container cols">
      <div class="brand">
        <BrandLogo dark />
        <p>{{ footer.tagline }}</p>
        <div v-if="contact.socials.length" class="social">
          <a v-for="s in contact.socials" :key="s.name" :href="s.href" target="_blank" rel="noopener" :aria-label="s.name"><SocialIcon :name="s.icon" /></a>
        </div>
      </div>

      <div class="links">
        <h4>Quick Links</h4>
        <a v-for="l in footer.quickLinks" :key="l.label" :href="l.href">{{ l.label }}</a>
      </div>

      <div class="links">
        <h4>Find Us</h4>
        <a v-for="l in footer.findUs" :key="l.label" :href="l.href">{{ l.label }}</a>
      </div>

      <div class="contact">
        <form class="subscribe" @submit.prevent="book">
          <input v-model="email" type="email" required placeholder="Enter Your Email" aria-label="Your email" />
          <button>Book Now</button>
        </form>
        <p v-if="sent" class="sent">Thanks! We'll be in touch.</p>
        <div class="row"><span class="ic">⌖</span><span>{{ contact.address }}</span></div>
        <div class="row"><span class="ic">✉</span><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></div>
        <div class="row"><span class="ic">☎</span><a :href="`tel:${contact.phoneHref}`">{{ contact.phone }}</a></div>
      </div>
    </div>
    <div class="bottom">
      <div class="container">© {{ year }}, All rights reserved. VD Vanchers</div>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: var(--mint); color: #2c3845; padding-top: 80px; }
.cols { display: grid; grid-template-columns: 1.5fr .75fr .75fr 1.3fr; gap: 48px; padding-bottom: 60px; }
.brand p { margin: 22px 0; max-width: 380px; font-size: 16px; }
.social { display: flex; gap: 8px; }
.social a { width: 42px; height: 42px; border-radius: 50%; border: 1px solid var(--navy-800); color: var(--navy-800); display: grid; place-items: center; transition: .2s; }
.social a:hover { background: var(--navy-800); color: var(--white); }
h4 { font-family: var(--sans); font-size: 20px; font-weight: 600; color: var(--navy-900); margin: 4px 0 18px; }
.links a { display: block; font-size: 14.5px; padding: 8px 0; border-bottom: 1px solid #d6dcd9; transition: color .2s; }
.links a:hover { color: #9a7b45; }
.subscribe { display: flex; border: 1px solid #d6dcd9; border-radius: 6px; overflow: hidden; background: var(--white); margin-bottom: 18px; }
.subscribe input { flex: 1; min-width: 0; border: 0; padding: 12px 16px; font: 400 15px var(--sans); outline: none; }
.subscribe button { border: 0; background: var(--navy-800); color: var(--white); padding: 0 24px; font: 500 13px var(--sans); text-transform: uppercase; cursor: pointer; transition: .2s; }
.subscribe button:hover { background: var(--gold); color: var(--navy-900); }
.sent { font-size: 13px; color: #1d6b3a; margin: -8px 0 12px; }
.row { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; font-size: 16px; }
.ic { width: 42px; height: 42px; flex: none; border-radius: 50%; background: var(--navy-800); color: var(--white); display: grid; place-items: center; font-size: 16px; }
.row a:hover { color: #9a7b45; }
.bottom { background: var(--mint-2); padding: 22px 0; font-size: 14px; }
@media (max-width: 1000px) { .cols { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px) { .cols { grid-template-columns: 1fr; gap: 36px; } }
</style>
