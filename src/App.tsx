import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { TokoPage } from './pages/TokoPage';
import { ProdukDetailPage } from './pages/ProdukDetailPage';
import { KeranjangPage } from './pages/KeranjangPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { SuksesPembayaranPage } from './pages/SuksesPembayaranPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { TentangPage, PengirimanPage, FAQPage } from './pages/InfoPages';
import {
  AdminLayout, AdminDashboard, AdminProduk, AdminPesanan,
  AdminBlog, AdminKategori, AdminPengaturan,
} from './components/admin/AdminPages';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <PublicLayout>
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">🌿</div>
        <h1 className="font-display text-4xl text-[var(--text)] mb-4">Halaman Tidak Ditemukan</h1>
        <p className="text-[var(--muted)] italic font-body mb-8">
          Sepertinya halaman yang Anda cari sudah berpindah ke hutan yang lebih dalam.
        </p>
        <a href="/" className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-7 py-3 rounded font-semibold text-sm no-underline hover:bg-[var(--primary-dark)] transition-colors">
          ← Kembali ke Beranda
        </a>
      </div>
    </PublicLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/toko" element={<PublicLayout><TokoPage /></PublicLayout>} />
        <Route path="/produk/:slug" element={<PublicLayout><ProdukDetailPage /></PublicLayout>} />
        <Route path="/keranjang" element={<PublicLayout><KeranjangPage /></PublicLayout>} />
        <Route path="/checkout" element={<PublicLayout><CheckoutPage /></PublicLayout>} />
        <Route path="/sukses-pembayaran" element={<PublicLayout><SuksesPembayaranPage /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
        <Route path="/blog/:slug" element={<PublicLayout><BlogPostPage /></PublicLayout>} />
        <Route path="/tentang" element={<PublicLayout><TentangPage /></PublicLayout>} />
        <Route path="/pengiriman" element={<PublicLayout><PengirimanPage /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><FAQPage /></PublicLayout>} />
        <Route path="/admin-sk2024x" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="produk" element={<AdminProduk />} />
          <Route path="pesanan" element={<AdminPesanan />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="kategori" element={<AdminKategori />} />
          <Route path="pengaturan" element={<AdminPengaturan />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
