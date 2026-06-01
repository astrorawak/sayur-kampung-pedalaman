import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { products as initialProducts } from '../../data/products';
import { blogPosts as initialBlogPosts } from '../../data/blog';
import { categories } from '../../data/products';
import { formatRupiah } from '../../lib/utils';

// Simple auth check - in production this would use proper auth
const ADMIN_KEY = 'sk2024x_admin';

function useAdminAuth() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(ADMIN_KEY) === 'true');
  const login = (pass: string) => {
    if (pass === 'admin2024') {
      sessionStorage.setItem(ADMIN_KEY, 'true');
      setAuthed(true);
      return true;
    }
    return false;
  };
  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    setAuthed(false);
  };
  return { authed, login, logout };
}

function AdminLogin({ onLogin }: { onLogin: (pass: string) => boolean }) {
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(pass)) setError('Password salah. Coba lagi.');
    else setError('');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-alt)] flex items-center justify-center px-4">
      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-8 w-full max-w-sm shadow-lg">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌿</div>
          <h1 className="font-display text-2xl text-[var(--text)] font-bold">Admin Panel</h1>
          <p className="text-[var(--muted)] text-sm mt-1">Sayur Kampung Pedalaman</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">Password</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Masukkan password admin"
              className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" className="w-full bg-[var(--primary)] text-white py-3 rounded-lg font-bold hover:bg-[var(--primary-dark)] transition-colors">
            Masuk
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/" className="text-[var(--muted)] text-xs no-underline hover:text-[var(--primary)]">← Kembali ke Toko</Link>
        </div>
      </div>
    </div>
  );
}

const adminNavLinks = [
  { href: 'dashboard', label: 'Dashboard', icon: '📊' },
  { href: 'produk', label: 'Produk', icon: '🌿' },
  { href: 'pesanan', label: 'Pesanan', icon: '📦' },
  { href: 'blog', label: 'Blog', icon: '📝' },
  { href: 'kategori', label: 'Kategori', icon: '🏷️' },
  { href: 'pengaturan', label: 'Pengaturan', icon: '⚙️' },
];

