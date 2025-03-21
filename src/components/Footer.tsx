
import { Link } from "react-router-dom";
import { LanguageSelector } from "./nav/LanguageSelector";

const Footer = () => {
  return (
    <footer className="bg-[#111] dark:bg-[#0C0C0C] text-gray-300 dark:text-gray-400 mt-auto relative z-content">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Centered Logo and Description */}
        <div className="text-center mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-0.5 justify-center relative group"
          >
            <div className="relative h-16 w-16 rounded-lg bg-black flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                {/* Star dots background */}
                <span className="absolute h-1 w-1 bg-white rounded-full top-2 left-2"></span>
                <span className="absolute h-1 w-1 bg-white rounded-full top-3 right-4"></span>
                <span className="absolute h-0.5 w-0.5 bg-white rounded-full bottom-3 left-4"></span>
                <span className="absolute h-0.5 w-0.5 bg-white rounded-full bottom-2 right-2"></span>
                <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-6 left-6"></span>
                <span className="absolute h-1 w-1 bg-white rounded-full bottom-5 right-5"></span>
              </div>
              <img 
                src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png" 
                alt="Vaya Logo" 
                className="h-10 w-10 object-contain"
              />
            </div>
            <span 
              className="font-outfit font-bold text-4xl sm:text-5xl text-autumn opacity-90 transition-all duration-300 group-hover:opacity-100 -ml-3"
              style={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.5), -1px -1px 2px rgba(0,0,0,0.5)',
              }}
            >
              Vaya
            </span>
          </Link>
          <p className="mt-6 text-xl sm:text-2xl leading-8 text-gray-300 dark:text-gray-400 max-w-2xl mx-auto">
            Connecting generations through shared memories and stories. Your family's legacy, preserved digitally.
          </p>
        </div>
        {/* Border separator */}
        <div className="border-t border-gray-800 dark:border-gray-800 pt-8">
          {/* Links and Language Selector in the same row */}
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-8 gap-y-4">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#" className="text-lg sm:text-xl leading-7 text-gray-300 dark:text-gray-400 hover:text-autumn hover:underline transition-colors">
                About Allusion Ink
              </a>
              <a href="#" className="text-lg sm:text-xl leading-7 text-gray-300 dark:text-gray-400 hover:text-autumn hover:underline transition-colors">
                Contact
              </a>
              <a href="#" className="text-lg sm:text-xl leading-7 text-gray-300 dark:text-gray-400 hover:text-autumn hover:underline transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-lg sm:text-xl leading-7 text-gray-300 dark:text-gray-400 hover:text-autumn hover:underline transition-colors">
                Terms of Use
              </a>
              <LanguageSelector />
            </div>
          </div>

          {/* Copyright line */}
          <p className="text-lg text-center text-gray-500 dark:text-gray-600 mt-8">
            &copy; {new Date().getFullYear()} Allusion Ink. All rights reserved. 
            <Link to="/houseofhanuman" className="hover:text-autumn transition-colors ml-1">
              Building memories that last generations.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
