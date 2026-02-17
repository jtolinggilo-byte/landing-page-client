# [NAMA HOTEL] - Landing Page Preview
## Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
> 
> **CATATAN:** Ini adalah TEMPLATE. Ganti semua placeholder `[...]` dengan data klien yang sebenarnya.

**Goal:** Membuat landing page preview modern untuk menunjukkan kepada klien seperti apa website [NAMA HOTEL] setelah diperbaiki/dibuat baru oleh ALURWEB.

**Architecture:** Single-page landing page dengan smooth scroll navigation, responsive design mobile-first, animasi subtle untuk kesan premium.

**Tech Stack:** HTML5, Tailwind CSS (CDN), Vanilla JavaScript, Google Fonts

**Tujuan Preview:** Ini BUKAN website final. Ini adalah preview/mockup untuk meyakinkan klien agar deal. Setelah klien approve, baru dikembangkan ke full website.

---

## 🤖 Agent Team Orchestration

> **INSTRUKSI UTAMA UNTUK CLAUDE CODE / ANTIGRAVITY**
> 
> Plan ini menggunakan sistem **3 Agent Team** yang bekerja secara sequential.
> Setiap agent punya role spesifik, output yang jelas, dan handoff ke agent berikutnya.
> 
> **WAJIB:** Jalankan agent dalam urutan: **SCOUT → BUILDER → AUDITOR**
> Jangan skip agent. Output agent sebelumnya adalah input agent berikutnya.

### Agent Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR (Claude Code)                │
│         Membaca plan ini → Dispatch agent satu per satu      │
├─────────────┬───────────────────┬───────────────────────────┤
│  🔍 SCOUT   │   🏗️ BUILDER     │   📊 AUDITOR              │
│  Research & │   Build landing   │   QA, SEO audit &         │
│  Data       │   page dari data  │   before-after            │
│  Collection │   Scout           │   comparison              │
│             │                   │                           │
│  OUTPUT:    │   OUTPUT:         │   OUTPUT:                 │
│  research/  │   index.html      │   audit-report.md         │
│  + images/  │   custom.css      │   + screenshots           │
│             │   main.js         │   + skor perbandingan     │
└──────┬──────┴────────┬──────────┴────────────┬──────────────┘
       │               │                       │
       ▼               ▼                       ▼
   Data lengkap    Landing page            Final report
   siap pakai      production-ready        siap presentasi
```

---

### 🔍 AGENT 1: SCOUT (Research & Data Collection)

**Role:** Mengumpulkan SEMUA data yang dibutuhkan untuk membangun preview — termasuk teks, gambar, rating, review, dan informasi SEO.

**Kapan dijalankan:** PERTAMA, sebelum agent lain.

**System Prompt untuk Scout Agent:**

```markdown
Kamu adalah SCOUT — agent peneliti untuk project landing page preview hotel.

MISI: Kumpulkan semua data tentang [NAMA HOTEL] dari internet. 
Output kamu akan dipakai agent lain untuk membangun website.

TUGAS (jalankan SEMUA secara berurutan):

### 1. Google Maps Research
- Cari "[NAMA HOTEL]" di Google Maps
- Ambil: nama resmi, alamat lengkap, koordinat GPS, rating, jumlah review, 
  nomor telepon, jam operasional, kategori/klasifikasi
- Ambil 5-10 review terbaik (rating 4-5 bintang) — copy teks, nama reviewer, tanggal
- Ambil 5-10 review terburuk untuk insight masalah (internal, jangan tampilkan di website)
- Catat nearby attractions dan jarak dari hotel

### 2. Website Lama (jika ada)
- Buka [URL WEBSITE LAMA]
- Screenshot setiap halaman utama → simpan ke research/screenshots-old/
- Catat semua masalah: broken links, halaman kosong, loading lambat
- Cek meta tags, sitemap, robots.txt
- Jalankan audit sederhana: performance, SEO, mobile-friendly
- Simpan hasil audit ke research/audit-website-lama.md

### 3. Social Media Research
- Cari akun Instagram, Facebook, TikTok hotel
- Catat: username, jumlah followers, frekuensi posting, engagement
- Identifikasi hashtag yang dipakai
- Ambil insight: konten apa yang perform bagus, tone of voice mereka
- Simpan ke research/social-media-audit.md

### 4. OTA Research (Online Travel Agent)
- Cek listing di: Traveloka, Agoda, Booking.com, TripAdvisor
- Untuk setiap OTA, catat:
  - Harga per tipe kamar
  - Fasilitas yang dicantumkan
  - Rating di platform tersebut
  - Review highlights (top 3 positive, top 3 negative)
- Simpan ke research/ota-research.md

### 5. Kompetitor Research
- Identifikasi 2-3 hotel kompetitor di area yang sama
- Untuk setiap kompetitor: nama, rating, harga, keunggulan
- Simpan ke research/kompetitor.md

