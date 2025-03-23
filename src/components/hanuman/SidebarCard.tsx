
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarCardProps {
  title: string;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

const SidebarCard = ({
  title,
  icon,
  defaultExpanded = true,
  className,
  headerClassName,
  contentClassName,
  children
}: SidebarCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card 
      className={cn(
        "mb-4 border-hanuman-primary/10 shadow-sm overflow-hidden",
        className
      )}
    >
      <CardHeader className={cn("p-3 flex flex-row items-center justify-between", headerClassName)}>
        <div className="flex items-center gap-2 text-sm font-medium">
          {icon && <div className="text-hanuman-primary">{icon}</div>}
          <span>{title}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={toggleExpand}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className={cn("p-3 pt-0", contentClassName)}>
              {children}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default SidebarCard;
