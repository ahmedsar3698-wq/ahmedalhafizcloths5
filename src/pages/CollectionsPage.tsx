import React from 'react';
import { useStore } from '../context/StoreContext';
import { Category, Product } from '../types';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';

interface CollectionsPageProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ onSelectCategory }) => {
  const { categories, products } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c5a059]">
          The AL HAFIZ Archive
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
          All Fabric Collections & Varieties
        </h1>
        <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
          From the lightest Egyptian pure cottons to our wrinkle-defying executive washing wears, explore our specialized unstitched fabric varieties.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat: Category) => {
          const count = products.filter((p: Product) => p.categoryId === cat.slug).length;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group bg-[#0e1017] border border-[#1e2330] hover:border-[#c5a059]/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="aspect-[16/10] bg-[#141722] relative overflow-hidden">
                <img
                  src={cat.image || '/src/assets/images/fabric_washing_wear_1794403306958.jpg'}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#c5a059] border border-[#2b3346]">
                  {count} Suits Available
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#c5a059] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1a1f2b] flex items-center justify-between text-xs text-white font-semibold">
                  <span className="text-[#c5a059]">Browse Collection</span>
                  <ArrowRight className="w-4 h-4 text-[#c5a059] group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
