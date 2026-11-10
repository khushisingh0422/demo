<script setup lang="ts">
import { contact, enquiryInterests } from '~/data/site'

const blank = { name: '', phone: '', email: '', interest: enquiryInterests[0], message: '', website: '' }
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
  <section id="consultation" class="section contact">
    <div class="container grid">
      <div class="copy">
        <div class="eyebrow">Let's connect</div>
        <h2>Let's find the right opportunity for you.</h2>
        <p>Tell us what you are looking for. Our team will connect with you to understand your requirements and help you explore suitable property options.</p>
        <div class="detail">
          <span class="icon">⌖</span>
          <div><small>Visit our office</small><strong>{{ contact.address }}</strong></div>
        </div>
        <div class="detail">
          <span class="icon">✆</span>
          <div><small>Call us</small><a :href="`tel:${contact.phoneHref}`"><strong>{{ contact.phone }}</strong></a></div>
        </div>
        <div class="detail">
          <span class="icon">✉</span>
          <div><small>Email</small><a :href="`mailto:${contact.email}`"><strong>{{ contact.email }}</strong></a></div>
        </div>
      </div>

      <form class="form" @submit.prevent="submit">
        <h3>Speak to our property expert</h3>
        <p class="sub">Share your details and we will get in touch.</p>
        <!-- honeypot: real users never see or fill this -->
        <input v-model="form.website" type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />

        <div class="fields">
          <div class="field">
            <label for="f-name">Full name *</label>
            <input id="f-name" v-model.trim="form.name" required maxlength="80" placeholder="Your name" />
          </div>
          <div class="field">
            <label for="f-phone">Phone number *</label>
            <input id="f-phone" v-model.trim="form.phone" type="tel" required pattern="[0-9+\-\s]{8,15}" placeholder="Your contact number" />
          </div>
          <div class="field">
            <label for="f-email">Email address</label>
            <input id="f-email" v-model.trim="form.email" type="email" maxlength="120" placeholder="you@example.com" />
          </div>
          <div class="field">
            <label for="f-interest">I am interested in</label>
            <select id="f-interest" v-model="form.interest">
              <option v-for="o in enquiryInterests" :key="o">{{ o }}</option>
            </select>
          </div>
          <div class="field full">
            <label for="f-message">Message</label>
            <textarea id="f-message" v-model.trim="form.message" maxlength="1000" placeholder="Tell us a little about what you are looking for..." />
          </div>
        </div>

        <button class="btn" type="submit" :disabled="state === 'sending'">
          {{ state === 'sending' ? 'Sending…' : 'Send Enquiry ↗' }}
        </button>
        <p class="disclaimer">By submitting this form, you agree to be contacted by VD Vanchers regarding your enquiry.</p>
        <p v-if="state === 'success'" class="status ok" role="status">Thank you! Our team will be in touch shortly.</p>
        <p v-if="state === 'error'" class="status err" role="alert">{{ errorMsg }}</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact { background: var(--paper); }
.grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 70px; align-items: start; }
.copy p { color: var(--muted); }
.detail { display: flex; gap: 14px; align-items: center; margin-top: 24px; }
.icon { width: 43px; height: 43px; flex: none; border: 1px solid var(--gold); display: grid; place-items: center; color: var(--navy); }
.detail small { display: block; color: var(--muted); font-size: .65rem; letter-spacing: .1em; text-transform: uppercase; }
.detail strong { font-size: .9rem; font-weight: 600; }
.detail a:hover strong { color: var(--gold); }

.form { background: var(--white); padding: 40px; box-shadow: 0 18px 55px rgba(21,38,61,.09); }
.form h3 { font-size: 1.8rem; margin-bottom: 8px; }
.sub { font-size: .84rem; color: var(--muted); margin-bottom: 25px; }
.hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
.fields { display: grid; grid-template-columns: 1fr 1fr; gap: 17px; }
.field { display: flex; flex-direction: column; gap: 7px; }
.field.full { grid-column: 1 / -1; }
label { font-size: .66rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: #536273; }
input, select, textarea { border: 1px solid #e0e3e6; background: #fbfcfd; padding: 13px 14px; outline: none; width: 100%; color: var(--ink); border-radius: 0; transition: border-color .2s; }
input:focus, select:focus, textarea:focus { border-color: var(--gold); }
textarea { min-height: 100px; resize: vertical; }
.form .btn { margin-top: 20px; }
.form .btn:disabled { opacity: .6; cursor: wait; }
.disclaimer { font-size: .67rem; color: #87919a; margin: 14px 0 0; }
.status { font-size: .85rem; margin: 12px 0 0; padding: 10px 12px; }
.ok { color: #23633d; background: #e8f3ec; }
.err { color: #9b2c2c; background: #fbeaea; }
@media (max-width: 900px) { .grid { gap: 40px; } }
@media (max-width: 680px) {
  .grid { grid-template-columns: 1fr; }
  .fields { grid-template-columns: 1fr; }
  .field.full { grid-column: auto; }
  .form { padding: 27px 22px; }
}
</style>
