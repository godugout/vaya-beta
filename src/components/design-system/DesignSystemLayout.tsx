
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Palette, Type, Layout, Component, CircleUser, BookIcon } from 'lucide-react';

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
      "flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
      active && "bg-gray-100 dark:bg-gray-800 font-medium"
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
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r h-screen p-6 flex flex-col space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Design System</h1>
            <p className="text-sm text-muted-foreground mt-1">Guidelines & Components</p>
          </div>
          
          <nav className="space-y-1">
            <NavItem 
              href="/design-system/colors" 
              icon={<Palette className="h-5 w-5" />}
              active={currentPath === 'colors'}
            >
              Colors
            </NavItem>
            <NavItem 
              href="/design-system/typography" 
              icon={<Type className="h-5 w-5" />}
              active={currentPath === 'typography'}
            >
              Typography
            </NavItem>
            <NavItem 
              href="/design-system/spacing" 
              icon={<Layout className="h-5 w-5" />}
              active={currentPath === 'spacing'}
            >
              Spacing
            </NavItem>
            <NavItem 
              href="/design-system/components" 
              icon={<Component className="h-5 w-5" />}
              active={currentPath === 'components'}
            >
              Components
            </NavItem>
            <NavItem 
              href="/design-system/accessibility" 
              icon={<CircleUser className="h-5 w-5" />}
              active={currentPath === 'accessibility'}
            >
              Accessibility
            </NavItem>
          </nav>
          
          <div className="mt-auto pt-6 border-t">
            <a 
              href="https://docs.lovable.dev" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <BookIcon className="h-4 w-4" />
              <span>Documentation</span>
            </a>
          </div>
        </div>
        
        {/* Main content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
