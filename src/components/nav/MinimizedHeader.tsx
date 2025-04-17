
import React from "react";
import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { cn } from "@/lib/utils";
import { VayaLogo } from "@/components/branding/VayaLogo";

interface MinimizedHeaderProps {
  isMinimized: boolean;
}

export const MinimizedHeader = ({ isMinimized }: MinimizedHeaderProps) => {
  if (!isMinimized) return null;
  
  return (
    <div className="flex items-center h-12 px-4 w-full">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Home">
          <VayaLogo 
            size="sm" 
            animated={true} 
            autoAnimate={true}
            textClassName="text-forest dark:text-leaf ml-1" 
          />
        </Link>
        
        {/* Divider */}
        <div className="h-6 w-px bg-border/50"></div>
        
        {/* Home icon */}
        <Link 
          to="/"
          className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
          aria-label="Home"
        >
          <Home size={18} />
        </Link>
        
        {/* Search */}
        <Link 
          to="/search"
          className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
          aria-label="Search"
        >
          <Search size={18} />
        </Link>
        
        {/* Breadcrumbs */}
        <BreadcrumbNav isMinimized={true} />
      </div>
    </div>
  );
};
