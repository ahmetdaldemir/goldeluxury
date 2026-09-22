import { useEffect, useState } from "react";
import { architectureSlides } from "../data";
import { useLanguage } from "../language";
import { useSite } from "../site";

const INTERVAL = 6500;

export function Hero() {
  const { t, lang } = useLanguage();
  const { site } = useSite();
  const slides = site.architectureSlides?.length ? site.architectureSlides : architectureSlides;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setActive(0);
  }, [slides.length]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  if (!slides.length) return null;
  const safeActive = Math.min(active, slides.length - 1);

  return (
    <section
      className="hero"
      id="top"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <article
          key={slide.src}
          className={`hero-slide ${index === safeActive ? "is-active" : ""}`}
          aria-hidden={index !== safeActive}
        >
          <img className="hero-bg" src={slide.src} alt="" />
          <div className="hero-veil" />
        </article>
      ))}

      <div className="hero-copy">
        <p className="kicker light">{t.hero.project}</p>
        <p className="hero-place">{t.hero.kicker}</p>
        <h1>{t.hero.title}</h1>
        <p className="lede">{t.hero.subtitle}</p>
        <div className="hero-actions">
          <a className="btn btn-gold" href="#daireler">
            {t.hero.cta}
          </a>
          <a className="btn btn-ghost" href="#konum">
            {t.hero.secondary}
          </a>
        </div>
      </div>

      <div className="hero-nav">
        <button
          type="button"
          aria-label={t.hero.prev}
          onClick={() => setActive((i) => (i - 1 + slides.length) % slides.length)}
        >
          ←
        </button>
        <div className="hero-dots">
          {slides.map((slide, index) => (
            <button
              key={`${slide.src}-dot`}
              type="button"
              className={index === safeActive ? "is-active" : ""}
              aria-label={slide.label[lang]}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              <em>{slide.label[lang]}</em>
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label={t.hero.next}
          onClick={() => setActive((i) => (i + 1) % slides.length)}
        >
          →
        </button>
      </div>
    </section>
  );
}
