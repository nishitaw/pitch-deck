import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="backdrop-blur-md bg-white/80 py-1 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-3 flex justify-between items-center">
        <Link href="/" className="logo-container relative group mr-4">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={100}
            height={32}
            className="logo-image relative"
            priority
          />
        </Link>

        <nav className="flex-1 flex justify-end">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className="text-sm font-medium text-darkGray hover:text-primary transition duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/documents"
                className="text-sm font-medium text-darkGray hover:text-primary transition duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
              >
                Documents
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
