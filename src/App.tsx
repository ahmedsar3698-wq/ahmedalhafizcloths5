import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { ToastContainer } from './components/common/ToastContainer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { ProductQuickViewModal } from './components/product/ProductQuickViewModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPage } from './pages/PolicyPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { Product } from './types';

const MainLayout: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | undefined>(undefined);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const { setIsCheckoutOpen } = useStore();

  const handleNavigate = (tab: string, catSlug?: string) => {
    setCurrentTab(tab);
    setSelectedCategorySlug(catSlug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProduct = (product: Product) => {
    setActiveProduct(product);
    setCurrentTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToShop = () => {
    setCurrentTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCollection = (catSlug: string) => {
    setSelectedCategorySlug(catSlug);
    setCurrentTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f3f4f6] flex flex-col font-sans selection:bg-[#c5a059] selection:text-black">
      {/* 1. Slim Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Top Bar Contract Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => handleNavigate(tab)}
        selectedCategorySlug={selectedCategorySlug}
        setSelectedCategorySlug={setSelectedCategorySlug}
      />

      {/* 3. Main Views */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={(tab, catSlug) => handleNavigate(tab, catSlug)}
            onViewProduct={handleViewProduct}
          />
        )}

        {currentTab === 'shop' && (
          <ShopPage
            onViewProduct={handleViewProduct}
            initialCategorySlug={selectedCategorySlug}
            onClearInitialCategory={() => setSelectedCategorySlug(undefined)}
          />
        )}

        {currentTab === 'collections' && (
          <CollectionsPage onSelectCategory={handleSelectCollection} />
        )}

        {currentTab === 'product-detail' && activeProduct && (
          <ProductDetailPage
            product={activeProduct}
            onBack={handleBackToShop}
            onViewProduct={handleViewProduct}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage onNavigateToShop={() => handleNavigate('shop')} />
        )}

        {currentTab === 'contact' && <ContactPage />}

        {currentTab === 'policies' && <PolicyPage />}

        {currentTab === 'admin' && <AdminDashboard />}
      </main>

      {/* 4. Global Overlays & Modals */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutModal />
      <ProductQuickViewModal onGoToDetail={handleViewProduct} />
      <FloatingWhatsApp />
      <ToastContainer />

      {/* 5. Comprehensive Footer */}
      <Footer onNavigate={(tab, catSlug) => handleNavigate(tab, catSlug)} />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
