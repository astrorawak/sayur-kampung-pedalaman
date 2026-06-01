
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { formatRupiah } from '../lib/utils';
import { useCartStore } from '../store/cart';

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[#7aaa3e] text-white py-20 md:py-28">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-9xl">🌿</div>
        <div className="absolute bottom-10 right-10 text-9xl">🌶️</div>
        <div className="absolute top-1/2 left-1/3 text-7xl">🥬</div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>🌱</span>
            <span>Langsung dari Pedalaman Kalimantan</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Sayur & Rempah
            <span className="block italic text-[var(--accent-light)]">Asli Borneo</span>
          </h1>
          <p className="text-white/85 text-lg leading-relaxed mb-8 max-w-xl">
            Dipetik segar dari kebun dan hutan pedalaman Kalimantan. Kami menjembatani petani lokal Dayak dengan meja makan Anda — segar, alami, dan penuh cerita.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/toko"
              className="inline-flex items-center gap-2 bg-[var(--accent)] text-[var(--text)] px-7 py-3.5 rounded font-bold text-sm no-underline hover:bg-[var(--accent-light)] transition-colors shadow-lg"
            >
              🛒 Belanja Sekarang
            </Link>
            <Link
              to="/tentang"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-7 py-3.5 rounded font-semibold text-sm no-underline hover:bg-white/30 transition-colors border border-white/30"
            >
              Tentang Kami →
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 mt-10 text-sm text-white/80">
            <div className="flex items-center gap-2"><span>✅</span><span>Organik & Alami</span></div>
            <div className="flex items-center gap-2"><span>🚚</span><span>Pengiriman ke Seluruh Indonesia</span></div>
            <div className="flex items-center gap-2"><span>🤝</span><span>Mendukung Petani Lokal</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section className="py-16 bg-[var(--bg-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl text-[var(--text)] mb-3">Kategori Produk</h2>
          <p className="text-[var(--muted)] italic">Temukan berbagai produk segar dari pedalaman Kalimantan</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/toko?kategori=${cat.slug}`}
              className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6 text-center no-underline hover:border-[var(--primary)] hover:shadow-md transition-all group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">{cat.icon}</div>
              <h3 className="font-display text-base font-semibold text-[var(--text)] mb-1">{cat.name}</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const addItem = useCartStore((s) => s.addItem);
  const featured = products.filter((p) => p.badge).slice(0, 4);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl text-[var(--text)] mb-2">Produk Unggulan</h2>
            <p className="text-[var(--muted)] italic">Pilihan terbaik dari pedalaman Kalimantan</p>
          </div>
          <Link to="/toko" className="text-[var(--primary)] font-semibold text-sm no-underline hover:underline hidden md:block">
            Lihat Semua →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <div key={product.id} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
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
              </div>
              <div className="p-4">
                <p className="text-xs text-[var(--muted)] mb-1">{product.category}</p>
                <h3 className="font-display font-semibold text-[var(--text)] mb-1 leading-tight">{product.name}</h3>
                <p className="text-xs text-[var(--muted)] mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[var(--primary)] text-lg">{formatRupiah(product.price)}</span>
                    <span className="text-xs text-[var(--muted)] ml-1">/{product.unit}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Link
                    to={`/produk/${product.slug}`}
                    className="flex-1 text-center border border-[var(--primary)] text-[var(--primary)] py-2 rounded text-xs font-semibold no-underline hover:bg-[var(--primary)] hover:text-white transition-colors"
                  >
                    Detail
                  </Link>
                  <button
                    onClick={() => addItem(product)}
                    className="flex-1 bg-[var(--primary)] text-white py-2 rounded text-xs font-semibold hover:bg-[var(--primary-dark)] transition-colors"
                  >
                    + Keranjang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 md:hidden">
          <Link to="/toko" className="inline-flex items-center gap-2 border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded font-semibold text-sm no-underline hover:bg-[var(--primary)] hover:text-white transition-colors">
            Lihat Semua Produk →
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const features = [
    { icon: '🌱', title: 'Organik & Alami', desc: 'Semua produk ditanam tanpa pestisida kimia. Murni alami dari alam Kalimantan.' },
    { icon: '🚜', title: 'Langsung dari Petani', desc: 'Kami bermitra langsung dengan petani lokal Dayak. Tidak ada perantara berlebihan.' },
    { icon: '❄️', title: 'Dikemas Segar', desc: 'Setiap pesanan dikemas dengan es batu dan insulasi khusus agar tetap segar saat tiba.' },
    { icon: '🚚', title: 'Pengiriman Cepat', desc: 'Pengiriman ke seluruh Indonesia via ekspedisi terpercaya. Estimasi 2-5 hari kerja.' },
    { icon: '💚', title: 'Ramah Lingkungan', desc: 'Kemasan kami menggunakan bahan daur ulang dan ramah lingkungan.' },
    { icon: '🤝', title: 'Mendukung Lokal', desc: 'Setiap pembelian Anda membantu meningkatkan kesejahteraan petani pedalaman Kalimantan.' },
  ];

  return (
    <section className="py-16 bg-[var(--bg-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl text-[var(--text)] mb-3">Mengapa Memilih Kami?</h2>
          <p className="text-[var(--muted)] italic max-w-xl mx-auto">
            Kami bukan sekadar toko online. Kami adalah jembatan antara kekayaan alam Kalimantan dengan kebutuhan Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-display font-semibold text-[var(--text)] mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  const testimonials = [
    { name: 'Ibu Ratna, Jakarta', text: 'Pakis hutannya segar banget! Rasanya beda sama yang di pasar. Langsung pesan lagi minggu depan.', rating: 5 },
    { name: 'Pak Budi, Surabaya', text: 'Jahe merahnya mantap, aroma dan rasanya kuat. Cocok buat bikin minuman kesehatan keluarga.', rating: 5 },
    { name: 'Mbak Sari, Bandung', text: 'Pengirimannya cepat dan kemasannya rapi. Sayurannya masih segar waktu sampai. Recommended!', rating: 5 },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl text-[var(--text)] mb-3">Kata Pelanggan Kami</h2>
          <p className="text-[var(--muted)] italic">Kepuasan pelanggan adalah prioritas utama kami</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-[var(--accent)] text-lg">★</span>
                ))}
              </div>
              <p className="text-[var(--text)] text-sm leading-relaxed italic mb-4">"{t.text}"</p>
              <p className="font-semibold text-[var(--primary)] text-sm">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Siap Merasakan Kesegaran Kalimantan?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Pesan sekarang dan nikmati sayuran serta rempah asli pedalaman Borneo di meja makan Anda.
        </p>
        <Link
          to="/toko"
          className="inline-flex items-center gap-2 bg-[var(--accent)] text-[var(--text)] px-8 py-4 rounded font-bold text-base no-underline hover:bg-[var(--accent-light)] transition-colors shadow-lg"
        >
          🛒 Mulai Belanja
        </Link>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <WhyUsSection />
      <TestimonialSection />
      <CTASection />
    </>
  );
}
