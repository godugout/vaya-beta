
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, BookOpen, Calendar, Mic, Settings, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useVoiceInteraction } from '@/contexts/VoiceInteractionContext';
import { useWeddingMode } from '@/components/wedding-mode/WeddingModeProvider';

interface NavigationItemProps {
  icon: React.ReactElement;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const NavigationItem = ({ icon, label, isActive, onClick }: NavigationItemProps) => {
  const { accessibilityMode } = useVoiceInteraction();
  
  // Different styles based on accessibility mode
  const getItemClasses = () => {
    const baseClasses = "flex flex-col items-center gap-1 p-3 rounded-lg transition-colors";
    
    if (accessibilityMode === 'high-contrast') {
      return cn(baseClasses, "border-2", isActive 
        ? "bg-black text-white border-white" 
        : "bg-gray-800 text-gray-300 border-gray-600 hover:border-gray-400");
    } else if (accessibilityMode === 'simplified') {
      return cn(baseClasses, isActive 
        ? "bg-blue-600 text-white" 
        : "bg-gray-200 text-gray-700 hover:bg-gray-300");
    } else {
      return cn(baseClasses, isActive 
        ? "bg-primary text-primary-foreground" 
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground");
    }
  };
  
  const getLabelClasses = () => {
    if (accessibilityMode === 'high-contrast' || accessibilityMode === 'simplified') {
      return "text-base font-bold";
    }
    return "text-xs font-medium";
  };
  
  return (
    <motion.button
      className={getItemClasses()}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      <div className={cn(
        "w-10 h-10 flex items-center justify-center rounded-full",
        isActive ? "bg-white/20" : "bg-transparent"
      )}>
        {React.cloneElement(icon, { 
          className: cn("h-6 w-6", isActive ? "text-inherit" : "text-inherit"),
          "aria-hidden": "true"
        })}
      </div>
      <span className={getLabelClasses()}>
        {label}
      </span>
    </motion.button>
  );
};

export function SimplifiedNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessibilityMode, userExperienceLevel } = useVoiceInteraction();
  const { isActive: isWeddingModeActive } = useWeddingMode();
  
  // Define routes based on user type and context
  const getNavItems = () => {
    const baseItems = [
      { 
        icon: <Home />, 
        label: "Home", 
        path: "/" 
      },
      { 
        icon: <Users />, 
        label: "Family", 
        path: "/families" 
      },
      { 
        icon: <BookOpen />, 
        label: "Stories", 
        path: "/share-stories" 
      },
      { 
        icon: <Mic />, 
        label: "Voice", 
        path: "/sacred-voice-experience"
      }
    ];
    
    // Add wedding-specific items if in wedding mode
    if (isWeddingModeActive) {
      baseItems.push({ 
        icon: <Heart />, 
        label: "Wedding", 
        path: "/wedding-mode" 
      });
    }
    
    // Add settings for all users
    baseItems.push({ 
      icon: <Settings />, 
      label: "Settings", 
      path: "/settings" 
    });
    
    return baseItems;
  };
  
  const navItems = getNavItems();
  
  const navClasses = cn(
    "grid gap-2 p-2 rounded-lg",
    accessibilityMode === 'simplified' ? "grid-cols-3" : "grid-cols-4",
    {
      "bg-gray-900 border-2 border-white": accessibilityMode === 'high-contrast',
      "bg-white shadow-md": accessibilityMode === 'simplified',
      "bg-background/50 backdrop-blur-md border border-border/50": accessibilityMode === 'standard'
    }
  );
  
  return (
    <nav className={navClasses}>
      {navItems.map((item) => (
        <NavigationItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          path={item.path}
          isActive={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        />
      ))}
    </nav>
  );
}
