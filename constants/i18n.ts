import { navigation as enNavigation, hero as enHero, heroCard as enHeroCard, section as enSection } from "./contents";

export type Lang = "en" | "th";

export type ContentPack = {
  navigation: typeof enNavigation;
  hero: typeof enHero;
  heroCard: typeof enHeroCard;
  section: typeof enSection;
};

// English is the source of truth. Thai can be filled in later.
const en: ContentPack = {
  navigation: enNavigation,
  hero: enHero,
  heroCard: enHeroCard,
  section: enSection,
};

// Thai localized placeholders for main labels and headings
const th: ContentPack = {
  navigation: {
    ...enNavigation,
    menuItems: [
      { label: "หน้าหลัก", href: "#home" },
      { label: "เราทำอะไร", href: "#what-we-do" },
      { label: "คำรับรอง", href: "#feedback" },
      { label: "ติดต่อ", href: "#contact" },
    ],
  },
  hero: {
    ...enHero,
    heroText: "ที่ซึ่งดีไซน์พบกับการเคลื่อนไหว",
    heroTextWithGradient: "PanStudio",
    heroTextDetail:
      "เราสร้างอินเทอร์เฟซที่คมชัด เข้าถึงได้ ผสานการเคลื่อนไหวและ 3D อย่างพอดี — ปรับจูนเพื่อความเร็ว ความชัดเจน และสัมผัสการใช้งานที่ดี\nพัฒนาด้วย Next.js และ TypeScript พร้อมปรับแต่งประสิทธิภาพเพื่อการใช้งานจริง",
  },
  heroCard: {
    ...enHeroCard,
    heroCardText: "สำรวจเพิ่มเติม",
    heroCardTextDetail: "ค้นพบฟีเจอร์และเทคโนโลยีที่เรามอบให้",
    heroCardBulletPoint: [
      { key: "01", text: "ประสบการณ์ 3D แบบโต้ตอบ" },
      { key: "02", text: "รองรับทุกอุปกรณ์ ทุกขนาดหน้าจอ" },
      { key: "03", text: "ดีไซน์สมัยใหม่ เน้นความใสและลื่นไหล" },
    ],
  },
  section: {
    ...enSection,
    whatWeDoSection: {
      ...enSection.whatWeDoSection,
      title: "เราทำอะไร",
      items: enSection.whatWeDoSection.items.map((it) => {
        const t = it.title.toLowerCase();
        if (t.includes("create website")) {
          return {
            ...it,
            title: "พัฒนาเว็บไซต์",
            detail:
              "ออกแบบและพัฒนาเว็บไซต์สมัยใหม่ เร็ว และตรงอัตลักษณ์ ด้วย Next.js, TypeScript และแนวทางด้านประสิทธิภาพ",
          };
        }
        if (t.includes("responsive")) {
          return {
            ...it,
            title: "รองรับทุกอุปกรณ์",
            detail:
              "เลย์เอาต์แม่นยำ ปรับตัวได้กับทุกหน้าจอ สร้างประสบการณ์ที่สม่ำเสมอบนมือถือ แท็บเล็ต และเดสก์ท็อป",
          };
        }
        if (t.includes("deploy") || t.includes("hosting")) {
          return {
            ...it,
            title: "ดีพลอยและโฮสติ้ง",
            detail:
              "ดีพลอยพร้อมผลิตด้วย CI/CD และโฮสติ้งที่เหมาะสมบน Vercel, Netlify หรือคลาวด์ที่คุณเลือก",
          };
        }
        return it;
      }),
    },
    skillsSection: {
      ...enSection.skillsSection,
      title: "ทักษะและเครื่องมือ",
    },
    feedbackSection: {
      ...enSection.feedbackSection,
      title: "เสียงจากลูกค้า",
    },
    contactSection: {
      ...enSection.contactSection,
      title: "ติดต่อเรา",
      content:
        "มีไอเดีย โปรเจกต์ หรืออยากพูดคุย? ยินดีรับฟังและเปิดกว้างสำหรับความร่วมมือและโอกาสใหม่ ๆ",
      platform: enSection.contactSection.platform.map((p) => ({ ...p })),
    },
    footerSection: {
      ...enSection.footerSection,
      content: "© 2025 PanStudio — ออกแบบและพัฒนาโดย Prompan Uechanwech",
    },
  },
};

export const contentsByLang: Record<Lang, ContentPack> = { en, th };

export function getContent(lang: Lang | undefined): ContentPack {
  return lang && contentsByLang[lang] ? contentsByLang[lang] : contentsByLang.en;
}
