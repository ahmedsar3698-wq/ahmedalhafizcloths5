import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductColor } from '../types';
import { ProductCard } from '../components/product/ProductCard';
import {
  ShieldCheck,
  Truck,
  MessageCircle,
  ShoppingBag,
  Check,
  RotateCcw,
  Scissors,
  Sparkles,
  Star,
  Info,
  ChevronLeft,
  Share2,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onViewProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onViewProduct,
}) => {
  const {
    products,
    addToCart,
    setCheckoutProductDirect,
    setIsCheckoutOpen,
    createProductWhatsAppOrder,
    settings,
    addToast,
  } = useStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors?.[0] || { name: 'Standard', hex: '#374151', inStock: true }
  );
  const [quantity, setQuantity] = useState(1);

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.thumbnail || '/src/assets/images/fabric_washing_wear_1794403306958.jpg'];

  const currentImage = images[selectedImageIndex] || images[0];

  // Related products from same category
  const relatedProducts = products
    .filter((p: Product) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    setCheckoutProductDirect({
      product,
      color: selectedColor,
      quantity,
    });
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppOrder = () => {
    createProductWhatsAppOrder(product, selectedColor.name, quantity);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Link Copied', 'Product link copied to clipboard', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-[#9ca3af]">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white hover:text-[#c5a059] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="flex items-center gap-2">
          <span>{product.categoryName}</span>
          <span>/</span>
          <span className="text-[#c5a059] truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Main Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Sticky Image Gallery */}
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-28">
          {/* Main Visual */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#121520] border border-[#23293a] relative group shadow-2xl">
            <img
              src={currentImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.capryGuarantee && (
                <span className="inline-flex items-center gap-1.5 bg-black/85 backdrop-blur-md text-[#f5ebd0] text-xs font-semibold px-3 py-1 rounded-md border border-[#c5a059]/40 shadow-md">
                  <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                  Capry Guarantee
                </span>
              )}
              {product.qualityBadge && (
                <span className="bg-[#c5a059] text-black text-xs font-bold px-3 py-1 rounded-md shadow-md">
                  {product.qualityBadge}
                </span>
              )}
            </div>

            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 bg-black/70 hover:bg-[#c5a059] hover:text-black text-white rounded-lg transition-colors backdrop-blur-sm"
              title="Share Suit"
              aria-label="Share Suit Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Multiple Image Gallery Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#c5a059] ring-2 ring-[#c5a059]/50 shadow-lg'
                      : 'border-[#262c3e] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Karachi Free Delivery & COD Banner */}
          <div className="p-4 rounded-xl bg-[#0f121a] border border-[#222838] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">FREE DELIVERY IN KARACHI</h4>
                <p className="text-[#94a3b8] text-[11px] mt-0.5">
                  Doorstep delivery across all areas of Karachi. Flat Rs. {settings.otherCitiesDeliveryFee} nationwide.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#cbd5e1] font-medium shrink-0">
              <RotateCcw className="w-4 h-4 text-[#c5a059]" />
              <span>7-Day Return/Exchange</span>
            </div>
          </div>
        </div>

        {/* Right: Purchase & Specifications Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-[#c5a059] font-medium tracking-widest uppercase">
              <span>{product.fabricType}</span>
              <span>·</span>
              <span>{product.season}</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold">In Stock</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-[#121520] border border-[#242b3c] flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#9ca3af] block">Price (PKR):</span>
                <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  Rs. {product.price.toLocaleString('en-PK')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-[#64748b] line-through ml-2 tabular-nums">
                    Rs. {product.originalPrice.toLocaleString('en-PK')}
                  </span>
                )}
              </div>

              <div className="text-right">
                <span className="text-[11px] text-[#c5a059] font-semibold block">
                  Complete Unstitched Suit
                </span>
                <span className="text-[11px] text-[#9ca3af]">
                  Includes Matching Buttons
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9ca3af] font-medium">
                  Select Shade <span className="text-[#c5a059]">({product.colors.length} Available)</span>:
                </span>
                <span className="text-white font-bold truncate max-w-[200px] text-right">{selectedColor.name}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto p-1 border border-[#212738] rounded-xl bg-[#0d0f16]">
                {product.colors.map((c: ProductColor) => {
                  const isSelected = selectedColor.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs border transition-all text-left ${
                        isSelected
                          ? 'border-[#c5a059] bg-[#1a1f2e] text-white ring-1 ring-[#c5a059]'
                          : 'border-[#242b3b] bg-[#121520] text-[#cbd5e1] hover:border-gray-500'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/40 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="truncate text-[11px]">{c.name}</span>
                      {isSelected && <Check className="w-3 h-3 text-[#c5a059] shrink-0 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs text-[#9ca3af] font-medium">Number of Suits:</span>
            <div className="flex items-center border border-[#2e374c] rounded-xl bg-[#121520]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-1.5 text-white hover:text-[#c5a059] text-sm"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-white text-sm font-semibold tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-1.5 text-white hover:text-[#c5a059] text-sm"
              >
                +
              </button>
            </div>
            <span className="text-xs text-[#9ca3af] tabular-nums">
              Total: Rs. {(product.price * quantity).toLocaleString('en-PK')}
            </span>
          </div>

          {/* Action CTAs: Add to Cart, Buy Now, Order on WhatsApp */}
          <div className="space-y-2.5 pt-4 border-t border-[#1f2535]">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="py-3.5 px-4 bg-[#181d2a] hover:bg-[#22293b] text-white text-xs font-semibold uppercase tracking-wider rounded-xl border border-[#2b3346] hover:border-[#c5a059] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3.5 px-4 bg-[#c5a059] hover:bg-[#b59048] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Buy Now (COD)</span>
              </button>
            </div>

            {/* Direct WhatsApp Order Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp: {settings.whatsappDisplay}</span>
            </button>
          </div>

          {/* Technical Suit Specifications */}
          <div className="rounded-2xl bg-[#0f1118] border border-[#212738] p-5 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-cinzel">
              Suit Specifications
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs text-[#cbd5e1]">
              <div className="p-2.5 rounded-lg bg-[#141722] border border-[#1e2330]">
                <span className="text-[#64748b] block text-[10px]">Cutting Length:</span>
                <span className="font-semibold text-white">{product.cutting}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141722] border border-[#1e2330]">
                <span className="text-[#64748b] block text-[10px]">Fabric Width (Arzz):</span>
                <span className="font-semibold text-white">{product.width}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141722] border border-[#1e2330]">
                <span className="text-[#64748b] block text-[10px]">Season Suitability:</span>
                <span className="font-semibold text-white">{product.season}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141722] border border-[#1e2330]">
                <span className="text-[#64748b] block text-[10px]">Quality Seal:</span>
                <span className="font-semibold text-[#c5a059]">{product.qualityBadge || 'Premium Quality'}</span>
              </div>
            </div>
          </div>

          {/* Capry Guarantee Highlight Card */}
          {product.capryGuarantee && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#171b26] to-[#12151f] border border-[#c5a059]/30 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#c5a059]">
                <ShieldCheck className="w-4 h-4" />
                <span>Capry Guarantee Active</span>
              </div>
              <p className="text-xs text-[#cbd5e1] leading-relaxed">
                {product.capryGuaranteeText || settings.defaultCapryGuaranteeText}
              </p>
            </div>
          )}

          {/* Fabric Washing & Care Instructions */}
          <div className="space-y-2 text-xs text-[#94a3b8] pt-2">
            <h5 className="font-semibold text-white">Fabric Care Instructions:</h5>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-[#9ca3af]">
              <li>Soak fabric in fresh tap water before first tailor stitching.</li>
              <li>Wash with mild soap or detergent; do not use harsh bleach.</li>
              <li>Dry inside out in shade to preserve deep color vibrancy.</li>
              <li>Iron on medium warm setting while slightly damp.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#1f2535] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold">
                Complete Your Wardrobe
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                More in {product.categoryName}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel: Product) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onViewDetails={onViewProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