### 6. Image Collection (PRIORITAS TINGGI)
- Download/fetch gambar ASLI hotel dari sumber berikut (urut prioritas):
  a. Website resmi hotel → semua gambar yang bisa di-fetch
  b. Google Maps photos → foto-foto berkualitas tinggi
  c. OTA listings (Traveloka, Agoda, Booking.com) → foto kamar & fasilitas
  d. Social media (Instagram) → foto-foto terbaik
- Kategorikan gambar ke folder:
  - assets/images/exterior/    (tampak luar hotel)
  - assets/images/rooms/       (foto kamar per tipe)
  - assets/images/facilities/  (pool, restaurant, spa, meeting room, dll)
  - assets/images/lobby/       (lobby, reception)
  - assets/images/food/        (restaurant, breakfast, menu)
  - assets/images/misc/        (lainnya)
- MINIMUM: 15 gambar asli. Jika kurang, catat mana yang kurang 
  dan Builder akan pakai Unsplash placeholder.
- Simpan daftar gambar + sumber ke research/image-inventory.md
- Jika logo hotel ditemukan, simpan ke assets/images/logo.png

### 7. SEO Keyword Research
- Research keyword lokal yang relevan:
  - "hotel [nama kota]"
  - "hotel bintang [X] [nama kota]"
  - "penginapan [nama kota]"
  - "hotel dekat [landmark terdekat]"
  - "hotel murah [nama kota]"
- Cek volume & competition (bisa pakai Google autocomplete sebagai proxy)
- Simpan ke research/seo-keywords.md

OUTPUT YANG HARUS DIHASILKAN:
```
research/
├── hotel-data.md           (semua data hotel: nama, alamat, rating, dll)
├── audit-website-lama.md   (audit website existing, skip jika tidak ada)
├── social-media-audit.md   (audit sosmed)
├── ota-research.md         (data dari Traveloka, Agoda, dll)
├── kompetitor.md           (analisis kompetitor)
├── reviews-collection.md   (kumpulan review terbaik untuk testimonial)
├── seo-keywords.md         (keyword research)
├── image-inventory.md      (daftar semua gambar + sumber)
├── screenshots-old/        (screenshot website lama)
│   ├── homepage.png
│   ├── rooms.png
│   └── ...
└── scout-summary.md        (RINGKASAN untuk Builder — data terpenting)

assets/images/
├── logo.png                (jika ditemukan)
├── exterior/
├── rooms/
├── facilities/
├── lobby/
├── food/
└── misc/
```

PENTING:
- Jika ada data yang TIDAK ditemukan, tulis "[NOT FOUND]" dan alasannya
- Jangan buat data palsu. Lebih baik kosong daripada salah.
- scout-summary.md harus berisi ringkasan 1 halaman yang Builder bisa 
  langsung pakai tanpa baca semua file research lainnya
- Prioritaskan gambar ASLI. Unsplash hanya fallback terakhir.
```

**Tools/MCP yang dibutuhkan Scout:**
- `web-search` — untuk search Google Maps, social media, OTA
- `web-fetch` / `browser` — untuk fetch halaman web dan download gambar
- `filesystem` — untuk menyimpan hasil research ke folder

**Validasi sebelum handoff ke Builder:**
- [ ] Folder `research/` terisi minimal 5 file
- [ ] `scout-summary.md` ada dan lengkap
- [ ] Folder `assets/images/` ada minimal 10 gambar (asli atau placeholder)
- [ ] Data hotel dasar lengkap: nama, alamat, rating, telepon, WhatsApp
- [ ] Minimal 3 review untuk testimonial section

---

### 🏗️ AGENT 2: BUILDER (Build Landing Page)

**Role:** Membangun landing page preview berdasarkan data dari Scout dan spesifikasi design di template ini.

**Kapan dijalankan:** SETELAH Scout selesai dan output tervalidasi.

**System Prompt untuk Builder Agent:**

```markdown
Kamu adalah BUILDER — agent developer untuk project landing page preview hotel.

MISI: Bangun landing page preview yang production-ready berdasarkan:
1. Data research dari folder research/ (terutama scout-summary.md)
2. Gambar yang sudah dikumpulkan di assets/images/
3. Spesifikasi design dari plan file ini (Section C-I)

ATURAN UTAMA:
- Baca research/scout-summary.md PERTAMA sebelum mulai coding
- Gunakan gambar ASLI dari assets/images/ sebagai prioritas utama
- Jika gambar asli tidak cukup atau kualitasnya rendah, 
  gunakan Unsplash placeholder dari Section J plan file
- SEMUA data harus dari research Scout — JANGAN buat data palsu
- Harga, rating, review, alamat — semua harus sesuai data asli

TUGAS:

