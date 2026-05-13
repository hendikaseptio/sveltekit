# 🚀 SvelteBlog Developer Documentation

Selamat datang di panduan teknis SvelteBlog. Dokumen ini dirancang untuk pengembang yang ingin memahami arsitektur, fitur, dan cara pengembangan proyek ini.

## 🛠 Tech Stack

Proyek ini dibangun menggunakan teknologi mutakhir untuk performa dan pengalaman pengembang yang maksimal:

- **Framework**: [Svelte 5](https://svelte.dev) (menggunakan Runes untuk reaktivitas).
- **Meta-framework**: [SvelteKit](https://kit.svelte.dev).
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) (versi terbaru dengan performa tinggi).
- **Database ORM**: [Drizzle ORM](https://orm.drizzle.team).
- **Database Engine**: [SQLite](https://www.sqlite.org) (Local file-based).
- **Authentication**: [Better Auth](https://better-auth.com).
- **UI Components**: [Bits UI](https://bits-ui.com) & Custom Shadcn-like components.
- **Charts**: [LayerChart](https://layerchart.com).
- **Icons**: [Lucide Svelte](https://lucide.dev).

---

## 📁 Struktur Proyek

```text
├── src/
│   ├── lib/
│   │   ├── components/     # UI Components (UI, Sections, Custom)
│   │   ├── server/         # Logic sisi server (DB, Auth)
│   │   │   ├── db/         # Schema Drizzle & Migrasi
│   │   │   └── auth.ts     # Konfigurasi Better Auth
│   │   └── auth-client.ts  # SDK Auth untuk sisi klien
│   ├── routes/
│   │   ├── (public)/       # Halaman publik (Beranda, Artikel, dll)
│   │   ├── admin/          # Panel kontrol admin (Dashboard, CMS)
│   │   ├── auth/           # Halaman login, register, reset password
│   │   ├── hooks.server.ts # Middleware (Auth Guard, Analytics)
│   │   └── +layout.svelte  # Layout utama (Navbar, Footer, SEO)
├── static/                 # Asset statis (Gambar, Font)
├── drizzle.config.ts       # Konfigurasi Drizzle
├── package.json            # Script & Dependensi
└── local.db                # File Database SQLite
```

---

## ✨ Fitur Utama

### 1. Zero-Configuration Setup Wizard
Sistem akan mendeteksi jika database belum terinstal atau website belum dikonfigurasi. Pengguna akan diarahkan ke `/admin/setup` yang secara otomatis akan:
- Menjalankan `drizzle-kit push` dari server-side.
- Membuat halaman default (Tentang Kami, Kontak, dll).
- Membuat menu navigasi otomatis.

### 2. Real-Time Visitor Analytics
Sistem memiliki middleware di `hooks.server.ts` yang mencatat setiap kunjungan halaman publik secara asinkron. Data ditampilkan di Admin Dashboard dalam bentuk grafik interaktif dan tabel halaman terpopuler.

### 3. Integrated Auth & Seeding
Sistem menggunakan Better Auth dengan kebijakan keamanan ketat:
- **Registration Disabled**: Fitur pendaftaran publik dinonaktifkan untuk mencegah akses tidak sah. Akses ke `/auth/register` otomatis di-redirect ke login.
- **Automated Seeding**: Akun Admin dan Editor dibuat secara otomatis saat proses Setup Wizard melalui server-side action di `src/routes/admin/setup/+page.server.ts`.
- **Default Credentials**:
  - Admin: `admin@blog.com` / `password123`
  - Editor: `editor@blog.com` / `password123`
- **Security Features**: Dilengkapi password visibility toggle dan proteksi route tingkat middleware.

### 4. Modular Page Builder
Halaman statis dibangun menggunakan sistem section modular yang disimpan sebagai JSON di database, memungkinkan fleksibilitas tinggi dalam penyusunan konten.

---

## ⚙️ Cara Menjalankan Project

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Konfigurasi Environment
Buat file `.env` di root folder:
```env
DATABASE_URL=local.db
BETTER_AUTH_SECRET=rahasia_anda
ORIGIN=http://localhost:5173
```

### 3. Inisialisasi Database
Kamu bisa menjalankan wizard otomatis dengan membuka aplikasi di browser, atau secara manual:
```bash
npm run db:push
```

### 4. Menjalankan Server Development
```bash
npm run dev
```

---

## 🔐 Keamanan & Middleware

Aplikasi ini menggunakan `sequence` middleware di `src/hooks.server.ts`:
1. **handleParaglide**: Menangani lokalisasi/bahasa.
2. **handleBetterAuth**: Mengambil sesi user saat ini.
3. **handleGuard**: Memastikan folder `/admin` tidak bisa diakses tanpa login, dan halaman `/auth` tidak bisa diakses jika sudah login.
4. **handleAnalytics**: Mencatat statistik pengunjung tanpa menghambat response time.

## 📝 Catatan untuk Developer
- Gunakan Svelte Runes (`$state`, `$derived`, `$effect`) untuk reaktivitas.
- Untuk mengedit schema database, ubah file `src/lib/server/db/schema.ts` lalu jalankan `npm run db:push`.
- Link reset password di mode development akan muncul di **console terminal**.
- **PENTING**: Halaman pendaftaran sengaja dimatikan. Jika ingin menambah user, gunakan sistem seeder atau buat UI internal di dashboard admin.
- Kredensial default (`admin@blog.com`) hanya disarankan untuk instalasi awal.

---
*Dokumentasi ini dibuat untuk membantu tim pengembang menjaga kualitas dan keberlanjutan kode proyek SvelteBlog.*
