<script setup lang="ts">
import projectsData from '~/data/projects.json'

const projects = projectsData

useHead({
  title: 'Projects | VD Vanchers — Premium Farmhouse Living',
  meta: [{
    name: 'description',
    content: 'Browse premium residential plots, farmhouse communities, and investment-focused real estate projects by VD Vanchers.',
  }],
})

const cities = [...new Set(projects.map((project) => project.city))]
const categoryTabs = ['All', ...cities]
const activeTab = ref('All')

const visibleProjects = computed(() =>
  activeTab.value === 'All' ? projects : projects.filter((project) => project.city === activeTab.value),
)

// Hero ke liye high-resolution photo (1920px). Apni khud ki drone/site photo lagani ho to
// is URL ki jagah '/images/hero-projects.jpg' (public folder) likh do.
const HERO_IMAGE =
  'https://static.wixstatic.com/media/84770f_0018c709d8b74dfa93fd0cd11e139b8c~mv2_d_5760_3840_s_4_2.jpg/v1/fill/w_1920,h_1280,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/84770f_0018c709d8b74dfa93fd0cd11e139b8c~mv2_d_5760_3840_s_4_2.jpg'
const countFor = (tab: string) =>
  tab === 'All' ? projects.length : projects.filter((p) => p.city === tab).length
</script>

<template>
  <main class="projects-page">
    <section class="hero">
      <img class="hero-bg" :src="HERO_IMAGE" alt="" fetchpriority="high" />
      <div class="container hero-inner">
        <h1>Land and farmhouses worth coming home to.</h1>
        <p>
          Residential plots and farmhouse communities across Noida, Vrindavan, Dehradun and the
          Yamuna Expressway corridor, chosen for lifestyle and long-term value.
        </p>

        <div class="finder">
          <label class="finder-field">
            <span>Location</span>
            <select v-model="activeTab">
              <option v-for="tab in categoryTabs" :key="tab" :value="tab">
                {{ tab === 'All' ? 'All locations' : tab }}
              </option>
            </select>
          </label>
          <div class="finder-field static">
            <span>Available</span>
            <strong>{{ visibleProjects.length }} {{ visibleProjects.length === 1 ? 'project' : 'projects' }}</strong>
          </div>
          <NuxtLink to="/contact" class="btn-gold">Book a site visit</NuxtLink>
        </div>
      </div>
    </section>

    <section class="trust">
      <div class="container trust-inner">
        <div><strong>700+</strong><span>farmhouses developed</span></div>
        <div><strong>{{ cities.length }}</strong><span>high-growth locations</span></div>
        <div><strong>{{ projects.length }}</strong><span>projects</span></div>
        <NuxtLink to="/about" class="trust-link">Our story</NuxtLink>
      </div>
    </section>

    <section class="listing">
      <div class="container">
        <div class="header-row">
          <h2>Handpicked spaces for modern living</h2>
          <div class="tabs" role="tablist" aria-label="Project locations">
            <button
              v-for="tab in categoryTabs"
              :key="tab"
              type="button"
              role="tab"
              :class="{ on: activeTab === tab }"
              :aria-selected="activeTab === tab"
              @click="activeTab = tab"
            >
              {{ tab }} <sup>{{ countFor(tab) }}</sup>
            </button>
          </div>
        </div>

        <div class="project-grid">
          <NuxtLink
            v-for="project in visibleProjects"
            :key="project.slug"
            :to="{ name: 'projects-slug', params: { slug: project.slug } }"
            class="project-card"
          >
            <div class="image-wrap">
              <img :src="project.cardImage || project.image" :alt="project.name" loading="lazy" />
              <span class="status">{{ project.status }}</span>
              <div class="price-tag">
                <small>Starts from</small>
                <strong>{{ project.price }}</strong>
              </div>
            </div>

            <div class="project-body">
              <p class="type">{{ project.type }}</p>
              <h3>{{ project.name }}</h3>
              <p class="location">
                <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                  <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
                </svg>
                {{ project.location }}
              </p>
              <p class="summary">{{ project.shortSummary }}</p>
              <div class="footer-row">
                <span>View details</span>
                <span class="arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.projects-page {
  background: #faf8f4;
  color: var(--navy-900);
}

