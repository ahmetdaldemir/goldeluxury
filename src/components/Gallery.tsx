import { useState } from "react";
import { exteriors } from "../data";
import { useLanguage } from "../language";
import { Lightbox } from "./Lightbox";

export function Gallery() {
  const { t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="section section-soft" id="mimari">
      <div className="container">
        <div className="section-head">
          <p className="kicker">{t.gallery.eyebrow}</p>
          <h2>{t.gallery.title}</h2>
        </div>
        <div className="mosaic">
          {exteriors.map((image, index) => (
            <button type="button" key={image.src} className="mosaic-item" onClick={() => setActive(index)}>
              <img src={image.src} alt={image.alt} />
            </button>
          ))}
        </div>
      </div>
      {active !== null && (
        <Lightbox
          images={exteriors}
          index={active}
          onClose={() => setActive(null)}
          onChange={setActive}
        />
      )}
    </section>
  );
}
