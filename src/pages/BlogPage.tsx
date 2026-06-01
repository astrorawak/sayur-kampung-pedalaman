
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';

export function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl text-[var(--text)] mb-3">Blog & Artikel</h1>
        <p className="text-[var(--muted)] italic max-w-xl mx-auto">
          Cerita, tips, dan pengetahuan seputar sayur, rempah, dan kearifan lokal Kalimantan
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.filter((p) => p.isPublished).map((post) => (
          <article key={post.id} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-[var(--muted)] mb-3">
                <span>✍️ {post.author}</span>
                <span>•</span>
                <span>📅 {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <h2 className="font-display text-xl font-semibold text-[var(--text)] mb-3 leading-tight group-hover:text-[var(--primary)] transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-5 line-clamp-3">
                {post.excerpt}
              </p>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold text-sm no-underline hover:underline"
              >
                Baca Selengkapnya →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {blogPosts.filter((p) => p.isPublished).length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📝</div>
          <h3 className="font-display text-xl text-[var(--text)] mb-2">Belum Ada Artikel</h3>
          <p className="text-[var(--muted)] text-sm">Artikel akan segera hadir. Pantau terus!</p>
        </div>
      )}
    </div>
  );
}
