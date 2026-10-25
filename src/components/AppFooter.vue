<script setup lang="ts">
import { site } from '../data/site'

const year = new Date().getFullYear()
const quick = [
  { to: '/', label: 'الرئيسية' },
  { to: '/about', label: 'من نحن' },
  { to: '/booking', label: 'احجز الآن' },
  { to: '/auth', label: 'تسجيل الدخول' },
]
</script>

<template>
  <footer class="mt-16 bg-linear-to-b from-lilac-50 to-blush-50">
    <div class="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
      <div class="md:col-span-1">
        <div class="mb-4 flex items-center gap-3">
          <span
            class="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-blush-400 to-lilac-500 text-white"
          >
            <i class="fa-solid fa-tooth"></i>
          </span>
          <div class="leading-tight">
            <p class="font-extrabold">{{ site.name }}</p>
            <p class="text-xs text-lilac-600">{{ site.tagline }}</p>
          </div>
        </div>
        <p class="text-sm leading-7 text-ink/70">
          ابتسامتك تستحق رعاية راقية وخصوصية تامة، بأيدي طبيبات متخصصات.
        </p>
        <div class="mt-5 flex gap-2">
          <a
            v-for="s in ['instagram', 'snapchat', 'whatsapp', 'x-twitter']"
            :key="s"
            href="#"
            :aria-label="s"
            class="grid size-10 place-items-center rounded-full bg-white text-lilac-600 shadow-sm transition hover:-translate-y-1 hover:bg-blush-500 hover:text-white"
          >
            <i :class="`fa-brands fa-${s}`"></i>
          </a>
        </div>
      </div>

      <div>
        <h3 class="mb-4 font-bold">روابط سريعة</h3>
        <ul class="space-y-2 text-sm text-ink/70">
          <li v-for="q in quick" :key="q.to">
            <RouterLink :to="q.to" class="transition hover:text-blush-600">{{ q.label }}</RouterLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="mb-4 font-bold">ساعات العمل</h3>
        <ul class="space-y-2 text-sm text-ink/70">
          <li v-for="h in site.hours" :key="h.days">
            <span class="font-medium text-ink">{{ h.days }}:</span> {{ h.time }}
          </li>
        </ul>
      </div>

      <div>
        <h3 class="mb-4 font-bold">تواصلي معنا</h3>
        <ul class="space-y-3 text-sm text-ink/70">
          <li class="flex items-start gap-3">
            <i class="fa-solid fa-location-dot mt-1 text-blush-500"></i>{{ site.address }}
          </li>
          <li class="flex items-center gap-3">
            <i class="fa-solid fa-phone text-blush-500"></i>
            <span dir="ltr">{{ site.phone }}</span>
          </li>
          <li class="flex items-center gap-3">
            <i class="fa-regular fa-envelope text-blush-500"></i>{{ site.email }}
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-lilac-100 py-5 text-center text-sm text-ink/60">
      © {{ year }} {{ site.name }} {{ site.tagline }}. جميع الحقوق محفوظة.
    </div>
  </footer>
</template>