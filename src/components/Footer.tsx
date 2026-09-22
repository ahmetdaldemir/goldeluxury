import { useLanguage } from "../language";
import { useSite } from "../site";

export function Footer() {
  const { lang, t } = useLanguage();
  const { site } = useSite();

  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <img src={site.settings.logo} alt={t.company} />
        <p>
          © {new Date().getFullYear()} {t.company}.{" "}
          {lang === "tr" ? t.footer.rights : t.footer.rights}
        </p>
        <a href={`https://${t.footer.site}`} target="_blank" rel="noreferrer">
          {t.footer.site}
        </a>
      </div>
    </footer>
  );
}
