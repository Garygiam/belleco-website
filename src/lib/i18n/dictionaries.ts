import type { Locale } from "@/lib/i18n/config";

export type Dictionary = {
  header: {
    nav: {
      treatments: string;
      results: string;
      book: string;
    };
    cta: string;
    languageSwitcher: {
      en: string;
      zh: string;
      ms: string;
      ariaLabel: string;
    };
  };
  common: {
    whatsapp: string;
    getDirections: string;
    bookNow: string;
    bookConsultation: string;
    viewResults: string;
    exploreTreatments: string;
  };
  home: {
    hero: {
      title: string;
      description: string;
    };
  };
  booking: {
    title: string;
  };
  services: {
    labels: {
      bookConsultation: string;
      whatsapp: string;
      getDirections: string;
      whoItsFor: string;
      howItWorks: string;
      whatToExpect: string;
      faqs: string;
      continueExploring: string;
    };
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    header: {
      nav: {
        treatments: "Treatments",
        results: "Results",
        book: "Book",
      },
      cta: "Book Consultation",
      languageSwitcher: {
        en: "EN",
        zh: "中文",
        ms: "BM",
        ariaLabel: "Switch language",
      },
    },
    common: {
      whatsapp: "WhatsApp",
      getDirections: "Get Directions",
      bookNow: "Book Now",
      bookConsultation: "Book Consultation",
      viewResults: "View Results",
      exploreTreatments: "Explore Treatments",
    },
    home: {
      hero: {
        title: "Calm, precise care for lasting skin change.",
        description:
          "Begin with a skin analysis, then follow a tailored protocol for acne, anti-aging, and radiance.",
      },
    },
    booking: {
      title: "Book your consultation.",
    },
    services: {
      labels: {
        bookConsultation: "Book Consultation",
        whatsapp: "WhatsApp",
        getDirections: "Get Directions",
        whoItsFor: "Who it’s for",
        howItWorks: "How it works",
        whatToExpect: "What to expect",
        faqs: "FAQs",
        continueExploring: "Continue Exploring",
      },
    },
  },
  zh: {
    header: {
      nav: {
        treatments: "疗程",
        results: "效果",
        book: "预约",
      },
      cta: "预约咨询",
      languageSwitcher: {
        en: "EN",
        zh: "中文",
        ms: "BM",
        ariaLabel: "切换语言",
      },
    },
    common: {
      whatsapp: "WhatsApp",
      getDirections: "路线导航",
      bookNow: "立即预约",
      bookConsultation: "预约咨询",
      viewResults: "查看效果",
      exploreTreatments: "查看疗程",
    },
    home: {
      hero: {
        title: "以冷静与精准护理，带来持久肤质改变。",
        description: "从肌肤分析开始，再制定针对痘痘、抗老与焕亮的专属护理方案。",
      },
    },
    booking: {
      title: "预约您的咨询。",
    },
    services: {
      labels: {
        bookConsultation: "预约咨询",
        whatsapp: "WhatsApp",
        getDirections: "路线导航",
        whoItsFor: "适合人群",
        howItWorks: "治疗流程",
        whatToExpect: "效果与恢复",
        faqs: "常见问题",
        continueExploring: "继续了解",
      },
    },
  },
  ms: {
    header: {
      nav: {
        treatments: "Rawatan",
        results: "Hasil",
        book: "Tempah",
      },
      cta: "Tempah Konsultasi",
      languageSwitcher: {
        en: "EN",
        zh: "中文",
        ms: "BM",
        ariaLabel: "Tukar bahasa",
      },
    },
    common: {
      whatsapp: "WhatsApp",
      getDirections: "Arah Lokasi",
      bookNow: "Tempah Sekarang",
      bookConsultation: "Tempah Konsultasi",
      viewResults: "Lihat Hasil",
      exploreTreatments: "Lihat Rawatan",
    },
    home: {
      hero: {
        title: "Penjagaan tenang dan tepat untuk perubahan kulit yang berkekalan.",
        description:
          "Mulakan dengan analisis kulit, kemudian ikuti protokol yang disesuaikan untuk jerawat, anti-penuaan, dan seri.",
      },
    },
    booking: {
      title: "Tempah konsultasi anda.",
    },
    services: {
      labels: {
        bookConsultation: "Tempah Konsultasi",
        whatsapp: "WhatsApp",
        getDirections: "Arah Lokasi",
        whoItsFor: "Siapa Yang Sesuai",
        howItWorks: "Bagaimana Ia Berfungsi",
        whatToExpect: "Apa Yang Boleh Dijangka",
        faqs: "Soalan Lazim",
        continueExploring: "Teruskan Meneroka",
      },
    },
  },
};
