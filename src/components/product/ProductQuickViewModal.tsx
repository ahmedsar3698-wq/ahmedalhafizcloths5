import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductColor } from '../../types';
import { X, ShoppingBag, MessageCircle, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface ProductQuickViewModalProps {
  onGoToDetail: (product: any) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ onGoToDetail }) => {
  const { quickViewProduct, setQuickViewProduct, addToCart, createProductWhatsAppOrder } = useStore();
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const currentColor = selectedColor || quickViewProduct.colors[0] || { name: 'Standard', hex: '#374151' };
  const currentImage = quickViewProduct.images?.[activeImageIndex] || quickViewProduct.thumbnail;

  const handleClose = () => {
    setQuickViewProduct(null);
    setActiveImageIndex(0);
    setSelectedColor(null);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentColor, quantity);
    handleClose();
  };

  const handleWhatsAppOrder = () => {
    createProductWhatsAppOrder(quickViewProduct, currentColor.name, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0f1118] border border-[#2b3346] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 text-[#9ca3af] hover:text-white bg-[#0b0c10]/80 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery on Left */}
        <div className="w-full md:w-1/2 p-5 bg-[#141722] flex flex-col justify-between">
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black relative">
            <img
              src={currentImage}
              alt={quickViewProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {quickViewProduct.capryGuarantee && (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-black/80 text-[#f5ebd0] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#c5a059]/40">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                Capry Guarantee
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {quickViewProduct.images && quickViewProduct.images.length > 1 && (
            <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#c5a059] ring-2 ring-[#c5a059]/40'
                      : 'border-[#283042] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details on Right */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#c5a059] font-medium tracking-wider uppercase mb-1">
              <span>{quickViewProduct.fabricType}</span>
              <span>·</span>
              <span>{quickViewProduct.season}</span>
            </div>

            <h2 className="font-serif text-xl font-bold text-white mb-2 leading-snug">
              {quickViewProduct.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-bold text-white tabular-nums">
                Rs. {quickViewProduct.price.toLocaleString('en-PK')}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-[#64748b] line-through tabular-nums">
                  Rs. {quickViewProduct.originalPrice.toLocaleString('en-PK')}
                </span>
              )}
              <span className="text-[11px] text-emerald-400 font-semibold ml-auto">
                FREE DELIVERY IN KARACHI
              </span>
            </div>

            <p className="text-xs text-[#94a3b8] leading-relaxed mb-4 line-clamp-3">
              {quickViewProduct.description}
            </p>

            {/* Fabric Specs */}
            <div className="p-3 bg-[#141722] rounded-xl border border-[#222838] grid grid-cols-2 gap-2 text-xs text-[#cbd5e1] mb-4">
              <div>
                <span className="text-[#64748b] block text-[10px]">Cutting:</span>
                <span className="font-medium text-white">{quickViewProduct.cutting}</span>
              </div>
              <div>
                <span className="text-[#64748b] block text-[10px]">Width (Arzz):</span>
                <span className="font-medium text-white">{quickViewProduct.width}</span>
              </div>
            </div>

            {/* Color Swatches */}
            {quickViewProduct.colors && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#9ca3af] font-medium">
                    Shade ({quickViewProduct.colors.length}):
                  </span>
                  <span className="text-white font-semibold truncate max-w-[180px] text-right">{currentColor.name}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap max-h-32 overflow-y-auto p-1 border border-[#212738] rounded-lg bg-[#0d0f16]">
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] border transition-all ${
                        currentColor.name === c.name
                          ? 'border-[#c5a059] bg-[#1a1f2e] text-white ring-1 ring-[#c5a059]'
                          : 'border-[#262c3d] text-[#9ca3af] hover:border-gray-500'
                      }`}
                      title={c.name}
                    >
                      <span className="w-3 h-3 rounded-full border border-black/40 shrink-0" style={{ backgroundColor: c.hex }} />
                      <span className="truncate max-w-[110px]">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs text-[#9ca3af] font-medium">Quantity (Suits):</span>
              <div className="flex items-center border border-[#2b3346] rounded-lg bg-[#141722]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-white hover:text-[#c5a059] text-sm"
                >
                  -
                </button>
                <span className="px-3 py-1 text-white text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-white hover:text-[#c5a059] text-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 border-t border-[#1f2535]">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAddToCart}
                className="py-2.5 px-4 bg-[#1b202d] hover:bg-[#c5a059] hover:text-black text-white text-xs font-semibold rounded-lg border border-[#2f384d] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </button>
            </div>

            <button
              onClick={() => {
                handleClose();
                onGoToDetail(quickViewProduct);
              }}
              className="w-full text-center py-1.5 text-xs text-[#c5a059] hover:underline"
            >
              View Full Suit Specifications & Care Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
