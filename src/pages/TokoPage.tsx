import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { formatRupiah } from '../lib/utils';
import { useCartStore } from '../store/cart';

export function TokoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const addItem = useCartStore((s) => s.addItem);
  const activeCategory = searchParams.get('kategori') || 'semua';

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.isActive);
    if (activeCategory !== 'semua') {
      list = list.filter((p) => p.categorySlug === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [activeCategory, search, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl text-[var(--text)] mb-2">Toko Kami</h1>
        <p className="text-[var(--muted)] italic">Sayur, rempah, dan herbal asli pedalaman Kalimantan</p>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
        >
          <option value="default">Urutan Default</option>
          <option value="price-asc">Harga: Terendah</option>
          <option value="price-desc">Harga: Tertinggi</option>
          <option value="name">Nama A–Z</option>
        </select>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSearchParams({})}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeCategory === 'semua'
              ? 'bg-[var(--primary)] text-white'
              : 'bg-[var(--bg-alt)] text-[var(--muted)] hover:text-[var(--text)] border border-[var(--border)]'
          }`}
        >
          Semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSearchParams({ kategori: cat.slug })}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeCategory === cat.slug
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--bg-alt)] text-[var(--muted)] hover:text-[var(--text)] border border-[var(--border)]'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-[var(--muted)] mb-6">
        Menampilkan <strong>{filtered.length}</strong> produk
      </p>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="font-display text-xl text-[var(--text)] mb-2">Produk Tidak Ditemukan</h3>
          <p className="text-[var(--muted)] text-sm">Coba kata kunci atau kategori yang berbeda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-[var(--bg)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[var(--accent)] text-[var(--text)] text-xs font-bold px-2 py-1 rounded">
                    {product.badge}
                  </span>
                )}
                {product.stock < 10 && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Stok Terbatas
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-[var(--muted)] mb-1">{product.category}</p>
                <h3 className="font-display font-semibold text-[var(--text)] mb-1 leading-tight">{product.name}</h3>
                <p className="text-xs text-[var(--muted)] mb-1">📍 {product.origin}</p>
                <p className="text-xs text-[var(--muted)] mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-bold text-[var(--primary)] text-lg">{formatRupiah(product.price)}</span>
                    <span className="text-xs text-[var(--muted)] ml-1">/{product.unit}</span>
                  </div>
                  <span className="text-xs text-[var(--muted)]">Stok: {product.stock}</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/produk/${product.slug}`}
                    className="flex-1 text-center border border-[var(--primary)] text-[var(--primary)] py-2 rounded text-xs font-semibold no-underline hover:bg-[var(--primary)] hover:text-white transition-colors"
                  >
                    Detail
                  </Link>
                  <button
                    onClick={() => addItem(product)}
                    disabled={product.stock === 0}
                    className="flex-1 bg-[var(--primary)] text-white py-2 rounded text-xs font-semibold hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    + Keranjang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
