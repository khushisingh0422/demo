<script setup lang="ts">
defineProps<{ name: 'facebook' | 'instagram' | 'youtube' | 'linkedin' }>()
const paths = {
  facebook: 'M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-1.5h.01',
  youtube: 'M22 8.5a3 3 0 0 0-2-2C18.3 6 12 6 12 6s-6.3 0-8 .5a3 3 0 0 0-2 2A31 31 0 0 0 2 12a31 31 0 0 0 0 3.5 3 3 0 0 0 2 2c1.7.5 8 .5 8 .5s6.3 0 8-.5a3 3 0 0 0 2-2 31 31 0 0 0 0-7zM10 15V9l5 3-5 3z',
  linkedin: 'M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 6h4v2c.6-1.1 2-2.2 4-2.2 4 0 4.5 2.6 4.5 6V21h-4v-5.5c0-1.4 0-3.2-2-3.2s-2.4 1.5-2.4 3.1V21H10z',
}
</script>

<template>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="paths[name]" /></svg>
</template>
