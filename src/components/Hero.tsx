import { useEffect, useState } from "react";
import { heroSlides } from "../data";
import { useLanguage } from "../language";

const INTERVAL = 7500;

export function Hero() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % heroSlides.length);
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="hero"
      id="top"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {heroSlides.map((slide, index) => (
        <article
          key={slide.name}
          className={`hero-slide is-${slide.side} ${index === active ? "is-active" : ""}`}
          aria-hidden={index !== active}
        >
          <img className="hero-bg" src={slide.background} alt={t.hero.title} />
          <div className="hero-veil" />

          <div className="hero-copy">
            <p className="kicker light">{t.hero.project}</p>
            <p className="hero-place">{t.hero.kicker}</p>
            <h1>{t.hero.title}</h1>
            <p className="lede">{t.hero.subtitle}</p>
            <div className="hero-actions">
              <a className="btn btn-gold" href="#daireler">
                {t.hero.cta}
              </a>
              <a className="btn btn-ghost" href="#yonetim">
                {slide.role[lang]}
              </a>
            </div>
          </div>

          <figure className="hero-figure">
            <img src={slide.heroPhoto} alt={slide.name} />
            <figcaption>
              <p className="kicker light">{slide.role[lang]}</p>
              <strong>{slide.name}</strong>
              <span>{slide.quote[lang]}</span>
            </figcaption>
          </figure>
        </article>
      ))}

      <div className="hero-nav">
        <button type="button" aria-label={t.hero.prev} onClick={() => setActive((i) => (i - 1 + heroSlides.length) % heroSlides.length)}>
          ←
        </button>
        <div className="hero-dots">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.name}
              type="button"
              className={index === active ? "is-active" : ""}
              aria-label={`${index + 1}. ${slide.name}`}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              <em>{slide.name.split(" ")[0]}</em>
            </button>
          ))}
        </div>
        <button type="button" aria-label={t.hero.next} onClick={() => setActive((i) => (i + 1) % heroSlides.length)}>
          →
        </button>
      </div>
    </section>
  );
}
