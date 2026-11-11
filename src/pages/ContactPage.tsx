import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, Phone, MapPin, Send, Mail, Clock, CheckCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, createWhatsAppLink, addToast } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Fabric Availability Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      addToast('Missing Info', 'Please complete all required fields.', 'error');
      return;
    }

    const whatsappText = `*AL HAFIZ CLOTHS - WEBSITE INQUIRY*
━━━━━━━━━━━━━━━━━━━━
*Customer Name:* ${name}
*Contact Phone:* ${phone}
*Inquiry Subject:* ${subject}
*Message:* ${message}

Looking forward to your guidance!`;

    const url = createWhatsAppLink(whatsappText);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    addToast('Inquiry Sent', 'WhatsApp chat opened with AL HAFIZ CLOTHS representative.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c5a059]">
          Get In Touch
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
          Contact AL HAFIZ CLOTHS
        </h1>
        <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
          Have questions about fabric weight, cutting measurements, or Karachi same-day delivery? Our fabric advisors are ready to assist you on WhatsApp or call.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0e1017] border border-[#1e2330] space-y-4">
            <h3 className="font-serif text-lg font-bold text-white font-cinzel">
              Karachi Hub & Inquiries
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[#9ca3af] block">Direct WhatsApp (Fastest Response):</span>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-white hover:text-[#25D366] transition-colors"
                  >
                    {settings.whatsappDisplay}
                  </a>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">
                    Online for audio notes & fabric video previews
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[#9ca3af] block">Phone Calling Line:</span>
                  <a
                    href={`tel:${settings.whatsappNumber}`}
                    className="text-sm font-semibold text-white hover:text-[#c5a059]"
                  >
                    +92-326-2444991
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[#9ca3af] block">Main Distribution Center:</span>
                  <p className="text-white font-medium">
                    Tariq Road / Saddar Commercial Fabric Hub, Karachi, Sindh, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[#9ca3af] block">Operating Hours:</span>
                  <p className="text-white font-medium">
                    Monday to Saturday: 11:00 AM – 10:00 PM (PKT)
                  </p>
                  <span className="text-[10px] text-[#64748b]">Sunday: Open for WhatsApp bookings</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Action Box */}
          <div className="p-5 rounded-2xl bg-[#141824] border border-[#2b354d] text-center space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Instant Order On WhatsApp
            </h4>
            <p className="text-[11px] text-[#94a3b8]">
              Skip form filling—connect with our Karachi sales team with a single tap.
            </p>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                'Assalam-o-Alaikum AL HAFIZ CLOTHS, I want to inquire about men\'s unstitched suits.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs rounded-xl transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Launch WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#0e1017] p-6 sm:p-8 rounded-2xl border border-[#1e2330]">
          <h3 className="font-serif text-xl font-bold text-white mb-2">
            Send An Inquiry
          </h3>
          <p className="text-xs text-[#94a3b8] mb-6">
            Fill in your details below. Your message will be formatted and routed directly to our WhatsApp representative.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#cbd5e1] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full bg-[#121520] border border-[#242b3b] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#cbd5e1] mb-1">
                  WhatsApp Contact Phone *
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0321-1234567"
                  className="w-full bg-[#121520] border border-[#242b3b] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#cbd5e1] mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#121520] border border-[#242b3b] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a059]"
              >
                <option value="Fabric Availability Inquiry">Fabric Availability Inquiry</option>
                <option value="Karachi Delivery Inquiry">Karachi Same-Day Delivery Inquiry</option>
                <option value="Bulk / Wedding Suit Order">Bulk / Wedding Suit Order</option>
                <option value="Capry Guarantee Question">Capry Guarantee Question</option>
                <option value="Exchange or Return Request">Exchange or Return Request</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#cbd5e1] mb-1">
                Your Message / Suit Requirements *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mention which fabric (Pure Cotton, Washing Wear, Mix Cotton) or color shades you need..."
                className="w-full bg-[#121520] border border-[#242b3b] rounded-lg p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-[#c5a059] hover:bg-[#b59048] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send To WhatsApp Representative</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
