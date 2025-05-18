'use client';

import React, { useEffect, useState } from 'react';

interface DecorativeElementsProps {
  count?: number;
}

const DecorativeElements: React.FC<DecorativeElementsProps> = ({ count = 4 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render on client side to avoid hydration issues
  if (!mounted) return null;

  return (
    <div className="decorative-elements hidden sm:block">
      {/* Curved lines - only visible on larger screens */}
      <div className="curved-line curved-line-1 hidden md:block"></div>
      <div className="curved-line curved-line-2 hidden md:block"></div>

      {/* Animated dots - reduced for better performance */}
      {Array.from({ length: Math.min(count, 4) }).map((_, index) => (
        <div key={`dot-${index}`} className="dot" style={{
          animationDelay: `${index * 2}s`,
          backgroundColor: index % 3 === 0 ? 'var(--primary)' :
                          index % 3 === 1 ? 'var(--secondary)' :
                          'var(--accent)',
          top: `${20 + (index * 15)}%`,
          left: `${15 + (index * 20)}%`,
          opacity: '0.2',
        }}></div>
      ))}

      {/* Gradient circles - only visible on larger screens */}
      <div className="circle-decoration circle-1 hidden lg:block"></div>
      <div className="circle-decoration circle-2 hidden lg:block"></div>
    </div>
  );
};

export default DecorativeElements;
