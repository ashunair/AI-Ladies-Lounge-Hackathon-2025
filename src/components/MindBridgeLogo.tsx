import React from 'react';

const MindBridgeLogo = ({ className = "", size = "default" }: { className?: string; size?: "sm" | "default" | "lg" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    default: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="mindbridge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--wellness))" />
          </linearGradient>
        </defs>
        {/* Bridge symbol representing connection */}
        <path
          d="M8 28 C8 20, 16 16, 20 16 C24 16, 32 20, 32 28"
          stroke="url(#mindbridge-gradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* Mind/brain symbol */}
        <circle
          cx="20"
          cy="14"
          r="6"
          fill="url(#mindbridge-gradient)"
          opacity="0.8"
        />
        {/* Connection points */}
        <circle cx="8" cy="28" r="2" fill="hsl(var(--wellness))" />
        <circle cx="32" cy="28" r="2" fill="hsl(var(--primary))" />
        {/* Inner detail for brain */}
        <path
          d="M16 12 Q20 10, 24 12 Q22 14, 20 14 Q18 14, 16 12"
          fill="white"
          opacity="0.3"
        />
      </svg>
    </div>
  );
};

export default MindBridgeLogo;