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
      <div className="curved-line curved-line-1" style={{
        top: '20%',
        right: '0',
        width: '150px',
        height: '300px',
        borderTopLeftRadius: '150px',
        borderBottomLeftRadius: '150px',
        borderLeft: '2px solid rgba(255, 165, 0, 0.2)'
      }}></div>

      <div className="curved-line curved-line-2" style={{
        bottom: '10%',
        left: '5%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        border: '2px solid rgba(0, 0, 255, 0.1)',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        transform: 'rotate(45deg)'
      }}></div>

      {/* Animated dots */}
      {Array.from({ length: Math.min(count, 6) }).map((_, index) => (
        <div key={`dot-${index}`} className="dot" style={{
          animation: 'float 10s infinite ease-in-out',
          animationDelay: `${index * 2}s`,
          backgroundColor: index % 3 === 0 ? 'var(--primary)' :
                          index % 3 === 1 ? 'var(--secondary)' :
                          'var(--accent)',
          top: `${10 + (index * 15)}%`,
          left: `${10 + (index * 15)}%`,
          opacity: '0.3',
        }}></div>
      ))}

      {/* Gradient circles */}
      <div className="circle-decoration circle-1" style={{
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255, 165, 0, 0.1) 0%, rgba(255, 165, 0, 0) 70%)',
        top: '20%',
        right: '-150px'
      }}></div>

      <div className="circle-decoration circle-2" style={{
        width: '200px',
        height: '200px',
        border: '1px solid rgba(0, 0, 255, 0.1)',
        bottom: '10%',
        left: '5%'
      }}></div>
    </div>
  );
};

export default DecorativeElements;
