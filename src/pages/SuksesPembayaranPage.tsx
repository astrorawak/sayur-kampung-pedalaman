
import { Link } from 'react-router-dom';
import { getWhatsAppUrl } from '../lib/utils';

export function SuksesPembayaranPage() {
  const waUrl = getWhatsAppUrl('082358402290', 'Halo, saya sudah melakukan pemesanan dan ingin mengkonfirmasi pembayaran.');

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-7xl mb-6 animate-bounce">🎉</div>
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">✅</span>
      </div>
      <h1 className="font-display text-3xl md:text-4xl text-[var(--text)] font-bold mb-4">
        Pesanan Berhasil Dibuat!
      </h1>
      <p className="text-[var(--muted)] text-lg mb-8 leading-relaxed">
        Terima kasih telah berbelanja di <strong>Sayur Kampung Pedalaman</strong>. 
        Pesanan Anda sedang kami proses. Tim kami akan segera menghubungi Anda via WhatsApp untuk konfirmasi pembayaran.
      </p>

      <div className="bg-[var(--bg-alt)] border border-[var(--border)] rounded-2xl p-6 mb-8 text-left">
        <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-4">Langkah Selanjutnya:</h2>
        <div className="space-y-4">
          {[
            { step: '1', icon: '📱', title: 'Cek WhatsApp Anda', desc: 'Kami akan mengirim detail pesanan dan nomor rekening pembayaran via WhatsApp.' },
            { step: '2', icon: '💳', title: 'Lakukan Pembayaran', desc: 'Transfer sesuai total yang tertera ke rekening/e-wallet yang diberikan.' },
            { step: '3', icon: '📸', title: 'Kirim Bukti Transfer', desc: 'Foto/screenshot bukti pembayaran dan kirim ke WhatsApp kami.' },
            { step: '4', icon: '📦', title: 'Pesanan Diproses', desc: 'Setelah pembayaran dikonfirmasi, pesanan Anda akan segera dikemas dan dikirim.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {item.step}
              </div>
              <div>
                <div className="font-semibold text-[var(--text)] text-sm">{item.icon} {item.title}</div>
                <div className="text-xs text-[var(--muted)] mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-7 py-3.5 rounded-lg font-bold no-underline hover:bg-green-700 transition-colors"
        >
          📱 Hubungi via WhatsApp
        </a>
        <Link
          to="/toko"
          className="inline-flex items-center justify-center gap-2 border-2 border-[var(--primary)] text-[var(--primary)] px-7 py-3.5 rounded-lg font-bold no-underline hover:bg-[var(--primary)] hover:text-white transition-colors"
        >
          🌿 Belanja Lagi
        </Link>
      </div>
    </div>
  );
}
