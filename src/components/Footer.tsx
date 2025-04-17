
import { Link } from "react-router-dom";
import { LanguageSelector } from "./nav/LanguageSelector";

const Footer = () => {
  return (
    <footer className="bg-[#F1F1F1] dark:bg-dark-background-surface text-vaya-gray-800 dark:text-dark-text-secondary mt-auto relative z-content">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Centered Logo and Description */}
        <div className="text-center mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-0.5 justify-center relative group"
          >
            <img 
              src="/lovable-uploads/7a139c69-d8f3-4454-9eca-472016d74c47.png"
              alt="Vaya Logo" 
              className="h-24 w-24 grayscale opacity-90 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]"
            />
            <span 
              className="font-outfit font-bold text-4xl sm:text-5xl text-vaya-gray-600 dark:text-dark-text-primary opacity-90 transition-all duration-300 group-hover:opacity-100 -ml-3"
              style={{
                textShadow: '1px 1px 2px rgba(255,255,255,1), -1px -1px 2px rgba(0,0,0,0.1)',
              }}
            >
              VAYA<sup className="opacity-75 transition-all duration-300 group-hover:text-vaya-home text-2xl sm:text-3xl font-semibold -ml-0.5">ᵅ</sup>
            </span>
          </Link>
          <p className="mt-6 text-xl sm:text-2xl leading-8 text-vaya-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
            Connecting generations through shared memories and stories. Your family's legacy, preserved digitally.
          </p>
        </div>
        {/* Border separator */}
        <div className="border-t border-vaya-gray-200 dark:border-dark-border pt-8">
          {/* Links and Language Selector in the same row */}
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-8 gap-y-4">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#" className="text-lg sm:text-xl leading-7 text-vaya-gray-600 dark:text-dark-text-secondary hover:text-vaya-capsules dark:hover:text-dark-accent-purple hover:underline transition-colors">
                About Allusion Ink
              </a>
              <a href="#" className="text-lg sm:text-xl leading-7 text-vaya-gray-600 dark:text-dark-text-secondary hover:text-vaya-capsules dark:hover:text-dark-accent-purple hover:underline transition-colors">
                Contact
              </a>
              <a href="#" className="text-lg sm:text-xl leading-7 text-vaya-gray-600 dark:text-dark-text-secondary hover:text-vaya-capsules dark:hover:text-dark-accent-purple hover:underline transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-lg sm:text-xl leading-7 text-vaya-gray-600 dark:text-dark-text-secondary hover:text-vaya-capsules dark:hover:text-dark-accent-purple hover:underline transition-colors">
                Terms of Use
              </a>
              <LanguageSelector />
            </div>
          </div>

          {/* Copyright line */}
          <p className="text-lg text-center text-vaya-gray-500 dark:text-dark-text-tertiary mt-8">
            &copy; {new Date().getFullYear()} Allusion Ink. All rights reserved. Building memories that last generations.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
