<script setup lang="ts">
import { brand } from '~/data/site'
</script>

<template>
  <a class="brand" href="#home" :aria-label="`${brand.name} home`">
    <span class="symbol"><span>{{ brand.mark }}</span></span>
    <span class="name">{{ brand.name }}<small>{{ brand.tagline }}</small></span>
  </a>
</template>

<style scoped>
.brand { display: flex; align-items: center; gap: 14px; color: var(--white); }
.symbol {
  width: 46px; height: 46px; border: 1px solid var(--gold); display: grid; place-items: center;
  color: var(--gold); font-family: var(--serif); font-size: 1.5rem; transform: rotate(45deg); flex: none;
}
.symbol span { transform: rotate(-45deg); }
.name { font-family: var(--display); font-weight: 800; letter-spacing: .13em; font-size: 1.12rem; line-height: 1.05; }
.name small { display: block; font-family: var(--sans); font-size: .48rem; letter-spacing: .32em; font-weight: 600; margin-top: 6px; text-transform: uppercase; }
@media (max-width: 680px) {
  .symbol { width: 38px; height: 38px; font-size: 1.25rem; }
  .name { font-size: 1rem; }
}
</style>
