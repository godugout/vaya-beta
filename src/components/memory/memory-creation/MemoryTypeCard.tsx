
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
      className="cursor-pointer group"
      onClick={onCardClick}
    >
      <div className="flex flex-col h-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
        <div className={cn("p-6 flex items-start gap-4", color)}>
          <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm transition-transform group-hover:scale-110">
            <Icon className={cn("h-6 w-6", iconClass)} />
          </div>
          <div className="text-white">
            <h3 className="font-semibold text-lg leading-none mb-2">{name}</h3>
            <p className="text-sm text-white/90">{description}</p>
          </div>
        </div>
        
        <div className="bg-background p-4 flex justify-between items-center mt-auto border-t border-slate-200 dark:border-slate-800">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onQuickStart();
            }}
            className="text-xs font-medium opacity-90 hover:opacity-100"
          >
            Quick Start
          </Button>
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default MemoryTypeCard;