### 1. Setup Project
- Buat folder structure sesuai Section F plan file
- Setup index.html dengan Tailwind CDN, Google Fonts, meta tags
- Buat custom.css dari Section H plan file
- Buat main.js dari Section I plan file

### 2. Build Sections (ikuti urutan Section E plan file)
Untuk setiap section:
a. Baca data yang relevan dari research/
b. Gunakan gambar asli dari assets/images/ (cek image-inventory.md)
c. Jika gambar asli tidak ada untuk section tertentu, gunakan Unsplash
d. Implementasi HTML + Tailwind sesuai spesifikasi
e. Pastikan responsive (mobile-first)
f. Tambahkan class "animate-on-scroll" untuk scroll animation

### 3. Konten & Copy
- Headline dan subheadline: gunakan USP dari scout-summary.md
- Deskripsi hotel: tulis berdasarkan data research, 
  tone profesional tapi warm, bahasa Indonesia
- Room descriptions: berdasarkan data OTA
- Review/testimonial: gunakan review ASLI dari reviews-collection.md
- SEO meta tags: gunakan keyword dari seo-keywords.md

### 4. CTA & Links
- Semua "Book Now" / "Reservasi" → WhatsApp dengan pre-filled text
- Telepon → clickable tel: link
- Social media → link ke akun asli dari social-media-audit.md
- OTA links → link ke listing asli jika ditemukan

### 5. Branding ALURWEB
- Footer WAJIB ada: "Website Preview by ALURWEB" dengan link ke alurweb.com
- Jangan terlalu mencolok, tapi harus ada

### 6. Final Polish
- Test responsive di viewport: 375px, 768px, 1024px, 1280px
- Pastikan semua link berfungsi
- Pastikan semua gambar ter-load
- Optimize: lazy loading untuk gambar, defer untuk JS
- Pastikan page load < 3 detik

OUTPUT YANG HARUS DIHASILKAN:
```
[nama-hotel]-preview/
├── index.html              (complete landing page)
├── assets/
│   ├── css/
│   │   └── custom.css
│   └── images/
│       ├── (gambar asli dari Scout)
│       └── (Unsplash fallback jika perlu)
├── js/
│   └── main.js
└── builder-notes.md        (catatan: gambar mana asli vs placeholder,
                             hal yang perlu diperhatikan Auditor)
```

PENTING:
- Output harus BISA langsung di-deploy ke Vercel/Netlify
- Single page, no build step, no dependencies selain CDN
- builder-notes.md harus mencatat semua decision yang kamu buat
```

**Tools/MCP yang dibutuhkan Builder:**
- `filesystem` — untuk baca research files dan create project files
- `web-fetch` — untuk fetch Unsplash images jika perlu fallback

**Validasi sebelum handoff ke Auditor:**
- [ ] `index.html` ada dan complete (semua 10 sections)
- [ ] `custom.css` dan `main.js` ada
- [ ] Semua CTA mengarah ke WhatsApp yang benar
- [ ] Responsive di mobile (375px)
- [ ] Footer ada credit ALURWEB
- [ ] `builder-notes.md` ada

---

### 📊 AGENT 3: AUDITOR (QA & SEO Audit)

**Role:** Quality assurance, SEO audit, dan membuat before-after comparison report untuk presentasi ke klien.

**Kapan dijalankan:** SETELAH Builder selesai dan output tervalidasi.

**System Prompt untuk Auditor Agent:**

```markdown
Kamu adalah AUDITOR — agent quality assurance untuk project landing page preview hotel.

MISI: Review landing page yang dibuat Builder, audit kualitasnya, 
dan buat report perbandingan before-after untuk presentasi ke klien.

TUGAS:

### 1. Technical QA
- Buka index.html dan review kode
- Cek HTML validity (proper nesting, semantic tags)
- Cek responsive di 4 viewport: 375px, 768px, 1024px, 1280px
- Cek semua link berfungsi (WhatsApp, tel, social media, OTA)
- Cek semua gambar ter-load (catat yang broken)
- Cek smooth scroll navigation berfungsi
- Cek mobile hamburger menu berfungsi
- Cek scroll animations berfungsi
- Test page load performance
- Catat semua bug/issue yang ditemukan

### 2. Content QA
- Baca builder-notes.md untuk context
- Verifikasi data hotel sesuai dengan research/scout-summary.md:
  - Nama hotel benar?
  - Alamat benar?
  - Rating dan jumlah review benar?
  - Harga kamar benar?
  - Nomor telepon/WhatsApp benar?
  - Social media links benar?
- Cek typo dan grammar (Bahasa Indonesia)
- Cek apakah ada data placeholder yang belum diganti

### 3. SEO Audit (Preview vs Website Lama)
- Cek meta tags: title, description, OG tags
- Cek heading structure (H1 → H2 → H3, proper hierarchy)
- Cek alt text pada semua gambar
- Cek semantic HTML (header, main, section, footer)
- Bandingkan dengan audit website lama dari research/audit-website-lama.md
- Buat skor SEO untuk preview (0-100)

