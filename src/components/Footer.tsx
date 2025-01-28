import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F1F1F1] text-vaya-gray-800 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Logo and Description */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/ef40fff0-4da4-4937-af3d-c2276b1d2588.png"
                alt="Vaya Logo" 
                className="h-10 w-10 rounded-lg"
              />
              <span className="font-outfit font-bold text-2xl">
                Vaya<sup>α</sup>
              </span>
            </Link>
            <p className="mt-4 text-base sm:text-lg leading-7 text-vaya-gray-600">
              Connecting generations through shared memories and stories. Your family's legacy, preserved digitally.
            </p>
          </div>

          {/* Company Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <a href="#" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-gray-900">
              About Allusion Ink
            </a>
            <a href="#" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-gray-900">
              Contact
            </a>
            <a href="#" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-gray-900">
              Terms of Use
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-vaya-gray-200 pt-8">
          <p className="text-base text-vaya-gray-500">
            &copy; {new Date().getFullYear()} Allusion Ink. All rights reserved. Building memories that last generations.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;