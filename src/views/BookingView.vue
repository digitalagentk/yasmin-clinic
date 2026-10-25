<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { bookingTypes, site } from '../data/site'

const route = useRoute()

const form = reactive({ name: '', phone: '', date: '', type: '' })
const errors = reactive<Record<string, string>>({})
const loading = ref(false)
const done = ref(false)

// تاريخ اليوم محلياً بصيغة YYYY-MM-DD
const d = new Date()
const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

// اختيار النوع مسبقاً إن جاء من صفحة الخدمات
const q = route.query.type
if (typeof q === 'string' && (bookingTypes as readonly string[]).includes(q)) form.type = q

const validate = () => {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (form.name.trim().length < 3) errors.name = 'يرجى إدخال الاسم (3 أحرف على الأقل)'
  if (!/^\+?[\d\s-]{8,16}$/.test(form.phone.trim())) errors.phone = 'يرجى إدخال رقم هاتف صحيح'
  if (!form.date) errors.date = 'يرجى اختيار التاريخ'
  else if (form.date < today) errors.date = 'لا يمكن اختيار تاريخ سابق'
  if (!form.type) errors.type = 'يرجى اختيار نوع الحجز'
  return Object.keys(errors).length === 0
}

const submit = () => {
  if (!validate()) return
  loading.value = true
  // واجهة أمامية فقط: محاكاة الإرسال
  setTimeout(() => {
    loading.value = false
    done.value = true
  }, 900)
}

const reset = () => {
  form.name = form.phone = form.date = form.type = ''
  done.value = false
}
</script>

<template>
  <div class="bg-linear-to-br from-blush-50 via-white to-lilac-50 py-14">
    <div class="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-5">
      <!-- معلومات جانبية -->
      <aside v-motion-slide-bottom class="rounded-3xl bg-linear-to-br from-blush-500 to-lilac-600 p-8 text-white shadow-xl shadow-lilac-300/40 lg:col-span-2">
        <h1 class="text-3xl font-extrabold">احجزي موعدك</h1>
        <p class="mt-3 leading-8 text-white/85">
          املئي النموذج وسيتواصل معك فريقنا لتأكيد الموعد في أقرب وقت.
        </p>

        <ul class="mt-8 space-y-5">
          <li class="flex items-center gap-4">
            <span class="grid size-11 place-items-center rounded-full bg-white/20"><i class="fa-solid fa-phone"></i></span>
            <span dir="ltr">{{ site.phone }}</span>
          </li>
          <li class="flex items-start gap-4">
            <span class="grid size-11 shrink-0 place-items-center rounded-full bg-white/20"><i class="fa-solid fa-location-dot"></i></span>
            <span class="leading-7">{{ site.address }}</span>
          </li>
          <li class="flex items-start gap-4">
            <span class="grid size-11 shrink-0 place-items-center rounded-full bg-white/20"><i class="fa-regular fa-clock"></i></span>
            <span class="space-y-1 leading-7">
              <span v-for="h in site.hours" :key="h.days" class="block">{{ h.days }}: {{ h.time }}</span>
            </span>
          </li>
        </ul>
      </aside>

      <!-- النموذج -->
      <section v-motion-slide-bottom :delay="150" class="rounded-3xl bg-white p-8 shadow-xl shadow-lilac-200/50 lg:col-span-3">
        <Transition name="page" mode="out-in">
          <!-- نجاح -->
          <div v-if="done" key="ok" class="py-10 text-center">
            <span class="mx-auto mb-5 grid size-20 place-items-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
              <i class="fa-solid fa-check"></i>
            </span>
            <h2 class="text-2xl font-extrabold">تم استلام طلب الحجز 🌸</h2>
            <p class="mx-auto mt-3 max-w-md leading-8 text-ink/70">
              شكراً {{ form.name }}، سنتواصل معك على الرقم {{ form.phone }} لتأكيد موعد
              «{{ form.type }}» بتاريخ {{ form.date }}.
            </p>
            <button class="btn-outline mt-8" @click="reset">حجز موعد آخر</button>
          </div>

          <!-- النموذج -->
          <form v-else key="form" class="space-y-5" novalidate @submit.prevent="submit">
            <div>
              <label for="name" class="mb-2 block text-sm font-bold">الاسم الكامل</label>
              <input id="name" v-model="form.name" type="text" class="field" :class="{ 'is-invalid': errors.name }" placeholder="مثال: نورة أحمد" autocomplete="name" />
              <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
            </div>

            <div>
              <label for="phone" class="mb-2 block text-sm font-bold">رقم الهاتف</label>
              <input id="phone" v-model="form.phone" type="tel" dir="ltr" class="field text-right" :class="{ 'is-invalid': errors.phone }" placeholder="+000 000 000 0000" autocomplete="tel" />
              <p v-if="errors.phone" class="mt-1 text-sm text-red-500">{{ errors.phone }}</p>
            </div>

            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label for="date" class="mb-2 block text-sm font-bold">تاريخ الموعد</label>
                <input id="date" v-model="form.date" type="date" :min="today" class="field" :class="{ 'is-invalid': errors.date }" />
                <p v-if="errors.date" class="mt-1 text-sm text-red-500">{{ errors.date }}</p>
              </div>

              <div>
                <label for="type" class="mb-2 block text-sm font-bold">نوع الحجز</label>
                <select id="type" v-model="form.type" class="field" :class="{ 'is-invalid': errors.type }">
                  <option value="" disabled>اختاري نوع الحجز</option>
                  <option v-for="t in bookingTypes" :key="t" :value="t">{{ t }}</option>
                </select>
                <p v-if="errors.type" class="mt-1 text-sm text-red-500">{{ errors.type }}</p>
              </div>
            </div>

            <button type="submit" class="btn-primary w-full" :disabled="loading">
              <i v-if="loading" class="fa-solid fa-spinner fa-spin"></i>
              <i v-else class="fa-regular fa-calendar-check"></i>
              {{ loading ? 'جارٍ الإرسال...' : 'تأكيد الحجز' }}
            </button>
          </form>
        </Transition>
      </section>
    </div>
  </div>
</template>