import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { copy as staticCopy, type Lang } from "./i18n";
import {
  architectureSlides as staticArchitectureSlides,
  exteriors as staticExteriors,
  heroSlides as staticHeroSlides,
  phones as staticPhones,
  team as staticTeam,
  units as staticUnits,
  email as staticEmail,
  mapsUrl as staticMapsUrl,
  mapEmbed as staticMapEmbed,
  whatsapp as staticWhatsapp,
  type ArchitectureSlide,
} from "./data";

export type SitePayload = {
  settings: {
    logo: string;
    email: string;
    whatsapp: string;
    mapsUrl: string;
    mapEmbed: string;
    priceA: string;
    priceB: string;
    planA: string;
    planB: string;
  };
  copy: {
    tr: (typeof staticCopy)["tr"];
    en: (typeof staticCopy)["en"];
    de: (typeof staticCopy)["de"];
    ru: (typeof staticCopy)["ru"];
  };
  exteriors: { src: string; alt: string }[];
  architectureSlides: ArchitectureSlide[];
  units: typeof staticUnits;
  team: Array<{
    id?: number;
    name: string;
    photo: string;
    heroPhoto: string;
    background: string;
    side: "left" | "right";
    role: { tr: string; en: string; de: string; ru: string };
    bio: { tr: string; en: string; de: string; ru: string };
    quote: { tr: string; en: string; de: string; ru: string };
    showInHero?: boolean;
  }>;
  heroSlides: Array<{
    id?: number;
    name: string;
    photo: string;
    heroPhoto: string;
    background: string;
    side: "left" | "right";
    role: { tr: string; en: string; de: string; ru: string };
    bio: { tr: string; en: string; de: string; ru: string };
    quote: { tr: string; en: string; de: string; ru: string };
  }>;
  phones: { id?: number; label: string; href: string; display: string }[];
};

const fallback: SitePayload = {
  settings: {
    logo: "/media/logo.png",
    email: staticEmail,
    whatsapp: staticWhatsapp,
    mapsUrl: staticMapsUrl,
    mapEmbed: staticMapEmbed,
    priceA: "/media/price-a.jpg",
    priceB: "/media/price-b.jpg",
    planA: "/media/plans/a-block-share.pdf",
    planB: "/media/plans/b-block-share.pdf",
  },
  copy: staticCopy,
  exteriors: [...staticExteriors],
  architectureSlides: staticArchitectureSlides.map((slide) => ({ ...slide, label: { ...slide.label } })),
  units: [...staticUnits],
  team: staticTeam.map((person) => ({ ...person })),
  heroSlides: staticHeroSlides.map((person) => ({ ...person })),
  phones: [...staticPhones],
};

type SiteContextValue = {
  site: SitePayload;
  loading: boolean;
  refresh: () => Promise<void>;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<SitePayload>(fallback);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const res = await fetch("/api/site");
      if (!res.ok) throw new Error("site fetch failed");
      const data = (await res.json()) as SitePayload;
      setSite({
        ...fallback,
        ...data,
        architectureSlides: data.architectureSlides?.length
          ? data.architectureSlides
          : fallback.architectureSlides,
        copy: {
          tr: { ...fallback.copy.tr, ...data.copy?.tr },
          en: { ...fallback.copy.en, ...data.copy?.en },
          de: { ...fallback.copy.de, ...data.copy?.de },
          ru: { ...fallback.copy.ru, ...data.copy?.ru },
        },
        settings: { ...fallback.settings, ...data.settings },
      });
    } catch {
      setSite(fallback);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  const value = useMemo(() => ({ site, loading, refresh }), [site, loading]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("SiteProvider missing");
  return ctx;
}

export function useSiteCopy(lang: Lang) {
  const { site } = useSite();
  return site.copy[lang];
}
