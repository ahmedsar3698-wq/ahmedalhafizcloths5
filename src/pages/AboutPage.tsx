import React from 'react';
import { ShieldCheck, Award, Truck, Scissors, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface AboutPageProps {
  onNavigateToShop: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToShop }) => {
  const { settings } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Brand Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c5a059]">
          The AL HAFIZ Heritage
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
          Crafted For The Pakistani Gentleman
        </h1>
        <p className="text-sm text-[#94a3b8] leading-relaxed">
          Founded in the vibrant textile capital of Karachi, <strong className="text-white">AL HAFIZ CLOTHS</strong> was born from a singular conviction: every Pakistani man deserves royal fabric quality, rich lasting colors, and authentic unstitched cuts without exorbitant luxury markups.
        </p>
      </div>

      {/* Visual story split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#23293a] bg-[#121520]">
          <img
            src="/src/assets/images/fabric_craftsmanship_1794403309322.jpg"
            alt="Textile weaving craftsmanship"
            className="w-full aspect-[4/3] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 text-xs text-white">
            <span className="font-bold text-[#c5a059] block">Karachi Textile Craft</span>
            <span>Over 25,000 meters of high-density unstitched suits distributed nationwide.</span>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
          <h2 className="font-serif text-2xl font-bold text-white">
            Why Unstitched Fabric Remains The Gold Standard
          </h2>
          <p>
            Ready-made garments often cut corners on fabric weight, stitching seam allowances, and sleeve lengths. In contrast, an unstitched suit allows your personal master tailor (Darzi) to customize every cuff, collar width, and trouser drape to your exact silhouette.
          </p>
          <p>
            At AL HAFIZ CLOTHS, we provide generous <strong>4.5 Gaz (4.1 meters)</strong> full cutting with an expansive <strong>54" Bara Arzz</strong> (double width), ensuring enough fabric for traditional Pakistani shalwar kameez, kurtas, or waistcoat pairings for men of all heights and builds.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-4">
            <div className="p-3.5 bg-[#121520] rounded-xl border border-[#222838]">
              <span className="font-serif text-xl font-bold text-[#c5a059] block">4.5 Gaz</span>
              <span className="text-[11px] text-[#9ca3af]">Full Suit Cutting Guarantee</span>
            </div>
            <div className="p-3.5 bg-[#121520] rounded-xl border border-[#222838]">
              <span className="font-serif text-xl font-bold text-[#c5a059] block">0% Burr</span>
              <span className="text-[11px] text-[#9ca3af]">Verified Capry Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl font-bold text-white text-center">
          Our Four Pillars of Quality
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-xl bg-[#0f1118] border border-[#1e2330] space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">Combed Yarn Purity</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              We exclusively source high-tensile combed cotton and top-tier microfibers, removing short brittle threads before weaving.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0f1118] border border-[#1e2330] space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">Capry Guarantee</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Every yard is certified against pilling, shrinkage, and premature thinning. If the cloth fails your standard before stitching, we replace it.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0f1118] border border-[#1e2330] space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">Karachi Home Turf</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Proudly based in Karachi with complimentary doorstep delivery anywhere in the city. Direct dispatch from our central textile hub.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0f1118] border border-[#1e2330] space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
              <Scissors className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">Affordable Luxury</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              All unstitched suits priced between Rs. 2,000 and Rs. 5,000, bringing VIP fabric directly to you without brand markups.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-2xl bg-[#121520] border border-[#232a3c] text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-white">
          Experience The Difference For Yourself
        </h3>
        <p className="text-xs text-[#94a3b8] max-w-md mx-auto">
          Explore our latest collection of Pure Cotton, Washing Wear, and Mix Cotton unstitched suits.
        </p>
        <button
          onClick={onNavigateToShop}
          className="py-3 px-8 bg-[#c5a059] hover:bg-[#b59048] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg"
        >
          View Suits Collection
        </button>
      </div>
    </div>
  );
};
