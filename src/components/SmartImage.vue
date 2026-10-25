<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ src?: string; alt: string; label?: string }>()
const failed = ref(!props.src)

watch(
  () => props.src,
  (v) => (failed.value = !v),
)
</script>

<template>
  <div class="relative overflow-hidden bg-linear-to-br from-blush-100 via-white to-lilac-100">
    <img
      v-if="!failed"
      :src="src"
      :alt="alt"
      loading="lazy"
      class="h-full w-full object-cover"
      @error="failed = true"
    />
    <div
      v-else
      class="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-lilac-500"
    >
      <i class="fa-solid fa-tooth text-3xl"></i>
      <span class="text-sm font-medium">{{ label ?? alt }}</span>
    </div>
  </div>
</template>