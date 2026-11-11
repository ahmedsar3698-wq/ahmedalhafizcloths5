import React, { useState, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Category, Order, ProductColor } from '../types';
import { SUPABASE_SQL_SCHEMA } from '../lib/supabase';
import {
  Package,
  FolderTree,
  Image as ImageIcon,
  ShoppingBag,
  Settings,
  Plus,
  Trash2,
  Edit,
  Upload,
  Check,
  ShieldCheck,
  Eye,
  LogOut,
  ExternalLink,
  MessageCircle,
  Copy,
  CheckCheck,
  RefreshCw,
  Search,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    categories,
    orders,
    settings,
    uploadedImages,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    updateOrderStatus,
    deleteOrder,
    updateSettings,
    handleImageUpload,
    deleteUploadedImage,
    addToast,
  } = useStore();

  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'images' | 'orders' | 'settings'>('products');
  const [previewImage, setPreviewImage] = useState<any | null>(null);
  
  // Product Form State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<{
    name: string;
    slug: string;
    price: number;
    originalPrice: number;
    categoryId: string;
    categoryName: string;
    description: string;
    fabricType: string;
    cutting: string;
    width: string;
    season: 'All Season' | 'Summer' | 'Winter' | 'Mid Season';
    capryGuarantee: boolean;
    capryGuaranteeText: string;
    colorGuarantee: boolean;
    qualityBadge: string;
    colors: ProductColor[];
    images: string[];
    thumbnail: string;
    isFeatured: boolean;
    isBestSeller: boolean;
    isNewArrival: boolean;
    inStock: boolean;
  }>({
    name: '',
    slug: '',
    price: 2500,
    originalPrice: 3000,
    categoryId: 'washing-wear',
    categoryName: 'Washing Wear',
    description: '',
    fabricType: 'Washing Wear',
    cutting: '4.5 Gaz (4.1 Meters) - Complete Suit',
    width: '54 Inches (Bara Arzz)',
    season: 'All Season',
    capryGuarantee: true,
    capryGuaranteeText: 'Capry Guarantee: 100% color fastness, zero shrinkage & lint-free finish verified.',
    colorGuarantee: true,
    qualityBadge: 'Premium Quality',
    colors: [
      { name: 'Charcoal Slate', hex: '#374151', inStock: true },
      { name: 'Midnight Navy', hex: '#1e293b', inStock: true },
    ],
    images: [],
    thumbnail: '',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
  });

  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#1e293b');

  // Category Form State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState<{
    name: string;
    slug: string;
    description: string;
    image: string;
  }>({
    name: '',
    slug: '',
    description: '',
    image: '',
  });

  // Settings State
  const [settingsForm, setSettingsForm] = useState(settings);
  const [copiedSql, setCopiedSql] = useState(false);

  // File Upload Inputs
  const productFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const categoryFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Search in Orders/Products
  const [adminSearch, setAdminSearch] = useState('');

  // Admin Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#0f1118] border border-[#2b3346] rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#161a25] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
              <Package className="w-7 h-7" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-white">
              AL HAFIZ CLOTHS Portal
            </h2>
            <p className="text-xs text-[#9ca3af]">
              Enter administrator passcode to manage suits, fabrics, orders, and pictures.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginAdmin(passcode);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-[#cbd5e1] mb-1.5">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (default: alhafiz2026)"
                className="w-full bg-[#141722] border border-[#282f42] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
              />
              <span className="text-[10px] text-[#64748b] mt-1 block">
                Default Master Passcode: <code className="text-[#c5a059]">alhafiz2026</code>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#c5a059] hover:bg-[#b59048] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg"
            >
              Access Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Handlers ---
  const handleOpenNewProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      slug: '',
      price: 2450,
      originalPrice: 3000,
      categoryId: categories[0]?.slug || 'washing-wear',
      categoryName: categories[0]?.name || 'Washing Wear',
      description: '',
      fabricType: 'Washing Wear',
      cutting: '4.5 Gaz (4.1 Meters) - Complete Suit',
      width: '54 Inches (Bara Arzz)',
      season: 'All Season',
      capryGuarantee: true,
      capryGuaranteeText: 'Capry Guarantee: 100% color fastness, zero shrinkage & lint-free finish verified.',
      colorGuarantee: true,
      qualityBadge: 'Premium Quality',
      colors: [
        { name: 'Charcoal Slate', hex: '#374151', inStock: true },
        { name: 'Navy Blue', hex: '#1e293b', inStock: true },
      ],
      images: ['/src/assets/images/fabric_washing_wear_1794403306958.jpg'],
      thumbnail: '/src/assets/images/fabric_washing_wear_1794403306958.jpg',
      isFeatured: true,
      isBestSeller: false,
      isNewArrival: true,
      inStock: true,
    });
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      slug: prod.slug,
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price + 500,
      categoryId: prod.categoryId,
      categoryName: prod.categoryName,
      description: prod.description,
      fabricType: prod.fabricType,
      cutting: prod.cutting,
      width: prod.width,
      season: prod.season as any,
      capryGuarantee: prod.capryGuarantee,
      capryGuaranteeText: prod.capryGuaranteeText || settings.defaultCapryGuaranteeText,
      colorGuarantee: prod.colorGuarantee,
      qualityBadge: prod.qualityBadge || 'Premium Quality',
      colors: prod.colors || [],
      images: prod.images || [],
      thumbnail: prod.thumbnail || prod.images[0] || '',
      isFeatured: Boolean(prod.isFeatured),
      isBestSeller: Boolean(prod.isBestSeller),
      isNewArrival: Boolean(prod.isNewArrival),
      inStock: Boolean(prod.inStock),
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      addToast('Validation Error', 'Product Name and Price are required.', 'error');
      return;
    }

    const matchedCat = categories.find((c: Category) => c.slug === productForm.categoryId);
    const catName = matchedCat ? matchedCat.name : productForm.categoryName;
    const cleanSlug = productForm.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (editingProductId) {
      updateProduct(editingProductId, {
        ...productForm,
        slug: cleanSlug,
        categoryName: catName,
      });
    } else {
      addProduct({
        ...productForm,
        slug: cleanSlug,
        categoryName: catName,
        rating: 5.0,
        reviewsCount: 1,
      });
    }
    setIsProductModalOpen(false);
  };

  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setProductForm((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: newColorName.trim(), hex: newColorHex, inStock: true }],
    }));
    setNewColorName('');
  };

  const handleRemoveColor = (name: string) => {
    setProductForm((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c.name !== name),
    }));
  };

  // Upload image specifically for currently edited product
  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await handleImageUpload(files[i], productForm.categoryName);
        urls.push(url);
      }

      setProductForm((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
        thumbnail: prev.thumbnail || urls[0],
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
      if (productFileInputRef.current) productFileInputRef.current.value = '';
    }
  };

  // General gallery upload
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        await handleImageUpload(files[i]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
      if (galleryFileInputRef.current) galleryFileInputRef.current.value = '';
    }
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  const handleCopySql = () => {
    navigator.clipboard?.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    addToast('SQL Copied', 'Supabase SQL schema copied to clipboard! Paste into Supabase SQL Editor.', 'success');
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#0f1118] border border-[#212738] rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] block">
              Administration Management
            </span>
            <h1 className="font-serif text-2xl font-bold text-white">
              AL HAFIZ CLOTHS Control Panel
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#171b26] hover:bg-[#202534] text-xs text-[#cbd5e1] rounded-lg border border-[#2b3346] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-[#0e1017] rounded-xl border border-[#1e2330] overflow-x-auto">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'products'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'text-[#9ca3af] hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'categories'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'text-[#9ca3af] hover:text-white'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>Categories ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('images')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'images'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'text-[#9ca3af] hover:text-white'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Fabric Images ({uploadedImages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'text-[#9ca3af] hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'text-[#9ca3af] hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Supabase & Brand Settings</span>
        </button>
      </div>

      {/* --- TAB 1: PRODUCTS MANAGEMENT --- */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <button
              onClick={handleOpenNewProduct}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#c5a059] hover:bg-[#b59048] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Unstitched Suit</span>
            </button>

            <span className="text-xs text-[#9ca3af]">
              Prices between Rs. 1,800 – Rs. 5,000 in Pakistani Rupees (PKR).
            </span>
          </div>

          {/* Table */}
          <div className="bg-[#0f1118] border border-[#212738] rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#cbd5e1]">
                <thead className="bg-[#141722] text-[#9ca3af] uppercase text-[10px] tracking-wider border-b border-[#212738]">
                  <tr>
                    <th className="p-3.5">Suit / Fabric</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price (PKR)</th>
                    <th className="p-3.5">Colors</th>
                    <th className="p-3.5">Capry Guarantee</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2330]">
                  {products.map((p: Product) => (
                    <tr key={p.id} className="hover:bg-[#131622] transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={p.thumbnail || p.images[0]}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover bg-black shrink-0"
                        />
                        <div>
                          <span className="font-semibold text-white block">{p.name}</span>
                          <span className="text-[11px] text-[#9ca3af]">{p.cutting}</span>
                        </div>
                      </td>
                      <td className="p-3.5 text-[#c5a059] font-medium">{p.categoryName}</td>
                      <td className="p-3.5 font-bold text-white tabular-nums">
                        Rs. {p.price.toLocaleString('en-PK')}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1">
                          {p.colors?.slice(0, 4).map((c: ProductColor) => (
                            <span
                              key={c.name}
                              className="w-3.5 h-3.5 rounded-full border border-black/40"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                          {(p.colors?.length || 0) > 4 && (
                            <span className="text-[10px] text-gray-500">+{p.colors.length - 4}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5">
                        {p.capryGuarantee ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                            <Check className="w-3 h-3" /> Included
                          </span>
                        ) : (
                          <span className="text-gray-500">Standard</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            p.inStock ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950 text-rose-300'
                          }`}
                        >
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleEditProduct(p)}
                          className="p-1.5 text-[#c5a059] hover:bg-[#1a1f2e] rounded-lg transition-colors"
                          title="Edit Suit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${p.name}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                          title="Delete Suit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: CATEGORY MANAGEMENT --- */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-white">Fabric Collections & Categories</h3>
            <button
              onClick={() => {
                setEditingCategoryId(null);
                setCategoryForm({ name: '', slug: '', description: '', image: '' });
                setIsCategoryModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#c5a059] hover:bg-[#b59048] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c: Category) => {
              const count = products.filter((p: Product) => p.categoryId === c.slug).length;
              return (
                <div key={c.id} className="bg-[#0f1118] border border-[#212738] rounded-xl p-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <img
                      src={c.image || '/src/assets/images/fabric_washing_wear_1794403306958.jpg'}
                      alt=""
                      className="w-full h-36 rounded-lg object-cover bg-black"
                    />
                    <div>
                      <span className="text-[10px] text-[#c5a059] uppercase tracking-wider font-semibold">
                        {count} Products Linked
                      </span>
                      <h4 className="font-serif text-base font-bold text-white">{c.name}</h4>
                      <p className="text-xs text-[#9ca3af] mt-1 line-clamp-2">{c.description}</p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#1e2330] flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingCategoryId(c.id);
                        setCategoryForm({
                          name: c.name,
                          slug: c.slug,
                          description: c.description,
                          image: c.image,
                        });
                        setIsCategoryModalOpen(true);
                      }}
                      className="p-1.5 text-[#c5a059] hover:bg-[#1a1f2e] rounded-lg transition-colors"
                      title="Edit Category"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete category ${c.name}?`)) {
                          deleteCategory(c.id);
                        }
                      }}
                      className="p-1.5 text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- TAB 3: IMAGE MANAGEMENT SYSTEM --- */}
      {activeTab === 'images' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0f1118] border border-[#212738] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Fabric Photo & Image Manager
              </h3>
              <p className="text-xs text-[#9ca3af] mt-1 max-w-lg">
                Upload your own professional Pakistani fabric photos from your computer. Uploaded pictures are immediately available to assign to any suit or category!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={galleryFileInputRef}
                onChange={handleGalleryUpload}
                multiple
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => galleryFileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 px-5 py-3 bg-[#c5a059] hover:bg-[#b59048] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg"
              >
                <Upload className="w-4 h-4" />
                <span>{isUploading ? 'Uploading...' : 'Upload Images From PC'}</span>
              </button>
            </div>
          </div>

          {/* Grid of Uploaded Images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {uploadedImages.map((img: any) => (
              <div
                key={img.id}
                onClick={() => setPreviewImage(img)}
                className="group relative bg-[#0e1017] border border-[#202534] hover:border-[#c5a059]/60 rounded-xl overflow-hidden aspect-square flex flex-col justify-between cursor-pointer transition-all shadow-md"
              >
                <img src={img.url} alt={img.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <span className="text-[10px] text-white font-medium line-clamp-2">{img.name}</span>
                  <div className="flex items-center justify-between gap-1 pt-1 border-t border-white/20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard?.writeText(img.url);
                        addToast('URL Copied', 'Image URL copied to clipboard', 'info');
                      }}
                      className="p-1.5 bg-[#1f2536] hover:bg-[#c5a059] hover:text-black text-white rounded transition-colors text-[10px] flex items-center gap-1"
                      title="Copy URL"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Delete image ${img.name}?`)) {
                          deleteUploadedImage(img.id);
                        }
                      }}
                      className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded transition-colors"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full Image Preview Modal */}
          {previewImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
              <div className="relative max-w-2xl w-full bg-[#0f1118] border border-[#2e374c] rounded-2xl overflow-hidden p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-bold text-white truncate max-w-md">
                    {previewImage.name}
                  </h4>
                  <button
                    onClick={() => setPreviewImage(null)}
                    className="p-1 text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="max-h-[60vh] rounded-xl overflow-hidden bg-black flex items-center justify-center">
                  <img src={previewImage.url} alt="" className="max-h-[60vh] w-auto object-contain" />
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-[#9ca3af]">Category: {previewImage.category || 'Fabric'}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(previewImage.url);
                      addToast('URL Copied', 'Image asset URL copied', 'success');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#c5a059] text-black font-semibold rounded-lg"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Asset URL</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 4: ORDER MANAGEMENT --- */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-white">
              Customer Bookings & Orders ({orders.length})
            </h3>
          </div>

          {orders.length === 0 ? (
            <div className="py-16 text-center bg-[#0f1118] border border-[#212738] rounded-2xl">
              <ShoppingBag className="w-10 h-10 mx-auto text-[#64748b] mb-2" />
              <p className="text-sm font-semibold text-white">No Customer Orders Yet</p>
              <p className="text-xs text-[#9ca3af] mt-1">
                New orders placed on the website or via WhatsApp checkout will appear here in real-time.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: Order) => (
                <div
                  key={order.id}
                  className="bg-[#0f1118] border border-[#212738] rounded-2xl p-5 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1e2330]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                          Order #{order.orderNumber}
                        </span>
                        <span className="text-[#64748b]">·</span>
                        <span className="text-xs text-[#9ca3af]">
                          {new Date(order.createdAt).toLocaleDateString('en-PK', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-white mt-1">
                        {order.customerName}
                      </h4>
                    </div>

                    {/* Status Changer & WhatsApp chat */}
                    <div className="flex items-center gap-3">
                      <a
                        href={`https://wa.me/${order.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Assalam-o-Alaikum ${order.customerName}, this is AL HAFIZ CLOTHS regarding your Order #${order.orderNumber}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-black font-semibold text-xs rounded-lg hover:bg-[#20ba5a] transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp ({order.whatsappNumber})</span>
                      </a>

                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="bg-[#141722] border border-[#2e374c] rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() => {
                          if (window.confirm('Delete this order record?')) {
                            deleteOrder(order.id);
                          }
                        }}
                        className="p-1.5 text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#cbd5e1]">
                    <div>
                      <span className="text-[#64748b] block text-[10px]">Contact Phone:</span>
                      <span className="font-medium text-white">{order.phone}</span>
                    </div>

                    <div>
                      <span className="text-[#64748b] block text-[10px]">City:</span>
                      <span className="font-medium text-white">
                        {order.city} {order.city.toLowerCase() === 'karachi' ? '(Free Karachi Delivery)' : ''}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#64748b] block text-[10px]">Payment Method:</span>
                      <span className="font-semibold text-[#c5a059]">{order.paymentMethod}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[#64748b] block text-[10px]">Delivery Address:</span>
                    <p className="text-xs text-white font-medium bg-[#141722] p-2.5 rounded-lg border border-[#212738] mt-1">
                      {order.address}
                    </p>
                  </div>

                  {/* Ordered Items */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] text-[#64748b] uppercase tracking-wider font-semibold">
                      Items Ordered ({order.items.length}):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {order.items.map((it: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2 rounded-lg bg-[#141722] border border-[#202534] text-xs"
                        >
                          <img src={it.image} alt="" className="w-10 h-10 rounded object-cover bg-black" />
                          <div className="flex-1 truncate">
                            <span className="font-semibold text-white block truncate">{it.productName}</span>
                            <span className="text-[11px] text-[#9ca3af]">
                              Shade: {it.color} · Qty: {it.quantity}
                            </span>
                          </div>
                          <span className="font-bold text-white tabular-nums">
                            Rs. {(it.price * it.quantity).toLocaleString('en-PK')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs font-bold border-t border-[#1e2330]">
                    <span className="text-[#9ca3af]">Total Order Amount:</span>
                    <span className="text-base text-[#c5a059] tabular-nums">
                      Rs. {order.total.toLocaleString('en-PK')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- TAB 5: SUPABASE & SETTINGS --- */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Brand & Delivery Configuration */}
          <div className="lg:col-span-6 bg-[#0f1118] border border-[#212738] rounded-2xl p-6 space-y-5">
            <h3 className="font-serif text-lg font-bold text-white">Brand & Delivery Setup</h3>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#cbd5e1] font-medium mb-1">Brand Name</label>
                <input
                  type="text"
                  value={settingsForm.brandName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#cbd5e1] font-medium mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={settingsForm.whatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#cbd5e1] font-medium mb-1">WhatsApp Display Formatted</label>
                <input
                  type="text"
                  value={settingsForm.whatsappDisplay}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappDisplay: e.target.value })}
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#cbd5e1] font-medium mb-1">Other Cities Courier Delivery Fee (PKR)</label>
                <input
                  type="number"
                  value={settingsForm.otherCitiesDeliveryFee}
                  onChange={(e) => setSettingsForm({ ...settingsForm, otherCitiesDeliveryFee: Number(e.target.value) })}
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                />
                <span className="text-[10px] text-emerald-400 mt-1 block">
                  Karachi remains permanently 100% Free Delivery.
                </span>
              </div>

              <div>
                <label className="block text-[#cbd5e1] font-medium mb-1">Capry Guarantee Description Text</label>
                <textarea
                  rows={2}
                  value={settingsForm.defaultCapryGuaranteeText}
                  onChange={(e) => setSettingsForm({ ...settingsForm, defaultCapryGuaranteeText: e.target.value })}
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#c5a059] hover:bg-[#b59048] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
                >
                  Save Store Settings
                </button>
              </div>
            </form>
          </div>

          {/* Supabase Storage & SQL Setup */}
          <div className="lg:col-span-6 bg-[#0f1118] border border-[#212738] rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-white">Supabase Cloud Storage</h3>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                Cloud Ready
              </span>
            </div>

            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Connect your own Supabase project to permanently store all fabric images in Supabase Storage and sync products to PostgreSQL tables.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#cbd5e1] font-medium mb-1">Supabase Project URL</label>
                <input
                  type="text"
                  placeholder="https://xyzcompany.supabase.co"
                  value={settingsForm.supabaseUrl || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, supabaseUrl: e.target.value })}
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-[#cbd5e1] font-medium mb-1">Supabase Anon Key</label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={settingsForm.supabaseAnonKey || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, supabaseAnonKey: e.target.value })}
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-[#cbd5e1] font-medium mb-1">Storage Bucket Name</label>
                <input
                  type="text"
                  value={settingsForm.supabaseStorageBucket || 'product-images'}
                  onChange={(e) => setSettingsForm({ ...settingsForm, supabaseStorageBucket: e.target.value })}
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                />
              </div>

              <button
                type="button"
                onClick={handleSaveSettings}
                className="w-full py-2.5 bg-[#1a1f2e] hover:bg-[#252c3f] text-white text-xs font-semibold rounded-lg border border-[#2b3346] transition-colors"
              >
                Connect Supabase Project
              </button>
            </div>

            {/* 1-Click SQL Copy Box */}
            <div className="pt-4 border-t border-[#1e2330] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white font-cinzel">Supabase Database Tables & SQL Schema</span>
                <button
                  onClick={handleCopySql}
                  className="flex items-center gap-1.5 text-xs text-[#c5a059] hover:underline"
                >
                  {copiedSql ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Schema'}</span>
                </button>
              </div>
              <p className="text-[11px] text-[#9ca3af]">
                Paste this schema into your Supabase Dashboard &gt; SQL Editor to generate the tables and public bucket policies with one click.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: ADD / EDIT PRODUCT --- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-[#0f1118] border border-[#2b3346] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col justify-between">
            {/* Header */}
            <div className="p-5 bg-[#131620] border-b border-[#222838] flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingProductId ? 'Edit Unstitched Suit' : 'Add New Unstitched Suit'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#cbd5e1] font-medium mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. Al-Hafiz Royal Imperial Washing Wear"
                    className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-[#cbd5e1] font-medium mb-1">Category *</label>
                  <select
                    value={productForm.categoryId}
                    onChange={(e) => {
                      const sel = categories.find((c: Category) => c.slug === e.target.value);
                      setProductForm({
                        ...productForm,
                        categoryId: e.target.value,
                        categoryName: sel ? sel.name : e.target.value,
                      });
                    }}
                    className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                  >
                    {categories.map((c: Category) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#cbd5e1] font-medium mb-1">
                    Price in PKR (1,500 – 5,000) *
                  </label>
                  <input
                    type="number"
                    min={1500}
                    max={5000}
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-[#cbd5e1] font-medium mb-1">Original Price (PKR Markdown)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-[#cbd5e1] font-medium mb-1">Fabric Type</label>
                  <select
                    value={productForm.fabricType}
                    onChange={(e) => setProductForm({ ...productForm, fabricType: e.target.value })}
                    className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                  >
                    <option value="Washing Wear">Washing Wear</option>
                    <option value="Pure Cotton">Pure Cotton</option>
                    <option value="Mix Cotton">Mix Cotton</option>
                    <option value="Other Fabric">Other Fabric</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#cbd5e1] font-medium mb-1">Quality Badge Text</label>
                  <input
                    type="text"
                    value={productForm.qualityBadge}
                    onChange={(e) => setProductForm({ ...productForm, qualityBadge: e.target.value })}
                    placeholder="e.g. Premium Quality, Best Fabric"
                    className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#cbd5e1] font-medium mb-1">Suit Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Detail the weave, thread count, fall, and comfort..."
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg p-2.5 text-white"
                />
              </div>

              {/* Upload Images For This Suit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[#cbd5e1] font-medium">Suit Images & Fabric Photos</label>
                  <input
                    type="file"
                    ref={productFileInputRef}
                    onChange={handleProductImageUpload}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => productFileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#c5a059] text-black font-semibold rounded-lg"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Fabric Photos</span>
                  </button>
                </div>

                {/* Previews */}
                <div className="flex items-center gap-3 flex-wrap">
                  {productForm.images.map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#2e374c]">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          setProductForm((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== idx),
                            thumbnail: prev.thumbnail === img ? prev.images[0] || '' : prev.thumbnail,
                          }))
                        }
                        className="absolute top-1 right-1 bg-black/80 text-rose-400 p-0.5 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manage Colors */}
              <div className="space-y-2">
                <label className="text-[#cbd5e1] font-medium">Manage Available Color Shades</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    placeholder="Color Name (e.g. Royal Navy)"
                    className="flex-1 bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                  />
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    className="w-10 h-8 rounded bg-transparent cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-3 py-2 bg-[#1a1f2e] text-white font-semibold rounded-lg border border-[#2b3346]"
                  >
                    Add Shade
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-wrap pt-1">
                  {productForm.colors.map((c) => (
                    <div
                      key={c.name}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-[#141722] border border-[#222838] rounded-lg"
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                      <span className="text-white">{c.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(c.name)}
                        className="text-gray-400 hover:text-rose-400 ml-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capry Guarantee Toggle & Custom Text */}
              <div className="p-4 rounded-xl bg-[#141722] border border-[#222838] space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.capryGuarantee}
                    onChange={(e) => setProductForm({ ...productForm, capryGuarantee: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#c5a059]"
                  />
                  <span className="text-white font-semibold">Enable "Capry Guarantee" for this suit</span>
                </label>

                {productForm.capryGuarantee && (
                  <div>
                    <label className="block text-[#9ca3af] mb-1">Capry Guarantee Custom Rationale</label>
                    <input
                      type="text"
                      value={productForm.capryGuaranteeText}
                      onChange={(e) => setProductForm({ ...productForm, capryGuaranteeText: e.target.value })}
                      className="w-full bg-[#0f1118] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    className="accent-[#c5a059]"
                  />
                  <span className="text-white">Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller}
                    onChange={(e) => setProductForm({ ...productForm, isBestSeller: e.target.checked })}
                    className="accent-[#c5a059]"
                  />
                  <span className="text-white">Best Seller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                    className="accent-[#c5a059]"
                  />
                  <span className="text-white">In Stock & Ready</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#1e2330] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-[#171b26] text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#c5a059] hover:bg-[#b59048] text-black font-bold rounded-lg shadow-lg"
                >
                  Save & Publish Suit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: ADD / EDIT CATEGORY --- */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#0f1118] border border-[#2b3346] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-white">
              {editingCategoryId ? 'Edit Category' : 'Create New Category'}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[#cbd5e1] font-medium mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) =>
                    setCategoryForm({
                      ...categoryForm,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                    })
                  }
                  placeholder="e.g. Karandi Luxury"
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#cbd5e1] font-medium mb-1">Slug Identifier</label>
                <input
                  type="text"
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#cbd5e1] font-medium mb-1">Description</label>
                <textarea
                  rows={2}
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-[#cbd5e1] font-medium mb-1">Banner Image URL</label>
                <input
                  type="text"
                  value={categoryForm.image}
                  onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                  placeholder="/src/assets/images/fabric_washing_wear_..."
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#1e2330] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="px-4 py-2 bg-[#171b26] text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!categoryForm.name) return;
                  if (editingCategoryId) {
                    updateCategory(editingCategoryId, categoryForm);
                  } else {
                    addCategory(categoryForm);
                  }
                  setIsCategoryModalOpen(false);
                }}
                className="px-5 py-2 bg-[#c5a059] hover:bg-[#b59048] text-black font-bold rounded-lg"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
