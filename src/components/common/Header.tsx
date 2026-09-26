import React, { useState } from 'react';
import { PageType } from '../../types';
import { Logo } from './Logo';
import { 
  Phone, 
  Menu, 
  X, 
  ShoppingBag, 
  LayoutDashboard, 
  Calendar,
  MessageCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { CLINIC_INFO } from '../../data/mockData';

interface HeaderProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  cartCount: number;
  openCart: () => void;
  openAppointmentModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  openCart,
  openAppointmentModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageType }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Our Team', page: 'team' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
    { label: 'Shop', page: 'shop' },
  ];

  const handleNavClick = (page: PageType) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top subtle emergency / timing announcement bar */}
      <div className="bg-[#004D38] text-white/95 text-xs py-2 px-4 hidden md:block border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-emerald-200 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mon – Thu & Sat – Sun: 10:00 AM – 10:00 PM</span>
            </span>
            <span className="text-emerald-500/50">•</span>
            <span className="text-emerald-100/90 font-medium">Fri: 3:00 PM – 10:00 PM</span>
            <span className="text-emerald-500/50">•</span>
            <span className="text-emerald-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Fareed Town, Sahiwal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1.5 text-emerald-200 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-white/10"
            >
              <LayoutDashboard className="w-3 h-3 text-emerald-300" />
              <span>Admin Portal</span>
            </button>
            <a 
              href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Vet%20for%20Pet%20Clinic`}
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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-[0_4px_20px_-4px_rgba(0,107,79,0.08)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="focus:outline-none text-left cursor-pointer transition-transform hover:scale-[1.01]"
            aria-label="Vet for Pet Clinic Home"
          >
            <Logo />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
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
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Cart Icon Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full text-slate-700 hover:text-[#006B4F] hover:bg-[#EAF7F1] transition-all cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#006B4F]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 rounded-full bg-[#EF4444] text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Quick Book Appointment CTA */}
            <button
              onClick={openAppointmentModal}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#EAF7F1] hover:bg-[#DCF3EA] text-[#006B4F] text-sm font-bold border border-emerald-200/60 shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#0E8F63]" />
              <span>Book Visit</span>
            </button>

            {/* Phone Call Button */}
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#006B4F] hover:bg-[#00543E] text-white text-[0.94rem] font-bold shadow-md shadow-[#006B4F]/25 hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95 border border-emerald-400/20"
            >
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-ping hidden sm:inline-block" />
              <Phone className="w-4 h-4 fill-white" />
              <span className="tracking-tight">{CLINIC_INFO.phone}</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-emerald-50 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-emerald-100 bg-white px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold text-left transition-colors ${
                      isActive 
                        ? 'bg-[#EAF7F1] text-[#006B4F]' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#006B4F]"></span>}
                  </button>
                );
              })}

              <div className="pt-3 border-t border-gray-100 space-y-2.5">
                <button
                  onClick={() => {
                    handleNavClick('appointment');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#006B4F] text-white font-bold text-base shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  Book an Appointment
                </button>
                
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#006B4F]" />
                  Switch to Admin Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