### 4. Image Audit
- Review image-inventory.md dan builder-notes.md
- Hitung: berapa gambar asli vs placeholder Unsplash
- Catat gambar mana saja yang HARUS diganti dengan foto asli 
  sebelum presentasi ke klien (jika memungkinkan)
- Cek image optimization (ukuran file, lazy loading)

### 5. Before-After Comparison Report
- Buat tabel perbandingan skor:
  | Aspek | Website Lama | Preview Baru | Improvement |
  Aspek yang dibandingkan:
  - Performance score
  - SEO score
  - Mobile responsiveness
  - Content completeness
  - UX/Design quality
  - Security basics (SSL, headers)
  - CTA effectiveness
  
### 6. Recommendations
- Apa yang perlu diperbaiki sebelum presentasi ke klien?
- Apa yang perlu ditambahkan di full website (bukan preview)?
- Estimasi effort untuk full development

OUTPUT YANG HARUS DIHASILKAN:
```
audit/
├── audit-report.md          (full audit report — ini yang utama)
├── qa-checklist.md          (checklist QA dengan status pass/fail)
├── before-after-comparison.md (tabel perbandingan untuk presentasi)
├── bug-list.md              (daftar bug yang perlu di-fix, jika ada)
├── screenshots-new/         (screenshot landing page baru)
│   ├── desktop-full.png
│   ├── mobile-full.png
│   ├── hero-section.png
│   └── ...
└── presentation-ready.md    (ringkasan 1 halaman untuk dibawa ke meeting klien)
```

FORMAT presentation-ready.md:
```markdown
# [NAMA HOTEL] — Website Improvement Report
## Prepared by ALURWEB

### Kondisi Saat Ini
- Website lama skor: [X]/100
- Masalah utama: [3 bullet points]

### Preview Website Baru
- Link: [URL preview di Vercel/Netlify]
- Skor baru: [X]/100
- Improvement: +[X] poin

### Apa yang Berubah
| Sebelum | Sesudah |
|---------|---------|
| [Masalah 1] | [Solusi 1] |
| [Masalah 2] | [Solusi 2] |
| [Masalah 3] | [Solusi 3] |

### Langkah Selanjutnya
1. Review preview bersama
2. Feedback & penyesuaian
3. Development full website
4. Launch & maintenance

### Investasi
[Sesuaikan dengan pricing ALURWEB]
```

PENTING:
- presentation-ready.md adalah dokumen yang akan dibawa ke meeting klien
- Tulis dengan tone profesional tapi approachable
- Fokus pada HASIL dan VALUE, bukan teknis
- Jika ada bug kritikal, JANGAN mark sebagai selesai — 
  flag ke Orchestrator untuk di-fix Builder
```

**Tools/MCP yang dibutuhkan Auditor:**
- `filesystem` — untuk baca semua output Scout & Builder
- `browser` — untuk test landing page di browser (screenshot, responsive check)
- `web-fetch` — untuk compare dengan website lama

**Validasi final (Orchestrator cek):**
- [ ] `audit-report.md` ada dan lengkap
- [ ] `before-after-comparison.md` ada
- [ ] `presentation-ready.md` ada dan siap dibawa ke meeting
- [ ] Tidak ada bug kritikal yang belum di-fix
- [ ] Semua screenshot baru tersimpan

---

### 🎯 Orchestrator Flow (Untuk Claude Code)

Gunakan prompt ini di Claude Code untuk menjalankan seluruh pipeline:

```markdown
Jalankan pipeline pembuatan landing page preview hotel dengan 3 agent team.

Hotel target: [NAMA HOTEL]
Website lama: [URL atau "tidak ada"]
WhatsApp: [NOMOR]
Lokasi: [KOTA, PROVINSI]

INSTRUKSI:
1. Baca plan file [NAMA_FILE].md
2. Jalankan SCOUT agent — kumpulkan semua data & gambar
3. Validasi output Scout sebelum lanjut
4. Jalankan BUILDER agent — bangun landing page dari data Scout
5. Validasi output Builder sebelum lanjut
6. Jalankan AUDITOR agent — QA, audit, dan buat report
7. Jika Auditor menemukan bug kritikal → kirim balik ke Builder untuk fix
8. Output final: landing page siap deploy + presentation report

Gunakan plan file sebagai panduan untuk design, sections, dan spesifikasi teknis.
```

### Error Handling & Retry

```
Jika SCOUT gagal fetch data:
→ Retry 1x dengan query berbeda
→ Jika tetap gagal, catat sebagai [NOT FOUND] dan lanjut
→ Builder akan pakai placeholder

