# 🌿 Sayur Kampung Pedalaman

Website toko online profesional untuk sayur mayur dan rempah-rempah asli Kalimantan.

## Stack Teknologi

- **Frontend**: React 19 + TypeScript + Tailwind CSS 3 + React Router
- **State**: Zustand (cart persistence)
- **Forms**: React Hook Form + Zod validation
- **Build**: Vite

## Fitur

### Halaman Publik
- 🏠 Beranda — Hero, produk unggulan, blog
- 🛒 Katalog — Filter kategori, pencarian real-time  
- 📦 Detail Produk — Add to cart, produk terkait
- 🧺 Keranjang Belanja — Persist localStorage
- 💳 Checkout — Form alamat lengkap, 9 metode pembayaran lokal
- ✅ Konfirmasi Pesanan + instruksi transfer
- ✍️ Blog + share buttons (Web Share API)
- ℹ️ Tentang, Pengiriman, FAQ

### Admin Dashboard (`/admin-sk2024x`)
- 📊 Dashboard statistik
- 📦 Manajemen produk (CRUD)
- 🛒 Manajemen pesanan + update status
- ✍️ Manajemen blog
- ⚙️ Pengaturan rekening bank & e-wallet

## Cara Jalankan

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
```

Upload folder `dist/` ke Netlify, Vercel, atau hosting pilihan Anda.

---

*Dibuat dengan ❤️ untuk petani lokal Kalimantan*