/* HERO */
.hero {
  position: relative;
  min-height: 86vh;
  display: flex;
  align-items: center;
  padding: 130px 0 160px;
  color: #fff;
  background: #1d1b18;
  overflow: visible;
  isolation: isolate;
}
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
}
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    linear-gradient(to right, rgba(14, 12, 9, 0.68) 0%, rgba(14, 12, 9, 0.3) 48%, rgba(14, 12, 9, 0.05) 100%),
    linear-gradient(to top, rgba(14, 12, 9, 0.5) 0%, rgba(14, 12, 9, 0) 40%),
    linear-gradient(to bottom, rgba(14, 12, 9, 0.35) 0%, rgba(14, 12, 9, 0) 22%);
}
.hero-inner {
  position: relative;
  width: 100%;
}
.hero h1 {
  max-width: 760px;
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(40px, 5.6vw, 80px);
  line-height: 1.02;
  letter-spacing: -0.01em;
}
.hero p {
  max-width: 560px;
  margin-top: 22px;
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

/* FINDER */
.finder {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -190px;
  display: grid;
  grid-template-columns: 1.2fr 1fr auto;
  align-items: stretch;
  max-width: 860px;
  background: var(--white);
  color: var(--navy-900);
  border-radius: 18px;
  box-shadow: 0 30px 60px -20px rgba(14, 12, 9, 0.45);
  overflow: hidden;
}
.finder-field {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 18px 26px;
  border-right: 1px solid var(--line, #e7e1d6);
}
.finder-field span {
  font-size: 12px;
  color: var(--muted, #6b7280);
}
.finder-field select,
.finder-field strong {
  border: 0;
  background: transparent;
  font: 600 18px var(--serif);
  color: var(--navy-900);
  outline: none;
  cursor: pointer;
  padding: 0;
}
.finder-field.static strong {
  cursor: default;
}
.finder-field:focus-within {
  background: #faf8f4;
}
.btn-gold {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 34px;
  background: var(--gold);
  color: var(--navy-900);
  font: 700 14px var(--sans);
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: filter 0.2s ease;
}
.btn-gold:hover {
  filter: brightness(1.08);
}
.btn-gold:focus-visible,
.tabs button:focus-visible,
.project-card:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
}

/* TRUST STRIP */
.trust {
  padding: 230px 0 44px;
  margin-top: -190px;
  background: #faf8f4;
}
.trust-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px 56px;
  padding-top: 20px;
}
.trust-inner div {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.trust-inner strong {
  font: 500 34px var(--serif);
  color: var(--navy-900);
}
.trust-inner span {
  font-size: 14px;
  color: var(--muted, #6b7280);
}
.trust-link {
  margin-left: auto;
  font: 600 14px var(--sans);
  color: var(--navy-900);
  text-decoration: underline;
  text-decoration-color: var(--gold);
  text-underline-offset: 6px;
  text-decoration-thickness: 2px;
}

/* LISTING */
.listing {
  padding: 40px 0 110px;
}
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 40px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line, #e7e1d6);
}
.header-row h2 {
  max-width: 520px;
  font: 500 clamp(30px, 3.6vw, 46px) / 1.1 var(--serif);
}
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 26px;
}
.tabs button {
  position: relative;
  padding: 8px 0;
  border: 0;
  background: none;
  font: 600 15px var(--sans);
  color: var(--muted, #6b7280);
  cursor: pointer;
  transition: color 0.2s ease;
}
.tabs button sup {
  font-size: 11px;
  margin-left: 2px;
}
.tabs button::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -19px;
  height: 2px;
  background: var(--gold);
  transform: scaleX(0);
  transition: transform 0.25s ease;
}
.tabs button:hover,
.tabs button.on {
  color: var(--navy-900);
}
.tabs button.on::after {
  transform: scaleX(1);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px 30px;
}
.project-card {
  display: flex;
  flex-direction: column;
  color: inherit;
  text-decoration: none;
}
.image-wrap {
  position: relative;
  aspect-ratio: 4 / 3.3;
  overflow: hidden;
  border-radius: 6px;
  background: #e7e1d6;
}
.image-wrap::after {
  content: '';
  position: absolute;
  inset: 45% 0 0;
  background: linear-gradient(180deg, transparent, rgba(14, 12, 9, 0.75));
  pointer-events: none;
}
.image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}
.project-card:hover .image-wrap img {
  transform: scale(1.05);
}
.status {
  position: absolute;
  z-index: 1;
  top: 14px;
  left: 14px;
  padding: 6px 12px;
  border-radius: 3px;
  background: var(--gold);
  color: var(--navy-900);
  font: 700 12px var(--sans);
}
.price-tag {
  position: absolute;
  z-index: 1;
  left: 18px;
  bottom: 16px;
  color: var(--white);
}
.price-tag small {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.78);
}
.price-tag strong {
  font: 500 24px var(--serif);
}

.project-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px 2px 0;
}
.type {
  font-size: 13px;
  color: #9a7b3f;
  font-weight: 600;
}
.project-body h3 {
  margin-top: 6px;
  font: 500 28px / 1.15 var(--serif);
  color: var(--navy-900);
}
.location {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  font-size: 14px;
  color: var(--muted, #6b7280);
}
.location svg {
  flex: none;
  color: var(--gold);
}
.summary {
  margin-top: 12px;
  flex: 1;
  font-size: 15px;
  line-height: 1.6;
  color: var(--muted, #6b7280);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--line, #e7e1d6);
  font: 600 14px var(--sans);
  color: var(--navy-900);
}
.arrow {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--line, #e7e1d6);
  transition: background 0.25s ease, border-color 0.25s ease;
}
.project-card:hover .arrow {
  background: var(--gold);
  border-color: var(--gold);
}

@media (max-width: 1100px) {
  .project-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 800px) {
  .hero {
    min-height: 0;
    padding: 90px 0 60px;
  }
  .finder {
    position: static;
    margin-top: 34px;
    grid-template-columns: 1fr;
  }
  .finder-field {
    border-right: 0;
    border-bottom: 1px solid var(--line, #e7e1d6);
  }
  .btn-gold {
    padding: 18px;
  }
  .trust {
    margin-top: 0;
    padding-top: 24px;
  }
  .trust-link {
    margin-left: 0;
  }
  .header-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .tabs button::after {
    bottom: 0;
  }
  .project-grid {
    grid-template-columns: 1fr;
  }
}
@media (prefers-reduced-motion: reduce) {
  .image-wrap img,
  .tabs button::after,
  .arrow {
    transition: none;
  }
  .project-card:hover .image-wrap img {
    transform: none;
  }
}
</style>