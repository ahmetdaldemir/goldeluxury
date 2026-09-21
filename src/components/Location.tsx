import { mapEmbed, mapsUrl } from "../data";
import { useLanguage } from "../language";

export function Location() {
  const { t } = useLanguage();

  return (
    <section className="section" id="konum">
      <div className="container split">
        <div>
          <p className="kicker">{t.location.eyebrow}</p>
          <h2>{t.location.title}</h2>
          <p className="intro">{t.location.text}</p>
          <p className="address">{t.location.address}</p>
          <a className="btn btn-dark" href={mapsUrl} target="_blank" rel="noreferrer">
            {t.location.map}
          </a>
        </div>
        <div className="map-frame">
          <iframe title={t.location.title} src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}
