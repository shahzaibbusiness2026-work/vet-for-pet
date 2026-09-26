import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  subtext?: string;
  title?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'dark',
  title = "Vet for Pet Clinic",
  subtext = "Healthy Pets • Happier Lives"
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none min-w-0 ${className}`}>
      {/* Friendly Pet Clinic Icon */}
      <div className={`relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl sm:rounded-2xl shrink-0 shadow-sm transition-transform hover:scale-105 ${
        isDark ? 'bg-gradient-to-br from-[#006B4F] to-[#004D38] text-white shadow-[#006B4F]/20' : 'bg-white text-[#006B4F] shadow-md'
      }`}>
        <svg viewBox="0 0 40 40" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" xmlns="http://www.w3.org/2000/svg">
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

      <div className="flex flex-col text-left min-w-0 justify-center">
        <span className={`text-sm sm:text-base lg:text-[1.12rem] font-black tracking-tight leading-tight truncate max-w-[170px] xs:max-w-[210px] sm:max-w-xs md:max-w-none font-heading ${
          isDark ? 'text-emerald-950' : 'text-white'
        }`}>
          {title}
        </span>
        <span className={`text-[10px] sm:text-[11px] font-semibold tracking-wide leading-tight truncate max-w-[170px] xs:max-w-[210px] sm:max-w-xs md:max-w-none mt-0.5 ${
          isDark ? 'text-[#006B4F]' : 'text-emerald-200'
        }`}>
          {subtext}
        </span>
      </div>
    </div>
  );
};
