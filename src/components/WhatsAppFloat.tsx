import { useLanguage } from "../language";
import { useSite } from "../site";

export function WhatsAppFloat() {
  const { t } = useLanguage();
  const { site } = useSite();

  return (
    <a
      className="whatsapp-float"
      href={site.settings.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={t.contact.whatsapp}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.44-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.87 9.87 0 0 0 12.04 2zm5.79 14.24c-.24.68-1.42 1.25-1.97 1.33-.5.07-1.14.1-1.84-.12-.42-.13-.97-.31-1.67-.61-2.94-1.27-4.85-4.23-5-4.42-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.3.37-.42.5-.14.14-.29.29-.12.56.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.25 2.24 1.39.28.14.44.12.6-.07.17-.19.7-.81.89-1.09.19-.28.37-.23.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
      </svg>
      <span>{t.contact.whatsapp}</span>
    </a>
  );
}
