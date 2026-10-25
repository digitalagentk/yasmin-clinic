<script setup lang="ts">
import SectionTitle from '../components/SectionTitle.vue'
import SmartImage from '../components/SmartImage.vue'
import CountUp from '../components/CountUp.vue'
import { images } from '../data/images.ts'

const services = [
  { title: 'تجميل الأسنان', icon: 'fa-wand-magic-sparkles', type: 'تجميل', desc: 'ابتسامة هوليوود، قشور خزفية وتبييض آمن بنتائج طبيعية تناسب ملامحك.' },
  { title: 'تقويم الأسنان', icon: 'fa-gem', type: 'تقويم', desc: 'تقويم معدني وشفاف بخطط مريحة تراعي مناسباتك وجدول حياتك.' },
  { title: 'زراعة الأسنان', icon: 'fa-seedling', type: 'زراعة', desc: 'زراعة بأحدث التقنيات لتعويض الأسنان المفقودة بثبات وراحة.' },
  { title: 'التنظيف والتبييض', icon: 'fa-droplet', type: 'تنظيف', desc: 'تنظيف عميق وإزالة التصبغات للحفاظ على لمعان ابتسامتك.' },
  { title: 'الفحص العام', icon: 'fa-stethoscope', type: 'فحص عام', desc: 'فحص شامل مع أشعة رقمية وخطة علاج واضحة وشفافة.' },
  { title: 'علاج اللثة والعصب', icon: 'fa-heart-pulse', type: 'فحص عام', desc: 'علاج دقيق بلا ألم يحافظ على أسنانك الطبيعية قدر الإمكان.' },
]

const features = [
  { icon: 'fa-user-doctor', title: 'طبيبات متخصصات', desc: 'كادر نسائي بالكامل لراحتك وخصوصيتك.' },
  { icon: 'fa-shield-heart', title: 'تعقيم عالي المستوى', desc: 'أدوات معقمة ومعايير صارمة لسلامتك.' },
  { icon: 'fa-spa', title: 'علاج بلا ألم', desc: 'تقنيات حديثة وتخدير لطيف لتجربة مريحة.' },
  { icon: 'fa-calendar-check', title: 'مواعيد مرنة', desc: 'جدولة تناسب التزاماتك مع تذكير بالموعد.' },
]

const stats = [
  { to: 5000, suffix: '+', label: 'مريضة سعيدة' },
  { to: 12, suffix: '+', label: 'سنة خبرة' },
  { to: 6, suffix: '', label: 'طبيبات متخصصات' },
  { to: 98, suffix: '%', label: 'نسبة الرضا' },
]

const testimonials = [
  { name: 'نورة العتيبي', role: 'تجميل أسنان', text: 'تجربة راقية من أول لحظة. الطبيبة شرحت لي كل خطوة والنتيجة فاقت توقعاتي، وأخيراً أبتسم بثقة!' },
  { name: 'ريم السالم', role: 'تقويم شفاف', text: 'الخصوصية والراحة كانتا أهم شيء بالنسبة لي، وهذا بالضبط ما وجدته هنا. الكادر لطيف جداً.' },
  { name: 'هند الخالدي', role: 'زراعة أسنان', text: 'كنت خائفة من الزراعة، لكن الإجراء كان سلساً وبلا ألم تقريباً. أنصح كل صديقاتي بالعيادة.' },
]
</script>

