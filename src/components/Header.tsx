import { useEffect, useState } from "react";
import { langLabels, langs } from "../i18n";
import { useLanguage } from "../language";
import { useSite } from "../site";

const links = [
  ["project", "#proje"],
  ["interiors", "#ic-mekan"],
  ["amenities", "#sosyal"],
  ["units", "#daireler"],
  ["team", "#yonetim"],
  ["location", "#konum"],
  ["contact", "#iletisim"],
] as const;

export function Header() {
  const { t, lang, setLang } = useLanguage();
  const { site } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label={t.brand}>
        <img src={site.settings.logo} alt={t.company} />
      </a>

      <nav className={`nav ${open ? "is-open" : ""}`} aria-label="Primary">
        {links.map(([key, href]) => (
          <a key={key} href={href} onClick={() => setOpen(false)}>
            {t.nav[key]}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a className="header-cta" href="#iletisim">
          {t.nav.contact}
        </a>
        <div className="lang-switch" role="group" aria-label="Language">
          {langs.map((code) => (
            <button
              key={code}
              type="button"
              className={lang === code ? "is-active" : ""}
              onClick={() => setLang(code)}
            >
              {langLabels[code]}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`menu-btn ${open ? "is-open" : ""}`}
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
