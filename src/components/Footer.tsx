import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F1F0FB] text-vaya-gray-800 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/ef40fff0-4da4-4937-af3d-c2276b1d2588.png"
                alt="Vaya Logo" 
                className="h-10 w-10"
              />
              <span className="font-outfit font-bold text-2xl">
                Vaya<sup>α</sup>
              </span>
            </Link>
            <p className="text-base sm:text-lg leading-7 text-vaya-gray-600">
              Connecting generations through shared memories and stories. Your family's legacy, preserved digitally.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-lg font-semibold leading-6 text-vaya-gray-900">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link to="/memory-lane" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-memories">
                      Memory Lane
                    </Link>
                  </li>
                  <li>
                    <Link to="/share-stories" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-stories">
                      Share Stories
                    </Link>
                  </li>
                  <li>
                    <Link to="/family-capsules" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-capsules">
                      Family Capsules
                    </Link>
                  </li>
                  <li>
                    <Link to="/families" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-gray-900">
                      Family Groups
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-lg font-semibold leading-6 text-vaya-gray-900">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-gray-900">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-gray-900">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-gray-900">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold leading-6 text-vaya-gray-900">Company</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li>
                  <a href="#" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-gray-900">
                    About Allusion Ink
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-gray-900">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-gray-900">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base sm:text-lg leading-7 text-vaya-gray-600 hover:text-vaya-gray-900">
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>
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