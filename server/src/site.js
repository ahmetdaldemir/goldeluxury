import { query } from "./db.js";

const LANGS = ["tr", "en", "de", "ru"];

function mapTexts(rows) {
  const out = { tr: {}, en: {}, de: {}, ru: {} };
  for (const row of rows) {
    if (!out[row.lang]) out[row.lang] = {};
    out[row.lang][row.text_key] = row.text_value;
  }
  return out;
}

function getText(texts, lang, key, fallback = "") {
  return texts[lang]?.[key] ?? texts.tr?.[key] ?? texts.en?.[key] ?? fallback;
}

function pick(row, base, lang) {
  return row[`${base}_${lang}`] ?? row[`${base}_tr`] ?? row[`${base}_en`] ?? "";
}

export async function buildSitePayload() {
  const [settingsRows, textRows, stats, facts, media, extras, units, team, phones] =
    await Promise.all([
      query("SELECT setting_key, setting_value FROM settings"),
      query("SELECT lang, text_key, text_value FROM texts"),
      query("SELECT * FROM stats ORDER BY sort_order, id"),
      query("SELECT * FROM facts ORDER BY sort_order, id"),
      query("SELECT * FROM media_items ORDER BY sort_order, id"),
      query("SELECT * FROM amenity_extras ORDER BY sort_order, id"),
      query("SELECT * FROM units ORDER BY block, unit_no"),
      query("SELECT * FROM team_members ORDER BY sort_order, id"),
      query("SELECT * FROM phones ORDER BY sort_order, id"),
    ]);

  const settings = Object.fromEntries(
    settingsRows.map((row) => [row.setting_key, row.setting_value]),
  );
  const texts = mapTexts(textRows);

  const copyFor = (lang) => ({
    brand: getText(texts, lang, "brand"),
    company: getText(texts, lang, "company"),
    nav: {
      project: getText(texts, lang, "nav.project"),
      interiors: getText(texts, lang, "nav.interiors"),
      amenities: getText(texts, lang, "nav.amenities"),
      units: getText(texts, lang, "nav.units"),
      team: getText(texts, lang, "nav.team"),
      location: getText(texts, lang, "nav.location"),
      contact: getText(texts, lang, "nav.contact"),
    },
    hero: {
      kicker: getText(texts, lang, "hero.kicker"),
      title: getText(texts, lang, "hero.title"),
      subtitle: getText(texts, lang, "hero.subtitle"),
      cta: getText(texts, lang, "hero.cta"),
      secondary: getText(texts, lang, "hero.secondary"),
      project: getText(texts, lang, "hero.project"),
      next: getText(texts, lang, "hero.next"),
      prev: getText(texts, lang, "hero.prev"),
    },
    stats: stats.map((item) => ({
      value: item.value_text,
      label: pick(item, "label", lang),
    })),
    project: {
      eyebrow: getText(texts, lang, "project.eyebrow"),
      title: getText(texts, lang, "project.title"),
      lead: getText(texts, lang, "project.lead"),
      body: getText(texts, lang, "project.body"),
      facts: facts.map((item) => ({
        label: pick(item, "label", lang),
        value: pick(item, "value", lang),
      })),
    },
    gallery: {
      eyebrow: getText(texts, lang, "gallery.eyebrow"),
      title: getText(texts, lang, "gallery.title"),
    },
    interiors: {
      eyebrow: getText(texts, lang, "interiors.eyebrow"),
      title: getText(texts, lang, "interiors.title"),
      items: media
        .filter((item) => item.category === "interior")
        .map((item) => ({
          src: item.src,
          caption: pick(item, "caption", lang),
        })),
    },
    amenities: {
      eyebrow: getText(texts, lang, "amenities.eyebrow"),
      title: getText(texts, lang, "amenities.title"),
      list: media
        .filter((item) => item.category === "amenity")
        .map((item) => ({
          src: item.src,
          title: pick(item, "title", lang),
          text: pick(item, "text", lang),
        })),
      extras: extras.map((item) => pick(item, "text", lang)),
    },
    units: {
      eyebrow: getText(texts, lang, "units.eyebrow"),
      title: getText(texts, lang, "units.title"),
      note: getText(texts, lang, "units.note"),
      all: getText(texts, lang, "units.all"),
      available: getText(texts, lang, "units.available"),
      sold: getText(texts, lang, "units.sold"),
      blockA: getText(texts, lang, "units.blockA"),
      blockB: getText(texts, lang, "units.blockB"),
      plans: getText(texts, lang, "units.plans"),
      official: getText(texts, lang, "units.official"),
      filterHint: getText(texts, lang, "units.filterHint"),
    },
    team: {
      eyebrow: getText(texts, lang, "team.eyebrow"),
      title: getText(texts, lang, "team.title"),
      lead: getText(texts, lang, "team.lead"),
    },
    location: {
      eyebrow: getText(texts, lang, "location.eyebrow"),
      title: getText(texts, lang, "location.title"),
      text: getText(texts, lang, "location.text"),
      map: getText(texts, lang, "location.map"),
      address: getText(texts, lang, "location.address"),
    },
    contact: {
      eyebrow: getText(texts, lang, "contact.eyebrow"),
      title: getText(texts, lang, "contact.title"),
      name: getText(texts, lang, "contact.name"),
      email: getText(texts, lang, "contact.email"),
      phone: getText(texts, lang, "contact.phone"),
      message: getText(texts, lang, "contact.message"),
      send: getText(texts, lang, "contact.send"),
      whatsapp: getText(texts, lang, "contact.whatsapp"),
      office: getText(texts, lang, "contact.office"),
      sent: getText(texts, lang, "contact.sent"),
    },
    footer: {
      rights: getText(texts, lang, "footer.rights"),
      site: getText(texts, lang, "footer.site"),
    },
  });

  const copy = Object.fromEntries(LANGS.map((lang) => [lang, copyFor(lang)]));

  return {
    settings: {
      logo: settings.logo || "/media/logo.png",
      email: settings.email || "",
      whatsapp: settings.whatsapp || "",
      mapsUrl: settings.maps_url || "",
      mapEmbed: settings.map_embed || "",
      priceA: settings.price_a || "/media/price-a.jpg",
      priceB: settings.price_b || "/media/price-b.jpg",
      planA: settings.plan_a || "/media/plans/a-block-share.pdf",
      planB: settings.plan_b || "/media/plans/b-block-share.pdf",
    },
    copy,
    exteriors: media
      .filter((item) => item.category === "exterior")
      .map((item) => ({
        src: item.src,
        alt: item.caption_tr || item.title_tr || "Golden Luxury",
      })),
    units: units.map((unit) => ({
      id: unit.code,
      block: unit.block,
      no: unit.unit_no,
      floor: String(unit.floor),
      type: unit.unit_type,
      area: Number(unit.area),
      price: unit.price === null ? null : Number(unit.price),
      status: unit.status,
    })),
    team: team.map((person) => ({
      id: person.id,
      name: person.name,
      photo: person.photo,
      heroPhoto: person.hero_photo || person.photo,
      background: person.background || "/media/exterior-night-01.jpg",
      side: person.side,
      role: {
        tr: person.role_tr,
        en: person.role_en,
        de: person.role_de,
        ru: person.role_ru,
      },
      bio: {
        tr: person.bio_tr,
        en: person.bio_en,
        de: person.bio_de,
        ru: person.bio_ru,
      },
      quote: {
        tr: person.quote_tr || "",
        en: person.quote_en || "",
        de: person.quote_de || "",
        ru: person.quote_ru || "",
      },
      showInHero: Boolean(person.show_in_hero),
    })),
    heroSlides: team
      .filter((person) => person.show_in_hero)
      .map((person) => ({
        id: person.id,
        name: person.name,
        photo: person.photo,
        heroPhoto: person.hero_photo || person.photo,
        background: person.background || "/media/exterior-night-01.jpg",
        side: person.side,
        role: {
          tr: person.role_tr,
          en: person.role_en,
          de: person.role_de,
          ru: person.role_ru,
        },
        bio: {
          tr: person.bio_tr,
          en: person.bio_en,
          de: person.bio_de,
          ru: person.bio_ru,
        },
        quote: {
          tr: person.quote_tr || "",
          en: person.quote_en || "",
          de: person.quote_de || "",
          ru: person.quote_ru || "",
        },
      })),
    phones: phones.map((phone) => ({
      id: phone.id,
      label: phone.label,
      href: phone.href,
      display: phone.display,
    })),
  };
}
