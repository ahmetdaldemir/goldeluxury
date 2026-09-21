import { useMemo, useState } from "react";
import { formatArea, formatPrice, units, type Unit } from "../data";
import { useLanguage } from "../language";

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
  const [filter, setFilter] = useState<Filter>("available");

  const visible = useMemo(
    () => units.filter((unit) => matches(unit, filter)).sort((a, b) => a.block.localeCompare(b.block) || a.no - b.no),
    [filter],
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
        <div className="section-head">
          <p className="kicker">{t.units.eyebrow}</p>
          <h2>{t.units.title}</h2>
          <p className="muted">{t.units.note}</p>
        </div>

        <div className="filters">
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

        <div className="table-wrap">
          <table className="unit-table">
            <thead>
              <tr>
                <th>{lang === "tr" ? "Blok" : "Block"}</th>
                <th>No</th>
                <th>{lang === "tr" ? "Kat" : "Floor"}</th>
                <th>{t.units.filterHint}</th>
                <th>m²</th>
                <th>{lang === "tr" ? "Fiyat" : "Price"}</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((unit) => (
                <tr key={unit.id} className={unit.status === "sold" ? "is-sold" : ""}>
                  <td>{unit.block}</td>
                  <td>{unit.no}</td>
                  <td>{unit.floor === "0" ? (lang === "tr" ? "Zemin" : "Ground") : unit.floor}</td>
                  <td>{unit.type}</td>
                  <td>{formatArea(unit.area)}</td>
                  <td>
                    {unit.status === "sold"
                      ? t.units.sold
                      : unit.price
                        ? formatPrice(unit.price, lang)
                        : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="price-lists">
          <figure>
            <figcaption>{t.units.blockA} · {t.units.official}</figcaption>
            <img src="/media/price-a.jpg" alt={t.units.blockA} />
          </figure>
          <figure>
            <figcaption>{t.units.blockB} · {t.units.official}</figcaption>
            <img src="/media/price-b.jpg" alt={t.units.blockB} />
          </figure>
        </div>

        <div className="plan-links">
          <a href="/media/plans/a-block-share.pdf" target="_blank" rel="noreferrer">
            {t.units.blockA} {t.units.plans}
          </a>
          <a href="/media/plans/b-block-share.pdf" target="_blank" rel="noreferrer">
            {t.units.blockB} {t.units.plans}
          </a>
        </div>
      </div>
    </section>
  );
}
