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
        width: '100px',
        height: '200px',
        borderTopLeftRadius: '100px',
        borderBottomLeftRadius: '100px',
        borderLeft: '1px solid rgba(255, 165, 0, 0.15)'
      }}></div>

      <div className="curved-line curved-line-2" style={{
        bottom: '10%',
        left: '5%',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        border: '1px solid rgba(0, 0, 255, 0.08)',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        transform: 'rotate(45deg)'
      }}></div>

      {/* Animated dots */}
      {Array.from({ length: Math.min(count, 4) }).map((_, index) => (
        <div key={`dot-${index}`} className="dot" style={{
          animation: 'float 15s infinite ease-in-out',
          animationDelay: `${index * 3}s`,
          backgroundColor: index % 3 === 0 ? 'var(--primary)' :
                          index % 3 === 1 ? 'var(--secondary)' :
                          'var(--accent)',
          top: `${15 + (index * 18)}%`,
          left: `${15 + (index * 18)}%`,
          opacity: '0.15',
          width: '4px',
          height: '4px'
        }}></div>
      ))}

      {/* Gradient circles */}
      <div className="circle-decoration circle-1" style={{
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255, 165, 0, 0.05) 0%, rgba(255, 165, 0, 0) 70%)',
        top: '20%',
        right: '-100px'
      }}></div>

      <div className="circle-decoration circle-2" style={{
        width: '150px',
        height: '150px',
        border: '1px solid rgba(0, 0, 255, 0.05)',
        bottom: '10%',
        left: '5%'
      }}></div>
    </div>
  );
};

export default DecorativeElements;
