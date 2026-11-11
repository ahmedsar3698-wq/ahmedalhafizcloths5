import React, { useState } from 'react';
import { Product, ProductColor } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, MessageCircle, Eye, Check, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart, createProductWhatsAppOrder, setQuickViewProduct } = useStore();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors && product.colors.length > 0
      ? product.colors[0]
      : { name: 'Standard', hex: '#374151', inStock: true }
  );
  const [imageIndex, setImageIndex] = useState(0);

  const primaryImage = product.images?.[imageIndex] || product.thumbnail || '/src/assets/images/fabric_washing_wear_1794403306958.jpg';
  const hasSecondaryImage = product.images && product.images.length > 1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, 1);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    createProductWhatsAppOrder(product, selectedColor.name, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group bg-[#0f1118] border border-[#1f2433] hover:border-[#c5a059]/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/60 flex flex-col cursor-pointer"
    >
      {/* Image Container with 4:3 Aspect Ratio */}
      <div
        className="relative w-full aspect-[4/3] bg-[#161822] overflow-hidden"
        onMouseEnter={() => hasSecondaryImage && setImageIndex(1)}
        onMouseLeave={() => setImageIndex(0)}
      >
        <img
          src={primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex flex-col gap-1 items-start">
            {product.capryGuarantee && (
              <span className="inline-flex items-center gap-1 bg-[#0b0c11]/85 backdrop-blur-sm border border-[#c5a059]/40 text-[#f5ebd0] text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
                <ShieldCheck className="w-3 h-3 text-[#c5a059]" />
                Capry Guarantee
              </span>
            )}
            {product.qualityBadge && product.qualityBadge !== 'Capry Guaranteed' && (
              <span className="bg-[#c5a059] text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                {product.qualityBadge}
              </span>
            )}
          </div>

          {product.isNewArrival && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              NEW
            </span>
          )}
        </div>

        {/* Quick action overlay buttons */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickView}
            className="p-2 bg-[#0b0d14]/90 hover:bg-[#c5a059] hover:text-black text-white rounded-lg shadow-md transition-colors"
            title="Quick View"
            aria-label="Quick View Fabric"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Cutting Info */}
          <div className="flex items-center justify-between text-[11px] text-[#9ca3af] mb-1.5 font-medium">
            <span className="uppercase tracking-wider text-[#c5a059]">{product.fabricType}</span>
            <span>{product.cutting.split('-')[0].trim()}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-sm sm:text-base font-semibold text-white group-hover:text-[#c5a059] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Price display strictly in PKR */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base sm:text-lg font-bold text-white tabular-nums">
              Rs. {product.price.toLocaleString('en-PK')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#64748b] line-through tabular-nums">
                Rs. {product.originalPrice.toLocaleString('en-PK')}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 flex-wrap">
                {product.colors.slice(0, 7).map((c) => {
                  const isSelected = selectedColor.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColor(c);
                      }}
                      className={`w-3.5 h-3.5 rounded-full border transition-all relative ${
                        isSelected
                          ? 'border-[#c5a059] scale-125 shadow-sm ring-1 ring-[#c5a059]'
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={`${c.name} (${c.inStock ? 'In Stock' : 'Out of Stock'})`}
                      aria-label={`Select ${c.name} color`}
                    >
                      {isSelected && (
                        <Check className="w-2 h-2 text-white absolute inset-0 m-auto drop-shadow" />
                      )}
                    </button>
                  );
                })}
              </div>
              <span className="text-[10px] text-[#c5a059] font-medium whitespace-nowrap">
                {product.colors.length} Shades
              </span>
            </div>
          )}
        </div>

        {/* Dual Actions: Add to Bag + Order on WhatsApp */}
        <div className="mt-4 pt-3 border-t border-[#1a1f2b] grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#171b26] hover:bg-[#c5a059] hover:text-black text-white text-xs font-semibold rounded-lg border border-[#2b3346] hover:border-[#c5a059] transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Add to Bag</span>
          </button>

          <button
            onClick={handleWhatsAppOrder}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs font-bold rounded-lg transition-colors shadow-sm"
            title="Order directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
