
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { storyTextVariants } from "./StoryText";

export interface StoryCitationProps extends React.HTMLAttributes<HTMLElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const StoryCitation = forwardRef<HTMLElement, StoryCitationProps>(
  ({ className, size = "xs", children, ...props }, ref) => {
    return (
      <cite
        ref={ref}
        className={cn(
          "text-muted-foreground italic", 
          storyTextVariants({ size }),
          className
        )}
        {...props}
      >
        {children}
      </cite>
    );
  }
);

StoryCitation.displayName = "StoryCitation";

export { StoryCitation };
