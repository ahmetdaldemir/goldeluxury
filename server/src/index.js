import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { requireAuth } from "./auth.js";
import { query } from "./db.js";
import { buildSitePayload } from "./site.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const port = Number(process.env.PORT || 4000);
const publicDir = path.resolve(__dirname, "../../public");
const uploadDir = path.join(publicDir, "media", "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "-");
    cb(null, `${Date.now()}-${safe}`);
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use("/media", express.static(path.join(publicDir, "media")));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/site", async (_req, res) => {
  try {
    const payload = await buildSitePayload();
    res.json(payload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load site data" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body || {};
  const rows = await query("SELECT * FROM admins WHERE username = ? LIMIT 1", [username]);
  const admin = rows[0];
  if (!admin || !(await bcrypt.compare(String(password || ""), admin.password_hash))) {
    return res.status(401).json({ error: "Hatalı kullanıcı adı veya şifre" });
  }
  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" },
  );
  res.json({ token, username: admin.username });
});

app.get("/api/admin/me", requireAuth, (req, res) => {
  res.json({ username: req.user.username });
});

app.post("/api/admin/upload", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Dosya yok" });
  res.json({ url: `/media/uploads/${req.file.filename}` });
});

function crud(table, fields) {
  app.get(`/api/admin/${table}`, requireAuth, async (_req, res) => {
    const order = fields.includes("sort_order")
      ? "ORDER BY sort_order, id"
      : table === "units"
        ? "ORDER BY block, unit_no"
        : "ORDER BY id DESC";
    res.json(await query(`SELECT * FROM ${table} ${order}`));
  });

  app.post(`/api/admin/${table}`, requireAuth, async (req, res) => {
    const values = fields.map((field) => req.body[field] ?? null);
    const placeholders = fields.map(() => "?").join(", ");
    const result = await query(
      `INSERT INTO ${table} (${fields.join(", ")}) VALUES (${placeholders})`,
      values,
    );
    res.status(201).json({ id: result.insertId });
  });

  app.put(`/api/admin/${table}/:id`, requireAuth, async (req, res) => {
    const sets = fields.map((field) => `${field} = ?`).join(", ");
    const values = fields.map((field) => req.body[field] ?? null);
    await query(`UPDATE ${table} SET ${sets} WHERE id = ?`, [...values, req.params.id]);
    res.json({ ok: true });
  });

  app.delete(`/api/admin/${table}/:id`, requireAuth, async (req, res) => {
    await query(`DELETE FROM ${table} WHERE id = ?`, [req.params.id]);
    res.json({ ok: true });
  });
}

crud("stats", ["value_text", "label_tr", "label_en", "label_de", "label_ru", "sort_order"]);
crud("facts", [
  "label_tr",
  "label_en",
  "label_de",
  "label_ru",
  "value_tr",
  "value_en",
  "value_de",
  "value_ru",
  "sort_order",
]);
crud("media_items", [
  "category",
  "src",
  "caption_tr",
  "caption_en",
  "caption_de",
  "caption_ru",
  "title_tr",
  "title_en",
  "title_de",
  "title_ru",
  "text_tr",
  "text_en",
  "text_de",
  "text_ru",
  "sort_order",
]);
crud("amenity_extras", ["text_tr", "text_en", "text_de", "text_ru", "sort_order"]);
crud("units", ["code", "block", "unit_no", "floor", "unit_type", "area", "price", "status"]);
crud("team_members", [
  "name",
  "photo",
  "hero_photo",
  "background",
  "side",
  "role_tr",
  "role_en",
  "role_de",
  "role_ru",
  "bio_tr",
  "bio_en",
  "bio_de",
  "bio_ru",
  "quote_tr",
  "quote_en",
  "quote_de",
  "quote_ru",
  "show_in_hero",
  "sort_order",
]);
crud("phones", ["label", "href", "display", "sort_order"]);

app.get("/api/admin/settings", requireAuth, async (_req, res) => {
  const rows = await query("SELECT setting_key, setting_value FROM settings");
  res.json(Object.fromEntries(rows.map((row) => [row.setting_key, row.setting_value])));
});

app.put("/api/admin/settings", requireAuth, async (req, res) => {
  const entries = Object.entries(req.body || {});
  for (const [key, value] of entries) {
    await query(
      `INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      [key, String(value ?? "")],
    );
  }
  res.json({ ok: true });
});

app.get("/api/admin/texts", requireAuth, async (_req, res) => {
  const rows = await query("SELECT lang, text_key, text_value FROM texts ORDER BY text_key, lang");
  const grouped = {};
  for (const row of rows) {
    if (!grouped[row.text_key]) {
      grouped[row.text_key] = { key: row.text_key, tr: "", en: "", de: "", ru: "" };
    }
    grouped[row.text_key][row.lang] = row.text_value;
  }
  res.json(Object.values(grouped));
});

app.put("/api/admin/texts", requireAuth, async (req, res) => {
  const items = Array.isArray(req.body) ? req.body : [];
  for (const item of items) {
    if (!item?.key) continue;
    for (const lang of ["tr", "en", "de", "ru"]) {
      await query(
        `INSERT INTO texts (lang, text_key, text_value) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE text_value = VALUES(text_value)`,
        [lang, item.key, item[lang] ?? ""],
      );
    }
  }
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`API listening on http://127.0.0.1:${port}`);
});
