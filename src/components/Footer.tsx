import { useLanguage } from "../language";

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <img src="/media/logo.png" alt="Golden Luxury İnşaat" />
        <p>
          © {new Date().getFullYear()} Golden Luxury İnşaat.{" "}
          {lang === "tr" ? "Tüm hakları saklıdır." : "All rights reserved."}
        </p>
        <a href="https://mmttunc.com" target="_blank" rel="noreferrer">
          {t.footer.site}
        </a>
      </div>
    </footer>
  );
}
