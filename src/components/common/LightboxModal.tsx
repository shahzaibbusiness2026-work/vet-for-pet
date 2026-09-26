import React from 'react';
import { GalleryItem } from '../../types';
import { X, ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isLiked?: boolean;
  onToggleLike?: (id: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onNext,
  onPrev,
  isLiked = false,
  onToggleLike
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      {/* Top Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all z-20"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next Controls */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-20"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-20"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content Container */}
      <div className="relative max-w-4xl max-h-[85vh] flex flex-col items-center">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
        />

        <div className="w-full flex items-center justify-between text-white mt-4 px-2">
          <div>
            <h3 className="text-lg font-bold">{item.title}</h3>
            <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
              Category: {item.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleLike && onToggleLike(item.id)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              <span className="text-xs font-semibold">{item.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: item.title, url: window.location.href });
                }
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Share photo"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
