
import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  background?: "default" | "gradient" | "forest" | "water" | "autumn" | "leaf";
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  background = "default",
  className,
}: PageHeaderProps) {
  const backgroundStyles = {
    default: "bg-background",
    gradient: "bg-gradient-to-b from-background to-muted/50",
    forest: "bg-gradient-to-b from-forest/10 to-background",
    water: "bg-gradient-to-b from-water/10 to-background",
    autumn: "bg-gradient-to-b from-autumn/10 to-background",
    leaf: "bg-gradient-to-b from-leaf/10 to-background",
  };

  return (
    <div className={cn(
      "w-full pt-16 pb-8 px-4 sm:px-6 lg:px-8", 
      backgroundStyles[background],
      className
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-foreground">{title}</h1>
            {description && (
              <p className="text-muted-foreground max-w-2xl">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 mt-4 sm:mt-0">{actions}</div>
          )}
        </div>
      </div>
    </div>
  );
}
