import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-primary/90 to-secondary/90 text-white py-8 mt-auto relative overflow-hidden backdrop-blur-sm">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full border border-white/10 opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full border border-white/5 opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="font-light tracking-wider">&copy; {currentYear} <span className="font-semibold">Company Name</span>. All rights reserved.</p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-white/90 hover:text-white transition duration-300 relative group">
              <span className="relative z-10">Privacy Policy</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="text-white/90 hover:text-white transition duration-300 relative group">
              <span className="relative z-10">Terms of Service</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
