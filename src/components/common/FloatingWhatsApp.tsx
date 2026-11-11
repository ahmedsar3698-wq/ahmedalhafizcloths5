import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle, X, Send } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Assalam-o-Alaikum, I need assistance with AL HAFIZ CLOTHS unstitched fabrics.');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleDirectClick = () => {
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent('Assalam-o-Alaikum AL HAFIZ CLOTHS, I want to inquire about your fabric collection.')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* WhatsApp Quick Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-[#141722] border border-[#2e3447] rounded-xl shadow-2xl overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-[#0b0d13] p-4 border-b border-[#222838] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">AL HAFIZ CLOTHS Support</h4>
                <p className="text-[11px] text-[#25D366]">Online · Karachi Head Office</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#9ca3af] hover:text-white transition-colors p-1"
              aria-label="Close chat popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#10121a] text-xs text-[#d1d5db] space-y-2.5">
            <div className="bg-[#1a1f2c] p-3 rounded-lg border border-[#282f42] text-[#cbd5e1] leading-relaxed">
              Assalam-o-Alaikum! Welcome to <strong className="text-white">AL HAFIZ CLOTHS</strong>. How can we help you choose your premium unstitched suit today?
              <div className="mt-2 text-[10px] text-[#c5a059] font-medium">
                ⚡ FREE DELIVERY IN KARACHI | Capry Guarantee
              </div>
            </div>

            <form onSubmit={handleSend} className="pt-1 space-y-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                className="w-full bg-[#0b0c11] border border-[#282f42] rounded-lg p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] resize-none"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold text-xs rounded-lg transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start WhatsApp Chat</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <span className="hidden sm:inline-block bg-[#161a25] text-white text-xs font-medium px-3 py-1.5 rounded-full border border-[#2d3447] shadow-lg">
            Order on WhatsApp <span className="text-[#25D366] font-semibold">{settings.whatsappDisplay}</span>
          </span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-black flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95 focus:outline-none relative group"
          aria-label="Contact AL HAFIZ CLOTHS on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white fill-white" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-black rounded-full" />
        </button>
      </div>
    </div>
  );
};
