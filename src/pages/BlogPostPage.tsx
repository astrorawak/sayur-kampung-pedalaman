
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">📝</div>
        <h1 className="font-display text-3xl text-[var(--text)] mb-4">Artikel Tidak Ditemukan</h1>
        <Link to="/blog" className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded font-semibold text-sm no-underline hover:bg-[var(--primary-dark)] transition-colors">
          ← Kembali ke Blog
        </Link>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.id !== post.id && p.isPublished).slice(0, 3);

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="font-display text-2xl text-[var(--text)] font-bold mt-8 mb-4">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="font-display text-xl text-[var(--text)] font-semibold mt-6 mb-3">{line.slice(4)}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-[var(--text)] leading-relaxed ml-4 list-disc">{line.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')}</li>;
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-[var(--text)] leading-relaxed mb-4">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--muted)] mb-8">
        <Link to="/" className="no-underline hover:text-[var(--primary)]">Beranda</Link>
        <span>/</span>
        <Link to="/blog" className="no-underline hover:text-[var(--primary)]">Blog</Link>
        <span>/</span>
        <span className="text-[var(--text)] truncate">{post.title}</span>
      </nav>

      {/* Article */}
      <article>
        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-[var(--text)] font-bold leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
            <span>✍️ {post.author}</span>
            <span>📅 {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </header>

        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8 shadow-lg"
        />

        <div className="prose max-w-none">
          {renderContent(post.content)}
        </div>
      </article>

      {/* CTA */}
      <div className="mt-12 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white rounded-2xl p-8 text-center">
        <h3 className="font-display text-2xl font-bold mb-3">Tertarik dengan Produk Kami?</h3>
        <p className="text-white/80 mb-6">Temukan sayuran dan rempah segar langsung dari pedalaman Kalimantan.</p>
        <Link
          to="/toko"
          className="inline-flex items-center gap-2 bg-[var(--accent)] text-[var(--text)] px-6 py-3 rounded-lg font-bold no-underline hover:bg-[var(--accent-light)] transition-colors"
        >
          🛒 Belanja Sekarang
        </Link>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-2xl text-[var(--text)] mb-6">Artikel Terkait</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/blog/${p.slug}`}
                className="bg-[var(--bg)] border border-[var(--border)] rounded-xl overflow-hidden no-underline hover:shadow-md transition-shadow group"
              >
                <img src={p.image} alt={p.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-4">
                  <h3 className="font-display text-sm font-semibold text-[var(--text)] leading-tight group-hover:text-[var(--primary)] transition-colors">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
