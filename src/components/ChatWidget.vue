<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { site } from '../data/site'

interface Msg {
  id: number
  from: 'bot' | 'user'
  text: string
}

const open = ref(false)
const input = ref('')
const typing = ref(false)
const listEl = ref<HTMLElement | null>(null)
let nextId = 1

const messages = ref<Msg[]>([
  {
    id: nextId++,
    from: 'bot',
    text: `أهلاً بكِ في ${site.name} 🌸 أنا مساعدتك الذكية. كيف أقدر أساعدك اليوم؟`,
  },
])

const quick = ['أريد حجز موعد', 'ما هي خدماتكم؟', 'ساعات العمل', 'التقويم والتجميل']

const rules: { keys: string[]; text: string }[] = [
  {
    keys: ['حجز', 'موعد', 'احجز'],
    text: 'يسعدنا حجز موعدك! توجهي إلى صفحة «احجز الآن» واختاري نوع الحجز والتاريخ المناسب، وسنتواصل معك لتأكيد الموعد 💕',
  },
  {
    keys: ['خدمات', 'خدمة', 'علاج'],
    text: 'نقدم: تجميل الأسنان، التقويم، زراعة الأسنان، التنظيف والتبييض، والفحص العام، وكلها بأيدي طبيبات متخصصات.',
  },
  {
    keys: ['ساعات', 'دوام', 'وقت', 'مفتوح'],
    text: 'نعمل من السبت إلى الأربعاء 9 ص – 8 م، والخميس 9 ص – 4 م، والجمعة إجازة.',
  },
  {
    keys: ['تقويم', 'تجميل', 'تبييض', 'ابتسامة'],
    text: 'لدينا حلول تقويم وتجميل متطورة، منها التقويم الشفاف والقشور الخزفية والتبييض. أفضل خطوة هي فحص أولي لتحديد الخطة المناسبة لكِ ✨',
  },
  {
    keys: ['سعر', 'تكلفة', 'كم', 'اسعار', 'أسعار'],
    text: 'تختلف الأسعار حسب الحالة، ونوضح لكِ التكلفة كاملة بعد الفحص الأولي، مع خيارات دفع مرنة.',
  },
  {
    keys: ['رقم', 'هاتف', 'اتصال', 'عنوان', 'موقع'],
    text: `يمكنك التواصل على ${site.phone}، وعنواننا: ${site.address}.`,
  },
  {
    keys: ['شكرا', 'شكراً', 'يعطيك'],
    text: 'العفو! نحن بخدمتك دائماً 🌷',
  },
]

const fallback =
  'شكراً لسؤالك! لمعلومات أدق يمكنك الاتصال بنا أو حجز موعد من صفحة «احجز الآن»، وسيسعد فريقنا بمساعدتك.'

const scrollDown = async () => {
  await nextTick()
  listEl.value?.scrollTo({ top: listEl.value.scrollHeight, behavior: 'smooth' })
}

const reply = (q: string) => {
  const found = rules.find((r) => r.keys.some((k) => q.includes(k)))
  return found ? found.text : fallback
}

const send = (text?: string) => {
  const q = (text ?? input.value).trim()
  if (!q || typing.value) return
  messages.value.push({ id: nextId++, from: 'user', text: q })
  input.value = ''
  typing.value = true
  scrollDown()

  setTimeout(() => {
    messages.value.push({ id: nextId++, from: 'bot', text: reply(q) })
    typing.value = false
    scrollDown()
  }, 900)
}

const toggle = () => {
  open.value = !open.value
  if (open.value) scrollDown()
}
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50" dir="rtl">
    <!-- نافذة الدردشة -->
    <Transition name="chat">
      <section
        v-if="open"
        class="absolute bottom-20 right-0 flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-lilac-300/50 ring-1 ring-lilac-100"
        aria-label="المساعدة الذكية"
      >
        <header
          class="flex items-center gap-3 bg-linear-to-br from-blush-500 to-lilac-500 px-4 py-3 text-white"
        >
          <span class="grid size-10 place-items-center rounded-full bg-white/20">
            <i class="fa-solid fa-robot"></i>
          </span>
          <div class="flex-1 leading-tight">
            <p class="font-bold">مساعدة {{ site.name }}</p>
            <p class="text-xs text-white/80">
              <span class="me-1 inline-block size-2 rounded-full bg-emerald-300"></span>متصلة الآن
            </p>
          </div>
          <button class="grid size-8 place-items-center rounded-full hover:bg-white/20" @click="open = false" aria-label="إغلاق">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </header>

        <div ref="listEl" class="flex-1 space-y-3 overflow-y-auto bg-lilac-50/50 p-4">
          <div
            v-for="m in messages"
            :key="m.id"
            class="flex"
            :class="m.from === 'user' ? 'justify-start' : 'justify-end'"
          >
            <p
              class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-7"
              :class="
                m.from === 'user'
                  ? 'rounded-ss-sm bg-linear-to-br from-blush-500 to-lilac-500 text-white'
                  : 'rounded-se-sm bg-white text-ink shadow-sm'
              "
            >
              {{ m.text }}
            </p>
          </div>

          <div v-if="typing" class="flex justify-end">
            <div class="flex gap-1 rounded-2xl rounded-se-sm bg-white px-4 py-3 shadow-sm">
              <span class="typing-dot"></span><span class="typing-dot"></span
              ><span class="typing-dot"></span>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 border-t border-lilac-100 bg-white px-3 pt-3">
          <button
            v-for="q in quick"
            :key="q"
            class="rounded-full bg-blush-50 px-3 py-1 text-xs font-medium text-blush-600 transition hover:bg-blush-100"
            @click="send(q)"
          >
            {{ q }}
          </button>
        </div>

        <div class="flex items-center gap-2 bg-white p-3">
          <input
            v-model="input"
            type="text"
            placeholder="اكتبي رسالتك..."
            class="field !rounded-full !py-2.5 text-sm"
            @keydown.enter.prevent="send()"
          />
          <button
            class="grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-blush-500 to-lilac-500 text-white transition hover:scale-105"
            aria-label="إرسال"
            @click="send()"
          >
            <i class="fa-solid fa-paper-plane -scale-x-100"></i>
          </button>
        </div>
      </section>
    </Transition>

    <!-- الزر العائم -->
    <button
      v-motion
      :initial="{ scale: 0, opacity: 0 }"
      :enter="{ scale: 1, opacity: 1, transition: { delay: 600, type: 'spring' } }"
      class="relative grid size-16 place-items-center rounded-full bg-linear-to-br from-blush-500 to-lilac-500 text-2xl text-white shadow-xl shadow-blush-300/60 transition hover:scale-110"
      :aria-label="open ? 'إغلاق الدردشة' : 'فتح الدردشة'"
      @click="toggle"
    >
      <span v-if="!open" class="absolute inset-0 animate-ping rounded-full bg-blush-400/40"></span>
      <i class="fa-solid relative" :class="open ? 'fa-xmark' : 'fa-comment-dots'"></i>
    </button>
  </div>
</template>