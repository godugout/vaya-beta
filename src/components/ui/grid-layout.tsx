
import React from "react";
import { cn } from "@/lib/utils";

interface GridProps {
  children: React.ReactNode;
  cols?: number;
  gap?: number | string;
  className?: string;
  responsive?: boolean;
}

export const Grid = ({
  children,
  cols = 12,
  gap = 4,
  className,
  responsive,
}: GridProps) => {
  const gapValue = typeof gap === 'number' ? `${gap * 0.25}rem` : gap;
  
  const gridClassName = cn("grid", className, {
    "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4": responsive,
  });
  
  return (
    <div
      className={gridClassName}
      style={{
        gridTemplateColumns: responsive ? undefined : `repeat(${cols}, minmax(0, 1fr))`,
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

// Add Container component that was being imported
export const Container = ({
  children,
  maxWidth = "xl",
  className,
}: {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
}) => {
  const maxWidthClass = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    "full": "max-w-full",
  }[maxWidth];

  return (
    <div className={cn("w-full px-4 mx-auto", maxWidthClass, className)}>
      {children}
    </div>
  );
};

// Add FlexBox component that was being imported
export const FlexBox = ({
  children,
  direction = "row",
  align = "start",
  justify = "start",
  gap = 0,
  className,
}: {
  children: React.ReactNode;
  direction?: "row" | "col";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  gap?: number;
  className?: string;
}) => {
  const directionClass = direction === "col" ? "flex-col" : "flex-row";
  const alignClass = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  }[align];
  
  const justifyClass = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  }[justify];
  
  const gapClass = gap ? `gap-${gap}` : "";
  
  return (
    <div className={cn("flex", directionClass, alignClass, justifyClass, gapClass, className)}>
      {children}
    </div>
  );
};
