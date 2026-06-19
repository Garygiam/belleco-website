import type { Locale } from "@/lib/i18n/config";

export const uiCopy = {
  en: {
    homeHero: {
      badge: "Kuala Lumpur • Skin Diagnostics",
      descriptionLead: "Diagnosis-first care for brighter, calmer, younger-looking skin.",
      chips: [
        { label: "Diagnosis-first", value: "Precision care" },
        { label: "Kuala Lumpur", value: "Kuchai Lama" },
        { label: "WhatsApp-ready", value: "Fast booking" },
      ],
      imageAlt: "Belléco clinic interior",
      protocolTitle: "Signature Skin Protocol",
      protocolSubtitle: "Acne • Anti-aging • Radiance",
    },
    treatments: {
      eyebrow: "Targeted Solutions",
      title: "Treatments tailored to your concern.",
      description:
        "Choose a focus area, explore signature protocols, then book a consultation to confirm the right path for your skin.",
      categories: {
        all: "All",
        acne: "Acne",
        antiAging: "Anti-Aging",
        radiance: "Radiance",
      },
      items: [
        {
          category: "acne",
          title: "Acne Reset Program",
          description:
            "A structured plan to calm inflammation, refine pores, and rebuild a resilient barrier.",
          outcomes: ["Breakout control", "Oil balance", "Smoother texture"],
        },
        {
          category: "antiAging",
          title: "Lift + Firm Facial",
          description:
            "An elevated anti-aging facial focused on firmness, collagen support, and refined contours.",
          outcomes: ["Plumper feel", "Fine-line softening", "Glow boost"],
        },
        {
          category: "radiance",
          title: "Radiance Bright Therapy",
          description:
            "Targets dullness and uneven tone with brightening actives and soothing recovery steps.",
          outcomes: ["Even tone", "Luminous finish", "Hydrated look"],
        },
        {
          category: "acne",
          title: "Clear + Calm Deep Cleanse",
          description:
            "A deep pore cleanse designed to reduce congestion while keeping skin calm and supported.",
          outcomes: ["Less congestion", "Reduced redness", "Fresh finish"],
        },
        {
          category: "antiAging",
          title: "Renewal Micro-Polish",
          description:
            "A refined resurfacing session to support cell turnover and improve overall smoothness.",
          outcomes: ["Refined texture", "Softer lines", "Brighter tone"],
        },
        {
          category: "radiance",
          title: "Glass-Skin Hydration",
          description:
            "A moisture-forward ritual to plump, soften, and give skin a glass-like glow.",
          outcomes: ["Deep hydration", "Plumped look", "Instant radiance"],
        },
      ],
      unsureTitle: "Not sure where to start?",
      unsureDescription: "Book a consultation and we’ll recommend the right protocol.",
    },
    popularServices: {
      eyebrow: "Popular Services",
      description: "Explore the treatments clients ask for most.",
      cta: "Explore",
      serviceAriaSuffix: "Explore",
      services: {
        acne: {
          label: "Acne Treatment",
          descriptor: "Texture",
          alt: "Luxury beauty portrait with clear skin texture for acne treatment",
        },
        hifu: {
          label: "HIFU",
          descriptor: "Lift",
          alt: "Luxury portrait emphasizing lifted jawline contour for HIFU",
        },
        rf: {
          label: "RF Microneedling",
          descriptor: "Refine",
          alt: "Luxury skin-detail portrait showing refined pores for RF microneedling",
        },
        facial: {
          label: "Facial",
          descriptor: "Glow",
          alt: "Luxury portrait with luminous hydrated glow for facial treatment",
        },
      },
    },
    beforeAfter: {
      eyebrow: "Real Results",
      title: "Visible change, mapped clearly.",
      description: "Explore approved case photography and compare before-and-after results clearly.",
      before: "Before",
      after: "After",
      featuredCase: "Featured Case",
      concern: "Concern",
      treatment: "Treatment",
      sessions: "Sessions",
      timeline: "Timeline",
      showCasePrefix: "Show result case:",
      disclaimer: "Results vary by skin condition and treatment plan.",
      cases: {
        "acne-marks": {
          title: "Acne Marks Recovery",
          concern: "Post-acne texture and uneven tone",
          treatment: "RF Microneedling",
        },
        "pigmentation-reset": {
          title: "Pigmentation Reset",
          concern: "Pigmentation and dull patches",
          treatment: "Laser + Brightening Protocol",
        },
        "firmness-lift": {
          title: "Firmness Lift",
          concern: "Softening jawline and loss of lift",
          treatment: "Doublo HIFU",
        },
        "clarity-balance": {
          title: "Clarity Balance",
          concern: "Congestion and redness",
          treatment: "Barrier Repair Facial",
        },
      },
    },
    testimonials: {
      eyebrow: "Stories",
      title: "Real transformations, guided with care.",
      description:
        "Each plan begins with skin diagnostics, then focuses on consistent barrier support and targeted treatments to deliver visible change.",
      reviewsLabel: "Google Reviews",
      moreReviews: "More reviews",
      moreReviewsDescription: "See more client feedback, ratings, and recent updates.",
      items: [
        {
          quote:
            "My skin feels calmer and my breakouts are finally under control. The consultation was detailed and honest.",
          name: "Client • Acne care",
        },
        {
          quote:
            "The clinic has a very premium vibe, but the treatment plan was practical and tailored. Loved the results after a few sessions.",
          name: "Client • Radiance",
        },
        {
          quote:
            "I came for anti-aging and left with skin that looks firmer and brighter. I appreciate the gentle, step-by-step approach.",
          name: "Client • Anti-aging",
        },
        {
          quote:
            "Super gentle but effective — my skin looks clearer and more even. The staff explained every step and what to expect.",
          name: "Client • Texture + tone",
        },
      ],
    },
    clientVideos: {
      eyebrow: "Our Service Video",
      title: "See the treatments in action.",
      description: "Watch short previews, then open the full video when you’re ready for sound and details.",
      viewAll: "View all on YouTube",
      featured: "Featured video",
      watchFull: "Watch full video",
      selectVideoPrefix: "Select video:",
      previewTitlePrefix: "Client video preview:",
      playerTitlePrefix: "Client video:",
      videos: [
        { id: "JS56HI5dQDQ", title: "Doublo HIFU" },
        { id: "LLY1owXIRxg", title: "Belleco RF Micro-needle Treatment" },
        { id: "Cyt6YNkeOgk", title: "Belleco Skin Beauty" },
      ],
    },
    bookingBanner: {
      eyebrow: "Book a consultation",
      title: "Ready to start your skin protocol?",
      description:
        "Share your concerns and preferred timing. We’ll reply with the next available slot and a recommended plan.",
      whatsappLabel: "WhatsApp",
    },
    footer: {
      contact: "Contact",
      social: "Social",
      openInWaze: "Open in Waze",
      openInMaps: "Open in Google Maps",
    },
    stickyWhatsapp: {
      ariaLabel: "Chat on WhatsApp",
      text: "Chat on WhatsApp",
    },
    bookingForm: {
      eyebrow: "Appointment Request",
      intro:
        "Submit your details and choose how you’d like us to reply. You can send the prepared message via WhatsApp or email.",
      fullName: "Full name",
      phone: "Phone",
      emailOptional: "Email (optional)",
      concern: "Concern",
      concernPlaceholder: "Acne, pigmentation, sensitivity, anti-aging…",
      preferredDate: "Preferred date",
      preferredTime: "Preferred time",
      preferredContact: "Preferred contact",
      contactMethods: {
        WhatsApp: "WhatsApp",
        Call: "Call",
        Email: "Email",
      },
      notesOptional: "Notes (optional)",
      consentPrefix: "I consent to be contacted by",
      consentSuffix: "regarding this booking request.",
      prepareMessage: "Prepare Message",
      viewLocation: "View Location",
      previewLabel: "Message Preview",
      previewReady: "Send this message via WhatsApp or email.",
      previewPending: "Fill the form, then press “Prepare Message” to enable send buttons.",
      openWhatsapp: "Open WhatsApp",
      emailButton: "Email",
      openingHours: "Opening hours",
      hours: {
        "Mon–Fri": "Mon–Fri",
        Sat: "Sat",
        Sun: "Sun",
        "By appointment": "By appointment",
      },
      message: {
        greeting: "Hi Belléco Skin Beauté, I'd like to book a consultation.",
        name: "Name",
        phone: "Phone",
        email: "Email",
        concern: "Concern",
        preferredDate: "Preferred date",
        preferredTime: "Preferred time",
        preferredContact: "Preferred contact",
        notes: "Notes",
        mailSubject: "Booking request - Belléco Skin Beauté",
      },
    },
  },
  zh: {
    homeHero: {
      badge: "吉隆坡 • 肌肤诊断",
      descriptionLead: "以诊断为先，帮助肌肤更透亮、更稳定、更显年轻。",
      chips: [
        { label: "先做诊断", value: "精准护理" },
        { label: "吉隆坡", value: "Kuchai Lama" },
        { label: "WhatsApp 预约", value: "快速回复" },
      ],
      imageAlt: "Belléco 诊所空间",
      protocolTitle: "招牌肌肤方案",
      protocolSubtitle: "痘痘 • 抗老 • 焕亮",
    },
    treatments: {
      eyebrow: "针对性方案",
      title: "按你的肌肤问题定制疗程。",
      description: "先选择关注重点，再查看招牌护理方案，并通过咨询确认最适合你肌肤的方向。",
      categories: {
        all: "全部",
        acne: "痘痘",
        antiAging: "抗老",
        radiance: "焕亮",
      },
      items: [
        {
          category: "acne",
          title: "净痘修护方案",
          description: "帮助舒缓炎症、改善毛孔外观，并重建更稳定的肌肤屏障。",
          outcomes: ["稳定痘痘", "平衡出油", "肤质更细致"],
        },
        {
          category: "antiAging",
          title: "提拉紧致护理",
          description: "以紧致感、胶原支持与轮廓修饰为重点的高阶抗老护理。",
          outcomes: ["更饱满", "细纹更柔和", "气色提升"],
        },
        {
          category: "radiance",
          title: "焕亮透肤疗程",
          description: "针对暗沉与肤色不均，结合提亮成分与舒缓修护步骤。",
          outcomes: ["肤色更均匀", "更有光泽", "更水润透亮"],
        },
        {
          category: "acne",
          title: "深层净肤舒缓疗程",
          description: "帮助减少堵塞、深层清洁毛孔，同时维持肌肤稳定舒适。",
          outcomes: ["减少堵塞", "舒缓泛红", "肤感更清爽"],
        },
        {
          category: "antiAging",
          title: "焕肤微磨疗程",
          description: "支持角质更新，帮助整体肤质更平滑细致。",
          outcomes: ["纹理更细", "细纹更柔和", "肤色更明亮"],
        },
        {
          category: "radiance",
          title: "玻璃肌补水护理",
          description: "以补水为核心，让肌肤更饱满柔润，呈现通透水光感。",
          outcomes: ["深层补水", "更饱满", "即时透亮"],
        },
      ],
      unsureTitle: "不确定该从哪里开始？",
      unsureDescription: "预约咨询，我们会为你建议更合适的方案。",
    },
    popularServices: {
      eyebrow: "热门疗程",
      description: "看看顾客最常预约的疗程。",
      cta: "查看",
      serviceAriaSuffix: "查看",
      services: {
        acne: {
          label: "痘痘护理",
          descriptor: "肤质改善",
          alt: "痘痘护理对应的奢华美容人像，展现更清晰细致的肤质",
        },
        hifu: {
          label: "HIFU 提拉",
          descriptor: "轮廓提拉",
          alt: "HIFU 提拉对应的人像，强调更利落的下颌线轮廓",
        },
        rf: {
          label: "RF 微针",
          descriptor: "细致焕肤",
          alt: "RF 微针对应的肤质细节人像，展现更细致的毛孔外观",
        },
        facial: {
          label: "面部护理",
          descriptor: "水润透亮",
          alt: "面部护理对应的奢华人像，展现水润发光的肤感",
        },
      },
    },
    beforeAfter: {
      eyebrow: "真实效果",
      title: "看得见的变化，清楚呈现。",
      description: "查看已获授权的案例照片，更直观地比较护理前后的变化。",
      before: "护理前",
      after: "护理后",
      featuredCase: "精选案例",
      concern: "问题",
      treatment: "疗程",
      sessions: "次数",
      timeline: "周期",
      showCasePrefix: "查看案例：",
      disclaimer: "效果会因肤况与疗程方案而异。",
      cases: {
        "acne-marks": {
          title: "痘印修护",
          concern: "痘后肤质不平与肤色不均",
          treatment: "RF 微针",
        },
        "pigmentation-reset": {
          title: "色沉修护",
          concern: "色素沉着与暗沉斑驳",
          treatment: "激光 + 焕亮方案",
        },
        "firmness-lift": {
          title: "紧致提拉",
          concern: "下颌线变柔和与松弛感",
          treatment: "Doublo HIFU",
        },
        "clarity-balance": {
          title: "净透平衡",
          concern: "堵塞与泛红",
          treatment: "屏障修护护理",
        },
      },
    },
    testimonials: {
      eyebrow: "真实故事",
      title: "真实变化，在细致护理中发生。",
      description: "每一套方案都从肌肤诊断开始，再通过稳定修护与针对性疗程慢慢带来看得见的改善。",
      reviewsLabel: "Google 评价",
      moreReviews: "查看更多评价",
      moreReviewsDescription: "查看更多顾客反馈、评分与最新评价。",
      items: [
        {
          quote: "我的肌肤稳定很多，痘痘终于比较受控。咨询过程也非常仔细、很诚实。",
          name: "顾客 • 痘痘护理",
        },
        {
          quote: "诊所整体感觉很高级，但方案很实际，也很贴合我的肤况。做了几次后真的很喜欢效果。",
          name: "顾客 • 焕亮护理",
        },
        {
          quote: "我是为了抗老而来，结果肤质看起来更紧致也更透亮。我很喜欢他们一步一步、很温和的方式。",
          name: "顾客 • 抗老护理",
        },
        {
          quote: "很温和但又有效，肤色更均匀也更清透。每个步骤都会先说明，让人很安心。",
          name: "顾客 • 肤质与肤色",
        },
      ],
    },
    clientVideos: {
      eyebrow: "我们的疗程视频",
      title: "看看疗程实际进行的样子。",
      description: "先看短预览，准备好听声音与细节时再打开完整视频。",
      viewAll: "查看 YouTube 全部视频",
      featured: "精选视频",
      watchFull: "观看完整视频",
      selectVideoPrefix: "选择视频：",
      previewTitlePrefix: "顾客视频预览：",
      playerTitlePrefix: "顾客视频：",
      videos: [
        { id: "JS56HI5dQDQ", title: "Doublo HIFU" },
        { id: "LLY1owXIRxg", title: "Belleco RF 微针疗程" },
        { id: "Cyt6YNkeOgk", title: "Belleco Skin Beauty" },
      ],
    },
    bookingBanner: {
      eyebrow: "预约咨询",
      title: "准备开始你的肌肤方案了吗？",
      description: "告诉我们你的肌肤困扰与理想时间，我们会回复最近可预约时段与建议方向。",
      whatsappLabel: "WhatsApp",
    },
    footer: {
      contact: "联系我们",
      social: "社交平台",
      openInWaze: "在 Waze 打开",
      openInMaps: "在 Google 地图打开",
    },
    stickyWhatsapp: {
      ariaLabel: "WhatsApp 咨询",
      text: "WhatsApp 咨询",
    },
    bookingForm: {
      eyebrow: "预约申请",
      intro: "填写你的资料，并选择希望我们如何回复你。你可以通过 WhatsApp 或电邮发送已准备好的讯息。",
      fullName: "姓名",
      phone: "电话",
      emailOptional: "电邮（选填）",
      concern: "肌肤问题",
      concernPlaceholder: "痘痘、色沉、敏感、抗老……",
      preferredDate: "理想日期",
      preferredTime: "理想时间",
      preferredContact: "偏好联系方式",
      contactMethods: {
        WhatsApp: "WhatsApp",
        Call: "电话",
        Email: "电邮",
      },
      notesOptional: "备注（选填）",
      consentPrefix: "我同意",
      consentSuffix: "就此预约申请联系我。",
      prepareMessage: "准备讯息",
      viewLocation: "查看位置",
      previewLabel: "讯息预览",
      previewReady: "现在可通过 WhatsApp 或电邮发送这则讯息。",
      previewPending: "先填写表格，再按“准备讯息”以启用发送按钮。",
      openWhatsapp: "打开 WhatsApp",
      emailButton: "电邮",
      openingHours: "营业时间",
      hours: {
        "Mon–Fri": "周一至周五",
        Sat: "周六",
        Sun: "周日",
        "By appointment": "仅限预约",
      },
      message: {
        greeting: "你好，Belléco Skin Beauté，我想预约咨询。",
        name: "姓名",
        phone: "电话",
        email: "电邮",
        concern: "肌肤问题",
        preferredDate: "理想日期",
        preferredTime: "理想时间",
        preferredContact: "偏好联系方式",
        notes: "备注",
        mailSubject: "预约申请 - Belléco Skin Beauté",
      },
    },
  },
  ms: {
    homeHero: {
      badge: "Kuala Lumpur • Diagnostik Kulit",
      descriptionLead: "Penjagaan berasaskan diagnosis untuk kulit yang lebih cerah, tenang, dan tampak muda.",
      chips: [
        { label: "Diagnosis terlebih dahulu", value: "Penjagaan tepat" },
        { label: "Kuala Lumpur", value: "Kuchai Lama" },
        { label: "WhatsApp-ready", value: "Tempahan pantas" },
      ],
      imageAlt: "Ruang klinik Belléco",
      protocolTitle: "Protokol Kulit Signature",
      protocolSubtitle: "Jerawat • Anti-penuaan • Seri",
    },
    treatments: {
      eyebrow: "Penyelesaian Bersasar",
      title: "Rawatan yang disesuaikan dengan kebimbangan kulit anda.",
      description:
        "Pilih fokus utama, teroka protokol signature, kemudian tempah konsultasi untuk sahkan laluan terbaik bagi kulit anda.",
      categories: {
        all: "Semua",
        acne: "Jerawat",
        antiAging: "Anti-penuaan",
        radiance: "Seri",
      },
      items: [
        {
          category: "acne",
          title: "Program Reset Jerawat",
          description:
            "Pelan tersusun untuk menenangkan keradangan, memperhalus rupa pori, dan membina semula skin barrier yang lebih kuat.",
          outcomes: ["Jerawat lebih terkawal", "Minyak lebih seimbang", "Tekstur lebih halus"],
        },
        {
          category: "antiAging",
          title: "Facial Lift + Firm",
          description:
            "Facial anti-penuaan premium yang memberi fokus pada rasa lebih tegang, sokongan kolagen, dan kontur lebih kemas.",
          outcomes: ["Rasa lebih anjal", "Garis halus lebih lembut", "Seri bertambah"],
        },
        {
          category: "radiance",
          title: "Terapi Pencerahan Seri",
          description:
            "Menyasarkan kulit kusam dan tona tidak sekata dengan bahan pencerahan serta langkah pemulihan yang menenangkan.",
          outcomes: ["Tona lebih sekata", "Kemasan lebih bercahaya", "Rupa lebih terhidrat"],
        },
        {
          category: "acne",
          title: "Pembersihan Mendalam Clear + Calm",
          description:
            "Pembersihan pori mendalam untuk mengurangkan kesesakan sambil mengekalkan kulit tenang dan disokong.",
          outcomes: ["Kurang kesesakan", "Kemerahan berkurang", "Kemasan lebih segar"],
        },
        {
          category: "antiAging",
          title: "Micro-Polish Pembaharuan",
          description:
            "Sesi resurfacing halus untuk menyokong pembaharuan kulit dan memperbaiki kelicinan keseluruhan.",
          outcomes: ["Tekstur lebih halus", "Garis lebih lembut", "Tona lebih cerah"],
        },
        {
          category: "radiance",
          title: "Hidrasi Glass-Skin",
          description:
            "Ritual berfokuskan kelembapan untuk memenuhkan, melembutkan, dan memberi kilauan seperti glass skin.",
          outcomes: ["Hidrasi mendalam", "Rupa lebih penuh", "Seri segera"],
        },
      ],
      unsureTitle: "Tak pasti mahu mula dari mana?",
      unsureDescription: "Tempah konsultasi dan kami akan cadangkan protokol yang sesuai.",
    },
    popularServices: {
      eyebrow: "Rawatan Popular",
      description: "Lihat rawatan yang paling kerap dipilih oleh klien.",
      cta: "Lihat",
      serviceAriaSuffix: "Lihat",
      services: {
        acne: {
          label: "Rawatan Jerawat",
          descriptor: "Tekstur",
          alt: "Potret kecantikan mewah dengan tekstur kulit lebih jelas untuk rawatan jerawat",
        },
        hifu: {
          label: "Rawatan HIFU",
          descriptor: "Lifting",
          alt: "Potret mewah yang menekankan kontur garis rahang lebih terangkat untuk HIFU",
        },
        rf: {
          label: "RF Microneedling",
          descriptor: "Refine",
          alt: "Potret detail kulit mewah yang menunjukkan rupa pori lebih halus untuk RF microneedling",
        },
        facial: {
          label: "Facial",
          descriptor: "Glow",
          alt: "Potret mewah dengan cahaya kulit terhidrat untuk facial",
        },
      },
    },
    beforeAfter: {
      eyebrow: "Hasil Sebenar",
      title: "Perubahan yang jelas, dipaparkan dengan teratur.",
      description: "Lihat foto kes yang diluluskan dan bandingkan hasil sebelum dan selepas dengan lebih jelas.",
      before: "Sebelum",
      after: "Selepas",
      featuredCase: "Kes Pilihan",
      concern: "Masalah",
      treatment: "Rawatan",
      sessions: "Sesi",
      timeline: "Tempoh",
      showCasePrefix: "Tunjuk kes hasil:",
      disclaimer: "Hasil berbeza mengikut keadaan kulit dan pelan rawatan.",
      cases: {
        "acne-marks": {
          title: "Pemulihan Kesan Jerawat",
          concern: "Tekstur selepas jerawat dan tona tidak sekata",
          treatment: "RF Microneedling",
        },
        "pigmentation-reset": {
          title: "Reset Pigmentasi",
          concern: "Pigmentasi dan tompok kusam",
          treatment: "Laser + Protokol Pencerahan",
        },
        "firmness-lift": {
          title: "Lifting Ketegangan",
          concern: "Garis rahang mula lembut dan kurang lift",
          treatment: "Doublo HIFU",
        },
        "clarity-balance": {
          title: "Keseimbangan Kejernihan",
          concern: "Kesesakan dan kemerahan",
          treatment: "Facial Pembaikan Barrier",
        },
      },
    },
    testimonials: {
      eyebrow: "Kisah Klien",
      title: "Transformasi sebenar, dibimbing dengan teliti.",
      description:
        "Setiap pelan bermula dengan diagnostik kulit, kemudian memberi fokus pada sokongan barrier yang konsisten dan rawatan bersasar untuk perubahan yang boleh dilihat.",
      reviewsLabel: "Ulasan Google",
      moreReviews: "Lagi ulasan",
      moreReviewsDescription: "Lihat lebih banyak maklum balas klien, penilaian, dan kemas kini terkini.",
      items: [
        {
          quote: "Kulit saya rasa lebih tenang dan jerawat akhirnya lebih terkawal. Konsultasi pun sangat terperinci dan jujur.",
          name: "Klien • Penjagaan jerawat",
        },
        {
          quote: "Klinik ini rasa sangat premium, tapi pelan rawatan tetap praktikal dan sesuai untuk saya. Saya suka hasilnya selepas beberapa sesi.",
          name: "Klien • Seri",
        },
        {
          quote: "Saya datang untuk anti-penuaan dan pulang dengan kulit yang nampak lebih tegang dan cerah. Saya hargai pendekatan mereka yang lembut dan berperingkat.",
          name: "Klien • Anti-penuaan",
        },
        {
          quote: "Sangat lembut tapi berkesan — kulit saya nampak lebih bersih dan sekata. Staf terangkan setiap langkah dengan jelas.",
          name: "Klien • Tekstur + tona",
        },
      ],
    },
    clientVideos: {
      eyebrow: "Video Rawatan Kami",
      title: "Lihat rawatan dalam tindakan.",
      description: "Tonton pratonton ringkas, kemudian buka video penuh apabila anda bersedia untuk bunyi dan butiran lanjut.",
      viewAll: "Lihat semua di YouTube",
      featured: "Video pilihan",
      watchFull: "Tonton video penuh",
      selectVideoPrefix: "Pilih video:",
      previewTitlePrefix: "Pratonton video klien:",
      playerTitlePrefix: "Video klien:",
      videos: [
        { id: "JS56HI5dQDQ", title: "Doublo HIFU" },
        { id: "LLY1owXIRxg", title: "Rawatan RF Micro-needle Belleco" },
        { id: "Cyt6YNkeOgk", title: "Belleco Skin Beauty" },
      ],
    },
    bookingBanner: {
      eyebrow: "Tempah konsultasi",
      title: "Bersedia untuk mulakan protokol kulit anda?",
      description:
        "Kongsi kebimbangan kulit dan masa pilihan anda. Kami akan balas dengan slot terdekat dan cadangan pelan yang sesuai.",
      whatsappLabel: "WhatsApp",
    },
    footer: {
      contact: "Hubungi Kami",
      social: "Sosial",
      openInWaze: "Buka di Waze",
      openInMaps: "Buka di Google Maps",
    },
    stickyWhatsapp: {
      ariaLabel: "Chat di WhatsApp",
      text: "Chat di WhatsApp",
    },
    bookingForm: {
      eyebrow: "Permintaan Temujanji",
      intro: "Isi butiran anda dan pilih cara anda mahu kami balas. Anda boleh hantar mesej yang disediakan melalui WhatsApp atau e-mel.",
      fullName: "Nama penuh",
      phone: "Telefon",
      emailOptional: "E-mel (pilihan)",
      concern: "Kebimbangan kulit",
      concernPlaceholder: "Jerawat, pigmentasi, sensitiviti, anti-penuaan…",
      preferredDate: "Tarikh pilihan",
      preferredTime: "Masa pilihan",
      preferredContact: "Hubungan pilihan",
      contactMethods: {
        WhatsApp: "WhatsApp",
        Call: "Panggilan",
        Email: "E-mel",
      },
      notesOptional: "Nota (pilihan)",
      consentPrefix: "Saya bersetuju untuk dihubungi oleh",
      consentSuffix: "berkaitan permintaan tempahan ini.",
      prepareMessage: "Sediakan Mesej",
      viewLocation: "Lihat Lokasi",
      previewLabel: "Pratonton mesej",
      previewReady: "Hantar mesej ini melalui WhatsApp atau e-mel.",
      previewPending: "Isi borang dahulu, kemudian tekan “Sediakan Mesej” untuk aktifkan butang hantar.",
      openWhatsapp: "WhatsApp",
      emailButton: "E-mel",
      openingHours: "Waktu operasi",
      hours: {
        "Mon–Fri": "Isn–Jum",
        Sat: "Sab",
        Sun: "Ahad",
        "By appointment": "Dengan temujanji",
      },
      message: {
        greeting: "Hai Belléco Skin Beauté, saya ingin menempah konsultasi.",
        name: "Nama",
        phone: "Telefon",
        email: "E-mel",
        concern: "Kebimbangan kulit",
        preferredDate: "Tarikh pilihan",
        preferredTime: "Masa pilihan",
        preferredContact: "Hubungan pilihan",
        notes: "Nota",
        mailSubject: "Permintaan tempahan - Belléco Skin Beauté",
      },
    },
  },
} as const satisfies Record<Locale, unknown>;

