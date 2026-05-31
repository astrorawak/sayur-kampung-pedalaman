import React from 'react';
import { Link } from 'react-router-dom';
import { getWhatsAppUrl } from '../../lib/utils';

export const Footer: React.FC = () => {
  const waUrl = getWhatsAppUrl('082358402290', 'Halo, saya ingin bertanya tentang produk Sayur Kampung Pedalaman.');

  return (
    <footer className="bg-[var(--text)] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[var(--primary)] rounded flex items-center justify-center text-xl">
                🌿
              </div>
              <div>
                <div className="font-display text-lg font-bold">Sayur Kampung Pedalaman</div>
                <div className="text-xs text-gray-400 italic">Rempah & Sayuran Asli Kalimantan</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-sm">
              Kami menjembatani petani lokal di pedalaman Kalimantan dengan Anda. Setiap produk yang kami kirim membawa cerita, budaya, dan kerja keras masyarakat Dayak.
            </p>
            <div className="flex gap-3">
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-xs font-semibold no-underline transition-colors inline-flex items-center gap-2">
                📱 WhatsApp Kami
              </a>
              <a href="mailto:astrorawak@gmail.com"
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-4 py-2 rounded text-xs font-semibold no-underline transition-colors inline-flex items-center gap-2">
                ✉️ Email
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-base mb-4 text-[var(--accent-light)]">Navigasi</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/toko', label: 'Belanja Produk' },
                { href: '/pengiriman', label: 'Info Pengiriman' },
                { href: '/tentang', label: 'Tentang Kami' },
                { href: '/faq', label: 'FAQ' },
                { href: '/blog', label: 'Blog' },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-400 hover:text-white text-sm no-underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base mb-4 text-[var(--accent-light)]">Kontak</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2"><span>📱</span><span>082358402290<br /><span className="text-xs">(WhatsApp aktif)</span></span></li>
              <li className="flex items-start gap-2"><span>✉️</span><span>astrorawak@gmail.com</span></li>
              <li className="flex items-start gap-2"><span>🕐</span><span>Senin–Sabtu<br />08.00–17.00 WITA</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Sayur Kampung Pedalaman. Hak cipta dilindungi.</p>
          <p className="italic">Dibuat dengan ❤️ untuk petani lokal Kalimantan</p>
        </div>
      </div>
    </footer>
  );
};
