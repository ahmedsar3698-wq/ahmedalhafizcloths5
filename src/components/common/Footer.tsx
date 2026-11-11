import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle, Phone, MapPin, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, catSlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings, categories } = useStore();

  return (
    <footer className="bg-[#07080b] border-t border-[#1a1d26] text-[#9ca3af] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 3 Value Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-[#1a1d26]">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0f1118] border border-[#1e222e]">
            <div className="w-12 h-12 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">FREE DELIVERY IN KARACHI</h4>
              <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                Enjoy doorstep free express delivery in Karachi. Flat nationwide shipping across all cities.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0f1118] border border-[#1e222e]">
            <div className="w-12 h-12 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">CAPRY & COLOR GUARANTEE</h4>
              <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                Guaranteed zero burr, no shrinkage and rich color fastness. Check fabric quality before stitching.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0f1118] border border-[#1e222e]">
            <div className="w-12 h-12 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059] shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">7-DAY HASSLE-FREE EXCHANGE</h4>
              <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                Complete peace of mind. Exchange any unstitched fabric suit within 7 days if not 100% satisfied.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full border border-[#c5a059]/50 bg-[#141722] flex items-center justify-center text-[#c5a059]">
                <span className="font-serif font-bold text-base">AH</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white tracking-wider block">
                  AL HAFIZ CLOTHS
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#c5a059] block">
                  Karachi, Pakistan
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[#94a3b8] mb-4">
              Crafting prestigious men's unstitched suits and luxury fabrics. Spun with the highest textile standards in Pure Cotton, Washing Wear, and Mix Cotton varieties.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#cbd5e1]">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Karachi Fabric Hub, Sindh, Pakistan</span>
              </div>
              <div className="flex items-center gap-2 text-[#cbd5e1]">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>{settings.whatsappDisplay}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Fabric Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 font-cinzel">
              Fabric Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('shop', 'washing-wear')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Washing Wear Unstitched Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'pure-cotton')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Pure Cotton Luxury Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'mix-cotton')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Mix Cotton Everyday Fabrics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'premium-unstitched-suits')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Premium Unstitched Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'other-fabrics')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Boski Feel & Special Varieties
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#c5a059] text-[#c5a059] transition-colors font-medium"
                >
                  View All Collections →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 font-cinzel">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Shop Unstitched Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Our Heritage & Quality Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Contact Showroom & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policies')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Free Karachi Delivery Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policies')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Return & Exchange Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="text-[#c5a059] hover:underline transition-colors"
                >
                  Admin Portal Login
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: WhatsApp Direct Booking */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 font-cinzel">
              Order On WhatsApp
            </h4>
            <p className="text-xs text-[#94a3b8] mb-3 leading-relaxed">
              Prefer placing orders directly with our Karachi fabric consultant? Click below to chat directly with our team.
            </p>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                'Assalam-o-Alaikum AL HAFIZ CLOTHS, I want to place an order.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold text-xs rounded-lg transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {settings.whatsappDisplay}</span>
            </a>
            <div className="mt-4 p-3 rounded-lg bg-[#0f1118] border border-[#1e222e] text-[11px] text-[#94a3b8]">
              <span className="text-[#c5a059] font-medium block">Working Hours:</span>
              Monday – Saturday: 11:00 AM – 10:00 PM (Karachi Time)
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1a1d26] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <p>© {new Date().getFullYear()} AL HAFIZ CLOTHS. All Rights Reserved. Karachi, Pakistan.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Cash on Delivery Available</span>
            <span>·</span>
            <span>Free Delivery In Karachi</span>
            <span>·</span>
            <button onClick={() => onNavigate('admin')} className="hover:text-[#c5a059]">
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
