import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { BrandSettings, CartItem, Category, Order, Product, ProductColor } from '../types';
import {
  loadInitialCategories,
  loadInitialProducts,
  loadOrders,
  loadSettings,
  loadUploadedImages,
  saveCategories,
  saveOrders,
  saveProducts,
  saveSettings,
  saveUploadedImages,
  getAdminAuth,
  setAdminAuth as persistAdminAuth,
  UploadedImageRecord,
} from '../lib/storage';
import { uploadProductImage, resetSupabaseClient } from '../lib/supabase';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface StoreContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  settings: BrandSettings;
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  checkoutProductDirect: { product: Product; color: ProductColor; quantity: number } | null;
  setCheckoutProductDirect: (item: { product: Product; color: ProductColor; quantity: number } | null) => void;
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  
  // Cart Actions
  addToCart: (product: Product, selectedColor: ProductColor, quantity?: number) => void;
  removeFromCart: (productId: string, colorName: string) => void;
  updateCartQuantity: (productId: string, colorName: string, delta: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;

  // Product CRUD
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Category CRUD
  addCategory: (cat: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Order Operations
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;

  // Settings
  updateSettings: (newSettings: Partial<BrandSettings>) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;

  // Image Upload System
  uploadedImages: UploadedImageRecord[];
  handleImageUpload: (file: File, category?: string) => Promise<string>;
  deleteUploadedImage: (id: string) => void;

  // WhatsApp Link Builder
  createWhatsAppLink: (text: string) => string;
  createProductWhatsAppOrder: (product: Product, colorName: string, quantity: number, customerName?: string, address?: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(loadInitialProducts);
  const [categories, setCategories] = useState<Category[]>(loadInitialCategories);
  const [orders, setOrders] = useState<Order[]>(loadOrders);
  const [settings, setSettings] = useState<BrandSettings>(loadSettings);
  const [uploadedImages, setUploadedImages] = useState<UploadedImageRecord[]>(loadUploadedImages);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('alhafiz_cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutProductDirect, setCheckoutProductDirect] = useState<{ product: Product; color: ProductColor; quantity: number } | null>(null);
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(getAdminAuth);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem('alhafiz_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Toast System
  const addToast = (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Management
  const addToCart = (product: Product, selectedColor: ProductColor, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.name === selectedColor.name
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [...prev, { product, selectedColor, quantity }];
    });
    addToast('Added to Bag', `${product.name} (${selectedColor.name}) × ${quantity}`, 'success');
  };

  const removeFromCart = (productId: string, colorName: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedColor.name === colorName)));
  };

  const updateCartQuantity = (productId: string, colorName: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedColor.name === colorName) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cart]);

  // Product CRUD
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    saveProducts(updated);
    addToast('Product Published', `${newProduct.name} has been published to collection!`, 'success');
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setProducts(updated);
    saveProducts(updated);
    addToast('Product Updated', 'Changes saved successfully', 'info');
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveProducts(updated);
    addToast('Product Removed', 'Product has been deleted', 'info');
  };

  // Category CRUD
  const addCategory = (catData: Omit<Category, 'id'>): Category => {
    const newCat: Category = {
      ...catData,
      id: catData.slug.toLowerCase().replace(/[^a-z0-9]/g, '-') || `cat-${Date.now()}`,
    };
    const updated = [...categories, newCat];
    setCategories(updated);
    saveCategories(updated);
    addToast('Category Created', `${newCat.name} was added.`, 'success');
    return newCat;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    const updated = categories.map((c) => (c.id === id ? { ...c, ...updates } : c));
    setCategories(updated);
    saveCategories(updated);
    addToast('Category Updated', 'Category details updated.', 'info');
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    saveCategories(updated);
    addToast('Category Deleted', 'Category removed.', 'info');
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const orderNumber = `AHC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveOrders(updated);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    saveOrders(updated);
    addToast('Order Status Updated', `Order #${orderId.slice(-6)} set to ${status}`, 'info');
  };

  const deleteOrder = (orderId: string) => {
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    saveOrders(updated);
    addToast('Order Deleted', 'Order removed from records', 'info');
  };

  // Settings
  const updateSettings = (newSettings: Partial<BrandSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveSettings(updated);
    resetSupabaseClient();
    addToast('Settings Saved', 'Brand and delivery configuration saved.', 'success');
  };

  // Admin Auth
  const loginAdmin = (passcode: string): boolean => {
    // Default master passcode for AL HAFIZ CLOTHS admin
    if (passcode === 'alhafiz2026' || passcode === 'alhafiz' || passcode === 'admin123') {
      setIsAdminLoggedIn(true);
      persistAdminAuth(true);
      addToast('Welcome Back', 'Logged in as AL HAFIZ CLOTHS Administrator', 'success');
      return true;
    }
    addToast('Invalid Passcode', 'Please check your admin passcode and try again.', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    persistAdminAuth(false);
    addToast('Logged Out', 'Admin session ended', 'info');
  };

  // Image Upload
  const handleImageUpload = async (file: File, category?: string): Promise<string> => {
    try {
      const result = await uploadProductImage(file, settings);
      const newRecord: UploadedImageRecord = {
        id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: file.name,
        url: result.url,
        category: category || 'General Fabric',
        createdAt: new Date().toISOString(),
        isCloud: result.isCloud,
      };
      const updated = [newRecord, ...uploadedImages];
      setUploadedImages(updated);
      saveUploadedImages(updated);
      addToast('Image Uploaded', result.isCloud ? 'Saved to Supabase Storage' : 'Ready to assign to suit', 'success');
      return result.url;
    } catch (err) {
      console.error('Image upload failed:', err);
      addToast('Upload Failed', 'Could not process image file', 'error');
      throw err;
    }
  };

  const deleteUploadedImage = (id: string) => {
    const updated = uploadedImages.filter((img) => img.id !== id);
    setUploadedImages(updated);
    saveUploadedImages(updated);
    addToast('Image Removed', 'Image removed from gallery', 'info');
  };

  // WhatsApp Link Builder
  const createWhatsAppLink = (text: string): string => {
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(text);
    return `https://wa.me/${cleanNumber}?text=${encoded}`;
  };

  const createProductWhatsAppOrder = (
    product: Product,
    colorName: string,
    quantity: number,
    customerName?: string,
    address?: string
  ) => {
    const totalAmount = product.price * quantity;
    const msg = `*AL HAFIZ CLOTHS - ORDER INQUIRY*
━━━━━━━━━━━━━━━━━━━━
Assalam-o-Alaikum, I would like to order:

*Product:* ${product.name}
*Fabric:* ${product.fabricType}
*Cutting:* ${product.cutting}
*Color:* ${colorName}
*Quantity:* ${quantity} Suit(s)
*Price per Suit:* Rs. ${product.price.toLocaleString('en-PK')}
*Total Amount:* Rs. ${totalAmount.toLocaleString('en-PK')}

*Delivery Terms:* FREE DELIVERY IN KARACHI (or Rs. ${settings.otherCitiesDeliveryFee} nationwide)
*Capry Guarantee:* ${product.capryGuarantee ? 'Yes, Included' : 'Standard'}
${customerName ? `*Customer Name:* ${customerName}` : ''}
${address ? `*Delivery Address:* ${address}` : ''}

Please confirm stock availability and dispatch time. Thank you!`;

    const url = createWhatsAppLink(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        orders,
        settings,
        cart,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutProductDirect,
        setCheckoutProductDirect,
        toasts,
        addToast,
        removeToast,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        updateSettings,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        uploadedImages,
        handleImageUpload,
        deleteUploadedImage,
        createWhatsAppLink,
        createProductWhatsAppOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
