'use client';

import React, { useState } from 'react';
import { PageType, ServiceItem } from '../types';
import { 
  Calendar, 
  Phone, 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Stethoscope, 
  Syringe, 
  HeartPulse, 
  Scissors, 
  Smile, 
  Utensils, 
  AlertCircle, 
  ShoppingBag,
  Award,
  Users,
  CheckCircle2,
  Clock,
  MapPin
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { PawDecor } from '../components/common/PawDecor';
import { AppointmentCtaBanner } from '../components/common/AppointmentCtaBanner';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import { motion, AnimatePresence } from 'motion/react';

interface HomePageProps {
  setCurrentPage: (page: PageType) => void;
  openAppointmentModal: () => void;
  onSelectService: (service: ServiceItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  openAppointmentModal,
  onSelectService
}) => {
  const { clinicInfo, services, testimonials, galleryItems, siteTexts } = useSiteData();
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [patientCarouselIdx, setPatientCarouselIdx] = useState(0);

  const quickServices = [
    { title: "General Checkups", desc: "Routine health examinations & preventive checks.", icon: Stethoscope },
    { title: "Vaccinations", desc: "Protecting puppies, dogs & cats against disease.", icon: Syringe },
    { title: "Treatment & Surgery", desc: "Advanced sterile surgery & healing care.", icon: HeartPulse },
    { title: "Pet Grooming", desc: "Medicated baths, clipping & hygienic coat care.", icon: Scissors },
  ];

  const happyPatients = [
    { name: "Milo", type: "Cat", tag: "Feline Health", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=450&q=80" },
    { name: "Buddy", type: "Golden Retriever", tag: "Regular Checkup", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=450&q=80" },
    { name: "Bunny", type: "Holland Lop", tag: "Dental Care", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=450&q=80" },
    { name: "Luna", type: "Siamese Cat", tag: "Vaccination", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=450&q=80" },
    { name: "Max", type: "Beagle", tag: "Grooming", image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=450&q=80" },
    { name: "Snowy", type: "Angora Rabbit", tag: "Routine Visit", image: "https://images.unsplash.com/photo-1589952283406-b53a7d13d368?auto=format&fit=crop&w=450&q=80" },
  ];

  const currentTestimonial = testimonials[activeTestimonialIdx % (testimonials.length || 1)] || testimonials[0];

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % (testimonials.length || 1));
  };
  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + testimonials.length) % (testimonials.length || 1));
  };

  const handleNextPatients = () => {
    setPatientCarouselIdx((prev) => (prev + 1) % (happyPatients.length - 2));
  };
  const handlePrevPatients = () => {
    setPatientCarouselIdx((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="space-y-8 lg:space-y-12 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E7F6EF] via-subtle-cream-warm to-subtle-cream pt-10 pb-16 lg:pt-16 lg:pb-28">
        {/* Ambient background glows */}
        <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 left-10 w-96 h-96 bg-teal-200/25 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle Decorative Elements */}
        <PawDecor className="absolute top-12 left-10 hidden md:block" size={48} opacity={0.15} rotate={-15} color="#006B4F" />
        <PawDecor className="absolute bottom-8 left-1/3 hidden md:block" size={56} opacity={0.12} rotate={20} color="#006B4F" />
        <PawDecor className="absolute top-20 right-1/4 hidden lg:block" size={42} opacity={0.16} rotate={35} color="#006B4F" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow */}
              <RevealOnScroll direction="down" duration={0.4} delay={0.05}>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 border border-emerald-200 shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006B4F] animate-ping" />
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#006B4F]">
                    SAHIWAL’S TRUSTED PET CLINIC
                  </span>
                </div>
              </RevealOnScroll>

              {/* Main Heading */}
              <RevealOnScroll direction="up" duration={0.5} delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-emerald-950 font-heading tracking-tight leading-[1.08]">
                  Healthy Pets, <br />
                  <span className="text-[#006B4F] relative inline-block">
                    Happier Lives
                    <span className="absolute -right-10 -top-1 text-[#0E8F63] text-3xl sm:text-4xl animate-bounce">
                      ♡
                    </span>
                  </span>
                </h1>
              </RevealOnScroll>

              {/* Subtitle */}
              <RevealOnScroll direction="up" duration={0.5} delay={0.15}>
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-xl font-normal leading-relaxed">
                  Compassionate medical care, sterile surgery facilities, gentle grooming, and qualified veterinarians for your cherished pets in Sahiwal.
                </p>
              </RevealOnScroll>

              {/* Trust Badges */}
              <RevealOnScroll direction="up" duration={0.5} delay={0.2}>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1 text-xs sm:text-sm font-bold text-slate-700">
                  <div className="flex items-center gap-2 bg-white/90 px-3.5 py-2 rounded-xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
                    <ShieldCheck className="w-4 h-4 text-[#006B4F]" />
                    <span className="text-emerald-950">Expert Veterinary Care</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 px-3.5 py-2 rounded-xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
                    <Sparkles className="w-4 h-4 text-[#0E8F63]" />
                    <span className="text-emerald-950">Modern Equipment</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 px-3.5 py-2 rounded-xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <span className="text-emerald-950">268+ Happy Patients</span>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Dual Action Buttons */}
              <RevealOnScroll direction="up" duration={0.5} delay={0.25}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3 w-full sm:w-auto">
                  <button
                    onClick={openAppointmentModal}
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#006B4F] hover:bg-[#00523C] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#006B4F]/25 hover:shadow-2xl hover:scale-105 transition-all duration-200 active:scale-95 cursor-pointer border border-emerald-400/30"
                  >
                    <Calendar className="w-5 h-5 text-emerald-200" />
                    <span>Book an Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${clinicInfo.phone}`}
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white hover:bg-emerald-50 text-[#006B4F] font-bold text-sm sm:text-base border-2 border-emerald-600/30 hover:border-[#006B4F] shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
                  >
                    <Phone className="w-4 h-4 fill-[#006B4F]" />
                    <span>{clinicInfo.phone}</span>
                  </a>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Hero Visual with Pets Collage (5 cols) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <RevealOnScroll direction="left" duration={0.6} delay={0.15}>
                <div className="relative w-full max-w-md lg:max-w-none">
                  
                  {/* Decorative glowing organic mint backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#006B4F]/20 via-[#10B981]/20 to-transparent rounded-3xl filter blur-2xl -z-10 scale-105" />

                  {/* Hand-drawn style sticky notes */}
                  <div className="absolute -top-5 right-4 bg-white/95 px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-100 rotate-6 z-20 hidden sm:block animate-float-slow">
                    <span className="text-[#006B4F] font-script text-xl font-bold leading-none block">
                      Because they’re family ♡
                    </span>
                  </div>

                  <div className="absolute bottom-6 -left-4 bg-white/95 px-4 py-3 rounded-2xl shadow-xl border border-emerald-100 -rotate-3 z-20 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    </div>
                    <div>
                      <span className="text-[#006B4F] font-script text-lg font-bold leading-none block">
                        Caring for every paw ♡
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">5.0 Star Rated Clinic</span>
                    </div>
                  </div>

                  {/* Main Hero Composite Image (Dog + Cat + Rabbit) */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-5/4 group">
                    <img
                      src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80"
                      alt="Happy pets at Vet for Pet Clinic Sahiwal"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                    
                    {/* Floating pet avatar pills */}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full flex items-center gap-2.5 shadow-lg border border-white/50">
                      <div className="flex -space-x-2">
                        <img 
                          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=100&q=80" 
                          alt="Cat patient" 
                          className="w-7 h-7 rounded-full object-cover border-2 border-white ring-1 ring-emerald-200" 
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=100&q=80" 
                          alt="Rabbit patient" 
                          className="w-7 h-7 rounded-full object-cover border-2 border-white ring-1 ring-emerald-200" 
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-800">Dogs • Cats • Rabbits</span>
                    </div>
                  </div>

                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* 2. QUICK SERVICES STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-14 relative z-20">
        <RevealOnScroll direction="up" duration={0.45}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {quickServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  onClick={() => setCurrentPage('services')}
                  className="group cursor-pointer bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-[0_6px_25px_-4px_rgba(0,107,79,0.08)] hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-1.5"
                >
                  <div className="w-13 h-13 rounded-2xl bg-[#EAF7F1] group-hover:bg-[#006B4F] flex items-center justify-center text-[#006B4F] group-hover:text-white transition-all duration-200 mb-4 shadow-sm group-hover:scale-110">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-[#006B4F] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="pt-3 flex items-center gap-1.5 text-xs font-bold text-[#006B4F] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </section>

      {/* 3. ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Info (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <RevealOnScroll direction="right" duration={0.45}>
              <div className="inline-flex items-center gap-2 text-[#006B4F] bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                <PawDecor size={20} opacity={1} color="#006B4F" />
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#006B4F]">
                  About Vet for Pet Clinic
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" duration={0.45} delay={0.05}>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 font-heading tracking-tight leading-tight">
                Your Pet’s Health is Our Lifelong Priority
              </h3>
            </RevealOnScroll>

            <RevealOnScroll direction="up" duration={0.45} delay={0.1}>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                Vet for Pet Clinic in Sahiwal is dedicated to delivering professional, gentle, and transparent veterinary care. We believe every companion animal deserves accurate diagnosis, sterile surgical safety, and loving care throughout their life.
              </p>
            </RevealOnScroll>

            {/* Stats row: 268+ Happy Clients, 5.0 Clinic Rating, 7+ Years of Trusted Care */}
            <RevealOnScroll direction="up" duration={0.45} delay={0.15}>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 pt-2">
                <div className="bg-white p-2.5 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border border-emerald-900/10 shadow-sm text-left hover:border-emerald-300 transition-colors min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[#006B4F] mb-1 sm:mb-1.5">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span className="text-lg sm:text-2xl lg:text-3xl font-black font-heading tabular-nums text-emerald-950 truncate">{clinicInfo.clientsCount}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider truncate">Happy Clients</p>
                </div>

                <div className="bg-white p-2.5 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border border-emerald-900/10 shadow-sm text-left hover:border-emerald-300 transition-colors min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-amber-500 mb-1 sm:mb-1.5">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 shrink-0" />
                    <span className="text-lg sm:text-2xl lg:text-3xl font-black font-heading tabular-nums text-emerald-950 truncate">{clinicInfo.rating}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider truncate">Clinic Rating</p>
                </div>

                <div className="bg-white p-2.5 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border border-emerald-900/10 shadow-sm text-left hover:border-emerald-300 transition-colors min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-red-500 mb-1 sm:mb-1.5">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-red-500 shrink-0" />
                    <span className="text-lg sm:text-2xl lg:text-3xl font-black font-heading tabular-nums text-emerald-950 truncate">{clinicInfo.yearsCount}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider truncate">Trusted Years</p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" duration={0.45} delay={0.2}>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#006B4F] hover:bg-[#00543E] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Doctor & Pets Photo Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <RevealOnScroll direction="left" duration={0.5}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-square group">
                <img
                  src="https://images.unsplash.com/photo-1594824813633-91c2f9e42104?auto=format&fit=crop&w=850&q=80"
                  alt="Veterinarian with dog and cat"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Top right sticker */}
                <div className="absolute top-4 right-4 bg-white/95 px-4 py-2 rounded-2xl shadow-lg border border-emerald-100 rotate-3 text-right">
                  <span className="text-[#006B4F] font-script text-lg font-bold leading-tight block">
                    Caring for every paw ♡
                  </span>
                </div>

                {/* Bottom badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3.5 border border-white/60">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center shrink-0 shadow-xs">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-950 font-heading">Trusted by Pet Owners in Sahiwal</p>
                    <p className="text-xs text-slate-600 font-medium">Licensed Veterinary Practitioners & Certified Team</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* 4. WHAT WE OFFER / SERVICES SECTION */}
      <section className="bg-gradient-to-b from-subtle-cream via-white to-subtle-cream-warm py-10 border-y border-emerald-900/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <RevealOnScroll direction="up" duration={0.4}>
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#006B4F] bg-emerald-100/70 px-4 py-1.5 rounded-full inline-block">
                WHAT WE OFFER
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 font-heading tracking-tight">
                Our Veterinary Services
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                Comprehensive care for dogs, cats, rabbits and birds under one hygienic, modern roof.
              </p>
            </div>
          </RevealOnScroll>

          {/* 8 Main Services Grid matching reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 8).map((service, idx) => (
              <RevealOnScroll key={service.id} direction="up" delay={idx * 0.05} duration={0.4}>
                <div
                  onClick={() => onSelectService(service)}
                  className="group cursor-pointer bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between h-full transform hover:-translate-y-1.5"
                >
                  <div>
                    {/* Top: Icon + Pet Image Circular Avatar */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center group-hover:bg-[#006B4F] group-hover:text-white transition-all shadow-xs group-hover:scale-105">
                        <Stethoscope className="w-6 h-6" />
                      </div>
                      <img
                        src={service.petImage}
                        alt={service.title}
                        className="w-13 h-13 rounded-full object-cover border-2 border-emerald-100 shadow-sm group-hover:scale-110 transition-transform"
                      />
                    </div>

                    <h3 className="text-lg font-bold text-emerald-950 font-heading group-hover:text-[#006B4F] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#006B4F]">
                    <span>Learn More</span>
                    <div className="w-8 h-8 rounded-full bg-[#EAF7F1] group-hover:bg-[#006B4F] group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('services')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#006B4F] hover:bg-[#00543E] text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
            >
              <span>Explore All 12 Veterinary Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. WHY CHOOSE VET FOR PET CLINIC? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Vet Photo with Cute Puppy (5 cols) */}
          <div className="lg:col-span-5 relative">
            <RevealOnScroll direction="right" duration={0.5}>
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-square group">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=850&q=80"
                  alt="Veterinarian holding puppy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute top-4 right-4 text-4xl text-[#006B4F] font-bold animate-pulse">
                ♡
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Why Choose Features (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <RevealOnScroll direction="up" duration={0.4}>
              <div className="flex items-center gap-2">
                <PawDecor size={24} opacity={1} color="#006B4F" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-heading tracking-tight">
                  Why Choose Vet for Pet Clinic?
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <RevealOnScroll direction="up" delay={0.05} duration={0.4}>
                <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm space-y-2.5 hover:border-emerald-300 hover:shadow-md transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-950 font-heading">Experienced Veterinarians</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    With genuine love for animals and years of dedicated clinical veterinary medicine.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="up" delay={0.1} duration={0.4}>
                <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm space-y-2.5 hover:border-emerald-300 hover:shadow-md transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#006B4F] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#006B4F]" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-950 font-heading">Modern Diagnostic Tools</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For accurate diagnosis, advanced sterile surgery, and reliable rapid laboratory tests.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="up" delay={0.15} duration={0.4}>
                <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm space-y-2.5 hover:border-emerald-300 hover:shadow-md transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-950 font-heading">Friendly & Supportive Staff</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Always here to assist pet parents with kindness, clear guidance, and soothing care.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="up" delay={0.2} duration={0.4}>
                <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm space-y-2.5 hover:border-emerald-300 hover:shadow-md transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#006B4F]" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-950 font-heading">Clean & Safe Environment</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Your pet’s hygiene, safety, and stress-free comfort is our highest clinical priority.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>

        </div>
      </section>

      {/* 6. OUR HAPPY PATIENTS + WHAT PET OWNERS SAY (SPLIT SECTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <RevealOnScroll direction="up" duration={0.5}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Happy Patients Slider (6 cols) */}
            <div className="lg:col-span-6 bg-white p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-emerald-900/10 shadow-md space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <PawDecor size={22} opacity={1} color="#006B4F" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-emerald-950 font-heading">Our Happy Patients</h3>
                    <p className="text-[11px] sm:text-xs text-slate-600">Real pets. Real stories. Healthy lives.</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrevPatients}
                    className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-[#006B4F] transition-colors cursor-pointer"
                    aria-label="Previous patients"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextPatients}
                    className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-[#006B4F] transition-colors cursor-pointer"
                    aria-label="Next patients"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Horizontal pet photos strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
                {happyPatients.slice(patientCarouselIdx, patientCarouselIdx + 4).map((p, i) => (
                  <div key={i} className="group relative rounded-2xl overflow-hidden aspect-square border border-emerald-100 shadow-xs">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 sm:p-2.5">
                      <span className="text-white text-xs font-bold">{p.name}</span>
                      <span className="text-emerald-300 text-[10px]">{p.type}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-right pt-1">
                <button
                  onClick={() => setCurrentPage('gallery')}
                  className="text-xs font-bold text-[#006B4F] hover:underline cursor-pointer flex items-center gap-1 ml-auto"
                >
                  <span>View Full Pet Photo Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* What Pet Owners Say (6 cols) */}
            <div className="lg:col-span-6 bg-white p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-emerald-900/10 shadow-md space-y-4 sm:space-y-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <PawDecor size={22} opacity={1} color="#006B4F" />
                  <h3 className="text-xl font-bold text-emerald-950 font-heading">What Pet Owners Say</h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrevTestimonial}
                    className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-[#006B4F] transition-colors cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextTestimonial}
                    className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-[#006B4F] transition-colors cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Testimonial Quote Card with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-subtle-cream p-6 rounded-2xl border border-emerald-100 relative space-y-3.5"
                >
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    “{currentTestimonial.comment}”
                  </p>

                  <div className="flex items-center gap-3.5 pt-2">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.author}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950 font-heading">{currentTestimonial.author}</h4>
                      <p className="text-xs text-slate-500">{currentTestimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                <span>Verified Customer Reviews</span>
                <span className="font-bold text-[#006B4F]">5.0 ★ on Google Maps</span>
              </div>
            </div>

          </div>
        </RevealOnScroll>
      </section>

      {/* 7. LARGE APPOINTMENT CTA BANNER */}
      <AppointmentCtaBanner 
        onBookClick={openAppointmentModal}
        title="Book an Appointment Today"
        subtitle="Your pet’s health is just a call away. Caring and compassionate veterinary care in Sahiwal."
      />
    </div>
  );
};
