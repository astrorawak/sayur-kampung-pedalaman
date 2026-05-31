export function formatRupiah(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `SKP-${year}${month}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const intl = cleaned.startsWith('0') ? '62' + cleaned.slice(1) : cleaned;
  return `https://api.whatsapp.com/send?phone=${intl}&text=${encodeURIComponent(message)}`;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    menunggu_konfirmasi: 'Menunggu Konfirmasi',
    dikonfirmasi: 'Dikonfirmasi',
    dikirim: 'Dikirim',
    selesai: 'Selesai',
    dibatalkan: 'Dibatalkan',
  };
  return labels[status] ?? status;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    menunggu_konfirmasi: '#d68910',
    dikonfirmasi: '#2980b9',
    dikirim: '#8e44ad',
    selesai: '#27ae60',
    dibatalkan: '#c0392b',
  };
  return colors[status] ?? '#8c7355';
}
