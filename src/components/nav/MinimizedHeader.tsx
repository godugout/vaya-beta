
import React from "react";
import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { cn } from "@/lib/utils";

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
          <img 
            src="/lovable-uploads/4425ec86-56fe-44c4-9f47-75e59d3cb287.png" 
            alt="Vaya Logo" 
            className="h-6" 
          />
          <span className="text-lg font-heading font-semibold text-forest dark:text-leaf ml-1">Vaya</span>
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
