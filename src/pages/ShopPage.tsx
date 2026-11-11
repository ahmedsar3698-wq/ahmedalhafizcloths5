import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { Category, Product, ProductColor } from '../types';
import { Search, SlidersHorizontal, X, ShieldCheck, Check, Sparkles, Filter } from 'lucide-react';

interface ShopPageProps {
  onViewProduct: (product: Product) => void;
  initialCategorySlug?: string;
  onClearInitialCategory?: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onViewProduct,
  initialCategorySlug,
  onClearInitialCategory,
}) => {
  const { products, categories } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug || 'all');
  const [selectedFabricType, setSelectedFabricType] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [minPrice, setMinPrice] = useState<number>(1500);
  const [onlyCapryGuarantee, setOnlyCapryGuarantee] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync if initialCategorySlug changes
  React.useEffect(() => {
    if (initialCategorySlug) {
      setSelectedCategory(initialCategorySlug);
    }
  }, [initialCategorySlug]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedFabricType('all');
    setMinPrice(1500);
    setMaxPrice(5000);
    setOnlyCapryGuarantee(false);
    setSortBy('featured');
    if (onClearInitialCategory) {
      onClearInitialCategory();
    }
  };

  // Filter and Sort Pipeline
  const filteredProducts = useMemo(() => {
    return products
      .filter((p: Product) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchFabric = p.fabricType.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchColor = p.colors?.some((c: ProductColor) => c.name.toLowerCase().includes(q));
          if (!matchName && !matchFabric && !matchDesc && !matchColor) return false;
        }

        // Category filter
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'new-arrivals') {
            if (!p.isNewArrival) return false;
          } else if (selectedCategory === 'best-sellers') {
            if (!p.isBestSeller) return false;
          } else if (p.categoryId !== selectedCategory) {
            return false;
          }
        }

        // Fabric Type filter
        if (selectedFabricType !== 'all') {
          if (p.fabricType !== selectedFabricType) return false;
        }

        // Price range
        if (p.price < minPrice || p.price > maxPrice) {
          return false;
        }

        // Capry Guarantee
        if (onlyCapryGuarantee && !p.capryGuarantee) {
          return false;
        }

        return true;
      })
      .sort((a: Product, b: Product) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
        // Default featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, searchQuery, selectedCategory, selectedFabricType, minPrice, maxPrice, onlyCapryGuarantee, sortBy]);

  const activeCategoryObj = categories.find((c: Category) => c.slug === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0e1017] border border-[#202534] rounded-2xl p-6 sm:p-10 relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold">
            {activeCategoryObj ? `Category: ${activeCategoryObj.name}` : 'Unstitched Fabric Catalog'}
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white">
            {activeCategoryObj ? activeCategoryObj.name : "Men's Unstitched Suits & Luxury Fabrics"}
          </h1>
          <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
            {activeCategoryObj?.description ||
              'Explore premium Pakistani men\'s unstitched suits. Guaranteed 4.5 gaz full suit cutting, 54" bara arzz, and free delivery in Karachi.'}
          </p>
        </div>
      </div>

      {/* Search and Quick Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by fabric, color (Navy, White...), or collection..."
            className="w-full bg-[#121520] border border-[#252c3e] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Sort & Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-2 px-3.5 py-2.5 bg-[#141722] border border-[#242b3b] rounded-xl text-xs text-white font-medium"
          >
            <Filter className="w-4 h-4 text-[#c5a059]" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#9ca3af] whitespace-nowrap hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#121520] border border-[#252c3e] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
            >
              <option value="featured">Featured & Best Picks</option>
              <option value="price-asc">Price: Low to High (Rs.)</option>
              <option value="price-desc">Price: High to Low (Rs.)</option>
              <option value="newest">Newest Arrivals</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main 2-Column Catalog Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar (Desktop & Mobile Drawer) */}
        <aside
          className={`md:col-span-3 space-y-6 bg-[#0e1017] p-5 rounded-2xl border border-[#1e2330] ${
            mobileFilterOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#1d222e]">
            <h3 className="font-serif text-sm font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#c5a059]" />
              Filter Collection
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-[#c5a059] hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Categories Filter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-2.5">
              Categories
            </h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-[#1a1f2e] text-[#c5a059] font-semibold'
                    : 'text-[#cbd5e1] hover:bg-[#141722]'
                }`}
              >
                <span>All Unstitched Suits</span>
                <span className="text-[10px] text-[#64748b]">{products.length}</span>
              </button>
              {categories.map((c: Category) => {
                const count = products.filter((p: Product) => p.categoryId === c.slug).length;
                const isSelected = selectedCategory === c.slug;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#1a1f2e] text-[#c5a059] font-semibold'
                        : 'text-[#cbd5e1] hover:bg-[#141722]'
                    }`}
                  >
                    <span className="truncate">{c.name}</span>
                    <span className="text-[10px] text-[#64748b]">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fabric Type Selector */}
          <div className="pt-3 border-t border-[#1d222e]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-2.5">
              Fabric Weave
            </h4>
            <div className="space-y-1 text-xs">
              {['all', 'Washing Wear', 'Pure Cotton', 'Mix Cotton', 'Other Fabric'].map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFabricType(f)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedFabricType === f
                      ? 'bg-[#1a1f2e] text-[#c5a059] font-semibold'
                      : 'text-[#cbd5e1] hover:bg-[#141722]'
                  }`}
                >
                  <span>{f === 'all' ? 'All Weaves' : f}</span>
                  {selectedFabricType === f && <Check className="w-3.5 h-3.5 text-[#c5a059]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider (Rs. 1,500 – Rs. 5,000) */}
          <div className="pt-3 border-t border-[#1d222e]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                Price In PKR
              </h4>
              <span className="text-xs font-bold text-[#c5a059] tabular-nums">
                Up to Rs. {maxPrice.toLocaleString('en-PK')}
              </span>
            </div>
            <input
              type="range"
              min={1500}
              max={5000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#c5a059] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#64748b] mt-1 tabular-nums">
              <span>Rs. 1,500</span>
              <span>Rs. 5,000</span>
            </div>
          </div>

          {/* Capry Guarantee Toggle */}
          <div className="pt-3 border-t border-[#1d222e]">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#e5e7eb]">
              <input
                type="checkbox"
                checked={onlyCapryGuarantee}
                onChange={(e) => setOnlyCapryGuarantee(e.target.checked)}
                className="w-4 h-4 rounded accent-[#c5a059]"
              />
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                Capry Guarantee Only
              </span>
            </label>
          </div>

          {/* Delivery Note */}
          <div className="pt-3 border-t border-[#1d222e] text-[11px] text-[#94a3b8] bg-[#121520] p-3 rounded-xl border border-[#222838]">
            <span className="text-emerald-400 font-semibold block mb-0.5">
              FREE DELIVERY IN KARACHI
            </span>
            All orders delivered to your doorstep in Karachi with zero delivery charges.
          </div>
        </aside>

        {/* Right Product Grid */}
        <div className="md:col-span-9 space-y-6">
          {/* Active Filter Chips */}
          <div className="flex items-center justify-between text-xs text-[#9ca3af]">
            <span>
              Showing <strong className="text-white">{filteredProducts.length}</strong> unstitched suit(s)
            </span>
            {(selectedCategory !== 'all' || selectedFabricType !== 'all' || searchQuery || onlyCapryGuarantee) && (
              <button
                onClick={handleResetFilters}
                className="text-[#c5a059] hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-[#0e1017] border border-[#1e2330] rounded-2xl p-8">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#141722] border border-[#262c3e] flex items-center justify-center text-[#64748b]">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">No Suits Match Your Filter</h3>
              <p className="text-xs text-[#94a3b8] mt-1 max-w-sm mx-auto">
                Try adjusting your price range or clearing category filters to explore the rest of our unstitched suits.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-5 py-2.5 bg-[#c5a059] text-black font-semibold text-xs rounded-lg hover:bg-[#b59048] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
