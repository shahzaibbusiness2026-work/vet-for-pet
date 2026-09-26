import React, { useState } from 'react';
import { PageType } from '../types';
import { 
  Calendar, 
  Phone, 
  ArrowRight, 
  Clock, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Heart, 
  ChevronDown, 
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { CLINIC_INFO, SERVICES, FAQS } from '../data/mockData';
import { PawDecor } from '../components/common/PawDecor';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

interface AppointmentPageProps {
  setCurrentPage: (page: PageType) => void;
}

export const AppointmentPage: React.FC<AppointmentPageProps> = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    email: '',
    petName: '',
    petType: 'Dog',
    service: 'General Checkups',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM – 1:00 PM)',
    notes: ''
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ownerName || !formData.phone || !formData.petName) return;

    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback
    }

    setBookingSuccess(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIdx(openFaqIdx === index ? null : index);
  };

  const processSteps = [
    {
      num: "01",
      title: "Fill the Form",
      desc: "Provide owner details, pet species, and select your preferred date & time."
    },
    {
      num: "02",
      title: "Fast Confirmation",
      desc: "Our desk confirms your appointment slot via quick WhatsApp message or call."
    },
    {
      num: "03",
      title: "Visit Our Clinic",
      desc: "Arrive at Fareed Town, Sahiwal with parking right by our entrance."
    },
    {
      num: "04",
      title: "Compassionate Care",
      desc: "Our veterinary doctors deliver gentle checkups, diagnostics & treatments."
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E7F6EF] via-subtle-cream-warm to-subtle-cream pt-10 pb-16 lg:pt-14 lg:pb-24">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
        <PawDecor className="absolute top-10 left-8 hidden md:block" size={44} opacity={0.15} rotate={-10} color="#006B4F" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
            <button onClick={() => setCurrentPage('home')} className="hover:text-[#006B4F] cursor-pointer">Home</button>
            <span>&gt;</span>
            <span className="text-[#006B4F]">Book an Appointment</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <RevealOnScroll direction="down" duration={0.4}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-emerald-200 shadow-xs">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#006B4F]">
                    ONLINE BOOKING SYSTEM
                  </span>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.05}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-emerald-950 font-heading tracking-tight leading-[1.1]">
                  Book an <br />
                  <span className="text-[#006B4F]">Appointment</span>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.1}>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed">
                  Quality veterinary care starts with a simple step. Book an appointment and give your pet the healthy, happy life they deserve.
                </p>
              </RevealOnScroll>

              {/* Trust highlights */}
              <RevealOnScroll direction="up" duration={0.5} delay={0.15}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                  <div className="bg-white/90 p-4 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
                    <Calendar className="w-5 h-5 text-[#006B4F] mb-1.5" />
                    <p className="font-bold text-emerald-950 font-heading">Easy Booking</p>
                    <p className="text-slate-500 text-[11px]">Schedule in 2 mins</p>
                  </div>
                  <div className="bg-white/90 p-4 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
                    <ShieldCheck className="w-5 h-5 text-[#006B4F] mb-1.5" />
                    <p className="font-bold text-emerald-950 font-heading">Qualified Vets</p>
                    <p className="text-slate-500 text-[11px]">Surgery & medicine</p>
                  </div>
                  <div className="bg-white/90 p-4 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
                    <PawDecor size={20} opacity={1} color="#006B4F" className="mb-1.5" />
                    <p className="font-bold text-emerald-950 font-heading">268+ Patients</p>
                    <p className="text-slate-500 text-[11px]">Loved in Sahiwal</p>
                  </div>
                  <div className="bg-white/90 p-4 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500 mb-1.5" />
                    <p className="font-bold text-emerald-950 font-heading">Compassionate</p>
                    <p className="text-slate-500 text-[11px]">Gentle handling</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-5 relative">
              <RevealOnScroll direction="left" duration={0.5}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-5/4 group">
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=850&q=80"
                    alt="Book appointment"
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

      {/* 2. FORM & INFO TWO-COLUMN MAIN AREA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border border-emerald-900/10 shadow-sm text-left">
            <div className="flex items-center gap-3.5 pb-5 border-b border-slate-100 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF7F1] text-[#006B4F] flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">Appointment Details</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Complete the quick form below. Our Sahiwal team will confirm your consultation time via WhatsApp or call.
                </p>
              </div>
            </div>

            {bookingSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-4 text-center space-y-4"
              >
                <div className="w-18 h-18 bg-[#EAF7F1] text-[#006B4F] rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-11 h-11" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">Appointment Confirmed!</h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-slate-900">{formData.ownerName}</span>! We look forward to welcoming <span className="font-bold text-[#006B4F]">{formData.petName}</span> on <span className="font-semibold">{formData.preferredDate || 'your chosen date'}</span> ({formData.preferredTime}).
                </p>
                <div className="p-5 bg-[#EAF7F1] rounded-2xl border border-emerald-200 text-xs sm:text-sm text-slate-700 max-w-sm mx-auto space-y-1.5 text-left">
                  <p><strong>Clinic:</strong> Vet for Pet Clinic, Fareed Town, Sahiwal</p>
                  <p><strong>Helpline:</strong> 0329-0220220</p>
                  <p><strong>Assigned Service:</strong> {formData.service}</p>
                </div>
                <button
                  onClick={() => {
                    setBookingSuccess(false);
                    setFormData({
                      ownerName: '',
                      phone: '',
                      email: '',
                      petName: '',
                      petType: 'Dog',
                      service: 'General Checkups',
                      preferredDate: '',
                      preferredTime: 'Morning (10:00 AM – 1:00 PM)',
                      notes: ''
                    });
                  }}
                  className="px-8 py-3.5 bg-[#006B4F] text-white text-sm font-bold rounded-full hover:bg-[#00543E] transition-all shadow-md cursor-pointer"
                >
                  Book Another Appointment
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Pet Owner Information */}
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#006B4F] mb-3 flex items-center gap-1.5">
                    <span>1. Pet Owner Information</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Imran Khan"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        className="w-full px-3.5 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0329-0220220"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        placeholder="yourname@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Pet Information */}
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#006B4F] mb-3 flex items-center gap-1.5">
                    <span>2. Pet Information</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Pet Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Leo / Bella"
                        value={formData.petName}
                        onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                        className="w-full px-3.5 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Pet Type *</label>
                      <select
                        value={formData.petType}
                        onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                        className="w-full px-3.5 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15"
                      >
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Bird">Bird</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Appointment Details */}
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#006B4F] mb-3 flex items-center gap-1.5">
                    <span>3. Appointment Details</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Service Needed *</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Preferred Time *</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3.5 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15"
                      >
                        <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                        <option value="Afternoon (1:00 PM – 5:00 PM)">Afternoon (1:00 PM – 5:00 PM)</option>
                        <option value="Evening (5:00 PM – 9:30 PM)">Evening (5:00 PM – 9:30 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">Additional Notes (Optional)</label>
                    <span className="text-[11px] text-slate-400 font-medium">{formData.notes.length}/500</span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={500}
                    placeholder="Tell us about your pet's current symptoms, medical history, or special considerations..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#006B4F] focus:ring-2 focus:ring-[#006B4F]/15"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#006B4F] hover:bg-[#00543E] text-white font-extrabold text-base shadow-xl shadow-[#006B4F]/25 hover:shadow-2xl hover:scale-101 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-5 h-5 text-emerald-200" />
                    <span>Confirm Appointment Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-slate-400 text-center mt-3 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#006B4F]" />
                    <span>Your contact details remain confidential. Used solely for clinical appointment confirmation.</span>
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <RevealOnScroll direction="left" duration={0.4}>
              {/* Clinic Hours Card */}
              <div className="bg-white p-6 rounded-3xl border border-emerald-900/10 shadow-sm space-y-3.5">
                <div className="flex items-center gap-2.5 text-[#006B4F]">
                  <Clock className="w-5 h-5" />
                  <h3 className="font-bold text-base text-slate-900 font-heading">Clinic Working Hours</h3>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="font-medium text-slate-600">Mon – Thu & Sat – Sun:</span>
                    <span className="font-bold text-slate-900 font-heading">10:00 AM – 10:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="font-medium text-slate-600">Friday Hours:</span>
                    <span className="font-bold text-slate-900 font-heading">3:00 PM – 10:00 PM</span>
                  </div>
                </div>
                <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">EMERGENCY</span>
                  <span className="font-medium">Priority triage for acute trauma & breathing distress.</span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-[#00543E] to-[#006B4F] text-white p-6 rounded-3xl shadow-md space-y-3.5 border border-emerald-500/20">
              <div>
                <h4 className="font-bold text-base font-heading">Emergency Hotline</h4>
                <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                  For immediate assistance during clinical hours, contact our doctors directly.
                </p>
              </div>
              <div className="space-y-2.5">
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="w-full py-3 rounded-xl bg-white text-[#006B4F] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4 fill-[#006B4F]" />
                  <span>{CLINIC_INFO.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Vet%20for%20Pet%20Clinic`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#20BE5B] transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-900/10 shadow-sm space-y-3">
              <h4 className="font-bold text-base text-slate-900 font-heading">Why Choose Vet for Pet Clinic?</h4>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006B4F] shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 font-heading">Experienced Doctors</strong> – 8+ years veterinary surgery & medicine.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006B4F] shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 font-heading">Modern Diagnostic Tools</strong> – In-house biochemical lab & imaging.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006B4F] shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 font-heading">Transparent Pricing</strong> – Fair costs with zero surprise fees.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006B4F] shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 font-heading">Fear-Free Handling</strong> – Stress-minimized pet care approach.</span>
                </li>
              </ul>
            </div>

            {/* What to Bring to Your Visit */}
            <div className="bg-[#EAF7F1] p-6 rounded-3xl border border-emerald-200/80 space-y-3">
              <h4 className="font-bold text-base text-emerald-950 font-heading">What to Bring to Your Visit</h4>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#006B4F] shrink-0" />
                  Vaccination booklet or prior medical records
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#006B4F] shrink-0" />
                  Current medications or supplements
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#006B4F] shrink-0" />
                  Short note on symptom onset or dietary changes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#006B4F] shrink-0" />
                  Dogs on leash; cats and rabbits in secure carriers
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 3. APPOINTMENT PROCESS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-heading">
              Our Appointment Process
            </h2>
            <p className="text-sm text-slate-600">
              Booking your pet's appointment is smooth and seamless. Here is how we welcome you:
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processSteps.map((step, idx) => (
            <RevealOnScroll key={step.num} direction="up" delay={idx * 0.08} duration={0.4}>
              <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm space-y-3 text-left hover:border-emerald-300 hover:shadow-md transition-all h-full">
                <span className="w-9 h-9 rounded-xl bg-[#006B4F] text-white font-extrabold text-sm flex items-center justify-center font-heading shadow-xs">
                  {step.num}
                </span>
                <h4 className="text-base font-bold text-emerald-950 font-heading">{step.title}</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="text-center mb-8 space-y-2">
            <h2 className="text-3xl font-extrabold text-emerald-950 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600">
              Quick answers to common questions about booking your appointment.
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-3.5">
          {FAQS.slice(0, 4).map((faq, index) => {
            const isOpen = openFaqIdx === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-emerald-900/10 overflow-hidden shadow-xs hover:border-emerald-200 transition-all text-left"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-3 font-bold text-slate-900 text-sm sm:text-base font-heading hover:text-[#006B4F] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-[#EAF7F1] text-[#006B4F]' : 'bg-slate-50 text-slate-400'}`}>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. "YOUR PET'S HEALTH CAN'T WAIT" BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.45}>
          <div className="bg-[#004230] text-white rounded-3xl p-7 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-500/20">
            <div className="flex items-center gap-5 text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                <Calendar className="w-7 h-7 text-emerald-200" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">Your Pet’s Health Can’t Wait</h3>
                <p className="text-sm text-emerald-100/90 mt-1 leading-relaxed max-w-xl">
                  Book an appointment today and let our experienced veterinary team care for your companion with devotion.
                </p>
              </div>
            </div>

            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="px-8 py-4 rounded-full bg-white text-[#006B4F] font-bold text-base shadow-xl hover:bg-emerald-50 hover:scale-105 transition-all shrink-0"
            >
              Call {CLINIC_INFO.phone}
            </a>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
};
