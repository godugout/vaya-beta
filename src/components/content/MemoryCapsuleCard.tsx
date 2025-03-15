
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Lock, Unlock, Users, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { format } from "date-fns";

export interface MemoryCapsuleProps {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  unlocksAt: string;
  isLocked: boolean;
  contributors: Array<{
    name: string;
    avatar?: string;
  }>;
  itemCount: number;
  className?: string;
  onOpen?: () => void;
}

export const MemoryCapsuleCard = ({
  id,
  title,
  description,
  createdAt,
  unlocksAt,
  isLocked,
  contributors,
  itemCount,
  className,
  onOpen,
}: MemoryCapsuleProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const isUnlockable = new Date(unlocksAt) <= new Date();
  const canOpen = isUnlockable && !isLocked;

  const daysUntilUnlock = () => {
    const now = new Date();
    const unlockDate = new Date(unlocksAt);
    const diffTime = unlockDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderStatus = () => {
    if (isLocked && !isUnlockable) {
      return (
        <div className="flex items-center gap-1.5 text-amber-500">
          <Lock className="h-4 w-4" />
          <span className="text-sm font-medium">
            Unlocks in {daysUntilUnlock()} days
          </span>
        </div>
      );
    } else if (isLocked && isUnlockable) {
      return (
        <div className="flex items-center gap-1.5 text-green-500">
          <Unlock className="h-4 w-4" />
          <span className="text-sm font-medium">Ready to unlock</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1.5 text-blue-500">
          <Unlock className="h-4 w-4" />
          <span className="text-sm font-medium">Unlocked</span>
        </div>
      );
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      <Card className={cn(
        "overflow-hidden rounded-xl border-2 transition-all duration-300",
        isLocked 
          ? isUnlockable 
            ? "border-green-200 hover:border-green-300"
            : "border-amber-200 hover:border-amber-300"
          : "border-blue-200 hover:border-blue-300"
      )}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{title}</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-8 w-8"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
          </div>
          {!expanded && description && (
            <CardDescription className="line-clamp-1">{description}</CardDescription>
          )}
        </CardHeader>
        
        <CardContent className="pb-4">
          {expanded && description && (
            <p className="text-sm text-gray-600 mb-4">{description}</p>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-1.5 text-gray-500">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                Created {format(new Date(createdAt), "MMM d, yyyy")}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 text-gray-500">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                {isLocked ? "Unlocks" : "Unlocked"} {format(new Date(unlocksAt), "MMM d, yyyy")}
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            {renderStatus()}
            
            <div className="flex items-center gap-1.5 text-gray-500">
              <Users className="h-4 w-4" />
              <span className="text-sm">{contributors.length} contributors</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          <Button 
            onClick={onOpen}
            className="w-full"
            disabled={!canOpen}
          >
            {isLocked 
              ? isUnlockable 
                ? "Unlock Now" 
                : `Unlock on ${format(new Date(unlocksAt), "MMM d, yyyy")}`
              : "View Contents"
            }
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
