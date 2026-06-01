
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cart';
import { formatRupiah } from '../lib/utils';

export function KeranjangPage() {
  const { items, removeItem, updateQty, total, totalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="font-display text-3xl text-[var(--text)] mb-4">Keranjang Kosong</h1>
        <p className="text-[var(--muted)] mb-8 italic">Belum ada produk di keranjang Anda. Yuk mulai belanja!</p>
        <Link
          to="/toko"
          className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-7 py-3 rounded font-semibold text-sm no-underline hover:bg-[var(--primary-dark)] transition-colors"
        >
          🌿 Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl text-[var(--text)] mb-2">Keranjang Belanja</h1>
      <p className="text-[var(--muted)] italic mb-8">{totalItems()} produk dalam keranjang Anda</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-4 flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-[var(--text)] leading-tight mb-1">{product.name}</h3>
                <p className="text-xs text-[var(--muted)] mb-2">📍 {product.origin}</p>
                <p className="font-bold text-[var(--primary)]">{formatRupiah(product.price)}<span className="font-normal text-[var(--muted)] text-xs">/{product.unit}</span></p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-red-400 hover:text-red-600 text-sm transition-colors"
                  title="Hapus"
                >
                  ✕
                </button>
                <div className="flex items-center border border-[var(--border)] rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQty(product.id, qty - 1)}
                    className="px-3 py-1 text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors font-bold text-sm"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 font-semibold text-[var(--text)] text-sm border-x border-[var(--border)]">{qty}</span>
                  <button
                    onClick={() => updateQty(product.id, qty + 1)}
                    className="px-3 py-1 text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors font-bold text-sm"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold text-[var(--text)] text-sm">{formatRupiah(product.price * qty)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6 sticky top-24">
            <h2 className="font-display text-xl text-[var(--text)] mb-6">Ringkasan Pesanan</h2>
            <div className="space-y-3 mb-6">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="text-[var(--muted)] truncate mr-2">{product.name} ×{qty}</span>
                  <span className="font-medium text-[var(--text)] flex-shrink-0">{formatRupiah(product.price * qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--border)] pt-4 mb-6">
              <div className="flex justify-between text-sm text-[var(--muted)] mb-2">
                <span>Subtotal</span>
                <span>{formatRupiah(total())}</span>
              </div>
              <div className="flex justify-between text-sm text-[var(--muted)] mb-2">
                <span>Ongkos Kirim</span>
                <span className="text-green-600">Dihitung saat checkout</span>
              </div>
              <div className="flex justify-between font-bold text-[var(--text)] text-lg mt-3">
                <span>Total</span>
                <span className="text-[var(--primary)]">{formatRupiah(total())}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full text-center bg-[var(--primary)] text-white py-3.5 rounded-lg font-bold no-underline hover:bg-[var(--primary-dark)] transition-colors"
            >
              Lanjut ke Checkout →
            </Link>
            <Link
              to="/toko"
              className="block w-full text-center border border-[var(--border)] text-[var(--muted)] py-3 rounded-lg text-sm no-underline hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors mt-3"
            >
              ← Lanjut Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
