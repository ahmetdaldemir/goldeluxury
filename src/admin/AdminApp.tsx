import { FormEvent, useEffect, useMemo, useState } from "react";

type Tab =
  | "dashboard"
  | "settings"
  | "texts"
  | "team"
  | "units"
  | "media"
  | "stats"
  | "phones";

const tokenKey = "gl-admin-token";

async function api(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem(tokenKey);
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const res = await fetch(`/api${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "İstek başarısız" }));
    throw new Error(err.error || "İstek başarısız");
  }
  return res.json();
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function UploadButton({ onUploaded }: { onUploaded: (url: string) => void }) {
  return (
    <input
      type="file"
      accept="image/*,application/pdf"
      onChange={async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const body = new FormData();
        body.append("file", file);
        const data = await api("/admin/upload", { method: "POST", body });
        onUploaded(data.url);
      }}
    />
  );
}

export function AdminApp() {
  const [token, setToken] = useState(() => localStorage.getItem(tokenKey));
  const [tab, setTab] = useState<Tab>("dashboard");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [texts, setTexts] = useState<Array<{ key: string; tr: string; en: string; de: string; ru: string }>>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [phones, setPhones] = useState<any[]>([]);
  const [editingUnit, setEditingUnit] = useState<any | null>(null);
  const [editingTeam, setEditingTeam] = useState<any | null>(null);
  const [editingMedia, setEditingMedia] = useState<any | null>(null);

  const tabs = useMemo(
    () =>
      [
        ["dashboard", "Özet"],
        ["settings", "Ayarlar"],
        ["texts", "Metinler"],
        ["team", "Yönetim / Hero"],
        ["units", "Daireler"],
        ["media", "Görseller"],
        ["stats", "İstatistik"],
        ["phones", "Telefonlar"],
      ] as const,
    [],
  );

  async function loadAll() {
    const [s, tx, tm, u, m, st, ph] = await Promise.all([
      api("/admin/settings"),
      api("/admin/texts"),
      api("/admin/team_members"),
      api("/admin/units"),
      api("/admin/media_items"),
      api("/admin/stats"),
      api("/admin/phones"),
    ]);
    setSettings(s);
    setTexts(tx);
    setTeam(tm);
    setUnits(u);
    setMedia(m);
    setStats(st);
    setPhones(ph);
  }

  useEffect(() => {
    if (!token) return;
    loadAll().catch((err) => setError(err.message));
  }, [token]);

  async function login(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      localStorage.setItem(tokenKey, data.token);
      setToken(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Giriş başarısız");
    }
  }

  function logout() {
    localStorage.removeItem(tokenKey);
    setToken(null);
  }

  if (!token) {
    return (
      <div className="admin-shell">
        <form className="admin-login" onSubmit={login}>
          <h1>Golden Luxury Panel</h1>
          <p>Yönetim paneline giriş</p>
          <Field label="Kullanıcı">
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </Field>
          <Field label="Şifre">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>
          {error ? <p className="admin-error">{error}</p> : null}
          <button className="btn btn-gold" type="submit">
            Giriş yap
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-shell admin-app">
      <aside className="admin-side">
        <strong>GL Panel</strong>
        <nav>
          {tabs.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={tab === id ? "is-active" : ""}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <button type="button" className="btn btn-ghost" onClick={logout}>
          Çıkış
        </button>
        <a className="admin-link" href="/" target="_blank" rel="noreferrer">
          Siteyi aç
        </a>
      </aside>

      <main className="admin-main">
        {message ? <p className="admin-ok">{message}</p> : null}
        {error ? <p className="admin-error">{error}</p> : null}

        {tab === "dashboard" && (
          <section>
            <h1>Özet</h1>
            <div className="admin-cards">
              <article>
                <strong>{units.length}</strong>
                <span>Daire</span>
              </article>
              <article>
                <strong>{units.filter((u) => u.status === "available").length}</strong>
                <span>Müsait</span>
              </article>
              <article>
                <strong>{team.length}</strong>
                <span>Yönetim</span>
              </article>
              <article>
                <strong>{media.length}</strong>
                <span>Görsel</span>
              </article>
            </div>
            <p className="muted">Tüm site içeriği bu panelden güncellenir. Değişiklikler `/api/site` üzerinden canlıya yansır.</p>
          </section>
        )}

        {tab === "settings" && (
          <section>
            <h1>Ayarlar</h1>
            <div className="admin-grid">
              {Object.entries(settings).map(([key, value]) => (
                <Field key={key} label={key}>
                  <input
                    value={value}
                    onChange={(e) => setSettings((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                </Field>
              ))}
            </div>
            <Field label="Logo yükle">
              <UploadButton onUploaded={(url) => setSettings((prev) => ({ ...prev, logo: url }))} />
            </Field>
            <button
              className="btn btn-gold"
              type="button"
              onClick={async () => {
                await api("/admin/settings", { method: "PUT", body: JSON.stringify(settings) });
                setMessage("Ayarlar kaydedildi");
              }}
            >
              Kaydet
            </button>
          </section>
        )}

        {tab === "texts" && (
          <section>
            <h1>Metinler (TR / EN / DE / RU)</h1>
            <div className="admin-texts">
              {texts.map((item, index) => (
                <div key={item.key} className="admin-text-row admin-text-row-4">
                  <code>{item.key}</code>
                  {(["tr", "en", "de", "ru"] as const).map((lang) => (
                    <textarea
                      key={lang}
                      value={item[lang]}
                      placeholder={lang.toUpperCase()}
                      onChange={(e) => {
                        const next = [...texts];
                        next[index] = { ...item, [lang]: e.target.value };
                        setTexts(next);
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <button
              className="btn btn-gold"
              type="button"
              onClick={async () => {
                await api("/admin/texts", { method: "PUT", body: JSON.stringify(texts) });
                setMessage("Metinler kaydedildi");
              }}
            >
              Kaydet
            </button>
          </section>
        )}

        {tab === "team" && (
          <section>
            <h1>Yönetim / Hero</h1>
            <button
              className="btn btn-dark"
              type="button"
              onClick={() =>
                setEditingTeam({
                  name: "",
                  photo: "/media/team/damla-tigli.jpg",
                  hero_photo: "",
                  background: "/media/exterior-night-01.jpg",
                  side: "right",
                  role_tr: "",
                  role_en: "",
                  role_de: "",
                  role_ru: "",
                  bio_tr: "",
                  bio_en: "",
                  bio_de: "",
                  bio_ru: "",
                  quote_tr: "",
                  quote_en: "",
                  quote_de: "",
                  quote_ru: "",
                  show_in_hero: 1,
                  sort_order: team.length + 1,
                })
              }
            >
              Yeni kişi
            </button>
            <div className="admin-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Ad</th>
                    <th>Rol</th>
                    <th>Hero</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {team.map((person) => (
                    <tr key={person.id}>
                      <td>{person.name}</td>
                      <td>{person.role_tr}</td>
                      <td>{person.show_in_hero ? "Evet" : "Hayır"}</td>
                      <td>
                        <button type="button" onClick={() => setEditingTeam(person)}>
                          Düzenle
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await api(`/admin/team_members/${person.id}`, { method: "DELETE" });
                            await loadAll();
                          }}
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {editingTeam && (
              <div className="admin-modal">
                <div className="admin-grid">
                  {[
                    "name",
                    "role_tr",
                    "role_en",
                    "role_de",
                    "role_ru",
                    "photo",
                    "hero_photo",
                    "background",
                    "side",
                  ].map((key) => (
                    <Field key={key} label={key}>
                      <input
                        value={editingTeam[key] ?? ""}
                        onChange={(e) => setEditingTeam({ ...editingTeam, [key]: e.target.value })}
                      />
                    </Field>
                  ))}
                  {["bio_tr", "bio_en", "bio_de", "bio_ru", "quote_tr", "quote_en", "quote_de", "quote_ru"].map(
                    (key) => (
                      <Field key={key} label={key}>
                        <textarea
                          value={editingTeam[key] ?? ""}
                          onChange={(e) => setEditingTeam({ ...editingTeam, [key]: e.target.value })}
                        />
                      </Field>
                    ),
                  )}
                  <Field label="Hero’da göster">
                    <select
                      value={editingTeam.show_in_hero ? 1 : 0}
                      onChange={(e) =>
                        setEditingTeam({ ...editingTeam, show_in_hero: Number(e.target.value) })
                      }
                    >
                      <option value={1}>Evet</option>
                      <option value={0}>Hayır</option>
                    </select>
                  </Field>
                  <Field label="Foto yükle">
                    <UploadButton onUploaded={(url) => setEditingTeam({ ...editingTeam, photo: url })} />
                  </Field>
                  <Field label="Hero figür yükle">
                    <UploadButton
                      onUploaded={(url) => setEditingTeam({ ...editingTeam, hero_photo: url })}
                    />
                  </Field>
                </div>
                <div className="admin-actions">
                  <button
                    className="btn btn-gold"
                    type="button"
                    onClick={async () => {
                      if (editingTeam.id) {
                        await api(`/admin/team_members/${editingTeam.id}`, {
                          method: "PUT",
                          body: JSON.stringify(editingTeam),
                        });
                      } else {
                        await api("/admin/team_members", {
                          method: "POST",
                          body: JSON.stringify(editingTeam),
                        });
                      }
                      setEditingTeam(null);
                      await loadAll();
                      setMessage("Yönetim kaydedildi");
                    }}
                  >
                    Kaydet
                  </button>
                  <button type="button" onClick={() => setEditingTeam(null)}>
                    Kapat
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {tab === "units" && (
          <section>
            <h1>Daireler</h1>
            <button
              className="btn btn-dark"
              type="button"
              onClick={() =>
                setEditingUnit({
                  code: "",
                  block: "A",
                  unit_no: 1,
                  floor: "1",
                  unit_type: "1+1",
                  area: 50,
                  price: 250000,
                  status: "available",
                })
              }
            >
              Yeni daire
            </button>
            <div className="admin-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Kod</th>
                    <th>Blok</th>
                    <th>No</th>
                    <th>Tip</th>
                    <th>Fiyat</th>
                    <th>Durum</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {units.map((unit) => (
                    <tr key={unit.id}>
                      <td>{unit.code}</td>
                      <td>{unit.block}</td>
                      <td>{unit.unit_no}</td>
                      <td>{unit.unit_type}</td>
                      <td>{unit.price ?? "—"}</td>
                      <td>{unit.status}</td>
                      <td>
                        <button type="button" onClick={() => setEditingUnit(unit)}>
                          Düzenle
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await api(`/admin/units/${unit.id}`, { method: "DELETE" });
                            await loadAll();
                          }}
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {editingUnit && (
              <div className="admin-modal">
                <div className="admin-grid">
                  {["code", "block", "unit_no", "floor", "unit_type", "area", "price", "status"].map(
                    (key) => (
                      <Field key={key} label={key}>
                        <input
                          value={editingUnit[key] ?? ""}
                          onChange={(e) => setEditingUnit({ ...editingUnit, [key]: e.target.value })}
                        />
                      </Field>
                    ),
                  )}
                </div>
                <div className="admin-actions">
                  <button
                    className="btn btn-gold"
                    type="button"
                    onClick={async () => {
                      const payload = {
                        ...editingUnit,
                        unit_no: Number(editingUnit.unit_no),
                        area: Number(editingUnit.area),
                        price: editingUnit.price === "" || editingUnit.price === null
                          ? null
                          : Number(editingUnit.price),
                      };
                      if (editingUnit.id) {
                        await api(`/admin/units/${editingUnit.id}`, {
                          method: "PUT",
                          body: JSON.stringify(payload),
                        });
                      } else {
                        await api("/admin/units", { method: "POST", body: JSON.stringify(payload) });
                      }
                      setEditingUnit(null);
                      await loadAll();
                      setMessage("Daire kaydedildi");
                    }}
                  >
                    Kaydet
                  </button>
                  <button type="button" onClick={() => setEditingUnit(null)}>
                    Kapat
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {tab === "media" && (
          <section>
            <h1>Görseller</h1>
            <button
              className="btn btn-dark"
              type="button"
              onClick={() =>
                setEditingMedia({
                  category: "exterior",
                  src: "",
                  caption_tr: "",
                  caption_en: "",
                  title_tr: "",
                  title_en: "",
                  text_tr: "",
                  text_en: "",
                  sort_order: media.length + 1,
                })
              }
            >
              Yeni görsel
            </button>
            <div className="admin-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Kategori</th>
                    <th>Kaynak</th>
                    <th>Başlık / Caption</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {media.map((item) => (
                    <tr key={item.id}>
                      <td>{item.category}</td>
                      <td>{item.src}</td>
                      <td>{item.title_tr || item.caption_tr}</td>
                      <td>
                        <button type="button" onClick={() => setEditingMedia(item)}>
                          Düzenle
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await api(`/admin/media_items/${item.id}`, { method: "DELETE" });
                            await loadAll();
                          }}
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {editingMedia && (
              <div className="admin-modal">
                <div className="admin-grid">
                  <Field label="category">
                    <select
                      value={editingMedia.category}
                      onChange={(e) => setEditingMedia({ ...editingMedia, category: e.target.value })}
                    >
                      <option value="exterior">exterior</option>
                      <option value="interior">interior</option>
                      <option value="amenity">amenity</option>
                      <option value="price">price</option>
                      <option value="plan">plan</option>
                    </select>
                  </Field>
                  {["src", "caption_tr", "caption_en", "caption_de", "caption_ru", "title_tr", "title_en", "title_de", "title_ru", "text_tr", "text_en", "text_de", "text_ru", "sort_order"].map(
                    (key) => (
                      <Field key={key} label={key}>
                        <input
                          value={editingMedia[key] ?? ""}
                          onChange={(e) => setEditingMedia({ ...editingMedia, [key]: e.target.value })}
                        />
                      </Field>
                    ),
                  )}
                  <Field label="Dosya yükle">
                    <UploadButton onUploaded={(url) => setEditingMedia({ ...editingMedia, src: url })} />
                  </Field>
                </div>
                <div className="admin-actions">
                  <button
                    className="btn btn-gold"
                    type="button"
                    onClick={async () => {
                      const payload = {
                        ...editingMedia,
                        sort_order: Number(editingMedia.sort_order || 0),
                      };
                      if (editingMedia.id) {
                        await api(`/admin/media_items/${editingMedia.id}`, {
                          method: "PUT",
                          body: JSON.stringify(payload),
                        });
                      } else {
                        await api("/admin/media_items", {
                          method: "POST",
                          body: JSON.stringify(payload),
                        });
                      }
                      setEditingMedia(null);
                      await loadAll();
                      setMessage("Görsel kaydedildi");
                    }}
                  >
                    Kaydet
                  </button>
                  <button type="button" onClick={() => setEditingMedia(null)}>
                    Kapat
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {tab === "stats" && (
          <section>
            <h1>İstatistikler</h1>
            <div className="admin-grid">
              {stats.map((item, index) => (
                <div key={item.id} className="admin-card-edit">
                  <Field label="Değer">
                    <input
                      value={item.value_text}
                      onChange={(e) => {
                        const next = [...stats];
                        next[index] = { ...item, value_text: e.target.value };
                        setStats(next);
                      }}
                    />
                  </Field>
                  <Field label="TR">
                    <input
                      value={item.label_tr}
                      onChange={(e) => {
                        const next = [...stats];
                        next[index] = { ...item, label_tr: e.target.value };
                        setStats(next);
                      }}
                    />
                  </Field>
                  <Field label="EN">
                    <input
                      value={item.label_en}
                      onChange={(e) => {
                        const next = [...stats];
                        next[index] = { ...item, label_en: e.target.value };
                        setStats(next);
                      }}
                    />
                  </Field>
                  <button
                    type="button"
                    className="btn btn-gold"
                    onClick={async () => {
                      await api(`/admin/stats/${item.id}`, {
                        method: "PUT",
                        body: JSON.stringify(item),
                      });
                      setMessage("İstatistik kaydedildi");
                    }}
                  >
                    Kaydet
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "phones" && (
          <section>
            <h1>Telefonlar</h1>
            <div className="admin-grid">
              {phones.map((item, index) => (
                <div key={item.id} className="admin-card-edit">
                  {["label", "href", "display"].map((key) => (
                    <Field key={key} label={key}>
                      <input
                        value={item[key]}
                        onChange={(e) => {
                          const next = [...phones];
                          next[index] = { ...item, [key]: e.target.value };
                          setPhones(next);
                        }}
                      />
                    </Field>
                  ))}
                  <button
                    type="button"
                    className="btn btn-gold"
                    onClick={async () => {
                      await api(`/admin/phones/${item.id}`, {
                        method: "PUT",
                        body: JSON.stringify(item),
                      });
                      setMessage("Telefon kaydedildi");
                    }}
                  >
                    Kaydet
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
