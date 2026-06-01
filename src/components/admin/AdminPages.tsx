import React, { useState, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAdminStore } from '../../store/adminStore';
import { formatRupiah, slugify } from '../../lib/utils';
import type { Product, Category, BlogPost } from '../../types';

// ─── Auth ────────────────────────────────────────────────────────────────────
const ADMIN_KEY = 'sk2024x_admin';

function useAdminAuth() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(ADMIN_KEY) === 'true');
  const login = (pass: string) => {
    if (pass === 'admin2024') { sessionStorage.setItem(ADMIN_KEY, 'true'); setAuthed(true); return true; }
    return false;
  };
  const logout = () => { sessionStorage.removeItem(ADMIN_KEY); setAuthed(false); };
  return { authed, login, logout };
}

function AdminLogin({ onLogin }: { onLogin: (p: string) => boolean }) {
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const handle = (e: React.FormEvent) => { e.preventDefault(); if (!onLogin(pass)) setError('Password salah.'); };
  return (
    <div className="min-h-screen bg-[var(--bg-alt)] flex items-center justify-center px-4">
      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-8 w-full max-w-sm shadow-lg">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌿</div>
          <h1 className="font-display text-2xl text-[var(--text)] font-bold">Admin Panel</h1>
          <p className="text-[var(--muted)] text-sm mt-1">Sayur Kampung Pedalaman</p>
        </div>
        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">Password</label>
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)}
              placeholder="Masukkan password admin"
              className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" className="w-full bg-[var(--primary)] text-white py-3 rounded-lg font-bold hover:bg-[var(--primary-dark)] transition-colors">Masuk</button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/" className="text-[var(--muted)] text-xs no-underline hover:text-[var(--primary)]">← Kembali ke Toko</Link>
        </div>
      </div>
    </div>
  );
}

