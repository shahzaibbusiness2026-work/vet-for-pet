'use client';

import React, { useState } from 'react';
import { PageType, ServiceItem } from '../types';
import { 
  Calendar, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Heart, 
  AlertTriangle, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2,
  FileText,
  Stethoscope
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { PawDecor } from '../components/common/PawDecor';
import { AppointmentCtaBanner } from '../components/common/AppointmentCtaBanner';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesPageProps {
  setCurrentPage: (page: PageType) => void;
  openAppointmentModal: () => void;
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  setCurrentPage,
  openAppointmentModal,
  onSelectService
}) => {
  const { clinicInfo, services, faqs } = useSiteData();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIdx(openFaqIdx === index ? null : index);
  };

  const steps = [
    {
      num: "01",
      title: "Book Appointment",
      desc: "Schedule a visit via web booking or direct phone call."
    },
    {
      num: "02",
      title: "Pet Examination",
      desc: "Our veterinarian conducts a thorough head-to-tail checkup."
    },
    {
      num: "03",
      title: "Tailored Treatment",
      desc: "We administer targeted medications or surgical care."
    },
    {
      num: "04",
      title: "Ongoing Support",
      desc: "Follow-up checkups, nutritional guidance & preventive advice."
    }
  ];

  return (
    <div className="space-y-8 lg:space-y-12 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E7F6EF] via-subtle-cream-warm to-subtle-cream pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
        <PawDecor className="absolute top-12 left-10 hidden md:block" size={48} opacity={0.12} rotate={-15} color="#006B4F" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <RevealOnScroll direction="down" duration={0.4}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-emerald-200 shadow-xs">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#006B4F]">
                    SAHIWAL’S TRUSTED PET CLINIC
                  </span>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.05}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-emerald-950 font-heading tracking-tight leading-[1.1]">
                  Veterinary Services <br />
                  <span className="text-[#006B4F]">for Every Pet Need</span>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.1}>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed">
                  Comprehensive and compassionate veterinary medicine in Sahiwal, dedicated to your pet’s lifelong wellness, comfort, and vitality.
                </p>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.15}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={openAppointmentModal}
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#006B4F] hover:bg-[#00523C] text-white font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all active:scale-95 cursor-pointer"
                  >
                    <Calendar className="w-5 h-5 text-emerald-200" />
                    <span>Book an Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${clinicInfo.phone}`}
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-subtle-cream text-[#006B4F] font-bold text-base border-2 border-emerald-600/30 shadow-xs transition-all active:scale-95"
                  >
                    <Phone className="w-4 h-4 fill-[#006B4F]" />
                    <span>{clinicInfo.phone}</span>
                  </a>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative">
              <RevealOnScroll direction="left" duration={0.5}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-5/4 group">
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=850&q=80"
                    alt="Veterinary services in Sahiwal"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 right-4 bg-white/95 px-4 py-2 rounded-xl shadow-md rotate-3 text-right">
                    <span className="text-[#006B4F] font-script text-lg font-bold leading-tight block">
                      Healthy Pets Happier Lives ♡
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SERVICE TRUST STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-900/10 shadow-sm flex items-center gap-3.5 hover:border-emerald-300 transition-colors min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-emerald-950 font-heading">Trusted Care</h4>
                <p className="text-xs text-slate-500 leading-snug break-words">Sterile, professional medicine</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-900/10 shadow-sm flex items-center gap-3.5 hover:border-emerald-300 transition-colors min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-emerald-950 font-heading">Experienced Team</h4>
                <p className="text-xs text-slate-500 leading-snug break-words">Qualified veterinarians</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-900/10 shadow-sm flex items-center gap-3.5 hover:border-emerald-300 transition-colors min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-emerald-950 font-heading">Modern Facilities</h4>
                <p className="text-xs text-slate-500 leading-snug break-words">Advanced diagnostic tools</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-900/10 shadow-sm flex items-center gap-3.5 hover:border-emerald-300 transition-colors min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-[#006B4F]" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-emerald-950 font-heading">All Pet Types</h4>
                <p className="text-xs text-slate-500 leading-snug break-words">Dogs, cats, rabbits & birds</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 3. DETAILED 12 SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#006B4F] bg-emerald-100/70 px-4 py-1.5 rounded-full inline-block">
              OUR COMPLETE SPECTRUM
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 font-heading tracking-tight">
              Our Veterinary Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Complete care for your pets under one roof. From preventive checkups to complex surgeries, we provide the highest standard of animal medicine in Sahiwal.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <RevealOnScroll key={service.id} direction="up" delay={idx * 0.04} duration={0.4}>
              <div
                onClick={() => onSelectService(service)}
                className="group cursor-pointer bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between h-full transform hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center group-hover:bg-[#006B4F] group-hover:text-white transition-all shadow-xs group-hover:scale-105">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <img
                      src={service.petImage}
                      alt={service.title}
                      className="w-13 h-13 rounded-full object-cover border-2 border-emerald-100 shadow-xs group-hover:scale-110 transition-transform"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-emerald-950 font-heading group-hover:text-[#006B4F] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
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
      </section>

      {/* 4. HOW OUR CARE WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-heading tracking-tight">
              How Our Care Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              We make veterinary visits gentle, transparent, and hassle-free for you and your companion.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <RevealOnScroll key={step.num} direction="up" delay={idx * 0.08} duration={0.4}>
              <div
                className="bg-white p-5 sm:p-6 rounded-2xl border border-emerald-900/10 shadow-sm relative text-left space-y-2.5 sm:space-y-3 hover:border-emerald-300 hover:shadow-md transition-all h-full min-w-0 overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#006B4F] text-white font-extrabold flex items-center justify-center text-sm font-heading shadow-xs shrink-0">
                    {step.num}
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-emerald-950 font-heading break-words">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed break-words">{step.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 5. CONSULTATION & SERVICE INFORMATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.5}>
          <div className="bg-gradient-to-r from-[#EAF6F0] via-subtle-cream to-[#F0FAF5] rounded-3xl p-7 sm:p-10 border border-emerald-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 relative">
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-4/3 group">
                  <img
                    src="https://images.unsplash.com/photo-1594824813633-91c2f9e42104?auto=format&fit=crop&w=750&q=80"
                    alt="Doctor examining dog"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -top-3.5 -right-2 bg-white px-3.5 py-1.5 rounded-xl shadow-md text-xs font-bold text-[#006B4F] rotate-3 border border-emerald-100">
                  Caring for every pawsome life ♡
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5 text-left">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-950 font-heading">
                  Consultation & Service Information
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Every pet is unique, and so is their care regimen. Our veterinarians provide individualized examinations, transparent diagnosis, and customized therapeutic plans.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-emerald-900/10 text-left space-y-1.5 shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-[#006B4F]" />
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-950 font-heading">Customized Care</h4>
                    <p className="text-xs text-slate-500">Tailored to breed, age, and lifestyle.</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-emerald-900/10 text-left space-y-1.5 shadow-xs">
                    <FileText className="w-5 h-5 text-[#006B4F]" />
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-950 font-heading">Clear Guidance</h4>
                    <p className="text-xs text-slate-500">Transparent diagnosis & discharge care.</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-emerald-900/10 text-left space-y-1.5 shadow-xs">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-950 font-heading">Animal Safety</h4>
                    <p className="text-xs text-slate-500">Fear-free examination approach.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 6. PET EMERGENCY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.45}>
          <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-3xl p-7 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-red-400/30">
            <div className="flex items-center gap-5 text-left">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                <AlertTriangle className="w-8 h-8 text-white animate-bounce" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-red-100 bg-red-800/40 px-3 py-1 rounded-full inline-block mb-1">
                  PET EMERGENCY? WE'RE HERE FOR YOU
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  Urgent Care When Your Pet Needs It Most
                </h3>
                <p className="text-sm text-red-100/90 mt-1 leading-relaxed max-w-xl">
                  Prompt clinical attention for acute injuries, accidental toxicity, severe vomiting, breathing distress or sudden illness.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href={`tel:${clinicInfo.phone}`}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white text-red-600 font-black text-base shadow-xl hover:bg-red-50 hover:scale-105 transition-all"
              >
                <Phone className="w-5 h-5 fill-red-600" />
                <span>{clinicInfo.phone}</span>
              </a>
              <div className="flex items-center gap-1.5 text-xs font-bold text-white/90">
                <Clock className="w-4 h-4" />
                <span>Open 7 Days a Week</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-heading tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600">
              Quick answers to common questions regarding visits, vaccinations, and surgical care.
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIdx === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-emerald-900/10 overflow-hidden shadow-xs hover:border-emerald-200 transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-emerald-950 text-sm sm:text-base font-heading hover:text-[#006B4F] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-[#EAF7F1] text-[#006B4F]' : 'bg-slate-50 text-slate-400'}`}>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. APPOINTMENT CTA BANNER */}
      <AppointmentCtaBanner 
        onBookClick={openAppointmentModal}
        title="Book an Appointment Today"
        subtitle="Your pet’s health is just a call away. Compassionate veterinary care in Sahiwal."
      />
    </div>
  );
};
