export type UnitStatus = "available" | "sold";

export type Unit = {
  id: string;
  block: "A" | "B";
  no: number;
  floor: string;
  type: "1+1" | "2+1" | "2+1 Dubleks" | "3+1 Dubleks";
  area: number;
  price: number | null;
  status: UnitStatus;
};

export const exteriors = [
  { src: "/media/exterior-night-01.jpg", alt: "Golden Luxury gece cephe" },
  { src: "/media/exterior-01.jpg", alt: "Golden Luxury gündüz cephe" },
  { src: "/media/exterior-night-02.jpg", alt: "Golden Luxury gece giriş" },
  { src: "/media/exterior-03.jpg", alt: "Golden Luxury yan cephe" },
  { src: "/media/amenity-aerial.jpg", alt: "Havuz ve avlu kuşbakışı" },
  { src: "/media/exterior-05.jpg", alt: "Golden Luxury bahçe cephesi" },
];

export type Localized = { tr: string; en: string; de: string; ru: string };

export type ArchitectureSlide = {
  src: string;
  label: Localized;
};

/** Full-bleed cinematic hero — architecture first, no cutouts. */
export const architectureSlides: ArchitectureSlide[] = [
  {
    src: "/media/exterior-night-01.jpg",
    label: {
      tr: "Gece cephe",
      en: "Night façade",
      de: "Nachtfassade",
      ru: "Ночной фасад",
    },
  },
  {
    src: "/media/exterior-night-02.jpg",
    label: {
      tr: "Ana giriş",
      en: "Main entrance",
      de: "Haupteingang",
      ru: "Главный вход",
    },
  },
  {
    src: "/media/exterior-01.jpg",
    label: {
      tr: "Klasik cephe",
      en: "Classical façade",
      de: "Klassische Fassade",
      ru: "Классический фасад",
    },
  },
  {
    src: "/media/amenity-pool.jpg",
    label: {
      tr: "Havuz & avlu",
      en: "Pool & courtyard",
      de: "Pool & Hof",
      ru: "Бассейн и двор",
    },
  },
  {
    src: "/media/interior-duplex-living.jpg",
    label: {
      tr: "Dubleks salon",
      en: "Duplex living",
      de: "Duplex-Wohnzimmer",
      ru: "Дуплекс гостиная",
    },
  },
];

export const team = [
  {
    name: "Abdulkadir Tunç",
    photo: "/media/team/abdulkadir-tunc-hero.jpg",
    heroPhoto: "/media/team/abdulkadir-tunc-hero.jpg",
    background: "/media/exterior-night-02.jpg",
    side: "left" as const,
    role: {
      tr: "Müteahhit · Kurucu Başkan",
      en: "Contractor · Founder & Chairman",
      de: "Bauträger · Gründer & Vorsitzender",
      ru: "Подрядчик · Основатель и председатель",
    },
    bio: {
      tr: "Golden Luxury İnşaat’ın kurucusu ve müteahhidi.",
      en: "Founder and contractor of Golden Luxury Construction.",
      de: "Gründer und Bauträger von Golden Luxury Bau.",
      ru: "Основатель и подрядчик Golden Luxury Construction.",
    },
    quote: {
      tr: "Her proje, şehre bırakılan kalıcı bir imzadır. Golden Luxury’yi bu sorumlulukla inşa ediyoruz.",
      en: "Every project is a lasting signature on the city. We are building Golden Luxury with that duty.",
      de: "Jedes Projekt ist eine bleibende Signatur in der Stadt. Wir bauen Golden Luxury mit dieser Verantwortung.",
      ru: "Каждый проект — это долговечная подпись городу. Мы строим Golden Luxury с этой ответственностью.",
    },
  },
  {
    name: "Damla Tığlı",
    photo: "/media/team/damla-tigli-hero.jpg",
    heroPhoto: "/media/team/damla-tigli-hero.jpg",
    background: "/media/exterior-night-01.jpg",
    side: "right" as const,
    role: {
      tr: "Proje Sorumlusu · CEO",
      en: "Project Lead · CEO",
      de: "Projektleitung · CEO",
      ru: "Руководитель проекта · CEO",
    },
    bio: {
      tr: "Şirketin CEO’su. Golden Luxury projesinin satış ve proje sorumlusu.",
      en: "CEO of the company. Project lead for sales and delivery of Golden Luxury.",
      de: "CEO des Unternehmens. Projektverantwortlich für Verkauf und Umsetzung von Golden Luxury.",
      ru: "CEO компании. Руководитель продаж и реализации проекта Golden Luxury.",
    },
    quote: {
      tr: "Doğru ev, doğru insanla buluştuğunda yatırım bir yaşama dönüşür. Ben bu buluşmayı yönetirim.",
      en: "When the right home meets the right person, an investment becomes a life. I lead that meeting.",
      de: "Wenn das richtige Zuhause den richtigen Menschen trifft, wird aus einer Investition ein Leben. Ich führe dieses Zusammentreffen.",
      ru: "Когда правильный дом встречается с правильным человеком, инвестиция становится жизнью. Я веду эту встречу.",
    },
  },
] as const;

