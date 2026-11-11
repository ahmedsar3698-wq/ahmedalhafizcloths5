import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, MessageCircle, Menu, X, Shield, Search } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedCategorySlug?: string;
  setSelectedCategorySlug?: (slug: string | undefined) => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  selectedCategorySlug,
  setSelectedCategorySlug,
}) => {
  const { cartTotalCount, setIsCartOpen, settings } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: string, catSlug?: string) => {
    setCurrentTab(tab);
    if (setSelectedCategorySlug) {
      setSelectedCategorySlug(catSlug);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#202430] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('home')}
              className="text-left group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full border border-[#c5a059]/40 bg-[#161922] flex items-center justify-center text-[#c5a059] group-hover:border-[#c5a059] transition-colors shadow-sm">
                <span className="font-serif font-bold text-lg tracking-wider">AH</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white group-hover:text-[#c5a059] transition-colors block leading-tight">
                  AL HAFIZ
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-medium block">
                  CLOTHS KARACHI
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (4-5 single-line clean links) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#d1d5db]">
            <button
              onClick={() => handleNav('home')}
              className={`hover:text-[#c5a059] transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'home' ? 'text-[#c5a059] font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('shop')}
              className={`hover:text-[#c5a059] transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'shop' && !selectedCategorySlug ? 'text-[#c5a059] font-semibold' : ''
              }`}
            >
              All Fabric Suits
            </button>
            <button
              onClick={() => handleNav('shop', 'washing-wear')}
              className="hover:text-[#c5a059] transition-colors whitespace-nowrap shrink-0"
            >
              Washing Wear
            </button>
            <button
              onClick={() => handleNav('shop', 'pure-cotton')}
              className="hover:text-[#c5a059] transition-colors whitespace-nowrap shrink-0"
            >
              Pure Cotton
            </button>
            <button
              onClick={() => handleNav('shop', 'mix-cotton')}
              className="hover:text-[#c5a059] transition-colors whitespace-nowrap shrink-0"
            >
              Mix Cotton
            </button>
            <button
              onClick={() => handleNav('collections')}
              className={`hover:text-[#c5a059] transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'collections' ? 'text-[#c5a059] font-semibold' : ''
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`hover:text-[#c5a059] transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'about' ? 'text-[#c5a059] font-semibold' : ''
              }`}
            >
              Brand Story
            </button>
          </nav>

          {/* Zone 3: Primary Actions (WhatsApp, Bag, Admin) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* WhatsApp direct order quick link */}
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                'Assalam-o-Alaikum AL HAFIZ CLOTHS, I am interested in your unstitched suits collection.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-black bg-[#25D366] hover:bg-[#20ba5a] rounded-md transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Order</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-[#e5e7eb] hover:text-[#c5a059] transition-colors rounded-lg border border-[#272b38] bg-[#141720] hover:border-[#c5a059]/40 focus:outline-none"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#c5a059] text-black font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-[#e5e7eb] hover:text-white rounded-lg border border-[#272b38] bg-[#141720]"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0e1017] border-b border-[#202430] px-4 pt-3 pb-6 animate-fadeIn">
            <nav className="flex flex-col gap-2 text-sm text-[#e5e7eb]">
              <button
                onClick={() => handleNav('home')}
                className="text-left py-2.5 px-3 rounded-md hover:bg-[#1a1e2b] hover:text-[#c5a059] transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleNav('shop')}
                className="text-left py-2.5 px-3 rounded-md hover:bg-[#1a1e2b] hover:text-[#c5a059] transition-colors"
              >
                All Unstitched Suits
              </button>
              <button
                onClick={() => handleNav('shop', 'washing-wear')}
                className="text-left py-2.5 px-3 rounded-md hover:bg-[#1a1e2b] hover:text-[#c5a059] transition-colors pl-6 text-[#9ca3af]"
              >
                — Washing Wear Collection
              </button>
              <button
                onClick={() => handleNav('shop', 'pure-cotton')}
                className="text-left py-2.5 px-3 rounded-md hover:bg-[#1a1e2b] hover:text-[#c5a059] transition-colors pl-6 text-[#9ca3af]"
              >
                — Pure Cotton Luxury
              </button>
              <button
                onClick={() => handleNav('shop', 'mix-cotton')}
                className="text-left py-2.5 px-3 rounded-md hover:bg-[#1a1e2b] hover:text-[#c5a059] transition-colors pl-6 text-[#9ca3af]"
              >
                — Mix Cotton Everyday
              </button>
              <button
                onClick={() => handleNav('collections')}
                className="text-left py-2.5 px-3 rounded-md hover:bg-[#1a1e2b] hover:text-[#c5a059] transition-colors"
              >
                All Collections & Varieties
              </button>
              <button
                onClick={() => handleNav('about')}
                className="text-left py-2.5 px-3 rounded-md hover:bg-[#1a1e2b] hover:text-[#c5a059] transition-colors"
              >
                About AL HAFIZ CLOTHS
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="text-left py-2.5 px-3 rounded-md hover:bg-[#1a1e2b] hover:text-[#c5a059] transition-colors"
              >
                Contact & Karachi Outlet
              </button>
              <button
                onClick={() => handleNav('policies')}
                className="text-left py-2.5 px-3 rounded-md hover:bg-[#1a1e2b] hover:text-[#c5a059] transition-colors"
              >
                Exchange & Return Policy
              </button>
              <button
                onClick={() => handleNav('admin')}
                className="text-left py-2.5 px-3 rounded-md text-[#c5a059] font-medium hover:bg-[#1a1e2b] transition-colors flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Management Portal</span>
              </button>

              <div className="pt-3 mt-2 border-t border-[#202430] flex flex-col gap-2">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-black font-semibold rounded-lg text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: {settings.whatsappDisplay}</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
