# Empang V2

Empang V2 adalah aplikasi web untuk pengelolaan pemancingan dan lomba. Aplikasi ini menyediakan halaman publik untuk melihat informasi empang, jadwal lomba, booking tiket, dan cek status pendaftaran, serta dashboard admin untuk mengelola booking, jadwal lomba, rekap peserta, laporan, galeri, dan pengaturan informasi pemancingan.

## Fitur Utama

- Halaman publik untuk informasi empang dan jadwal lomba aktif.
- Booking lomba online dengan kode booking.
- Cek status booking berdasarkan nama peserta.
- Login admin menggunakan Laravel Sanctum.
- Dashboard admin untuk memantau pendaftar dan statistik lomba.
- Manajemen jadwal lomba, kuota, harga tiket, dan status aktif.
- Rekap peserta lomba, metode pembayaran, status pembayaran, dan nomor lapak.
- Pengaturan profil pemancingan, WhatsApp admin, rekening, peraturan, lokasi, galeri, dan potret pemancingan.
- Laporan admin untuk data booking dan rekap.

## Stack

### Backend

- PHP 8.2+
- Laravel 12
- Laravel Sanctum
- SQLite secara default dari `.env.example`
- MySQL 8.4 tersedia melalui Laravel Sail
- PHPUnit

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Lucide React

## Struktur Project

```text
.
|-- backend/     # Laravel API, auth, database, migration, seeder
|-- frontend/    # React + TypeScript + Vite client
`-- README.md
```

## Prasyarat

- PHP 8.2 atau lebih baru
- Composer
- Node.js dan npm
- Docker, jika menggunakan Laravel Sail

## Setup Backend

Masuk ke folder backend:

```bash
cd backend
```

Install dependency PHP:

```bash
composer install
```

Salin file environment:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

Jika memakai SQLite, buat file database:

```bash
touch database/database.sqlite
```

Jalankan migration dan seeder:

```bash
php artisan migrate --seed
```

Jalankan backend:

```bash
php artisan serve
```

Secara default Laravel akan berjalan di `http://127.0.0.1:8000`.

## Setup Frontend

Buka terminal baru, lalu masuk ke folder frontend:

```bash
cd frontend
```

Install dependency JavaScript:

```bash
npm install
```

Jalankan frontend:

```bash
npm run dev
```

Frontend akan berjalan di alamat yang ditampilkan Vite, biasanya `http://localhost:5173`.

## Catatan Proxy API

Konfigurasi Vite frontend saat ini mem-proxy request `/api` dan `/storage` ke:

```text
http://localhost
```

Jalur paling mulus adalah menjalankan backend dengan Laravel Sail karena service Laravel diekspos ke port `80` secara default. Jika menjalankan backend lokal dengan `php artisan serve` di port `8000`, sesuaikan `frontend/vite.config.ts` agar target proxy mengarah ke:

```text
http://127.0.0.1:8000
```

## Setup Dengan Laravel Sail

Dari folder `backend`, install dependency terlebih dahulu, lalu jalankan Sail:

```bash
composer install
cp .env.example .env
php artisan key:generate
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate --seed
```

Jika memakai Sail dan MySQL, sesuaikan konfigurasi database di `backend/.env`, misalnya:

```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=sail
DB_PASSWORD=password
```

## Akun Admin Seeder

Seeder membuat akun admin default:

```text
Email: admin@gmail.com
Password: password
```

Ganti kredensial ini sebelum digunakan di lingkungan produksi.

## Rute Aplikasi

### Frontend Publik

- `/` untuk halaman utama.
- `/booking` untuk booking lomba.
- `/status` untuk cek status booking.

### Frontend Admin

- `/empang-rahasia` untuk login admin.
- `/admin/dashboard` untuk dashboard booking.
- `/admin/reports` untuk laporan.
- `/admin/settings` untuk pengaturan empang.
- `/admin/rekap-hybrid` untuk rekap peserta.
- `/admin/lomba` untuk manajemen jadwal lomba.

## Endpoint API Ringkas

Endpoint publik:

- `POST /api/bookings`
- `GET /api/bookings/check/{nama}`
- `GET /api/public/home`
- `POST /api/public/booking`
- `POST /api/login`

Endpoint admin memerlukan token Sanctum:

- `POST /api/logout`
- `GET /api/admin/dashboard`
- `GET /api/admin/bookings`
- `PUT /api/admin/bookings/{id}/verify`
- `DELETE /api/admin/bookings/{id}`
- `GET /api/admin/reports`
- `GET /api/admin/settings`
- `PUT /api/admin/settings`
- `POST /api/admin/settings/gallery`
- `DELETE /api/admin/settings/gallery`
- `GET /api/admin/lombas`
- `POST /api/admin/lombas`
- `GET /api/admin/lombas/{id}`
- `DELETE /api/admin/lombas/{id}`
- `GET /api/admin/rekaps/{lomba_id}`
- `POST /api/admin/rekaps`
- `PUT /api/admin/rekaps/{id}`
- `DELETE /api/admin/rekaps/{id}`

## Perintah Pengembangan

Backend:

```bash
cd backend
php artisan test
./vendor/bin/pint
```

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

## Build Production

Build frontend:

```bash
cd frontend
npm run build
```

Optimasi backend Laravel:

```bash
cd backend
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Catatan Keamanan

- Jangan commit file `.env`.
- Ubah akun admin default setelah deploy.
- Pastikan `APP_DEBUG=false` di production.
- Gunakan database production yang aman dan backup berkala.
- Pastikan storage publik Laravel sudah dibuat jika memakai upload galeri:

```bash
php artisan storage:link
```

## Lisensi

Belum ada lisensi khusus di repository ini. Tambahkan file `LICENSE` jika project akan dipublikasikan atau digunakan oleh pihak lain.
