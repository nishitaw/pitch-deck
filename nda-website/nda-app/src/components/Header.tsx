import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="backdrop-blur-md bg-white/80 py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center relative group mr-8">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={240}
            height={80}
            className="h-16 w-auto relative"
            priority
          />
        </Link>

        <nav className="flex-1 flex justify-end">
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/"
                className="text-darkGray hover:text-primary transition duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/documents"
                className="text-darkGray hover:text-primary transition duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
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
