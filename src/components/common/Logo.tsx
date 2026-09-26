import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  subtext?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'dark',
  subtext = "Healthy Pets • Happier Lives"
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Friendly Pet Clinic Icon */}
      <div className={`relative flex items-center justify-center w-11 h-11 rounded-2xl ${
        isDark ? 'bg-[#006B4F] text-white shadow-sm shadow-[#006B4F]/20' : 'bg-white text-[#006B4F] shadow'
      } transition-transform hover:scale-105`}>
        <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
          {/* Main paw pad */}
          <path 
            d="M20 17C16.5 17 14 19.5 14 23.5C14 27.5 17 31 20 31C23 31 26 27.5 26 23.5C26 19.5 23.5 17 20 17Z" 
            fill="currentColor" 
          />
          {/* Paw toes */}
          <ellipse cx="14" cy="13.5" rx="3.2" ry="4.2" fill="currentColor" />
          <ellipse cx="26" cy="13.5" rx="3.2" ry="4.2" fill="currentColor" />
          <ellipse cx="9" cy="19" rx="2.8" ry="3.8" fill="currentColor" />
          <ellipse cx="31" cy="19" rx="2.8" ry="3.8" fill="currentColor" />
          {/* Cute inner heart in paw pad */}
          <path 
            d="M20 22.8C20 22.8 17.5 21 17.5 23C17.5 24.3 20 26 20 26C20 26 22.5 24.3 22.5 23C22.5 21 20 22.8 20 22.8Z" 
            fill={isDark ? '#5EEAD4' : '#0E8F63'} 
          />
        </svg>
      </div>

      <div className="flex flex-col text-left">
        <span className={`text-[1.18rem] font-extrabold tracking-tight leading-tight ${
          isDark ? 'text-[#006B4F]' : 'text-white'
        }`}>
          Vet for Pet Clinic
        </span>
        <span className={`text-[0.7rem] font-semibold tracking-wide ${
          isDark ? 'text-[#0E8F63]' : 'text-[#A7F3D0]'
        }`}>
          {subtext}
        </span>
      </div>
    </div>
  );
};
