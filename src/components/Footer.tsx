import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#222222] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/ef40fff0-4da4-4937-af3d-c2276b1d2588.png"
                alt="Vaya Logo" 
                className="h-8 w-8"
              />
              <span className="font-outfit font-bold text-xl">
                Vaya<sup>α</sup>
              </span>
            </Link>
            <p className="text-sm leading-6 text-gray-300">
              Preserving memories, connecting generations.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link to="/memory-lane" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Memory Lane
                    </Link>
                  </li>
                  <li>
                    <Link to="/family-capsules" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Family Capsules
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">
                      About Allusion Ink
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} Allusion Ink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;