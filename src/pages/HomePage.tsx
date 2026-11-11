import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { Product } from '../types';
import {
  ShieldCheck,
  Truck,
  Sparkles,
  MessageCircle,
  ArrowRight,
  Scissors,
  CheckCircle2,
  Star,
  Award,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string, catSlug?: string) => void;
  onViewProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onViewProduct }) => {
  const { products, categories, settings, createWhatsAppLink } = useStore();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const filteredProducts = products.filter((p: Product) => {
    if (activeCategoryFilter === 'all') return p.isFeatured || p.isBestSeller;
    return p.categoryId === activeCategoryFilter;
  });

  const newArrivals = products.filter((p: Product) => p.isNewArrival).slice(0, 4);
  const bestSellers = products.filter((p: Product) => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Campaign Section */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center overflow-hidden bg-[#090b10] border-b border-[#1f2433]">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Zone */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181c28] border border-[#2b3348] text-xs text-[#c5a059]">
              <Award className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="font-semibold tracking-wide">AL HAFIZ CLOTHS KARACHI</span>
              <span className="text-gray-500">·</span>
              <span className="text-[#e5e7eb]">Premium Unstitched Suits</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Wear Elegance.{' '}
              <span className="text-gold-gradient block mt-1">
                Experience Premium Quality.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#94a3b8] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover Pakistan's finest unstitched fabric collection for men. From regal Pure Cotton and fluid Boski finish to wrinkle-free Washing Wear—crafted for discerning gentlemen.
            </p>

            {/* Price & Delivery Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs">
              <div className="flex items-center gap-2 bg-[#121520] border border-[#232a3c] px-3.5 py-2 rounded-lg text-white">
                <span className="text-[#c5a059] font-bold">Rs. 2,000 – Rs. 5,000</span>
                <span className="text-[#64748b]">|</span>
                <span>Affordable Luxury</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-2 rounded-lg text-emerald-300">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">FREE DELIVERY IN KARACHI</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onNavigate('shop')}
                className="py-3.5 px-8 bg-[#c5a059] hover:bg-[#b59048] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-[#c5a059]/10 flex items-center gap-2.5 transform hover:-translate-y-0.5"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('collections')}
                className="py-3.5 px-7 bg-[#141722] hover:bg-[#1c2130] text-white font-semibold text-xs rounded-xl border border-[#2b3346] hover:border-[#c5a059] transition-all"
              >
                Explore Collection
              </button>

              <a
                href={createWhatsAppLink('Assalam-o-Alaikum AL HAFIZ CLOTHS, I want to see the latest fabric varieties.')}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs rounded-xl transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {settings.whatsappDisplay}</span>
              </a>
            </div>

            {/* Micro proof badges */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-[11px] text-[#9ca3af]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                <span>Capry Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                <span>4.5 Gaz Full Cutting</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                <span>Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-[#2c3447] shadow-2xl bg-[#141722]">
              <img
                src="/src/assets/images/alhafiz_hero_fabric_1794403307217.jpg"
                alt="AL HAFIZ CLOTHS Royal Heritage Collection"
                className="w-full aspect-[4/3] lg:aspect-[1/1] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0b0c11]/85 backdrop-blur-md border border-[#283042] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] block">
                    Royal Seal of Quality
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-white">
                    AL HAFIZ Unstitched Suits
                  </h4>
                  <p className="text-[11px] text-[#94a3b8] mt-0.5">
                    100% Color Fastness & Capry Guarantee
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('shop')}
                  className="p-2.5 rounded-lg bg-[#c5a059] text-black font-bold hover:bg-[#b59048] transition-colors"
                  aria-label="View collection"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Proposition Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#0e1017] border border-[#1e2330]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-3">
            <div className="w-10 h-10 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Free Karachi Delivery</h4>
              <p className="text-[11px] text-[#94a3b8] mt-0.5">Zero shipping cost anywhere in Karachi.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-3">
            <div className="w-10 h-10 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Capry Guarantee</h4>
              <p className="text-[11px] text-[#94a3b8] mt-0.5">No lint, no color bleeding, crisp fall.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-3">
            <div className="w-10 h-10 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059] shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">4.5 Gaz Full Cutting</h4>
              <p className="text-[11px] text-[#94a3b8] mt-0.5">Generous 54" bara arzz for full suit.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-3">
            <div className="w-10 h-10 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059] shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct WhatsApp</h4>
              <p className="text-[11px] text-[#94a3b8] mt-0.5">Instant booking on {settings.whatsappDisplay}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c5a059]">
              Signature Unstitched Fabrics
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Featured Unstitched Suits
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#121520] rounded-xl border border-[#202738] overflow-x-auto">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'all'
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              All Featured
            </button>
            <button
              onClick={() => setActiveCategoryFilter('washing-wear')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'washing-wear'
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              Washing Wear
            </button>
            <button
              onClick={() => setActiveCategoryFilter('pure-cotton')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'pure-cotton'
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              Pure Cotton
            </button>
            <button
              onClick={() => setActiveCategoryFilter('mix-cotton')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'mix-cotton'
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              Mix Cotton
            </button>
          </div>
        </div>

        {/* 4-column product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => onNavigate('shop')}
            className="py-3 px-8 bg-[#141722] hover:bg-[#1f2434] text-white hover:text-[#c5a059] border border-[#2b3346] hover:border-[#c5a059] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Explore Complete {products.length}+ Suits Catalog →
          </button>
        </div>
      </section>

      {/* 4. Fabric Categories Visual Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c5a059]">
            Tailored For Pakistani Climate
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Explore Fabric Categories
          </h2>
          <p className="text-xs text-[#94a3b8] mt-2">
            Every fabric is carefully selected and laboratory-checked for texture, thread count, shrinkage resistance, and color fastness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Washing Wear Banner */}
          <div
            onClick={() => onNavigate('shop', 'washing-wear')}
            className="group relative h-80 rounded-2xl overflow-hidden border border-[#232a3c] bg-[#121520] cursor-pointer"
          >
            <img
              src="/src/assets/images/fabric_washing_wear_1794403306958.jpg"
              alt="Washing Wear Fabric"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] block">
                Wrinkle-Free Collection
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-1 group-hover:text-[#c5a059] transition-colors">
                Washing Wear Fabric
              </h3>
              <p className="text-xs text-[#94a3b8] mt-1 line-clamp-2">
                Ideal for daily wear and corporate settings. Resists creasing and washes effortlessly without color fade.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs text-white font-semibold mt-3 group-hover:translate-x-1 transition-transform">
                <span>View Suits</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c5a059]" />
              </span>
            </div>
          </div>

          {/* Pure Cotton Banner */}
          <div
            onClick={() => onNavigate('shop', 'pure-cotton')}
            className="group relative h-80 rounded-2xl overflow-hidden border border-[#232a3c] bg-[#121520] cursor-pointer"
          >
            <img
              src="/src/assets/images/fabric_pure_cotton_1794403308588.jpg"
              alt="Pure Cotton Fabric"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] block">
                100% Combed Cotton
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-1 group-hover:text-[#c5a059] transition-colors">
                Pure Cotton Luxury
              </h3>
              <p className="text-xs text-[#94a3b8] mt-1 line-clamp-2">
                Ultimate natural breathability, ultra-fine weave and royal finish. Perfect for Pakistani summers.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs text-white font-semibold mt-3 group-hover:translate-x-1 transition-transform">
                <span>View Suits</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c5a059]" />
              </span>
            </div>
          </div>

          {/* Mix Cotton Banner */}
          <div
            onClick={() => onNavigate('shop', 'mix-cotton')}
            className="group relative h-80 rounded-2xl overflow-hidden border border-[#232a3c] bg-[#121520] cursor-pointer"
          >
            <img
              src="/src/assets/images/fabric_mix_cotton_1794403309088.jpg"
              alt="Mix Cotton Fabric"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] block">
                Durability & Comfort
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-1 group-hover:text-[#c5a059] transition-colors">
                Mix Cotton Suits
              </h3>
              <p className="text-xs text-[#94a3b8] mt-1 line-clamp-2">
                Engineered fiber harmony ensuring crisp drape, high tensile endurance, and attractive Pakistani colors.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs text-white font-semibold mt-3 group-hover:translate-x-1 transition-transform">
                <span>View Suits</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c5a059]" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c5a059]">
              Customer Favorites
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Top Selling Unstitched Suits
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-semibold text-[#c5a059] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
            />
          ))}
        </div>
      </section>

      {/* 6. Capry Guarantee & Quality Standards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0c0e14] border border-[#232a3c] p-8 lg:p-14 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a202d] border border-[#2f384f] rounded-full text-xs text-[#c5a059]">
                <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                <span className="font-semibold">The AL HAFIZ Quality Pledge</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                What Is The AL HAFIZ <span className="text-gold-gradient">Capry Guarantee?</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                In the Pakistani textile market, men often face fabric deterioration after initial washes—burr (lint balls), severe shrinkage, and color fading. At AL HAFIZ CLOTHS, our <strong>Capry Guarantee</strong> certifies that:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#141722] border border-[#212738] space-y-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Zero Burr & Linting
                  </h4>
                  <p className="text-[11px] text-[#9ca3af]">
                    High-twist singed yarns ensure fabric stays smooth without unsightly surface pilling.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#141722] border border-[#212738] space-y-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    100% Color Fastness
                  </h4>
                  <p className="text-[11px] text-[#9ca3af]">
                    Reactive vat dyes that hold their luster even in hard tap water washes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#141722] border border-[#212738] space-y-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Shrinkage-Controlled
                  </h4>
                  <p className="text-[11px] text-[#9ca3af]">
                    Sanforized fabric processing prevents unexpected shrinking after tailoring.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#141722] border border-[#212738] space-y-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Inspection Before Stitching
                  </h4>
                  <p className="text-[11px] text-[#9ca3af]">
                    If you notice any defect before cutting the cloth, we replace it instantly with zero questions.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#2c3447] bg-[#141722]">
                <img
                  src="/src/assets/images/fabric_craftsmanship_1794403309322.jpg"
                  alt="Textile Weave Close Up"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-white">
                  <span className="font-semibold block">Laboratory Inspected Weaves</span>
                  <span className="text-[11px] text-[#c5a059]">Checked by Master Weavers in Karachi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews / Social Proof */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c5a059]">
            Real Customer Satisfaction
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Trusted By Pakistani Men
          </h2>
          <p className="text-xs text-[#94a3b8] mt-1">
            Over 2,500+ satisfied customers across Karachi, Lahore, and Islamabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0f1118] border border-[#1f2535] space-y-3">
            <div className="flex items-center gap-1 text-[#c5a059]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#c5a059]" />
              ))}
            </div>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              "Ordered 2 Washing Wear unstitched suits for office use in Karachi. Delivery arrived the very next day with zero shipping charges! The fabric fall and wrinkle resistance are as good as 8,000 Rs suits from big retail outlets."
            </p>
            <div className="pt-2 border-t border-[#1e2330] flex items-center justify-between text-xs">
              <span className="font-bold text-white">Kashif Mehmood</span>
              <span className="text-[#9ca3af] text-[11px]">DHA Phase 6, Karachi</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f1118] border border-[#1f2535] space-y-3">
            <div className="flex items-center gap-1 text-[#c5a059]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#c5a059]" />
              ))}
            </div>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              "The Pure Cotton Latha finish is exceptional. Spoke directly with the owner on WhatsApp (+92-326-2444991) who guided me on the cutting and color. Received in Lahore via COD in 2 days. 10/10 Capry Guarantee."
            </p>
            <div className="pt-2 border-t border-[#1e2330] flex items-center justify-between text-xs">
              <span className="font-bold text-white">Hamza Tariq</span>
              <span className="text-[#9ca3af] text-[11px]">Gulberg, Lahore</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f1118] border border-[#1f2535] space-y-3">
            <div className="flex items-center gap-1 text-[#c5a059]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#c5a059]" />
              ))}
            </div>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              "Al-Hafiz Cloths has become our family's primary unstitched suit fabric provider. Generous 4.5 gaz cutting and the colors do not fade even after countless machine washes in Karachi tap water."
            </p>
            <div className="pt-2 border-t border-[#1e2330] flex items-center justify-between text-xs">
              <span className="font-bold text-white">Dr. Farooq Siddiqui</span>
              <span className="text-[#9ca3af] text-[11px]">PECHS, Karachi</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WhatsApp Direct Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#121622] via-[#161c2c] to-[#121622] border border-[#2a344a] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#25D366] font-semibold flex items-center justify-center md:justify-start gap-1.5">
              <MessageCircle className="w-4 h-4" />
              Direct WhatsApp Support
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Need Fabric Advice Or Custom Bulk Orders?
            </h3>
            <p className="text-xs text-[#94a3b8] max-w-lg">
              Contact our master textile consultants directly on WhatsApp. We provide live video previews of fabric drape, color matching, and fast Karachi delivery dispatch.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                'Assalam-o-Alaikum AL HAFIZ CLOTHS, I want to inquire about custom fabric ordering.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on {settings.whatsappDisplay}</span>
            </a>

            <button
              onClick={() => onNavigate('shop')}
              className="py-3.5 px-6 bg-[#1a1f2e] hover:bg-[#252c3f] text-white text-xs font-semibold rounded-xl border border-[#2b3346] transition-colors"
            >
              Browse Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
