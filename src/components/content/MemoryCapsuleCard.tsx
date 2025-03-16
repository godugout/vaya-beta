
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Lock, Unlock, Users, ChevronDown, ChevronUp, Image, FileText, Mic, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { MemoryCapsule } from "@/components/capsule/types/capsuleTypes";

interface MemoryCapsuleCardProps {
  capsule: MemoryCapsule;
  onOpen?: (id: string) => void;
  className?: string;
  compact?: boolean;
}

export const MemoryCapsuleCard = ({
  capsule,
  onOpen,
  className,
  compact = false,
}: MemoryCapsuleCardProps) => {
  const [expanded, setExpanded] = useState(!compact);
  
  const { 
    id, 
    title, 
    description, 
    createdAt, 
    revealDate, 
    status, 
    contributors, 
    contentType, 
    contentCount 
  } = capsule;
  
  const isUnlockable = new Date(revealDate) <= new Date();
  const canOpen = isUnlockable && status === "unlocked";

  const daysUntilUnlock = () => {
    const now = new Date();
    const unlockDate = new Date(revealDate);
    const diffTime = unlockDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getContentTypeIcon = () => {
    switch(contentType) {
      case "text":
        return <FileText className="h-4 w-4" />;
      case "image":
        return <Image className="h-4 w-4" />;
      case "audio":
        return <Mic className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const renderStatus = () => {
    if (status === "locked" && !isUnlockable) {
      return (
        <div className="flex items-center gap-1.5 text-amber-500">
          <Lock className="h-4 w-4" />
          <span className="text-sm font-medium">
            Unlocks in {daysUntilUnlock()} days
          </span>
        </div>
      );
    } else if (status === "locked" && isUnlockable) {
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

  const handleOpen = () => {
    if (onOpen && (canOpen || status === "unlocked")) {
      onOpen(id);
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
        status === "locked" 
          ? isUnlockable 
            ? "border-green-200 hover:border-green-300"
            : "border-amber-200 hover:border-amber-300"
          : "border-blue-200 hover:border-blue-300",
        compact ? "h-full" : ""
      )}>
        <CardHeader className={cn("pb-2", compact ? "p-4" : "")}>
          <div className="flex justify-between items-start">
            <CardTitle className={cn("text-xl", compact ? "text-lg" : "")}>{title}</CardTitle>
            {!compact && (
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
            )}
          </div>
          {(!expanded || compact) && description && (
            <CardDescription className="line-clamp-1">{description}</CardDescription>
          )}
        </CardHeader>
        
        <CardContent className={cn("pb-4", compact ? "p-4 pt-0" : "")}>
          {expanded && !compact && description && (
            <p className="text-sm text-gray-600 mb-4">{description}</p>
          )}
          
          <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-2")}>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                Created {format(new Date(createdAt), "MMM d, yyyy")}
              </span>
            </div>
            
            {!compact && (
              <div className="flex items-center gap-1.5 text-gray-500">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {status === "locked" ? "Unlocks" : "Unlocked"} {format(new Date(revealDate), "MMM d, yyyy")}
                </span>
              </div>
            )}
          </div>
          
          <div className={cn("mt-4 flex justify-between items-center", compact ? "flex-col items-start gap-2" : "")}>
            {renderStatus()}
            
            <div className="flex items-center gap-1.5 text-gray-500">
              <Users className="h-4 w-4" />
              <span className="text-sm">{contributors.length} contributors</span>
            </div>
          </div>

          {compact && (
            <div className="mt-3 flex items-center gap-2">
              {getContentTypeIcon()}
              <span className="text-sm font-medium capitalize">{contentType}</span>
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                {contentCount} items
              </span>
            </div>
          )}
        </CardContent>
        
        <CardFooter className={cn("pt-0", compact ? "p-4" : "")}>
          <Button 
            onClick={handleOpen}
            className="w-full"
            disabled={!(canOpen || status === "unlocked")}
          >
            {status === "locked" 
              ? isUnlockable 
                ? "Unlock Now" 
                : `Unlock on ${format(new Date(revealDate), "MMM d, yyyy")}`
              : "View Contents"
            }
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
