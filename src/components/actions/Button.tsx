
import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "tertiary" 
  | "outline" 
  | "ghost" 
  | "destructive";

type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps 
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<"button">> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  animateOnClick?: boolean;
}

export const VayaButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      animateOnClick = true,
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variantStyles = {
      primary: "bg-vaya-primary hover:bg-vaya-primary/90 text-white",
      secondary: "bg-vaya-secondary hover:bg-vaya-secondary/90 text-white",
      tertiary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
      outline: "border-2 border-vaya-primary text-vaya-primary bg-transparent hover:bg-vaya-primary/10",
      ghost: "text-vaya-primary hover:bg-vaya-primary/10 bg-transparent",
      destructive: "bg-red-500 hover:bg-red-600 text-white",
    };

    // Size styles
    const sizeStyles = {
      sm: "h-9 px-3 text-sm rounded-lg",
      md: "h-11 px-4 text-base rounded-xl",
      lg: "h-12 px-6 text-base rounded-xl",
      xl: "h-14 px-8 text-lg rounded-xl",
    };

    // Animation props for Framer Motion
    const motionProps: HTMLMotionProps<"button"> = animateOnClick 
      ? { whileTap: { scale: 0.97 } } 
      : {};

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vaya-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          "min-w-[44px] min-h-[44px]",
          className
        )}
        {...motionProps}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

VayaButton.displayName = "VayaButton";
