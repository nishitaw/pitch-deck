'use client';

import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'gray';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  variant = 'primary',
  children,
}) => {
  // Base classes for all buttons
  const baseClasses = 'relative overflow-hidden font-bold py-3 px-6 rounded-lg focus:outline-none transition duration-300 transform hover:-translate-y-1 active:translate-y-0';

  // Classes based on variant
  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'primary';
      break;
    case 'secondary':
      variantClasses = 'secondary';
      break;
    case 'gray':
      variantClasses = 'bg-gray-200 hover:bg-gray-300 text-gray-800';
      break;
    default:
      variantClasses = 'primary';
  }

  // Classes for disabled state
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
      style={{
        opacity: 1,
        visibility: 'visible'
      }}
    >
      {/* Shine effect overlay */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-none group-hover:animate-shine"></span>

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center" style={{ opacity: 1, visibility: 'visible' }}>
        {children}
      </span>
    </button>
  );
};

export default Button;
