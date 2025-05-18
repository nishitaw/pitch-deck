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
    <div className="decorative-elements">
      {/* Curved lines */}
      <div className="curved-line curved-line-1"></div>
      <div className="curved-line curved-line-2"></div>
      
      {/* Animated dots */}
      {Array.from({ length: count }).map((_, index) => (
        <div key={`dot-${index}`} className="dot" style={{ 
          animationDelay: `${index * 2}s`,
          backgroundColor: index % 3 === 0 ? 'var(--primary)' : 
                          index % 3 === 1 ? 'var(--secondary)' : 
                          'var(--accent)',
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
        }}></div>
      ))}
      
      {/* Gradient circles */}
      <div className="circle-decoration circle-1"></div>
      <div className="circle-decoration circle-2"></div>
    </div>
  );
};

export default DecorativeElements;
