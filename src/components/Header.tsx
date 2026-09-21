import { useEffect, useState } from "react";
import { useLanguage } from "../language";

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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label={t.brand}>
        <img src="/media/logo.png" alt="Golden Luxury İnşaat" />
      </a>

      <nav className={`nav ${open ? "is-open" : ""}`} aria-label="Primary">
        {links.map(([key, href]) => (
          <a key={key} href={href} onClick={() => setOpen(false)}>
            {t.nav[key]}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <div className="lang-switch" role="group" aria-label="Language">
          <button type="button" className={lang === "tr" ? "is-active" : ""} onClick={() => setLang("tr")}>
            TR
          </button>
          <button type="button" className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>
            EN
          </button>
        </div>
        <button
          type="button"
          className="menu-btn"
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
