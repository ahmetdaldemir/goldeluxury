import bcrypt from "bcryptjs";
import { pool, query } from "./db.js";

const LANGS = ["tr", "en", "de", "ru"];

/** [key, tr, en, de, ru] */
const textPairs = [
  ["brand", "Golden Luxury", "Golden Luxury", "Golden Luxury", "Golden Luxury"],
  ["company", "Golden Luxury İnşaat", "Golden Luxury Construction", "Golden Luxury Bau", "Golden Luxury Construction"],
  ["nav.project", "Proje", "Project", "Projekt", "Проект"],
  ["nav.interiors", "İç Mekan", "Interiors", "Innenräume", "Интерьеры"],
  ["nav.amenities", "Sosyal Alan", "Amenities", "Ausstattung", "Инфраструктура"],
  ["nav.units", "Daireler", "Residences", "Wohnungen", "Квартиры"],
  ["nav.team", "Yönetim", "Leadership", "Leitung", "Руководство"],
  ["nav.location", "Konum", "Location", "Lage", "Расположение"],
  ["nav.contact", "İletişim", "Contact", "Kontakt", "Контакты"],
  ["hero.kicker", "Alanya · Güller Pınarı", "Alanya · Güller Pınarı", "Alanya · Güller Pınarı", "Аланья · Güller Pınarı"],
  ["hero.title", "Golden Luxury", "Golden Luxury", "Golden Luxury", "Golden Luxury"],
  [
    "hero.subtitle",
    "Denize 200 metre. İki blok. Klasik çizgide, sakin bir şehir yaşamı.",
    "200 metres from the sea. Two blocks. A quiet, classical city residence.",
    "200 Meter zum Meer. Zwei Blöcke. Ruhiges Stadtleben in klassischem Stil.",
    "200 метров до моря. Два блока. Спокойная городская жизнь в классическом стиле.",
  ],
  ["hero.cta", "Daireleri incele", "View residences", "Wohnungen ansehen", "Смотреть квартиры"],
  ["hero.secondary", "Konumu gör", "See location", "Lage anzeigen", "Смотреть на карте"],
  ["hero.project", "Golden Luxury İnşaat", "Golden Luxury Construction", "Golden Luxury Bau", "Golden Luxury Construction"],
  ["hero.next", "Sonraki", "Next", "Weiter", "Далее"],
  ["hero.prev", "Önceki", "Previous", "Zurück", "Назад"],
  ["project.eyebrow", "Proje", "The project", "Das Projekt", "Проект"],
  [
    "project.title",
    "Alanya merkezde, denize yakın bir yaşam.",
    "City living, a short walk from the water.",
    "Stadtleben, nur wenige Schritte vom Wasser.",
    "Городская жизнь в нескольких шагах от моря.",
  ],
  [
    "project.lead",
    "Golden Luxury, Güller Pınarı’nın kalbinde iki adet 5 katlı bloktan oluşur. 1+1, 2+1 dubleks ve 3+1 dubleks daireler; plajlara, marketlere, restoranlara ve toplu taşımaya yürüme mesafesindedir.",
    "Golden Luxury sits in the heart of Güller Pınarı: two five-storey blocks with 1+1, 2+1 duplex and 3+1 duplex homes, close to beaches, shops, restaurants and transit.",
    "Golden Luxury liegt im Herzen von Güller Pınarı: zwei fünfgeschossige Blöcke mit 1+1-, 2+1-Duplex- und 3+1-Duplex-Wohnungen, nah an Stränden, Geschäften, Restaurants und dem ÖPNV.",
    "Golden Luxury расположен в самом сердце района Güller Pınarı: два пятиэтажных блока с планировками 1+1, 2+1 дуплекс и 3+1 дуплекс — рядом с пляжами, магазинами, ресторанами и транспортом.",
  ],
  [
    "project.body",
    "Zarif klasik cephe, altın detaylı balkon korkulukları ve peyzajlı avlu ile tasarlandı. Yatırım ve kira geliri potansiyeli yüksek, şehir hayatına açık bir konut projesidir.",
    "Classical façades, gold-detailed balcony rails and a landscaped courtyard. Designed for daily living, with strong rental and investment appeal.",
    "Klassische Fassaden, goldene Balkongeländer und ein angelegter Innenhof. Für den Alltag konzipiert – mit starkem Miet- und Investitionspotenzial.",
    "Классические фасады, золотые детали балконных ограждений и благоустроенный двор. Создан для повседневной жизни — с высоким потенциалом аренды и инвестиций.",
  ],
  ["gallery.eyebrow", "Mimari", "Architecture", "Architektur", "Архитектура"],
  ["gallery.title", "Dış cephe", "Exterior", "Außenansicht", "Экстерьер"],
  ["interiors.eyebrow", "Yaşam alanları", "Interiors", "Innenräume", "Интерьеры"],
  ["interiors.title", "Aydınlık, sade iç mekanlar", "Light, considered rooms", "Helle, durchdachte Räume", "Светлые, продуманные пространства"],
  ["amenities.eyebrow", "Altyapı", "Amenities", "Ausstattung", "Инфраструктура"],
  ["amenities.title", "Site içi sosyal alanlar", "Shared spaces on site", "Gemeinschaftsbereiche vor Ort", "Общие зоны на территории"],
  ["units.eyebrow", "Satış", "Availability", "Verfügbarkeit", "Продажи"],
  ["units.title", "Daire müsaitliği", "Residences", "Wohnungen", "Квартиры"],
  [
    "units.note",
    "Fiyatlar euro cinsindendir. Turuncu hücreler satılmıştır.",
    "Prices are in euro. Orange cells are sold.",
    "Preise in Euro. Orange markierte Einheiten sind verkauft.",
    "Цены указаны в евро. Оранжевые ячейки — продано.",
  ],
  ["units.all", "Tümü", "All", "Alle", "Все"],
  ["units.available", "Müsait", "Available", "Verfügbar", "Свободно"],
  ["units.sold", "Satıldı", "Sold", "Verkauft", "Продано"],
  ["units.blockA", "A Blok", "Block A", "Block A", "Блок A"],
  ["units.blockB", "B Blok", "Block B", "Block B", "Блок B"],
  ["units.plans", "Kat planı PDF", "Floor plan PDF", "Grundriss-PDF", "План этажа PDF"],
  ["units.official", "Resmi fiyat listesi", "Official price list", "Offizielle Preisliste", "Официальный прайс-лист"],
  ["units.filterHint", "Tip", "Type", "Typ", "Тип"],
  ["team.eyebrow", "Yönetim", "Leadership", "Leitung", "Руководство"],
  ["team.title", "Müteahhit ve proje sorumlusu", "Contractor and project lead", "Bauträger und Projektverantwortung", "Подрядчик и руководитель проекта"],
  [
    "team.lead",
    "Proje, Golden Luxury İnşaat tarafından geliştirilmekte ve yönetilmektedir.",
    "The development is built and directed by Golden Luxury Construction.",
    "Das Projekt wird von Golden Luxury Bau entwickelt und geleitet.",
    "Проект разрабатывается и управляется компанией Golden Luxury Construction.",
  ],
  ["location.eyebrow", "Konum", "Location", "Lage", "Расположение"],
  ["location.title", "Güller Pınarı, Alanya", "Güller Pınarı, Alanya", "Güller Pınarı, Alanya", "Güller Pınarı, Аланья"],
  [
    "location.text",
    "Denize 200 metre, Alanya merkezde. Plaj, çarşı ve günlük yaşam bir arada. Ofisimiz aynı mahallede, Yenilmez Caddesi 18/C’dedir.",
    "200 metres from the sea, in central Alanya. Beach, market and daily life are close. Our office is on the same street: Yenilmez Caddesi 18/C.",
    "200 Meter zum Meer, im Zentrum von Alanya. Strand, Markt und Alltag sind nah. Unser Büro liegt in derselben Straße: Yenilmez Caddesi 18/C.",
    "200 метров до моря, в центре Аланьи. Пляж, рынок и повседневная жизнь рядом. Наш офис на той же улице: Yenilmez Caddesi 18/C.",
  ],
  ["location.map", "Haritada aç", "Open in Maps", "In Karten öffnen", "Открыть на карте"],
  [
    "location.address",
    "Güller Pınarı, Yenilmez Cd. 18/C, Alanya / Antalya",
    "Güller Pınarı, Yenilmez Cd. 18/C, Alanya / Antalya",
    "Güller Pınarı, Yenilmez Cd. 18/C, Alanya / Antalya",
    "Güller Pınarı, Yenilmez Cd. 18/C, Alanya / Antalya",
  ],
  ["contact.eyebrow", "İletişim", "Contact", "Kontakt", "Контакты"],
  ["contact.title", "Daire rezervasyonu ve keşif.", "Reserve a viewing.", "Besichtigung vereinbaren.", "Записаться на просмотр."],
  ["contact.name", "Ad soyad", "Full name", "Vollständiger Name", "Имя и фамилия"],
  ["contact.email", "E-posta", "Email", "E-Mail", "Эл. почта"],
  ["contact.phone", "Telefon", "Phone", "Telefon", "Телефон"],
  ["contact.message", "Mesajınız", "Message", "Ihre Nachricht", "Ваше сообщение"],
  ["contact.send", "Mesaj gönder", "Send message", "Nachricht senden", "Отправить"],
  ["contact.whatsapp", "WhatsApp", "WhatsApp", "WhatsApp", "WhatsApp"],
  ["contact.office", "Alanya ofisi", "Alanya office", "Büro Alanya", "Офис в Аланье"],
  ["contact.sent", "E-posta uygulamanız açıldı.", "Your email client is opening.", "Ihr E-Mail-Programm wird geöffnet.", "Открывается почтовое приложение."],
  ["footer.rights", "Tüm hakları saklıdır.", "All rights reserved.", "Alle Rechte vorbehalten.", "Все права защищены."],
  ["footer.site", "goldeluxury", "goldeluxury", "goldeluxury", "goldeluxury"],
];

