import React from 'react';
import { ServiceItem } from '../../types';
import { X, Calendar, Phone, CheckCircle2, ShieldCheck, HeartPulse } from 'lucide-react';
import { CLINIC_INFO } from '../../data/mockData';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">
          {/* Image & Header */}
          <div className="relative h-48 sm:h-56 w-full">
            <img 
              src={service.petImage} 
              alt={service.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-xs transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="px-2.5 py-1 rounded-full bg-[#006B4F] text-xs font-bold text-white uppercase tracking-wider mb-1.5 inline-block">
                {service.badge || "Clinical Service"}
              </span>
              <h3 className="text-2xl font-black">{service.title}</h3>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              {service.fullDetails || service.description}
            </p>

            <div className="bg-[#F0FAF5] p-4 rounded-2xl border border-[#D1F2E2] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#006B4F]">
                <HeartPulse className="w-4 h-4 text-[#0E8F63]" />
                <span>What to Expect at Vet for Pet Clinic:</span>
              </div>
              <ul className="text-xs text-gray-600 space-y-1.5 pl-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#006B4F] shrink-0" />
                  Gentle, stress-free animal handling techniques
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#006B4F] shrink-0" />
                  Sterilized and modern diagnostic equipment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#006B4F] shrink-0" />
                  Detailed post-examination care advice & follow-up
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onBookService(service.title);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#006B4F] hover:bg-[#00543E] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Service</span>
              </button>
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="py-3 px-4 rounded-xl border border-gray-200 hover:border-[#006B4F] text-gray-700 hover:text-[#006B4F] font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Inquire: 0329-0220220</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