Jika BUILDER menghasilkan bug:
→ AUDITOR akan flag
→ Orchestrator kirim bug-list.md ke Builder
→ Builder fix dan re-submit
→ AUDITOR re-check (max 2 retry cycles)

Jika AUDITOR menemukan data tidak akurat:
→ Flag ke Orchestrator
→ Orchestrator kirim ke SCOUT untuk re-verify
→ Jika data memang salah, Builder update
```

---

### Output Folder Structure (Final)

```
[nama-hotel]-preview/
├── research/                    ← Output SCOUT
│   ├── hotel-data.md
│   ├── scout-summary.md         ★ File terpenting untuk Builder
│   ├── audit-website-lama.md
│   ├── social-media-audit.md
│   ├── ota-research.md
│   ├── kompetitor.md
│   ├── reviews-collection.md
│   ├── seo-keywords.md
│   ├── image-inventory.md
│   └── screenshots-old/
│
├── index.html                   ← Output BUILDER
├── assets/
│   ├── css/custom.css
│   └── images/                  ★ Gambar asli dari SCOUT + fallback
├── js/main.js
├── builder-notes.md
│
├── audit/                       ← Output AUDITOR
│   ├── audit-report.md
│   ├── qa-checklist.md
│   ├── before-after-comparison.md
│   ├── bug-list.md
│   ├── screenshots-new/
│   └── presentation-ready.md    ★ Bawa ini ke meeting klien
│
└── PLAN-[nama-hotel]-preview.md ← Plan file ini
```

---

## Cara Menggunakan Template Ini (Manual — Tanpa Agent Team)

> Jika tidak pakai Claude Code / Antigravity, ikuti step manual ini:

### Step 1: Riset Klien
Kumpulkan data berikut secara manual:

1. **Google Maps** — Cari nama hotel, ambil:
   - Rating & jumlah reviews
   - Alamat lengkap
   - Nomor telepon
   - Foto-foto (screenshot untuk referensi)
   - Jam operasional

2. **Website Lama** (jika ada) — Audit dengan:
   - Google PageSpeed Insights
   - Cek mobile responsiveness
   - Cek SEO (meta tags, sitemap, dll)
   - Screenshot halaman-halaman utama

3. **Social Media** — Cari akun Instagram, Facebook, TikTok hotel

4. **OTA Listings** — Cek di Traveloka, Agoda, Booking.com:
   - Harga kamar per tipe
   - Fasilitas yang tercantum
   - Review highlights

5. **Kompetitor** — Cek 2-3 hotel sejenis di area yang sama

### Step 2: Isi Template di Bawah (Section A-B)
### Step 3: Eksekusi build secara manual atau dengan Claude Code single agent

---

## A. Informasi Klien

### [NAMA HOTEL]
| Data | Detail |
|------|--------|
| **Nama Hotel** | [Nama lengkap hotel] |
| **Lokasi** | [Alamat lengkap] |
| **Klasifikasi** | [Bintang berapa / Budget / Boutique / dll] |
| **Rating Google** | [Rating] ([Jumlah] reviews) |
| **Harga Mulai** | Rp [Harga]/malam |
| **Telepon** | [Nomor telepon] |
| **WhatsApp** | [Nomor WhatsApp] |
| **Email** | [Email hotel] |
| **Website Lama** | [URL jika ada, atau "Belum ada"] |

### Fasilitas Utama
<!-- Centang yang tersedia, tambah jika perlu -->
- [ ] Free Wi-Fi
- [ ] Breakfast included
- [ ] Free parking
- [ ] Swimming pool
- [ ] Air-conditioned rooms
- [ ] Restaurant/Cafe
- [ ] Spa
- [ ] Meeting/conference room
- [ ] Gym/fitness center
- [ ] Laundry service
- [ ] Airport shuttle
- [ ] 24-hour front desk
- [ ] [Fasilitas lainnya]

### Tipe Kamar
<!-- Isi sesuai data dari OTA atau klien -->
| Tipe Kamar | Harga/Malam | Kapasitas | Fasilitas Kamar |
|------------|-------------|-----------|-----------------|
| [Standard/Superior] | Rp [Harga] | [X] tamu | [AC, TV, WiFi, dll] |
| [Deluxe] | Rp [Harga] | [X] tamu | [AC, TV, WiFi, dll] |
| [Suite/VIP] | Rp [Harga] | [X] tamu | [AC, TV, WiFi, dll] |

### Social Media
| Platform | Link |
|----------|------|
| Instagram | [URL atau "Belum ada"] |
| Facebook | [URL atau "Belum ada"] |
| TikTok | [URL atau "Belum ada"] |
| WhatsApp | [Link wa.me] |

### Unique Selling Points (USP)
<!-- Apa yang buat hotel ini beda dari kompetitor? Tulis 3-5 poin -->
1. [Contoh: Satu-satunya hotel bintang 4 di kota X]
2. [Contoh: View gunung/laut langsung dari kamar]
3. [Contoh: Lokasi strategis dekat bandara]
4. [Contoh: Restaurant terkenal di area]
5. [Contoh: Heritage building / arsitektur unik]

---

## B. Audit Website Lama (Jika Ada)

> **Skip bagian ini jika klien belum punya website.**

| Aspek | Skor (0-100) | Masalah Utama |
|-------|:------------:|---------------|
| Performance | [X] | [Deskripsi masalah] |
| SEO | [X] | [Deskripsi masalah] |
| Security | [X] | [Deskripsi masalah] |
| Mobile Responsive | [X] | [Deskripsi masalah] |
| UX/Content | [X] | [Deskripsi masalah] |
| **Total** | **[X]/100** | |

### Masalah Kritis
1. [Masalah 1 — contoh: Tidak mobile-friendly]
2. [Masalah 2 — contoh: Loading lambat >5 detik]
3. [Masalah 3 — contoh: Tidak ada meta tags SEO]

**Landing page preview ini akan menunjukkan improvement dari semua masalah di atas.**

---

## C. Design System

### Pilih Theme
<!-- Pilih salah satu, atau custom -->

**Option 1: Dark Theme (Premium/Luxury)**
```css
--color-bg-dark: #0F172A;
--color-bg-card: #1E293B;
--color-bg-elevated: #334155;
--color-text-primary: #F8FAFC;
--color-text-secondary: #94A3B8;
```

**Option 2: Light Theme (Clean/Modern)**
```css
--color-bg-light: #FFFFFF;
--color-bg-card: #F8FAFC;
--color-bg-elevated: #F1F5F9;
--color-text-primary: #0F172A;
--color-text-secondary: #475569;
```

**Option 3: Warm Theme (Resort/Tropical)**
```css
--color-bg-warm: #FFF7ED;
--color-bg-card: #FFFFFF;
--color-bg-elevated: #FEF3C7;
--color-text-primary: #1C1917;
--color-text-secondary: #57534E;
```

### Color Palette
```css
/* Primary — pilih warna yang cocok dengan branding hotel */
--color-primary: #[HEX];        /* Warna utama */
--color-primary-light: #[HEX];  /* Hover state */
--color-primary-dark: #[HEX];   /* Active state */

