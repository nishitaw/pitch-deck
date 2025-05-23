'use client';

import React, { useEffect, useState } from 'react';

interface DecorativeElementsProps {
  count?: number;
}

const DecorativeElements: React.FC<DecorativeElementsProps> = ({ count = 4 }) => {
  // All hooks must be called at the top level
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setMounted(true);

    // Only run this in the browser
    if (typeof window !== 'undefined') {
      // Set initial width
      setWindowWidth(window.innerWidth);

      // Add resize listener
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Only render on client side to avoid hydration issues
  if (!mounted) return null;

  // Adjust count based on screen size
  const adjustedCount = windowWidth < 768 ? Math.min(count, 2) : count;

  return (
    <div className="decorative-elements">
      {/* Curved lines - only visible on larger screens */}
      <div className="curved-line curved-line-1 hidden md:block" style={{
        top: '20%',
        right: '0',
        width: '100px',
        height: '200px',
        borderTopLeftRadius: '100px',
        borderBottomLeftRadius: '100px',
        borderLeft: '1px solid rgba(255, 165, 0, 0.15)'
      }}></div>

      <div className="curved-line curved-line-2 hidden md:block" style={{
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

      {/* Animated dots - reduced on smaller screens */}
      {Array.from({ length: Math.min(adjustedCount, 4) }).map((_, index) => (
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

      {/* Gradient circle - smaller on mobile */}
      <div className="circle-decoration circle-1" style={{
        width: windowWidth < 768 ? '100px' : '200px',
        height: windowWidth < 768 ? '100px' : '200px',
        background: 'radial-gradient(circle, rgba(255, 165, 0, 0.05) 0%, rgba(255, 165, 0, 0) 70%)',
        top: '20%',
        right: '-50px'
      }}></div>
    </div>
  );
};

export default DecorativeElements;
