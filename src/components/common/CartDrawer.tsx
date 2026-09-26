'use client';

import React, { useState } from 'react';
import { CartItem } from '../../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    phone: '',
    address: 'Sahiwal',
    notes: ''
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 3000 || subtotal === 0 ? 0 : 250;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingDetails.name || !shippingDetails.phone) return;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback
    }

    setOrderSuccess(true);
    setTimeout(() => {
      onClearCart();
    }, 2000);
  };

  const resetAndClose = () => {
    setOrderSuccess(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={resetAndClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#F8FAF9]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#006B4F]" />
              <h2 className="text-lg font-bold text-gray-900">Your Pet Supplies Cart</h2>
              <span className="text-xs bg-[#EBF8F3] text-[#006B4F] font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button 
              onClick={resetAndClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {orderSuccess ? (
              <div className="text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 bg-[#EBF8F3] text-[#006B4F] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Order Placed Successfully!</h3>
                <p className="text-sm text-gray-600">
                  Thank you, <span className="font-semibold text-gray-800">{shippingDetails.name}</span>! Our Sahiwal delivery team will contact you at <span className="font-semibold">{shippingDetails.phone}</span> to confirm speedy delivery.
                </p>
                <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-500 font-medium">
                  Estimated Delivery in Sahiwal: Within 2 to 4 Hours
                </div>
                <button
                  onClick={resetAndClose}
                  className="mt-4 px-6 py-2.5 bg-[#006B4F] text-white rounded-full font-bold text-sm hover:bg-[#00543E]"
                >
                  Continue Browsing Shop
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Details Form */
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="text-sm font-bold text-gray-700">Delivery Information (Sahiwal)</span>
                  <button 
                    type="button" 
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-[#006B4F] font-semibold hover:underline"
                  >
                    Back to Cart
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={shippingDetails.name}
                    onChange={(e) => setShippingDetails({...shippingDetails, name: e.target.value})}
                    placeholder="e.g. Fatima Ali"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#006B4F] focus:ring-1 focus:ring-[#006B4F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={shippingDetails.phone}
                    onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})}
                    placeholder="03XX-XXXXXXX"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#006B4F] focus:ring-1 focus:ring-[#006B4F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Delivery Address in Sahiwal *</label>
                  <textarea
                    rows={2}
                    required
                    value={shippingDetails.address}
                    onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                    placeholder="House number, street, colony/town, Sahiwal..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#006B4F] focus:ring-1 focus:ring-[#006B4F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Special Instructions / Pet Notes</label>
                  <input
                    type="text"
                    value={shippingDetails.notes}
                    onChange={(e) => setShippingDetails({...shippingDetails, notes: e.target.value})}
                    placeholder="e.g. Call before arrival, leave at gate"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#006B4F] focus:ring-1 focus:ring-[#006B4F]"
                  />
                </div>

                <div className="bg-[#F0FAF5] p-3.5 rounded-xl border border-[#D1F2E2] text-xs text-gray-700 space-y-1">
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-bold text-[#006B4F]">Cash on Delivery / Bank Transfer</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount to Pay:</span>
                    <span className="font-bold text-gray-900">PKR {total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#006B4F] hover:bg-[#00543E] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Confirm Order (Cash on Delivery)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : items.length === 0 ? (
              /* Empty Cart State */
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-800">Your cart is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Browse our vet-recommended food, grooming supplies, accessories, and supplements!
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-[#006B4F] text-white text-xs font-bold hover:bg-[#00543E]"
                >
                  Explore Pet Products
                </button>
              </div>
            ) : (
              /* Cart Items List */
              <div className="space-y-4">
                {/* Free Delivery progress bar */}
                <div className="p-3 bg-[#F0FAF5] rounded-xl border border-[#D1F2E2]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#006B4F]">
                    <Truck className="w-4 h-4" />
                    {subtotal >= 3000 ? (
                      <span>You have unlocked FREE local delivery in Sahiwal!</span>
                    ) : (
                      <span>Add PKR {(3000 - subtotal).toLocaleString()} more for FREE delivery!</span>
                    )}
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-[#006B4F] h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / 3000) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-3.5 flex gap-3 items-center">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl border border-gray-100 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs font-bold text-[#006B4F] mt-0.5">
                          PKR {item.product.price.toLocaleString()}
                        </p>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-5 text-center text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-900">
                          PKR {(item.product.price * item.quantity).toLocaleString()}
                        </p>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="mt-2 text-gray-400 hover:text-red-500 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && !orderSuccess && (
            <div className="p-5 border-t border-gray-100 bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sahiwal Delivery</span>
                  <span className="font-semibold text-gray-800">
                    {deliveryFee === 0 ? <span className="text-[#006B4F] font-bold">FREE</span> : `PKR ${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-[#006B4F]">PKR {total.toLocaleString()}</span>
                </div>
              </div>

              {!isCheckingOut && (
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3 rounded-xl bg-[#006B4F] hover:bg-[#00543E] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
