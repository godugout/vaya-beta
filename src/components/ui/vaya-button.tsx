
import React, { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-vaya-coral text-white hover:bg-vaya-coral-dark",
        secondary: "bg-vaya-purple text-white hover:bg-vaya-purple-dark",
        tertiary: "bg-vaya-green text-white hover:bg-vaya-green-dark",
        outline: "border-2 border-vaya-coral text-vaya-coral hover:bg-vaya-coral/10",
        ghost: "hover:bg-vaya-coral/10 text-vaya-coral",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        subtle: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        link: "text-vaya-coral underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-8 px-2 text-xs rounded-lg",
        sm: "h-9 px-3 text-sm rounded-lg",
        md: "h-11 px-4 text-base rounded-xl",
        lg: "h-12 px-6 text-base rounded-xl",
        xl: "h-14 px-8 text-lg rounded-xl",
        icon: "h-11 w-11 rounded-full",
      },
      elevation: {
        none: "",
        low: "shadow-elevation-1",
        medium: "shadow-elevation-2",
        high: "shadow-elevation-3",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      elevation: "none",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const VayaButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    children, 
    variant, 
    size, 
    elevation,
    isLoading,
    leftIcon,
    rightIcon,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, elevation, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

VayaButton.displayName = "VayaButton";

export { VayaButton, buttonVariants };
