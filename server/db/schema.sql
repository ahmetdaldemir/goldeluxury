CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS texts (
  lang ENUM('tr', 'en', 'de', 'ru') NOT NULL,
  text_key VARCHAR(120) NOT NULL,
  text_value TEXT NOT NULL,
  PRIMARY KEY (lang, text_key)
);

CREATE TABLE IF NOT EXISTS stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  value_text VARCHAR(80) NOT NULL,
  label_tr VARCHAR(120) NOT NULL,
  label_en VARCHAR(120) NOT NULL,
  label_de VARCHAR(120) NOT NULL,
  label_ru VARCHAR(120) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS facts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label_tr VARCHAR(120) NOT NULL,
  label_en VARCHAR(120) NOT NULL,
  label_de VARCHAR(120) NOT NULL,
  label_ru VARCHAR(120) NOT NULL,
  value_tr VARCHAR(255) NOT NULL,
  value_en VARCHAR(255) NOT NULL,
  value_de VARCHAR(255) NOT NULL,
  value_ru VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS media_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category ENUM('exterior', 'interior', 'amenity', 'price', 'plan') NOT NULL,
  src VARCHAR(500) NOT NULL,
  caption_tr VARCHAR(255) NULL,
  caption_en VARCHAR(255) NULL,
  caption_de VARCHAR(255) NULL,
  caption_ru VARCHAR(255) NULL,
  title_tr VARCHAR(255) NULL,
  title_en VARCHAR(255) NULL,
  title_de VARCHAR(255) NULL,
  title_ru VARCHAR(255) NULL,
  text_tr TEXT NULL,
  text_en TEXT NULL,
  text_de TEXT NULL,
  text_ru TEXT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS amenity_extras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text_tr VARCHAR(255) NOT NULL,
  text_en VARCHAR(255) NOT NULL,
  text_de VARCHAR(255) NOT NULL,
  text_ru VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS units (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(32) NOT NULL UNIQUE,
  block ENUM('A', 'B') NOT NULL,
  unit_no INT NOT NULL,
  floor VARCHAR(16) NOT NULL,
  unit_type VARCHAR(64) NOT NULL,
  area DECIMAL(10,2) NOT NULL,
  price DECIMAL(12,2) NULL,
  status ENUM('available', 'sold') NOT NULL DEFAULT 'available'
);

CREATE TABLE IF NOT EXISTS team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  photo VARCHAR(500) NOT NULL,
  hero_photo VARCHAR(500) NULL,
  background VARCHAR(500) NULL,
  side ENUM('left', 'right') NOT NULL DEFAULT 'right',
  role_tr VARCHAR(160) NOT NULL,
  role_en VARCHAR(160) NOT NULL,
  role_de VARCHAR(160) NOT NULL,
  role_ru VARCHAR(160) NOT NULL,
  bio_tr TEXT NOT NULL,
  bio_en TEXT NOT NULL,
  bio_de TEXT NOT NULL,
  bio_ru TEXT NOT NULL,
  quote_tr TEXT NULL,
  quote_en TEXT NULL,
  quote_de TEXT NULL,
  quote_ru TEXT NULL,
  show_in_hero TINYINT(1) NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS phones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(80) NOT NULL,
  href VARCHAR(120) NOT NULL,
  display VARCHAR(80) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);
