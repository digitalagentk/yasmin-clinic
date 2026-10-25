<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{ to: number; suffix?: string; duration?: number }>(),
  { suffix: '', duration: 1600 },
)

const el = ref<HTMLElement | null>(null)
const value = ref(0)
let observer: IntersectionObserver | null = null
let raf = 0

const run = () => {
  const start = performance.now()
  const tick = (now: number) => {
    const p = Math.min((now - start) / props.duration, 1)
    value.value = Math.round(props.to * (1 - Math.pow(1 - p, 3)))
    if (p < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        run()
        observer?.disconnect()
      }
    },
    { threshold: 0.4 },
  )
  if (el.value) observer.observe(el.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(raf)
})
</script>

<template>
  <span ref="el" dir="ltr">{{ value.toLocaleString('en-US') }}{{ suffix }}</span>
</template>