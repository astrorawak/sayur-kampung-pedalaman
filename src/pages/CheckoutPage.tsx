import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cart';
import { formatRupiah, getWhatsAppUrl } from '../lib/utils';

const SHIPPING_OPTIONS = [
  { id: 'jne_reg', label: 'JNE REG', price: 25000, est: '3-5 hari' },
  { id: 'jne_yes', label: 'JNE YES (Yakin Esok Sampai)', price: 45000, est: '1-2 hari' },
  { id: 'jnt_reg', label: 'J&T Express', price: 22000, est: '3-5 hari' },
  { id: 'sicepat', label: 'SiCepat REG', price: 20000, est: '3-5 hari' },
  { id: 'gosend', label: 'GoSend (Jabodetabek)', price: 15000, est: 'Hari ini' },
];

const PAYMENT_METHODS = [
  { id: 'bca', label: 'Transfer BCA', detail: '1234567890 a.n. Sayur Kampung Pedalaman' },
  { id: 'mandiri', label: 'Transfer Mandiri', detail: '0987654321 a.n. Sayur Kampung Pedalaman' },
  { id: 'bni', label: 'Transfer BNI', detail: '1122334455 a.n. Sayur Kampung Pedalaman' },
  { id: 'bri', label: 'Transfer BRI', detail: '5544332211 a.n. Sayur Kampung Pedalaman' },
  { id: 'gopay', label: 'GoPay', detail: '082358402290' },
  { id: 'ovo', label: 'OVO', detail: '082358402290' },
  { id: 'dana', label: 'DANA', detail: '082358402290' },
  { id: 'qris', label: 'QRIS', detail: 'Scan QR saat konfirmasi' },
];

export function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState(SHIPPING_OPTIONS[0]);
  const [payment, setPayment] = useState(PAYMENT_METHODS[0]);
  const [form, setForm] = useState({
    name: '', phone: '', address: '', rt_rw: '',
    kelurahan: '', kecamatan: '', city: '', province: '', postalCode: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="font-display text-3xl text-[var(--text)] mb-4">Keranjang Kosong</h1>
        <Link to="/toko" className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded font-semibold text-sm no-underline hover:bg-[var(--primary-dark)] transition-colors">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  const grandTotal = total() + shipping.price;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const orderItems = items.map((i) => `- ${i.product.name} ×${i.qty} = ${formatRupiah(i.product.price * i.qty)}`).join('\n');
    const message = `*PESANAN BARU - Sayur Kampung Pedalaman*\n\n*Pembeli:* ${form.name}\n*Telepon:* ${form.phone}\n*Alamat:* ${form.address}, RT/RW ${form.rt_rw}, Kel. ${form.kelurahan}, Kec. ${form.kecamatan}, ${form.city}, ${form.province} ${form.postalCode}\n\n*Produk:*\n${orderItems}\n\n*Subtotal:* ${formatRupiah(total())}\n*Ongkir (${shipping.label}):* ${formatRupiah(shipping.price)}\n*Total:* ${formatRupiah(grandTotal)}\n\n*Pembayaran:* ${payment.label}\n*Catatan:* ${form.notes || '-'}`;

    const waUrl = getWhatsAppUrl('082358402290', message);

    setTimeout(() => {
      clearCart();
      window.open(waUrl, '_blank');
      navigate('/sukses-pembayaran');
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl text-[var(--text)] mb-2">Checkout</h1>
      <p className="text-[var(--muted)] italic mb-8">Lengkapi data pengiriman dan pembayaran Anda</p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Data Pembeli */}
            <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6">
              <h2 className="font-display text-xl text-[var(--text)] mb-5">Data Pembeli</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">Nama Lengkap *</label>
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="Masukkan nama lengkap" className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">Nomor WhatsApp *</label>
                  <input required name="phone" value={form.phone} onChange={handleChange} placeholder="08xxxxxxxxxx" className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">RT/RW</label>
                  <input name="rt_rw" value={form.rt_rw} onChange={handleChange} placeholder="001/002" className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">Alamat Lengkap *</label>
                  <input required name="address" value={form.address} onChange={handleChange} placeholder="Nama jalan, nomor rumah, dll." className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">Kelurahan/Desa *</label>
                  <input required name="kelurahan" value={form.kelurahan} onChange={handleChange} className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">Kecamatan *</label>
                  <input required name="kecamatan" value={form.kecamatan} onChange={handleChange} className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">Kota/Kabupaten *</label>
                  <input required name="city" value={form.city} onChange={handleChange} className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">Provinsi *</label>
                  <input required name="province" value={form.province} onChange={handleChange} className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">Kode Pos</label>
                  <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="12345" className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">Catatan (opsional)</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Instruksi khusus, waktu pengiriman, dll." className="w-full border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm bg-[var(--bg)] focus:outline-none focus:border-[var(--primary)] resize-none" />
                </div>
              </div>
            </div>

            {/* Pengiriman */}
            <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6">
              <h2 className="font-display text-xl text-[var(--text)] mb-5">Metode Pengiriman</h2>
              <div className="space-y-3">
                {SHIPPING_OPTIONS.map((opt) => (
                  <label key={opt.id} className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${shipping.id === opt.id ? 'border-[var(--primary)] bg-green-50' : 'border-[var(--border)] hover:border-[var(--primary)]'}`}>
                    <input type="radio" name="shipping" checked={shipping.id === opt.id} onChange={() => setShipping(opt)} className="accent-[var(--primary)]" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-[var(--text)]">{opt.label}</div>
                      <div className="text-xs text-[var(--muted)]">Estimasi {opt.est}</div>
                    </div>
                    <div className="font-bold text-[var(--primary)]">{formatRupiah(opt.price)}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* Pembayaran */}
            <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6">
              <h2 className="font-display text-xl text-[var(--text)] mb-5">Metode Pembayaran</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((opt) => (
                  <label key={opt.id} className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${payment.id === opt.id ? 'border-[var(--primary)] bg-green-50' : 'border-[var(--border)] hover:border-[var(--primary)]'}`}>
                    <input type="radio" name="payment" checked={payment.id === opt.id} onChange={() => setPayment(opt)} className="accent-[var(--primary)] mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm text-[var(--text)]">{opt.label}</div>
                      <div className="text-xs text-[var(--muted)]">{opt.detail}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6 sticky top-24">
              <h2 className="font-display text-xl text-[var(--text)] mb-5">Ringkasan</h2>
              <div className="space-y-2 mb-4">
                {items.map(({ product, qty }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="text-[var(--muted)] truncate mr-2">{product.name} ×{qty}</span>
                    <span className="font-medium text-[var(--text)] flex-shrink-0">{formatRupiah(product.price * qty)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[var(--border)] pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm text-[var(--muted)]">
                  <span>Subtotal</span><span>{formatRupiah(total())}</span>
                </div>
                <div className="flex justify-between text-sm text-[var(--muted)]">
                  <span>Ongkos Kirim</span><span>{formatRupiah(shipping.price)}</span>
                </div>
                <div className="flex justify-between font-bold text-[var(--text)] text-lg pt-2 border-t border-[var(--border)]">
                  <span>Total</span>
                  <span className="text-[var(--primary)]">{formatRupiah(grandTotal)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[var(--primary)] text-white py-3.5 rounded-lg font-bold hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Memproses...</>
                ) : (
                  <>📱 Konfirmasi via WhatsApp</>
                )}
              </button>
              <p className="text-xs text-[var(--muted)] text-center mt-3">
                Pesanan akan dikonfirmasi via WhatsApp. Pembayaran dilakukan setelah konfirmasi.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
