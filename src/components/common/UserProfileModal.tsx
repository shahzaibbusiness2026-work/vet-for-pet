'use client';

import React, { useState } from 'react';
import { 
  X, 
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
  Heart
} from 'lucide-react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useApp } from '../../context/AppContext';
import { ADMIN_ORDERS, PRODUCTS } from '../../data/mockData';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');
  
  const { handleAddToCart, addToast } = useApp();

  // User Profile Data
  const [userProfile, setUserProfile] = useState({
    name: 'Shahzaib Ahmed',
    email: 'shahzaib.ahmed@example.com',
    phone: '+92 329 0220220',
    address: 'House #45, Street 3, Fareed Town, Sahiwal',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    loyaltyPoints: 450,
    memberSince: 'March 2024',
    tier: 'Gold Pet Parent',
  });

  // Recent purchases detailed data
  const recentPurchases = [
    {
      orderId: 'ORD-1024',
      date: 'Dec 10, 2026',
      total: 5600,
      status: 'Delivered',
      statusColor: 'success' as const,
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
      statusColor: 'success' as const,
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
      statusColor: 'success' as const,
      paymentMethod: 'Cash on Delivery',
      items: [
        { product: PRODUCTS[4], qty: 1, price: 1850 }
      ],
      deliveryAddress: 'Fareed Town, Sahiwal',
      trackingSteps: ['Order Placed', 'Packed', 'Dispatched', 'Delivered']
    }
  ];

  // User's registered pets
  const [userPets, setUserPets] = useState([
    {
      id: 'pet-1',
      name: 'Bella',
      type: 'Cat (Persian)',
      age: '2 Years',
      gender: 'Female',
      vaccination: 'Up to Date',
      lastVisit: 'Nov 28, 2026',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'pet-2',
      name: 'Rocky',
      type: 'Dog (Golden Retriever)',
      age: '1.5 Years',
      gender: 'Male',
      vaccination: 'Due in 3 Weeks',
      lastVisit: 'Dec 02, 2026',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&q=80',
    }
  ]);

  const handleReorder = (product: any) => {
    handleAddToCart(product);
    addToast(`Re-ordered "${product.name}" into your cart!`, 'success');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) return;
    setIsLoggedIn(true);
    setAuthSuccessMsg('Successfully signed in! Welcome back.');
    setUserProfile(prev => ({
      ...prev,
      email: loginEmail,
      name: loginEmail.split('@')[0].toUpperCase()
    }));
    setTimeout(() => {
      setAuthSuccessMsg('');
      setActiveTab(0);
    }, 1200);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    addToast('You have been logged out.', 'info');
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: '20px', sm: '28px' },
          backgroundColor: '#FAF8F5',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 107, 79, 0.25)',
          border: '1px solid rgba(0, 107, 79, 0.1)',
        }
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#006B4F] via-[#00543E] to-[#02231A] text-white p-5 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close user profile"
          >
            <X className="w-5 h-5" />
          </button>

          {isLoggedIn ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-8">
              <div className="flex items-center gap-4">
                <Avatar 
                  src={userProfile.avatar} 
                  alt={userProfile.name}
                  sx={{ 
                    width: { xs: 56, sm: 68 }, 
                    height: { xs: 56, sm: 68 }, 
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.2)' 
                  }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">{userProfile.name}</h2>
                    <Chip 
                      label={userProfile.tier} 
                      size="small"
                      sx={{ 
                        backgroundColor: '#FEF08A', 
                        color: '#854D0E', 
                        fontWeight: 800, 
                        fontSize: '0.65rem',
                        height: 20
                      }} 
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-200">{userProfile.email} • {userProfile.phone}</p>
                  <p className="text-[11px] text-emerald-300/80 mt-0.5">Member since {userProfile.memberSince}</p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end gap-2 bg-white/10 sm:bg-transparent px-3 py-1.5 rounded-xl border border-white/10 sm:border-0">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Loyalty Rewards</span>
                  <p className="text-lg font-black text-white">{userProfile.loyaltyPoints} <span className="text-xs font-normal text-emerald-200">Points</span></p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs text-red-200 hover:text-white flex items-center gap-1 font-semibold ml-auto sm:ml-0 hover:underline cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2">
                <User className="w-6 h-6 text-emerald-300" />
                <span>Pet Parent Portal</span>
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200">Sign in to track orders, manage your pets, and schedule clinic visits.</p>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-emerald-900/10 px-4 sm:px-6">
          <Tabs 
            value={activeTab} 
            onChange={(_, val) => setActiveTab(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#006B4F',
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.88rem',
                color: '#64748B',
                minHeight: 52,
                '&.Mui-selected': {
                  color: '#006B4F',
                },
              },
            }}
          >
            <Tab 
              icon={<ShoppingBag className="w-4 h-4 mr-1.5" />} 
              iconPosition="start" 
              label={`Recent Purchases (${recentPurchases.length})`} 
            />
            <Tab 
              icon={<Heart className="w-4 h-4 mr-1.5" />} 
              iconPosition="start" 
              label={`My Pets (${userPets.length})`} 
            />
            <Tab 
              icon={<User className="w-4 h-4 mr-1.5" />} 
              iconPosition="start" 
              label={isLoggedIn ? "Account Details" : "Sign In / Register"} 
            />
          </Tabs>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-7 max-h-[62vh] overflow-y-auto space-y-6">

          {/* TAB 0: RECENT PURCHASES / ORDERS */}
          {activeTab === 0 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-emerald-950 font-heading">Recent Purchases & Delivery Status</h3>
                  <p className="text-xs text-slate-500">Track current orders or re-order pet nutrition & medications with 1-click.</p>
                </div>
                <Chip 
                  icon={<Truck className="w-3.5 h-3.5 text-emerald-700" />}
                  label="Free Sahiwal Delivery"
                  size="small"
                  sx={{ backgroundColor: '#DCFCE7', color: '#166534', fontWeight: 700, fontSize: '0.72rem' }}
                />
              </div>

              {recentPurchases.map((order) => (
                <div 
                  key={order.orderId}
                  className="bg-white rounded-2xl border border-emerald-900/10 p-4 sm:p-5 shadow-xs space-y-4 hover:border-emerald-300 transition-colors"
                >
                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#006B4F] flex items-center justify-center font-bold text-xs border border-emerald-200">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-slate-900 font-heading">Order #{order.orderId}</span>
                          <Chip 
                            label={order.status} 
                            color={order.statusColor} 
                            size="small" 
                            sx={{ fontWeight: 800, fontSize: '0.68rem', height: 20 }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-500 flex items-center gap-2">
                          <Clock className="w-3 h-3 text-slate-400" /> Placed on {order.date} • {order.paymentMethod}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Total Paid</span>
                      <p className="text-base font-extrabold text-[#006B4F]">PKR {order.total.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Purchased Items List */}
                  <div className="space-y-2.5">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs sm:text-sm py-1">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0" 
                          />
                          <div>
                            <p className="font-bold text-slate-900 line-clamp-1">{item.product.name}</p>
                            <p className="text-[11px] text-slate-500">Qty: {item.qty} × PKR {item.price.toLocaleString()}</p>
                          </div>
                        </div>

                        <Button 
                          size="small"
                          variant="outlined"
                          onClick={() => handleReorder(item.product)}
                          startIcon={<RotateCcw className="w-3 h-3" />}
                          sx={{ 
                            borderRadius: '9999px',
                            borderColor: '#006B4F', 
                            color: '#006B4F', 
                            fontSize: '0.72rem', 
                            fontWeight: 700,
                            py: 0.5,
                            px: 1.5,
                            '&:hover': {
                              backgroundColor: '#EAF7F1',
                              borderColor: '#00543E'
                            }
                          }}
                        >
                          Buy Again
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Tracking Bar */}
                  <div className="bg-[#FAF8F5] rounded-xl p-3 border border-slate-100">
                    <p className="text-[11px] font-bold text-slate-600 mb-2 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#006B4F]" />
                      <span>Delivery Tracking: Dispatched to {order.deliveryAddress}</span>
                    </p>
                    <div className="grid grid-cols-4 gap-1.5">
                      {order.trackingSteps.map((step, i) => (
                        <div key={i} className="text-center">
                          <div className={`h-1.5 rounded-full mb-1 ${i <= 3 ? 'bg-[#006B4F]' : 'bg-slate-200'}`} />
                          <span className="text-[9px] sm:text-[10px] font-semibold text-slate-600 leading-tight block truncate">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 1: MY PETS */}
          {activeTab === 1 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-emerald-950 font-heading">Registered Pet Companions</h3>
                  <p className="text-xs text-slate-500">Medical histories and vaccination milestones registered at Vet for Pet Clinic.</p>
                </div>
                <Button 
                  size="small" 
                  variant="contained" 
                  startIcon={<Plus className="w-3.5 h-3.5" />}
                  onClick={() => addToast('Pet registration form opened!', 'info')}
                  sx={{ 
                    backgroundColor: '#006B4F', 
                    fontWeight: 700, 
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    boxShadow: 'none'
                  }}
                >
                  Add Pet
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userPets.map((pet) => (
                  <div 
                    key={pet.id} 
                    className="bg-white rounded-2xl border border-emerald-900/10 p-4 shadow-xs flex items-center gap-4 hover:border-emerald-300 transition-colors"
                  >
                    <img 
                      src={pet.image} 
                      alt={pet.name} 
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-200 shrink-0" 
                    />
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900 font-heading">{pet.name}</h4>
                        <Chip 
                          label={pet.vaccination} 
                          size="small"
                          sx={{ 
                            height: 18, 
                            fontSize: '0.62rem', 
                            fontWeight: 800,
                            backgroundColor: pet.vaccination.includes('Up to Date') ? '#DCFCE7' : '#FEF08A',
                            color: pet.vaccination.includes('Up to Date') ? '#166534' : '#854D0E',
                          }} 
                        />
                      </div>
                      <p className="text-xs text-slate-600">{pet.type} • {pet.age} ({pet.gender})</p>
                      <p className="text-[11px] text-slate-400">Last Clinic Visit: <span className="font-semibold text-slate-600">{pet.lastVisit}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ACCOUNT DETAILS OR SIGN IN */}
          {activeTab === 2 && (
            <div className="space-y-5">
              {authSuccessMsg && (
                <Alert severity="success" sx={{ borderRadius: '12px' }}>
                  {authSuccessMsg}
                </Alert>
              )}

              {isLoggedIn ? (
                <div className="bg-white rounded-2xl border border-emerald-900/10 p-5 shadow-xs space-y-4">
                  <h3 className="text-base font-bold text-slate-900 font-heading">Primary Contact Information</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 block mb-0.5">FULL NAME</span>
                      <p className="font-bold text-slate-900">{userProfile.name}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 block mb-0.5">PHONE NUMBER</span>
                      <p className="font-bold text-slate-900">{userProfile.phone}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 block mb-0.5">EMAIL ADDRESS</span>
                      <p className="font-bold text-slate-900">{userProfile.email}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 block mb-0.5">PRIMARY CLINIC / DELIVERY ADDRESS</span>
                      <p className="font-bold text-slate-900">{userProfile.address}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <p className="text-xs text-slate-500">Need to update contact details? Contact clinic reception directly.</p>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      size="small"
                      onClick={handleLogout}
                      sx={{ borderRadius: '9999px', textTransform: 'none', fontWeight: 700 }}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLoginSubmit} className="bg-white rounded-2xl border border-emerald-900/10 p-6 shadow-xs space-y-4 max-w-md mx-auto">
                  <div className="text-center space-y-1 mb-2">
                    <h3 className="text-xl font-bold font-heading text-emerald-950">Welcome to Vet for Pet</h3>
                    <p className="text-xs text-slate-500">Enter your email or phone to access recent purchases and pet records.</p>
                  </div>

                  <TextField 
                    fullWidth 
                    size="small"
                    label="Email or Mobile Number" 
                    placeholder="e.g. 0329-0220220 or user@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />

                  <TextField 
                    fullWidth 
                    size="small"
                    type="password"
                    label="Password" 
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />

                  <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth 
                    sx={{ 
                      backgroundColor: '#006B4F', 
                      py: 1.2, 
                      fontWeight: 800, 
                      borderRadius: '9999px',
                      '&:hover': { backgroundColor: '#00543E' }
                    }}
                  >
                    Sign In
                  </Button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsLoggedIn(true);
                        addToast('Signed in with Demo Account!', 'success');
                        setActiveTab(0);
                      }}
                      className="text-xs text-[#006B4F] font-bold hover:underline cursor-pointer"
                    >
                      Instant Demo Login (Shahzaib Ahmed)
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
};
