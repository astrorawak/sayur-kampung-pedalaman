import { useState } from 'react';
import { getWhatsAppUrl } from '../lib/utils';

export function TentangPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="text-6xl mb-4">🌿</div>
        <h1 className="font-display text-4xl text-[var(--text)] font-bold mb-4">Tentang Kami</h1>
        <p className="text-[var(--muted)] italic text-lg max-w-xl mx-auto">
          Menjembatani kekayaan alam pedalaman Kalimantan dengan meja makan Anda
        </p>
      </div>

      {/* Story */}
      <div className="bg-[var(--bg-alt)] border border-[var(--border)] rounded-2xl p-8 mb-10">
        <h2 className="font-display text-2xl text-[var(--text)] font-bold mb-4">Cerita Kami</h2>
        <div className="space-y-4 text-[var(--text)] leading-relaxed">
          <p>
            <strong>Sayur Kampung Pedalaman</strong> lahir dari kecintaan kami terhadap kekayaan alam Kalimantan dan kepedulian terhadap kesejahteraan petani lokal. Kami memulai perjalanan ini dengan keyakinan bahwa produk-produk alami dari pedalaman Borneo layak untuk dinikmati oleh seluruh masyarakat Indonesia.
          </p>
          <p>
            Kami bermitra langsung dengan petani dan masyarakat adat Dayak di berbagai pelosok Kalimantan — dari Kapuas Hulu di Kalimantan Barat, hingga pedalaman Mahakam di Kalimantan Timur. Setiap produk yang kami jual membawa cerita, budaya, dan kerja keras mereka.
          </p>
          <p>
            Dengan sistem rantai pasokan yang pendek, kami memastikan bahwa petani mendapatkan harga yang adil, sementara Anda mendapatkan produk yang benar-benar segar dan berkualitas tinggi.
          </p>
        </div>
      </div>

      {/* Values */}
      <h2 className="font-display text-2xl text-[var(--text)] font-bold mb-6">Nilai-Nilai Kami</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { icon: '🌱', title: 'Keberlanjutan', desc: 'Kami mendukung praktik pertanian berkelanjutan yang menjaga kelestarian hutan dan lingkungan Kalimantan.' },
          { icon: '🤝', title: 'Keadilan', desc: 'Kami memastikan petani lokal mendapatkan harga yang adil dan layak untuk hasil kerja keras mereka.' },
          { icon: '💚', title: 'Keaslian', desc: 'Semua produk kami 100% alami, tanpa bahan pengawet atau pestisida kimia berbahaya.' },
        ].map((v) => (
          <div key={v.title} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">{v.icon}</div>
            <h3 className="font-display font-semibold text-[var(--text)] mb-2">{v.title}</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white rounded-2xl p-8 text-center">
        <h2 className="font-display text-2xl font-bold mb-3">Hubungi Kami</h2>
        <p className="text-white/80 mb-6">Ada pertanyaan? Kami siap membantu Anda.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={getWhatsAppUrl('082358402290', 'Halo, saya ingin bertanya tentang Sayur Kampung Pedalaman.')} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-bold no-underline hover:bg-green-600 transition-colors">
            📱 WhatsApp
          </a>
          <a href="mailto:astrorawak@gmail.com"
            className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-lg font-bold no-underline hover:bg-white/30 transition-colors border border-white/30">
            ✉️ Email
          </a>
        </div>
      </div>
    </div>
  );
}

