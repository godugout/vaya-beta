
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MemoryTypeCardProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  iconClass: string;
  onCardClick: () => void;
  onQuickStart: () => void;
}

const MemoryTypeCard = ({
  id,
  name,
  description,
  icon: Icon,
  color,
  iconClass,
  onCardClick,
  onQuickStart,
}: MemoryTypeCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onCardClick}
    >
      <div className="flex flex-col h-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
        <div className={cn("p-4 flex items-center gap-4", color)}>
          <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
            <Icon className={cn("h-5 w-5", iconClass)} />
          </div>
          <div className="text-white">
            <h3 className="font-medium leading-none mb-1">{name}</h3>
            <p className="text-xs text-white/80">{description}</p>
          </div>
        </div>
        
        <div className="bg-background p-3 flex justify-between items-center mt-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onQuickStart();
            }}
            className="text-xs opacity-90 hover:opacity-100"
          >
            Quick Start
          </Button>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </motion.div>
  );
};

export default MemoryTypeCard;
