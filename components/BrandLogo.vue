<script setup lang="ts">
import { brand } from '~/data/site'
defineProps<{ dark?: boolean }>()
</script>

<template>
  <a class="brand" :class="{ dark }" href="#home" :aria-label="`${brand.name} home`">
    <img class="crest" :src="brand.logo" :alt="`${brand.name} logo`" width="440" height="440" />
    <span class="name">{{ brand.name }}<small>{{ brand.tagline }}</small></span>
  </a>
</template>

<style scoped>
.brand { display: flex; align-items: center; gap: 14px; color: var(--white); }
.brand.dark { color: var(--navy-900); }
.crest {
  width: 72px; height: 72px; object-fit: contain; flex: none;
  filter: drop-shadow(0 6px 10px rgba(15, 28, 46, .18));
  transition: transform .4s ease;
}
.brand:hover .crest { transform: translateY(-2px) scale(1.03); }
.name { font-family: var(--display); font-weight: 800; letter-spacing: .13em; font-size: 1.15rem; line-height: 1.05; }
.name small { display: block; font-family: var(--sans); font-size: .5rem; letter-spacing: .32em; font-weight: 600; margin-top: 6px; text-transform: uppercase; opacity: .8; }
@media (max-width: 680px) {
  .crest { width: 54px; height: 54px; }
  .name { font-size: 1rem; }
}
</style>
