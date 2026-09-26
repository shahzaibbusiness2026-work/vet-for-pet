'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  Heart,
  ExternalLink
} from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';

export const Footer: React.FC = () => {
  const { clinicInfo } = useSiteData();
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Our Team', href: '/team' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
    { label: 'Shop', href: '/shop' },
  ];

  return (
    <footer className="bg-subtle-cream-50 border-t border-emerald-900/10 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative Paw Background Watermark */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 translate-x-12 translate-y-12">
        <svg width="280" height="280" viewBox="0 0 24 24" fill="#006B4F">
          <path d="M12 10.5C9.8 10.5 8 12.3 8 15C8 17.5 10 20 12 20C14 20 16 17.5 16 15C16 12.3 14.2 10.5 12 10.5Z" />
          <ellipse cx="8.5" cy="7.5" rx="1.8" ry="2.4" />
          <ellipse cx="15.5" cy="7.5" rx="1.8" ry="2.4" />
          <ellipse cx="5.2" cy="11.5" rx="1.6" ry="2.2" />
          <ellipse cx="18.8" cy="11.5" rx="1.6" ry="2.2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200/70">
          
          {/* Column 1: Brand & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo title={clinicInfo.name} subtext={clinicInfo.tagline} />
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Providing modern, compassionate, and affordable veterinary care in Sahiwal. We treat your beloved pets like family with expert medicine and a gentle touch.
            </p>

            {/* Social Icons matching the design */}
            <div className="flex items-center gap-2.5 pt-1">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Facebook"
              >
                <span className="font-bold text-sm">f</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <span className="font-bold text-xs">IG</span>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="YouTube"
              >
                <span className="font-bold text-xs">YT</span>
              </a>
              <a 
                href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20${encodeURIComponent(clinicInfo.name)}`} 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="WhatsApp"
              >
                <span className="font-bold text-xs">WA</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-emerald-950 uppercase tracking-wider font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-[#006B4F] font-medium transition-colors text-left"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Information (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-emerald-950 uppercase tracking-wider font-heading">
              Contact Information
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#006B4F] shrink-0 mt-0.5" />
                <span>{clinicInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#006B4F] shrink-0" />
                <a href={`tel:${clinicInfo.phone}`} className="font-semibold text-emerald-950 hover:text-[#006B4F]">
                  {clinicInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#006B4F] shrink-0" />
                <a href={`mailto:${clinicInfo.email}`} className="hover:text-[#006B4F]">
                  {clinicInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#006B4F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-800">{clinicInfo.hoursWeekday}</p>
                  <p className="text-xs text-slate-500">{clinicInfo.hoursFriday}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Map Visual Preview (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <Link 
              href="/contact"
              className="group cursor-pointer block rounded-2xl overflow-hidden border border-emerald-900/10 bg-[#F2F6F4] relative shadow-sm hover:shadow-md transition-all"
            >
              {/* Stylized vector map graphic */}
              <div className="h-28 w-full relative bg-[#EBF1ED] flex items-center justify-center overflow-hidden">
                {/* Simplified vector road grid */}
                <div className="absolute inset-0 opacity-40">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="20" x2="300" y2="20" stroke="#CBD5E1" strokeWidth="6" />
                    <line x1="0" y1="70" x2="300" y2="70" stroke="#CBD5E1" strokeWidth="8" />
                    <line x1="60" y1="0" x2="60" y2="120" stroke="#93C5FD" strokeWidth="8" />
                    <line x1="180" y1="0" x2="180" y2="120" stroke="#CBD5E1" strokeWidth="6" />
                    <path d="M0,90 Q90,50 250,90" fill="none" stroke="#FDE047" strokeWidth="4" />
                  </svg>
                </div>

                {/* Map Pin Label */}
                <div className="relative z-10 flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg shadow-md border border-gray-100 group-hover:scale-105 transition-transform">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#DC2626] flex items-center justify-center text-white text-[9px] font-bold">
                    •
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-gray-900 leading-tight">Vet for Pet Clinic</p>
                    <p className="text-[9px] text-gray-500 leading-tight">Fareed Town, Sahiwal</p>
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-white flex items-center justify-between text-xs text-[#006B4F] font-semibold">
                <span>View Clinic on Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </Link>
            <p className="text-[11px] text-gray-400">
              Convenient parking available on KIPS Road.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© 2026 Vet for Pet Clinic. All Rights Reserved.</p>
          <p className="flex items-center gap-1 font-medium text-gray-600">
            Designed with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> for <span className="text-[#006B4F] font-bold">Happy Pets</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};