/* Accent */
--color-gold: #F59E0B;           /* Rating/bintang */
--color-success: #10B981;        /* Available/open */
--color-error: #EF4444;          /* Alert/urgent */
```

### Typography
```css
/* Headings — pilih salah satu */
/* Luxury: */ font-family: 'Playfair Display', serif;
/* Modern: */ font-family: 'Poppins', sans-serif;
/* Clean:  */ font-family: 'DM Sans', sans-serif;

/* Body */
font-family: 'Inter', sans-serif;
```

---

## D. Struktur Landing Page

### Sections (Wajib)
Setiap hotel preview HARUS punya sections ini:

```
1. Navigation Bar (sticky)
2. Hero Section (full-width image + headline + CTA)
3. About Section (deskripsi + highlight angka)
4. Rooms Section (tipe kamar + harga)
5. Facilities Section (icon grid)
6. Gallery Section (foto-foto hotel)
7. Testimonials Section (review Google/OTA)
8. Location Section (maps + kontak)
9. CTA Section (booking action)
10. Footer (links + credit ALURWEB)
```

### Sections (Opsional — tambah sesuai kebutuhan)
```
- Promo/Special Offers Section
- Nearby Attractions Section  
- FAQ Section
- Virtual Tour Embed
- Restaurant/Dining Menu Section
- Event/Wedding Package Section
```

---

## E. Detail Per Section

### 1. Navigation Bar
- Logo hotel (atau inisial jika belum ada logo)
- Menu: Home | Rooms | Facilities | Gallery | Contact
- CTA Button: "Book Now" → link ke WhatsApp
- Mobile hamburger menu
- Sticky on scroll dengan backdrop blur

### 2. Hero Section
- **Background:** Full-width foto hotel (dari Unsplash jika belum ada foto asli)
- **Headline:** "[NAMA HOTEL]"
- **Subheadline:** "[USP utama hotel — contoh: Satu-satunya Hotel Bintang 4 di Kota X]"
- **Badge:** Rating [X] stars ([X] reviews)
- **Quick Booking Widget** (desktop only):
  - Check-in date
  - Check-out date
  - Jumlah tamu
  - Harga mulai dari Rp [X]
  - CTA: "Check Availability" → WhatsApp
- **CTA Buttons:**
  - Primary: "Reservasi via WhatsApp" (hijau)
  - Secondary: "Lihat Kamar" (outline, scroll ke rooms)

### 3. About Section
- Deskripsi singkat hotel (2-3 paragraf)
- Key highlights dalam cards (3 items):
  - [Highlight 1 — contoh: Lokasi strategis]
  - [Highlight 2 — contoh: Dekat area wisata]
  - [Highlight 3 — contoh: Akses mudah]
- Statistics counters (animated on scroll):
  - [X]+ Reviews
  - [X] Rating
  - [X] Star Hotel
  - [X]+ Tahun Beroperasi (opsional)

### 4. Rooms Section
- Section header: "Pilih Kamar Anda" / "Our Rooms"
- Grid layout (3 columns desktop, 1 mobile)
- Setiap room card:
  - Foto kamar (Unsplash placeholder)
  - Nama tipe kamar
  - Harga per malam (bold, warna primary)
  - 3-4 amenities dengan icons (WiFi, AC, TV, dll)
  - Ukuran kamar (m²) jika ada
  - Badge "Popular" untuk tipe paling laris
  - CTA: "Book Now" → WhatsApp dengan pre-filled text per tipe

### 5. Facilities Section
- Icon grid layout (3x2 atau 2x3)
- Setiap item: Icon + Nama + Deskripsi singkat (1 line)
- Hover effect untuk detail tambahan
- Facilities dari data klien

### 6. Gallery Section
- Grid layout (masonry style atau uniform grid)
- 6-9 foto (dari Unsplash hotel-related jika belum ada foto asli)
- Lightbox preview on click (opsional, bisa skip untuk preview)
- Mix kategori: exterior, room, pool, restaurant, lobby

### 7. Testimonials Section
- Carousel atau grid (3 reviews)
- Setiap review:
  - Avatar placeholder
  - Nama reviewer
  - Rating stars
  - Kutipan review (dari Google Reviews)
  - Source badge: "Google Review" / "Traveloka" / etc
- Bisa ambil review real dari Google Maps

### 8. Location Section
- Layout: 2 kolom (map + info)
- Google Maps embed (atau screenshot)
- Contact card:
  - Alamat lengkap
  - Telepon
  - WhatsApp (clickable)
  - Email
- Nearby attractions list (opsional):
  - [Tempat wisata 1] — [X] km
  - [Tempat wisata 2] — [X] km
  - [Bandara terdekat] — [X] km

### 9. CTA Section
- Gradient background (primary color)
- Headline: "Siap Merasakan Kenyamanan di [NAMA HOTEL]?"
- Subtext: persuasive copy
- Primary CTA: "Reservasi via WhatsApp" (large button)
- Secondary CTA: "Telepon Sekarang"
- OTA Links: Traveloka, Agoda, Booking.com (jika ada listing)

### 10. Footer
- Logo + deskripsi singkat
- Quick links (Home, Rooms, Facilities, Gallery, Contact)
- Social media icons
- Contact info
- Copyright: "© [TAHUN] [NAMA HOTEL]. All rights reserved."
- **PENTING — Credit:** "Website Preview by [ALURWEB](https://alurweb.com)"

---

## F. File Structure

```
[nama-hotel]-preview/
├── index.html              (single HTML file, semua sections)
├── assets/
│   ├── css/
│   │   └── custom.css      (animasi, glass effect, scrollbar)
│   └── images/
│       └── logo.png        (logo hotel jika ada)
└── js/
    └── main.js             (smooth scroll, mobile menu, scroll animations)
