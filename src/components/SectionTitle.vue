<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; subtitle?: string }>()
</script>

<template>
  <div v-motion-slide-visible-bottom class="mx-auto mb-12 max-w-2xl text-center">
    <span
      v-if="eyebrow"
      class="mb-3 inline-block rounded-full bg-blush-100 px-4 py-1 text-sm font-bold text-blush-600"
    >
      {{ eyebrow }}
    </span>
    <h2 class="text-3xl font-extrabold leading-tight md:text-4xl">{{ title }}</h2>
    <p v-if="subtitle" class="mt-4 leading-8 text-ink/70">{{ subtitle }}</p>
  </div>
</template>