const units = [
  ["a-24","A",24,"4","3+1 Dubleks",160.2,550000,"available"],
  ["a-25","A",25,"4","2+1",63,null,"sold"],
  ["a-26","A",26,"4","2+1",63,null,"sold"],
  ["a-27","A",27,"4","3+1 Dubleks",153.5,550000,"available"],
  ["a-28","A",28,"4","3+1 Dubleks",153.5,550000,"available"],
  ["a-29","A",29,"4","2+1",63,null,"sold"],
  ["a-30","A",30,"4","2+1",63,null,"sold"],
  ["a-31","A",31,"4","3+1 Dubleks",160,550000,"available"],
  ["a-17","A",17,"3","1+1",50.2,260000,"available"],
  ["a-18","A",18,"3","2+1",63,null,"sold"],
  ["a-19","A",19,"3","1+1",50,null,"sold"],
  ["a-20","A",20,"3","1+1",50.2,260000,"available"],
  ["a-21","A",21,"3","1+1",50.2,260000,"available"],
  ["a-22","A",22,"3","2+1",63.2,null,"sold"],
  ["a-23","A",23,"3","1+1",50.2,null,"sold"],
  ["a-10","A",10,"2","1+1",50.2,null,"sold"],
  ["a-11","A",11,"2","2+1",63.2,null,"sold"],
  ["a-12","A",12,"2","2+1",63.2,null,"sold"],
  ["a-13","A",13,"2","1+1",50.2,255000,"available"],
  ["a-14","A",14,"2","1+1",50.2,255000,"available"],
  ["a-15","A",15,"2","1+1",45.2,null,"sold"],
  ["a-16","A",16,"2","2+1",63.2,null,"sold"],
  ["a-3","A",3,"1","1+1",50,250000,"available"],
  ["a-4","A",4,"1","2+1",53,null,"sold"],
  ["a-5","A",5,"1","2+1",53,null,"sold"],
  ["a-6","A",6,"1","1+1",50.2,250000,"available"],
  ["a-7","A",7,"1","1+1",50.2,250000,"available"],
  ["a-8","A",8,"1","2+1",63.2,null,"sold"],
  ["a-9","A",9,"1","2+1",63.2,null,"sold"],
  ["a-2","A",2,"0","2+1",53.2,null,"sold"],
  ["a-1","A",1,"0","1+1",50.2,null,"sold"],
  ["b-42","B",42,"4","2+1 Dubleks",86.2,null,"sold"],
  ["b-41","B",41,"4","2+1 Dubleks",86.2,null,"sold"],
  ["b-40","B",40,"4","2+1 Dubleks",95.5,375000,"available"],
  ["b-39","B",39,"4","2+1 Dubleks",86.2,null,"sold"],
  ["b-38","B",38,"4","2+1 Dubleks",87.2,375000,"available"],
  ["b-37","B",37,"4","2+1 Dubleks",90.2,375000,"available"],
  ["b-36","B",36,"4","2+1 Dubleks",86.2,null,"sold"],
  ["b-35","B",35,"4","2+1 Dubleks",95.5,375000,"available"],
  ["b-34","B",34,"4","2+1 Dubleks",86.2,null,"sold"],
  ["b-33","B",33,"4","2+1 Dubleks",88.2,375000,"available"],
  ["b-32","B",32,"3","2+1",63.2,null,"sold"],
  ["b-31","B",31,"3","1+1",45.2,265000,"available"],
  ["b-30","B",30,"3","2+1",63.2,null,"sold"],
  ["b-29","B",29,"3","1+1",45.2,265000,"available"],
  ["b-28","B",28,"3","2+1",63.2,null,"sold"],
  ["b-27","B",27,"3","1+1",45.2,265000,"available"],
  ["b-26","B",26,"3","2+1",63.2,null,"sold"],
  ["b-25","B",25,"3","1+1",45.2,265000,"available"],
  ["b-24","B",24,"2","2+1",63.2,null,"sold"],
  ["b-23","B",23,"2","1+1",45.2,260000,"available"],
  ["b-22","B",22,"2","2+1",63.2,null,"sold"],
  ["b-21","B",21,"2","1+1",45.2,260000,"available"],
  ["b-20","B",20,"2","2+1",63.2,null,"sold"],
  ["b-19","B",19,"2","1+1",45.2,260000,"available"],
  ["b-18","B",18,"2","2+1",63.2,null,"sold"],
  ["b-17","B",17,"2","1+1",45.2,260000,"available"],
  ["b-16","B",16,"1","2+1",63.2,null,"sold"],
  ["b-15","B",15,"1","1+1",45.2,255000,"available"],
  ["b-14","B",14,"1","2+1",63.2,null,"sold"],
  ["b-13","B",13,"1","1+1",45.2,255000,"available"],
  ["b-12","B",12,"1","2+1",63.2,null,"sold"],
  ["b-11","B",11,"1","1+1",45.2,255000,"available"],
  ["b-10","B",10,"1","2+1",63.2,null,"sold"],
  ["b-9","B",9,"1","1+1",45.2,255000,"available"],
  ["b-8","B",8,"0","2+1",63.2,null,"sold"],
  ["b-7","B",7,"0","1+1",45.2,250000,"available"],
  ["b-6","B",6,"0","2+1",63.2,null,"sold"],
  ["b-5","B",5,"0","1+1",45.2,250000,"available"],
  ["b-4","B",4,"0","2+1",63.2,null,"sold"],
  ["b-3","B",3,"0","1+1",45.2,250000,"available"],
  ["b-2","B",2,"0","2+1",63.2,null,"sold"],
  ["b-1","B",1,"0","1+1",45.2,250000,"available"],
];

