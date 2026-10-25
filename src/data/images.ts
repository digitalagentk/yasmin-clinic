const px = (id: number, w = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

export const images = {
  hero: px(6627519, 1200),
  story: px(3845806, 1000),

  gallery: [
    { src: px(6627519), alt: 'مريضة تبتسم أثناء الفحص عند طبيبة الأسنان' },
    { src: px(3845806), alt: 'طبيبة أسنان تفحص مريضة بأحدث الأجهزة' },
    { src: px(3845682), alt: 'فحص أسنان في عيادة حديثة' },
    { src: px(6627527), alt: 'مريضة أثناء إجراء علاجي' },
    { src: px(6627536), alt: 'من أجواء العيادة' },
    { src: px(6627522), alt: 'رعاية أسنان لطيفة' },
  ],

  // صور الطبيبات (استبدلها بصور شخصية حقيقية لفريقك)
  doctors: [px(3845806, 700), px(6627522, 700), px(6627527, 700)],

  // قبل / بعد: ضع روابط Pexels هنا. اتركها '' ليظهر مكان مخصص أنيق.
  beforeAfter: [
    { title: 'تبييض وتجميل الابتسامة', before: '', after: '' },
    { title: 'تقويم شفاف', before: '', after: '' },
    { title: 'قشور خزفية (فينير)', before: '', after: '' },
  ],
}