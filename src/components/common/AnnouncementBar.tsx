import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Truck, ShieldCheck, MessageCircle } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="bg-[#12141a] border-b border-[#222634] text-xs text-[#d1d5db] py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-flex items-center justify-center text-[#c5a059]">
            <Truck className="w-3.5 h-3.5 mr-1.5" />
          </span>
          <span className="font-semibold text-white tracking-wide">
            FREE DELIVERY IN KARACHI
          </span>
          <span className="text-[#64748b] hidden md:inline">·</span>
          <span className="text-[#9ca3af] hidden md:inline">
            Fast Nationwide Delivery in 2-4 Days
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-5 text-[11px] text-[#9ca3af]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Capry Guarantee & 100% Color Fastness</span>
          </div>
          <span className="text-[#334155]">|</span>
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#c5a059] hover:text-[#e5c378] transition-colors font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp: {settings.whatsappDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
