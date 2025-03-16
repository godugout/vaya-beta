
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { MainNav } from '@/components/MainNav';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from "@/components/ui/toaster";
import { useNavigate, useLocation } from 'react-router-dom';
import { useActivityTracking, ActivityTypes } from '@/hooks/useActivityTracking';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className = "" }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { trackActivity } = useActivityTracking();
  const [user, setUser] = useState<User | null>(null);
  
  // Track page views
  useEffect(() => {
    trackActivity(ActivityTypes.PAGE_VIEW, {
      path: location.pathname,
      search: location.search,
      title: document.title
    });
  }, [location.pathname, location.search, trackActivity]);
  
  // Get the current user
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  const handleSignOut = async () => {
    // Track logout before signing out
    trackActivity(ActivityTypes.LOGOUT);
    
    // Actual sign out functionality
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error);
    navigate("/auth");
    return Promise.resolve();
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      {/* Simple header for now */}
      <header className="px-4 py-3 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
          <div className="h-9 w-9 flex items-center justify-center">
            <img 
              src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png" 
              alt="Vaya Logo" 
              className="h-7 w-7 object-contain"
            />
          </div>
          <span className="text-lg font-semibold">Vaya</span>
        </div>
        
        <div className="flex items-center gap-2">
          {user ? (
            <button 
              onClick={handleSignOut}
              className="px-3 py-1 text-sm bg-slate-800 hover:bg-slate-700 rounded"
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => navigate('/auth')}
              className="px-3 py-1 text-sm bg-slate-800 hover:bg-slate-700 rounded"
            >
              Sign In
            </button>
          )}
        </div>
      </header>
      
      <main className="flex-grow p-4">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      {/* Simplified footer */}
      <footer className="p-4 border-t border-slate-800 bg-slate-900 text-slate-400 text-center text-sm">
        Vaya © {new Date().getFullYear()}
      </footer>
      
      <Toaster />
    </div>
  );
};
