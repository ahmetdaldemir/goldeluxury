import { useMemo, useState } from "react";
import { formatArea, formatPrice, type Unit } from "../data";
import { useLanguage } from "../language";
import { useSite } from "../site";

type Filter = "all" | "available" | "A" | "B" | "1+1" | "2+1" | "dubleks";

function matches(unit: Unit, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "available") return unit.status === "available";
  if (filter === "A" || filter === "B") return unit.block === filter;
  if (filter === "1+1") return unit.type === "1+1";
  if (filter === "2+1") return unit.type === "2+1" || unit.type === "2+1 Dubleks";
  return unit.type.includes("Dubleks");
}

export function Availability() {
  const { t, lang } = useLanguage();
  const { site } = useSite();
  const [filter, setFilter] = useState<Filter>("available");

  const visible = useMemo(
    () =>
      site.units
        .filter((unit) => matches(unit, filter))
        .sort((a, b) => a.block.localeCompare(b.block) || a.no - b.no),
    [filter, site.units],
  );

  const filters: { id: Filter; label: string }[] = [
    { id: "available", label: t.units.available },
    { id: "all", label: t.units.all },
    { id: "A", label: t.units.blockA },
    { id: "B", label: t.units.blockB },
    { id: "1+1", label: "1+1" },
    { id: "2+1", label: "2+1" },
    { id: "dubleks", label: "Dubleks" },
  ];

  return (
    <section className="section" id="daireler">
      <div className="container">
        <div className="section-head reveal">
          <p className="kicker">{t.units.eyebrow}</p>
          <h2>{t.units.title}</h2>
          <p className="muted">{t.units.note}</p>
        </div>

        <div className="filters reveal reveal-delay-1">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={filter === item.id ? "is-active" : ""}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="table-wrap reveal reveal-delay-2">
          <table className="unit-table">
            <thead>
              <tr>
                <th>{lang === "tr" ? "Blok" : lang === "de" ? "Block" : lang === "ru" ? "Блок" : "Block"}</th>
                <th>No</th>
                <th>{lang === "tr" ? "Kat" : lang === "de" ? "Etage" : lang === "ru" ? "Этаж" : "Floor"}</th>
                <th>{t.units.filterHint}</th>
                <th>m²</th>
                <th>{lang === "tr" ? "Fiyat" : lang === "de" ? "Preis" : lang === "ru" ? "Цена" : "Price"}</th>
                <th>{lang === "tr" ? "Durum" : "Status"}</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((unit) => (
                <tr key={unit.id} className={unit.status === "sold" ? "is-sold" : ""}>
                  <td>{unit.block}</td>
                  <td>{unit.no}</td>
                  <td>
                    {unit.floor === "0"
                      ? lang === "tr"
                        ? "Zemin"
                        : lang === "de"
                          ? "EG"
                          : lang === "ru"
                            ? "Цоколь"
                            : "Ground"
                      : unit.floor}
                  </td>
                  <td>{unit.type}</td>
                  <td>{formatArea(unit.area)}</td>
                  <td>
                    {unit.status === "sold"
                      ? "—"
                      : unit.price
                        ? formatPrice(unit.price, lang)
                        : "—"}
                  </td>
                  <td>
                    <span className={`status-pill is-${unit.status}`}>
                      {unit.status === "sold" ? t.units.sold : t.units.available}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="price-lists reveal">
          <figure>
            <figcaption>
              {t.units.blockA} · {t.units.official}
            </figcaption>
            <img src={site.settings.priceA} alt={t.units.blockA} />
          </figure>
          <figure>
            <figcaption>
              {t.units.blockB} · {t.units.official}
            </figcaption>
            <img src={site.settings.priceB} alt={t.units.blockB} />
          </figure>
        </div>

        <div className="plan-links">
          <a href={site.settings.planA} target="_blank" rel="noreferrer">
            {t.units.blockA} {t.units.plans}
          </a>
          <a href={site.settings.planB} target="_blank" rel="noreferrer">
            {t.units.blockB} {t.units.plans}
          </a>
        </div>
      </div>
    </section>
  );
}
