import React from 'react';

interface PawDecorProps {
  className?: string;
  size?: number;
  opacity?: number;
  rotate?: number;
  color?: string;
}

export const PawDecor: React.FC<PawDecorProps> = ({
  className = '',
  size = 28,
  opacity = 0.15,
  rotate = 0,
  color = '#0E8F63'
}) => {
  return (
    <div 
      className={`pointer-events-none select-none inline-block ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        opacity: opacity
      }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 10.5C9.8 10.5 8 12.3 8 15C8 17.5 10 20 12 20C14 20 16 17.5 16 15C16 12.3 14.2 10.5 12 10.5Z" />
        <ellipse cx="8.5" cy="7.5" rx="1.8" ry="2.4" />
        <ellipse cx="15.5" cy="7.5" rx="1.8" ry="2.4" />
        <ellipse cx="5.2" cy="11.5" rx="1.6" ry="2.2" />
        <ellipse cx="18.8" cy="11.5" rx="1.6" ry="2.2" />
      </svg>
    </div>
  );
};
