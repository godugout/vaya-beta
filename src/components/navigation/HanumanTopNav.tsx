
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { User } from '@supabase/supabase-js';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserMenu } from '@/components/nav/UserMenu';
import { GuestMenu } from '@/components/nav/GuestMenu';
import { Settings, Menu } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface HanumanTopNavProps {
  user?: User | null;
  handleSignOut?: () => Promise<void>;
  isSimplifiedView?: boolean;
  onSettingsToggle?: () => void;
}

export function HanumanTopNav({ 
  user, 
  handleSignOut = async () => {}, 
  isSimplifiedView = false,
  onSettingsToggle
}: HanumanTopNavProps) {
  const { t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const mainNavItems = [
    { label: t('memories'), path: "/memories" },
    { label: t('family'), path: "/create-family" },
    { label: t('stories'), path: "/stories" },
    { label: "Hanuman", path: "/hanuman" },
  ];

  const mobileMenuItems = [
    { label: "Home", path: "/" },
    ...mainNavItems
  ];

  const navigate = (path: string) => {
    window.location.href = path;
  };
  
  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-black/80 backdrop-blur-md border-b border-hanuman-saffron/20 py-2 shadow-lg" 
          : "bg-transparent py-4"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Mobile menu (visible on small screens) */}
        <div className="md:hidden flex items-center">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black/95 text-white border-r border-hanuman-saffron/20">
              <div className="flex flex-col gap-6 mt-6">
                <Link 
                  to="/" 
                  className="flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="h-10 w-10 flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png" 
                      alt="Vaya Logo" 
                      className="h-7 w-7 object-contain"
                    />
                  </div>
                  <span className="text-lg font-heading font-semibold text-white">Vaya</span>
                </Link>
                
                <nav className="flex flex-col gap-1">
                  {mobileMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "px-4 py-3 rounded-md transition-colors",
                        isActive(item.path)
                          ? "bg-hanuman-primary/20 text-hanuman-saffron"
                          : "hover:bg-white/10 text-white/80 hover:text-white"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo and brand */}
        <Link 
          to="/" 
          className={cn(
            "flex items-center gap-2 transition-transform",
            scrolled ? "scale-90" : ""
          )}
        >
          <motion.div 
            className="relative h-10 w-10 rounded-lg bg-black/60 flex items-center justify-center overflow-hidden border border-hanuman-primary/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png" 
              alt="Vaya Logo" 
              className="h-7 w-7 object-contain"
            />
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-hanuman-primary/20 to-hanuman-saffron/10 opacity-60"></div>
          </motion.div>
          <span className="font-heading font-bold text-xl text-white">Vaya</span>
        </Link>
        
        {/* Desktop navigation (hidden on small screens) */}
        <nav className="hidden md:flex items-center gap-1">
          {mainNavItems.map((item) => (
            <motion.div key={item.path} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link 
                to={item.path} 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive(item.path) 
                    ? "bg-hanuman-primary/20 text-hanuman-saffron" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>
        
        {/* Right-side actions */}
        <div className="flex items-center gap-2">
          {onSettingsToggle && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onSettingsToggle}
              className="rounded-full"
              aria-label={isSimplifiedView ? "Use standard view" : "Use simplified view"}
            >
              <Settings className="h-5 w-5" />
            </Button>
          )}
          
          {user ? (
            <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
          ) : (
            <GuestMenu navigate={navigate} />
          )}
        </div>
      </div>
    </motion.header>
  );
}
