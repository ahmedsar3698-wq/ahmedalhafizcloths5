import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, CheckCircle, ShieldCheck, Truck, MessageCircle, AlertCircle } from 'lucide-react';
import { OrderItem } from '../../types';

const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Hyderabad',
  'Sialkot',
  'Gujranwala',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Larkana',
  'Sheikhupura',
  'Abbottabad',
  'Other City',
];

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    checkoutProductDirect,
    setCheckoutProductDirect,
    settings,
    createOrder,
    addToast,
    createWhatsAppLink,
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [city, setCity] = useState('Karachi');
  const [address, setAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery (COD)' | 'Bank Transfer / JazzCash' | 'WhatsApp Direct Order'>(
    'Cash on Delivery (COD)'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  if (!isCheckoutOpen) return null;

  // Determine items to checkout (either direct Buy Now single item or entire Cart)
  const isDirectBuy = Boolean(checkoutProductDirect);
  const items: OrderItem[] = isDirectBuy
    ? [
        {
          productId: checkoutProductDirect!.product.id,
          productName: checkoutProductDirect!.product.name,
          price: checkoutProductDirect!.product.price,
          quantity: checkoutProductDirect!.quantity,
          color: checkoutProductDirect!.color.name,
          image: checkoutProductDirect!.product.thumbnail || checkoutProductDirect!.product.images[0],
        },
      ]
    : cart.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        color: i.selectedColor.name,
        image: i.product.thumbnail || i.product.images[0],
      }));

  const subtotal = isDirectBuy
    ? checkoutProductDirect!.product.price * checkoutProductDirect!.quantity
    : cartSubtotal;

  const isKarachi = city.trim().toLowerCase() === 'karachi';
  const deliveryCharge = isKarachi ? 0 : settings.otherCitiesDeliveryFee;
  const total = subtotal + deliveryCharge;

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCheckoutProductDirect(null);
    setCompletedOrder(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      addToast('Missing Details', 'Please fill in your name, contact phone, and delivery address.', 'error');
      return;
    }

    setIsSubmitting(true);

    const actualWhatsapp = whatsappNumber.trim() ? whatsappNumber.trim() : phone.trim();

    const newOrder = createOrder({
      customerName,
      phone,
      whatsappNumber: actualWhatsapp,
      city,
      address,
      specialInstructions,
      items,
      subtotal,
      deliveryCharge,
      total,
      paymentMethod,
      status: 'Pending',
    });

    if (!isDirectBuy) {
      clearCart();
    }

    setCompletedOrder(newOrder);
    setIsSubmitting(false);
    addToast('Order Placed Successfully', `Order #${newOrder.orderNumber} confirmed!`, 'success');

    // Generate WhatsApp notification for customer to notify the brand
    const whatsappMsg = `*NEW ORDER CONFIRMATION - ${newOrder.orderNumber}*
━━━━━━━━━━━━━━━━━━━━
*Customer Name:* ${customerName}
*Phone / WhatsApp:* ${actualWhatsapp}
*City:* ${city} (${isKarachi ? 'FREE DELIVERY IN KARACHI' : 'Standard Delivery'})
*Delivery Address:* ${address}
${specialInstructions ? `*Notes:* ${specialInstructions}\n` : ''}
*Ordered Suits:*
${items.map((it, idx) => `${idx + 1}. ${it.productName} (${it.color}) × ${it.quantity} = Rs. ${(it.price * it.quantity).toLocaleString('en-PK')}`).join('\n')}

*Subtotal:* Rs. ${subtotal.toLocaleString('en-PK')}
*Delivery Fee:* ${deliveryCharge === 0 ? 'FREE (Karachi)' : `Rs. ${deliveryCharge}`}
*Total Amount:* Rs. ${total.toLocaleString('en-PK')}
*Payment Method:* ${paymentMethod}

Please confirm dispatch from AL HAFIZ CLOTHS Karachi.`;

    // Prompt customer to open WhatsApp to send confirmation
    setTimeout(() => {
      const url = createWhatsAppLink(whatsappMsg);
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0f1118] border border-[#2b3346] rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 bg-[#131620] border-b border-[#222838] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-white">
              {completedOrder ? 'Order Confirmation' : 'Complete Delivery & Order Details'}
            </h2>
            <p className="text-xs text-[#9ca3af]">
              {completedOrder
                ? `Thank you for shopping with AL HAFIZ CLOTHS!`
                : 'Free Delivery in Karachi · Cash on Delivery & WhatsApp order confirmation'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#9ca3af] hover:text-white rounded-lg transition-colors"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {completedOrder ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a059]">
                Order Received
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                Order #{completedOrder.orderNumber}
              </h3>
              <p className="text-xs text-[#94a3b8] max-w-md mx-auto mt-2 leading-relaxed">
                Assalam-o-Alaikum, <strong className="text-white">{completedOrder.customerName}</strong>! Your unstitched suit order has been placed successfully and dispatched to our Karachi packing team.
              </p>
            </div>

            <div className="bg-[#141722] p-4 rounded-xl border border-[#212738] text-left text-xs max-w-md mx-auto space-y-2">
              <div className="flex justify-between text-[#9ca3af]">
                <span>Delivery City:</span>
                <span className="text-white font-medium">{completedOrder.city}</span>
              </div>
              <div className="flex justify-between text-[#9ca3af]">
                <span>Delivery Address:</span>
                <span className="text-white font-medium text-right truncate max-w-[200px]">
                  {completedOrder.address}
                </span>
              </div>
              <div className="flex justify-between text-[#9ca3af]">
                <span>Suits Ordered:</span>
                <span className="text-white font-medium">
                  {completedOrder.items.length} suit(s)
                </span>
              </div>
              <div className="flex justify-between text-[#9ca3af]">
                <span>Total Amount to Pay:</span>
                <span className="text-[#c5a059] font-bold tabular-nums">
                  Rs. {completedOrder.total.toLocaleString('en-PK')} ({completedOrder.paymentMethod})
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2 max-w-md mx-auto">
              <a
                href={createWhatsAppLink(
                  `Assalam-o-Alaikum AL HAFIZ CLOTHS, checking status of my Order #${completedOrder.orderNumber}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs rounded-lg transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open Order Details in WhatsApp</span>
              </a>

              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-[#1a1f2e] hover:bg-[#252c3f] text-white text-xs font-semibold rounded-lg border border-[#2b3346] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Delivery Alert Banner */}
            <div className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
              isKarachi
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                : 'bg-[#181d2a] border-[#293246] text-[#cbd5e1]'
            }`}>
              <div className="flex items-center gap-2">
                <Truck className={`w-4 h-4 ${isKarachi ? 'text-emerald-400' : 'text-[#c5a059]'}`} />
                <span>
                  {isKarachi ? (
                    <strong>FREE DELIVERY IN KARACHI applied!</strong>
                  ) : (
                    <span>Nationwide Delivery: <strong>Rs. {settings.otherCitiesDeliveryFee}</strong></span>
                  )}
                </span>
              </div>
              <span className="text-[11px] font-semibold uppercase">
                {isKarachi ? '0 PKR Shipping' : 'Standard Courier'}
              </span>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#cbd5e1] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Muhammad Ahmed"
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#cbd5e1] mb-1">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="text"
                  required
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="e.g. 0326-2444991"
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#cbd5e1] mb-1">
                  Alternative Phone Number *
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0300-1234567"
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#cbd5e1] mb-1">
                  City (Karachi = Free Delivery) *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                >
                  {PAKISTAN_CITIES.map((c) => (
                    <option key={c} value={c} className="bg-[#141722] text-white">
                      {c} {c === 'Karachi' ? '(FREE Delivery)' : `(+Rs. ${settings.otherCitiesDeliveryFee})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#cbd5e1] mb-1">
                Complete Delivery Address (House / Shop / Street / Area) *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House # 12, Street 4, Block B, Gulshan-e-Iqbal, Karachi"
                className="w-full bg-[#141722] border border-[#282f42] rounded-lg p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#cbd5e1] mb-1">
                Special Delivery Notes (Optional)
              </label>
              <input
                type="text"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Call before arrival, leave with security"
                className="w-full bg-[#141722] border border-[#282f42] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#cbd5e1] mb-2">
                Select Payment Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    id: 'Cash on Delivery (COD)',
                    label: 'Cash on Delivery',
                    sub: 'Pay when fabric arrives',
                  },
                  {
                    id: 'WhatsApp Direct Order',
                    label: 'Order via WhatsApp',
                    sub: 'Confirm on +92-326-2444991',
                  },
                  {
                    id: 'Bank Transfer / JazzCash',
                    label: 'Online / JazzCash',
                    sub: 'Direct bank transfer',
                  },
                ].map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === m.id
                        ? 'border-[#c5a059] bg-[#1a1f2e] text-white ring-1 ring-[#c5a059]'
                        : 'border-[#222838] bg-[#141722] text-[#9ca3af] hover:border-gray-500'
                    }`}
                  >
                    <span className="block text-xs font-semibold text-white">{m.label}</span>
                    <span className="block text-[10px] text-[#94a3b8] mt-0.5">{m.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-[#141722] p-4 rounded-xl border border-[#222838] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#9ca3af]">
                <span>Suits Subtotal ({items.length} item(s)):</span>
                <span className="text-white font-medium tabular-nums">
                  Rs. {subtotal.toLocaleString('en-PK')}
                </span>
              </div>
              <div className="flex justify-between text-[#9ca3af]">
                <span>Delivery Charges ({city}):</span>
                <span className={`font-semibold ${isKarachi ? 'text-emerald-400' : 'text-white'}`}>
                  {isKarachi ? 'FREE (Karachi Special)' : `Rs. ${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#202738]">
                <span>Total Amount to Pay:</span>
                <span className="text-[#c5a059] tabular-nums">
                  Rs. {total.toLocaleString('en-PK')}
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#c5a059] hover:bg-[#b59048] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Confirming Order...' : 'Confirm Order & Place Booking'}</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#64748b] text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Capry Guarantee · Open & Check Fabric Quality Before Stitching</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
