import { FormEvent, useState } from "react";
import { email, phones, whatsapp } from "../data";
import { useLanguage } from "../language";

export function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const from = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const message = String(data.get("message") ?? "");
    const body = encodeURIComponent(`${name}\n${from}\n${phone}\n\n${message}`);
    window.location.href = `mailto:${email}?subject=Golden%20Luxury&body=${body}`;
    setStatus(t.contact.sent);
  }

  return (
    <section className="section section-ink" id="iletisim">
      <div className="container split">
        <div>
          <p className="kicker light">{t.contact.eyebrow}</p>
          <h2>{t.contact.title}</h2>
          <ul className="contact-list">
            {phones.map((phone) => (
              <li key={phone.display}>
                <a href={phone.href}>{phone.display}</a>
              </li>
            ))}
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>{t.contact.office}</li>
          </ul>
          <a className="btn btn-gold" href={whatsapp} target="_blank" rel="noreferrer">
            {t.contact.whatsapp}
          </a>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
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
