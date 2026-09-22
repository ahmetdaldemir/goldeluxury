import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { langs, type Lang } from "./i18n";
import { useSite } from "./site";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: ReturnType<typeof useSite>["site"]["copy"]["tr"];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLang(value: string | null): value is Lang {
  return value === "tr" || value === "en" || value === "de" || value === "ru";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { site } = useSite();
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem("gl-lang");
    return isLang(stored) ? stored : "tr";
  });

  useEffect(() => {
    localStorage.setItem("gl-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: site.copy[lang] ?? site.copy.tr }),
    [lang, site.copy],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("LanguageProvider missing");
  return ctx;
}

export { langs };
