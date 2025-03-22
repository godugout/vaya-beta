
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { storyTextVariants } from "./StoryText";
import { VariantProps } from "class-variance-authority";

export interface StoryQuoteProps 
  extends React.HTMLAttributes<HTMLQuoteElement>,
    VariantProps<typeof storyTextVariants> {
  language?: "english" | "gujarati" | "hindi" | "sanskrit";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  leading?: "tight" | "normal" | "relaxed" | "loose";
  textColor?: "default" | "muted" | "accent" | "subtle";
}

const StoryQuote = forwardRef<HTMLQuoteElement, StoryQuoteProps>(
  ({ className, size = "md", leading = "relaxed", language = "english", textColor = "default", children, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn(
          "italic pl-4 border-l-4 border-autumn my-4",
          storyTextVariants({ size, leading, language, textColor }),
          className
        )}
        {...props}
      >
        {children}
      </blockquote>
    );
  }
);

StoryQuote.displayName = "StoryQuote";

export { StoryQuote };
