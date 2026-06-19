import type { Locale } from "@/lib/i18n/config";

type Faq = {
  q: string;
  a: string;
};

export type LocalizedServiceContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  suitability: string[];
  process: string[];
  expectations: string[];
  faqs: Faq[];
};

export const serviceSlugs = [
  "acne-treatment-kuala-lumpur",
  "hifu-kuala-lumpur",
  "rf-microneedling-kuala-lumpur",
  "facial-kuchai-lama",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export function isServiceSlug(value: string): value is ServiceSlug {
  return serviceSlugs.includes(value as ServiceSlug);
}

const serviceContent: Record<ServiceSlug, Record<Locale, LocalizedServiceContent>> = {
  "acne-treatment-kuala-lumpur": {
    en: {
      metaTitle: "Acne Treatment in Kuala Lumpur (Kuchai Lama)",
      metaDescription:
        "Diagnosis-led acne care to calm inflammation, clear congestion, and support a smoother, more even-looking complexion.",
      eyebrow: "Targeted Skin Correction",
      title: "Acne Treatment",
      description:
        "A clear-skin plan built around your skin’s signals, not guesswork. We focus on calming active breakouts, reducing recurring congestion, and improving the look of post-acne marks with a routine that stays realistic outside the clinic too.",
      bullets: [
        "Skin analysis to understand congestion, inflammation, and sensitivity",
        "Barrier-first planning that avoids harsh routines that can backfire",
        "Support for blackheads, whiteheads, recurring breakouts, and post-acne marks",
        "Personalised home-care guidance with simple, realistic next steps",
      ],
      suitability: [
        "Clients dealing with recurring congestion, active breakouts, or acne-prone skin that feels reactive and hard to manage.",
        "Those who want a more structured plan for post-acne marks, uneven texture, and pores without jumping between random treatments.",
      ],
      process: [
        "Begin with a consultation and skin analysis to understand what is driving the breakouts and where the skin barrier may be struggling.",
        "Build a treatment plan that matches acne severity, sensitivity, and how much downtime fits your schedule.",
        "Combine in-clinic care with realistic home guidance so progress continues between visits instead of depending on one session alone.",
      ],
      expectations: [
        "Many acne-focused sessions involve little to no downtime, though some steps may cause short-term redness depending on intensity.",
        "Visible progress usually builds over a few visits, with more meaningful changes often seen across 6 to 12 weeks when paired with consistent home care.",
        "The goal is calmer, clearer-looking skin over time, not an overnight reset that overstresses the barrier.",
      ],
      faqs: [
        {
          q: "Do you treat active acne and acne marks in the same plan?",
          a: "Yes. We usually calm active inflammation first, then add corrective steps to improve the look of marks and uneven texture without overwhelming the skin barrier.",
        },
        {
          q: "Is this suitable for sensitive or reactive skin?",
          a: "Often, yes. We lean toward barrier-supportive methods and adjust treatment intensity based on how your skin responds.",
        },
        {
          q: "How many sessions do I typically need?",
          a: "It depends on severity, skin sensitivity, and how long the acne has been present. Many clients see more structured progress over several sessions rather than one-off treatment.",
        },
        {
          q: "Will I peel or have downtime?",
          a: "Most sessions have little to no downtime. If a step may cause temporary redness or mild flaking, we will explain that clearly before treatment.",
        },
        {
          q: "Can I keep using my current skincare products?",
          a: "Sometimes. We review what you are using, keep what is helping, and simplify anything that may be contributing to irritation or breakouts.",
        },
      ],
    },
    zh: {
      metaTitle: "吉隆坡痘痘护理",
      metaDescription:
        "以肌肤诊断为基础的痘痘护理，帮助舒缓炎症、改善堵塞，并支持更平滑匀净的肤感。",
      eyebrow: "针对性护肤修复",
      title: "痘痘护理",
      description:
        "这是一套根据肌肤真实状态制定的净痘方案，而不是盲目尝试。我们会着重舒缓正在发作的痘痘、减少反复堵塞，并同步改善痘印与粗糙肤感，让院内护理与居家护理都更实际可持续。",
      bullets: [
        "通过肌肤分析了解堵塞、炎症与敏感来源",
        "以屏障修护为前提，避免过度刺激导致反效果",
        "针对黑头、白头、反复爆痘与痘后痕迹提供支持",
        "提供简单且可执行的居家护理建议",
      ],
      suitability: [
        "适合反复堵塞、持续爆痘，或痘痘肌经常敏感失衡、难以稳定的人群。",
        "也适合想更系统地改善痘印、肤质不平整与毛孔外观，而不想反复尝试零散疗程的人。",
      ],
      process: [
        "先进行咨询与肌肤分析，找出痘痘反复出现的原因，以及屏障可能受损的环节。",
        "再根据痘痘严重度、敏感程度与可接受恢复期，制定更合适的护理节奏。",
        "结合院内护理与现实可执行的居家指导，让改善能在每次疗程之间持续推进，而不是只靠单次护理。",
      ],
      expectations: [
        "多数净痘护理恢复期较短，但若疗程强度较高，短时间泛红仍有可能出现。",
        "明显改善通常需要数次疗程逐步累积；若搭配稳定的居家护理，约 6 到 12 周更容易看到更有意义的变化。",
        "目标是让肌肤逐渐更稳定、清晰，而不是追求一夜之间的快速重置，以免过度刺激屏障。",
      ],
      faqs: [
        {
          q: "活跃痘痘和痘印可以一起改善吗？",
          a: "可以。通常会先把活跃性炎症稳定下来，再逐步加入改善痘印与肤质不均的步骤，避免一次给肌肤太大负担。",
        },
        {
          q: "敏感肌或易泛红肌肤适合吗？",
          a: "很多情况下适合。我们会以屏障支持为核心，并根据肌肤反应调整疗程强度。",
        },
        {
          q: "一般需要做多少次疗程？",
          a: "这取决于痘痘严重度、肌肤敏感度，以及问题存在多久。多数人会在数次疗程后看到更有结构性的改善，而不是一次就结束。",
        },
        {
          q: "会脱皮或需要恢复期吗？",
          a: "大多数疗程恢复期很短。如果某个步骤可能带来暂时泛红或轻微脱屑，我们都会在护理前先说明清楚。",
        },
        {
          q: "我现在的保养品还能继续用吗？",
          a: "有些可以。我们会一起检查你正在使用的产品，保留真正有帮助的，并简化可能引发刺激或爆痘的部分。",
        },
      ],
    },
    ms: {
      metaTitle: "Rawatan Jerawat di Kuala Lumpur",
      metaDescription:
        "Rawatan jerawat berasaskan analisis kulit untuk menenangkan keradangan, mengurangkan kesesakan, dan menyokong tekstur kulit yang lebih sekata.",
      eyebrow: "Pembetulan Kulit Bersasar",
      title: "Rawatan Jerawat",
      description:
        "Pelan kulit lebih bersih ini dibina berdasarkan isyarat sebenar kulit anda, bukan tekaan. Fokus kami ialah menenangkan jerawat aktif, mengurangkan kesesakan berulang, dan memperbaiki penampilan parut jerawat dengan rutin yang kekal realistik di luar klinik juga.",
      bullets: [
        "Analisis kulit untuk memahami kesesakan, keradangan, dan sensitiviti",
        "Perancangan berasaskan perlindungan skin barrier supaya rutin tidak terlalu keras",
        "Sokongan untuk blackhead, whitehead, jerawat berulang, dan kesan selepas jerawat",
        "Panduan penjagaan rumah yang ringkas dan praktikal",
      ],
      suitability: [
        "Sesuai untuk mereka yang mengalami kesesakan berulang, jerawat aktif, atau kulit mudah berjerawat yang terasa reaktif dan sukar dikawal.",
        "Juga sesuai untuk mereka yang mahukan pelan lebih tersusun bagi kesan jerawat, tekstur tidak sekata, dan rupa pori tanpa mencuba rawatan rawak berulang kali.",
      ],
      process: [
        "Mulakan dengan konsultasi dan analisis kulit untuk memahami punca jerawat dan bahagian skin barrier yang mungkin sedang lemah.",
        "Kemudian bina pelan rawatan mengikut tahap jerawat, sensitiviti, dan jumlah downtime yang sesuai dengan jadual anda.",
        "Rawatan dalam klinik digabungkan dengan panduan penjagaan rumah yang realistik supaya kemajuan berterusan di antara sesi, bukan bergantung pada satu lawatan sahaja.",
      ],
      expectations: [
        "Kebanyakan sesi rawatan jerawat mempunyai downtime yang minimum, walaupun kemerahan sementara boleh berlaku bergantung pada intensiti.",
        "Perubahan yang lebih jelas biasanya terkumpul selepas beberapa sesi, dan hasil yang lebih bermakna selalunya dilihat dalam 6 hingga 12 minggu dengan penjagaan rumah yang konsisten.",
        "Matlamatnya ialah kulit yang lebih tenang dan bersih dari semasa ke semasa, bukan perubahan mendadak yang boleh menekan skin barrier.",
      ],
      faqs: [
        {
          q: "Boleh rawat jerawat aktif dan kesan jerawat dalam pelan yang sama?",
          a: "Ya. Biasanya kami tenangkan keradangan aktif dahulu, kemudian tambah langkah pembetulan untuk memperbaiki rupa kesan dan tekstur tidak sekata tanpa membebankan skin barrier.",
        },
        {
          q: "Adakah ia sesuai untuk kulit sensitif atau reaktif?",
          a: "Selalunya ya. Kami cenderung memilih kaedah yang menyokong skin barrier dan melaras intensiti mengikut reaksi kulit anda.",
        },
        {
          q: "Berapa banyak sesi yang biasanya diperlukan?",
          a: "Ia bergantung pada tahap masalah, sensitiviti kulit, dan berapa lama jerawat telah berlaku. Ramai klien melihat kemajuan yang lebih tersusun selepas beberapa sesi, bukannya rawatan sekali sahaja.",
        },
        {
          q: "Adakah kulit akan menggelupas atau perlukan downtime?",
          a: "Kebanyakan sesi mempunyai downtime yang minimum. Jika ada langkah yang boleh menyebabkan kemerahan sementara atau penggelupasan ringan, kami akan terangkan dengan jelas sebelum rawatan.",
        },
        {
          q: "Bolehkah saya terus guna produk skincare saya sekarang?",
          a: "Kadangkala boleh. Kami akan semak produk yang anda gunakan, kekalkan yang membantu, dan ringkaskan apa-apa yang mungkin menyumbang kepada iritasi atau jerawat.",
        },
      ],
    },
  },
  "hifu-kuala-lumpur": {
    en: {
      metaTitle: "HIFU Treatment in Kuala Lumpur",
      metaDescription:
        "A non-surgical lifting session designed to refine facial contours and support firmer-looking skin with minimal downtime.",
      eyebrow: "Lift & Definition",
      title: "HIFU Treatment",
      description:
        "A non-surgical lifting plan for clients who want firmer-looking skin, cleaner facial definition, and a fresher profile without the recovery of invasive procedures. We focus on realistic contour support, comfort-aware treatment planning, and a result that still looks like you.",
      bullets: [
        "Targets the look of laxity across the jawline, cheeks, and lower face",
        "Designed for visible refinement with minimal interruption to your routine",
        "Consult-first planning to match treatment intensity to your anatomy and goals",
        "Useful for clients wanting a lifting option before considering more invasive routes",
        "Comfort-aware pacing with clear aftercare and maintenance guidance",
        "Often best for early to moderate softening, sagging, or loss of facial definition",
      ],
      suitability: [
        "Clients starting to notice softer contours, mild jowling, or a less defined lower face and who want a non-surgical option first.",
        "Those looking for gradual firming support that fits into a busy schedule and does not require extended social downtime.",
      ],
      process: [
        "Start with a consultation to assess skin laxity, facial structure, and whether HIFU is the right match for your goals and comfort level.",
        "Map the treatment zones carefully so energy is delivered with purpose across areas like the jawline, cheeks, or lower face.",
        "Review aftercare and a maintenance timeline so you know what changes may appear gradually and when a follow-up session makes sense.",
      ],
      expectations: [
        "Most clients return to normal activity the same day, though temporary redness, warmth, tenderness, or slight swelling can happen.",
        "Some people notice an early tightening effect, but more visible lifting usually develops gradually over the following weeks.",
        "Best results tend to look refined rather than dramatic, with maintenance depending on skin quality, age, and long-term treatment goals.",
      ],
      faqs: [
        {
          q: "Is HIFU painful?",
          a: "Sensation varies. Many people describe it as brief, warm pulses or a light snapping feeling. We adjust settings and pacing to keep the experience manageable while still being effective.",
        },
        {
          q: "When will I see results?",
          a: "Some clients notice a subtle lift soon after. More visible changes typically develop gradually over the following weeks as the skin’s support structures respond and tighten over time.",
        },
        {
          q: "Is there downtime after a HIFU session?",
          a: "Downtime is usually minimal. You may experience temporary redness, tenderness, or slight swelling, but most clients return to normal activities the same day.",
        },
        {
          q: "How long do results last?",
          a: "Longevity depends on your skin condition, age, and lifestyle. Many clients maintain results for months, with maintenance sessions helping to keep the look consistent as the skin naturally changes.",
        },
        {
          q: "Who is a good candidate for HIFU?",
          a: "It’s often a good option for clients with early to moderate laxity who want a non-surgical lift. If you have more advanced sagging or specific medical considerations, we’ll advise the safest, most realistic approach.",
        },
      ],
    },
    zh: {
      metaTitle: "吉隆坡 HIFU 提拉疗程",
      metaDescription:
        "非手术式提拉疗程，帮助修饰面部轮廓，支持更紧致的肤感，并尽量减少恢复期。",
      eyebrow: "提拉与轮廓线条",
      title: "HIFU 提拉疗程",
      description:
        "这是一套适合想改善松弛感、提升轮廓清晰度、又不想承受侵入式恢复期的非手术提拉方案。我们强调自然的轮廓支持、以舒适度为前提的规划，以及看起来仍然像你自己的精致变化。",
      bullets: [
        "针对下颌线、脸颊与下半脸松弛感的外观改善",
        "在尽量不打乱日常节奏的前提下带来可见修饰",
        "先咨询评估，再根据脸部结构与目标调整疗程强度",
        "适合在考虑更侵入式方案前，先尝试非手术提拉的人",
        "以舒适度为前提安排节奏，并清楚说明术后护理与维持方式",
        "通常更适合初期到中度松弛、轮廓变柔和或线条感下降的人",
      ],
      suitability: [
        "适合开始感觉轮廓变柔和、轻微嘴边肉出现，或下半脸线条不再清晰，并想先尝试非手术方案的人。",
        "也适合希望在忙碌生活中逐步获得紧致支持、又不想经历明显社交恢复期的人。",
      ],
      process: [
        "先进行咨询，评估皮肤松弛程度、脸部结构，以及 HIFU 是否适合你的目标与舒适度。",
        "再仔细规划施作区域，让能量更有目的地分布在下颌线、脸颊或下半脸等重点部位。",
        "最后说明护理后可能逐步出现的变化与维持时间，让你清楚何时适合安排后续保养。",
      ],
      expectations: [
        "多数人在当天即可恢复日常活动，但短暂泛红、发热感、酸胀感或轻微肿胀仍可能出现。",
        "有些人会较早感到轻微紧实感，但更明显的提拉变化通常会在接下来几周逐渐显现。",
        "理想结果通常偏向自然精致，而非过度夸张；维持时间则会受到肤质、年龄与长期目标影响。",
      ],
      faqs: [
        {
          q: "HIFU 会很痛吗？",
          a: "每个人感觉不同。很多人会形容成短暂的温热脉冲或轻微弹击感。我们会根据你的耐受度调整参数与节奏，在效果与舒适之间取得平衡。",
        },
        {
          q: "多久会看到效果？",
          a: "有些人护理后不久会感觉到轻微提拉，但更明显的变化通常会在之后数周逐步出现，因为皮肤支撑结构需要时间慢慢收紧。",
        },
        {
          q: "做完 HIFU 有恢复期吗？",
          a: "通常恢复期不长。可能会有暂时泛红、酸胀或轻微肿胀，但多数人在当天就能恢复正常活动。",
        },
        {
          q: "效果可以维持多久？",
          a: "维持时间会因肤况、年龄与生活习惯而不同。很多顾客可维持数月，如有需要可通过保养疗程让状态更稳定。",
        },
        {
          q: "什么样的人适合做 HIFU？",
          a: "通常适合有初期到中度松弛、想尝试非手术提拉的人。如果松弛较明显，或有特定健康考量，我们会建议更安全、更符合现实预期的方案。",
        },
      ],
    },
    ms: {
      metaTitle: "Rawatan HIFU di Kuala Lumpur",
      metaDescription:
        "Sesi lifting tanpa pembedahan untuk memperkemas kontur wajah dan menyokong kulit yang tampak lebih tegang dengan downtime yang minimum.",
      eyebrow: "Lifting & Definisi",
      title: "Rawatan HIFU",
      description:
        "Pelan lifting tanpa pembedahan ini sesuai untuk klien yang mahukan kulit kelihatan lebih tegang, definisi wajah lebih kemas, dan profil yang lebih segar tanpa tempoh pemulihan prosedur invasif. Fokus kami ialah sokongan kontur yang realistik, perancangan rawatan yang mengambil kira keselesaan, dan hasil yang masih nampak seperti diri anda.",
      bullets: [
        "Menyasarkan rupa kelonggaran di garis rahang, pipi, dan bahagian bawah wajah",
        "Direka untuk penambahbaikan yang kelihatan tanpa banyak mengganggu rutin harian",
        "Perancangan bermula dengan konsultasi untuk memadankan intensiti rawatan dengan anatomi dan matlamat anda",
        "Sesuai untuk mereka yang mahu pilihan lifting sebelum mempertimbangkan prosedur lebih invasif",
        "Rentak rawatan yang mengambil kira keselesaan bersama panduan penjagaan selepas rawatan yang jelas",
        "Selalunya paling sesuai untuk kelonggaran awal hingga sederhana atau kehilangan definisi wajah",
      ],
      suitability: [
        "Sesuai untuk klien yang mula perasan kontur lebih lembut, jowling ringan, atau bahagian bawah wajah kurang jelas dan mahu mencuba pilihan tanpa pembedahan dahulu.",
        "Juga sesuai untuk mereka yang mahukan sokongan penegangan beransur-ansur yang muat dalam jadual sibuk tanpa downtime sosial yang panjang.",
      ],
      process: [
        "Mulakan dengan konsultasi untuk menilai tahap kelonggaran kulit, struktur wajah, dan sama ada HIFU benar-benar sesuai dengan matlamat serta tahap keselesaan anda.",
        "Kawasan rawatan kemudian dipetakan dengan teliti supaya tenaga disampaikan dengan tujuan yang jelas di kawasan seperti garis rahang, pipi, atau bahagian bawah wajah.",
        "Selepas itu kami terangkan penjagaan selepas rawatan dan jangka masa penyelenggaraan supaya anda tahu perubahan apa yang mungkin muncul secara beransur-ansur dan bila sesi susulan sesuai dilakukan.",
      ],
      expectations: [
        "Kebanyakan klien boleh kembali ke aktiviti biasa pada hari yang sama, walaupun kemerahan, rasa hangat, sedikit sakit, atau bengkak ringan boleh berlaku sementara.",
        "Sesetengah orang nampak sedikit kesan tegang lebih awal, tetapi lifting yang lebih jelas biasanya berkembang secara beransur-ansur dalam minggu-minggu berikutnya.",
        "Hasil terbaik selalunya kelihatan kemas dan halus, bukan terlalu dramatik; tempoh ketahanan bergantung pada kualiti kulit, umur, dan matlamat jangka panjang anda.",
      ],
      faqs: [
        {
          q: "Adakah HIFU menyakitkan?",
          a: "Sensasinya berbeza bagi setiap orang. Ramai menggambarkannya sebagai denyutan hangat yang sekejap atau rasa seperti sentapan ringan. Kami melaras tetapan dan rentak rawatan supaya pengalaman lebih terkawal tetapi masih berkesan.",
        },
        {
          q: "Bila saya akan nampak hasil?",
          a: "Sesetengah klien nampak sedikit lifting tidak lama selepas rawatan. Perubahan yang lebih jelas biasanya muncul secara beransur-ansur dalam minggu berikutnya apabila struktur sokongan kulit mula mengetat.",
        },
        {
          q: "Adakah ada downtime selepas sesi HIFU?",
          a: "Biasanya downtime sangat minimum. Anda mungkin mengalami kemerahan sementara, rasa sensitif, atau bengkak ringan, tetapi kebanyakan klien kembali ke aktiviti biasa pada hari yang sama.",
        },
        {
          q: "Berapa lama hasil bertahan?",
          a: "Ketahanan bergantung pada keadaan kulit, umur, dan gaya hidup anda. Ramai klien mengekalkan hasil selama beberapa bulan, dan sesi penyelenggaraan boleh membantu mengekalkan rupa tersebut apabila kulit terus berubah secara semula jadi.",
        },
        {
          q: "Siapa calon yang sesuai untuk HIFU?",
          a: "Ia sering menjadi pilihan yang baik untuk klien dengan kelonggaran awal hingga sederhana yang mahukan lifting tanpa pembedahan. Jika kendur lebih ketara atau ada pertimbangan kesihatan tertentu, kami akan cadangkan pendekatan yang lebih selamat dan realistik.",
        },
      ],
    },
  },
  "rf-microneedling-kuala-lumpur": {
    en: {
      metaTitle: "RF Microneedling in Kuala Lumpur",
      metaDescription:
        "A texture-refining treatment designed to support smoother-looking skin, softer-looking pores, and improved overall tone.",
      eyebrow: "Texture & Pores",
      title: "RF Microneedling",
      description:
        "A collagen-support treatment for clients who want smoother-looking texture, softer-looking pores, and a more refined finish after acne or prolonged skin roughness. We focus on meaningful improvement over a series while protecting recovery and keeping expectations realistic.",
      bullets: [
        "Supports smoother-looking texture and a more even-looking skin surface",
        "Often chosen for pores, acne marks, fine lines, and post-acne irregularity",
        "Energy and needle depth are adjusted to your skin condition and tolerance",
        "Built around recovery-aware planning and clear aftercare guidance",
        "Best results usually come from a series spaced around proper healing cycles",
        "Can be paired with calming, pigment, or hydration support between sessions",
      ],
      suitability: [
        "Clients concerned about rough texture, visible pores, shallow acne scarring, or lingering post-acne unevenness that skincare alone has not improved enough.",
        "Those willing to take a series-based approach for gradual collagen-support changes instead of expecting a one-session reset.",
      ],
      process: [
        "Begin with a consultation to assess skin activity, texture depth, pore visibility, acne history, and whether the skin is ready for RF microneedling now.",
        "Customise treatment depth and intensity according to the areas being treated so correction stays purposeful without pushing recovery too aggressively.",
        "Space sessions appropriately and guide aftercare closely so the skin has time to settle, rebuild, and respond well between visits.",
      ],
      expectations: [
        "Expect short-term redness, sensitivity, and a recovery window that may include dryness or a sandpapery feel depending on intensity.",
        "Texture and pore refinement usually build progressively across multiple sessions rather than appearing all at once after a single visit.",
        "If acne is still active or the barrier is compromised, we may need to stabilise the skin first before chasing scar or texture correction.",
      ],
      faqs: [
        {
          q: "What concerns is RF microneedling best for?",
          a: "It’s often chosen to improve the look of texture, enlarged pores, fine lines, and post-acne unevenness. During consultation, we’ll confirm whether it’s the best match for your skin today.",
        },
        {
          q: "How much downtime should I expect?",
          a: "Many clients experience redness and sensitivity for a short period. Depending on intensity, you may also see mild dryness. We’ll guide you on what’s normal and how to care for your skin as it recovers.",
        },
        {
          q: "How many sessions are recommended?",
          a: "A series is usually recommended for meaningful change. The exact number depends on your concerns and how your skin responds, but we typically space sessions to allow proper recovery and collagen remodeling.",
        },
        {
          q: "Can I do this if I have acne-prone skin?",
          a: "Often, yes, but timing matters. If acne is very inflamed, we may stabilise the skin first. For post-acne texture or marks, it can be a strong option when introduced at the right stage.",
        },
        {
          q: "When can I return to makeup and skincare actives?",
          a: "We usually recommend keeping routines gentle for the first phase of recovery. We’ll provide a clear timeline on when to resume makeup and when to reintroduce actives like retinoids or exfoliants.",
        },
      ],
    },
    zh: {
      metaTitle: "吉隆坡 RF 微针疗程",
      metaDescription:
        "帮助改善粗糙肤质、毛孔外观与整体肤色均匀度的纹理修护疗程。",
      eyebrow: "肤质与毛孔修饰",
      title: "RF 微针疗程",
      description:
        "这是一项帮助支持胶原更新的疗程，适合想改善粗糙肤感、毛孔外观，以及痘痘后遗留不平整问题的人。我们重视在一系列疗程中逐步带来更有意义的改善，同时兼顾恢复与现实预期。",
      bullets: [
        "帮助肤质看起来更细致，肤表更平整",
        "常用于毛孔、痘印、细纹与痘后凹凸不平问题",
        "会根据肌肤状况与耐受度调整能量与针深",
        "以恢复期规划与清晰术后护理说明为基础",
        "通常通过依照恢复节奏安排的系列疗程获得更好结果",
        "疗程之间可结合舒缓、淡化色沉或保湿支持",
      ],
      suitability: [
        "适合在意粗糙肤质、明显毛孔、浅层痘疤，或保养品单靠自己改善有限的痘后不平整问题的人。",
        "也适合愿意以系列疗程逐步改善，而不是期待一次就彻底重置的人。",
      ],
      process: [
        "先通过咨询评估当前皮肤活跃度、纹理深浅、毛孔可见度、痘痘历史，以及现阶段是否适合进行 RF 微针。",
        "再根据不同区域的需求调整针深与强度，让修饰更有针对性，同时避免恢复压力过大。",
        "疗程之间会安排合适间隔，并细致说明术后护理，让肌肤有时间稳定、修复并在每次疗程之间更好地回应。",
      ],
      expectations: [
        "护理后通常会有短暂泛红、敏感，以及视强度而定的干燥或砂纸感恢复期。",
        "肤质与毛孔改善通常会在多次疗程中逐步累积，而不是单次后立即一次到位。",
        "如果痘痘仍在活跃期，或屏障明显受损，我们可能会先稳定肤况，再进入疤痕或纹理修饰阶段。",
      ],
      faqs: [
        {
          q: "RF 微针最适合改善什么问题？",
          a: "它常用于改善粗糙肤质、毛孔、细纹与痘后不平整。咨询时我们会先确认它是否是你当前肤况最合适的选择。",
        },
        {
          q: "恢复期大概多久？",
          a: "许多人会有短时间的泛红与敏感，强度较高时也可能出现轻微干燥。我们会告诉你哪些反应是正常的，以及恢复期间该如何护理。",
        },
        {
          q: "一般建议做多少次？",
          a: "通常建议做系列疗程来累积更有意义的改变。具体次数取决于问题类型与肌肤反应，我们会按照恢复周期安排间隔，让胶原修复更稳定。",
        },
        {
          q: "痘痘肌可以做吗？",
          a: "很多情况下可以，但时机很重要。如果痘痘正在明显发炎，我们可能会先稳定肤况。若是痘后纹理或痘印问题，在合适阶段导入会是很有力的选择。",
        },
        {
          q: "什么时候可以恢复化妆和使用酸类、A 醇等活性保养？",
          a: "恢复初期通常建议以温和护理为主。我们会给你清楚时间线，说明何时可以恢复化妆，以及何时重新加入活性成分。",
        },
      ],
    },
    ms: {
      metaTitle: "RF Microneedling di Kuala Lumpur",
      metaDescription:
        "Rawatan pemurnian tekstur yang direka untuk menyokong kulit yang tampak lebih licin, pori yang lebih lembut, dan tona keseluruhan yang lebih sekata.",
      eyebrow: "Tekstur & Pori",
      title: "RF Microneedling",
      description:
        "Ini ialah rawatan yang menyokong kolagen untuk klien yang mahukan tekstur kulit lebih licin, rupa pori yang lebih halus, dan kemasan lebih rapi selepas jerawat atau kekasaran kulit yang berpanjangan. Fokus kami ialah penambahbaikan yang bermakna melalui satu siri sesi sambil menjaga pemulihan dan memastikan jangkaan kekal realistik.",
      bullets: [
        "Menyokong tekstur yang tampak lebih licin dan permukaan kulit yang lebih sekata",
        "Sering dipilih untuk pori, kesan jerawat, garis halus, dan ketidaksempurnaan selepas jerawat",
        "Tenaga dan kedalaman jarum dilaras mengikut keadaan kulit dan tahap toleransi anda",
        "Dibina dengan perancangan pemulihan yang teliti dan panduan aftercare yang jelas",
        "Hasil terbaik biasanya datang daripada beberapa sesi yang dijarakkan mengikut kitaran penyembuhan",
        "Boleh digabungkan dengan sokongan menenangkan, pigment, atau hidrasi di antara sesi",
      ],
      suitability: [
        "Sesuai untuk klien yang risau tentang tekstur kasar, pori yang jelas, parut jerawat cetek, atau ketidakseimbangan selepas jerawat yang tidak cukup bertambah baik dengan skincare sahaja.",
        "Juga sesuai untuk mereka yang sanggup mengambil pendekatan berasaskan siri sesi untuk perubahan kolagen beransur-ansur, bukan mengharapkan hasil besar daripada satu sesi sahaja.",
      ],
      process: [
        "Mulakan dengan konsultasi untuk menilai aktiviti kulit, kedalaman tekstur, keterlihatan pori, sejarah jerawat, dan sama ada kulit benar-benar bersedia untuk RF microneedling sekarang.",
        "Kemudian intensiti dan kedalaman rawatan disesuaikan mengikut kawasan yang dirawat supaya pembetulan kekal tepat tanpa menolak pemulihan terlalu agresif.",
        "Sesi akan dijarakkan dengan sesuai dan aftercare dipantau rapi supaya kulit sempat tenang, membina semula, dan memberi respons yang baik di antara lawatan.",
      ],
      expectations: [
        "Jangkakan kemerahan jangka pendek, sensitiviti, dan tempoh pemulihan yang mungkin melibatkan kekeringan atau rasa seperti kertas pasir bergantung pada intensiti.",
        "Perhalusan tekstur dan pori biasanya bertambah sedikit demi sedikit melalui beberapa sesi, bukan muncul sekali gus selepas satu lawatan.",
        "Jika jerawat masih aktif atau skin barrier masih terganggu, kita mungkin perlu menstabilkan kulit terlebih dahulu sebelum mengejar pembetulan parut atau tekstur.",
      ],
      faqs: [
        {
          q: "Masalah apa yang paling sesuai dirawat dengan RF microneedling?",
          a: "Ia sering dipilih untuk memperbaiki rupa tekstur, pori besar, garis halus, dan ketidakseimbangan selepas jerawat. Semasa konsultasi, kami akan sahkan sama ada ia benar-benar pilihan terbaik untuk kulit anda hari ini.",
        },
        {
          q: "Berapa lama downtime yang perlu dijangka?",
          a: "Ramai klien mengalami kemerahan dan sensitiviti untuk tempoh yang singkat. Bergantung pada intensiti, sedikit kekeringan juga boleh berlaku. Kami akan pandu anda tentang apa yang normal dan cara menjaga kulit semasa pulih.",
        },
        {
          q: "Berapa banyak sesi yang disyorkan?",
          a: "Satu siri sesi biasanya disyorkan untuk perubahan yang lebih bermakna. Jumlah tepat bergantung pada masalah anda dan bagaimana kulit memberi respons, tetapi kebiasaannya sesi dijarakkan supaya pemulihan dan pembentukan semula kolagen berlaku dengan baik.",
        },
        {
          q: "Boleh buat jika saya ada kulit mudah berjerawat?",
          a: "Selalunya boleh, tetapi masa sangat penting. Jika jerawat masih sangat meradang, kami mungkin akan stabilkan kulit dahulu. Untuk tekstur atau kesan selepas jerawat, ia boleh menjadi pilihan yang kuat apabila diperkenalkan pada peringkat yang sesuai.",
        },
        {
          q: "Bila saya boleh kembali memakai mekap dan menggunakan active skincare?",
          a: "Biasanya kami cadangkan rutin kekal lembut pada fasa awal pemulihan. Kami akan beri garis masa yang jelas tentang bila sesuai sambung mekap dan bila active seperti retinoid atau exfoliant boleh diperkenalkan semula.",
        },
      ],
    },
  },
  "facial-kuchai-lama": {
    en: {
      metaTitle: "Facial in Kuchai Lama, Kuala Lumpur",
      metaDescription:
        "A high-touch facial built around your skin’s needs: hydration, clarity, calmness, and a refined glow you can feel.",
      eyebrow: "Signature Care",
      title: "Facial",
      description:
        "A premium facial should feel restorative, but it should also leave your skin visibly better balanced. We tailor each session to your skin's condition that day so hydration, clarity, calmness, and glow improve in a way that still feels sustainable between visits.",
      bullets: [
        "Tailored to your skin's condition on the day: dehydrated, dull, congested, or sensitive",
        "Comfort-first cleansing and extraction approach when needed",
        "Hydration and barrier support for a calmer, more resilient look",
        "A refined glow without over-exfoliating or stressing the skin",
        "Ideal before events or as part of a steady maintenance routine",
        "Clear product and aftercare guidance to help results last longer",
      ],
      suitability: [
        "Clients wanting regular maintenance, a healthier glow, or a reset when skin feels dull, dehydrated, congested, or slightly out of balance.",
        "Those who prefer a more accessible treatment with little downtime that can still be personalised around sensitivity, breakouts, or upcoming events.",
      ],
      process: [
        "Assess the skin on the day of treatment, then tailor cleansing, exfoliation, extraction, hydration, and calming steps to what your skin can handle well.",
        "Adjust the session in real time so congested areas get enough attention without turning the whole treatment into an aggressive correction session.",
        "Finish with aftercare and product guidance that helps you maintain comfort, glow, and better skin habits between appointments.",
      ],
      expectations: [
        "Most facials involve little to no downtime, though extractions can leave brief redness in targeted areas.",
        "You can expect skin to look fresher, cleaner, and more comfortable soon after treatment, especially when hydration and congestion are the main concerns.",
        "For longer-term improvements in clarity or resilience, regular sessions and consistent home care usually matter more than a one-off visit.",
      ],
      faqs: [
        {
          q: "Which facial should I choose if I’m not sure?",
          a: "You don’t have to decide alone. We’ll assess your skin first, then tailor the session to what your skin needs most that day — whether it’s hydration, calming, or clearing congestion.",
        },
        {
          q: "Can I get extractions without irritation?",
          a: "Yes, when done thoughtfully. We prioritise skin comfort and avoid over-extraction. If your skin is inflamed or very sensitive, we may focus on calming and prep first.",
        },
        {
          q: "How often should I do facials?",
          a: "For maintenance, many clients come every 4–6 weeks. If you’re working through congestion, acne, or dryness, we may recommend a short series first, then space it out once the skin stabilises.",
        },
        {
          q: "Is there downtime?",
          a: "Most facials have little to no downtime. You may have mild redness after extractions, but it typically settles quickly. We’ll let you know what to expect based on your skin condition.",
        },
        {
          q: "Can I do a facial if I’m using retinoids or acne treatments?",
          a: "Usually, yes, with adjustments. Tell us what you’re using and we’ll adapt the treatment steps and advise you on how to pause or resume actives to keep your skin comfortable.",
        },
      ],
    },
    zh: {
      metaTitle: "吉隆坡 Kuchai Lama 面部护理",
      metaDescription:
        "以肌肤当下需求为核心的高触感面部护理，兼顾保湿、净透、舒缓与精致光泽。",
      eyebrow: "招牌护理",
      title: "面部护理",
      description:
        "优质面部护理不只要让人放松，也应该让肌肤在视觉上更稳定平衡。我们会根据你当天的肤况调整每一个步骤，让保湿、净透、舒缓与光泽提升都能更自然地延续到下一次护理之间。",
      bullets: [
        "根据当天肤况调整：缺水、暗沉、堵塞或敏感都可针对性安排",
        "在需要时采用以舒适度为优先的清洁与粉刺处理方式",
        "补水与屏障支持，让肌肤看起来更稳定柔和",
        "带来细致光泽，同时避免过度去角质或增加肌肤压力",
        "适合作为活动前准备或稳定保养的一部分",
        "提供清晰的产品与护理后建议，帮助效果维持更久",
      ],
      suitability: [
        "适合想做定期保养、提升气色，或当肌肤暗沉、缺水、堵塞、轻微失衡时做一次重整的人。",
        "也适合偏好恢复期极短、但仍希望可根据敏感、痘痘或活动安排做个性化调整的人。",
      ],
      process: [
        "先评估当天肤况，再根据肌肤耐受度安排清洁、温和去角质、粉刺处理、补水与舒缓步骤。",
        "疗程过程中会实时调整重点，让堵塞部位得到足够关注，同时避免整场护理变成过度激进的矫正型疗程。",
        "最后会提供护理后与产品建议，帮助你在两次预约之间继续维持舒适感、光泽与更好的保养习惯。",
      ],
      expectations: [
        "大多数面部护理几乎没有恢复期，但若进行了粉刺处理，局部可能会短暂泛红。",
        "通常在护理后不久就能感觉肌肤更清爽、洁净、舒适，特别是当主要诉求是缺水与堵塞时。",
        "如果你追求更长期的透亮度或稳定度，定期护理与稳定居家保养通常比一次性体验更重要。",
      ],
      faqs: [
        {
          q: "如果我不确定该选哪一种 facial，怎么办？",
          a: "不需要自己先做决定。我们会先评估肤况，再根据当天最需要的重点来安排护理，无论是补水、舒缓还是清理堵塞。",
        },
        {
          q: "可以做粉刺清理又不让肌肤太刺激吗？",
          a: "可以，只要方式得当。我们会把舒适度放在前面，避免过度清理；若肌肤正在发炎或非常敏感，也可能会先以舒缓与准备为主。",
        },
        {
          q: "多久做一次 facial 比较合适？",
          a: "若以维持为主，很多顾客会每 4 到 6 周做一次。如果你正在处理堵塞、痘痘或干燥问题，我们也可能先建议一个较密集的短期系列，再慢慢拉开间隔。",
        },
        {
          q: "会有恢复期吗？",
          a: "多数 facial 几乎没有恢复期。若有粉刺处理，可能会有轻微泛红，但通常很快就会缓和。我们也会根据你的肤况提前说明。",
        },
        {
          q: "如果我正在用 A 醇或抗痘产品，还能做 facial 吗？",
          a: "通常可以，但需要调整。告诉我们你正在使用什么产品，我们会调整护理步骤，并建议你如何暂停或恢复活性成分，让肌肤更舒服稳定。",
        },
      ],
    },
    ms: {
      metaTitle: "Facial di Kuchai Lama, Kuala Lumpur",
      metaDescription:
        "Facial berimpak tinggi yang dibina mengikut keperluan kulit anda: hidrasi, kejernihan, ketenangan, dan seri halus yang boleh anda rasai.",
      eyebrow: "Penjagaan Signature",
      title: "Facial",
      description:
        "Facial premium sepatutnya terasa memulihkan, tetapi pada masa yang sama kulit juga patut kelihatan lebih seimbang. Setiap sesi disesuaikan dengan keadaan kulit anda pada hari itu supaya hidrasi, kejernihan, ketenangan, dan seri meningkat dengan cara yang masih mudah dikekalkan di antara lawatan.",
      bullets: [
        "Disesuaikan dengan keadaan kulit pada hari itu: kering, kusam, tersumbat, atau sensitif",
        "Pendekatan pembersihan dan ekstraksi yang mengutamakan keselesaan apabila perlu",
        "Sokongan hidrasi dan skin barrier untuk rupa yang lebih tenang dan tahan lasak",
        "Seri halus tanpa terlebih eksfoliasi atau memberi tekanan berlebihan pada kulit",
        "Sesuai sebelum acara atau sebagai sebahagian daripada rutin penyelenggaraan tetap",
        "Panduan produk dan aftercare yang jelas untuk membantu hasil tahan lebih lama",
      ],
      suitability: [
        "Sesuai untuk klien yang mahukan penyelenggaraan berkala, seri yang lebih sihat, atau reset apabila kulit terasa kusam, dehidrasi, tersumbat, atau sedikit tidak seimbang.",
        "Juga sesuai untuk mereka yang mahukan rawatan yang lebih mudah diakses dengan downtime minimum tetapi masih boleh disesuaikan mengikut sensitiviti, jerawat, atau acara akan datang.",
      ],
      process: [
        "Kulit dinilai pada hari rawatan, kemudian langkah pembersihan, eksfoliasi, ekstraksi, hidrasi, dan penenangan disesuaikan mengikut apa yang kulit anda boleh terima dengan baik.",
        "Sesi dilaras secara masa nyata supaya kawasan tersumbat mendapat perhatian mencukupi tanpa menjadikan keseluruhan rawatan terlalu agresif.",
        "Akhir sekali kami berikan panduan aftercare dan produk supaya anda boleh mengekalkan keselesaan, seri, dan tabiat penjagaan kulit yang lebih baik di antara temujanji.",
      ],
      expectations: [
        "Kebanyakan facial mempunyai sedikit atau tiada downtime, walaupun ekstraksi boleh menyebabkan kemerahan singkat pada kawasan tertentu.",
        "Anda biasanya boleh jangka kulit nampak lebih segar, lebih bersih, dan lebih selesa sejurus selepas rawatan, terutamanya jika hidrasi dan kesesakan ialah kebimbangan utama.",
        "Untuk penambahbaikan jangka panjang pada kejernihan atau daya tahan kulit, sesi berkala dan penjagaan rumah yang konsisten selalunya lebih penting daripada lawatan sekali sahaja.",
      ],
      faqs: [
        {
          q: "Facial mana yang patut saya pilih jika saya tak pasti?",
          a: "Anda tak perlu buat keputusan sendiri. Kami akan nilai kulit anda dahulu, kemudian sesuaikan sesi dengan apa yang paling diperlukan pada hari itu sama ada hidrasi, penenangan, atau membersihkan kesesakan.",
        },
        {
          q: "Boleh buat ekstraksi tanpa menyebabkan iritasi?",
          a: "Ya, jika dilakukan dengan teliti. Kami mengutamakan keselesaan kulit dan mengelakkan over-extraction. Jika kulit anda meradang atau sangat sensitif, kami mungkin fokus pada menenangkan dan menyediakan kulit dahulu.",
        },
        {
          q: "Berapa kerap saya patut buat facial?",
          a: "Untuk penyelenggaraan, ramai klien datang setiap 4 hingga 6 minggu. Jika anda sedang menguruskan kesesakan, jerawat, atau kekeringan, kami mungkin cadangkan siri yang lebih rapat dahulu sebelum menjarakkannya semula apabila kulit lebih stabil.",
        },
        {
          q: "Adakah ada downtime?",
          a: "Kebanyakan facial mempunyai sedikit atau tiada downtime. Anda mungkin mengalami kemerahan ringan selepas ekstraksi, tetapi ia biasanya reda dengan cepat. Kami akan terangkan apa yang boleh dijangka berdasarkan keadaan kulit anda.",
        },
        {
          q: "Bolehkah saya buat facial jika saya menggunakan retinoid atau rawatan jerawat?",
          a: "Biasanya boleh, dengan sedikit pelarasan. Beritahu kami apa yang anda gunakan dan kami akan sesuaikan langkah rawatan serta nasihat bila perlu berhenti seketika atau sambung semula active supaya kulit kekal selesa.",
        },
      ],
    },
  },
};

export function getServiceContent(locale: Locale, slug: ServiceSlug) {
  return serviceContent[slug][locale];
}

