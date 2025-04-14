
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, User, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const HanumanTopNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Navigation items
  const navItems = [
    { label: "Memories", path: "/memories" },
    { label: "Family", path: "/families" },
    { label: "Stories", path: "/stories" },
    { label: "Hanuman", path: "/hanuman", active: true }
  ];
  
  // Track scroll position to update navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "hanuman-nav-scrolled" 
          : "hanuman-nav-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="hanuman-mobile-menu">
              <div className="flex flex-col gap-6 mt-6">
                <Link 
                  to="/" 
                  className="flex items-center gap-2 mb-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="relative h-10 w-10 rounded-lg bg-black/60 flex items-center justify-center overflow-hidden border border-hanuman-primary/30">
                    <img
                      src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png"
                      alt="Vaya Logo"
                      className="h-7 w-7 object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-hanuman-primary/20 to-hanuman-saffron/10 opacity-60"></div>
                  </div>
                  <span className="font-bold text-xl">Vaya</span>
                </Link>
                
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`hanuman-mobile-menu-item ${
                        item.active ? "hanuman-mobile-menu-item-active" : "hanuman-mobile-menu-item-inactive"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link 
            to="/" 
            className={`hanuman-nav-logo ${scrolled ? "hanuman-nav-logo-scrolled" : ""}`}
          >
            <div className="hanuman-nav-logo-container">
              <img
                src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png"
                alt="Vaya Logo"
                className="h-7 w-7 object-contain"
              />
              <div className="hanuman-nav-logo-glow"></div>
            </div>
            <span className="font-bold text-xl text-white">Vaya</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`hanuman-nav-item ${
                item.active ? "hanuman-nav-item-active" : "hanuman-nav-item-inactive"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Right-side Actions */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white/80 hover:text-white"
          >
            Sign In
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default HanumanTopNav;
