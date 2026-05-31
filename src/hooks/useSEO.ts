import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

const SITE_NAME = 'Sayur Kampung Pedalaman';
const BASE_URL = 'https://sayurkampungpedalaman.com';
const DEFAULT_DESCRIPTION =
  'Sayur mayur dan rempah-rempah asli Kalimantan. Dipetik segar dari pedalaman Borneo, dikirim langsung ke meja makan Anda.';

export function useSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = 'sayur kalimantan, rempah borneo, bawang dayak, pakis hutan, sayur organik',
  image = `${BASE_URL}/og-image.jpg`,
  url = BASE_URL,
  type = 'website',
}: SEOProps = {}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:image', image, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [fullTitle, description, keywords, image, url, type]);
}
