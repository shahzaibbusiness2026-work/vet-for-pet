import React from 'react';
import { X, Play, Heart, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../../data/mockData';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div 
        onClick={onClose} 
        className="absolute inset-0" 
      />

      <div className="relative w-full max-w-3xl bg-[#0D1F1A] rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/50 z-10">
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 bg-[#071612] border-b border-emerald-900/30">
          <div className="flex items-center gap-2 text-white">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h3 className="font-bold text-sm">A Day at Vet for Pet Clinic — Sahiwal</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80"
            alt="Clinic preview"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Playing Simulation State */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#006B4F] text-white flex items-center justify-center shadow-lg shadow-[#006B4F]/50 group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 fill-white ml-1" />
            </div>
            <div>
              <p className="text-white text-lg font-bold">Tour Our Modern Clinic in Fareed Town, Sahiwal</p>
              <p className="text-emerald-300 text-xs mt-1">2:18 • HD Quality • Veterinary Care Highlights</p>
            </div>
          </div>

          {/* Simulated Video Bar */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3 text-xs text-white/90">
            <span>01:14</span>
            <div className="flex-1 bg-white/30 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#006B4F] h-full w-[54%]" />
            </div>
            <span>02:18</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#071612] text-xs text-emerald-200/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Featuring Dr. Ahmad Raza & our patient pet care team</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>Call for visits: {CLINIC_INFO.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
