
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavGlyphItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  description?: string;
}

export const NavGlyphItem = ({ to, icon, label, description }: NavGlyphItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={to}
            className="group flex flex-col items-center justify-center relative"
            aria-current={isActive ? "page" : undefined}
          >
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center",
                "transition-colors duration-300",
                isActive 
                  ? "bg-autumn/20 dark:bg-leaf/20" 
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-autumn/10 dark:hover:bg-leaf/10"
              )}
            >
              <span className={cn(
                "transition-colors",
                isActive ? "text-autumn dark:text-leaf" : "text-gray-600 dark:text-gray-400"
              )}>
                {icon}
              </span>
            </motion.div>
            <span className={cn(
              "mt-1 text-xs font-medium",
              isActive ? "text-autumn dark:text-leaf" : "text-gray-600 dark:text-gray-400"
            )}>
              {label}
            </span>
            {isActive && (
              <motion.div 
                layoutId="activeIndicator"
                className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-autumn dark:bg-leaf"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="font-medium">{label}</p>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
