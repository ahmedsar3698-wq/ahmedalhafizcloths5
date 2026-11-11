import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Truck, ShieldCheck, RotateCcw, Lock, CheckCircle2 } from 'lucide-react';

export const PolicyPage: React.FC = () => {
  const { settings } = useStore();
  const [activeTab, setActiveTab] = useState<'delivery' | 'returns' | 'capry' | 'privacy'>('delivery');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c5a059]">
          Store Terms & Guarantees
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
          Policies & Customer Guarantees
        </h1>
        <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
          Transparent, customer-first policies designed to give you 100% confidence when buying premium unstitched fabrics.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-[#0e1017] rounded-xl border border-[#1e2330] overflow-x-auto">
        <button
          onClick={() => setActiveTab('delivery')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'delivery'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'text-[#9ca3af] hover:text-white'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Delivery Terms</span>
        </button>

        <button
          onClick={() => setActiveTab('returns')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'returns'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'text-[#9ca3af] hover:text-white'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Exchange & Returns</span>
        </button>

        <button
          onClick={() => setActiveTab('capry')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'capry'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'text-[#9ca3af] hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Capry Guarantee</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'privacy'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'text-[#9ca3af] hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Privacy & Security</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-[#0e1017] border border-[#1e2330] rounded-2xl p-6 sm:p-10 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed space-y-6">
        {activeTab === 'delivery' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">FREE DELIVERY IN KARACHI</h3>
                <p className="text-xs text-emerald-300 mt-0.5">
                  We proudly offer zero-cost doorstep shipping for all addresses located within Karachi.
                </p>
              </div>
              <span className="text-xs font-bold bg-emerald-500 text-black px-2.5 py-1 rounded">
                Rs. 0 Shipping
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-bold text-white font-serif">Karachi Delivery Schedule:</h4>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-[#9ca3af]">
                <li><strong>Dispatch:</strong> Same-day or next-day dispatch from our Karachi warehouse.</li>
                <li><strong>Delivery Window:</strong> 24 to 48 hours within all Karachi zones (Clifton, DHA, Gulshan, Nazimabad, Malir, PECHS, North Karachi, Saddar, etc.).</li>
                <li><strong>Payment:</strong> Cash on Delivery (COD) accepted upon rider arrival.</li>
              </ul>
            </div>

            <div className="space-y-3 pt-3 border-t border-[#1a1f2b]">
              <h4 className="text-base font-bold text-white font-serif">Nationwide Shipping (Other Pakistani Cities):</h4>
              <p className="text-xs text-[#9ca3af]">
                For cities outside Karachi (Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, etc.), we charge a flat subsidized courier fee of <strong>Rs. {settings.otherCitiesDeliveryFee}</strong> per order regardless of parcel weight.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-[#9ca3af]">
                <li>Courier partners: Trax, Leopard, TCS, or Call Courier.</li>
                <li>Delivery time: 2 to 4 business days. Tracking numbers provided on WhatsApp.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white font-serif">
              7-Day Hassle-Free Exchange Policy
            </h3>
            <p className="text-xs text-[#9ca3af]">
              At AL HAFIZ CLOTHS, customer trust is our highest priority. We want you to be completely satisfied with your unstitched fabric suit.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#121520] border border-[#202738] space-y-2">
                <span className="text-xs font-bold text-[#c5a059] block">Eligible For Exchange:</span>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#9ca3af]">
                  <li>Cloth must be unstitched and uncut.</li>
                  <li>Original tags and packaging preserved.</li>
                  <li>Reported within 7 days of package delivery.</li>
                  <li>Color or shade difference from preference.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#121520] border border-[#202738] space-y-2">
                <span className="text-xs font-bold text-rose-400 block">Not Eligible:</span>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#9ca3af]">
                  <li>Fabric that has already been cut by your tailor.</li>
                  <li>Stitched garments or altered fabric.</li>
                  <li>Damage caused by bleach or chemical treatment.</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#141824] border border-[#2a344d] text-xs">
              <strong className="text-white block mb-1">How to initiate an exchange:</strong>
              Send a WhatsApp photo of your parcel to <strong className="text-[#25D366]">{settings.whatsappDisplay}</strong> with your Order Number. Our Karachi team will arrange a replacement immediately.
            </div>
          </div>
        )}

        {activeTab === 'capry' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white font-serif">
              The AL HAFIZ "Capry Guarantee"
            </h3>
            <p className="text-xs text-[#9ca3af]">
              {settings.defaultCapryGuaranteeText}
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Anti-Linting (Zero Burr):</strong> We guarantee our pure cotton and washing wear will not produce annoying fabric bobbles or fluff.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Color Retention:</strong> Spun with deep-penetration reactive dyes that maintain their vibrancy wash after wash.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Controlled Shrinkage:</strong> Fabric is thermally pre-treated to keep dimensions intact after tailoring.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-serif">
              Customer Data Privacy Policy
            </h3>
            <p className="text-xs text-[#9ca3af]">
              AL HAFIZ CLOTHS values your privacy. We only collect the minimal information necessary to deliver your unstitched suits and confirm your order:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-[#9ca3af]">
              <li>Your Name, WhatsApp number, and delivery address are exclusively shared with our delivery riders and courier partners (TCS/Trax).</li>
              <li>We never sell, rent, or trade your contact details with any third-party marketing companies.</li>
              <li>Order records are securely stored on encrypted servers with Row Level Security (RLS).</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