```

---

## G. Technical Checklist

### Wajib Ada di Preview
- [ ] Mobile responsive (test di 375px, 768px, 1280px)
- [ ] Smooth scroll navigation
- [ ] Sticky navbar dengan backdrop blur
- [ ] Scroll animations (fade-in-up)
- [ ] Mobile hamburger menu
- [ ] Semua CTA mengarah ke WhatsApp dengan pre-filled text
- [ ] Meta tags SEO (title, description, OG tags)
- [ ] Google Fonts loaded
- [ ] Tailwind CSS via CDN
- [ ] Loading cepat (<3 detik)

### Nice to Have
- [ ] Dark/light mode toggle
- [ ] Animated counter (statistik)
- [ ] Image lightbox gallery
- [ ] Parallax effect di hero
- [ ] Floating WhatsApp button (bottom-right)
- [ ] Loading skeleton/animation
- [ ] Testimonial carousel auto-slide

### JANGAN Ada di Preview
- ❌ Backend / database connection
- ❌ Real booking system
- ❌ Payment gateway
- ❌ User authentication
- ❌ CMS / admin panel
- ❌ Real-time availability check

---

## H. CSS Base (Copy-Paste Ready)

```css
/* === Custom Animations === */
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
}

/* === Hero Gradient Overlay === */
.hero-gradient {
    background: linear-gradient(
        to bottom,
        rgba(15, 23, 42, 0.7) 0%,
        rgba(15, 23, 42, 0.9) 100%
    );
}

