export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'VD Vanchers | Luxury Farmhouses & Plots in Noida',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'VD Vanchers — luxury farmhouses, farm plots and residential plots in Noida, Yamuna Expressway, Vrindavan and Dehradun.' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@700;800&family=Playfair+Display:wght@500;600;700&display=swap' },
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
