
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type IconButtonVariant = 
  | "primary" 
  | "secondary" 
  | "tertiary" 
  | "outline" 
  | "ghost" 
  | "destructive";

type IconButtonSize = "sm" | "md" | "lg" | "xl";

type IconButtonShape = "circle" | "square" | "rounded";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  shape?: IconButtonShape;
  icon: React.ReactNode;
  isLoading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      shape = "circle",
      icon,
      isLoading = false,
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
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-14 w-14",
    };
    
    // Shape styles
    const shapeStyles = {
      circle: "rounded-full",
      square: "rounded-md",
      rounded: "rounded-xl",
    };
    
    // Icon sizes
    const iconSizes = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-7 w-7",
    };

    // Animation props for Framer Motion
    const motionProps = { whileTap: { scale: 0.95 } };

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vaya-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          shapeStyles[shape],
          "min-w-[44px] min-h-[44px]",
          className
        )}
        {...motionProps}
        {...props}
      >
        {isLoading ? (
          <Loader2 className={cn("animate-spin", iconSizes[size])} />
        ) : (
          <span className={iconSizes[size]}>{icon}</span>
        )}
      </motion.button>
    );
  }
);

IconButton.displayName = "IconButton";
