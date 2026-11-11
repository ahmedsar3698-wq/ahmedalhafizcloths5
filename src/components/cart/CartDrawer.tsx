import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartTotalCount,
    settings,
    createWhatsAppLink,
  } = useStore();

  if (!isCartOpen) return null;

  // WhatsApp formatted string for entire cart
  const handleOrderCartOnWhatsApp = () => {
    let msg = `*AL HAFIZ CLOTHS - CART ORDER*
━━━━━━━━━━━━━━━━━━━━
Assalam-o-Alaikum, I want to order the following suits:

`;
    cart.forEach((item, index) => {
      msg += `*${index + 1}. ${item.product.name}*\n`;
      msg += `   • Shade: ${item.selectedColor.name}\n`;
      msg += `   • Qty: ${item.quantity} Suit(s)\n`;
      msg += `   • Price: Rs. ${item.product.price.toLocaleString('en-PK')} each\n`;
      msg += `   • Subtotal: Rs. ${(item.product.price * item.quantity).toLocaleString('en-PK')}\n\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Total Fabric Items:* ${cartTotalCount} Suit(s)\n`;
    msg += `*Cart Total:* Rs. ${cartSubtotal.toLocaleString('en-PK')}\n`;
    msg += `*Delivery Note:* FREE DELIVERY IN KARACHI (or Rs. ${settings.otherCitiesDeliveryFee} other cities)\n\n`;
    msg += `Please send me the payment & delivery confirmation details.`;

    const url = createWhatsAppLink(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f1118] border-l border-[#242938] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#1f2535] flex items-center justify-between bg-[#131620]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
              <h2 className="text-base font-semibold text-white font-serif">
                Shopping Bag ({cartTotalCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#9ca3af] hover:text-white rounded-lg transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-[#9ca3af]">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#161a25] border border-[#2a3042] flex items-center justify-center text-[#64748b]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-semibold text-white">Your bag is empty</p>
                <p className="text-xs mt-1 text-[#64748b]">
                  Discover premium unstitched Pakistani suits starting from Rs. 1,500.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 py-2.5 px-6 bg-[#c5a059] hover:bg-[#b59048] text-black text-xs font-bold rounded-lg transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                <div className="bg-[#141722] p-3 rounded-xl border border-[#202738] flex items-center gap-2.5 text-xs text-[#94a3b8]">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong className="text-white">FREE DELIVERY IN KARACHI</strong> applies to all orders!
                  </span>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => {
                    const img = item.product.thumbnail || item.product.images[0];
                    return (
                      <div
                        key={`${item.product.id}-${item.selectedColor.name}`}
                        className="bg-[#141722] border border-[#212738] rounded-xl p-3 flex gap-3 items-center"
                      >
                        <img
                          src={img}
                          alt={item.product.name}
                          className="w-18 h-18 rounded-lg object-cover bg-black shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-[#9ca3af] mt-0.5">
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              {item.selectedColor.name}
                            </span>
                            <span>·</span>
                            <span className="text-[#c5a059]">{item.product.fabricType}</span>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-bold text-white tabular-nums">
                              Rs. {(item.product.price * item.quantity).toLocaleString('en-PK')}
                            </span>

                            <div className="flex items-center border border-[#2e374c] rounded-md bg-[#0f1118]">
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.selectedColor.name, -1)}
                                className="px-2 py-0.5 text-xs text-[#9ca3af] hover:text-white"
                              >
                                -
                              </button>
                              <span className="px-2 py-0.5 text-xs font-semibold text-white tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.selectedColor.name, 1)}
                                className="px-2 py-0.5 text-xs text-[#9ca3af] hover:text-white"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor.name)}
                          className="p-1.5 text-[#64748b] hover:text-rose-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#1f2535] bg-[#12151e] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#9ca3af]">
                  <span>Subtotal ({cartTotalCount} suits):</span>
                  <span className="text-white font-semibold tabular-nums">
                    Rs. {cartSubtotal.toLocaleString('en-PK')}
                  </span>
                </div>
                <div className="flex justify-between text-[#9ca3af]">
                  <span>Karachi Delivery:</span>
                  <span className="text-emerald-400 font-semibold uppercase">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#202738]">
                  <span>Total Amount:</span>
                  <span className="text-[#c5a059] tabular-nums">
                    Rs. {cartSubtotal.toLocaleString('en-PK')}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onProceedToCheckout();
                  }}
                  className="w-full py-3 bg-[#c5a059] hover:bg-[#b59048] text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleOrderCartOnWhatsApp}
                  className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Entire Bag on WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#64748b] text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Capry Guarantee & Cash on Delivery Available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
