
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileTopNav } from "./nav/MobileTopNav";
import { MobileBottomNav } from "./nav/MobileBottomNav";
import { useToast } from "@/components/ui/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function MainNav() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isSimplifiedView, setIsSimplifiedView] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const { toast } = useToast();

  // Get simplified view preference from localStorage
  useEffect(() => {
    const savedPreference = localStorage.getItem('simplifiedView');
    if (savedPreference) {
      setIsSimplifiedView(savedPreference === 'true');
    }
  }, []);

  // Save simplified view preference to localStorage
  const toggleSimplifiedView = () => {
    const newValue = !isSimplifiedView;
    setIsSimplifiedView(newValue);
    localStorage.setItem('simplifiedView', String(newValue));
    
    toast({
      title: newValue ? "Simplified View Enabled" : "Standard View Enabled",
      description: newValue 
        ? "Larger text and touch targets for easier navigation." 
        : "Standard navigation view restored.",
    });
  };

  const toggleVoiceNavigation = () => {
    setIsVoiceActive(prev => !prev);
    
    if (!isVoiceActive) {
      toast({
        title: "Voice Navigation Active",
        description: "Try saying 'Go to Home' or 'Record Story'",
      });
    } else {
      toast({
        title: "Voice Navigation Disabled",
        description: "Voice commands have been turned off.",
      });
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      
      // Show welcome toast when user signs in
      if (_event === 'SIGNED_IN') {
        const fullName = session?.user?.user_metadata?.full_name || 'User';
        toast({
          title: `Welcome, ${fullName}!`,
          description: "You have successfully signed in.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/auth");
  };

  // Generate breadcrumbs based on the current path
  const renderBreadcrumbs = () => {
    const path = window.location.pathname;
    if (path === '/') return null;
    
    const pathSegments = path.split('/').filter(Boolean);
    if (pathSegments.length === 0) return null;
    
    return (
      <div className="container max-w-7xl py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className={cn("h-4 w-4", isSimplifiedView && "h-5 w-5")} />
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1;
              const formattedSegment = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
              
              const segmentPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
              
              return (
                <React.Fragment key={segment}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className={cn(
                        "font-medium",
                        isSimplifiedView && "text-base"
                      )}>
                        {formattedSegment}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink 
                        href={segmentPath}
                        className={cn(
                          isSimplifiedView && "text-base"
                        )}
                      >
                        {formattedSegment}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-nav bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <DesktopNav 
          user={user} 
          handleSignOut={handleSignOut} 
          navigate={navigate} 
          isSimplifiedView={isSimplifiedView}
          isVoiceActive={isVoiceActive}
          onVoiceToggle={toggleVoiceNavigation}
        />
        <MobileTopNav 
          user={user} 
          handleSignOut={handleSignOut} 
          navigate={navigate} 
          isSimplifiedView={isSimplifiedView}
          onSettingsToggle={toggleSimplifiedView}
        />
      </div>
      
      {/* Voice navigation indicator */}
      {isVoiceActive && (
        <div className="fixed top-20 left-0 right-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-3">
          <div className="container max-w-7xl">
            <div className="flex items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg animate-pulse">
              <div className="h-10 w-10 bg-ui-orange rounded-full flex items-center justify-center text-white mr-3">
                <span className="sr-only">Voice Active</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12V6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6V12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 10V12C19 15.866 15.866 19 12 19M12 19C8.13401 19 5 15.866 5 12V10M12 19V22M8 22H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-medium">Listening for commands...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Try "Go to Home" or "Record Story"</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <MobileBottomNav 
        user={user} 
        navigate={navigate} 
        isSimplifiedView={isSimplifiedView}
        isVoiceActive={isVoiceActive}
        onVoiceToggle={toggleVoiceNavigation}
      />
      
      {/* Breadcrumbs navigation */}
      <div className={`mt-20 ${isVoiceActive ? 'pt-16' : ''}`}>
        {renderBreadcrumbs()}
      </div>
      
      {/* Spacer for fixed header and breadcrumbs */}
      <div className={`h-20 ${isVoiceActive ? 'h-36' : ''}`} /> 
    </>
  );
}
