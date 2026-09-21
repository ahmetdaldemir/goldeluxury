import { useLanguage } from "../language";

export function Amenities() {
  const { t } = useLanguage();

  return (
    <section className="section section-ink" id="sosyal">
      <div className="container">
        <div className="section-head light">
          <p className="kicker light">{t.amenities.eyebrow}</p>
          <h2>{t.amenities.title}</h2>
        </div>
        <div className="amenity-grid">
          {t.amenities.list.map((item) => (
            <article key={item.title}>
              <img src={item.src} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
        <ul className="extras">
          {t.amenities.extras.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
