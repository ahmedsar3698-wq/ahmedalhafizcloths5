export interface ProductColor {
  name: string;
  hex: string;
  inStock?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  categoryName: string;
  description: string;
  fabricType: 'Washing Wear' | 'Pure Cotton' | 'Mix Cotton' | 'Other Fabric' | string;
  cutting: string; // e.g. "4.5 Gaz (4.1 Meters) - Complete Suit"
  width: string;   // e.g. "54 Inches (Bara Arzz)"
  season: 'All Season' | 'Summer' | 'Winter' | 'Mid Season';
  capryGuarantee: boolean;
  capryGuaranteeText?: string;
  colorGuarantee: boolean;
  qualityBadge?: string; // "Premium Quality", "Best Fabric", "Color Guaranteed", "Capry Guaranteed"
  colors: ProductColor[];
  images: string[];
  thumbnail: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  inStock: boolean;
  rating?: number;
  reviewsCount?: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount?: number;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  color: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  whatsappNumber: string;
  city: string;
  address: string;
  specialInstructions?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: 'Cash on Delivery (COD)' | 'Bank Transfer / JazzCash' | 'WhatsApp Direct Order';
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export interface BrandSettings {
  brandName: string;
  tagline: string;
  whatsappNumber: string; // formatted e.g. +923262444991
  whatsappDisplay: string; // +92-326-2444991
  freeKarachiDelivery: boolean;
  otherCitiesDeliveryFee: number;
  defaultCapryGuaranteeText: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  supabaseStorageBucket?: string;
}
