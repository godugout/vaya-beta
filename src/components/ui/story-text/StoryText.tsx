
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

export const storyTextVariants = cva(
  "text-gray-900 dark:text-gray-100", 
  {
    variants: {
      language: {
        english: "font-story",
        gujarati: "font-gujarati gujarati-content",
        hindi: "font-hindi hindi-content",
        sanskrit: "font-sanskrit sanskrit-content"
      },
      size: {
        xs: "text-sm",
        sm: "text-base",
        md: "text-lg",
        lg: "text-xl",
        xl: "text-2xl"
      },
      leading: {
        tight: "leading-tight",
        normal: "leading-normal",
        relaxed: "leading-relaxed",
        loose: "leading-loose"
      }
    },
    defaultVariants: {
      language: "english",
      size: "md",
      leading: "relaxed"
    }
  }
);

export interface StoryTextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof storyTextVariants> {
  language?: "english" | "gujarati" | "hindi" | "sanskrit";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  leading?: "tight" | "normal" | "relaxed" | "loose";
}

const StoryText = forwardRef<HTMLParagraphElement, StoryTextProps>(
  ({ className, size = "md", leading = "relaxed", language = "english", children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(storyTextVariants({ size, leading, language }), className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

StoryText.displayName = "StoryText";

export { StoryText };