export function AdminLayout() {
  const { authed, login, logout } = useAdminAuth();
  const location = useLocation();

  if (!authed) return <AdminLogin onLogin={login} />;

  return (
    <div className="min-h-screen bg-[var(--bg-alt)] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[var(--text)] text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--primary)] rounded flex items-center justify-center text-lg">🌿</div>
            <div>
              <div className="font-display text-sm font-bold">Admin Panel</div>
              <div className="text-xs text-gray-400">Sayur Kampung</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 py-4">
          {adminNavLinks.map((link) => {
            const active = location.pathname.includes(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-5 py-3 text-sm no-underline transition-colors ${active ? 'bg-[var(--primary)] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={logout} className="w-full text-left text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors">
            <span>🚪</span><span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="md:hidden bg-[var(--text)] text-white p-4 flex items-center justify-between">
          <div className="font-display font-bold">Admin Panel</div>
          <button onClick={logout} className="text-gray-400 text-sm">Keluar</button>
        </div>
        {/* Mobile nav */}
        <div className="md:hidden flex overflow-x-auto bg-[var(--text)] border-t border-white/10 px-2 pb-2">
          {adminNavLinks.map((link) => (
            <Link key={link.href} to={link.href} className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 text-xs no-underline rounded transition-colors ${location.pathname.includes(link.href) ? 'text-[var(--accent)]' : 'text-gray-400'}`}>
              <span>{link.icon}</span><span>{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function AdminDashboard() {
  const stats = [
    { label: 'Total Produk', value: initialProducts.length, icon: '🌿', color: 'bg-green-100 text-green-700' },
    { label: 'Produk Aktif', value: initialProducts.filter((p) => p.isActive).length, icon: '✅', color: 'bg-blue-100 text-blue-700' },
    { label: 'Kategori', value: categories.length, icon: '🏷️', color: 'bg-purple-100 text-purple-700' },
    { label: 'Artikel Blog', value: initialBlogPosts.filter((p) => p.isPublished).length, icon: '📝', color: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-[var(--text)] font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-5">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-xl mb-3 ${s.color}`}>{s.icon}</div>
            <div className="font-bold text-2xl text-[var(--text)]">{s.value}</div>
            <div className="text-sm text-[var(--muted)]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6">
        <h2 className="font-display text-lg text-[var(--text)] font-semibold mb-4">Produk Stok Rendah</h2>
        <div className="space-y-3">
          {initialProducts.filter((p) => p.stock < 20).map((p) => (
            <div key={p.id} className="flex items-center justify-between py-2 border-b border-[var(--border-light)] last:border-0">
              <div>
                <div className="font-medium text-sm text-[var(--text)]">{p.name}</div>
                <div className="text-xs text-[var(--muted)]">{p.category}</div>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${p.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                Stok: {p.stock}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminProduk() {
  const [prods] = useState(initialProducts);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-[var(--text)] font-bold">Manajemen Produk</h1>
        <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors">
          + Tambah Produk
        </button>
      </div>
      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-alt)] border-b border-[var(--border)]">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-[var(--text)]">Produk</th>
                <th className="text-left px-4 py-3 font-semibold text-[var(--text)]">Kategori</th>
                <th className="text-left px-4 py-3 font-semibold text-[var(--text)]">Harga</th>
                <th className="text-left px-4 py-3 font-semibold text-[var(--text)]">Stok</th>
                <th className="text-left px-4 py-3 font-semibold text-[var(--text)]">Status</th>
              </tr>
            </thead>
            <tbody>
              {prods.map((p) => (
                <tr key={p.id} className="border-b border-[var(--border-light)] hover:bg-[var(--bg-alt)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                      <div>
                        <div className="font-medium text-[var(--text)]">{p.name}</div>
                        <div className="text-xs text-[var(--muted)]">📍 {p.origin}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">{p.category}</td>
                  <td className="px-4 py-3 font-medium text-[var(--primary)]">{formatRupiah(p.price)}/{p.unit}</td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${p.stock < 10 ? 'text-red-500' : p.stock < 20 ? 'text-amber-500' : 'text-green-600'}`}>{p.stock}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function AdminPesanan() {
  return (
    <div>
      <h1 className="font-display text-2xl text-[var(--text)] font-bold mb-6">Manajemen Pesanan</h1>
      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-12 text-center">
        <div className="text-5xl mb-4">📦</div>
        <h3 className="font-display text-xl text-[var(--text)] mb-2">Belum Ada Pesanan</h3>
        <p className="text-[var(--muted)] text-sm">Pesanan yang masuk via WhatsApp akan ditampilkan di sini.</p>
        <p className="text-[var(--muted)] text-xs mt-2">Sistem pesanan terintegrasi dengan WhatsApp untuk konfirmasi real-time.</p>
      </div>
    </div>
  );
}

export function AdminBlog() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-[var(--text)] font-bold">Manajemen Blog</h1>
        <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors">
          + Tulis Artikel
        </button>
      </div>
      <div className="space-y-4">
        {initialBlogPosts.map((post) => (
          <div key={post.id} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-5 flex gap-4">
            <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-[var(--text)] mb-1 leading-tight">{post.title}</h3>
              <p className="text-xs text-[var(--muted)] mb-2">📅 {post.publishedAt} • ✍️ {post.author}</p>
              <p className="text-sm text-[var(--muted)] line-clamp-2">{post.excerpt}</p>
            </div>
            <div className="flex-shrink-0">
              <span className={`text-xs font-bold px-2 py-1 rounded ${post.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {post.isPublished ? 'Dipublish' : 'Draft'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminKategori() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-[var(--text)] font-bold">Manajemen Kategori</h1>
        <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors">
          + Tambah Kategori
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-5 flex items-center gap-4">
            <div className="text-4xl">{cat.icon}</div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-[var(--text)]">{cat.name}</h3>
              <p className="text-xs text-[var(--muted)] mt-1">{cat.description}</p>
              <p className="text-xs text-[var(--primary)] mt-1">
                {initialProducts.filter((p) => p.categorySlug === cat.slug).length} produk
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminPengaturan() {
  return (
    <div>
      <h1 className="font-display text-2xl text-[var(--text)] font-bold mb-6">Pengaturan Toko</h1>
      <div className="space-y-6">
        {/* Info Toko */}
        <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6">
          <h2 className="font-display text-lg text-[var(--text)] font-semibold mb-4">Informasi Toko</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Nama Toko', value: 'Sayur Kampung Pedalaman' },
              { label: 'WhatsApp', value: '082358402290' },
              { label: 'Email', value: 'astrorawak@gmail.com' },
              { label: 'Jam Operasional', value: 'Senin–Sabtu, 08.00–17.00 WITA' },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-[var(--text)] mb-1">{f.label}</label>
                <input defaultValue={f.value} className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
              </div>
            ))}
          </div>
        </div>

        {/* Rekening Bank */}
        <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6">
          <h2 className="font-display text-lg text-[var(--text)] font-semibold mb-4">Rekening Pembayaran</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'BCA', value: '1234567890' },
              { label: 'Mandiri', value: '0987654321' },
              { label: 'BNI', value: '1122334455' },
              { label: 'BRI', value: '5544332211' },
              { label: 'GoPay/OVO/DANA', value: '082358402290' },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-[var(--text)] mb-1">{f.label}</label>
                <input defaultValue={f.value} className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
              </div>
            ))}
          </div>
          <button className="mt-4 bg-[var(--primary)] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors">
            Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
}
