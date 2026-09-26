'use client';

import React, { useState } from 'react';
import { Product } from '../../types';
import { 
  X, 
  ShoppingBag, 
  Star, 
  Heart, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Plus, 
  Minus, 
  MessageCircle,
  Sparkles,
  PackageCheck
} from 'lucide-react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useSiteData } from '../../context/SiteDataContext';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenCart: () => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOpenCart,
  isWishlisted = false,
  onToggleWishlist
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);
  const { clinicInfo } = useSiteData();

  if (!product) return null;

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleBuyNow = () => {
    onAddToCart(product, quantity);
    onClose();
    onOpenCart();
  };

  const estimatedMSRP = Math.round(product.price * 1.15);
  const savings = estimatedMSRP - product.price;

  const whatsappMessage = encodeURIComponent(
    `Hello ${clinicInfo.name}! I am interested in purchasing "${product.name}" (Price: PKR ${product.price.toLocaleString()}). Is it in stock for delivery in Sahiwal?`
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: '20px', sm: '28px' },
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(0, 107, 79, 0.25)',
          border: '1px solid rgba(0, 107, 79, 0.12)',
          m: { xs: 2, sm: 3 }
        }
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-black flex items-center justify-center shadow-md backdrop-blur-md transition-all cursor-pointer border border-slate-200"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
          {/* Left Column: Product Image Gallery */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#F0FAF5] to-slate-50 p-6 flex flex-col justify-between items-center relative border-b md:border-b-0 md:border-r border-slate-100">
            {/* Top Badges */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full bg-[#006B4F] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
                {product.category.replace('-', ' ')}
              </span>

              {onToggleWishlist && (
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="p-2 rounded-full bg-white text-slate-400 hover:text-red-500 shadow-sm transition-colors cursor-pointer border border-slate-100"
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              )}
            </div>

            {/* Main Product Image */}
            <div className="relative my-auto py-4 group w-full flex items-center justify-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden bg-white shadow-md border border-emerald-100 p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div>

            {/* Bottom Trust Tags */}
            <div className="w-full flex items-center justify-center gap-3 pt-2 text-[11px] font-bold text-slate-600">
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-[#006B4F]" />
                100% Genuine
              </span>
              <span className="flex items-center gap-1 text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                <Truck className="w-3.5 h-3.5 text-[#0E8F63]" />
                Sahiwal Delivery
              </span>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Pet Type & In Stock Indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#006B4F] uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    For {product.petType === 'all' ? 'All Pets' : `${product.petType}s`}
                  </span>
                  {product.isTopSeller && (
                    <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      Top Seller
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{product.inStock ? 'In Stock (Sahiwal Clinic)' : 'Out of Stock'}</span>
                </div>
              </div>

              {/* Product Title */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading leading-tight">
                {product.name}
              </h2>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-200 fill-slate-200'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">({product.reviewCount} verified pet parent reviews)</span>
              </div>

              {/* Pricing Section */}
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100/80 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-black text-[#006B4F] font-heading tabular-nums">
                      PKR {product.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      PKR {estimatedMSRP.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-emerald-800 mt-0.5">
                    Save PKR {savings.toLocaleString()} (Clinic Direct Price)
                  </p>
                </div>

                <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs">
                  Save 15%
                </span>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Product Details</h4>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {product.description || "High-quality, clinically evaluated pet healthcare product distributed through Vet for Pet Clinic Sahiwal. Sealed for freshness and stored in climate-controlled conditions."}
                </p>
              </div>

              {/* Highlights List */}
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#006B4F] shrink-0" />
                  <span>Sealed Manufacturer Packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#006B4F] shrink-0" />
                  <span>Approved by Clinic Veterinarians</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#006B4F] shrink-0" />
                  <span>Same-Day Sahiwal Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#006B4F] shrink-0" />
                  <span>Cash on Delivery or JazzCash</span>
                </div>
              </div>
            </div>

            {/* Actions: Quantity Stepper & Add to Cart */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-1">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer ${
                    addedAnimation 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-[#006B4F] hover:bg-[#00543E] text-white'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedAnimation ? 'Added to Cart ✓' : `Add ${quantity} to Cart • PKR ${(product.price * quantity).toLocaleString()}`}</span>
                </button>
              </div>

              {/* Secondary Buttons: Buy Now & WhatsApp */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Buy Now (Direct Checkout)</span>
                </button>

                <a
                  href={`https://wa.me/${clinicInfo.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#128C7E] font-bold text-xs transition-colors flex items-center gap-1.5 border border-emerald-200"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span className="hidden sm:inline">WhatsApp Inquire</span>
                  <span className="sm:hidden">Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
