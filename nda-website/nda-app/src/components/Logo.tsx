'use client';

import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 280, height = 90, className = '' }: LogoProps) {
  // Use a static import with a fixed path that will work in all environments
  return (
    <Image
      src="/logo.png"
      alt="Company Logo"
      width={width}
      height={height}
      className={`h-auto ${className}`}
      priority
      unoptimized={true} // This ensures the image is served as-is without optimization
    />
  );
}
