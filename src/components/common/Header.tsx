'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  User,
  LayoutDashboard, 
  MessageCircle, 
  Clock, 
  Sparkles
} from 'lucide-react';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import { useSiteData } from '../../context/SiteDataContext';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { clinicInfo } = useSiteData();
  const { totalCartCount, openCart, openProfileModal } = useApp();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Our Team', href: '/team' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
    { label: 'Shop', href: '/shop' },
  ];

  return (
    <>
      {/* Top subtle emergency / timing announcement bar */}
      <div className="bg-[#004D38] text-white/95 text-xs py-2 px-4 hidden md:block border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-emerald-200 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{clinicInfo.hoursWeekday}</span>
            </span>
            <span className="text-emerald-500/50">•</span>
            <span className="text-emerald-100/90 font-medium">{clinicInfo.hoursFriday}</span>
            <span className="text-emerald-500/50">•</span>
            <Chip 
              size="small" 
              icon={<Sparkles className="w-3 h-3 text-emerald-300" />} 
              label="Fareed Town, Sahiwal" 
              sx={{ 
                height: 22, 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                color: '#6EE7B7', 
                fontWeight: 600,
                fontSize: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                '& .MuiChip-icon': { color: '#6EE7B7' }
              }} 
            />
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/admin"
              className="flex items-center gap-1.5 text-emerald-200 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-white/10 cursor-pointer"
            >
              <LayoutDashboard className="w-3 h-3 text-emerald-300" />
              <span>Admin Portal</span>
            </Link>
            <a 
              href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20${encodeURIComponent(clinicInfo.name)}`}
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-[0_4px_20px_-4px_rgba(0,107,79,0.08)] transform-gpu will-change-transform">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <Link 
            href="/"
            className="focus:outline-none text-left cursor-pointer transition-transform hover:scale-[1.01] min-w-0 shrink"
            aria-label={`${clinicInfo.name} Home`}
          >
            <Logo 
              title={clinicInfo.name} 
              subtext={clinicInfo.tagline} 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-full text-[0.95rem] font-semibold transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'text-[#006B4F] bg-[#EAF7F1] font-bold shadow-xs' 
                      : 'text-slate-600 hover:text-[#006B4F] hover:bg-emerald-50/50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#006B4F] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons: Cart and Profile (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-3 shrink-0">
            {/* Cart Icon Button with Material UI Badge and Tooltip */}
            <Tooltip title="View Shopping Cart">
              <button
                onClick={openCart}
                className="relative p-2.5 rounded-full text-slate-700 hover:text-[#006B4F] hover:bg-[#EAF7F1] transition-all cursor-pointer"
                aria-label="View Shopping Cart"
              >
                <Badge 
                  badgeContent={totalCartCount} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#EF4444',
                      fontWeight: 800,
                      fontSize: '0.7rem',
                    }
                  }}
                >
                  <ShoppingBag className="w-5 h-5 text-[#006B4F]" />
                </Badge>
              </button>
            </Tooltip>

            {/* User Profile / Account Button */}
            <Tooltip title="User Account & Recent Purchases">
              <button
                onClick={openProfileModal}
                className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-full text-slate-700 hover:text-[#006B4F] hover:bg-[#EAF7F1] border border-transparent hover:border-emerald-200 transition-all cursor-pointer"
                aria-label="User Account and Orders"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#006B4F] to-[#0E8F63] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700">
                  Profile
                </span>
              </button>
            </Tooltip>
          </div>

          {/* Mobile Menu Hamburger Button (Visible on screens < lg) */}
          <div className="lg:hidden flex items-center shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative p-2.5 rounded-xl text-slate-700 hover:bg-emerald-50 focus:outline-none cursor-pointer border border-emerald-900/10 shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#006B4F]" />
              ) : (
                <>
                  <Menu className="w-6 h-6 text-[#006B4F]" />
                  {/* Subtle red indicator dot on mobile when cart has items */}
                  {totalCartCount > 0 && (
                    <span className="md:hidden absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                  )}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer: Navigation Links FIRST, Account/Cart/WhatsApp LAST */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-emerald-100 bg-white px-4 pt-4 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
            {/* 1. Navigation Links (FIRST) */}
            <div className="flex flex-col space-y-1 pb-4">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pb-1">Clinic Pages</p>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-left transition-colors cursor-pointer ${
                      isActive 
                        ? 'bg-[#EAF7F1] text-[#006B4F]' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#006B4F]"></span>}
                  </Link>
                );
              })}

              <div className="pt-2">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#006B4F]" />
                  Admin Management Dashboard
                </Link>
              </div>
            </div>

            {/* 2. My Account, Shopping Cart & WhatsApp Chat (LAST) */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pb-0.5">Account & Quick Actions</p>

              {/* My Account & Purchases Card */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openProfileModal();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50/90 to-teal-50/50 hover:bg-emerald-100/60 border border-emerald-200/90 text-left transition-all cursor-pointer shadow-xs active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#006B4F] to-[#0E8F63] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ring-2 ring-white">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-extrabold text-slate-900 font-heading">My Account & Purchases</p>
                      <span className="px-1.5 py-0.5 rounded-md bg-[#006B4F] text-white text-[9px] font-bold uppercase tracking-wider">
                        Gold
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">Track orders, recent purchases & pets</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-white bg-[#006B4F] hover:bg-[#00543E] px-3 py-1.5 rounded-xl shadow-xs shrink-0">
                  Profile
                </span>
              </button>

              {/* Shopping Cart Access Card */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-emerald-50/50 border border-emerald-900/10 text-left transition-all cursor-pointer shadow-xs active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-2xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                    <ShoppingBag className="w-5 h-5 text-[#006B4F]" />
                    {totalCartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[11px] font-black flex items-center justify-center shadow-xs">
                        {totalCartCount}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-extrabold text-emerald-950 font-heading">Shopping Cart</p>
                      {totalCartCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-extrabold">
                          {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {totalCartCount > 0 ? 'Review items & proceed to checkout' : 'Your cart is currently empty'}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors shrink-0 ${
                  totalCartCount > 0 
                    ? 'bg-[#006B4F] text-white border-[#006B4F] shadow-xs' 
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  View Cart
                </span>
              </button>

              {/* WhatsApp Chat & Consultation */}
              <a
                href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20${encodeURIComponent(clinicInfo.name)}`}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/60 hover:bg-emerald-100/50 border border-emerald-100 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#25D366]/15 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">WhatsApp Chat</p>
                    <p className="text-[11px] text-slate-500">Fast doctor chat & prescription help</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#128C7E] bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                  Chat
                </span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
