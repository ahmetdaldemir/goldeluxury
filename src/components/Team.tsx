import { team } from "../data";
import { useLanguage } from "../language";

export function Team() {
  const { t, lang } = useLanguage();

  return (
    <section className="section section-soft" id="yonetim">
      <div className="container">
        <div className="section-head">
          <p className="kicker">{t.team.eyebrow}</p>
          <h2>{t.team.title}</h2>
          <p className="muted">{t.team.lead}</p>
        </div>
        <div className="team-grid">
          {team.map((person) => (
            <article key={person.name} className="team-card">
              <img src={person.photo} alt={person.name} />
              <div>
                <p className="kicker">{person.role[lang]}</p>
                <h3>{person.name}</h3>
                <p>{person.bio[lang]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
