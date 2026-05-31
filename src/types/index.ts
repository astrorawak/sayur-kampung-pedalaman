export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  unit: string;
  category: string;
  categorySlug: string;
  description: string;
  image: string;
  stock: number;
  isActive: boolean;
  origin: string;
  badge?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface OrderForm {
  name: string;
  phone: string;
  address: string;
  rt_rw: string;
  kelurahan: string;
  kecamatan: string;
  city: string;
  province: string;
  postalCode: string;
  notes: string;
  shippingMethod: string;
  paymentMethod: string;
  paymentDetail: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  buyerName: string;
  buyerPhone: string;
  buyerAddress: string;
  buyerCity: string;
  buyerProvince: string;
  buyerPostalCode: string;
  paymentMethod: string;
  shippingMethod: string;
  shippingCost: number;
  totalAmount: number;
  status: OrderStatus;
  paymentProofUrl?: string;
  trackingNumber?: string;
  notes?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | 'menunggu_konfirmasi'
  | 'dikonfirmasi'
  | 'dikirim'
  | 'selesai'
  | 'dibatalkan';

export interface OrderItem {
  id: number;
  productName: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
}

export interface StoreSettings {
  bca_account: string;
  bca_name: string;
  mandiri_account: string;
  mandiri_name: string;
  bni_account: string;
  bni_name: string;
  bri_account: string;
  bri_name: string;
  gopay_number: string;
  ovo_number: string;
  dana_number: string;
  shopeepay_number: string;
  qris_image_url: string;
  whatsapp_number: string;
  email: string;
}
