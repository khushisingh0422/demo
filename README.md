# VD Vanchers — Nuxt website

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (.output/)
```

## Page sections (app.vue)
Header/nav (logo) → Hero slider (3 banners, auto every 5s) → Who We Are → Stats counters →
Projects → Testimonials → What We Offer (+ FAQ) → Consultation form → Footer

## Editing content
All text, numbers, images, projects and testimonials are in **`data/site.ts`**.
Items marked `PLACEHOLDER` (stats, project details, testimonials) are samples — replace with real data.
Images live in `public/images/`. Logo = VD Vanchers diamond mark (`components/BrandLogo.vue`); colours in `assets/css/main.css`.

## Consultation form → Google Sheet and/or Email
Copy `.env.example` to `.env` and fill **one or both**:

- **Google Sheet (recommended, free):** create a Sheet → Extensions → Apps Script → paste
  `scripts/google-apps-script.js` → Deploy as Web app (Execute as *Me*, Access *Anyone*) →
  put the URL in `NUXT_SHEET_WEBHOOK_URL`. Set `NOTIFY_EMAIL` in the script to also get an email per lead.
- **SMTP email:** fill `NUXT_SMTP_*` and `NUXT_LEAD_EMAIL_TO`.

If neither is set, leads are just logged to the server console.

Note: the form needs a server (Vercel, Netlify, Node host). `npm run generate` (static) won't run the API route.
