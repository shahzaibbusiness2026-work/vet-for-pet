'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  ShoppingBag, 
  Package, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  Plus, 
  Truck, 
  ShieldCheck, 
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  RotateCcw,
  Heart,
  ArrowLeft,
  ChevronRight,
  Award,
  Edit3,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { PawDecor } from '../components/common/PawDecor';
import { RevealOnScroll } from '../components/common/RevealOnScroll';

export const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { handleAddToCart, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'pets' | 'details' | 'rewards'>('orders');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Shahzaib Ahmed',
    email: 'shahzaib.ahmed@example.com',
    phone: '+92 329 0220220',
    address: 'House #45, Street 3, Fareed Town, Sahiwal',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    loyaltyPoints: 450,
    memberSince: 'March 2024',
    tier: 'Gold Pet Parent',
  });

  const [addressInput, setAddressInput] = useState(userProfile.address);
  const [phoneInput, setPhoneInput] = useState(userProfile.phone);

  // Recent purchases detailed data
  const recentPurchases = [
    {
      orderId: 'ORD-1024',
      date: 'Dec 10, 2026',
      total: 5600,
      status: 'Delivered',
      paymentMethod: 'Cash on Delivery (Sahiwal)',
      items: [
        { product: PRODUCTS[0], qty: 1, price: 3200 },
        { product: PRODUCTS[1], qty: 2, price: 440 },
        { product: PRODUCTS[5], qty: 1, price: 1960 },
      ],
      deliveryAddress: 'Fareed Town, Sahiwal',
      trackingSteps: ['Order Placed', 'Packed & Sanitized', 'Dispatched from KIPS Rd', 'Delivered to Doorstep']
    },
    {
      orderId: 'ORD-1022',
      date: 'Nov 28, 2026',
      total: 3200,
      status: 'Delivered',
      paymentMethod: 'JazzCash / EasyPaisa',
      items: [
        { product: PRODUCTS[2], qty: 1, price: 3200 }
      ],
      deliveryAddress: 'Fareed Town, Sahiwal',
      trackingSteps: ['Order Placed', 'Packed', 'Dispatched', 'Delivered']
    },
    {
      orderId: 'ORD-1019',
      date: 'Nov 12, 2026',
      total: 1850,
      status: 'Delivered',
      paymentMethod: 'Cash on Delivery',
      items: [
        { product: PRODUCTS[4], qty: 1, price: 1850 }
      ],
      deliveryAddress: 'Fareed Town, Sahiwal',
      trackingSteps: ['Order Placed', 'Packed', 'Dispatched', 'Delivered']
    }
  ];

  // Registered pets
  const [userPets, setUserPets] = useState([
    {
      id: 'pet-1',
      name: 'Bella',
      type: 'Cat (Persian)',
      age: '2 Years',
      gender: 'Female',
      vaccination: 'Up to Date',
      lastVisit: 'Nov 28, 2026',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=250&q=80',
    },
    {
      id: 'pet-2',
      name: 'Rocky',
      type: 'Dog (Golden Retriever)',
      age: '1.5 Years',
      gender: 'Male',
      vaccination: 'Due in 3 Weeks',
      lastVisit: 'Dec 02, 2026',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=250&q=80',
    }
  ]);

  const handleReorder = (product: any) => {
    handleAddToCart(product);
    addToast(`Re-ordered "${product.name}" into your cart!`, 'success');
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile(prev => ({
      ...prev,
      address: addressInput,
      phone: phoneInput
    }));
    setIsEditingAddress(false);
    setSavedSuccess(true);
    addToast('Account information updated successfully!', 'success');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Top Navigation Bar / Breadcrumb */}
      <div className="bg-white border-b border-emerald-900/10 sticky top-18 sm:top-20 z-30 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button 
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#006B4F] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-2">
            <PawDecor size={16} opacity={1} color="#006B4F" />
            <span className="text-xs sm:text-sm font-bold text-emerald-950 font-heading">
              Pet Parent Account
            </span>
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-[#006B4F] hover:underline"
          >
            Go to Shop ➔
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">
        
        {/* 1. App-Style User Header Card */}
        <RevealOnScroll direction="down" duration={0.4}>
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-emerald-900/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-100/50 to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 relative z-10 text-center sm:text-left">
              <div className="relative">
                <img 
                  src={userProfile.avatar} 
                  alt={userProfile.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-emerald-50 shadow-md"
                />
                <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-[#006B4F] text-white text-[10px] font-extrabold shadow-xs">
                  PRO
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                      {userProfile.name}
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Member since {userProfile.memberSince} • Sahiwal, PK
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200/80 shadow-2xs self-center sm:self-start">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{userProfile.tier}</span>
                  </span>
                </div>

                {/* Quick Profile Stats Bar */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-5 pt-4 border-t border-slate-100 text-center">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-lg sm:text-xl font-extrabold text-[#006B4F] font-heading block tabular-nums">
                      {recentPurchases.length}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Orders Placed</span>
                  </div>

                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-lg sm:text-xl font-extrabold text-[#006B4F] font-heading block tabular-nums">
                      {userPets.length}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Registered Pets</span>
                  </div>

                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-lg sm:text-xl font-extrabold text-amber-600 font-heading block tabular-nums">
                      {userProfile.loyaltyPoints}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Reward Pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* 2. In-App Navigation Segmented Tabs */}
        <div className="bg-white p-1.5 rounded-2xl border border-emerald-900/10 shadow-2xs flex items-center gap-1 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#006B4F] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders ({recentPurchases.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pets')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'pets'
                ? 'bg-[#006B4F] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>My Pets ({userPets.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'details'
                ? 'bg-[#006B4F] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Delivery & Info</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rewards')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'rewards'
                ? 'bg-[#006B4F] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Rewards</span>
          </button>
        </div>

        {/* 3. Tab Contents */}

        {/* TAB A: RECENT PURCHASES / ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                Recent Clinic & Shop Orders
              </h2>
              <span className="text-xs text-slate-400">All prices in PKR</span>
            </div>

            {recentPurchases.map((order) => (
              <div 
                key={order.orderId}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-900/10 shadow-xs space-y-4 hover:border-emerald-200 transition-colors"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-black text-[#006B4F] bg-emerald-50 px-2.5 py-1 rounded-lg">
                      {order.orderId}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{order.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {order.status}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 tabular-nums">
                      PKR {order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-3">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 text-left">
                      <div className="flex items-center gap-3 min-w-0">
                        <img 
                          src={it.product.image} 
                          alt={it.product.name}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-50 shrink-0 border border-slate-100" 
                        />
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
                            {it.product.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Qty: {it.qty} × PKR {it.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleReorder(it.product)}
                        className="px-3 py-1.5 rounded-xl border border-emerald-600/30 text-[#006B4F] hover:bg-emerald-50 text-xs font-bold shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Order Footer Info */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    Delivery: {order.deliveryAddress}
                  </span>
                  <span>Payment: {order.paymentMethod}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB B: MY REGISTERED PETS */}
        {activeTab === 'pets' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                  My Registered Pets
                </h2>
                <p className="text-xs text-slate-500">Linked with clinic clinical records at Vet for Pet Clinic</p>
              </div>

              <Link
                href="/appointment"
                className="px-3.5 py-2 rounded-xl bg-[#006B4F] text-white text-xs font-bold hover:bg-[#00543E] transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Book Checkup</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userPets.map((pet) => (
                <div 
                  key={pet.id}
                  className="bg-white rounded-3xl p-5 border border-emerald-900/10 shadow-xs flex items-center gap-4 text-left hover:border-emerald-200 transition-colors"
                >
                  <img 
                    src={pet.image} 
                    alt={pet.name} 
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-100 shadow-2xs shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-base font-bold text-slate-900 font-heading">{pet.name}</h3>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[#006B4F] text-[10px] font-bold">
                        {pet.vaccination}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{pet.type} • {pet.age}</p>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      Last visit: {pet.lastVisit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB C: PERSONAL & DELIVERY INFO */}
        {activeTab === 'details' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-6 text-left">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                Personal & Delivery Details
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Used for fast doorstep deliveries and appointment reminders in Sahiwal.</p>
            </div>

            {savedSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Your address and phone information have been updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveDetails} className="space-y-4 max-w-xl">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={userProfile.name}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={userProfile.email}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (WhatsApp Active)</label>
                <input 
                  type="tel" 
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Delivery Address (Sahiwal & Nearby)</label>
                <textarea 
                  rows={3}
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#006B4F] hover:bg-[#00543E] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Save Profile Changes
              </button>
            </form>
          </div>
        )}

        {/* TAB D: REWARDS & LOYALTY */}
        {activeTab === 'rewards' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#EAF7F0] to-[#D9F2E6] p-6 rounded-2xl border border-emerald-200">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#006B4F] bg-white px-2.5 py-1 rounded-full shadow-2xs">
                  PAW LOYALTY CLUB
                </span>
                <h3 className="text-xl font-black text-emerald-950 font-heading">
                  {userProfile.loyaltyPoints} Active Paw Points
                </h3>
                <p className="text-xs text-slate-600">
                  Earn 10 points for every PKR 1,000 spent on food, supplies, or veterinary consults.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-[#006B4F]">Next Reward: PKR 500 Discount</span>
                <div className="w-48 bg-white h-2.5 rounded-full overflow-hidden mt-1.5 border border-emerald-200">
                  <div className="bg-[#006B4F] h-full rounded-full w-[75%]" />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">50 points remaining</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 space-y-1.5">
                <ShieldCheck className="w-5 h-5 text-[#006B4F]" />
                <h4 className="text-xs font-bold text-slate-800">Free Health Checkup</h4>
                <p className="text-[11px] text-slate-500">Redeem 600 Paw points on your next clinical checkup.</p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 space-y-1.5">
                <Truck className="w-5 h-5 text-[#006B4F]" />
                <h4 className="text-xs font-bold text-slate-800">Priority Free Delivery</h4>
                <p className="text-[11px] text-slate-500">Complimentary same-day delivery across Fareed Town.</p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 space-y-1.5">
                <Sparkles className="w-5 h-5 text-[#006B4F]" />
                <h4 className="text-xs font-bold text-slate-800">Birthday Pet Gift</h4>
                <p className="text-[11px] text-slate-500">Surprise toy or nutritional treat on your pet's birthday.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
