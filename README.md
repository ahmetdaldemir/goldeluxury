# Golden Luxury

## Diller

Site ve panel: **Türkçe / English / Deutsch / Русский**

## Çalıştırma

```bash
# 1) MySQL
docker compose up -d

# 2) API
cd server && npm install && npm run seed && npm start

# 3) Site
cd .. && npm install && npm run dev
```

- Site: http://127.0.0.1:5173/
- Panel: http://127.0.0.1:5173/admin
- API: http://127.0.0.1:4000/api/site

## Panel girişi

- Kullanıcı: `admin`
- Şifre: `admin123`
