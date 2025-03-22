
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme/ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserMenu } from './nav/UserMenu';
import { GuestMenu } from './nav/GuestMenu';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

interface MainNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MainNav({ className, ...props }: MainNavProps) {
  const { t } = useLanguage();
  const location = useLocation();
  const { user, signOut } = useSupabaseAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const navigate = (path: string) => {
    window.location.href = path;
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-white/10">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 rounded-lg bg-black flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png" 
                alt="Vaya Logo" 
                className="h-7 w-7 object-contain"
              />
            </div>
            <span className="font-heading font-bold text-xl text-white">Vaya</span>
          </Link>
          
          <nav className="hidden md:flex gap-1">
            <Link 
              to="/memories" 
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive("/memories") 
                  ? "text-autumn bg-white/10" 
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              {t('memories')}
            </Link>
            <Link 
              to="/family-setup" 
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive("/family-setup") 
                  ? "text-autumn bg-white/10" 
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              {t('family')}
            </Link>
            <Link 
              to="/stories" 
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive("/stories") 
                  ? "text-autumn bg-white/10" 
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              {t('stories')}
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          {user ? (
            <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
          ) : (
            <GuestMenu navigate={navigate} />
          )}
        </div>
      </div>
    </div>
  );
}
