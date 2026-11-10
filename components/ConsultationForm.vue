<script setup lang="ts">
import { contact, projects } from '~/data/site'

const blank = { name: '', phone: '', email: '', project: '', visitDate: '', message: '', website: '' }
const form = reactive({ ...blank })
const state = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMsg = ref('')

async function submit() {
  state.value = 'sending'
  errorMsg.value = ''
  try {
    await $fetch('/api/consultation', { method: 'POST', body: { ...form } })
    state.value = 'success'
    Object.assign(form, blank)
  } catch (e: any) {
    state.value = 'error'
    errorMsg.value = e?.data?.statusMessage || `Something went wrong. Please call us on ${contact.phone}.`
  }
}
</script>

<template>
  <section id="consultation" class="section consult">
    <div class="container grid">
      <div class="info">
        <span class="kicker light">Free Consultation</span>
        <h2 class="h2">Book Your Site Visit Today</h2>
        <p>Share a few details and our property advisor will call you back within 24 hours to plan a personal site visit.</p>
        <ul>
          <li><span class="ic">☎</span><div><small>Call us</small><a :href="`tel:${contact.phoneHref}`">{{ contact.phone }}</a></div></li>
          <li><span class="ic">✉</span><div><small>Email</small><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></div></li>
          <li><span class="ic">⌖</span><div><small>Visit our office</small><span>{{ contact.address }}</span></div></li>
        </ul>
      </div>

      <form class="card" @submit.prevent="submit">
        <h3>Request a Consultation</h3>
        <!-- honeypot: real users never see or fill this -->
        <input v-model="form.website" type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <div class="row">
          <label>Full Name*<input v-model.trim="form.name" required maxlength="80" placeholder="Your name" /></label>
          <label>Phone*<input v-model.trim="form.phone" type="tel" required pattern="[0-9+\-\s]{8,15}" placeholder="+91 98xxxxxxxx" /></label>
        </div>
        <div class="row">
          <label>Email<input v-model.trim="form.email" type="email" maxlength="120" placeholder="you@example.com" /></label>
          <label>Interested In
            <select v-model="form.project">
              <option value="">Select a project</option>
              <option v-for="p in projects" :key="p.name">{{ p.name }}</option>
              <option>Not sure yet</option>
            </select>
          </label>
        </div>
        <label>Preferred Visit Date<input v-model="form.visitDate" type="date" /></label>
        <label>Message<textarea v-model.trim="form.message" rows="3" maxlength="1000" placeholder="Tell us what you're looking for" /></label>
        <button class="pill pill-dark submit" :disabled="state === 'sending'">
          {{ state === 'sending' ? 'Sending…' : 'Get a Call Back' }}
        </button>
        <p v-if="state === 'success'" class="msg ok" role="status">Thank you! Our team will contact you shortly.</p>
        <p v-if="state === 'error'" class="msg err" role="alert">{{ errorMsg }}</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.consult { background: var(--navy-900); color: var(--white); }
.grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 72px; align-items: center; }
.light { color: var(--gold-light); }
.info .h2 { color: var(--white); margin: 14px 0 18px; }
.info > p { color: rgba(255,255,255,.75); margin-bottom: 34px; font-size: 16.5px; }
.info ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 22px; }
.info li { display: flex; gap: 16px; align-items: center; }
.ic { width: 46px; height: 46px; flex: none; border-radius: 50%; background: var(--gold); color: var(--navy-900); display: grid; place-items: center; font-size: 17px; }
.info small { display: block; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.55); }
.info a:hover { color: var(--gold-light); }

.card { background: var(--white); color: var(--ink); border-radius: 28px; border-top: 2px solid var(--gold); padding: 40px; display: grid; gap: 16px; }
.card h3 { font-size: 28px; color: var(--navy-900); margin-bottom: 4px; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
label { display: grid; gap: 6px; font-size: 11.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--navy-700); }
input, select, textarea { font: 400 15px var(--sans); color: var(--ink); text-transform: none; letter-spacing: 0; padding: 13px 14px; border: 1px solid #dcdfe6; border-radius: 10px; background: var(--card); width: 100%; transition: border-color .2s, box-shadow .2s; }
input:focus, select:focus, textarea:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(197,163,106,.2); background: var(--white); }
textarea { resize: vertical; }
.hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
.submit { width: 100%; margin-top: 6px; }
.submit:disabled { opacity: .6; cursor: wait; }
.msg { font-size: 14px; padding: 12px 14px; border-radius: 10px; }
.ok { background: #e7f6ec; color: #1d6b3a; }
.err { background: #fdecec; color: #a12a2a; }
@media (max-width: 900px) { .grid { grid-template-columns: 1fr; gap: 40px; } }
@media (max-width: 520px) { .row { grid-template-columns: 1fr; } .card { padding: 28px 20px; } }
</style>
