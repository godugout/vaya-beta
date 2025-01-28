import { Link } from "react-router-dom";
import { LanguageSelector } from "./nav/LanguageSelector";

const Footer = () => {
  return (
    <footer className="bg-[#F1F1F1] text-vaya-gray-800 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Centered Logo and Description */}
        <div className="text-center mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-0.5 justify-center relative group"
          >
            <img 
              src="/lovable-uploads/ef40fff0-4da4-4937-af3d-c2276b1d2588.png"
              alt="Vaya Logo" 
              className="h-24 w-24 grayscale opacity-90 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]"
            />
            <span 
              className="font-outfit font-bold text-4xl sm:text-5xl text-vaya-gray-600 opacity-90 transition-all duration-300 group-hover:opacity-100 -ml-3"
              style={{
                textShadow: '1px 1px 2px rgba(255,255,255,1), -1px -1px 2px rgba(0,0,0,0.1)',
              }}
            >
              Vaya<sup className="opacity-75 transition-all duration-300 group-hover:text-vaya-home text-2xl sm:text-3xl font-semibold -ml-0.5">ᵅ</sup>
            </span>
          </Link>
          <p className="mt-6 text-xl sm:text-2xl leading-8 text-vaya-gray-600 max-w-2xl mx-auto">
            Connecting generations through shared memories and stories. Your family's legacy, preserved digitally.
          </p>
        </div>
        {/* Border separator */}
        <div className="border-t border-vaya-gray-200 pt-8">
          {/* Links and Language Selector in the same row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-8 gap-y-4">
              <a href="#" className="text-lg sm:text-xl leading-7 text-vaya-gray-600 hover:text-vaya-capsules hover:underline transition-colors">
                About Allusion Ink
              </a>
              <a href="#" className="text-lg sm:text-xl leading-7 text-vaya-gray-600 hover:text-vaya-capsules hover:underline transition-colors">
                Contact
              </a>
              <a href="#" className="text-lg sm:text-xl leading-7 text-vaya-gray-600 hover:text-vaya-capsules hover:underline transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-lg sm:text-xl leading-7 text-vaya-gray-600 hover:text-vaya-capsules hover:underline transition-colors">
                Terms of Use
              </a>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center justify-center sm:justify-end gap-2">
              <span className="text-vaya-gray-600">Language:</span>
              <LanguageSelector />
            </div>
          </div>

          {/* Copyright line */}
          <p className="text-lg text-center text-vaya-gray-500 mt-8">
            &copy; {new Date().getFullYear()} Allusion Ink. All rights reserved. Building memories that last generations.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;