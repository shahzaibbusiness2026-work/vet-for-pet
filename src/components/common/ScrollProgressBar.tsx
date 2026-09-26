'use client';

import React, { useEffect, useRef } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only register JS listener if native CSS animation-timeline is not supported
    if (typeof window !== 'undefined' && !window.CSS?.supports?.('animation-timeline', 'scroll()')) {
      let ticking = false;

      const updateProgress = () => {
        if (!barRef.current) return;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(updateProgress);
          ticking = true;
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, []);

  return (
    <div
      ref={barRef}
      id="scroll-progress"
      aria-hidden="true"
      className="scroll-progress-bar"
    />
  );
};