async function waitForDb() {
  for (let i = 0; i < 40; i += 1) {
    try {
      await query("SELECT 1");
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
  throw new Error("MySQL not ready");
}

async function seed() {
  await waitForDb();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("SET FOREIGN_KEY_CHECKS=0");
    for (const table of [
      "phones",
      "team_members",
      "units",
      "amenity_extras",
      "media_items",
      "facts",
      "stats",
      "texts",
      "settings",
      "admins",
    ]) {
      await conn.query(`TRUNCATE TABLE ${table}`);
    }
    await conn.query("SET FOREIGN_KEY_CHECKS=1");

    const hash = await bcrypt.hash(process.env.ADMIN_PASS || "admin123", 10);
    await conn.query("INSERT INTO admins (username, password_hash) VALUES (?, ?)", [
      process.env.ADMIN_USER || "admin",
      hash,
    ]);

    const settings = [
      ["logo", "/media/logo.png"],
      ["email", "info@mmttuncgroup.com"],
      ["whatsapp", "https://wa.me/905326988343"],
      ["maps_url", "https://maps.app.goo.gl/ZChY2yR9G1eGJ7De9?g_st=ic"],
      [
        "map_embed",
        "https://maps.google.com/maps?q=Güller%20Pınarı%20Yenilmez%20Caddesi%20Alanya&z=16&output=embed",
      ],
      ["price_a", "/media/price-a.jpg"],
      ["price_b", "/media/price-b.jpg"],
      ["plan_a", "/media/plans/a-block-share.pdf"],
      ["plan_b", "/media/plans/b-block-share.pdf"],
    ];
    for (const [key, value] of settings) {
      await conn.query("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)", [key, value]);
    }

    for (const [key, tr, en, de, ru] of textPairs) {
      const values = { tr, en, de, ru };
      for (const lang of LANGS) {
        await conn.query("INSERT INTO texts (lang, text_key, text_value) VALUES (?, ?, ?)", [
          lang,
          key,
          values[lang],
        ]);
      }
    }

    const stats = [
      ["200 m", "Denize mesafe", "To the sea", "Zum Meer", "До моря", 1],
      ["2 blok", "A ve B blok", "Block A & B", "Block A & B", "Блок A и B", 2],
      ["5 kat", "Modern yapı", "Modern structure", "Moderne Struktur", "Современное здание", 3],
      ["€250.000", "Başlangıç fiyatı", "Starting price", "Startpreis", "Стартовая цена", 4],
    ];
    for (const row of stats) {
      await conn.query(
        "INSERT INTO stats (value_text, label_tr, label_en, label_de, label_ru, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
        row,
      );
    }

    const facts = [
      [
        "Konum",
        "Location",
        "Lage",
        "Расположение",
        "Güller Pınarı, Alanya Merkez",
        "Güller Pınarı, central Alanya",
        "Güller Pınarı, Zentrum Alanya",
        "Güller Pınarı, центр Аланьи",
        1,
      ],
      [
        "Havalimanı",
        "Airports",
        "Flughäfen",
        "Аэропорты",
        "Gazipaşa 35 km · Antalya 125 km",
        "Gazipaşa 35 km · Antalya 125 km",
        "Gazipaşa 35 km · Antalya 125 km",
        "Газипаша 35 км · Анталья 125 км",
        2,
      ],
      [
        "Daire tipleri",
        "Layouts",
        "Grundrisse",
        "Планировки",
        "1+1 · 2+1 dubleks · 3+1 dubleks",
        "1+1 · 2+1 duplex · 3+1 duplex",
        "1+1 · 2+1 Duplex · 3+1 Duplex",
        "1+1 · 2+1 дуплекс · 3+1 дуплекс",
        3,
      ],
      [
        "Müteahhit",
        "Developer",
        "Bauträger",
        "Застройщик",
        "Golden Luxury İnşaat",
        "Golden Luxury Construction",
        "Golden Luxury Bau",
        "Golden Luxury Construction",
        4,
      ],
    ];
    for (const row of facts) {
      await conn.query(
        `INSERT INTO facts
        (label_tr, label_en, label_de, label_ru, value_tr, value_en, value_de, value_ru, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        row,
      );
    }

    const exteriors = [
      ["/media/exterior-night-01.jpg", "Golden Luxury gece cephe", "Golden Luxury night façade", "Golden Luxury Nachtfassade", "Golden Luxury ночной фасад"],
      ["/media/exterior-01.jpg", "Golden Luxury gündüz cephe", "Golden Luxury day façade", "Golden Luxury Tagesfassade", "Golden Luxury дневной фасад"],
      ["/media/exterior-night-02.jpg", "Golden Luxury gece giriş", "Golden Luxury night entrance", "Golden Luxury Nachteingang", "Golden Luxury ночной вход"],
      ["/media/exterior-03.jpg", "Golden Luxury yan cephe", "Golden Luxury side façade", "Golden Luxury Seitenfassade", "Golden Luxury боковой фасад"],
      ["/media/amenity-aerial.jpg", "Havuz ve avlu kuşbakışı", "Pool and courtyard aerial", "Pool und Hof aus der Luft", "Бассейн и двор с высоты"],
      ["/media/exterior-05.jpg", "Golden Luxury bahçe cephesi", "Golden Luxury garden façade", "Golden Luxury Gartenfassade", "Golden Luxury садовый фасад"],
    ];
    for (const [i, [src, tr, en, de, ru]] of exteriors.entries()) {
      await conn.query(
        `INSERT INTO media_items
        (category, src, caption_tr, caption_en, caption_de, caption_ru, sort_order)
        VALUES ('exterior', ?, ?, ?, ?, ?, ?)`,
        [src, tr, en, de, ru, i + 1],
      );
    }

    const interiors = [
      ["/media/interior-living-01.jpg", "1+1 salon", "1+1 living room", "1+1 Wohnzimmer", "1+1 гостиная"],
      ["/media/interior-living-03.jpg", "1+1 mutfak-salon", "1+1 kitchen-living", "1+1 Küche-Wohnen", "1+1 кухня-гостиная"],
      ["/media/interior-duplex-living.jpg", "Dubleks salon", "Duplex living", "Duplex Wohnzimmer", "Дуплекс гостиная"],
      ["/media/interior-bedroom-01.jpg", "1+1 yatak odası", "1+1 bedroom", "1+1 Schlafzimmer", "1+1 спальня"],
      ["/media/interior-duplex-bedroom.jpg", "Dubleks ebeveyn odası", "Duplex master bedroom", "Duplex Elternschlafzimmer", "Дуплекс спальня родителей"],
      ["/media/interior-bath.jpg", "Banyo", "Bathroom", "Bad", "Ванная"],
    ];
    for (const [i, [src, tr, en, de, ru]] of interiors.entries()) {
      await conn.query(
        `INSERT INTO media_items
        (category, src, caption_tr, caption_en, caption_de, caption_ru, sort_order)
        VALUES ('interior', ?, ?, ?, ?, ?, ?)`,
        [src, tr, en, de, ru, i + 1],
      );
    }

    const amenities = [
      [
        "/media/amenity-pool.jpg",
        "Açık yüzme havuzu",
        "Outdoor pool",
        "Außenpool",
        "Открытый бассейн",
        "Çocuk bölümü ve güneşlenme alanı.",
        "Children’s section and sun deck.",
        "Kinderbereich und Sonnendeck.",
        "Детская зона и солярий.",
      ],
      [
        "/media/amenity-fitness.jpg",
        "Fitness",
        "Fitness",
        "Fitness",
        "Фитнес",
        "Havuza bakan modern spor salonu.",
        "A gym looking onto the pool.",
        "Modernes Fitnessstudio mit Blick auf den Pool.",
        "Современный зал с видом на бассейн.",
      ],
      [
        "/media/amenity-sauna.jpg",
        "Sauna",
        "Sauna",
        "Sauna",
        "Сауна",
        "Ahşap kaplama dinlenme alanı.",
        "Timber-lined rest space.",
        "Ruhebereich mit Holzverkleidung.",
        "Зона отдыха с деревянной отделкой.",
      ],
      [
        "/media/amenity-playroom.jpg",
        "Çocuk oyun odası",
        "Indoor playroom",
        "Spielzimmer",
        "Детская комната",
        "Kapalı, güvenli oyun alanı.",
        "A safe room for children.",
        "Sicherer Innenbereich für Kinder.",
        "Безопасное закрытое пространство.",
      ],
      [
        "/media/amenity-playground.jpg",
        "Çocuk parkı",
        "Playground",
        "Spielplatz",
        "Детская площадка",
        "Peyzaj içinde açık oyun alanı.",
        "Open play within the garden.",
        "Offener Spielbereich im Garten.",
        "Открытая игровая зона в саду.",
      ],
      [
        "/media/amenity-lounge.jpg",
        "Barbekü & dinlenme",
        "BBQ & lounge",
        "Grill & Lounge",
        "Барбекю и lounge",
        "Ortak teras ve sosyal alan.",
        "Shared terrace and social area.",
        "Gemeinsame Terrasse und Sozialbereich.",
        "Общая терраса и зона отдыха.",
      ],
    ];
    for (const [i, row] of amenities.entries()) {
      const [src, titleTr, titleEn, titleDe, titleRu, textTr, textEn, textDe, textRu] = row;
      await conn.query(
        `INSERT INTO media_items
        (category, src, title_tr, title_en, title_de, title_ru, text_tr, text_en, text_de, text_ru, sort_order)
        VALUES ('amenity', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [src, titleTr, titleEn, titleDe, titleRu, textTr, textEn, textDe, textRu, i + 1],
      );
    }

    const extras = [
      [
        "7/24 CCTV ve kontrollü giriş",
        "24/7 CCTV and controlled access",
        "24/7 CCTV und kontrollierter Zugang",
        "Круглосуточное видеонаблюдение и контролируемый въезд",
      ],
      [
        "Jeneratör ve acil aydınlatma",
        "Generator and emergency lighting",
        "Generator und Notbeleuchtung",
        "Генератор и аварийное освещение",
      ],
      ["Açık otopark", "Open parking", "Offene Parkplätze", "Открытая парковка"],
      [
        "Isı ve ses yalıtımlı PVC doğrama",
        "Insulated PVC double glazing",
        "Isolierte PVC-Doppelverglasung",
        "Тепло- и шумоизоляционные ПВХ-окна",
      ],
      [
        "Çelik kapı, ankastre mutfak, granit tezgâh",
        "Steel entrance door, fitted kitchen, granite worktop",
        "Stahltür, Einbauküche, Granitarbeitsplatte",
        "Стальная дверь, встроенная кухня, гранитная столешница",
      ],
      [
        "Cam duş kabini, asma klozet",
        "Glass shower cabin, wall-hung WC",
        "Glasdusche, Wand-WC",
        "Стеклянная душевая кабина, подвесной унитаз",
      ],
    ];
    for (const [i, [tr, en, de, ru]] of extras.entries()) {
      await conn.query(
        "INSERT INTO amenity_extras (text_tr, text_en, text_de, text_ru, sort_order) VALUES (?, ?, ?, ?, ?)",
        [tr, en, de, ru, i + 1],
      );
    }

    for (const row of units) {
      await conn.query(
        `INSERT INTO units (code, block, unit_no, floor, unit_type, area, price, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        row,
      );
    }

    await conn.query(
      `INSERT INTO team_members
      (name, photo, hero_photo, background, side,
       role_tr, role_en, role_de, role_ru,
       bio_tr, bio_en, bio_de, bio_ru,
       quote_tr, quote_en, quote_de, quote_ru,
       show_in_hero, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "Damla Tığlı",
        "/media/team/damla-tigli-hero.jpg",
        "/media/team/damla-tigli-hero.jpg",
        "/media/exterior-night-01.jpg",
        "right",
        "Proje Sorumlusu · CEO",
        "Project Lead · CEO",
        "Projektleitung · CEO",
        "Руководитель проекта · CEO",
        "Şirketin CEO’su. Golden Luxury projesinin satış ve proje sorumlusu.",
        "CEO of the company. Project lead for sales and delivery of Golden Luxury.",
        "CEO des Unternehmens. Projektverantwortlich für Verkauf und Umsetzung von Golden Luxury.",
        "CEO компании. Руководитель продаж и реализации проекта Golden Luxury.",
        "Doğru ev, doğru insanla buluştuğunda yatırım bir yaşama dönüşür. Ben bu buluşmayı yönetirim.",
        "When the right home meets the right person, an investment becomes a life. I lead that meeting.",
        "Wenn das richtige Zuhause den richtigen Menschen trifft, wird aus einer Investition ein Leben. Ich führe dieses Zusammentreffen.",
        "Когда правильный дом встречается с правильным человеком, инвестиция становится жизнью. Я веду эту встречу.",
        0,
        1,
      ],
    );

    await conn.query(
      `INSERT INTO team_members
      (name, photo, hero_photo, background, side,
       role_tr, role_en, role_de, role_ru,
       bio_tr, bio_en, bio_de, bio_ru,
       quote_tr, quote_en, quote_de, quote_ru,
       show_in_hero, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "Abdulkadir Tunç",
        "/media/team/abdulkadir-tunc-hero.jpg",
        "/media/team/abdulkadir-tunc-hero.jpg",
        "/media/exterior-night-02.jpg",
        "left",
        "Müteahhit · Kurucu Başkan",
        "Contractor · Founder & Chairman",
        "Bauträger · Gründer & Vorsitzender",
        "Подрядчик · Основатель и председатель",
        "Golden Luxury İnşaat’ın kurucusu ve müteahhidi.",
        "Founder and contractor of Golden Luxury Construction.",
        "Gründer und Bauträger von Golden Luxury Bau.",
        "Основатель и подрядчик Golden Luxury Construction.",
        "Her proje, şehre bırakılan kalıcı bir imzadır. Golden Luxury’yi bu sorumlulukla inşa ediyoruz.",
        "Every project is a lasting signature on the city. We are building Golden Luxury with that duty.",
        "Jedes Projekt ist eine bleibende Signatur in der Stadt. Wir bauen Golden Luxury mit dieser Verantwortung.",
        "Каждый проект — это долговечная подпись городу. Мы строим Golden Luxury с этой ответственностью.",
        0,
        2,
      ],
    );

    const phones = [
      ["Alanya", "tel:+905326988343", "+90 532 698 83 43", 1],
      ["Alanya", "tel:+905062779721", "+90 506 277 97 21", 2],
      ["Alanya", "tel:+905364745836", "+90 536 474 58 36", 3],
    ];
    for (const row of phones) {
      await conn.query(
        "INSERT INTO phones (label, href, display, sort_order) VALUES (?, ?, ?, ?)",
        row,
      );
    }

    await conn.commit();
    console.log("Seed completed (TR/EN/DE/RU). Admin:", process.env.ADMIN_USER || "admin");
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
    await pool.end();
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
