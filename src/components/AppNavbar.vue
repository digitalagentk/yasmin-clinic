<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { site } from '../data/site'

const open = ref(false)
const scrolled = ref(false)

const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/about', label: 'من نحن' },
  { to: '/booking', label: 'احجز الآن' },
]

const onScroll = () => (scrolled.value = window.scrollY > 10)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition-all duration-300"
    :class="
      scrolled
        ? 'bg-white/90 shadow-lg shadow-lilac-200/40 backdrop-blur-md'
        : 'bg-white/70 backdrop-blur'
    "
  >
    <nav class="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
      <!-- الشعار -->
      <RouterLink to="/" class="flex items-center gap-3" @click="open = false">
        <span
          class="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-blush-400 to-lilac-500 text-white shadow-md"
        >
          <i class="fa-solid fa-tooth text-lg"></i>
        </span>
        <span class="leading-tight">
          <span class="block text-lg font-extrabold">{{ site.name }}</span>
          <span class="block text-xs text-lilac-600">{{ site.tagline }}</span>
        </span>
      </RouterLink>

      <!-- روابط سطح المكتب -->
      <ul class="hidden items-center gap-2 md:flex">
        <li v-for="l in links" :key="l.to">
          <RouterLink
            :to="l.to"
            class="rounded-full px-4 py-2 font-medium text-ink/80 transition hover:bg-blush-50 hover:text-blush-600"
            exact-active-class="!bg-blush-100 !text-blush-600 font-bold"
          >
            {{ l.label }}
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/auth" class="btn-primary !py-2.5">
            <i class="fa-regular fa-user"></i>
            تسجيل الدخول
          </RouterLink>
        </li>
      </ul>

      <!-- زر القائمة للجوال -->
      <button
        class="grid size-11 place-items-center rounded-2xl bg-lilac-50 text-lilac-700 md:hidden"
        :aria-expanded="open"
        aria-label="القائمة"
        @click="open = !open"
      >
        <i class="fa-solid" :class="open ? 'fa-xmark' : 'fa-bars'"></i>
      </button>
    </nav>

    <!-- قائمة الجوال -->
    <Transition name="page">
      <div v-if="open" class="border-t border-lilac-100 bg-white px-5 pb-5 md:hidden">
        <ul class="flex flex-col gap-1 pt-3">
          <li v-for="l in links" :key="l.to">
            <RouterLink
              :to="l.to"
              class="block rounded-2xl px-4 py-3 font-medium"
              exact-active-class="bg-blush-100 text-blush-600 font-bold"
              @click="open = false"
            >
              {{ l.label }}
            </RouterLink>
          </li>
          <li class="pt-2">
            <RouterLink to="/auth" class="btn-primary w-full" @click="open = false">
              تسجيل الدخول
            </RouterLink>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>