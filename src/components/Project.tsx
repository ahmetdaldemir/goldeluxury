import { useLanguage } from "../language";

export function Project() {
  const { t } = useLanguage();

  return (
    <section className="section" id="proje">
      <div className="container">
        <div className="stats">
          {t.stats.map((item) => (
            <article key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>

        <div className="split">
          <div>
            <p className="kicker">{t.project.eyebrow}</p>
            <h2>{t.project.title}</h2>
          </div>
          <div>
            <p className="intro">{t.project.lead}</p>
            <p className="muted">{t.project.body}</p>
            <dl className="facts">
              {t.project.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
