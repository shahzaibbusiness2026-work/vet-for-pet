import React from 'react';
import { Calendar, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { PawDecor } from './PawDecor';
import { RevealOnScroll } from './RevealOnScroll';

interface AppointmentCtaBannerProps {
  onBookClick?: () => void;
  title?: string;
  subtitle?: string;
  showPetImage?: boolean;
}

export const AppointmentCtaBanner: React.FC<AppointmentCtaBannerProps> = ({
  onBookClick,
  title = "Book an Appointment Today",
  subtitle = "Your pet's health is just a call away. Caring and compassionate veterinary care in Sahiwal.",
}) => {
  const { clinicInfo } = useSiteData();
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <RevealOnScroll direction="up" duration={0.5}>
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#00543E] via-[#006B4F] to-[#0A7A59] text-white p-5 sm:p-8 lg:p-12 shadow-2xl shadow-[#006B4F]/20 border border-emerald-500/20">
          {/* Ambient lighting glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-72 h-72 bg-teal-300/10 rounded-full blur-2xl pointer-events-none" />

          {/* Decorative background paw watermarks */}
          <PawDecor className="absolute -top-4 left-1/4" size={70} opacity={0.08} color="#FFFFFF" rotate={15} />
          <PawDecor className="absolute bottom-2 right-1/3" size={90} opacity={0.08} color="#FFFFFF" rotate={-20} />
          <PawDecor className="absolute top-1/2 right-10" size={60} opacity={0.08} color="#FFFFFF" rotate={40} />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Left Title & Text */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-left w-full lg:w-auto min-w-0">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shrink-0 shadow-inner">
                <Calendar className="w-7 h-7 sm:w-10 sm:h-10 text-[#6EE7B7]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1 flex-wrap">
                  <span>Fast & Caring Service</span>
                  <span>•</span>
                  <span>Fareed Town Sahiwal</span>
                </div>
                <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-heading leading-tight break-words">
                  {title}
                </h3>
                <p className="text-xs sm:text-base text-emerald-100/90 mt-1.5 max-w-xl font-normal leading-relaxed">
                  {subtitle}
                </p>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto justify-start lg:justify-end shrink-0">
              <a
                href={`tel:${clinicInfo.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-4 rounded-full bg-white hover:bg-emerald-50 text-[#006B4F] font-bold text-xs sm:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
              >
                <Phone className="w-4 h-4 fill-[#006B4F]" />
                <span>{clinicInfo.phone}</span>
              </a>

              <a
                href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20${encodeURIComponent(clinicInfo.name)},%20I%20would%20like%20to%20inquire%20about%20an%20appointment`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-4 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs sm:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-transparent" />
                <span>WhatsApp Us</span>
              </a>

              {onBookClick && (
                <button
                  onClick={onBookClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 rounded-full bg-black/20 hover:bg-black/30 text-white font-semibold text-xs sm:text-sm border border-white/20 hover:border-white/40 transition-all cursor-pointer"
                >
                  <span>Book Online Form</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
