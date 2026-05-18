# 🚀 Tutorial Lengkap: Membangun Aplikasi SvelteBlog dari Nol

Tutorial ini akan memandu kamu langkah demi langkah untuk membangun aplikasi blog modern dengan dashboard admin, menggunakan stack teknologi yang sama dengan aplikasi ini. Dengan panduan ini, kamu bisa membuat aplikasi serupa tanpa perlu bantuan AI.

---

## 🛠️ Tech Stack yang Digunakan

Sebelum mulai, pastikan kamu familiar dengan teknologi yang akan kita gunakan:
- **Framework**: [Svelte 5](https://svelte.dev/) (menggunakan Runes untuk reaktivitas).
- **Meta-framework**: [SvelteKit](https://kit.svelte.dev/) (untuk routing dan server-side logic).
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (versi terbaru dengan performa tinggi).
- **Database ORM**: [Drizzle ORM](https://orm.drizzle.team/) (tipe-aman dan cepat).
- **Database Engine**: [SQLite](https://www.sqlite.org/) (Sederhana, berbasis file lokal).
- **Authentication**: [Better Auth](https://better-auth.com/) (Autentikasi modern dan aman).
- **UI Components**: [Bits UI](https://bits-ui.com/) & Komponen ala Shadcn.

---

## Langkah 1: Inisialisasi Proyek SvelteKit

Langkah pertama adalah membuat proyek SvelteKit baru. Buka terminalmu dan jalankan:

```bash
npx sv create my-svelte-blog
```
Saat ditanya oleh wizard instalasi:
- Pilih **SvelteKit App** (atau skeleton project).
- Gunakan **Typescript**.
- Pilih tool tambahan seperti Prettier dan ESLint jika diinginkan.
- (Svelte 5 secara otomatis akan menjadi default di SvelteKit versi terbaru).

Masuk ke folder proyek dan instal dependensi bawaan:
```bash
cd my-svelte-blog
npm install
```

---

## Langkah 2: Instalasi Tailwind CSS v4

Tailwind CSS versi 4 memiliki setup yang lebih sederhana. SvelteKit memiliki alat bantu instalasi:

```bash
npx sv add tailwind
```

Atau instalasi manual untuk v4 (pastikan kamu mengikuti dokumentasi resmi Tailwind v4 untuk Vite/SvelteKit).

---

## Langkah 3: Setup Drizzle ORM & SQLite

Kita butuh database untuk menyimpan artikel, user, dan pengaturan. SQLite sangat cocok karena berbasis file sehingga tidak repot setup server database.

**1. Instal dependensi database:**
```bash
npm install drizzle-orm better-sqlite3
npm install -D drizzle-kit @types/better-sqlite3
```

**2. Buat konfigurasi Drizzle:**
Buat file `drizzle.config.ts` di root folder proyek:
```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/server/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'local.db',
  },
});
```

**3. Buat file Schema Database (`src/lib/server/db/schema.ts`):**
Di sinilah kita mendefinisikan tabel database (seperti users, posts, dll).
```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password'),
  role: text('role').default('user')
});

export const posts = sqliteTable('post', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: text('authorId').references(() => users.id),
  createdAt: integer('createdAt', { mode: 'timestamp' })
});
```

**4. Buat koneksi database (`src/lib/server/db/index.ts`):**
```typescript
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('local.db');
export const db = drizzle(sqlite);
```

Untuk menerapkan schema ke file SQLite, jalankan:
```bash
npx drizzle-kit push
```

---

## Langkah 4: Setup Autentikasi dengan Better Auth

**1. Instal dependensi auth:**
```bash
npm install better-auth
```

**2. Konfigurasi Auth di Server (`src/lib/server/auth.ts`):**
```typescript
import { betterAuth } from "better-auth";
import { db } from "./db"; // koneksi Drizzle kamu
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite", // atau sesuai provider
    }),
    emailAndPassword: {
        enabled: true,
    },
});
```

**3. Buat endpoint Auth (`src/routes/api/auth/[...all]/+server.ts`):**
Better Auth menangani semua route login, logout, dan register secara otomatis melalui *catch-all route*.
```typescript
import { auth } from "$lib/server/auth";

export const fallback = ({ request }) => {
    return auth.handler(request);
};
```

**4. Pasang Client SDK (`src/lib/auth-client.ts`):**
```typescript
import { createAuthClient } from "better-auth/client";
export const authClient = createAuthClient();
```

---

## Langkah 5: Struktur Routing & Middleware (Hooks)

SvelteKit memisahkan logika server dan client di folder `src/routes/`.
- `+page.svelte` (UI)
- `+page.server.ts` (Logika backend spesifik halaman)

**Struktur folder ideal:**
```text
src/
└── routes/
    ├── (public)/          # Beranda, baca blog
    ├── admin/             # Dashboard admin (butuh login)
    ├── auth/              # Form login
    └── +layout.svelte     # Layout navbar utama
```

**Membuat Middleware Proteksi (Hooks):**
Buat file `src/hooks.server.ts`. Middleware ini akan mengecek apakah seseorang yang mencoba masuk ke folder `/admin` sudah login atau belum.

```typescript
import { auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
    // 1. Ambil session dari Better Auth
    const session = await auth.api.getSession({
        headers: event.request.headers,
    });
    
    event.locals.user = session?.user;
    
    // 2. Jika coba masuk /admin tapi belum login, lempar ke /auth/login
    if (event.url.pathname.startsWith("/admin") && !session) {
        throw redirect(302, "/auth/login");
    }

    // 3. Jika sudah login dan mencoba masuk ke /auth/login, lempar ke /admin
    if (event.url.pathname.startsWith("/auth") && session) {
        throw redirect(302, "/admin");
    }

    return resolve(event);
};
```

---

## Langkah 6: Membuat Fitur Auto-Setup (Zero-Config)

Aplikasi SvelteBlog memiliki fitur canggih: ketika baru diinstal, sistem otomatis membuat database dan admin user jika belum ada.

**Ide implementasinya:**
1. Di halaman root (`/`) atau file layout utama, lakukan pengecekan apakah tabel `users` memiliki minimal 1 akun admin.
2. Jika kosong, redirect ke `/admin/setup`.
3. Di `src/routes/admin/setup/+page.server.ts`, jalankan skrip untuk push schema database dan _seed_ akun admin default.

Contoh seeder akun:
```typescript
// di dalam +page.server.ts setup
await auth.api.signUpEmail({
    body: {
        email: "admin@blog.com",
        password: "password123",
        name: "Admin",
    }
});
```

---

## Langkah 7: Penggunaan Svelte 5 Runes

Svelte 5 membuang penggunaan `export let` dan syntax lama lainnya, menggantikannya dengan Runes (`$state`, `$derived`, `$props`).

**Contoh Komponen PostCard di Svelte 5:**
```svelte
<script lang="ts">
  // Menerima data dari parent (menggantikan export let)
  let { title, excerpt, date } = $props();
  
  // State lokal (menggantikan let biasa)
  let isHovered = $state(false);
</script>

<div 
  class="card {isHovered ? 'shadow-lg' : 'shadow-sm'}"
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
>
  <h2>{title}</h2>
  <p>{excerpt}</p>
  <small>{date}</small>
</div>
```

---

## Ringkasan Alur Pembuatan Fitur (Workflow)

Saat kamu ingin membuat fitur baru (misal: Manajemen Kategori Artikel):
1. **Database:** Tambahkan tabel `categories` di `schema.ts`.
2. **Migrasi:** Jalankan `npx drizzle-kit push`.
3. **Backend/Action:** Buat `+page.server.ts` di rute `/admin/categories` untuk menangani form `POST` (Create, Update, Delete).
4. **Frontend/UI:** Buat tabel dan form di `+page.svelte` menggunakan state dari `export const data` atau `$props()` di Svelte 5.
5. **Aestetika:** Gunakan Tailwind CSS dan komponen Bits UI untuk mempercantik tampilannya.

Selamat! Dengan mengikuti panduan dan pola pikir ini, kamu bisa membangun sendiri aplikasi sekompleks SvelteBlog tanpa perlu bergantung pada AI.
