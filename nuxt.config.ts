export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Dvayu Farms | Luxury Farmhouses in Sector 135, Noida',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Dvayu Farms — premium luxury farmhouses in Sector 135, Noida. Countryside living just minutes from Delhi NCR.' },
      ],
      link: [
        { rel: 'icon', href: '/images/Dvayu-logo-scaled.jpg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Montserrat:wght@300;400;500;600&display=swap' },
      ],
    },
  },
  runtimeConfig: {
    // Set these in .env (see .env.example). Server-only — never exposed to the browser.
    sheetWebhookUrl: '',   // NUXT_SHEET_WEBHOOK_URL
    smtpHost: '',          // NUXT_SMTP_HOST
    smtpPort: 465,         // NUXT_SMTP_PORT
    smtpUser: '',          // NUXT_SMTP_USER
    smtpPass: '',          // NUXT_SMTP_PASS
    leadEmailTo: '',       // NUXT_LEAD_EMAIL_TO
  },
})
