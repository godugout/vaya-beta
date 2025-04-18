
import React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
  noPadding?: boolean;
}

export function SectionContainer({
  children,
  className,
  id,
  maxWidth = "7xl",
  noPadding = false,
}: SectionContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <section
      id={id}
      className={cn(
        "w-full mx-auto",
        !noPadding && "px-4 sm:px-6 lg:px-8 py-6 md:py-10",
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </section>
  );
}
