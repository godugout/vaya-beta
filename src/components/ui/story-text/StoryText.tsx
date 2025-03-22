
import React, { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const storyTextVariants = cva(
  "font-story", 
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      leading: {
        tight: "leading-tight",
        normal: "leading-normal",
        relaxed: "leading-relaxed",
        loose: "leading-loose",
      },
      fontStyle: {
        normal: "font-normal",
        italic: "font-italic",
        quote: "italic pl-4 border-l-4 border-autumn my-4",
      },
      textColor: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        light: "text-gray-200",
      },
      language: {
        english: "font-story",
        gujarati: "font-gujarati gujarati-content",
        hindi: "font-hindi hindi-content",
        sanskrit: "font-sanskrit sanskrit-content",
      },
    },
    defaultVariants: {
      size: "md",
      leading: "relaxed",
      fontStyle: "normal",
      textColor: "default",
      language: "english",
    },
  }
);

export interface StoryTextProps 
  extends React.HTMLAttributes<HTMLParagraphElement>,
    Omit<VariantProps<typeof storyTextVariants>, 'textColor'> {
  as?: React.ElementType;
  textColor?: "default" | "muted" | "light";
}

const StoryText = forwardRef<HTMLParagraphElement, StoryTextProps>(
  ({ className, size, leading, fontStyle, textColor, language, as: Component = "p", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(storyTextVariants({ size, leading, fontStyle, textColor, language }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

StoryText.displayName = "StoryText";

export { StoryText };
