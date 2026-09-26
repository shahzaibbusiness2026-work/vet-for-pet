import React, { useState } from 'react';
import { PageType, GalleryItem } from '../types';
import { 
  Play, 
  Heart, 
  Instagram, 
  ArrowRight, 
  Eye, 
  Sparkles,
  Camera
} from 'lucide-react';
import { GALLERY_ITEMS, CLINIC_INFO } from '../data/mockData';
import { PawDecor } from '../components/common/PawDecor';
import { AppointmentCtaBanner } from '../components/common/AppointmentCtaBanner';
import { LightboxModal } from '../components/common/LightboxModal';
import { VideoModal } from '../components/common/VideoModal';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryPageProps {
  setCurrentPage: (page: PageType) => void;
  openAppointmentModal: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  setCurrentPage,
  openAppointmentModal
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const filters = [
    { label: 'All Photos', id: 'all' },
    { label: 'Dogs', id: 'dogs' },
    { label: 'Cats', id: 'cats' },
    { label: 'Grooming', id: 'grooming' },
    { label: 'Clinic & Suites', id: 'clinic' },
    { label: 'Staff in Action', id: 'staff' },
    { label: 'Happy Patients', id: 'patients' },
  ];

  const filteredItems = activeFilter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const handleToggleLike = (id: string) => {
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter(i => i !== id));
    } else {
      setLikedIds([...likedIds, id]);
    }
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]);
  };

  const instagramPhotos = [
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=350&q=80",
    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=350&q=80",
    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=350&q=80",
    "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=350&q=80",
    "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=350&q=80",
    "https://images.unsplash.com/photo-1594824813633-91c2f9e42104?auto=format&fit=crop&w=350&q=80",
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=350&q=80"
  ];

  return (
    <div className="space-y-16 lg:space-y-24 overflow-hidden">
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
                  Our Gallery <br />
                  <span className="text-[#006B4F] text-2xl sm:text-3xl lg:text-4xl block mt-2 font-bold font-heading">
                    Moments of Care, Happiness & Healthy Pets
                  </span>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll direction="up" duration={0.5} delay={0.1}>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed font-normal">
                  Take a peek into everyday joyful moments at Vet for Pet Clinic in Sahiwal. From recovering patients to clinical surgery suites — our gallery portrays the compassion we share with pets and their families.
                </p>
              </RevealOnScroll>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative">
              <RevealOnScroll direction="left" duration={0.5}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-5/4 group">
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=850&q=80"
                    alt="Gallery hero"
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

      {/* 2. FILTER TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-2 no-scrollbar p-1.5 bg-white/80 backdrop-blur-md rounded-full max-w-fit mx-auto border border-emerald-900/10 shadow-sm">
            {filters.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#006B4F] text-white shadow-md shadow-[#006B4F]/25 scale-105'
                      : 'text-slate-600 hover:text-[#006B4F] hover:bg-emerald-50/60'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </RevealOnScroll>
      </section>

      {/* 3. GALLERY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredItems.map((item) => {
              const isLiked = likedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="group relative rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 bg-white border border-emerald-900/10 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => setSelectedImage(item)}
                >
                  {/* Image */}
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                    {/* Top category badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#006B4F] shadow-xs">
                      {item.category}
                    </span>

                    {/* Like Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleLike(item.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors cursor-pointer"
                      aria-label="Like photo"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-white'}`} />
                    </button>

                    {/* Title overlay */}
                    <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                      <p className="text-sm font-bold truncate font-heading">{item.title}</p>
                      <span className="text-xs opacity-90 font-medium">{item.likes + (isLiked ? 1 : 0)} ❤️</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 4. FEATURED VIDEO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.5}>
          <div className="bg-gradient-to-r from-[#EAF6F0] via-white to-[#F0FAF5] rounded-3xl p-7 sm:p-12 border border-emerald-200 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Video Preview Card */}
              <div className="lg:col-span-6 relative">
                <div 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="group relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-video cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=850&q=80"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors flex items-center justify-center">
                    <div className="w-18 h-18 rounded-full bg-white/95 text-[#006B4F] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 fill-[#006B4F] ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-white text-xs font-bold">
                    2:18
                  </span>
                </div>
              </div>

              {/* Video Text */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="flex items-center gap-2 text-[#006B4F]">
                  <PawDecor size={20} opacity={1} color="#006B4F" />
                  <span className="text-xs font-extrabold uppercase tracking-widest">Featured Video</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-heading">
                  A Day at Vet for Pet Clinic
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Watch behind-the-scenes moments of animal surgery, routine puppy health checks, gentle grooming sessions, and happy pet reunions at our Sahiwal clinic.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#006B4F] hover:bg-[#00543E] text-white font-bold text-sm shadow-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch Our Video ➔</span>
                  </button>

                  <span className="font-script text-slate-500 text-xl font-bold">
                    Real Pets • Real Care • Real Love ♡
                  </span>
                </div>
              </div>

            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 5. INSTAGRAM-STYLE HORIZONTAL GALLERY STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.4}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center shadow-sm">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">Follow Our Daily Pet Stories</h3>
                <p className="text-xs sm:text-sm text-slate-500">Real patients, recovery milestones, and cute pet moments on Instagram.</p>
              </div>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#006B4F] hover:underline"
            >
              <span>Follow @VetForPetSahiwal ➔</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {instagramPhotos.map((photo, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-square border border-emerald-900/10 shadow-xs">
                <img
                  src={photo}
                  alt="Instagram feed"
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* 6. APPOINTMENT CTA BANNER */}
      <AppointmentCtaBanner 
        onBookClick={openAppointmentModal}
        title="Book an Appointment Today"
        subtitle="Your pet’s health is just a call away. Caring veterinary medicine in Sahiwal."
      />

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedImage}
        items={filteredItems}
        onClose={() => setSelectedImage(null)}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
        isLiked={selectedImage ? likedIds.includes(selectedImage.id) : false}
        onToggleLike={handleToggleLike}
      />

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
};
