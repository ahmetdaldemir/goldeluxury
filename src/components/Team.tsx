import { useLanguage } from "../language";
import { useSite } from "../site";

const STUDIO_PORTRAITS: Record<string, string> = {
  "Damla Tığlı": "/media/team/damla-tigli-hero.jpg",
  "Abdulkadir Tunç": "/media/team/abdulkadir-tunc-hero.jpg",
};

function portraitSrc(person: { name: string; photo: string; heroPhoto?: string }) {
  if (STUDIO_PORTRAITS[person.name]) return STUDIO_PORTRAITS[person.name];
  const candidates = [person.heroPhoto, person.photo].filter(Boolean) as string[];
  const studio = candidates.find((src) => /-hero\.(jpe?g|webp|png)$/i.test(src));
  if (studio) return studio;
  const solid = candidates.find((src) => !/figure\.png$/i.test(src));
  return solid || person.photo;
}

export function Team() {
  const { t, lang } = useLanguage();
  const { site } = useSite();

  return (
    <section className="section section-soft" id="yonetim">
      <div className="container">
        <div className="section-head reveal">
          <p className="kicker">{t.team.eyebrow}</p>
          <h2>{t.team.title}</h2>
          <p className="muted">{t.team.lead}</p>
        </div>
        <div className="team-grid reveal reveal-delay-1">
          {site.team.map((person) => (
            <article key={person.name} className="team-card">
              <div className="team-photo">
                <img src={portraitSrc(person)} alt={person.name} />
              </div>
              <div className="team-bubble">
                <p className="kicker">{person.role[lang]}</p>
                <h3>{person.name}</h3>
                <p className="team-bio">{person.bio[lang]}</p>
                {person.quote?.[lang] ? (
                  <p className="team-quote">“{person.quote[lang]}”</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
