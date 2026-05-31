import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/cart';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/toko', label: 'Belanja' },
  { href: '/pengiriman', label: 'Info Pengiriman' },
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/blog', label: 'Blog' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? 'bg-[var(--bg)] border-b border-[var(--border)] shadow-sm'
            : 'bg-[var(--bg)]/95 backdrop-blur-sm border-b border-[var(--border-light)]'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 no-underline">
              <div className="w-9 h-9 bg-[var(--primary)] rounded flex items-center justify-center text-white text-lg shadow-sm">
                🌿
              </div>
              <div>
                <div className="font-display text-base font-bold text-[var(--text)] leading-tight">
                  Sayur Kampung
                </div>
                <div className="text-[10px] text-[var(--muted)] italic leading-tight font-body">
                  Rempah & Sayuran Asli Kalimantan
                </div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 text-sm rounded transition-colors no-underline
                    ${location.pathname === link.href
                      ? 'text-[var(--primary)] font-semibold'
                      : 'text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to="/keranjang"
                className="relative flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded text-sm font-semibold no-underline hover:bg-[var(--primary-dark)] transition-colors shadow-sm"
              >
                🛒
                <span className="hidden sm:inline">Keranjang</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-[var(--text)] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              <button
                className="md:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[var(--bg)] border-t border-[var(--border)] py-3 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block py-3 text-sm border-b border-[var(--border-light)] last:border-0 no-underline
                  ${location.pathname === link.href
                    ? 'text-[var(--primary)] font-semibold'
                    : 'text-[var(--text)]'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>
      <div className="h-16" />
    </>
  );
};
