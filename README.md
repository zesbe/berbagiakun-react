# BerbagiAkun - SaaS Berbagi Akun Langganan

## Stack:
- Next.js (Frontend)
- Supabase (Database + Auth + Edge Function)
- Bootstrap (UI)
- Wapanels (WhatsApp API)
- Pakasir (Payment)

## Fitur:
- Landing page responsif, SEO, multi-bahasa, dark mode
- List produk dinamis dari database
- Order flow: pilih produk → isi WA & email → bayar via Pakasir → auto update DB & expired
- Notifikasi WhatsApp otomatis ke pelanggan & admin (order baru, expired reminder, perpanjang)
- Dashboard customer: cek produk, expired, info akun, perpanjang
- Admin panel: login khusus, CRUD produk, manage order manual
- Cron Edge Function di Supabase: reminder expired
- Policy keamanan, data user terproteksi

## Cara Jalankan
1. `npm install`
2. Copy `.env.local` dari template, isi key Supabase, Pakasir, Wapanels
3. Jalankan: `npm run dev`
4. Deploy ke Vercel/Netlify
5. Deploy Edge Function via `supabase functions deploy reminder-expired`

## Struktur Folder
- `/src/pages` : Halaman utama, dashboard, admin, API routes
- `/src/lib` : Helper supabase, whatsapp, payment
- `/public/icons` : Logo produk
- `/supabase/functions` : Edge Function reminder expired

## Policy Supabase:
- RLS aktif: user hanya bisa akses order miliknya
- Admin via table `admin_users`

## Env Var
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server/Edge function only)
- `WAPANELS_APPKEY`, `WAPANELS_AUTHKEY`
- `PAKASIR_API_KEY`
- `ADMIN_WA`

## Reminder
- Tidak expose Service Role Key ke frontend
- Password admin di-hash, jangan plain
- Uji end-to-end sebelum produksi

## Lisensi
Commercial use, hak cipta owner.
