import nodemailer from 'nodemailer'

interface Lead {
  name: string
  phone: string
  email?: string
  interest?: string
  message?: string
  website?: string // honeypot
}

const clip = (v: unknown, n: number) => String(v ?? '').trim().slice(0, n)
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

export default defineEventHandler(async (event) => {
  const raw = await readBody<Lead>(event)

  // Bots fill the hidden field — pretend success and drop it.
  if (raw?.website) return { ok: true }

  const lead = {
    name: clip(raw?.name, 80),
    phone: clip(raw?.phone, 20),
    email: clip(raw?.email, 120),
    interest: clip(raw?.interest, 60),
    message: clip(raw?.message, 1000),
    submittedAt: new Date().toISOString(),
  }

  if (!lead.name || !/^[0-9+\-\s]{8,15}$/.test(lead.phone)) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter your name and a valid phone number.' })
  }

  const cfg = useRuntimeConfig(event)
  const tasks: Promise<unknown>[] = []

  // 1) Google Sheet via Apps Script web app
  if (cfg.sheetWebhookUrl) {
    tasks.push($fetch(cfg.sheetWebhookUrl, { method: 'POST', body: lead }))
  }

  // 2) Email via SMTP
  if (cfg.smtpHost && cfg.smtpUser && cfg.leadEmailTo) {
    const transporter = nodemailer.createTransport({
      host: cfg.smtpHost,
      port: Number(cfg.smtpPort),
      secure: Number(cfg.smtpPort) === 465,
      auth: { user: cfg.smtpUser, pass: cfg.smtpPass },
    })
    const rows = Object.entries(lead)
      .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600">${k}</td><td style="padding:6px 12px">${esc(v) || '—'}</td></tr>`)
      .join('')
    tasks.push(transporter.sendMail({
      from: `"VD Vanchers Website" <${cfg.smtpUser}>`,
      to: cfg.leadEmailTo,
      replyTo: lead.email || undefined,
      subject: `New website enquiry — ${lead.name}`,
      html: `<h2>New website enquiry</h2><table border="1" cellspacing="0">${rows}</table>`,
    }))
  }

  if (!tasks.length) {
    // Nothing configured yet — log so leads aren't silently lost in development.
    console.warn('[consultation] No NUXT_SHEET_WEBHOOK_URL or SMTP configured. Lead:', lead)
    return { ok: true, delivered: false }
  }

  const results = await Promise.allSettled(tasks)
  const failed = results.filter(r => r.status === 'rejected') as PromiseRejectedResult[]
  failed.forEach(f => console.error('[consultation] delivery failed:', f.reason))

  if (failed.length === results.length) {
    throw createError({ statusCode: 502, statusMessage: 'We could not submit your request right now. Please call us directly.' })
  }
  return { ok: true, delivered: true }
})