export function PengirimanPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🚚</div>
        <h1 className="font-display text-4xl text-[var(--text)] font-bold mb-3">Info Pengiriman</h1>
        <p className="text-[var(--muted)] italic">Semua yang perlu Anda ketahui tentang pengiriman pesanan</p>
      </div>

      <div className="space-y-6">
        {/* Jangkauan */}
        <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6">
          <h2 className="font-display text-xl text-[var(--text)] font-semibold mb-4">🗺️ Jangkauan Pengiriman</h2>
          <p className="text-[var(--text)] leading-relaxed">
            Kami mengirim ke <strong>seluruh wilayah Indonesia</strong> melalui berbagai ekspedisi terpercaya. Untuk wilayah Jabodetabek, tersedia layanan pengiriman hari yang sama (same-day delivery) via GoSend.
          </p>
        </div>

        {/* Ekspedisi */}
        <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6">
          <h2 className="font-display text-xl text-[var(--text)] font-semibold mb-4">📦 Ekspedisi yang Tersedia</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-2 pr-4 font-semibold text-[var(--text)]">Ekspedisi</th>
                  <th className="text-left py-2 pr-4 font-semibold text-[var(--text)]">Layanan</th>
                  <th className="text-left py-2 pr-4 font-semibold text-[var(--text)]">Estimasi</th>
                  <th className="text-left py-2 font-semibold text-[var(--text)]">Harga</th>
                </tr>
              </thead>
              <tbody className="text-[var(--muted)]">
                {[
                  ['JNE', 'REG', '3-5 hari kerja', 'Mulai Rp 25.000'],
                  ['JNE', 'YES (Yakin Esok Sampai)', '1-2 hari kerja', 'Mulai Rp 45.000'],
                  ['J&T Express', 'REG', '3-5 hari kerja', 'Mulai Rp 22.000'],
                  ['SiCepat', 'REG', '3-5 hari kerja', 'Mulai Rp 20.000'],
                  ['GoSend', 'Same Day (Jabodetabek)', 'Hari ini', 'Mulai Rp 15.000'],
                ].map(([exp, svc, est, price], i) => (
                  <tr key={i} className="border-b border-[var(--border-light)]">
                    <td className="py-2.5 pr-4 font-medium text-[var(--text)]">{exp}</td>
                    <td className="py-2.5 pr-4">{svc}</td>
                    <td className="py-2.5 pr-4">{est}</td>
                    <td className="py-2.5">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pengemasan */}
        <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6">
          <h2 className="font-display text-xl text-[var(--text)] font-semibold mb-4">❄️ Pengemasan Khusus</h2>
          <p className="text-[var(--text)] leading-relaxed mb-4">
            Produk segar kami dikemas dengan metode khusus untuk menjaga kualitas selama pengiriman:
          </p>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li className="flex items-start gap-2"><span className="text-[var(--primary)] mt-0.5">✓</span><span>Dibungkus dengan kertas koran untuk menjaga kelembaban</span></li>
            <li className="flex items-start gap-2"><span className="text-[var(--primary)] mt-0.5">✓</span><span>Dikemas dalam styrofoam box dengan es batu/gel pack untuk produk yang memerlukan pendinginan</span></li>
            <li className="flex items-start gap-2"><span className="text-[var(--primary)] mt-0.5">✓</span><span>Lapisan plastik kedap udara untuk mencegah kontaminasi</span></li>
            <li className="flex items-start gap-2"><span className="text-[var(--primary)] mt-0.5">✓</span><span>Label "FRAGILE" dan "THIS SIDE UP" untuk penanganan yang tepat</span></li>
          </ul>
        </div>

        {/* Catatan */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="font-display text-xl text-amber-800 font-semibold mb-4">⚠️ Catatan Penting</h2>
          <ul className="space-y-2 text-sm text-amber-700">
            <li>• Pesanan diproses setelah pembayaran dikonfirmasi (hari kerja, Senin–Sabtu)</li>
            <li>• Pengiriman dilakukan setiap hari Senin, Rabu, dan Jumat</li>
            <li>• Kami tidak bertanggung jawab atas keterlambatan yang disebabkan oleh pihak ekspedisi</li>
            <li>• Segera hubungi kami jika produk tiba dalam kondisi rusak atau tidak sesuai</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Apakah produk Anda benar-benar organik?',
      a: 'Ya, semua produk kami ditanam secara alami tanpa menggunakan pestisida kimia atau pupuk sintetis. Kami bermitra langsung dengan petani lokal Dayak yang menggunakan metode pertanian tradisional yang ramah lingkungan.',
    },
    {
      q: 'Berapa lama produk segar bisa bertahan setelah diterima?',
      a: 'Tergantung jenis produknya. Sayuran segar biasanya bertahan 3-7 hari jika disimpan di kulkas. Rempah-rempah segar bisa bertahan 1-2 minggu. Produk kering dan herbal bisa bertahan hingga beberapa bulan jika disimpan dengan benar.',
    },
    {
      q: 'Bagaimana cara melakukan pemesanan?',
      a: 'Anda bisa memesan melalui website kami. Pilih produk, tambahkan ke keranjang, isi data pengiriman, pilih metode pembayaran, lalu konfirmasi pesanan via WhatsApp. Tim kami akan segera memproses pesanan Anda.',
    },
    {
      q: 'Metode pembayaran apa saja yang tersedia?',
      a: 'Kami menerima transfer bank (BCA, Mandiri, BNI, BRI) dan e-wallet (GoPay, OVO, DANA, ShopeePay, QRIS). Pembayaran dilakukan setelah pesanan dikonfirmasi oleh tim kami.',
    },
    {
      q: 'Apakah bisa melakukan pemesanan dalam jumlah besar (wholesale)?',
      a: 'Tentu! Kami melayani pemesanan dalam jumlah besar untuk restoran, hotel, katering, dan bisnis kuliner lainnya. Hubungi kami via WhatsApp untuk mendapatkan penawaran harga khusus.',
    },
    {
      q: 'Bagaimana jika produk yang diterima rusak atau tidak sesuai?',
      a: 'Kami memberikan garansi kepuasan 100%. Jika produk yang Anda terima rusak atau tidak sesuai dengan pesanan, segera hubungi kami dalam 24 jam setelah penerimaan dengan menyertakan foto produk. Kami akan memberikan penggantian atau refund.',
    },
    {
      q: 'Apakah ada minimum pembelian?',
      a: 'Tidak ada minimum pembelian untuk pengiriman dalam kota. Untuk pengiriman luar kota, minimum pembelian adalah Rp 100.000 agar produk tetap segar saat tiba di tujuan.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">❓</div>
        <h1 className="font-display text-4xl text-[var(--text)] font-bold mb-3">FAQ</h1>
        <p className="text-[var(--muted)] italic">Pertanyaan yang sering ditanyakan</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--bg-alt)] transition-colors"
            >
              <span className="font-semibold text-[var(--text)] pr-4">{faq.q}</span>
              <span className={`text-[var(--primary)] text-xl flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 text-sm text-[var(--muted)] leading-relaxed border-t border-[var(--border-light)]">
                <p className="pt-4">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center bg-[var(--bg-alt)] border border-[var(--border)] rounded-2xl p-8">
        <h3 className="font-display text-xl text-[var(--text)] font-semibold mb-3">Masih Ada Pertanyaan?</h3>
        <p className="text-[var(--muted)] text-sm mb-5">Tim kami siap membantu Anda setiap hari Senin–Sabtu, 08.00–17.00 WITA.</p>
        <a
          href={getWhatsAppUrl('082358402290', 'Halo, saya memiliki pertanyaan tentang Sayur Kampung Pedalaman.')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold no-underline hover:bg-green-700 transition-colors"
        >
          📱 Chat via WhatsApp
        </a>
      </div>
    </div>
  );
}
