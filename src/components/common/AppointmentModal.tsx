'use client';

import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Clock, MapPin, Phone } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import confetti from 'canvas-confetti';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedService = ''
}) => {
  const { services, clinicInfo, addAppointment } = useSiteData();

  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    email: '',
    petName: '',
    petType: 'Dog',
    service: preselectedService || (services[0]?.title || 'General Checkups'),
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM – 1:00 PM)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ownerName || !formData.phone || !formData.petName) return;

    // Add to live administrative appointments store
    addAppointment({
      id: `app-${Date.now()}`,
      petName: formData.petName,
      petType: formData.petType,
      petAvatar: formData.petType.toLowerCase().includes('cat') 
        ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=100&q=80'
        : 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=100&q=80',
      owner: formData.ownerName,
      phone: formData.phone,
      service: formData.service,
      vet: 'Dr. Ahmad Raza',
      dateTime: formData.preferredDate ? `${formData.preferredDate} (${formData.preferredTime.split(' ')[0]})` : 'Today 04:00 PM',
      status: 'Confirmed'
    });

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={handleReset} 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">
          
          {/* Header Banner */}
          <div className="bg-[#006B4F] text-white p-6 relative">
            <button
              onClick={handleReset}
              className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Book an Appointment</h3>
                <p className="text-xs text-emerald-100">{clinicInfo.name}, Sahiwal</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#EBF8F3] text-[#006B4F] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Appointment Requested!</h4>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-gray-900">{formData.ownerName}</span>! We have reserved a tentative slot for <span className="font-bold text-emerald-700">{formData.petName}</span> on <span className="font-semibold">{formData.preferredDate || 'your selected date'}</span>.
                </p>
                <div className="bg-[#F0FAF5] p-4 rounded-2xl border border-[#D1F2E2] text-left text-xs space-y-2 text-gray-700 max-w-sm mx-auto">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#006B4F]" />
                    <span>Time: {formData.preferredTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#006B4F]" />
                    <span>{clinicInfo.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#006B4F]" />
                    <span>Clinic Helpline: {clinicInfo.phone}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Our front desk coordinator will confirm shortly via WhatsApp/Call at {formData.phone}.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-3 px-6 py-2.5 bg-[#006B4F] hover:bg-[#00523C] text-white font-bold text-sm rounded-full cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Sarah Khan"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#006B4F] focus:ring-1 focus:ring-[#006B4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0329-0220220"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#006B4F] focus:ring-1 focus:ring-[#006B4F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Pet's Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Milo / Buddy"
                      value={formData.petName}
                      onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#006B4F] focus:ring-1 focus:ring-[#006B4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Pet Type *
                    </label>
                    <select
                      value={formData.petType}
                      onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#006B4F] focus:ring-1 focus:ring-[#006B4F]"
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Rabbit">Rabbit</option>
                      <option value="Bird">Bird</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Service Needed *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#006B4F] focus:ring-1 focus:ring-[#006B4F]"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#006B4F] focus:ring-1 focus:ring-[#006B4F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#006B4F] focus:ring-1 focus:ring-[#006B4F]"
                  >
                    <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM – 5:00 PM)">Afternoon (1:00 PM – 5:00 PM)</option>
                    <option value="Evening (5:00 PM – 9:30 PM)">Evening (5:00 PM – 9:30 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Additional Notes / Symptoms
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us any symptoms, past history, or special concerns..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#006B4F] focus:ring-1 focus:ring-[#006B4F]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#006B4F] hover:bg-[#00523C] text-white font-bold text-sm shadow-md transition-all active:scale-98"
                  >
                    Confirm & Schedule Appointment
                  </button>
                  <p className="text-[11px] text-gray-400 text-center mt-2">
                    🔒 Your information is safe with us. We will only use it for appointment confirmation.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
