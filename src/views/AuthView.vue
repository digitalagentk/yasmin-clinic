<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

type Mode = 'login' | 'register'

const route = useRoute()
const mode = ref<Mode>(route.query.mode === 'register' ? 'register' : 'login')

// "سجل الآن" من الصفحة الرئيسية يفتح تبويب إنشاء الحساب
watch(
  () => route.query.mode,
  (m) => (mode.value = m === 'register' ? 'register' : 'login'),
)

const form = reactive({ name: '', phone: '', email: '', password: '', confirm: '' })
const errors = reactive<Record<string, string>>({})
const showPass = ref(false)
const loading = ref(false)
const success = ref('')

const clear = () => {
  Object.keys(errors).forEach((k) => delete errors[k])
  success.value = ''
}

const switchMode = (m: Mode) => {
  mode.value = m
  clear()
}

const validate = () => {
  clear()
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  if (mode.value === 'register') {
    if (form.name.trim().length < 3) errors.name = 'يرجى إدخال الاسم الكامل'
    if (!/^\+?[\d\s-]{8,16}$/.test(form.phone.trim())) errors.phone = 'رقم الهاتف غير صحيح'
  }
  if (!emailOk) errors.email = 'البريد الإلكتروني غير صحيح'
  if (form.password.length < 6) errors.password = 'كلمة المرور 6 أحرف على الأقل'
  if (mode.value === 'register' && form.confirm !== form.password)
    errors.confirm = 'كلمتا المرور غير متطابقتين'
  return Object.keys(errors).length === 0
}

const submit = () => {
  if (!validate()) return
  loading.value = true
  // واجهة أمامية فقط: محاكاة
  setTimeout(() => {
    loading.value = false
    success.value =
      mode.value === 'login'
        ? 'تم تسجيل الدخول بنجاح (محاكاة) 🌸'
        : 'تم إنشاء حسابك بنجاح (محاكاة) 🌸'
  }, 900)
}
</script>

<template>
  <div class="relative overflow-hidden bg-linear-to-br from-blush-50 via-white to-lilac-50 py-14">
    <div class="pointer-events-none absolute -top-20 -end-20 size-80 rounded-full bg-lilac-200/60 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-20 -start-20 size-80 rounded-full bg-blush-200/60 blur-3xl"></div>

    <div v-motion-pop class="relative mx-auto max-w-md px-5">
      <div class="rounded-3xl bg-white p-8 shadow-2xl shadow-lilac-200/60">
        <div class="mb-6 text-center">
          <span class="mx-auto mb-3 grid size-14 place-items-center rounded-2xl bg-linear-to-br from-blush-400 to-lilac-500 text-xl text-white">
            <i class="fa-solid fa-tooth"></i>
          </span>
          <h1 class="text-2xl font-extrabold">
            {{ mode === 'login' ? 'مرحباً بعودتك' : 'أهلاً بكِ في ياسمين' }}
          </h1>
          <p class="mt-1 text-sm text-ink/60">
            {{ mode === 'login' ? 'سجلي دخولك لمتابعة مواعيدك' : 'أنشئي حسابك في دقيقة واحدة' }}
          </p>
        </div>

        <!-- تبديل الوضع -->
        <div class="mb-6 grid grid-cols-2 rounded-full bg-lilac-50 p-1">
          <button
            v-for="m in [{ k: 'login', l: 'تسجيل الدخول' }, { k: 'register', l: 'إنشاء حساب' }] as const"
            :key="m.k"
            type="button"
            class="rounded-full py-2.5 text-sm font-bold transition"
            :class="mode === m.k ? 'bg-white text-blush-600 shadow' : 'text-ink/60'"
            @click="switchMode(m.k)"
          >
            {{ m.l }}
          </button>
        </div>

        <form class="space-y-4" novalidate @submit.prevent="submit">
          <template v-if="mode === 'register'">
            <div>
              <label for="r-name" class="mb-2 block text-sm font-bold">الاسم الكامل</label>
              <input id="r-name" v-model="form.name" type="text" class="field" :class="{ 'is-invalid': errors.name }" autocomplete="name" />
              <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
            </div>
            <div>
              <label for="r-phone" class="mb-2 block text-sm font-bold">رقم الهاتف</label>
              <input id="r-phone" v-model="form.phone" type="tel" dir="ltr" class="field text-right" :class="{ 'is-invalid': errors.phone }" autocomplete="tel" />
              <p v-if="errors.phone" class="mt-1 text-sm text-red-500">{{ errors.phone }}</p>
            </div>
          </template>

          <div>
            <label for="email" class="mb-2 block text-sm font-bold">البريد الإلكتروني</label>
            <input id="email" v-model="form.email" type="email" dir="ltr" class="field text-right" :class="{ 'is-invalid': errors.email }" autocomplete="email" />
            <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
          </div>

          <div>
            <label for="password" class="mb-2 block text-sm font-bold">كلمة المرور</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPass ? 'text' : 'password'"
                dir="ltr"
                class="field pe-12 text-right"
                :class="{ 'is-invalid': errors.password }"
                :autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
              />
              <button
                type="button"
                class="absolute inset-y-0 end-3 px-2 text-lilac-500 hover:text-blush-600"
                :aria-label="showPass ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'"
                @click="showPass = !showPass"
              >
                <i class="fa-regular" :class="showPass ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
          </div>

          <div v-if="mode === 'register'">
            <label for="confirm" class="mb-2 block text-sm font-bold">تأكيد كلمة المرور</label>
            <input id="confirm" v-model="form.confirm" :type="showPass ? 'text' : 'password'" dir="ltr" class="field text-right" :class="{ 'is-invalid': errors.confirm }" autocomplete="new-password" />
            <p v-if="errors.confirm" class="mt-1 text-sm text-red-500">{{ errors.confirm }}</p>
          </div>

          <div v-if="mode === 'login'" class="text-end">
            <a href="#" class="text-sm font-medium text-lilac-600 hover:text-blush-600">نسيتِ كلمة المرور؟</a>
          </div>

          <button type="submit" class="btn-primary w-full" :disabled="loading">
            <i v-if="loading" class="fa-solid fa-spinner fa-spin"></i>
            {{ mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب' }}
          </button>

          <p v-if="success" class="rounded-2xl bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-700">
            {{ success }}
          </p>
        </form>

        <p class="mt-6 text-center text-sm text-ink/60">
          {{ mode === 'login' ? 'ليس لديكِ حساب؟' : 'لديكِ حساب بالفعل؟' }}
          <button
            type="button"
            class="font-bold text-blush-600 hover:underline"
            @click="switchMode(mode === 'login' ? 'register' : 'login')"
          >
            {{ mode === 'login' ? 'أنشئي حساباً' : 'سجلي الدخول' }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>