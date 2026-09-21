import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { copy, type Lang } from "./i18n";

type Copy = (typeof copy)[Lang];

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Copy;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem("gl-lang");
    return stored === "en" || stored === "tr" ? stored : "tr";
  });

  useEffect(() => {
    localStorage.setItem("gl-lang", lang);
    document.documentElement.lang = lang === "tr" ? "tr" : "en";
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: copy[lang] }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("LanguageProvider missing");
  return ctx;
}
