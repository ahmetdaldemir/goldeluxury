import { FormEvent, useState } from "react";
import { useLanguage } from "../language";
import { useSite } from "../site";

export function Contact() {
  const { t } = useLanguage();
  const { site } = useSite();
  const [status, setStatus] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const from = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const message = String(data.get("message") ?? "");
    const body = encodeURIComponent(`${name}\n${from}\n${phone}\n\n${message}`);
    window.location.href = `mailto:${site.settings.email}?subject=Golden%20Luxury&body=${body}`;
    setStatus(t.contact.sent);
  }

  return (
    <section className="section section-ink" id="iletisim">
      <div className="container split">
        <div className="reveal">
          <p className="kicker light">{t.contact.eyebrow}</p>
          <h2>{t.contact.title}</h2>
          <ul className="contact-list">
            {site.phones.map((phone) => (
              <li key={phone.display}>
                <a href={phone.href}>{phone.display}</a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.settings.email}`}>{site.settings.email}</a>
            </li>
            <li>{t.contact.office}</li>
          </ul>
          <a className="btn btn-gold" href={site.settings.whatsapp} target="_blank" rel="noreferrer">
            {t.contact.whatsapp}
          </a>
        </div>

        <form className="contact-form reveal reveal-delay-1" onSubmit={onSubmit}>
          <label>
            {t.contact.name}
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            {t.contact.email}
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            {t.contact.phone}
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
          <label>
            {t.contact.message}
            <textarea name="message" rows={4} required />
          </label>
          <button className="btn btn-gold" type="submit">
            {t.contact.send}
          </button>
          {status ? <p className="form-status">{status}</p> : null}
        </form>
      </div>
    </section>
  );
}
