import React from 'react';
import { PageType } from '../types';
import { 
  Calendar, 
  Phone, 
  Heart, 
  ShieldCheck, 
  Target, 
  Eye, 
  Users, 
  Sparkles, 
  Award, 
  ArrowRight,
  Stethoscope,
  Smile,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { PawDecor } from '../components/common/PawDecor';
import { AppointmentCtaBanner } from '../components/common/AppointmentCtaBanner';
import { RevealOnScroll } from '../components/common/RevealOnScroll';

interface AboutPageProps {
  setCurrentPage: (page: PageType) => void;
  openAppointmentModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  setCurrentPage,
  openAppointmentModal
}) => {
  const { clinicInfo } = useSiteData();
  const milestones = [
    {
      year: "2017",
      title: "Our Beginning",
      desc: "Vet for Pet Clinic was established in Sahiwal with a vision to serve companion pets and their devoted families."
    },
    {
      year: "2019",
      title: "Expanded Services",
      desc: "Added ultrasound diagnostics, blood biochemistry analyzers and surgical suites."
    },
    {
      year: "2021",
      title: "Growing Community",
      desc: "Crossed 1,000+ treated pets and established ourselves as a trusted animal clinic in Sahiwal."
    },
    {
      year: "2023",
      title: "Upgraded Facilities",
      desc: "Equipped sterile operation theaters, isolation wards, and professional pet grooming studios."
    },
    {
      year: "Today",
      title: "Continuing Excellence",
      desc: "Delivering modern veterinary diagnostics and wellness for healthier pets and happier homes."
    }
  ];

  const facilities = [
    { name: "Reception & Check-in", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=500&q=80" },
    { name: "Consultation Suite", img: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=500&q=80" },
    { name: "Surgery & Treatment Room", img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=500&q=80" },
    { name: "Pet Pharmacy & Supplies", img: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=500&q=80" },
    { name: "Comfortable Waiting Area", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80" }
  ];

  return (
    <div className="space-y-8 lg:space-y-12 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E7F6EF] via-subtle-cream-warm to-subtle-cream pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
        <PawDecor className="absolute top-10 left-8 hidden md:block" size={44} opacity={0.15} rotate={-10} color="#006B4F" />
        <PawDecor className="absolute bottom-6 right-1/4 hidden md:block" size={50} opacity={0.12} rotate={25} color="#006B4F" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <RevealOnScroll direction="down" duration={0.4}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-emerald-200 shadow-xs">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#006B4F]">
                    ABOUT US
                  </span>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-emerald-950 font-heading tracking-tight leading-[1.1]">
                  About Vet for <br />
                  <span className="text-[#006B4F]">Pet Clinic</span>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.15}>
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-xl leading-relaxed">
                  Trusted, compassionate and professional veterinary medicine in Sahiwal. Because healthier pets create happier families.
                </p>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.2}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
                  <button
                    onClick={openAppointmentModal}
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#006B4F] hover:bg-[#00523C] text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all active:scale-95 cursor-pointer"
                  >
                    <Calendar className="w-5 h-5 text-emerald-200" />
                    <span>Book an Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${clinicInfo.phone}`}
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white hover:bg-emerald-50 text-[#006B4F] font-bold text-sm sm:text-base border-2 border-emerald-600/30 shadow-xs transition-all active:scale-95"
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
                    src="https://images.unsplash.com/photo-1594824813633-91c2f9e42104?auto=format&fit=crop&w=850&q=80"
                    alt="Vet for Pet Clinic care team"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 right-4 bg-white/95 px-4 py-2 rounded-xl shadow-md rotate-3 text-right">
                    <span className="text-[#006B4F] font-script text-lg font-bold leading-tight block">
                      Healthy Pets Happier Families ♡
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <RevealOnScroll direction="right" duration={0.5}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/3 group">
                <img
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=850&q=80"
                  alt="Clinic entrance with happy golden retriever"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2.5 border border-white/60">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">Your Pet's Health is Our Priority</span>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-xl shadow-lg border border-emerald-100 rotate-6 hidden sm:block">
                <span className="text-[#006B4F] font-script text-lg font-bold">
                  Because they’re family ♡
                </span>
              </div>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-6 space-y-4 text-left">
            <RevealOnScroll direction="up" duration={0.4}>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#006B4F] bg-emerald-100/70 px-3.5 py-1.5 rounded-full inline-block">
                OUR STORY
              </span>
            </RevealOnScroll>
            <RevealOnScroll direction="up" duration={0.45} delay={0.05}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 font-heading tracking-tight leading-tight">
                Caring for Pets, Building Healthier Communities in Sahiwal
              </h2>
            </RevealOnScroll>
            <RevealOnScroll direction="up" duration={0.45} delay={0.1}>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                Vet for Pet Clinic was founded with a profound core conviction: every animal deserves tender, high-standard veterinary medicine. We established our practice in Fareed Town, Sahiwal to offer modern, trustworthy, and accessible care for dogs, cats, rabbits, and birds.
              </p>
            </RevealOnScroll>
            <RevealOnScroll direction="up" duration={0.45} delay={0.15}>
              <p className="text-slate-600 text-base leading-relaxed">
                Today, we stand proudly as Sahiwal's premier pet healthcare destination, recognized for skilled veterinary surgery, advanced lab testing, and genuine dedication to animal welfare.
              </p>
            </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* 3. 4 PILLARS (MISSION / VISION / VALUES / COMMITMENT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <RevealOnScroll direction="up" delay={0.05} duration={0.4}>
            <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm space-y-3 hover:border-emerald-300 hover:shadow-lg transition-all h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center">
                <PawDecor size={24} opacity={1} color="#006B4F" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 font-heading">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To provide compassionate, professional, and accessible veterinary medicine for every pet in Sahiwal and surrounding areas.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1} duration={0.4}>
            <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm space-y-3 hover:border-emerald-300 hover:shadow-lg transition-all h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center">
                <Target className="w-6 h-6 text-[#006B4F]" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 font-heading">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To be Sahiwal’s most trusted veterinary institution, renowned for clinical excellence, innovation, and an empathetic care culture.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.15} duration={0.4}>
            <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm space-y-3 hover:border-emerald-300 hover:shadow-lg transition-all h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#006B4F]" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 font-heading">Our Values</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Compassion, integrity, medical precision, pet parent education, and unconditional love for animals steer every decision we make.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2} duration={0.4}>
            <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm space-y-3 hover:border-emerald-300 hover:shadow-lg transition-all h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center">
                <Users className="w-6 h-6 text-[#006B4F]" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 font-heading">Our Commitment</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We cultivate enduring bonds with pet guardians through open consultations, clear care plans, and dependable emergency assistance.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 4. STATISTICS SECTION */}
      <section className="bg-gradient-to-r from-[#EAF6F0] via-subtle-cream to-[#EAF6F0] py-12 border-y border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="up" duration={0.45}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-center">
              
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[#006B4F]">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  <span className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading tabular-nums text-emerald-950">{clinicInfo.clientsCount}</span>
                </div>
                <h4 className="text-xs sm:text-base font-bold text-emerald-950">Happy Clients</h4>
                <p className="text-[10px] sm:text-xs text-slate-600">Real families. Cherished pets.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 text-amber-500">
                  <Sparkles className="w-6 h-6 fill-amber-400" />
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tabular-nums text-emerald-950">{clinicInfo.rating}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-emerald-950">Clinic Rating</h4>
                <p className="text-xs text-slate-600">5.0 Star rated on Google Reviews.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 text-red-500">
                  <Heart className="w-6 h-6 fill-red-500" />
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tabular-nums text-emerald-950">{clinicInfo.yearsCount}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-emerald-950">Years of Care</h4>
                <p className="text-xs text-slate-600">Trusted community service in Sahiwal.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 text-[#006B4F]">
                  <ShieldCheck className="w-6 h-6" />
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tabular-nums text-emerald-950">100%</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-emerald-950">Pet-Focused Care</h4>
                <p className="text-xs text-slate-600">Dedicated safety and hygiene always.</p>
              </div>

            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 5. TIMELINE / MILESTONES IN OUR JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#006B4F] bg-emerald-100/70 px-3.5 py-1.5 rounded-full inline-block">
              OUR JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-heading tracking-tight">
              Milestones in Our Journey
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {milestones.map((m, idx) => (
            <RevealOnScroll key={idx} direction="up" delay={idx * 0.08} duration={0.4}>
              <div 
                className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm text-center space-y-2.5 relative hover:border-emerald-300 hover:shadow-md transition-all h-full"
              >
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#EAF7F1] text-xs font-black text-[#006B4F] font-heading">
                  {m.year}
                </span>
                <h4 className="text-base font-bold text-emerald-950 font-heading">{m.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 6. WHY PET OWNERS TRUST US (5 CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-heading tracking-tight">
              Why Pet Owners Trust Us
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              We go beyond medication — we provide comprehensive care, prevention, and support for every stage of your pet’s journey.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <RevealOnScroll direction="up" delay={0.05} duration={0.4}>
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center space-y-2 hover:border-emerald-300 transition-colors h-full">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006B4F] flex items-center justify-center mx-auto">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-emerald-950 font-heading">Experienced Team</h4>
              <p className="text-xs text-slate-500">Qualified veterinarians with extensive surgical experience.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1} duration={0.4}>
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center space-y-2 hover:border-emerald-300 transition-colors h-full">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-emerald-950 font-heading">Modern Facilities</h4>
              <p className="text-xs text-slate-500">Advanced diagnostic and treatment equipment for accurate care.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.15} duration={0.4}>
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center space-y-2 hover:border-emerald-300 transition-colors h-full">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
                <Heart className="w-5 h-5 fill-red-500" />
              </div>
              <h4 className="text-sm font-bold text-emerald-950 font-heading">Personalized Care</h4>
              <p className="text-xs text-slate-500">Tailored treatment plans for every pet’s unique medical profile.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2} duration={0.4}>
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center space-y-2 hover:border-emerald-300 transition-colors h-full">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Smile className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-emerald-950 font-heading">Friendly Staff</h4>
              <p className="text-xs text-slate-500">A warm, welcoming, fear-free environment for anxious animals.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.25} duration={0.4}>
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center space-y-2 hover:border-emerald-300 transition-colors h-full">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-emerald-950 font-heading">Affordable & Trusted</h4>
              <p className="text-xs text-slate-500">Transparent pricing without hidden diagnostic surprises.</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 7. FOUNDER SECTION: DR. AHMAD RAZA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.5}>
          <div className="bg-gradient-to-r from-[#EAF6F0] via-subtle-cream-warm to-[#F0FAF5] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 border border-emerald-200/80 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 relative">
                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/3 group">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=750&q=80"
                    alt="Dr. Ahmad Raza with dog"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -top-3.5 -left-3.5 bg-white px-3.5 py-1.5 rounded-xl shadow-md text-xs font-bold text-[#006B4F] rotate-[-4deg] border border-emerald-100">
                  Pets Deserve the Best Care ♡
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5 text-left">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#006B4F] bg-emerald-100/70 px-3.5 py-1.5 rounded-full inline-block">
                  A MESSAGE FROM OUR FOUNDER
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-heading">
                  Dr. Ahmad Raza
                </h3>
                <p className="text-sm font-bold text-[#0E8F63]">
                  Founder & Lead Veterinary Surgeon
                </p>
                
                <blockquote className="text-base text-slate-700 italic leading-relaxed pl-4 border-l-3 border-[#006B4F]">
                  “My mission has always been to provide compassionate and professional veterinary care that pets truly deserve. At Vet for Pet Clinic, we treat every pet like family and are committed to keeping them healthy, happy, and thriving by your side.”
                </blockquote>

                <div className="pt-2 flex items-center justify-between">
                  <span className="font-script text-3xl text-[#006B4F] font-bold">
                    Dr. Ahmad Raza
                  </span>
                  <span className="text-sm font-script text-slate-600 font-semibold">
                    “Healthy Pets, Happier Tomorrows” ♡
                  </span>
                </div>
              </div>

            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 8. CLINIC & FACILITIES GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-emerald-950 font-heading tracking-tight">
                Our Clinic & Facilities
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                A clean, modern, and pet-friendly environment designed for stress-free animal care.
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('gallery')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#006B4F] hover:underline cursor-pointer"
            >
              <ImageIcon className="w-4 h-4" />
              <span>View Full Photo Gallery ➔</span>
            </button>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {facilities.map((f, i) => (
            <RevealOnScroll key={i} direction="up" delay={i * 0.08} duration={0.4}>
              <div className="group relative rounded-2xl overflow-hidden aspect-4/3 border border-emerald-900/10 shadow-xs">
                <img
                  src={f.img}
                  alt={f.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent flex items-end p-3.5">
                  <span className="text-white text-xs sm:text-sm font-bold">{f.name}</span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 9. APPOINTMENT CTA */}
      <AppointmentCtaBanner 
        onBookClick={openAppointmentModal}
        title="Book an Appointment Today"
        subtitle="Your pet’s health is our priority. Let's keep them happy, vibrant, and healthy."
      />
    </div>
  );
};
