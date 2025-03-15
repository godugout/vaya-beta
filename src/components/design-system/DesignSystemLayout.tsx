
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Palette, Type, Layout, Components, FileCode, CircleUser, BookIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

const NavItem = ({ href, icon, children, active }: NavItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-dark-background-elevated",
      active && "bg-gray-100 dark:bg-dark-background-elevated font-medium"
    )}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

export const DesignSystemLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || '';
  
  return (
    <div className="min-h-screen bg-white dark:bg-dark-background text-black dark:text-dark-text-primary flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 dark:border-dark-background-elevated p-4 flex flex-col space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Vaya Design</h1>
          <p className="text-sm text-gray-500 dark:text-dark-text-tertiary">Design System & Brand Guide</p>
        </div>
        
        <nav className="space-y-1">
          <NavItem 
            href="/design-system" 
            icon={<Palette size={18} />} 
            active={currentPath === 'design-system'}
          >
            Theme Customizer
          </NavItem>
          <NavItem 
            href="/design-system/colors" 
            icon={<Palette size={18} />} 
            active={currentPath === 'colors'}
          >
            Color Palette
          </NavItem>
          <NavItem 
            href="/design-system/typography" 
            icon={<Type size={18} />} 
            active={currentPath === 'typography'}
          >
            Typography
          </NavItem>
          <NavItem 
            href="/design-system/spacing" 
            icon={<Layout size={18} />} 
            active={currentPath === 'spacing'}
          >
            Spacing & Grid
          </NavItem>
          <NavItem 
            href="/design-system/components" 
            icon={<Components size={18} />} 
            active={currentPath === 'components'}
          >
            Components
          </NavItem>
          <NavItem 
            href="/design-system/icons" 
            icon={<FileCode size={18} />} 
            active={currentPath === 'icons'}
          >
            Icon Library
          </NavItem>
          <NavItem 
            href="/design-system/accessibility" 
            icon={<CircleUser size={18} />} 
            active={currentPath === 'accessibility'}
          >
            Accessibility
          </NavItem>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-dark-background-elevated">
          <a 
            href="https://docs.lovable.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 text-sm text-gray-500 dark:text-dark-text-tertiary hover:text-gray-900 dark:hover:text-dark-text-primary"
          >
            <BookIcon size={14} />
            <span>Lovable Documentation</span>
          </a>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        {children}
      </div>
    </div>
  );
};
