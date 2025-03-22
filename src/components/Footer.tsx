
import { Link } from "react-router-dom";
import { LanguageSelector } from "./nav/LanguageSelector";

const Footer = () => {
  return (
    <footer className="bg-[#111] dark:bg-[#0C0C0C] text-gray-300 dark:text-gray-400 mt-auto relative z-content py-8">
      <div className="container mx-auto px-4">
        {/* Centered Logo */}
        <div className="text-center mb-8">
          <Link 
            to="/" 
            className="inline-flex flex-col items-center gap-2"
          >
            <img 
              src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png" 
              alt="Vaya Logo" 
              className="h-12 w-12 object-contain"
            />
            <span className="text-2xl font-heading font-bold text-autumn">Vaya</span>
          </Link>
          <p className="mt-4 text-lg leading-7 max-w-2xl mx-auto">
            Connecting generations through shared memories and stories. 
            Your family's legacy, preserved digitally.
          </p>
        </div>
        
        {/* Links */}
        <div className="border-t border-gray-800 dark:border-gray-800 pt-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6">
            <a href="#" className="text-gray-300 hover:text-autumn transition-colors">
              About Allusion Ink
            </a>
            <a href="#" className="text-gray-300 hover:text-autumn transition-colors">
              Contact
            </a>
            <a href="#" className="text-gray-300 hover:text-autumn transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-autumn transition-colors">
              Terms of Use
            </a>
            <LanguageSelector />
          </div>

          {/* Copyright */}
          <p className="text-center text-gray-500 dark:text-gray-600">
            &copy; {new Date().getFullYear()} Allusion Ink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
