
import { Link } from "react-router-dom";
import { LanguageSelector } from "./nav/LanguageSelector";
import { ExternalLink, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0c] text-gray-400 mt-auto relative z-content py-8">
      <div className="container mx-auto px-4">
        {/* Centered Logo */}
        <div className="text-center mb-6">
          <Link 
            to="/" 
            className="inline-flex flex-col items-center gap-2"
          >
            <img 
              src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png" 
              alt="Vaya Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-heading font-bold text-white">Vaya</span>
          </Link>
          <p className="mt-3 text-sm leading-6 max-w-lg mx-auto text-gray-500">
            Connecting generations through shared memories and stories. 
            Your family's legacy, preserved digitally.
          </p>
        </div>
        
        {/* Links */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-4 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
            <LanguageSelector />
          </div>

          {/* Copyright */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} Allusion Ink</p>
            <a href="https://github.com/" className="flex items-center gap-1 hover:text-gray-400 transition-colors">
              <Github size={14} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
