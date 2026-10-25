export const site = {
  name: 'عيادة ياسمين',
  tagline: 'لطب أسنان النساء',
  phone: '+000 000 000 0000',
  whatsapp: '+000 000 000 0000',
  email: 'info@yasmin-clinic.example',
  address: 'المدينة – الحي – الشارع، الطابق الثاني',
  hours: [
    { days: 'السبت – الأربعاء', time: '9:00 ص – 8:00 م' },
    { days: 'الخميس', time: '9:00 ص – 4:00 م' },
    { days: 'الجمعة', time: 'مغلق' },
  ],
}

export const bookingTypes = ['تجميل', 'تقويم', 'زراعة', 'تنظيف', 'فحص عام'] as const
export type BookingType = (typeof bookingTypes)[number]