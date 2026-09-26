'use client';

import React, { useState } from 'react';
import { PageType, Doctor } from '../types';
import { 
  Calendar, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Heart, 
  Star, 
  Award, 
  Users, 
  Sparkles, 
  GraduationCap, 
  Clock, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Stethoscope
} from 'lucide-react';
import { PawDecor } from '../components/common/PawDecor';
import { AppointmentCtaBanner } from '../components/common/AppointmentCtaBanner';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import { useSiteData } from '../context/SiteDataContext';

interface TeamPageProps {
  setCurrentPage: (page: PageType) => void;
  openAppointmentModal: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({
  setCurrentPage,
  openAppointmentModal
}) => {
  const { doctors, supportStaff, testimonials, clinicInfo } = useSiteData();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const standards = [
    {
      title: "Licensed Practice",
      desc: "Registered & compliant with all veterinary healthcare authorities."
    },
    {
      title: "Modern Equipment",
      desc: "Advanced diagnostic imaging and sterile treatment facilities."
    },
    {
      title: "Continuous Learning",
      desc: "Regular clinical training in modern surgical and wellness protocols."
    },
    {
      title: "Pet Safety First",
      desc: "Strict hygiene, safe sedation & gentle stress-free animal handling."
    }
  ];

  return (
    <div className="space-y-8 lg:space-y-12 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E7F6EF] via-subtle-cream-warm to-subtle-cream pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
        <PawDecor className="absolute top-10 left-8 hidden md:block" size={44} opacity={0.15} rotate={-10} color="#006B4F" />

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
                  Meet Our <br />
                  <span className="text-[#006B4F]">Caring Team</span>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.1}>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed">
                  Compassionate veterinarians, skilled support nurses, and animal lovers — all working in harmony for healthier, happier lives for your pets.
                </p>
              </RevealOnScroll>

              {/* Trust highlights */}
              <RevealOnScroll direction="up" duration={0.5} delay={0.15}>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 text-xs sm:text-sm font-bold text-slate-700">
                  <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-xl border border-emerald-100 shadow-xs">
                    <PawDecor size={18} opacity={1} color="#006B4F" />
                    <span className="text-emerald-950 font-semibold">Experienced & Caring Team</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-xl border border-emerald-100 shadow-xs">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <span className="text-emerald-950 font-semibold">Pet-First Care Approach</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-xl border border-emerald-100 shadow-xs">
                    <Users className="w-4 h-4 text-[#006B4F]" />
                    <span className="text-emerald-950 font-semibold">Trusted Sahiwal Practice</span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Team Image */}
            <div className="lg:col-span-5 relative">
              <RevealOnScroll direction="left" duration={0.5}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-5/4 group">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=850&q=80"
                    alt="Veterinary medical team"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 right-4 bg-white/95 px-4 py-2 rounded-xl shadow-md rotate-3 text-right">
                    <span className="text-[#006B4F] font-script text-lg font-bold leading-tight block">
                      A team that cares ♡
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OUR VETERINARIANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="flex items-center justify-center gap-2">
              <PawDecor size={22} opacity={1} color="#006B4F" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 font-heading tracking-tight">
                Our Veterinarians
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600">
              Highly qualified and compassionate veterinarians dedicated to clinical precision and gentle pet care.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc, idx) => (
            <RevealOnScroll key={doc.id} direction="up" delay={idx * 0.08} duration={0.4}>
              <div
                className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-sm hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between h-full transform hover:-translate-y-1.5"
              >
                <div>
                  <div className="relative mb-5 overflow-hidden rounded-2xl">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full aspect-square object-cover rounded-2xl border-2 border-emerald-50 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 text-[#006B4F] flex items-center justify-center shadow-md">
                      <PawDecor size={18} opacity={1} color="#006B4F" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-emerald-950 font-heading">{doc.name}</h3>
                  <p className="text-xs font-bold text-[#006B4F] mb-2">{doc.role}</p>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">{doc.bio}</p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#006B4F]" />
                    <span className="font-semibold text-emerald-950">{doc.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#006B4F]" />
                    <span>{doc.experience} Experience</span>
                  </div>
                  <button
                    onClick={() => openAppointmentModal()}
                    className="w-full mt-3 py-2.5 rounded-xl bg-[#EAF7F1] hover:bg-[#006B4F] text-[#006B4F] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book with {doc.name.split(' ')[1]}</span>
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 3. CERTIFICATIONS & STANDARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.5}>
          <div className="bg-gradient-to-r from-[#EAF6F0] via-subtle-cream to-[#F0FAF5] rounded-3xl p-7 sm:p-12 border border-emerald-200/80 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-5 text-left">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-7 h-7 text-[#006B4F]" />
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-heading">
                    Our Certifications & Standards
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600">
                  We observe the highest clinical guidelines in veterinary medicine, surgical sterile protocol, and stress-free animal handling.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {standards.map((s, idx) => (
                    <div key={idx} className="bg-white p-4.5 rounded-xl border border-emerald-900/10 text-left space-y-1 shadow-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#006B4F]" />
                        <h4 className="text-sm font-bold text-emerald-950 font-heading">{s.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500 pl-6 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 relative text-center">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-square max-w-xs mx-auto group">
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80"
                    alt="High standards for pets"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="font-script text-xl font-bold text-[#006B4F]">
                    High Standards, Happier Pets ♡
                  </span>
                </div>
              </div>

            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 4. FEATURED VETERINARIAN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.5}>
          <div className="bg-[#004230] text-white rounded-3xl p-7 sm:p-12 shadow-2xl relative overflow-hidden border border-emerald-500/20">
            <PawDecor className="absolute bottom-2 right-4" size={100} opacity={0.06} color="#FFFFFF" rotate={-25} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-5 relative">
                <div className="rounded-2xl overflow-hidden border-2 border-emerald-400/40 aspect-4/3 group">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
                    alt="Dr. Ahmad Raza"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute top-3 right-3 text-3xl text-emerald-300">
                  ♡
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Stethoscope className="w-5 h-5" />
                  <span className="text-xs font-extrabold uppercase tracking-widest">
                    Meet the Lead Veterinary Surgeon
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                  Dr. Ahmad Raza
                </h3>
                <p className="text-sm font-semibold text-emerald-300">
                  Senior Veterinarian & Clinic Head
                </p>

                <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
                  With over 8 years of clinical experience, Dr. Ahmad is passionate about delivering compassionate, evidence-based veterinary care to pets across Sahiwal. He works closely with owners to formulate personalized preventive and post-operative regimens.
                </p>

                <div className="pt-3 flex flex-wrap gap-4 items-center">
                  <button
                    onClick={openAppointmentModal}
                    className="px-7 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-[#006B4F] font-bold text-sm sm:text-base shadow-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    Book with Dr. Ahmad ➔
                  </button>
                  <span className="text-xs text-emerald-200 font-medium">
                    UVAS Graduate • M.Phil Veterinary Surgery
                  </span>
                </div>
              </div>

            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 5. OUR SUPPORT STAFF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Users className="w-6 h-6 text-[#006B4F]" />
              <h2 className="text-3xl font-extrabold text-emerald-950 font-heading">
                Our Support Staff
              </h2>
            </div>
            <p className="text-sm text-slate-600">
              Our dedicated veterinary technicians and assistants ensure smooth appointments and calm pet handling.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {supportStaff.map((staff, idx) => (
            <RevealOnScroll key={staff.id} direction="up" delay={idx * 0.08} duration={0.4}>
              <div className="text-center space-y-2.5 bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs hover:border-emerald-200 transition-colors">
                <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-emerald-100 shadow-sm group">
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-base font-bold text-emerald-950 font-heading">{staff.name}</h4>
                <p className="text-xs text-[#006B4F] font-semibold">{staff.role}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 6. WHAT PET PARENTS SAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-3xl font-extrabold text-emerald-950 font-heading">
              What Pet Parents Say
            </h2>
            <p className="text-sm text-slate-600">
              Real testimonials from pet owners who trust our veterinary team.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, idx) => (
            <RevealOnScroll key={t.id} direction="up" delay={idx * 0.08} duration={0.4}>
              <div
                className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm space-y-3.5 flex flex-col justify-between h-full hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex text-amber-400 gap-1 mb-2">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                    “{t.comment}”
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-100"
                  />
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-emerald-950 font-heading">{t.author}</h4>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 7. APPOINTMENT CTA BANNER */}
      <AppointmentCtaBanner 
        onBookClick={openAppointmentModal}
        title="Book an Appointment Today"
        subtitle="Your pet’s health is in dedicated hands with our compassionate veterinary team."
      />
    </div>
  );
};
