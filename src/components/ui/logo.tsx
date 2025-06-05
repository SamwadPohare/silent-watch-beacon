
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Magic wand handle */}
        <rect
          x="15"
          y="75"
          width="4"
          height="20"
          fill="currentColor"
          transform="rotate(-45 17 85)"
          className="text-amber-600"
        />
        
        {/* Magic wand body */}
        <rect
          x="20"
          y="20"
          width="3"
          height="60"
          fill="currentColor"
          transform="rotate(-45 21.5 50)"
          className="text-amber-800"
        />
        
        {/* Magic wand tip */}
        <circle
          cx="72"
          cy="28"
          r="3"
          fill="currentColor"
          className="text-blue-400"
        />
        
        {/* Sparkles */}
        <circle cx="65" cy="20" r="1.5" fill="currentColor" className="text-blue-300" />
        <circle cx="78" cy="35" r="1" fill="currentColor" className="text-blue-200" />
        <circle cx="70" cy="15" r="1" fill="currentColor" className="text-blue-400" />
        <circle cx="82" cy="25" r="1.5" fill="currentColor" className="text-blue-300" />
        
        {/* Star sparkles */}
        <g className="text-blue-400" fill="currentColor">
          <polygon points="85,15 86,17 88,17 86.5,18.5 87,21 85,19.5 83,21 83.5,18.5 82,17 84,17" />
          <polygon points="60,25 61,27 63,27 61.5,28.5 62,31 60,29.5 58,31 58.5,28.5 57,27 59,27" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