<template>
  <div>
    <!-- ================= Hero ================= -->
    <section class="relative overflow-hidden bg-linear-to-br from-blush-50 via-white to-lilac-50">
      <div class="pointer-events-none absolute -top-24 -start-24 size-96 rounded-full bg-blush-200/60 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-24 -end-24 size-96 rounded-full bg-lilac-200/60 blur-3xl"></div>

      <div class="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span
            v-motion-pop
            class="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-blush-600 shadow-sm"
          >
            <i class="fa-solid fa-sparkles"></i> عيادة نسائية بالكامل
          </span>

          <h1 v-motion-slide-bottom :delay="100" class="text-4xl font-extrabold leading-[1.3] md:text-5xl lg:text-6xl">
            ابتسامتك الأجمل
            <span class="bg-linear-to-l from-blush-500 to-lilac-600 bg-clip-text text-transparent">تبدأ هنا</span>
          </h1>

          <p v-motion-slide-bottom :delay="250" class="mt-6 max-w-xl text-lg leading-9 text-ink/70">
            رعاية أسنان راقية وخصوصية تامة بأيدي طبيبات متخصصات، في أجواء هادئة وناعمة تشعرك بالراحة من أول زيارة.
          </p>

          <div v-motion-slide-bottom :delay="400" class="mt-9 flex flex-wrap gap-4">
            <RouterLink to="/booking" class="btn-primary">
              <i class="fa-regular fa-calendar-check"></i> احجز الآن
            </RouterLink>
            <RouterLink :to="{ path: '/auth', query: { mode: 'register' } }" class="btn-outline">
              <i class="fa-solid fa-user-plus"></i> سجل الآن
            </RouterLink>
          </div>

          <div v-motion-fade :delay="600" class="mt-10 flex items-center gap-6 text-sm text-ink/70">
            <span class="flex items-center gap-2"><i class="fa-solid fa-star text-amber-400"></i> تقييم 4.9</span>
            <span class="flex items-center gap-2"><i class="fa-solid fa-shield-heart text-blush-500"></i> خصوصية تامة</span>
          </div>
        </div>

        <div v-motion-pop :delay="300" class="relative">
          <div class="absolute -inset-4 rotate-3 rounded-[2.5rem] bg-linear-to-br from-blush-200 to-lilac-200"></div>
          <SmartImage
            :src="images.hero"
            alt="مريضة تبتسم بثقة عند طبيبة الأسنان"
            class="relative aspect-[4/5] rounded-[2.5rem] shadow-2xl shadow-lilac-300/50"
          />
          <div class="absolute -bottom-5 -start-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl">
            <span class="grid size-11 place-items-center rounded-full bg-blush-100 text-blush-600">
              <i class="fa-solid fa-heart"></i>
            </span>
            <div class="leading-tight">
              <p class="font-extrabold">+5000</p>
              <p class="text-xs text-ink/60">ابتسامة جميلة</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= الخدمات ================= -->
    <section class="mx-auto max-w-6xl px-5 py-20">
      <SectionTitle
        eyebrow="خدماتنا"
        title="رعاية متكاملة لابتسامتك"
        subtitle="نجمع بين أحدث التقنيات واللمسة الأنثوية الحانية لنقدم لكِ أفضل تجربة علاج."
      />

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="(s, i) in services"
          :key="s.title"
          v-motion-slide-visible-bottom
          :delay="i * 80"
          :to="{ path: '/booking', query: { type: s.type } }"
          class="group rounded-3xl border border-lilac-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blush-200 hover:shadow-xl hover:shadow-blush-200/50"
        >
          <span
            class="mb-5 grid size-14 place-items-center rounded-2xl bg-linear-to-br from-blush-100 to-lilac-100 text-xl text-blush-600 transition group-hover:from-blush-500 group-hover:to-lilac-500 group-hover:text-white"
          >
            <i :class="`fa-solid ${s.icon}`"></i>
          </span>
          <h3 class="mb-2 text-xl font-bold">{{ s.title }}</h3>
          <p class="leading-8 text-ink/70">{{ s.desc }}</p>
          <span class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blush-600">
            احجزي الآن <i class="fa-solid fa-arrow-left transition group-hover:-translate-x-1"></i>
          </span>
        </RouterLink>
      </div>
    </section>

    <!-- ================= لماذا تختارنا + إحصائيات ================= -->
    <section class="bg-linear-to-br from-lilac-50 to-blush-50 py-20">
      <div class="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="لماذا تختارنا"
          title="لأنكِ تستحقين الأفضل"
          subtitle="تفاصيل صغيرة تصنع فرقاً كبيراً في تجربتك."
        />

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(f, i) in features"
            :key="f.title"
            v-motion-slide-visible-bottom
            :delay="i * 100"
            class="rounded-3xl bg-white p-6 text-center shadow-sm"
          >
            <span class="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-blush-100 text-xl text-blush-600">
              <i :class="`fa-solid ${f.icon}`"></i>
            </span>
            <h3 class="mb-2 font-bold">{{ f.title }}</h3>
            <p class="text-sm leading-7 text-ink/70">{{ f.desc }}</p>
          </div>
        </div>

        <div class="mt-14 grid grid-cols-2 gap-6 rounded-3xl bg-linear-to-br from-blush-500 to-lilac-600 p-8 text-center text-white shadow-xl shadow-lilac-300/40 md:grid-cols-4">
          <div v-for="s in stats" :key="s.label">
            <p class="text-4xl font-extrabold md:text-5xl"><CountUp :to="s.to" :suffix="s.suffix" /></p>
            <p class="mt-2 text-white/85">{{ s.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= آراء المريضات ================= -->
    <section class="mx-auto max-w-6xl px-5 py-20">
      <SectionTitle eyebrow="آراء المريضات" title="ماذا تقول عنا مريضاتنا؟" />

      <div class="grid gap-6 md:grid-cols-3">
        <figure
          v-for="(t, i) in testimonials"
          :key="t.name"
          v-motion-slide-visible-bottom
          :delay="i * 120"
          class="relative rounded-3xl border border-lilac-100 bg-white p-7 shadow-sm"
        >
          <i class="fa-solid fa-quote-right absolute end-6 top-6 text-3xl text-blush-100"></i>
          <div class="mb-4 flex gap-1 text-amber-400">
            <i v-for="n in 5" :key="n" class="fa-solid fa-star text-sm"></i>
          </div>
          <blockquote class="leading-8 text-ink/80">{{ t.text }}</blockquote>
          <figcaption class="mt-6 flex items-center gap-3">
            <span class="grid size-11 place-items-center rounded-full bg-linear-to-br from-blush-400 to-lilac-500 font-bold text-white">
              {{ t.name.charAt(0) }}
            </span>
            <span class="leading-tight">
              <span class="block font-bold">{{ t.name }}</span>
              <span class="block text-xs text-lilac-600">{{ t.role }}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- ================= المعرض ================= -->
    <section class="mx-auto max-w-6xl px-5 pb-20">
      <SectionTitle
        eyebrow="معرض الصور"
        title="جولة داخل عيادتنا"
        subtitle="أجواء ناعمة ونظيفة صُممت لتمنحك الطمأنينة."
      />

      <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div
          v-for="(g, i) in images.gallery"
          :key="g.alt + i"
          v-motion-pop-visible
          :delay="i * 80"
          class="group overflow-hidden rounded-3xl shadow-sm"
          :class="i === 0 || i === 5 ? 'md:row-span-2' : ''"
        >
          <SmartImage
            :src="g.src"
            :alt="g.alt"
            class="h-full min-h-48 w-full transition duration-500 group-hover:scale-105 md:min-h-56"
          />
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="mx-auto max-w-6xl px-5 pb-8">
      <div
        v-motion-slide-visible-bottom
        class="rounded-[2rem] bg-linear-to-br from-blush-100 via-white to-lilac-100 p-10 text-center shadow-sm md:p-14"
      >
        <h2 class="text-3xl font-extrabold md:text-4xl">جاهزة لابتسامة تحبينها؟</h2>
        <p class="mx-auto mt-4 max-w-xl leading-8 text-ink/70">
          احجزي موعدك اليوم وابدئي رحلتك مع فريق يهتم بكِ.
        </p>
        <RouterLink to="/booking" class="btn-primary mt-8">
          <i class="fa-regular fa-calendar-check"></i> احجز موعدك الآن
        </RouterLink>
      </div>
    </section>
  </div>
</template>