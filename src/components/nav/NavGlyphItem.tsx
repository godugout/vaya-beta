
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
                "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border transition-all duration-300",
                isActive 
                  ? "bg-autumn/20 border-autumn/30 cosmic-glow" 
                  : "bg-black/60 backdrop-blur-md border-white/10 hover:bg-black/80 hover:border-white/20"
              )}
            >
              <motion.span 
                className={cn(
                  "transition-colors",
                  isActive ? "text-autumn" : "text-gray-400"
                )}
                animate={isActive ? {
                  filter: ["drop-shadow(0 0 2px rgba(242, 153, 45, 0.3))", "drop-shadow(0 0 4px rgba(242, 153, 45, 0.5))", "drop-shadow(0 0 2px rgba(242, 153, 45, 0.3))"]
                } : {}}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                {icon}
              </motion.span>
            </motion.div>
            <span className={cn(
              "mt-1 text-xs font-medium",
              isActive ? "text-autumn" : "text-gray-400"
            )}>
              {label}
            </span>
            {isActive && (
              <motion.div 
                layoutId="activeIndicator"
                className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-autumn"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  boxShadow: ["0 0 3px rgba(242, 153, 45, 0.3)", "0 0 5px rgba(242, 153, 45, 0.5)", "0 0 3px rgba(242, 153, 45, 0.3)"]  
                }}
                transition={{ 
                  opacity: { duration: 0.3 }, 
                  boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" } 
                }}
              />
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-black/80 border-white/10 backdrop-blur text-white">
          <p className="font-medium">{label}</p>
          {description && <p className="text-xs text-gray-400">{description}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