/** @deprecated Team-based hero — site now uses architectureSlides. */
export const heroSlides = [team[1], team[0]] as const;

export const phones = [
  { label: "Alanya", href: "tel:+905326988343", display: "+90 532 698 83 43" },
  { label: "Alanya", href: "tel:+905062779721", display: "+90 506 277 97 21" },
  { label: "Alanya", href: "tel:+905364745836", display: "+90 536 474 58 36" },
];

export const whatsapp = "https://wa.me/905326988343";
export const email = "info@mmttuncgroup.com";
export const mapsUrl = "https://maps.app.goo.gl/ZChY2yR9G1eGJ7De9?g_st=ic";
export const mapEmbed =
  "https://maps.google.com/maps?q=Güller%20Pınarı%20Yenilmez%20Caddesi%20Alanya&z=16&output=embed";

export const units: Unit[] = [
  { id: "a-24", block: "A", no: 24, floor: "4", type: "3+1 Dubleks", area: 160.2, price: 550000, status: "available" },
  { id: "a-25", block: "A", no: 25, floor: "4", type: "2+1", area: 63, price: null, status: "sold" },
  { id: "a-26", block: "A", no: 26, floor: "4", type: "2+1", area: 63, price: null, status: "sold" },
  { id: "a-27", block: "A", no: 27, floor: "4", type: "3+1 Dubleks", area: 153.5, price: 550000, status: "available" },
  { id: "a-28", block: "A", no: 28, floor: "4", type: "3+1 Dubleks", area: 153.5, price: 550000, status: "available" },
  { id: "a-29", block: "A", no: 29, floor: "4", type: "2+1", area: 63, price: null, status: "sold" },
  { id: "a-30", block: "A", no: 30, floor: "4", type: "2+1", area: 63, price: null, status: "sold" },
  { id: "a-31", block: "A", no: 31, floor: "4", type: "3+1 Dubleks", area: 160, price: 550000, status: "available" },
  { id: "a-17", block: "A", no: 17, floor: "3", type: "1+1", area: 50.2, price: 260000, status: "available" },
  { id: "a-18", block: "A", no: 18, floor: "3", type: "2+1", area: 63, price: null, status: "sold" },
  { id: "a-19", block: "A", no: 19, floor: "3", type: "1+1", area: 50, price: null, status: "sold" },
  { id: "a-20", block: "A", no: 20, floor: "3", type: "1+1", area: 50.2, price: 260000, status: "available" },
  { id: "a-21", block: "A", no: 21, floor: "3", type: "1+1", area: 50.2, price: 260000, status: "available" },
  { id: "a-22", block: "A", no: 22, floor: "3", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "a-23", block: "A", no: 23, floor: "3", type: "1+1", area: 50.2, price: null, status: "sold" },
  { id: "a-10", block: "A", no: 10, floor: "2", type: "1+1", area: 50.2, price: null, status: "sold" },
  { id: "a-11", block: "A", no: 11, floor: "2", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "a-12", block: "A", no: 12, floor: "2", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "a-13", block: "A", no: 13, floor: "2", type: "1+1", area: 50.2, price: 255000, status: "available" },
  { id: "a-14", block: "A", no: 14, floor: "2", type: "1+1", area: 50.2, price: 255000, status: "available" },
  { id: "a-15", block: "A", no: 15, floor: "2", type: "1+1", area: 45.2, price: null, status: "sold" },
  { id: "a-16", block: "A", no: 16, floor: "2", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "a-3", block: "A", no: 3, floor: "1", type: "1+1", area: 50, price: 250000, status: "available" },
  { id: "a-4", block: "A", no: 4, floor: "1", type: "2+1", area: 53, price: null, status: "sold" },
  { id: "a-5", block: "A", no: 5, floor: "1", type: "2+1", area: 53, price: null, status: "sold" },
  { id: "a-6", block: "A", no: 6, floor: "1", type: "1+1", area: 50.2, price: 250000, status: "available" },
  { id: "a-7", block: "A", no: 7, floor: "1", type: "1+1", area: 50.2, price: 250000, status: "available" },
  { id: "a-8", block: "A", no: 8, floor: "1", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "a-9", block: "A", no: 9, floor: "1", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "a-2", block: "A", no: 2, floor: "0", type: "2+1", area: 53.2, price: null, status: "sold" },
  { id: "a-1", block: "A", no: 1, floor: "0", type: "1+1", area: 50.2, price: null, status: "sold" },

  { id: "b-42", block: "B", no: 42, floor: "4", type: "2+1 Dubleks", area: 86.2, price: null, status: "sold" },
  { id: "b-41", block: "B", no: 41, floor: "4", type: "2+1 Dubleks", area: 86.2, price: null, status: "sold" },
  { id: "b-40", block: "B", no: 40, floor: "4", type: "2+1 Dubleks", area: 95.5, price: 375000, status: "available" },
  { id: "b-39", block: "B", no: 39, floor: "4", type: "2+1 Dubleks", area: 86.2, price: null, status: "sold" },
  { id: "b-38", block: "B", no: 38, floor: "4", type: "2+1 Dubleks", area: 87.2, price: 375000, status: "available" },
  { id: "b-37", block: "B", no: 37, floor: "4", type: "2+1 Dubleks", area: 90.2, price: 375000, status: "available" },
  { id: "b-36", block: "B", no: 36, floor: "4", type: "2+1 Dubleks", area: 86.2, price: null, status: "sold" },
  { id: "b-35", block: "B", no: 35, floor: "4", type: "2+1 Dubleks", area: 95.5, price: 375000, status: "available" },
  { id: "b-34", block: "B", no: 34, floor: "4", type: "2+1 Dubleks", area: 86.2, price: null, status: "sold" },
  { id: "b-33", block: "B", no: 33, floor: "4", type: "2+1 Dubleks", area: 88.2, price: 375000, status: "available" },
  { id: "b-32", block: "B", no: 32, floor: "3", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-31", block: "B", no: 31, floor: "3", type: "1+1", area: 45.2, price: 265000, status: "available" },
  { id: "b-30", block: "B", no: 30, floor: "3", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-29", block: "B", no: 29, floor: "3", type: "1+1", area: 45.2, price: 265000, status: "available" },
  { id: "b-28", block: "B", no: 28, floor: "3", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-27", block: "B", no: 27, floor: "3", type: "1+1", area: 45.2, price: 265000, status: "available" },
  { id: "b-26", block: "B", no: 26, floor: "3", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-25", block: "B", no: 25, floor: "3", type: "1+1", area: 45.2, price: 265000, status: "available" },
  { id: "b-24", block: "B", no: 24, floor: "2", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-23", block: "B", no: 23, floor: "2", type: "1+1", area: 45.2, price: 260000, status: "available" },
  { id: "b-22", block: "B", no: 22, floor: "2", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-21", block: "B", no: 21, floor: "2", type: "1+1", area: 45.2, price: 260000, status: "available" },
  { id: "b-20", block: "B", no: 20, floor: "2", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-19", block: "B", no: 19, floor: "2", type: "1+1", area: 45.2, price: 260000, status: "available" },
  { id: "b-18", block: "B", no: 18, floor: "2", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-17", block: "B", no: 17, floor: "2", type: "1+1", area: 45.2, price: 260000, status: "available" },
  { id: "b-16", block: "B", no: 16, floor: "1", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-15", block: "B", no: 15, floor: "1", type: "1+1", area: 45.2, price: 255000, status: "available" },
  { id: "b-14", block: "B", no: 14, floor: "1", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-13", block: "B", no: 13, floor: "1", type: "1+1", area: 45.2, price: 255000, status: "available" },
  { id: "b-12", block: "B", no: 12, floor: "1", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-11", block: "B", no: 11, floor: "1", type: "1+1", area: 45.2, price: 255000, status: "available" },
  { id: "b-10", block: "B", no: 10, floor: "1", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-9", block: "B", no: 9, floor: "1", type: "1+1", area: 45.2, price: 255000, status: "available" },
  { id: "b-8", block: "B", no: 8, floor: "0", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-7", block: "B", no: 7, floor: "0", type: "1+1", area: 45.2, price: 250000, status: "available" },
  { id: "b-6", block: "B", no: 6, floor: "0", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-5", block: "B", no: 5, floor: "0", type: "1+1", area: 45.2, price: 250000, status: "available" },
  { id: "b-4", block: "B", no: 4, floor: "0", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-3", block: "B", no: 3, floor: "0", type: "1+1", area: 45.2, price: 250000, status: "available" },
  { id: "b-2", block: "B", no: 2, floor: "0", type: "2+1", area: 63.2, price: null, status: "sold" },
  { id: "b-1", block: "B", no: 1, floor: "0", type: "1+1", area: 45.2, price: 250000, status: "available" },
];

export function formatPrice(value: number, lang: "tr" | "en" | "de" | "ru") {
  const locale = lang === "tr" ? "tr-TR" : lang === "de" ? "de-DE" : lang === "ru" ? "ru-RU" : "en-GB";
  const formatted = new Intl.NumberFormat(locale).format(value);
  return `€${formatted}`;
}

export function formatArea(value: number) {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} m²`;
}
