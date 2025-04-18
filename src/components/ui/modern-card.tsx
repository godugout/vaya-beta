
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "relative overflow-hidden border rounded-xl shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        outline: "bg-transparent border border-border",
        filled: "bg-background/90 backdrop-blur-sm",
        accent: "border-l-4 border-l-autumn",
        modern: "border-0 bg-gradient-to-br from-card to-background/80",
        minimal: "border-0 shadow-none bg-transparent",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
      },
      radius: {
        default: "rounded-xl",
        none: "rounded-none",
        full: "rounded-full",
        sm: "rounded-lg",
        lg: "rounded-2xl",
        xl: "rounded-3xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
  withHover?: boolean;
  withPattern?: boolean;
}

const ModernCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, radius, withHover, withPattern, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, size, radius }),
          withHover && "hover:shadow-md hover:-translate-y-1",
          withPattern && "bg-pattern-dots dark:bg-pattern-dots",
          className
        )}
        {...props}
      />
    );
  }
);
ModernCard.displayName = "ModernCard";

const ModernCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
ModernCardHeader.displayName = "ModernCardHeader";

const ModernCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
ModernCardTitle.displayName = "ModernCardTitle";

const ModernCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ModernCardDescription.displayName = "ModernCardDescription";

const ModernCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
ModernCardContent.displayName = "ModernCardContent";

const ModernCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
ModernCardFooter.displayName = "ModernCardFooter";

export {
  ModernCard,
  ModernCardHeader,
  ModernCardFooter,
  ModernCardTitle,
  ModernCardDescription,
  ModernCardContent,
};
