
import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-xl overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-dark-background-surface border border-gray-200 dark:border-gray-800",
        outline: "border-2 border-vaya-coral bg-white dark:bg-dark-background-surface",
        ghost: "bg-transparent dark:bg-transparent",
        filled: "bg-gray-100 dark:bg-gray-800",
        coral: "bg-vaya-coral-light/10 border border-vaya-coral-light",
        purple: "bg-vaya-purple-light/10 border border-vaya-purple-light",
        green: "bg-vaya-green-light/10 border border-vaya-green-light",
      },
      elevation: {
        0: "",
        1: "shadow-elevation-1 dark:shadow-none",
        2: "shadow-elevation-2 dark:shadow-none",
        3: "shadow-elevation-3 dark:shadow-none",
        4: "shadow-elevation-4 dark:shadow-none",
        5: "shadow-elevation-5 dark:shadow-none",
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      }
    },
    defaultVariants: {
      variant: "default",
      elevation: 2,
      padding: "md",
    },
  }
);

export interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
}

export const VayaCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, elevation, padding, as: Component = "div", children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(cardVariants({ variant, elevation, padding }), className)}
      {...props}
    >
      {children}
    </Component>
  )
);

VayaCard.displayName = "VayaCard";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 px-6 pt-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
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
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 pt-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center px-6 pt-4 pb-6", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
