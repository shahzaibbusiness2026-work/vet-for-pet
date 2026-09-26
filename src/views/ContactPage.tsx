'use client';

import React, { useState } from 'react';
import { PageType } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Calendar, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Heart,
  Users
} from 'lucide-react';
import { PawDecor } from '../components/common/PawDecor';
import { AppointmentCtaBanner } from '../components/common/AppointmentCtaBanner';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../context/SiteDataContext';

interface ContactPageProps {
  setCurrentPage: (page: PageType) => void;
  openAppointmentModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  setCurrentPage,
  openAppointmentModal
}) => {
  const { clinicInfo, faqs, addMessage } = useSiteData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    petType: 'Dog',
    message: ''
  });
  const [formSent, setFormSent] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    addMessage({
      sender: `${formData.name} (${formData.petType})`,
      phone: formData.phone,
      email: formData.email,
      message: formData.message
    });

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback
    }

    setFormSent(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIdx(openFaqIdx === index ? null : index);
  };

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
                  Get in Touch <br />
                  <span className="text-[#006B4F]">We’re here for you and your pets!</span>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.1}>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed">
                  Have a question, want to book a veterinary visit, or need advice on pet nutrition or post-op healing? Our friendly clinic team is eager to assist you.
                </p>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.15}>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 text-xs sm:text-sm font-bold text-slate-700">
                  <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-xl border border-emerald-100 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-[#006B4F]" />
                    <span className="text-emerald-950">Expert Guidance</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-xl border border-emerald-100 shadow-xs">
                    <Users className="w-4 h-4 text-[#006B4F]" />
                    <span className="text-emerald-950">Friendly Support</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-xl border border-emerald-100 shadow-xs">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <span className="text-emerald-950">Always Here for Pets</span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative">
              <RevealOnScroll direction="left" duration={0.5}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-5/4 group">
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=850&q=80"
                    alt="Contact Vet for Pet Clinic"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 right-4 bg-white/95 px-4 py-2 rounded-xl shadow-md rotate-3 text-right">
                    <span className="text-[#006B4F] font-script text-lg font-bold leading-tight block">
                      Because they’re family ♡
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TWO-COLUMN MAIN AREA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border border-emerald-900/10 shadow-sm space-y-6 text-left">
            <RevealOnScroll direction="up" duration={0.4}>
              <div className="flex items-center gap-2.5 text-[#006B4F]">
                <MessageCircle className="w-6 h-6 text-[#006B4F]" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-heading">
                  Send Us a Message
                </h2>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Fill out the form below and we’ll get back to you promptly. We love connecting with pet parents!
              </p>
            </RevealOnScroll>

            {formSent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center space-y-3 bg-[#EAF7F1] rounded-2xl border border-emerald-200"
              >
                <div className="w-14 h-14 rounded-full bg-[#006B4F] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Message Sent Successfully!</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-slate-800">{formData.name}</span>. Our Sahiwal team will respond via WhatsApp or call at <span className="font-bold text-[#006B4F]">{formData.phone}</span> shortly.
                </p>
                <button
                  onClick={() => {
                    setFormSent(false);
                    setFormData({ name: '', phone: '', email: '', petType: 'Dog', message: '' });
                  }}
                  className="mt-3 px-6 py-2.5 rounded-full bg-[#006B4F] text-white text-xs font-bold hover:bg-[#00543E] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Ali"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="03XX-XXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Select Pet Type
                    </label>
                    <select
                      value={formData.petType}
                      onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15 transition-all"
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Rabbit">Rabbit</option>
                      <option value="Bird">Bird</option>
                      <option value="Other">Other Pet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how we can help you and your pet..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#006B4F] hover:bg-[#00543E] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Information & Direct Action Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <RevealOnScroll direction="left" duration={0.4}>
              {/* Call Us Now Card */}
              <div className="bg-gradient-to-r from-[#00523C] to-[#006B4F] text-white p-7 rounded-3xl shadow-xl relative overflow-hidden border border-emerald-500/20">
                <PawDecor className="absolute bottom-2 right-2" size={80} opacity={0.08} color="#FFFFFF" rotate={-20} />
                
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner">
                    <Phone className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold">Call Us Directly</span>
                    <p className="text-2xl sm:text-3xl font-black font-heading tracking-tight">{clinicInfo.phone}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100/90 mt-2">
                  For appointments, general inquiries or immediate emergency triage in Sahiwal.
                </p>
              </div>
            </RevealOnScroll>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20${encodeURIComponent(clinicInfo.name)}`}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-[#EAF7F1] hover:bg-[#D5EFE3] border border-emerald-200/80 rounded-2xl flex items-center gap-3 text-xs font-bold text-[#006B4F] transition-all shadow-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-xs">
                  <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                </div>
                <div>
                  <p className="text-sm font-heading font-bold text-slate-900 leading-tight">WhatsApp</p>
                  <span className="text-[11px] text-slate-500 font-normal">Immediate reply</span>
                </div>
              </a>

              <button
                onClick={openAppointmentModal}
                className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3 text-xs font-bold text-slate-800 transition-all shadow-xs cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shadow-xs">
                  <Calendar className="w-5 h-5 text-[#006B4F]" />
                </div>
                <div>
                  <p className="text-sm font-heading font-bold text-slate-900 leading-tight">Book Visit</p>
                  <span className="text-[11px] text-slate-500 font-normal">Online booking</span>
                </div>
              </button>
            </div>

            {/* Address Details */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#EAF7F1] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#006B4F]" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 font-heading text-sm">Clinic Location</p>
                  <p className="mt-0.5 text-xs text-slate-500">{clinicInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#EAF7F1] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#006B4F]" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 font-heading text-sm">Consultation Hours</p>
                  <p className="mt-0.5 text-xs text-slate-500">{clinicInfo.hoursWeekday}</p>
                  <p className="text-xs text-slate-500">{clinicInfo.hoursFriday}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#EAF7F1] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-[#006B4F]" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 font-heading text-sm">Email Address</p>
                  <a href={`mailto:${clinicInfo.email}`} className="mt-0.5 text-xs text-[#006B4F] font-semibold hover:underline block">
                    {clinicInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Emergency Care Card */}
            <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-rose-950 font-heading text-sm">Critical Emergency Care</h4>
                <p className="text-rose-700 mt-1 leading-relaxed">
                  For trauma, breathing difficulty, or toxicity, call our hotline directly at <span className="font-bold text-rose-950">{clinicInfo.phone}</span>.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FIND US ON MAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="text-left">
              <div className="flex items-center gap-2 text-[#006B4F]">
                <MapPin className="w-5 h-5 text-[#006B4F]" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-heading">Find Us on Map</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Conveniently located on KIPS Road, Stop #05, Fareed Town, Sahiwal.
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=Fareed+Town+Sahiwal"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:text-[#006B4F] hover:border-[#006B4F] transition-all shadow-xs"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </RevealOnScroll>

        {/* Stylized Sahiwal Map Mockup */}
        <RevealOnScroll direction="up" duration={0.5}>
          <div className="relative rounded-3xl overflow-hidden border border-emerald-900/10 shadow-lg bg-[#E8EFEA] h-80 sm:h-96">
            {/* Map Vector Grid */}
            <div className="absolute inset-0 opacity-60">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#E5EFE9" />
                <circle cx="85%" cy="30%" r="70" fill="#CDECDA" />
                <circle cx="15%" cy="80%" r="90" fill="#CDECDA" />
                <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#FFFFFF" strokeWidth="18" />
                <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#FBBF24" strokeWidth="4" strokeDasharray="14,14" />
                <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#FFFFFF" strokeWidth="14" />
                <line x1="65%" y1="0" x2="65%" y2="100%" stroke="#FFFFFF" strokeWidth="16" />
                <line x1="10%" y1="20%" x2="90%" y2="70%" stroke="#FFFFFF" strokeWidth="10" />
                <text x="32%" y="35%" fill="#475569" fontSize="12" fontWeight="bold">KIPS College Sahiwal</text>
                <text x="67%" y="28%" fill="#047857" fontSize="12" fontWeight="bold">Fareed Town Park</text>
                <text x="70%" y="62%" fill="#DC2626" fontSize="12" fontWeight="bold">Bismillah Hospital</text>
                <text x="40%" y="53%" fill="#334155" fontSize="12" fontWeight="bold">KIPS Road (Stop #05)</text>
              </svg>
            </div>

            {/* Central Clinic Pin */}
            <div className="absolute top-[42%] left-[58%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer">
              <div className="animate-bounce">
                <div className="w-12 h-12 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-2xl border-3 border-white">
                  <PawDecor size={24} opacity={1} color="#FFFFFF" />
                </div>
              </div>
              <div className="bg-[#006B4F] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-lg mt-1 border border-white/40">
                Vet for Pet Clinic
              </div>
            </div>

            {/* Map Overlay Card */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white text-left">
              <div className="flex items-center gap-2 text-[#006B4F] font-bold text-xs mb-1.5">
                <PawDecor size={18} opacity={1} color="#006B4F" />
                <span className="font-heading font-extrabold text-sm text-slate-900">Vet for Pet Clinic</span>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                House #220, KIPS Road, Stop #05, Fareed Town, Sahiwal, 57000
              </p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href="https://maps.google.com/?q=Fareed+Town+Sahiwal"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#006B4F] text-white text-xs font-bold hover:bg-[#00523C] shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="text-center mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Quick answers to common questions about clinic timings, location, and bookings.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {faqs.slice(0, 4).map((faq, index) => {
            const isOpen = openFaqIdx === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-emerald-900/10 overflow-hidden shadow-xs hover:border-emerald-200 transition-all text-left"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4.5 text-left flex items-center justify-between gap-3 font-bold text-slate-900 text-xs sm:text-sm font-heading hover:text-[#006B4F] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#006B4F] shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-4.5 pb-4.5 text-xs text-slate-600 leading-relaxed border-t border-slate-50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. APPOINTMENT CTA BANNER */}
      <AppointmentCtaBanner 
        onBookClick={openAppointmentModal}
        title="Book an Appointment Today"
        subtitle="Your pet’s health is in safe hands at Vet for Pet Clinic."
      />
    </div>
  );
};
