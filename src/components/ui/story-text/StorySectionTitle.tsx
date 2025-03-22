
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

export const storySectionTitleVariants = cva(
  "font-medium tracking-tight mb-3", 
  {
    variants: {
      language: {
        english: "font-story",
        gujarati: "font-gujarati gujarati-content",
        hindi: "font-hindi hindi-content",
        sanskrit: "font-sanskrit sanskrit-content"
      },
      size: {
        sm: "text-base",
        md: "text-xl",
        lg: "text-2xl",
        xl: "text-3xl"
      },
      textColor: {
        default: "text-gray-900 dark:text-gray-100",
        muted: "text-gray-600 dark:text-gray-400",
        accent: "text-vaya-coral dark:text-vaya-coral-light",
        subtle: "text-gray-500 dark:text-gray-500"
      }
    },
    defaultVariants: {
      language: "english",
      size: "md",
      textColor: "default"
    }
  }
);

export interface StorySectionTitleProps 
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof storySectionTitleVariants> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  language?: "english" | "gujarati" | "hindi" | "sanskrit";
  size?: "sm" | "md" | "lg" | "xl";
  textColor?: "default" | "muted" | "accent" | "subtle";
}

const StorySectionTitle = forwardRef<HTMLHeadingElement, StorySectionTitleProps>(
  ({ className, level = 3, size = "md", language = "english", textColor = "default", children, ...props }, ref) => {
    // Create the component dynamically with proper typing
    const TagName = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    
    return (
      <TagName
        ref={ref}
        className={cn(storySectionTitleVariants({ size, language, textColor }), className)}
        {...props}
      >
        {children}
      </TagName>
    );
  }
);

StorySectionTitle.displayName = "StorySectionTitle";

export { StorySectionTitle };
