
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

const StoryDivider = forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn("my-6 border-t border-gray-200 dark:border-gray-700", className)}
        {...props}
      />
    );
  }
);

StoryDivider.displayName = "StoryDivider";

export { StoryDivider };
