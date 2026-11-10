# VD Vanchers — Nuxt website

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (.output/)
```

## Page sections (app.vue)
Header/nav (logo) → Hero slider (3 banners, auto every 5s) → Who We Are → Stats counters →
Projects → Testimonials → Our Expertise (what we offer) → Enquiry form → Footer

## Editing content
All text, numbers, images, projects and testimonials are in **`data/site.ts`**.
Items marked `PLACEHOLDER` (2 of the 3 testimonials) and stats marked `*` need confirming.
Images are Unsplash stock photos (from the concept) — swap the URLs in `data/site.ts` for real project photos.
The logo is the CSS diamond mark in `components/BrandLogo.vue`.

## Consultation form → Google Sheet and/or Email
Copy `.env.example` to `.env` and fill **one or both**:

- **Google Sheet (recommended, free):** create a Sheet → Extensions → Apps Script → paste
  `scripts/google-apps-script.js` → Deploy as Web app (Execute as *Me*, Access *Anyone*) →
  put the URL in `NUXT_SHEET_WEBHOOK_URL`. Set `NOTIFY_EMAIL` in the script to also get an email per lead.
- **SMTP email:** fill `NUXT_SMTP_*` and `NUXT_LEAD_EMAIL_TO`.

If neither is set, leads are just logged to the server console.

Note: the form needs a server (Vercel, Netlify, Node host). `npm run generate` (static) won't run the API route.
