
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { storyTextVariants } from "./StoryText";

export interface StoryQuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  language?: "english" | "gujarati" | "hindi";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  leading?: "tight" | "normal" | "relaxed" | "loose";
}

const StoryQuote = forwardRef<HTMLQuoteElement, StoryQuoteProps>(
  ({ className, size = "md", leading = "relaxed", language = "english", children, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn(
          "italic pl-4 border-l-4 border-autumn my-4",
          storyTextVariants({ size, leading, language }),
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
