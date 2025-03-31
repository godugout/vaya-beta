
import React from "react";
import { cn } from "@/lib/utils";

interface GridProps {
  children: React.ReactNode;
  cols?: number;
  gap?: number | string;
  className?: string;
}

export const Grid = ({
  children,
  cols = 12,
  gap = 4,
  className,
}: GridProps) => {
  const gapValue = typeof gap === 'number' ? `${gap * 0.25}rem` : gap;
  
  return (
    <div
      className={cn("grid", className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: gapValue,
      }}
    >
      {children}
    </div>
  );
};

interface GridItemProps {
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
}

export const GridItem = ({
  children,
  colSpan = 1,
  rowSpan = 1,
  className,
}: GridItemProps) => {
  return (
    <div
      className={cn("grid-item", className)}
      style={{
        gridColumn: `span ${colSpan} / span ${colSpan}`,
        gridRow: `span ${rowSpan} / span ${rowSpan}`,
      }}
    >
      {children}
    </div>
  );
};