/* === Glass Card Effect === */
.glass-card {
    background: rgba(30, 41, 59, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(148, 163, 184, 0.1);
}

/* === Custom Scrollbar (Dark Theme) === */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #0F172A; }
::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #475569; }
```

---

## I. JavaScript Base (Copy-Paste Ready)

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // === Mobile Menu Toggle ===
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // === Scroll Animations ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // === Sticky Navbar ===
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dark-bg/95', 'backdrop-blur-md', 'shadow-lg');
        } else {
            navbar.classList.remove('bg-dark-bg/95', 'backdrop-blur-md', 'shadow-lg');
        }
    });

    // === Animated Counters ===
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * (target - start) + start);
            el.textContent = current.toLocaleString('id-ID');
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(el => {
        counterObserver.observe(el);
    });
});
```

---

## J. Unsplash Image Bank (Placeholder)

Gunakan URL ini sebagai placeholder sampai dapat foto asli dari klien:

```
# Hotel Exterior
https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80
https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80

# Hotel Room
https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80
https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80

# Hotel Pool
https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80

# Hotel Lobby / Interior
https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80

# Hotel Restaurant
https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80

# Hotel Spa
https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80

# Meeting Room
https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80
```

---

## K. WhatsApp Pre-filled Messages

```
# General Booking
https://wa.me/[NOMOR]?text=Halo,%20saya%20ingin%20reservasi%20kamar%20di%20[NAMA HOTEL]

# Per Room Type
https://wa.me/[NOMOR]?text=Halo,%20saya%20tertarik%20dengan%20kamar%20[TIPE]%20di%20[NAMA HOTEL].%20Apakah%20tersedia%20untuk%20tanggal%20...?

# General Inquiry
https://wa.me/[NOMOR]?text=Halo,%20saya%20ingin%20bertanya%20tentang%20[NAMA HOTEL]
```

---

## L. Presentasi ke Klien

### Sebelum Meeting
1. Upload preview ke hosting gratis (Vercel/Netlify) → dapatkan live URL
2. Siapkan screenshot before-after (website lama vs preview baru)
3. Siapkan poin-poin improvement yang bisa dilihat

### Talking Points
1. **"Ini preview, bukan final."** — Set ekspektasi bahwa ini mockup untuk diskusi
2. **"Semua bisa disesuaikan."** — Warna, layout, konten bisa diubah
3. **"Foto placeholder."** — Nanti diganti foto asli hotel
4. **"WhatsApp langsung nyambung."** — Tunjukkan semua CTA sudah berfungsi
5. **"Mobile-friendly."** — Demo di HP langsung
6. **"SEO-ready."** — Jelaskan meta tags yang sudah disiapkan

### Pricing Discussion
- Preview ini GRATIS sebagai bagian dari konsultasi
- Full website development: mulai Rp [HARGA] (sesuai paket ALURWEB)
- Maintenance bulanan: Rp [HARGA]/bulan
- Jangan kasih harga sebelum klien lihat preview dan tertarik

### Follow-up
- Kirim link preview via WhatsApp setelah meeting
- Follow up 2-3 hari kemudian
- Siapkan proposal formal jika klien tertarik

---

## M. Execution Prompts

### Option 1: Full Agent Team Pipeline (Recommended)

Gunakan prompt di **Section "🎯 Orchestrator Flow"** di atas untuk menjalankan pipeline lengkap 3 agent.

### Option 2: Single Agent (Quick & Simple)

Jika tidak pakai agent team, gunakan prompt berikut di Claude Code:

```
Buatkan landing page preview berdasarkan plan file [NAMA FILE].md.

Instruksi:
1. Research dulu data hotel dari Google Maps, website lama, dan social media
2. Download/fetch gambar asli hotel sebanyak mungkin
3. Buat single HTML file dengan semua sections
4. Gunakan Tailwind CSS CDN
5. Semua CTA harus mengarah ke WhatsApp [NOMOR]
6. Gunakan gambar asli yang sudah di-fetch, fallback ke Unsplash jika kurang
7. Mobile responsive
8. Smooth scroll navigation
9. Dark theme / Light theme (sesuai plan)
10. Footer harus ada credit "Website Preview by ALURWEB"
11. Output: single folder dengan index.html, custom.css, main.js
12. Buat juga audit report before-after untuk presentasi ke klien
```

### Option 3: Manual Build

Isi template Section A-B secara manual, lalu gunakan Section E-I sebagai panduan coding.

---

## N. Version History

| Versi | Tanggal | Perubahan |
|-------|---------|-----------|
| 1.0 | [TANGGAL] | Template awal — sections & design system |
| 2.0 | 2026-02-16 | Tambah Agent Team Orchestration (Scout, Builder, Auditor) |

---

**Template by ALURWEB — Solusi Digital yang Membangun Bisnis**
**https://alurweb.com**
