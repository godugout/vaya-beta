
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BreadcrumbNavProps {
  isSimplifiedView?: boolean;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ 
  isSimplifiedView = false 
}) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  // Skip rendering breadcrumbs on the home page
  if (pathnames.length === 0) return null;
  
  // Format the path name for display (capitalize, replace hyphens with spaces)
  const formatPathName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const containerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    initial: { opacity: 0, x: -5 },
    animate: { opacity: 1, x: 0 }
  };

  return (
    <nav className={cn(
      "px-4 py-2 mb-4 text-sm md:text-base",
      "border-b border-gray-200 dark:border-gray-800",
      "bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
    )}>
      <motion.ol 
        className="flex flex-wrap items-center"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.li variants={itemVariants}>
          <Link 
            to="/" 
            className={cn(
              "flex items-center text-gray-500 hover:text-autumn transition-colors",
              isSimplifiedView && "text-base"
            )}
          >
            <Home size={isSimplifiedView ? 20 : 16} strokeWidth={1.5} className="mr-1" />
            <span className={isSimplifiedView ? "sr-only" : ""}>Home</span>
          </Link>
        </motion.li>
        
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <React.Fragment key={name}>
              <motion.li variants={itemVariants} className="flex items-center mx-2">
                <ChevronRight 
                  size={isSimplifiedView ? 20 : 16} 
                  className="text-gray-400" 
                />
              </motion.li>
              
              <motion.li variants={itemVariants}>
                {isLast ? (
                  <span className={cn(
                    "text-autumn font-medium",
                    isSimplifiedView && "text-lg"
                  )}>
                    {formatPathName(name)}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className={cn(
                      "text-gray-500 hover:text-autumn transition-colors",
                      isSimplifiedView && "text-lg"
                    )}
                  >
                    {formatPathName(name)}
                  </Link>
                )}
              </motion.li>
            </React.Fragment>
          );
        })}
      </motion.ol>
    </nav>
  );
};
