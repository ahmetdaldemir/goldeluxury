import { useState } from "react";
import { useLanguage } from "../language";
import { Lightbox } from "./Lightbox";

export function Interiors() {
  const { t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);
  const images = t.interiors.items.map((item) => ({ src: item.src, alt: item.caption }));

  return (
    <section className="section" id="ic-mekan">
      <div className="container">
        <div className="section-head">
          <p className="kicker">{t.interiors.eyebrow}</p>
          <h2>{t.interiors.title}</h2>
        </div>
        <div className="interior-grid">
          {t.interiors.items.map((item, index) => (
            <figure key={item.src}>
              <button type="button" onClick={() => setActive(index)}>
                <img src={item.src} alt={item.caption} />
              </button>
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      {active !== null && (
        <Lightbox images={images} index={active} onClose={() => setActive(null)} onChange={setActive} />
      )}
    </section>
  );
}
