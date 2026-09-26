import React, { useState } from 'react';
import { PageType, Product } from '../types';
import { 
  ShoppingBag, 
  Phone, 
  Search, 
  Star, 
  Heart, 
  ShieldCheck, 
  Truck, 
  Award, 
  MessageCircle, 
  ChevronRight, 
  ArrowRight,
  Filter,
  Grid,
  List,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { CLINIC_INFO, PRODUCTS } from '../data/mockData';
import { PawDecor } from '../components/common/PawDecor';
import { AppointmentCtaBanner } from '../components/common/AppointmentCtaBanner';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import { motion, AnimatePresence } from 'motion/react';

interface ShopPageProps {
  setCurrentPage: (page: PageType) => void;
  onAddToCart: (product: Product) => void;
  openCart: () => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  setCurrentPage,
  onAddToCart,
  openCart,
  wishlistIds,
  onToggleWishlist
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPet, setSelectedPet] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'cat-feed', label: 'Cat Feed', image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=200&q=80' },
    { id: 'cat-accessories', label: 'Cat Accessories', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=200&q=80' },
    { id: 'dog-food', label: 'Dog Food', image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=200&q=80' },
    { id: 'dog-accessories', label: 'Dog Accessories', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=200&q=80' },
    { id: 'grooming', label: 'Pet Grooming', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=200&q=80' },
    { id: 'supplements', label: 'Health Supplements', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80' },
    { id: 'toys', label: 'Play Toys', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=200&q=80' },
    { id: 'bowls', label: 'Bowls & Feeders', image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=200&q=80' },
  ];

  // Filtering & Sorting
  let filtered = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesPet = selectedPet === 'all' || p.petType === selectedPet || p.petType === 'all';
    return matchesSearch && matchesCat && matchesPet;
  });

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const popularCats = PRODUCTS.filter(p => p.category.includes('cat')).slice(0, 4);
  const topSellers = PRODUCTS.filter(p => p.isTopSeller).slice(0, 4);

  return (
    <div className="space-y-16 lg:space-y-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E7F6EF] via-subtle-cream-warm to-subtle-cream pt-10 pb-16 lg:pt-14 lg:pb-24">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
        <PawDecor className="absolute top-10 left-8 hidden md:block" size={44} opacity={0.15} rotate={-10} color="#006B4F" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <RevealOnScroll direction="down" duration={0.4}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-emerald-200 shadow-xs">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#006B4F]">
                    PET CARE PRODUCTS IN SAHIWAL
                  </span>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.05}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-emerald-950 font-heading tracking-tight leading-[1.1]">
                  Pet Shop & <br />
                  <span className="text-[#006B4F]">Essentials</span>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.1}>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed">
                  Quality pet foods, imported accessories, and veterinary-approved therapeutics for a happier, healthier companion. Trusted across Sahiwal.
                </p>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.15}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      const el = document.getElementById('products-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#006B4F] hover:bg-[#00523C] text-white font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-5 h-5 text-emerald-200" />
                    <span>Shop Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${CLINIC_INFO.phone}`}
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-subtle-cream text-[#006B4F] font-bold text-base border-2 border-emerald-600/30 shadow-xs transition-all active:scale-95"
                  >
                    <Phone className="w-4 h-4 fill-[#006B4F]" />
                    <span>{CLINIC_INFO.phone}</span>
                  </a>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative">
              <RevealOnScroll direction="left" duration={0.5}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-5/4 group">
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=850&q=80"
                    alt="Pet supplies shop"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 right-4 bg-white/95 px-4 py-2 rounded-xl shadow-md rotate-3 text-right">
                    <span className="text-[#006B4F] font-script text-lg font-bold leading-tight block">
                      Quality Products for Happier Pets ♡
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-sm flex items-center gap-3.5 hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-900 font-heading">Vet Recommended</h4>
                <p className="text-xs text-slate-500">Clinically tested & safe</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-sm flex items-center gap-3.5 hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-900 font-heading">Fast Local Delivery</h4>
                <p className="text-xs text-slate-500">Same-day delivery in Sahiwal</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-sm flex items-center gap-3.5 hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-900 font-heading">100% Authentic</h4>
                <p className="text-xs text-slate-500">Genuine sealed products</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-sm flex items-center gap-3.5 hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-900 font-heading">Expert Advice</h4>
                <p className="text-xs text-slate-500">Free advice on WhatsApp</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="text-left">
              <div className="flex items-center gap-2 text-[#006B4F]">
                <PawDecor size={20} opacity={1} color="#006B4F" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004230] font-heading">Shop by Category</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore our full line of pet products, formulated for healthy digestion, vibrant coats, and active play.
              </p>
            </div>

            {/* Search Input in Bar */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search products (e.g. Royal Canin, leash)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15 bg-white shadow-xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
          {categories.map((c) => {
            const isSelected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : c.id)}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between group cursor-pointer ${
                  isSelected 
                    ? 'border-[#006B4F] bg-[#EAF7F1] shadow-md scale-102' 
                    : 'border-emerald-900/10 bg-white hover:border-emerald-300 hover:shadow-sm'
                }`}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden mb-2.5 bg-slate-50 p-1">
                  <img src={c.image} alt={c.label} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs font-bold text-slate-800 line-clamp-1 font-heading">{c.label}</span>
                <span className="text-[10px] text-[#006B4F] font-semibold mt-1 flex items-center">
                  Shop ➔
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. PROMOTIONAL BANNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevealOnScroll direction="right" duration={0.45}>
            {/* Banner 1: Cats */}
            <div className="bg-gradient-to-r from-[#D9F2E6] to-[#EAF7F0] p-7 sm:p-9 rounded-3xl border border-emerald-200/80 flex items-center justify-between relative overflow-hidden text-left shadow-sm h-full">
              <div className="space-y-2 z-10 max-w-xs">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#006B4F] bg-white px-2.5 py-1 rounded-full shadow-2xs">
                  BEST FOR CATS
                </span>
                <h3 className="text-2xl font-extrabold text-emerald-950 font-heading">
                  Best for Feline Friends
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Wholesome cat kibble, wet pouches, litter supplies, and grooming brushes.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('cat-feed');
                    setSelectedPet('cat');
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#006B4F] text-white text-xs font-bold hover:bg-[#00543E] transition-all shadow-sm cursor-pointer"
                >
                  <span>Shop Cat Supplies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <img
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=350&q=80"
                alt="Cat promo"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-4 border-white shadow-xl rotate-3 shrink-0"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="left" duration={0.45}>
            {/* Banner 2: Nutrition */}
            <div className="bg-gradient-to-r from-[#FEF3C7]/70 to-[#FDE68A]/50 p-7 sm:p-9 rounded-3xl border border-amber-300/60 flex items-center justify-between relative overflow-hidden text-left shadow-sm h-full">
              <div className="space-y-2 z-10 max-w-xs">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-white px-2.5 py-1 rounded-full shadow-2xs">
                  NUTRITION & CARE ESSENTIALS
                </span>
                <h3 className="text-2xl font-extrabold text-amber-950 font-heading">
                  Canine & Wellness Care
                </h3>
                <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed">
                  Veterinary multivitamins, calcium chews, and premium dog foods for robust energy.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('supplements');
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#006B4F] text-white text-xs font-bold hover:bg-[#00523C] transition-all shadow-sm cursor-pointer"
                >
                  <span>Explore Supplements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <img
                src="https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=350&q=80"
                alt="Nutrition promo"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-4 border-white shadow-xl -rotate-3 shrink-0"
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS (WITH SEARCH, CATEGORY, PET, SORT, GRID/LIST VIEW) */}
      <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Controls Bar */}
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="bg-white p-4.5 rounded-2xl border border-emerald-900/10 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <PawDecor size={18} opacity={1} color="#006B4F" />
              <h2 className="text-lg font-bold text-slate-900 font-heading">Featured Products</h2>
              <span className="text-xs text-slate-400 font-medium">({filtered.length} items found)</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Category filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:border-[#006B4F]"
              >
                <option value="all">All Categories</option>
                <option value="cat-feed">Cat Feed</option>
                <option value="cat-accessories">Cat Accessories</option>
                <option value="dog-food">Dog Food</option>
                <option value="dog-accessories">Dog Accessories</option>
                <option value="grooming">Pet Grooming</option>
                <option value="supplements">Supplements</option>
                <option value="toys">Toys</option>
                <option value="bowls">Bowls</option>
              </select>

              {/* Pet filter */}
              <select
                value={selectedPet}
                onChange={(e) => setSelectedPet(e.target.value)}
                className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:border-[#006B4F]"
              >
                <option value="all">All Pets</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
              </select>

              {/* Sort by */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:border-[#006B4F]"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* View Mode */}
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden p-0.5 bg-slate-50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-[#006B4F] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-[#006B4F] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Products Grid or List */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200">
            <ShoppingBag className="w-14 h-14 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-800 font-heading">No products found matching your search</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for other terms or reset active filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPet('all');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2.5 bg-[#006B4F] text-white text-xs font-bold rounded-full hover:bg-[#00543E] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl p-5 border border-emerald-900/10 shadow-xs hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5"
                >
                  <div>
                    {/* Image Container with Wishlist */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3.5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      />
                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/95 backdrop-blur-md text-slate-400 hover:text-red-500 shadow-md transition-colors cursor-pointer"
                        aria-label="Toggle wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500 scale-110' : ''}`} />
                      </button>

                      {/* Badge */}
                      <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-slate-900/75 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                        {product.category.replace('-', ' ')}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading group-hover:text-[#006B4F] transition-colors line-clamp-2 text-left">
                      {product.name}
                    </h3>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                      <span className="text-[11px] text-slate-400">({product.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block leading-tight">Price</span>
                      <span className="text-base sm:text-lg font-extrabold text-[#006B4F] font-heading tabular-nums">
                        PKR {product.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-4 py-2.5 rounded-xl bg-[#006B4F] hover:bg-[#00523C] text-white text-xs font-bold shadow-md hover:shadow-lg flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3.5">
            {filtered.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-xs hover:shadow-lg transition-all flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4.5 w-full sm:w-auto">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-22 h-22 rounded-xl object-cover shrink-0"
                    />
                    <div className="text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#006B4F]">
                        {product.category}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 font-heading">{product.name}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-amber-500 mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold text-slate-800">{product.rating}</span>
                        <span className="text-slate-400">({product.reviewCount} customer reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-5">
                    <span className="text-lg font-extrabold text-[#006B4F] font-heading tabular-nums">
                      PKR {product.price.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 cursor-pointer"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="px-5 py-2.5 rounded-xl bg-[#006B4F] hover:bg-[#00543E] text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. POPULAR & TOP SELLING CAROUSEL STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Popular Cat Products */}
            <div className="bg-white p-7 rounded-3xl border border-emerald-900/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PawDecor size={18} opacity={1} color="#006B4F" />
                  <h3 className="text-lg font-bold text-slate-900 font-heading">Popular Cat Products</h3>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('cat-feed');
                    const el = document.getElementById('products-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#006B4F] hover:underline cursor-pointer"
                >
                  View All ➔
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {popularCats.slice(0, 2).map((p) => (
                  <div key={p.id} className="p-3.5 rounded-2xl border border-slate-100 text-left space-y-2 hover:border-emerald-200 transition-colors">
                    <img src={p.image} alt={p.name} className="w-full aspect-square object-cover rounded-xl" />
                    <p className="text-xs font-bold text-slate-900 line-clamp-1 font-heading">{p.name}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#006B4F]">PKR {p.price.toLocaleString()}</span>
                      <button
                        onClick={() => onAddToCart(p)}
                        className="p-1.5 rounded-lg bg-[#006B4F] text-white hover:bg-[#00543E] transition-colors cursor-pointer"
                        aria-label="Add product"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Selling Products */}
            <div className="bg-white p-7 rounded-3xl border border-emerald-900/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#006B4F]" />
                  <h3 className="text-lg font-bold text-slate-900 font-heading">Top Selling Products</h3>
                </div>
                <button
                  onClick={() => {
                    setSortBy('rating');
                    const el = document.getElementById('products-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#006B4F] hover:underline cursor-pointer"
                >
                  View All ➔
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {topSellers.slice(0, 2).map((p) => (
                  <div key={p.id} className="p-3.5 rounded-2xl border border-slate-100 text-left space-y-2 hover:border-emerald-200 transition-colors">
                    <img src={p.image} alt={p.name} className="w-full aspect-square object-cover rounded-xl" />
                    <p className="text-xs font-bold text-slate-900 line-clamp-1 font-heading">{p.name}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#006B4F]">PKR {p.price.toLocaleString()}</span>
                      <button
                        onClick={() => onAddToCart(p)}
                        className="p-1.5 rounded-lg bg-[#006B4F] text-white hover:bg-[#00543E] transition-colors cursor-pointer"
                        aria-label="Add product"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </RevealOnScroll>
      </section>

      {/* 7. WHY SHOP AT VET FOR PET CLINIC? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004D38] font-heading">
              Why Shop at Vet for Pet Clinic?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              More than an online store — your trusted veterinary health partner in Sahiwal.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <RevealOnScroll direction="up" delay={0.05} duration={0.4}>
            <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs space-y-2.5 text-left hover:border-emerald-300 transition-colors h-full">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#006B4F] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">100% Authentic Brands</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Genuine packaging with verified batch numbers and expiry assurance.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1} duration={0.4}>
            <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs space-y-2.5 text-left hover:border-emerald-300 transition-colors h-full">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#006B4F] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">Doctor Recommended</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Handpicked directly by our clinical veterinarians for optimal pet nutrition.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.15} duration={0.4}>
            <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs space-y-2.5 text-left hover:border-emerald-300 transition-colors h-full">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#006B4F] flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">Fast Local Delivery</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Speedy doorstep drop-offs across Fareed Town and greater Sahiwal.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2} duration={0.4}>
            <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs space-y-2.5 text-left hover:border-emerald-300 transition-colors h-full">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#006B4F] flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">Advice via WhatsApp</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Unsure which diet suits your pet's age? Message our doctors directly.</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 8. APPOINTMENT CTA BANNER */}
      <AppointmentCtaBanner 
        onBookClick={() => setCurrentPage('appointment')}
        title="Need Expert Advice or Want to Visit Our Clinic?"
        subtitle="Book a consultation with our veterinarians for personalized animal healthcare."
      />
    </div>
  );
};
