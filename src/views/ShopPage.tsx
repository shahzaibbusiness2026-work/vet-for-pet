'use client';

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
  CheckCircle2,
  Eye
} from 'lucide-react';
import { PawDecor } from '../components/common/PawDecor';
import { AppointmentCtaBanner } from '../components/common/AppointmentCtaBanner';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../context/SiteDataContext';
import { useApp } from '../context/AppContext';

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
  const { products, clinicInfo } = useSiteData();
  const { openProductDetail } = useApp();
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

  const scrollToProducts = () => {
    requestAnimationFrame(() => {
      const el = document.getElementById('products-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setSearchQuery(''); // Clear any conflicting search so all category products are shown
    setSelectedPet('all'); // Clear pet filter so no category products are hidden
    scrollToProducts();
  };

  // Filtering & Sorting
  let filtered = products.filter(p => {
    const matchesSearch = searchQuery.trim() === '' || 
                          p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase().trim());
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

  const popularCats = products.filter((p: Product) => p.category.includes('cat')).slice(0, 4);
  const topSellers = products.filter((p: Product) => p.isTopSeller).slice(0, 4);

  return (
    <div className="space-y-8 lg:space-y-12 overflow-hidden">
      {/* 1. COMPACT SHOP TOP BAR (HERO REMOVED) */}
      <section className="bg-gradient-to-r from-[#E7F6EF] via-subtle-cream to-[#EAF7F1] pt-6 pb-6 sm:pt-8 sm:pb-8 border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-200/80 shadow-2xs mb-2">
              <PawDecor size={14} opacity={1} color="#006B4F" />
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#006B4F]">
                VET CLINIC PET STORE & ESSENTIALS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#004230] font-heading tracking-tight">
              Pet Food, Supplements & Accessories
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Authentic veterinary-approved pet nutrition, healthcare supplements, and grooming essentials delivered to your doorstep in Sahiwal.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`tel:${clinicInfo.phone}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-2xs transition-all active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-[#006B4F]" />
              <span>{clinicInfo.phone}</span>
            </a>
            <a
              href={clinicInfo.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-emerald-900/10 shadow-xs flex items-center gap-3 hover:border-emerald-300 transition-colors min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading truncate">Vet Recommended</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-snug break-words">Clinically tested & safe</p>
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-emerald-900/10 shadow-xs flex items-center gap-3 hover:border-emerald-300 transition-colors min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading truncate">Fast Local Delivery</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-snug break-words">Same-day in Sahiwal</p>
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-emerald-900/10 shadow-xs flex items-center gap-3 hover:border-emerald-300 transition-colors min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading truncate">100% Authentic</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-snug break-words">Genuine sealed products</p>
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-emerald-900/10 shadow-xs flex items-center gap-3 hover:border-emerald-300 transition-colors min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading truncate">Expert Advice</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-snug break-words">Doctor support on WhatsApp</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div className="text-left">
              <div className="flex items-center gap-2 text-[#006B4F]">
                <PawDecor size={20} opacity={1} color="#006B4F" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#004230] font-heading">Shop by Category</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Browse our complete catalog tailored for healthy digestion, coat shine, and happy pets.
              </p>
            </div>

            {/* Search Input in Bar */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search products (e.g. Royal Canin, shampoo)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    scrollToProducts();
                  }
                }}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15 bg-white shadow-xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 sm:gap-3">
          {/* All Categories Option */}
          <button
            type="button"
            onClick={() => handleSelectCategory('all')}
            className={`p-2 sm:p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between group cursor-pointer w-full min-w-0 overflow-hidden ${
              selectedCategory === 'all' 
                ? 'border-[#006B4F] bg-[#EAF7F1] shadow-md ring-2 ring-[#006B4F]/20' 
                : 'border-emerald-900/10 bg-white hover:border-emerald-300 hover:shadow-xs'
            }`}
          >
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden mb-1.5 bg-emerald-50 text-[#006B4F] flex items-center justify-center p-1 group-hover:scale-110 transition-transform duration-300 shadow-2xs border border-emerald-100 shrink-0">
              <ShoppingBag className="w-5 h-5 text-[#006B4F]" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-800 truncate w-full block font-heading">All Items</span>
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">({products.length})</span>
            <span className={`text-[9px] sm:text-[10px] font-bold mt-0.5 flex items-center ${selectedCategory === 'all' ? 'text-[#006B4F]' : 'text-slate-500'}`}>
              {selectedCategory === 'all' ? 'Active ✓' : 'View ➔'}
            </span>
          </button>

          {categories.map((c) => {
            const isSelected = selectedCategory === c.id;
            const count = products.filter(p => p.category === c.id).length;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelectCategory(c.id)}
                className={`p-2 sm:p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between group cursor-pointer w-full min-w-0 overflow-hidden ${
                  isSelected 
                    ? 'border-[#006B4F] bg-[#EAF7F1] shadow-md ring-2 ring-[#006B4F]/20' 
                    : 'border-emerald-900/10 bg-white hover:border-emerald-300 hover:shadow-xs'
                }`}
              >
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden mb-1.5 bg-slate-50 p-0.5 border border-slate-100 shrink-0">
                  <img src={c.image} alt={c.label} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-800 truncate w-full block font-heading">{c.label}</span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">({count})</span>
                <span className={`text-[9px] sm:text-[10px] font-bold mt-0.5 flex items-center ${isSelected ? 'text-[#006B4F]' : 'text-slate-500'}`}>
                  {isSelected ? 'Active ✓' : 'Shop ➔'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (DISPLAYED IMMEDIATELY AFTER CATEGORIES) */}
      <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        
        {/* Controls Bar */}
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="bg-white p-4.5 rounded-2xl border border-emerald-900/10 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <PawDecor size={18} opacity={1} color="#006B4F" />
              <h2 className="text-lg font-bold text-slate-900 font-heading">Featured Products</h2>
              <span className="text-xs text-slate-400 font-medium">({filtered.length} items found)</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Category filter */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSearchQuery('');
                  setSelectedPet('all');
                }}
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
                <option value="bowls">Bowls & Feeders</option>
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
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-[#006B4F] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
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

        {/* Active Filters Notification Bar */}
        {(selectedCategory !== 'all' || selectedPet !== 'all' || searchQuery.trim() !== '') && (
          <div className="mb-6 p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-emerald-950">Active Filters:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#006B4F] font-bold rounded-full border border-emerald-300 shadow-2xs">
                  Category: {categories.find(c => c.id === selectedCategory)?.label || selectedCategory}
                  <button 
                    type="button"
                    onClick={() => setSelectedCategory('all')} 
                    className="hover:text-red-500 font-bold ml-1 text-sm leading-none cursor-pointer"
                    aria-label="Remove category filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedPet !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#006B4F] font-bold rounded-full border border-emerald-300 shadow-2xs">
                  Pet: {selectedPet === 'dog' ? 'Dogs' : 'Cats'}
                  <button 
                    type="button"
                    onClick={() => setSelectedPet('all')} 
                    className="hover:text-red-500 font-bold ml-1 text-sm leading-none cursor-pointer"
                    aria-label="Remove pet filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchQuery.trim() !== '' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#006B4F] font-bold rounded-full border border-emerald-300 shadow-2xs">
                  Search: "{searchQuery}"
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('')} 
                    className="hover:text-red-500 font-bold ml-1 text-sm leading-none cursor-pointer"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                </span>
              )}
              <span className="text-slate-500 font-medium">({filtered.length} products found)</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPet('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-[#006B4F] hover:underline cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Products Grid or List */}
        {filtered.length === 0 ? (
          <div className="py-8 text-center bg-white rounded-3xl border border-slate-200">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filtered.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-emerald-900/10 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group min-w-0 overflow-hidden transform hover:-translate-y-1"
                >
                  <div className="min-w-0">
                    {/* Image Container with Wishlist and Quick View */}
                    <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-slate-50 mb-2.5 sm:mb-3.5 group/img">
                      <img
                        src={product.image}
                        alt={product.name}
                        onClick={() => openProductDetail(product)}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out cursor-pointer"
                      />
                      
                      {/* Wishlist Button */}
                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 p-1.5 sm:p-2 rounded-full bg-white/95 backdrop-blur-md text-slate-400 hover:text-red-500 shadow-md transition-colors cursor-pointer z-10"
                        aria-label="Toggle wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-red-500 text-red-500 scale-110' : ''}`} />
                      </button>

                      {/* Floating Quick View button on image hover (desktop only) */}
                      <button
                        onClick={() => openProductDetail(product)}
                        className="hidden sm:flex absolute inset-x-3 bottom-2.5 py-2 px-3 rounded-xl bg-white/95 hover:bg-[#006B4F] text-slate-800 hover:text-white text-xs font-bold shadow-md items-center justify-center gap-1.5 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-xs cursor-pointer z-10"
                        aria-label={`Quick view ${product.name}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>

                      {/* Category Badge */}
                      <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-slate-900/80 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs max-w-[70%] truncate">
                        {product.category.replace('-', ' ')}
                      </span>
                    </div>

                    {/* Clickable Product Title */}
                    <button
                      onClick={() => openProductDetail(product)}
                      className="text-xs sm:text-base font-bold text-slate-900 font-heading hover:text-[#006B4F] transition-colors line-clamp-2 text-left cursor-pointer w-full leading-snug break-words"
                    >
                      {product.name}
                    </button>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 sm:gap-1.5 mt-1.5 flex-wrap">
                      <div className="flex text-amber-400">
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-slate-800">{product.rating}</span>
                      <span className="text-[10px] sm:text-[11px] text-slate-400 truncate">({product.reviewCount})</span>
                    </div>
                  </div>

                  {/* Card Footer: Price & Actions - Stacked layout to guarantee zero overflow on mobile */}
                  <div className="pt-2.5 mt-2 sm:pt-3.5 sm:mt-3 border-t border-slate-100 flex flex-col gap-2 min-w-0">
                    <div className="flex items-baseline justify-between gap-1">
                      <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Price</span>
                      <span className="text-xs sm:text-base lg:text-lg font-black text-[#006B4F] font-heading tabular-nums truncate">
                        PKR {product.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 w-full">
                      {/* View Details Button */}
                      <button
                        onClick={() => openProductDetail(product)}
                        title="View Product Details"
                        className="p-1.5 sm:p-2.5 rounded-xl border border-emerald-900/10 hover:border-emerald-300 text-slate-600 hover:text-[#006B4F] hover:bg-emerald-50 transition-colors shrink-0 cursor-pointer"
                        aria-label={`View details of ${product.name}`}
                      >
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>

                      {/* Add to Cart */}
                      <button
                        onClick={() => onAddToCart(product)}
                        className="flex-1 min-w-0 py-1.5 sm:py-2.5 px-2 rounded-xl bg-[#006B4F] hover:bg-[#00523C] text-white text-[11px] sm:text-xs font-bold shadow-xs hover:shadow-md flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer truncate"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Add</span>
                      </button>
                    </div>
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
                  className="bg-white rounded-2xl p-3.5 sm:p-5 border border-emerald-900/10 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 min-w-0"
                >
                  <div className="flex items-center gap-3 sm:gap-4.5 w-full sm:w-auto min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => openProductDetail(product)}
                      className="w-16 h-16 sm:w-22 sm:h-22 rounded-xl object-cover shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                    />
                    <div className="text-left min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#006B4F]">
                        {product.category}
                      </span>
                      <button
                        onClick={() => openProductDetail(product)}
                        className="text-sm sm:text-base font-bold text-slate-900 font-heading hover:text-[#006B4F] transition-colors text-left block cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </button>
                      <div className="flex items-center gap-1.5 text-xs text-amber-500 mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold text-slate-800">{product.rating}</span>
                        <span className="text-slate-400">({product.reviewCount} customer reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between w-full sm:w-auto gap-2.5 sm:gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span className="text-base sm:text-lg font-extrabold text-[#006B4F] font-heading tabular-nums">
                      PKR {product.price.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => openProductDetail(product)}
                        className="px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 rounded-xl border border-emerald-200 text-[#006B4F] hover:bg-emerald-50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className="p-1.5 sm:p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 cursor-pointer"
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl bg-[#006B4F] hover:bg-[#00523C] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. PROMOTIONAL BANNERS (DISPLAYED AFTER PRODUCTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Banner 1: Cat Nutrition */}
            <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-emerald-800 to-[#004230] text-white flex flex-col justify-between shadow-md">
              <div className="relative z-10 max-w-sm space-y-2">
                <span className="px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs inline-block">
                  SPECIAL CLINIC FORMULAS
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading leading-tight">
                  Royal Nutrition & Diets for Cats
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  Support your feline’s renal, coat, and urinary tract wellness with clinical nutrition.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => handleSelectCategory('cat-feed')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#006B4F] hover:bg-emerald-50 text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Browse Cat Diets</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <PawDecor className="absolute right-4 bottom-2 hidden sm:block pointer-events-none" size={120} opacity={0.15} rotate={15} color="#FFFFFF" />
            </div>

            {/* Banner 2: Supplements & Vitality */}
            <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-[#0E8F63] to-emerald-900 text-white flex flex-col justify-between shadow-md">
              <div className="relative z-10 max-w-sm space-y-2">
                <span className="px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs inline-block">
                  VET-RECOMMENDED
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading leading-tight">
                  Supplements & Daily Vitality
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  Calcium syrups, multivitamin drops, and joint support supplements approved by our clinic doctors.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => handleSelectCategory('supplements')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#006B4F] hover:bg-emerald-50 text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Explore Supplements</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <PawDecor className="absolute right-4 bottom-2 hidden sm:block pointer-events-none" size={120} opacity={0.15} rotate={-20} color="#FFFFFF" />
            </div>

          </div>
        </RevealOnScroll>
      </section>

      {/* 6. POPULAR & TOP SELLING CAROUSEL STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Popular Cat Products */}
            <div className="bg-white p-4 sm:p-7 rounded-3xl border border-emerald-900/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PawDecor size={18} opacity={1} color="#006B4F" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">Popular Cat Products</h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectCategory('cat-feed')}
                  className="text-xs font-bold text-[#006B4F] hover:underline cursor-pointer"
                >
                  View All ➔
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                {popularCats.slice(0, 2).map((p: Product) => (
                  <div key={p.id} className="p-2.5 sm:p-3.5 rounded-2xl border border-slate-100 text-left space-y-1.5 sm:space-y-2 hover:border-emerald-200 transition-colors flex flex-col justify-between">
                    <div>
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        onClick={() => openProductDetail(p)}
                        className="w-full aspect-square object-cover rounded-xl cursor-pointer hover:scale-102 transition-transform mb-1.5" 
                      />
                      <button 
                        onClick={() => openProductDetail(p)}
                        className="text-xs font-bold text-slate-900 line-clamp-1 font-heading hover:text-[#006B4F] text-left cursor-pointer block w-full truncate"
                      >
                        {p.name}
                      </button>
                    </div>

                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 text-xs pt-1.5 border-t border-slate-100">
                      <span className="font-extrabold text-[#006B4F] text-xs sm:text-sm tabular-nums truncate">PKR {p.price.toLocaleString()}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => openProductDetail(p)}
                          title="View Details"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-[#006B4F] hover:bg-emerald-50 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onAddToCart(p)}
                          className="p-1.5 px-2 rounded-lg bg-[#006B4F] text-white hover:bg-[#00523C] transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                          aria-label="Add product"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span className="hidden xs:inline">Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Selling Products */}
            <div className="bg-white p-4 sm:p-7 rounded-3xl border border-emerald-900/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#006B4F]" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">Top Selling Products</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedPet('all');
                    setSearchQuery('');
                    setSortBy('rating');
                    scrollToProducts();
                  }}
                  className="text-xs font-bold text-[#006B4F] hover:underline cursor-pointer"
                >
                  View All ➔
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                {topSellers.slice(0, 2).map((p: Product) => (
                  <div key={p.id} className="p-2.5 sm:p-3.5 rounded-2xl border border-slate-100 text-left space-y-1.5 sm:space-y-2 hover:border-emerald-200 transition-colors flex flex-col justify-between">
                    <div>
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        onClick={() => openProductDetail(p)}
                        className="w-full aspect-square object-cover rounded-xl cursor-pointer hover:scale-102 transition-transform mb-1.5" 
                      />
                      <button 
                        onClick={() => openProductDetail(p)}
                        className="text-xs font-bold text-slate-900 line-clamp-1 font-heading hover:text-[#006B4F] text-left cursor-pointer block w-full truncate"
                      >
                        {p.name}
                      </button>
                    </div>

                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 text-xs pt-1.5 border-t border-slate-100">
                      <span className="font-extrabold text-[#006B4F] text-xs sm:text-sm tabular-nums truncate">PKR {p.price.toLocaleString()}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => openProductDetail(p)}
                          title="View Details"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-[#006B4F] hover:bg-emerald-50 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onAddToCart(p)}
                          className="p-1.5 px-2 rounded-lg bg-[#006B4F] text-white hover:bg-[#00523C] transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                          aria-label="Add product"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span className="hidden xs:inline">Add</span>
                        </button>
                      </div>
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
