import { BrandSettings, Category, Order, Product } from '../types';
import { INITIAL_BRAND_SETTINGS, INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/initialData';
import { INITIAL_30_FABRIC_IMAGES } from '../data/fabricGalleryData';

const STORAGE_KEYS = {
  PRODUCTS: 'alhafiz_products_v3',
  CATEGORIES: 'alhafiz_categories_v1',
  ORDERS: 'alhafiz_orders_v1',
  SETTINGS: 'alhafiz_settings_v1',
  IMAGES: 'alhafiz_uploaded_images_v2',
  ADMIN_AUTH: 'alhafiz_admin_auth_v1',
};

export interface UploadedImageRecord {
  id: string;
  name: string;
  url: string;
  category?: string;
  createdAt: string;
  isCloud?: boolean;
}

export const loadInitialProducts = (): Product[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed reading products from storage:', e);
  }
  saveProducts(INITIAL_PRODUCTS);
  return INITIAL_PRODUCTS;
};

export const saveProducts = (products: Product[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Failed saving products to storage:', e);
  }
};

export const loadInitialCategories = (): Category[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed reading categories from storage:', e);
  }
  saveCategories(INITIAL_CATEGORIES);
  return INITIAL_CATEGORIES;
};

export const saveCategories = (categories: Category[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (e) {
    console.error('Failed saving categories to storage:', e);
  }
};

export const loadOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed reading orders from storage:', e);
  }
  return [];
};

export const saveOrders = (orders: Order[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed saving orders to storage:', e);
  }
};

export const loadSettings = (): BrandSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) {
      return { ...INITIAL_BRAND_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed reading settings from storage:', e);
  }
  return INITIAL_BRAND_SETTINGS;
};

export const saveSettings = (settings: BrandSettings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed saving settings to storage:', e);
  }
};

export const loadUploadedImages = (): UploadedImageRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.IMAGES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed reading uploaded images:', e);
  }
  saveUploadedImages(INITIAL_30_FABRIC_IMAGES);
  return INITIAL_30_FABRIC_IMAGES;
};

export const saveUploadedImages = (images: UploadedImageRecord[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
  } catch (e) {
    console.error('Failed saving uploaded images:', e);
  }
};

export const getAdminAuth = (): boolean => {
  return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'authenticated';
};

export const setAdminAuth = (auth: boolean) => {
  if (auth) {
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'authenticated');
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
};
