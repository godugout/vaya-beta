
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface StoryHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "sm" | "md" | "lg" | "xl";
  language?: "english" | "gujarati" | "hindi";
}

const StoryHeading = forwardRef<HTMLHeadingElement, StoryHeadingProps>(
  ({ className, level = 2, size = "lg", language = "english", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "text-lg",
      md: "text-xl",
      lg: "text-2xl",
      xl: "text-3xl",
    };
    
    const languageClasses = {
      english: "font-story",
      gujarati: "font-gujarati gujarati-content",
      hindi: "font-hindi hindi-content"
    };
    
    // Create the component dynamically with proper typing
    const TagName = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    
    return (
      <TagName
        ref={ref}
        className={cn(
          "font-semibold tracking-tight mb-4",
          sizeClasses[size],
          languageClasses[language],
          className
        )}
        {...props}
      >
        {children}
      </TagName>
    );
  }
);

StoryHeading.displayName = "StoryHeading";

export { StoryHeading };
