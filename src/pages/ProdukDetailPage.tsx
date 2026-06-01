import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatRupiah } from '../lib/utils';
import { useCartStore } from '../store/cart';
import { useAdminStore } from '../store/adminStore';

export function ProdukDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const { products } = useAdminStore();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">🌿</div>
        <h1 className="font-display text-3xl text-[var(--text)] mb-4">Produk Tidak Ditemukan</h1>
        <p className="text-[var(--muted)] mb-8">Produk yang Anda cari tidak tersedia atau sudah habis.</p>
        <Link to="/toko" className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded font-semibold text-sm no-underline hover:bg-[var(--primary-dark)] transition-colors">
          ← Kembali ke Toko
        </Link>
      </div>
    );
  }

  const related = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, qty);
    navigate('/keranjang');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--muted)] mb-8">
        <Link to="/" className="no-underline hover:text-[var(--primary)]">Beranda</Link>
        <span>/</span>
        <Link to="/toko" className="no-underline hover:text-[var(--primary)]">Toko</Link>
        <span>/</span>
        <span className="text-[var(--text)]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover rounded-2xl shadow-lg"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-[var(--accent)] text-[var(--text)] font-bold px-3 py-1.5 rounded text-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-[var(--muted)] mb-2">{product.category}</p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--text)] font-bold mb-4">{product.name}</h1>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="font-bold text-[var(--primary)] text-3xl">{formatRupiah(product.price)}</span>
            <span className="text-[var(--muted)]">/{product.unit}</span>
          </div>

          <div className="bg-[var(--bg-alt)] rounded-xl p-4 mb-6 space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-[var(--muted)] w-24">Asal</span>
              <span className="font-medium text-[var(--text)]">📍 {product.origin}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-[var(--muted)] w-24">Stok</span>
              <span className={`font-medium ${product.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                {product.stock > 0 ? `${product.stock} ${product.unit} tersedia` : 'Habis'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-[var(--muted)] w-24">Satuan</span>
              <span className="font-medium text-[var(--text)]">{product.unit}</span>
            </div>
          </div>

          <p className="text-[var(--text)] leading-relaxed mb-8">{product.description}</p>

          {/* Qty & Add to Cart */}
          {product.stock > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[var(--text)]">Jumlah:</span>
                <div className="flex items-center border border-[var(--border)] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold text-[var(--text)] border-x border-[var(--border)]">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    className="px-4 py-2 text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => addItem(product, qty)}
                  className="flex-1 border-2 border-[var(--primary)] text-[var(--primary)] py-3 rounded-lg font-bold hover:bg-[var(--primary)] hover:text-white transition-colors"
                >
                  + Tambah ke Keranjang
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[var(--primary)] text-white py-3 rounded-lg font-bold hover:bg-[var(--primary-dark)] transition-colors"
                >
                  Beli Sekarang
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-red-600 font-semibold">Stok Habis</p>
              <p className="text-red-500 text-sm mt-1">Produk ini sedang tidak tersedia. Hubungi kami untuk pre-order.</p>
            </div>
          )}

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { icon: '🌱', label: 'Organik' },
              { icon: '🚚', label: 'Dikirim Segar' },
              { icon: '💚', label: 'Ramah Lingkungan' },
            ].map((b) => (
              <div key={b.label} className="text-center p-3 bg-[var(--bg-alt)] rounded-lg">
                <div className="text-xl mb-1">{b.icon}</div>
                <div className="text-xs font-medium text-[var(--muted)]">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="font-display text-2xl text-[var(--text)] mb-6">Produk Serupa</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/produk/${p.slug}`}
                className="bg-[var(--bg)] border border-[var(--border)] rounded-xl overflow-hidden no-underline hover:shadow-md transition-shadow group"
              >
                <img src={p.image} alt={p.name} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-3">
                  <h3 className="font-display text-sm font-semibold text-[var(--text)] mb-1 leading-tight">{p.name}</h3>
                  <p className="font-bold text-[var(--primary)] text-sm">{formatRupiah(p.price)}<span className="font-normal text-[var(--muted)] text-xs">/{p.unit}</span></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