// ─── Layout ──────────────────────────────────────────────────────────────────
const navLinks = [
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
      <aside className="w-56 bg-[var(--text)] text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--primary)] rounded flex items-center justify-center text-lg">🌿</div>
            <div><div className="font-display text-sm font-bold">Admin Panel</div><div className="text-xs text-gray-400">Sayur Kampung</div></div>
          </div>
        </div>
        <nav className="flex-1 py-4">
          {navLinks.map((link) => {
            const active = location.pathname.includes(link.href);
            return (
              <Link key={link.href} to={link.href}
                className={`flex items-center gap-3 px-5 py-3 text-sm no-underline transition-colors ${active ? 'bg-[var(--primary)] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
                <span>{link.icon}</span><span>{link.label}</span>
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
      <main className="flex-1 overflow-auto">
        <div className="md:hidden bg-[var(--text)] text-white p-4 flex items-center justify-between">
          <div className="font-display font-bold">Admin Panel</div>
          <button onClick={logout} className="text-gray-400 text-sm">Keluar</button>
        </div>
        <div className="md:hidden flex overflow-x-auto bg-[var(--text)] border-t border-white/10 px-2 pb-2">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}
              className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 text-xs no-underline rounded transition-colors ${location.pathname.includes(link.href) ? 'text-[var(--accent)]' : 'text-gray-400'}`}>
              <span>{link.icon}</span><span>{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="p-6"><Outlet /></div>
      </main>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
export function AdminDashboard() {
  const { products, categories, blogPosts } = useAdminStore();
  const stats = [
    { label: 'Total Produk', value: products.length, icon: '🌿', color: 'bg-green-100 text-green-700' },
    { label: 'Produk Aktif', value: products.filter((p) => p.isActive).length, icon: '✅', color: 'bg-blue-100 text-blue-700' },
    { label: 'Kategori', value: categories.length, icon: '🏷️', color: 'bg-purple-100 text-purple-700' },
    { label: 'Artikel Blog', value: blogPosts.filter((p) => p.isPublished).length, icon: '📝', color: 'bg-amber-100 text-amber-700' },
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
          {products.filter((p) => p.stock < 20).map((p) => (
            <div key={p.id} className="flex items-center justify-between py-2 border-b border-[var(--border-light)] last:border-0">
              <div><div className="font-medium text-sm text-[var(--text)]">{p.name}</div><div className="text-xs text-[var(--muted)]">{p.category}</div></div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${p.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>Stok: {p.stock}</span>
            </div>
          ))}
          {products.filter((p) => p.stock < 20).length === 0 && (
            <p className="text-sm text-[var(--muted)] text-center py-4">Semua stok aman ✅</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Modal wrapper ────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-6 px-4">
      <div className="bg-[var(--bg)] rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          <h2 className="font-display text-xl font-bold text-[var(--text)]">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--bg-alt)] text-[var(--muted)] hover:text-[var(--text)] transition-colors text-lg">✕</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Produk ───────────────────────────────────────────────────────────────────
const emptyProduct = (): Omit<Product, 'id'> => ({
  name: '', slug: '', price: 0, unit: 'kg', category: '', categorySlug: '',
  description: '', image: '', stock: 0, isActive: true, origin: '', badge: '',
});

function ProductForm({ initial, onSave, onClose }: {
  initial: Product | null;
  onSave: (p: Product) => void;
  onClose: () => void;
}) {
  const { categories } = useAdminStore();
  const [form, setForm] = useState<Omit<Product, 'id'>>(
    initial ? { ...initial } : emptyProduct()
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: keyof typeof form, value: string | number | boolean) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      // Auto-generate slug from name
      if (field === 'name') next.slug = slugify(String(value));
      // Auto-fill category name when slug changes
      if (field === 'categorySlug') {
        const cat = categories.find((c) => c.slug === value);
        if (cat) next.category = cat.name;
      }
      return next;
    });
    setErrors((e) => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nama wajib diisi';
    if (!form.price || form.price <= 0) e.price = 'Harga harus lebih dari 0';
    if (!form.categorySlug) e.categorySlug = 'Pilih kategori';
    if (!form.image.trim()) e.image = 'URL gambar wajib diisi';
    if (!form.origin.trim()) e.origin = 'Asal produk wajib diisi';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...form, id: initial?.id ?? Date.now() });
  };

  const inputCls = (field: string) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)] ${errors[field] ? 'border-red-400' : 'border-[var(--border)]'}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--text)] mb-1">Nama Produk *</label>
          <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Contoh: Pakis Hutan Segar" className={inputCls('name')} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">Slug (URL)</label>
          <input value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="auto-dari-nama" className={inputCls('slug')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">Kategori *</label>
          <select value={form.categorySlug} onChange={(e) => set('categorySlug', e.target.value)} className={inputCls('categorySlug')}>
            <option value="">-- Pilih Kategori --</option>
            {categories.map((c) => <option key={c.id} value={c.slug}>{c.icon} {c.name}</option>)}
          </select>
          {errors.categorySlug && <p className="text-red-500 text-xs mt-1">{errors.categorySlug}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">Harga (Rp) *</label>
          <input type="number" value={form.price || ''} onChange={(e) => set('price', Number(e.target.value))} placeholder="15000" className={inputCls('price')} />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">Satuan</label>
          <input value={form.unit} onChange={(e) => set('unit', e.target.value)} placeholder="kg / ikat / buah / 100g" className={inputCls('unit')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">Stok</label>
          <input type="number" value={form.stock || ''} onChange={(e) => set('stock', Number(e.target.value))} placeholder="50" className={inputCls('stock')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">Asal Produk *</label>
          <input value={form.origin} onChange={(e) => set('origin', e.target.value)} placeholder="Pedalaman Mahakam, Kaltim" className={inputCls('origin')} />
          {errors.origin && <p className="text-red-500 text-xs mt-1">{errors.origin}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">Badge (opsional)</label>
          <input value={form.badge || ''} onChange={(e) => set('badge', e.target.value)} placeholder="Terlaris / Organik / Langka" className={inputCls('badge')} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--text)] mb-1">URL Gambar *</label>
          <input value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="https://images.unsplash.com/..." className={inputCls('image')} />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
          {form.image && (
            <div className="mt-2 rounded-lg overflow-hidden h-32 bg-[var(--bg-alt)]">
              <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--text)] mb-1">Deskripsi</label>
          <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} placeholder="Deskripsi produk..." className={`${inputCls('description')} resize-none`} />
        </div>
        <div className="sm:col-span-2 flex items-center gap-3">
          <label className="text-sm font-medium text-[var(--text)]">Status Produk</label>
          <button type="button" onClick={() => set('isActive', !form.isActive)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.isActive ? 'bg-[var(--primary)]' : 'bg-gray-300'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm font-semibold ${form.isActive ? 'text-green-600' : 'text-gray-400'}`}>{form.isActive ? 'Aktif' : 'Nonaktif'}</span>
        </div>
      </div>
      <div className="flex gap-3 pt-2 border-t border-[var(--border)]">
        <button type="button" onClick={onClose} className="flex-1 border border-[var(--border)] text-[var(--text)] py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--bg-alt)] transition-colors">Batal</button>
        <button type="submit" className="flex-1 bg-[var(--primary)] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[var(--primary-dark)] transition-colors">
          {initial ? 'Simpan Perubahan' : 'Tambah Produk'}
        </button>
      </div>
    </form>
  );
}

export function AdminProduk() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdminStore();
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [confirm, setConfirm] = useState<number | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (p: Product) => {
    if (modal === 'edit') updateProduct(p);
    else addProduct(p);
    setModal(null);
    setSelected(null);
  };

  const handleDelete = (id: number) => {
    deleteProduct(id);
    setConfirm(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-display text-2xl text-[var(--text)] font-bold">Manajemen Produk</h1>
        <button onClick={() => { setSelected(null); setModal('add'); }}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors flex items-center gap-2">
          + Tambah Produk
        </button>
      </div>

      <div className="mb-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari produk..."
          className="w-full sm:w-72 border border-[var(--border)] rounded-lg px-4 py-2 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
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
                <th className="text-left px-4 py-3 font-semibold text-[var(--text)]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-[var(--border-light)] hover:bg-[var(--bg-alt)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg flex-shrink-0" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/40'; }} />
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
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setSelected(p); setModal('edit'); }}
                        className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                        ✏️ Edit
                      </button>
                      <button onClick={() => setConfirm(p.id)}
                        className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                        🗑️ Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-[var(--muted)]">Tidak ada produk ditemukan</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <Modal title={modal === 'edit' ? `Edit: ${selected?.name}` : 'Tambah Produk Baru'} onClose={() => { setModal(null); setSelected(null); }}>
          <ProductForm initial={selected} onSave={handleSave} onClose={() => { setModal(null); setSelected(null); }} />
        </Modal>
      )}

      {/* Delete Confirm */}
      {confirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-[var(--bg)] rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="text-4xl text-center mb-3">⚠️</div>
            <h3 className="font-display text-lg font-bold text-[var(--text)] text-center mb-2">Hapus Produk?</h3>
            <p className="text-sm text-[var(--muted)] text-center mb-5">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)} className="flex-1 border border-[var(--border)] text-[var(--text)] py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--bg-alt)] transition-colors">Batal</button>
              <button onClick={() => handleDelete(confirm)} className="flex-1 bg-red-500 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Pesanan ──────────────────────────────────────────────────────────────────
export function AdminPesanan() {
  return (
    <div>
      <h1 className="font-display text-2xl text-[var(--text)] font-bold mb-6">Manajemen Pesanan</h1>
      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-12 text-center">
        <div className="text-5xl mb-4">📦</div>
        <h3 className="font-display text-xl text-[var(--text)] mb-2">Belum Ada Pesanan</h3>
        <p className="text-[var(--muted)] text-sm">Pesanan yang masuk via WhatsApp akan ditampilkan di sini.</p>
      </div>
    </div>
  );
}

// ─── Blog Editor ──────────────────────────────────────────────────────────────
function ImageInsertModal({ onInsert, onClose }: { onInsert: (url: string, alt: string) => void; onClose: () => void }) {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setUrl(dataUrl);
      if (!alt) setAlt(file.name.replace(/\.[^.]+$/, ''));
    };
    reader.readAsDataURL(file);
  };

  const handleInsert = () => {
    if (!url.trim()) return;
    onInsert(url.trim(), alt.trim() || 'gambar');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4">
      <div className="bg-[var(--bg)] rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-bold text-[var(--text)]">Sisipkan Gambar</h3>
          <button onClick={onClose} className="text-[var(--muted)] hover:text-[var(--text)] text-xl">✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">Upload dari Perangkat</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-[var(--border)] rounded-xl p-6 text-center cursor-pointer hover:border-[var(--primary)] transition-colors"
            >
              <div className="text-3xl mb-2">📁</div>
              <p className="text-sm text-[var(--muted)]">Klik untuk pilih gambar</p>
              <p className="text-xs text-[var(--muted)] mt-1">JPG, PNG, WebP, GIF</p>
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-xs text-[var(--muted)]">atau</span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">URL Gambar</label>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/gambar.jpg"
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">Keterangan Gambar (alt text)</label>
            <input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Deskripsi singkat gambar"
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
          </div>

          {url && (
            <div className="rounded-xl overflow-hidden h-32 bg-[var(--bg-alt)]">
              <img src={url} alt={alt} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 border border-[var(--border)] text-[var(--text)] py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--bg-alt)] transition-colors">Batal</button>
            <button onClick={handleInsert} disabled={!url.trim()}
              className="flex-1 bg-[var(--primary)] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Sisipkan Gambar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogEditor({ initial, onSave, onClose }: {
  initial: BlogPost | null;
  onSave: (p: BlogPost) => void;
  onClose: () => void;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState<Omit<BlogPost, 'id'>>({
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    excerpt: initial?.excerpt ?? '',
    content: initial?.content ?? '',
    image: initial?.image ?? '',
    author: initial?.author ?? 'Tim Sayur Kampung Pedalaman',
    isPublished: initial?.isPublished ?? false,
    publishedAt: initial?.publishedAt ?? today,
    createdAt: initial?.createdAt ?? today,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showImgModal, setShowImgModal] = useState(false);
  const [imgPosition, setImgPosition] = useState<'cursor' | 'start' | 'end'>('cursor');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const set = (field: keyof typeof form, value: string | boolean) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'title') next.slug = slugify(String(value));
      return next;
    });
    setErrors((e) => ({ ...e, [field]: '' }));
  };

  // Toolbar actions
  const insertAtCursor = (text: string) => {
    const ta = textareaRef.current;
    if (!ta) { set('content', form.content + '\n' + text); return; }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const before = form.content.slice(0, start);
    const after = form.content.slice(end);
    const newContent = before + text + after;
    set('content', newContent);
    // Restore cursor position after React re-render
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const insertHeading = (level: 2 | 3) => {
    const prefix = level === 2 ? '## ' : '### ';
    const ta = textareaRef.current;
    if (ta) {
      const start = ta.selectionStart;
      const lineStart = form.content.lastIndexOf('\n', start - 1) + 1;
      const before = form.content.slice(0, lineStart);
      const after = form.content.slice(lineStart);
      set('content', before + prefix + after);
      setTimeout(() => { ta.focus(); ta.setSelectionRange(lineStart + prefix.length, lineStart + prefix.length); }, 0);
    } else {
      insertAtCursor(prefix + 'Judul');
    }
  };

  const insertBold = () => {
    const ta = textareaRef.current;
    if (ta) {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = form.content.slice(start, end) || 'teks tebal';
      const before = form.content.slice(0, start);
      const after = form.content.slice(end);
      set('content', before + `**${selected}**` + after);
      setTimeout(() => { ta.focus(); ta.setSelectionRange(start + 2, start + 2 + selected.length); }, 0);
    }
  };

  const insertList = () => {
    insertAtCursor('\n- Item 1\n- Item 2\n- Item 3\n');
  };

  const handleImageInsert = (url: string, alt: string) => {
    const imgMarkdown = `\n![${alt}](${url})\n`;
    if (imgPosition === 'start') {
      set('content', imgMarkdown + form.content);
    } else if (imgPosition === 'end') {
      set('content', form.content + imgMarkdown);
    } else {
      insertAtCursor(imgMarkdown);
    }
    setShowImgModal(false);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Judul wajib diisi';
    if (!form.excerpt.trim()) e.excerpt = 'Ringkasan wajib diisi';
    if (!form.content.trim()) e.content = 'Konten wajib diisi';
    if (!form.image.trim()) e.image = 'URL gambar cover wajib diisi';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...form, id: initial?.id ?? Date.now() });
  };

  const inputCls = (field: string) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)] ${errors[field] ? 'border-red-400' : 'border-[var(--border)]'}`;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">Judul Artikel *</label>
          <input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Judul artikel..." className={inputCls('title')} />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">Slug (URL)</label>
            <input value={form.slug} onChange={(e) => set('slug', e.target.value)} className={inputCls('slug')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">Penulis</label>
            <input value={form.author} onChange={(e) => set('author', e.target.value)} className={inputCls('author')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">Tanggal Publish</label>
            <input type="date" value={form.publishedAt} onChange={(e) => set('publishedAt', e.target.value)} className={inputCls('publishedAt')} />
          </div>
          <div className="flex items-end gap-3 pb-1">
            <label className="text-sm font-medium text-[var(--text)]">Status</label>
            <button type="button" onClick={() => set('isPublished', !form.isPublished)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.isPublished ? 'bg-[var(--primary)]' : 'bg-gray-300'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.isPublished ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-semibold ${form.isPublished ? 'text-green-600' : 'text-gray-400'}`}>{form.isPublished ? 'Dipublish' : 'Draft'}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">URL Gambar Cover *</label>
          <input value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="https://images.unsplash.com/..." className={inputCls('image')} />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
          {form.image && (
            <div className="mt-2 rounded-lg overflow-hidden h-28 bg-[var(--bg-alt)]">
              <img src={form.image} alt="cover" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">Ringkasan (Excerpt) *</label>
          <textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={2} placeholder="Ringkasan singkat artikel..." className={`${inputCls('excerpt')} resize-none`} />
          {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-[var(--text)]">Konten Artikel *</label>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1 p-2 bg-[var(--bg-alt)] border border-[var(--border)] rounded-t-lg border-b-0">
            <button type="button" onClick={() => insertHeading(2)} title="Heading 2"
              className="px-2.5 py-1 text-xs font-bold bg-[var(--bg)] border border-[var(--border)] rounded hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-colors">H2</button>
            <button type="button" onClick={() => insertHeading(3)} title="Heading 3"
              className="px-2.5 py-1 text-xs font-bold bg-[var(--bg)] border border-[var(--border)] rounded hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-colors">H3</button>
            <button type="button" onClick={insertBold} title="Bold"
              className="px-2.5 py-1 text-xs font-bold bg-[var(--bg)] border border-[var(--border)] rounded hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-colors"><strong>B</strong></button>
            <button type="button" onClick={insertList} title="Daftar"
              className="px-2.5 py-1 text-xs bg-[var(--bg)] border border-[var(--border)] rounded hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-colors">≡ List</button>

            <div className="w-px h-5 bg-[var(--border)] mx-1" />

            {/* Image insert buttons */}
            <button type="button"
              onClick={() => { setImgPosition('start'); setShowImgModal(true); }}
              title="Sisipkan gambar di awal"
              className="px-2.5 py-1 text-xs bg-green-50 text-green-700 border border-green-200 rounded hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors flex items-center gap-1">
              🖼️ Awal
            </button>
            <button type="button"
              onClick={() => { setImgPosition('cursor'); setShowImgModal(true); }}
              title="Sisipkan gambar di posisi kursor"
              className="px-2.5 py-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors flex items-center gap-1">
              🖼️ Tengah
            </button>
            <button type="button"
              onClick={() => { setImgPosition('end'); setShowImgModal(true); }}
              title="Sisipkan gambar di akhir"
              className="px-2.5 py-1 text-xs bg-purple-50 text-purple-700 border border-purple-200 rounded hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors flex items-center gap-1">
              🖼️ Akhir
            </button>
          </div>

          <textarea
            ref={textareaRef}
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            rows={14}
            placeholder={`Tulis konten artikel di sini...\n\nFormat yang didukung:\n## Judul Besar\n### Judul Kecil\n**teks tebal**\n- item daftar\n![keterangan gambar](url-gambar)`}
            className={`${inputCls('content')} rounded-t-none font-mono text-xs leading-relaxed resize-y`}
          />
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
          <p className="text-xs text-[var(--muted)] mt-1">
            Format: <code className="bg-[var(--bg-alt)] px-1 rounded">## Heading</code> <code className="bg-[var(--bg-alt)] px-1 rounded">**tebal**</code> <code className="bg-[var(--bg-alt)] px-1 rounded">- list</code> <code className="bg-[var(--bg-alt)] px-1 rounded">![alt](url)</code> untuk gambar
          </p>
        </div>

        <div className="flex gap-3 pt-2 border-t border-[var(--border)]">
          <button type="button" onClick={onClose} className="flex-1 border border-[var(--border)] text-[var(--text)] py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--bg-alt)] transition-colors">Batal</button>
          <button type="submit" className="flex-1 bg-[var(--primary)] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[var(--primary-dark)] transition-colors">
            {initial ? 'Simpan Perubahan' : 'Publish Artikel'}
          </button>
        </div>
      </form>

      {showImgModal && (
        <ImageInsertModal
          onInsert={handleImageInsert}
          onClose={() => setShowImgModal(false)}
        />
      )}
    </>
  );
}

export function AdminBlog() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useAdminStore();
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [confirm, setConfirm] = useState<number | null>(null);

  const handleSave = (p: BlogPost) => {
    if (modal === 'edit') updateBlogPost(p);
    else addBlogPost(p);
    setModal(null);
    setSelected(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-display text-2xl text-[var(--text)] font-bold">Manajemen Blog</h1>
        <button onClick={() => { setSelected(null); setModal('add'); }}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors">
          + Tulis Artikel
        </button>
      </div>

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-5 flex gap-4">
            <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/80'; }} />
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-[var(--text)] mb-1 leading-tight">{post.title}</h3>
              <p className="text-xs text-[var(--muted)] mb-2">📅 {post.publishedAt} • ✍️ {post.author}</p>
              <p className="text-sm text-[var(--muted)] line-clamp-2">{post.excerpt}</p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end gap-2">
              <span className={`text-xs font-bold px-2 py-1 rounded ${post.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {post.isPublished ? 'Dipublish' : 'Draft'}
              </span>
              <div className="flex gap-2">
                <button onClick={() => { setSelected(post); setModal('edit'); }}
                  className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                  ✏️ Edit
                </button>
                <button onClick={() => setConfirm(post.id)}
                  className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
        {blogPosts.length === 0 && (
          <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-12 text-center">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-[var(--muted)]">Belum ada artikel. Mulai tulis artikel pertama Anda!</p>
          </div>
        )}
      </div>

      {modal && (
        <Modal title={modal === 'edit' ? `Edit: ${selected?.title}` : 'Tulis Artikel Baru'} onClose={() => { setModal(null); setSelected(null); }}>
          <BlogEditor initial={selected} onSave={handleSave} onClose={() => { setModal(null); setSelected(null); }} />
        </Modal>
      )}

      {confirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-[var(--bg)] rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="text-4xl text-center mb-3">⚠️</div>
            <h3 className="font-display text-lg font-bold text-[var(--text)] text-center mb-2">Hapus Artikel?</h3>
            <p className="text-sm text-[var(--muted)] text-center mb-5">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)} className="flex-1 border border-[var(--border)] text-[var(--text)] py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--bg-alt)] transition-colors">Batal</button>
              <button onClick={() => { deleteBlogPost(confirm); setConfirm(null); }} className="flex-1 bg-red-500 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Kategori ─────────────────────────────────────────────────────────────────
const emptyCategory = (): Omit<Category, 'id'> => ({ name: '', slug: '', description: '', icon: '🌿' });

function CategoryForm({ initial, onSave, onClose }: {
  initial: Category | null;
  onSave: (c: Category) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<Category, 'id'>>(initial ? { ...initial } : emptyCategory());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: keyof typeof form, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'name') next.slug = slugify(value);
      return next;
    });
    setErrors((e) => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nama wajib diisi';
    if (!form.icon.trim()) e.icon = 'Ikon wajib diisi';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...form, id: initial?.id ?? Date.now() });
  };

  const inputCls = (field: string) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)] ${errors[field] ? 'border-red-400' : 'border-[var(--border)]'}`;

  const commonIcons = ['🥬', '🌶️', '🍈', '🌿', '🫚', '🌾', '🥕', '🧅', '🧄', '🍄', '🌰', '🫛'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1">Ikon Kategori *</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {commonIcons.map((ic) => (
            <button key={ic} type="button" onClick={() => set('icon', ic)}
              className={`text-2xl p-2 rounded-lg border-2 transition-colors ${form.icon === ic ? 'border-[var(--primary)] bg-green-50' : 'border-[var(--border)] hover:border-[var(--primary)]'}`}>
              {ic}
            </button>
          ))}
        </div>
        <input value={form.icon} onChange={(e) => set('icon', e.target.value)} placeholder="Atau ketik emoji lain..."
          className={inputCls('icon')} />
        {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1">Nama Kategori *</label>
        <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Sayuran Segar" className={inputCls('name')} />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1">Slug (URL)</label>
        <input value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="sayuran-segar" className={inputCls('slug')} />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1">Deskripsi</label>
        <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={2}
          placeholder="Deskripsi singkat kategori..." className={`${inputCls('description')} resize-none`} />
      </div>

      <div className="flex gap-3 pt-2 border-t border-[var(--border)]">
        <button type="button" onClick={onClose} className="flex-1 border border-[var(--border)] text-[var(--text)] py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--bg-alt)] transition-colors">Batal</button>
        <button type="submit" className="flex-1 bg-[var(--primary)] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[var(--primary-dark)] transition-colors">
          {initial ? 'Simpan Perubahan' : 'Tambah Kategori'}
        </button>
      </div>
    </form>
  );
}

export function AdminKategori() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useAdminStore();
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [selected, setSelected] = useState<Category | null>(null);
  const [confirm, setConfirm] = useState<number | null>(null);

  const handleSave = (c: Category) => {
    if (modal === 'edit') updateCategory(c);
    else addCategory(c);
    setModal(null);
    setSelected(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-display text-2xl text-[var(--text)] font-bold">Manajemen Kategori</h1>
        <button onClick={() => { setSelected(null); setModal('add'); }}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors">
          + Tambah Kategori
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">{cat.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-[var(--text)]">{cat.name}</h3>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{cat.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-[var(--primary)] font-medium">
                    {products.filter((p) => p.categorySlug === cat.slug).length} produk
                  </span>
                  <span className="text-xs text-[var(--muted)]">/{cat.slug}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button onClick={() => { setSelected(cat); setModal('edit'); }}
                  className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                  ✏️ Edit
                </button>
                <button onClick={() => setConfirm(cat.id)}
                  className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                  🗑️ Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="sm:col-span-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl p-12 text-center">
            <div className="text-5xl mb-4">🏷️</div>
            <p className="text-[var(--muted)]">Belum ada kategori. Tambahkan kategori pertama!</p>
          </div>
        )}
      </div>

      {modal && (
        <Modal title={modal === 'edit' ? `Edit: ${selected?.name}` : 'Tambah Kategori Baru'} onClose={() => { setModal(null); setSelected(null); }}>
          <CategoryForm initial={selected} onSave={handleSave} onClose={() => { setModal(null); setSelected(null); }} />
        </Modal>
      )}

      {confirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-[var(--bg)] rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="text-4xl text-center mb-3">⚠️</div>
            <h3 className="font-display text-lg font-bold text-[var(--text)] text-center mb-2">Hapus Kategori?</h3>
            <p className="text-sm text-[var(--muted)] text-center mb-5">Produk dalam kategori ini tidak akan terhapus, hanya kategorinya saja.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)} className="flex-1 border border-[var(--border)] text-[var(--text)] py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--bg-alt)] transition-colors">Batal</button>
              <button onClick={() => { deleteCategory(confirm); setConfirm(null); }} className="flex-1 bg-red-500 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Pengaturan ───────────────────────────────────────────────────────────────
export function AdminPengaturan() {
  const [saved, setSaved] = useState(false);
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-[var(--text)] font-bold mb-6">Pengaturan Toko</h1>
      <form onSubmit={handleSave} className="space-y-6">
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
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" className="bg-[var(--primary)] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors">
            Simpan Pengaturan
          </button>
          {saved && <span className="text-green-600 text-sm font-medium">✅ Tersimpan!</span>}
        </div>
      </form>
    </div>
  );
}
