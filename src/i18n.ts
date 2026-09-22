export type Lang = "tr" | "en" | "de" | "ru";

export const langs: Lang[] = ["tr", "en", "de", "ru"];

export const langLabels: Record<Lang, string> = {
  tr: "TR",
  en: "EN",
  de: "DE",
  ru: "RU",
};

type CopyBlock = {
  brand: string;
  company: string;
  nav: {
    project: string;
    interiors: string;
    amenities: string;
    units: string;
    team: string;
    location: string;
    contact: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    cta: string;
    secondary: string;
    project: string;
    next: string;
    prev: string;
  };
  stats: { value: string; label: string }[];
  project: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    facts: { label: string; value: string }[];
  };
  gallery: { eyebrow: string; title: string };
  interiors: {
    eyebrow: string;
    title: string;
    items: { src: string; caption: string }[];
  };
  amenities: {
    eyebrow: string;
    title: string;
    list: { src: string; title: string; text: string }[];
    extras: string[];
  };
  units: {
    eyebrow: string;
    title: string;
    note: string;
    all: string;
    available: string;
    sold: string;
    blockA: string;
    blockB: string;
    plans: string;
    official: string;
    filterHint: string;
  };
  team: { eyebrow: string; title: string; lead: string };
  location: {
    eyebrow: string;
    title: string;
    text: string;
    map: string;
    address: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    send: string;
    whatsapp: string;
    office: string;
    sent: string;
  };
  footer: { rights: string; site: string };
};

