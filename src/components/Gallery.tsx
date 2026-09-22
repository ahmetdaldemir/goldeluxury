import { useState } from "react";
import { useLanguage } from "../language";
import { useSite } from "../site";
import { Lightbox } from "./Lightbox";

export function Gallery() {
  const { t } = useLanguage();
  const { site } = useSite();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="section section-soft" id="mimari">
      <div className="container">
        <div className="section-head reveal">
          <p className="kicker">{t.gallery.eyebrow}</p>
          <h2>{t.gallery.title}</h2>
        </div>
        <div className="mosaic reveal reveal-delay-1">
          {site.exteriors.map((image, index) => (
            <button type="button" key={image.src} className="mosaic-item" onClick={() => setActive(index)}>
              <img src={image.src} alt={image.alt} />
            </button>
          ))}
        </div>
      </div>
      {active !== null && (
        <Lightbox images={site.exteriors} index={active} onClose={() => setActive(null)} onChange={setActive} />
      )}
    </section>
  );
}
