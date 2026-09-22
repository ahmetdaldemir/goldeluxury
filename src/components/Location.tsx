import { useLanguage } from "../language";
import { useSite } from "../site";

export function Location() {
  const { t } = useLanguage();
  const { site } = useSite();

  return (
    <section className="section" id="konum">
      <div className="container split">
        <div className="reveal">
          <p className="kicker">{t.location.eyebrow}</p>
          <h2>{t.location.title}</h2>
          <p className="intro">{t.location.text}</p>
          <p className="address">{t.location.address}</p>
          <a className="btn btn-dark" href={site.settings.mapsUrl} target="_blank" rel="noreferrer">
            {t.location.map}
          </a>
        </div>
        <div className="map-frame reveal reveal-delay-1">
          <iframe
            title={t.location.title}
            src={site.settings.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