export const copy: Record<Lang, CopyBlock> = {
  tr: {
    brand: "Golden Luxury",
    company: "Golden Luxury İnşaat",
    nav: {
      project: "Proje",
      interiors: "İç Mekan",
      amenities: "Sosyal Alan",
      units: "Daireler",
      team: "Yönetim",
      location: "Konum",
      contact: "İletişim",
    },
    hero: {
      kicker: "Alanya · Güller Pınarı",
      title: "Golden Luxury",
      subtitle: "Denize 200 metre. Neoklasik cephe, altın detaylar, sakin bir şehir yaşamı.",
      cta: "Daireleri incele",
      secondary: "Konumu gör",
      project: "Golden Luxury İnşaat",
      next: "Sonraki",
      prev: "Önceki",
    },
    stats: [
      { value: "200 m", label: "Denize mesafe" },
      { value: "2 blok", label: "A ve B blok" },
      { value: "5 kat", label: "Modern yapı" },
      { value: "€250.000", label: "Başlangıç fiyatı" },
    ],
    project: {
      eyebrow: "Proje",
      title: "Alanya merkezde, denize yakın bir yaşam.",
      lead:
        "Golden Luxury, Güller Pınarı’nın kalbinde iki adet 5 katlı bloktan oluşur. 1+1, 2+1 dubleks ve 3+1 dubleks daireler; plajlara, marketlere, restoranlara ve toplu taşımaya yürüme mesafesindedir.",
      body:
        "Zarif klasik cephe, altın detaylı balkon korkulukları ve peyzajlı avlu ile tasarlandı. Yatırım ve kira geliri potansiyeli yüksek, şehir hayatına açık bir konut projesidir.",
      facts: [
        { label: "Konum", value: "Güller Pınarı, Alanya Merkez" },
        { label: "Havalimanı", value: "Gazipaşa 35 km · Antalya 125 km" },
        { label: "Daire tipleri", value: "1+1 · 2+1 dubleks · 3+1 dubleks" },
        { label: "Müteahhit", value: "Golden Luxury İnşaat" },
      ],
    },
    gallery: { eyebrow: "Mimari", title: "Dış cephe" },
    interiors: {
      eyebrow: "Yaşam alanları",
      title: "Aydınlık, sade iç mekanlar",
      items: [
        { src: "/media/interior-living-01.jpg", caption: "1+1 salon" },
        { src: "/media/interior-living-03.jpg", caption: "1+1 mutfak-salon" },
        { src: "/media/interior-duplex-living.jpg", caption: "Dubleks salon" },
        { src: "/media/interior-bedroom-01.jpg", caption: "1+1 yatak odası" },
        { src: "/media/interior-duplex-bedroom.jpg", caption: "Dubleks ebeveyn odası" },
        { src: "/media/interior-bath.jpg", caption: "Banyo" },
      ],
    },
    amenities: {
      eyebrow: "Altyapı",
      title: "Site içi sosyal alanlar",
      list: [
        { src: "/media/amenity-pool.jpg", title: "Açık yüzme havuzu", text: "Çocuk bölümü ve güneşlenme alanı." },
        { src: "/media/amenity-fitness.jpg", title: "Fitness", text: "Havuza bakan modern spor salonu." },
        { src: "/media/amenity-sauna.jpg", title: "Sauna", text: "Ahşap kaplama dinlenme alanı." },
        { src: "/media/amenity-playroom.jpg", title: "Çocuk oyun odası", text: "Kapalı, güvenli oyun alanı." },
        { src: "/media/amenity-playground.jpg", title: "Çocuk parkı", text: "Peyzaj içinde açık oyun alanı." },
        { src: "/media/amenity-lounge.jpg", title: "Barbekü & dinlenme", text: "Ortak teras ve sosyal alan." },
      ],
      extras: [
        "7/24 CCTV ve kontrollü giriş",
        "Jeneratör ve acil aydınlatma",
        "Açık otopark",
        "Isı ve ses yalıtımlı PVC doğrama",
        "Çelik kapı, ankastre mutfak, granit tezgâh",
        "Cam duş kabini, asma klozet",
      ],
    },
    units: {
      eyebrow: "Satış",
      title: "Daire müsaitliği",
      note: "Fiyatlar euro cinsindendir. Satılan daireler durum sütununda işaretlenir.",
      all: "Tümü",
      available: "Müsait",
      sold: "Satıldı",
      blockA: "A Blok",
      blockB: "B Blok",
      plans: "Kat planı PDF",
      official: "Resmi fiyat listesi",
      filterHint: "Tip",
    },
    team: {
      eyebrow: "Yönetim",
      title: "Müteahhit ve proje sorumlusu",
      lead: "Proje, Golden Luxury İnşaat tarafından geliştirilmekte ve yönetilmektedir.",
    },
    location: {
      eyebrow: "Konum",
      title: "Güller Pınarı, Alanya",
      text: "Denize 200 metre, Alanya merkezde. Plaj, çarşı ve günlük yaşam bir arada. Ofisimiz aynı mahallede, Yenilmez Caddesi 18/C’dedir.",
      map: "Haritada aç",
      address: "Güller Pınarı, Yenilmez Cd. 18/C, Alanya / Antalya",
    },
    contact: {
      eyebrow: "İletişim",
      title: "Daire rezervasyonu ve keşif.",
      name: "Ad soyad",
      email: "E-posta",
      phone: "Telefon",
      message: "Mesajınız",
      send: "Mesaj gönder",
      whatsapp: "WhatsApp",
      office: "Alanya ofisi",
      sent: "E-posta uygulamanız açıldı.",
    },
    footer: { rights: "Tüm hakları saklıdır.", site: "goldeluxury" },
  },
  en: {
    brand: "Golden Luxury",
    company: "Golden Luxury Construction",
    nav: {
      project: "Project",
      interiors: "Interiors",
      amenities: "Amenities",
      units: "Residences",
      team: "Leadership",
      location: "Location",
      contact: "Contact",
    },
    hero: {
      kicker: "Alanya · Güller Pınarı",
      title: "Golden Luxury",
      subtitle: "200 metres from the sea. Neoclassical façades, gold detail, quiet city living.",
      cta: "View residences",
      secondary: "See location",
      project: "Golden Luxury Construction",
      next: "Next",
      prev: "Previous",
    },
    stats: [
      { value: "200 m", label: "To the sea" },
      { value: "2 blocks", label: "Block A & B" },
      { value: "5 floors", label: "Modern structure" },
      { value: "€250,000", label: "Starting price" },
    ],
    project: {
      eyebrow: "The project",
      title: "City living, a short walk from the water.",
      lead:
        "Golden Luxury sits in the heart of Güller Pınarı: two five-storey blocks with 1+1, 2+1 duplex and 3+1 duplex homes, close to beaches, shops, restaurants and transit.",
      body:
        "Classical façades, gold-detailed balcony rails and a landscaped courtyard. Designed for daily living, with strong rental and investment appeal.",
      facts: [
        { label: "Location", value: "Güller Pınarı, central Alanya" },
        { label: "Airports", value: "Gazipaşa 35 km · Antalya 125 km" },
        { label: "Layouts", value: "1+1 · 2+1 duplex · 3+1 duplex" },
        { label: "Developer", value: "Golden Luxury Construction" },
      ],
    },
    gallery: { eyebrow: "Architecture", title: "Exterior" },
    interiors: {
      eyebrow: "Interiors",
      title: "Light, considered rooms",
      items: [
        { src: "/media/interior-living-01.jpg", caption: "1+1 living room" },
        { src: "/media/interior-living-03.jpg", caption: "1+1 kitchen-living" },
        { src: "/media/interior-duplex-living.jpg", caption: "Duplex living" },
        { src: "/media/interior-bedroom-01.jpg", caption: "1+1 bedroom" },
        { src: "/media/interior-duplex-bedroom.jpg", caption: "Duplex master bedroom" },
        { src: "/media/interior-bath.jpg", caption: "Bathroom" },
      ],
    },
    amenities: {
      eyebrow: "Amenities",
      title: "Shared spaces on site",
      list: [
        { src: "/media/amenity-pool.jpg", title: "Outdoor pool", text: "Children’s section and sun deck." },
        { src: "/media/amenity-fitness.jpg", title: "Fitness", text: "A gym looking onto the pool." },
        { src: "/media/amenity-sauna.jpg", title: "Sauna", text: "Timber-lined rest space." },
        { src: "/media/amenity-playroom.jpg", title: "Indoor playroom", text: "A safe room for children." },
        { src: "/media/amenity-playground.jpg", title: "Playground", text: "Open play within the garden." },
        { src: "/media/amenity-lounge.jpg", title: "BBQ & lounge", text: "Shared terrace and social area." },
      ],
      extras: [
        "24/7 CCTV and controlled access",
        "Generator and emergency lighting",
        "Open parking",
        "Insulated PVC double glazing",
        "Steel entrance door, fitted kitchen, granite worktop",
        "Glass shower cabin, wall-hung WC",
      ],
    },
    units: {
      eyebrow: "Availability",
      title: "Residences",
      note: "Prices are in euro. Sold residences are marked in the status column.",
      all: "All",
      available: "Available",
      sold: "Sold",
      blockA: "Block A",
      blockB: "Block B",
      plans: "Floor plan PDF",
      official: "Official price list",
      filterHint: "Type",
    },
    team: {
      eyebrow: "Leadership",
      title: "Contractor and project lead",
      lead: "The development is built and directed by Golden Luxury Construction.",
    },
    location: {
      eyebrow: "Location",
      title: "Güller Pınarı, Alanya",
      text: "200 metres from the sea, in central Alanya. Beach, market and daily life are close. Our office is on the same street: Yenilmez Caddesi 18/C.",
      map: "Open in Maps",
      address: "Güller Pınarı, Yenilmez Cd. 18/C, Alanya / Antalya",
    },
    contact: {
      eyebrow: "Contact",
      title: "Reserve a viewing.",
      name: "Full name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      send: "Send message",
      whatsapp: "WhatsApp",
      office: "Alanya office",
      sent: "Your email client is opening.",
    },
    footer: { rights: "All rights reserved.", site: "goldeluxury" },
  },
  de: {
    brand: "Golden Luxury",
    company: "Golden Luxury Bau",
    nav: {
      project: "Projekt",
      interiors: "Innenräume",
      amenities: "Ausstattung",
      units: "Wohnungen",
      team: "Leitung",
      location: "Lage",
      contact: "Kontakt",
    },
    hero: {
      kicker: "Alanya · Güller Pınarı",
      title: "Golden Luxury",
      subtitle: "200 Meter zum Meer. Neoklassische Fassaden, Golddetails, ruhiges Stadtleben.",
      cta: "Wohnungen ansehen",
      secondary: "Lage anzeigen",
      project: "Golden Luxury Bau",
      next: "Weiter",
      prev: "Zurück",
    },
    stats: [
      { value: "200 m", label: "Zum Meer" },
      { value: "2 Blöcke", label: "Block A & B" },
      { value: "5 Etagen", label: "Moderne Struktur" },
      { value: "€250.000", label: "Startpreis" },
    ],
    project: {
      eyebrow: "Das Projekt",
      title: "Stadtleben, nur wenige Schritte vom Wasser.",
      lead:
        "Golden Luxury liegt im Herzen von Güller Pınarı: zwei fünfgeschossige Blöcke mit 1+1-, 2+1-Duplex- und 3+1-Duplex-Wohnungen, nah an Stränden, Geschäften, Restaurants und dem ÖPNV.",
      body:
        "Klassische Fassaden, goldene Balkongeländer und ein angelegter Innenhof. Für den Alltag konzipiert – mit starkem Miet- und Investitionspotenzial.",
      facts: [
        { label: "Lage", value: "Güller Pınarı, Zentrum Alanya" },
        { label: "Flughäfen", value: "Gazipaşa 35 km · Antalya 125 km" },
        { label: "Grundrisse", value: "1+1 · 2+1 Duplex · 3+1 Duplex" },
        { label: "Bauträger", value: "Golden Luxury Bau" },
      ],
    },
    gallery: { eyebrow: "Architektur", title: "Außenansicht" },
    interiors: {
      eyebrow: "Innenräume",
      title: "Helle, durchdachte Räume",
      items: [
        { src: "/media/interior-living-01.jpg", caption: "1+1 Wohnzimmer" },
        { src: "/media/interior-living-03.jpg", caption: "1+1 Küche-Wohnen" },
        { src: "/media/interior-duplex-living.jpg", caption: "Duplex Wohnzimmer" },
        { src: "/media/interior-bedroom-01.jpg", caption: "1+1 Schlafzimmer" },
        { src: "/media/interior-duplex-bedroom.jpg", caption: "Duplex Elternschlafzimmer" },
        { src: "/media/interior-bath.jpg", caption: "Bad" },
      ],
    },
    amenities: {
      eyebrow: "Ausstattung",
      title: "Gemeinschaftsbereiche vor Ort",
      list: [
        { src: "/media/amenity-pool.jpg", title: "Außenpool", text: "Kinderbereich und Sonnendeck." },
        { src: "/media/amenity-fitness.jpg", title: "Fitness", text: "Modernes Fitnessstudio mit Blick auf den Pool." },
        { src: "/media/amenity-sauna.jpg", title: "Sauna", text: "Ruhebereich mit Holzverkleidung." },
        { src: "/media/amenity-playroom.jpg", title: "Spielzimmer", text: "Sicherer Innenbereich für Kinder." },
        { src: "/media/amenity-playground.jpg", title: "Spielplatz", text: "Offener Spielbereich im Garten." },
        { src: "/media/amenity-lounge.jpg", title: "Grill & Lounge", text: "Gemeinsame Terrasse und Sozialbereich." },
      ],
      extras: [
        "24/7 CCTV und kontrollierter Zugang",
        "Generator und Notbeleuchtung",
        "Offene Parkplätze",
        "Isolierte PVC-Doppelverglasung",
        "Stahltür, Einbauküche, Granitarbeitsplatte",
        "Glasdusche, Wand-WC",
      ],
    },
    units: {
      eyebrow: "Verfügbarkeit",
      title: "Wohnungen",
      note: "Preise in Euro. Orange markierte Einheiten sind verkauft.",
      all: "Alle",
      available: "Verfügbar",
      sold: "Verkauft",
      blockA: "Block A",
      blockB: "Block B",
      plans: "Grundriss-PDF",
      official: "Offizielle Preisliste",
      filterHint: "Typ",
    },
    team: {
      eyebrow: "Leitung",
      title: "Bauträger und Projektverantwortung",
      lead: "Das Projekt wird von Golden Luxury Bau entwickelt und geleitet.",
    },
    location: {
      eyebrow: "Lage",
      title: "Güller Pınarı, Alanya",
      text: "200 Meter zum Meer, im Zentrum von Alanya. Strand, Markt und Alltag sind nah. Unser Büro liegt in derselben Straße: Yenilmez Caddesi 18/C.",
      map: "In Karten öffnen",
      address: "Güller Pınarı, Yenilmez Cd. 18/C, Alanya / Antalya",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Besichtigung vereinbaren.",
      name: "Vollständiger Name",
      email: "E-Mail",
      phone: "Telefon",
      message: "Ihre Nachricht",
      send: "Nachricht senden",
      whatsapp: "WhatsApp",
      office: "Büro Alanya",
      sent: "Ihr E-Mail-Programm wird geöffnet.",
    },
    footer: { rights: "Alle Rechte vorbehalten.", site: "goldeluxury" },
  },
  ru: {
    brand: "Golden Luxury",
    company: "Golden Luxury Construction",
    nav: {
      project: "Проект",
      interiors: "Интерьеры",
      amenities: "Инфраструктура",
      units: "Квартиры",
      team: "Руководство",
      location: "Расположение",
      contact: "Контакты",
    },
    hero: {
      kicker: "Аланья · Güller Pınarı",
      title: "Golden Luxury",
      subtitle: "200 метров до моря. Неоклассические фасады, золотые детали, спокойная городская жизнь.",
      cta: "Смотреть квартиры",
      secondary: "Смотреть на карте",
      project: "Golden Luxury Construction",
      next: "Далее",
      prev: "Назад",
    },
    stats: [
      { value: "200 м", label: "До моря" },
      { value: "2 блока", label: "Блок A и B" },
      { value: "5 этажей", label: "Современное здание" },
      { value: "€250.000", label: "Стартовая цена" },
    ],
    project: {
      eyebrow: "Проект",
      title: "Городская жизнь в нескольких шагах от моря.",
      lead:
        "Golden Luxury расположен в самом сердце района Güller Pınarı: два пятиэтажных блока с планировками 1+1, 2+1 дуплекс и 3+1 дуплекс — рядом с пляжами, магазинами, ресторанами и транспортом.",
      body:
        "Классические фасады, золотые детали балконных ограждений и благоустроенный двор. Создан для повседневной жизни — с высоким потенциалом аренды и инвестиций.",
      facts: [
        { label: "Расположение", value: "Güller Pınarı, центр Аланьи" },
        { label: "Аэропорты", value: "Газипаша 35 км · Анталья 125 км" },
        { label: "Планировки", value: "1+1 · 2+1 дуплекс · 3+1 дуплекс" },
        { label: "Застройщик", value: "Golden Luxury Construction" },
      ],
    },
    gallery: { eyebrow: "Архитектура", title: "Экстерьер" },
    interiors: {
      eyebrow: "Интерьеры",
      title: "Светлые, продуманные пространства",
      items: [
        { src: "/media/interior-living-01.jpg", caption: "1+1 гостиная" },
        { src: "/media/interior-living-03.jpg", caption: "1+1 кухня-гостиная" },
        { src: "/media/interior-duplex-living.jpg", caption: "Дуплекс гостиная" },
        { src: "/media/interior-bedroom-01.jpg", caption: "1+1 спальня" },
        { src: "/media/interior-duplex-bedroom.jpg", caption: "Дуплекс спальня родителей" },
        { src: "/media/interior-bath.jpg", caption: "Ванная" },
      ],
    },
    amenities: {
      eyebrow: "Инфраструктура",
      title: "Общие зоны на территории",
      list: [
        { src: "/media/amenity-pool.jpg", title: "Открытый бассейн", text: "Детская зона и солярий." },
        { src: "/media/amenity-fitness.jpg", title: "Фитнес", text: "Современный зал с видом на бассейн." },
        { src: "/media/amenity-sauna.jpg", title: "Сауна", text: "Зона отдыха с деревянной отделкой." },
        { src: "/media/amenity-playroom.jpg", title: "Детская комната", text: "Безопасное закрытое пространство." },
        { src: "/media/amenity-playground.jpg", title: "Детская площадка", text: "Открытая игровая зона в саду." },
        { src: "/media/amenity-lounge.jpg", title: "Барбекю и lounge", text: "Общая терраса и зона отдыха." },
      ],
      extras: [
        "Круглосуточное видеонаблюдение и контролируемый въезд",
        "Генератор и аварийное освещение",
        "Открытая парковка",
        "Тепло- и шумоизоляционные ПВХ-окна",
        "Стальная дверь, встроенная кухня, гранитная столешница",
        "Стеклянная душевая кабина, подвесной унитаз",
      ],
    },
    units: {
      eyebrow: "Продажи",
      title: "Квартиры",
      note: "Цены указаны в евро. Оранжевые ячейки — продано.",
      all: "Все",
      available: "Свободно",
      sold: "Продано",
      blockA: "Блок A",
      blockB: "Блок B",
      plans: "План этажа PDF",
      official: "Официальный прайс-лист",
      filterHint: "Тип",
    },
    team: {
      eyebrow: "Руководство",
      title: "Подрядчик и руководитель проекта",
      lead: "Проект разрабатывается и управляется компанией Golden Luxury Construction.",
    },
    location: {
      eyebrow: "Расположение",
      title: "Güller Pınarı, Аланья",
      text: "200 метров до моря, в центре Аланьи. Пляж, рынок и повседневная жизнь рядом. Наш офис на той же улице: Yenilmez Caddesi 18/C.",
      map: "Открыть на карте",
      address: "Güller Pınarı, Yenilmez Cd. 18/C, Alanya / Antalya",
    },
    contact: {
      eyebrow: "Контакты",
      title: "Записаться на просмотр.",
      name: "Имя и фамилия",
      email: "Эл. почта",
      phone: "Телефон",
      message: "Ваше сообщение",
      send: "Отправить",
      whatsapp: "WhatsApp",
      office: "Офис в Аланье",
      sent: "Открывается почтовое приложение.",
    },
    footer: { rights: "Все права защищены.", site: "goldeluxury" },
  },
};
