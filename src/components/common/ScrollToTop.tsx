'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldBeVisible = scrollTop > 280;

      if (shouldBeVisible !== isVisibleRef.current) {
        isVisibleRef.current = shouldBeVisible;
        setIsVisible(shouldBeVisible);
      }

      if (circleRef.current) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        circleRef.current.style.strokeDashoffset = `${Math.max(0, 100 - progress)}`;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 p-2.5 sm:p-3 rounded-full bg-[#006B4F] text-white shadow-xl shadow-[#006B4F]/30 hover:bg-[#00543E] hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center border-2 border-white/20 transform-gpu cursor-pointer ${
        isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      {/* Subtle circular SVG track */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5">
        <circle
          cx="50%"
          cy="50%"
          r="44%"
          className="stroke-white/20 fill-none"
          strokeWidth="2.5"
        />
        <circle
          ref={circleRef}
          cx="50%"
          cy="50%"
          r="44%"
          className="stroke-[#34D399] fill-none"
          strokeWidth="2.5"
          strokeDasharray="100"
          strokeDashoffset="100"
          strokeLinecap="round"
        />
      </svg>
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};

