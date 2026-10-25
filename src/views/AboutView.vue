<script setup lang="ts">
import SectionTitle from '../components/SectionTitle.vue'
import SmartImage from '../components/SmartImage.vue'
import { images } from '../data/images.ts'

// أسماء وخبرات تجريبية، عدّليها بمعلومات فريقك الحقيقي
const doctors = [
  { name: 'د. سارة الأنصاري', role: 'استشارية تجميل وزراعة الأسنان', exp: 'خبرة 14 سنة', bio: 'متخصصة في تصميم الابتسامة والقشور الخزفية، وتؤمن أن كل ابتسامة تحكي قصة.' },
  { name: 'د. لينا الحربي', role: 'أخصائية تقويم الأسنان', exp: 'خبرة 10 سنوات', bio: 'خبيرة في التقويم الشفاف والمعدني، وتضع خطة مريحة لكل مريضة.' },
  { name: 'د. ريم القحطاني', role: 'طبيبة أسنان عامة وعلاج اللثة', exp: 'خبرة 8 سنوات', bio: 'تهتم بالوقاية والعلاج اللطيف، وتجعل زيارتك تجربة هادئة بلا خوف.' },
]

const values = [
  { icon: 'fa-heart', title: 'العناية أولاً', desc: 'نصغي إليكِ قبل أي إجراء ونشرح كل خطوة.' },
  { icon: 'fa-lock', title: 'خصوصية كاملة', desc: 'بيئة نسائية بالكامل تضمن راحتك.' },
  { icon: 'fa-microscope', title: 'تقنيات حديثة', desc: 'أجهزة متطورة لنتائج دقيقة وآمنة.' },
]
</script>

<template>
  <div>
    <!-- العنوان -->
    <section class="bg-linear-to-br from-blush-50 via-white to-lilac-50 py-16 text-center">
      <div class="mx-auto max-w-3xl px-5">
        <h1 v-motion-slide-bottom class="text-4xl font-extrabold md:text-5xl">من نحن</h1>
        <p v-motion-slide-bottom :delay="150" class="mt-5 text-lg leading-9 text-ink/70">
          عيادة ياسمين مساحة أُسست لتمنح المرأة تجربة أسنان مريحة وراقية، بكادر نسائي ورعاية تحترم خصوصيتها.
        </p>
      </div>
    </section>

    <!-- قصتنا -->
    <section class="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
      <div v-motion-pop-visible class="relative">
        <div class="absolute -inset-3 -rotate-2 rounded-[2rem] bg-linear-to-br from-lilac-200 to-blush-200"></div>
        <SmartImage :src="images.story" alt="طبيبة أسنان تفحص مريضة" class="relative aspect-[4/3] rounded-[2rem] shadow-xl" />
      </div>

      <div v-motion-slide-visible-bottom>
        <span class="mb-3 inline-block rounded-full bg-blush-100 px-4 py-1 text-sm font-bold text-blush-600">قصتنا</span>
        <h2 class="mb-4 text-3xl font-extrabold">رحلة بدأت بحلم بسيط</h2>
        <p class="mb-6 leading-8 text-ink/70">
          بدأنا برؤية واضحة: أن تجد كل امرأة عيادة تشعر فيها بالأمان والاهتمام. اليوم نخدم آلاف المريضات بخبرة وحنان وتقنيات تواكب أحدث ما في طب الأسنان.
        </p>
        <ul class="space-y-4">
          <li v-for="v in values" :key="v.title" class="flex gap-4">
            <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-lilac-100 text-lilac-600">
              <i :class="`fa-solid ${v.icon}`"></i>
            </span>
            <div>
              <p class="font-bold">{{ v.title }}</p>
              <p class="text-sm leading-7 text-ink/70">{{ v.desc }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- الطبيبات -->
    <section class="bg-linear-to-br from-lilac-50 to-blush-50 py-20">
      <div class="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="فريقنا" title="طبيباتنا المتخصصات" subtitle="خبرات تجمع بين العلم والرقة في التعامل." />

        <div class="grid gap-8 md:grid-cols-3">
          <article
            v-for="(d, i) in doctors"
            :key="d.name"
            v-motion-slide-visible-bottom
            :delay="i * 120"
            class="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-lilac-200/60"
          >
            <SmartImage
              :src="images.doctors[i]"
              :alt="`صورة ${d.name}`"
              :label="d.name"
              class="h-72 w-full"
            />
            <div class="p-6">
              <h3 class="text-xl font-bold">{{ d.name }}</h3>
              <p class="mt-1 text-sm font-medium text-blush-600">{{ d.role }}</p>
              <span class="mt-3 inline-flex items-center gap-2 rounded-full bg-lilac-50 px-3 py-1 text-xs font-bold text-lilac-700">
                <i class="fa-solid fa-award"></i> {{ d.exp }}
              </span>
              <p class="mt-4 text-sm leading-7 text-ink/70">{{ d.bio }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- قبل وبعد -->
    <section class="mx-auto max-w-6xl px-5 py-20">
      <SectionTitle
        eyebrow="النتائج"
        title="قبل وبعد"
        subtitle="تحولات حقيقية بابتسامات أنيقة وطبيعية."
      />

      <div class="grid gap-8 md:grid-cols-3">
        <article
          v-for="(c, i) in images.beforeAfter"
          :key="c.title"
          v-motion-slide-visible-bottom
          :delay="i * 120"
          class="rounded-3xl border border-lilac-100 bg-white p-4 shadow-sm"
        >
          <div class="grid grid-cols-2 gap-3">
            <div class="relative">
              <SmartImage :src="c.before" alt="قبل العلاج" label="ضع صورة «قبل» هنا" class="aspect-square rounded-2xl" />
              <span class="absolute start-2 top-2 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold text-white">قبل</span>
            </div>
            <div class="relative">
              <SmartImage :src="c.after" alt="بعد العلاج" label="ضع صورة «بعد» هنا" class="aspect-square rounded-2xl" />
              <span class="absolute start-2 top-2 rounded-full bg-blush-500 px-3 py-1 text-xs font-bold text-white">بعد</span>
            </div>
          </div>
          <h3 class="mt-4 text-center font-bold">{{ c.title }}</h3>
        </article>
      </div>

      <p class="mt-8 text-center text-sm text-ink/50">* تختلف النتائج من حالة لأخرى حسب التشخيص وخطة العلاج.</p>

      <div class="mt-10 text-center">
        <RouterLink to="/booking" class="btn-primary">
          <i class="fa-regular fa-calendar-check"></i> احجزي استشارتك
        </RouterLink>
      </div>
    </section>
  </div>
</template>