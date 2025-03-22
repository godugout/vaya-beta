
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { StoryHeadingProps } from "./StoryHeading";

const StorySectionTitle = forwardRef<HTMLHeadingElement, StoryHeadingProps>(
  ({ className, level = 3, size = "md", language = "english", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "text-base",
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
          "font-medium tracking-tight mb-3",
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

StorySectionTitle.displayName = "StorySectionTitle";

export { StorySectionTitle };
