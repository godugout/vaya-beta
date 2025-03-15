
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type FABVariant = 
  | "primary" 
  | "secondary" 
  | "tertiary" 
  | "outline";

type FABSize = "md" | "lg";

export interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: FABVariant;
  size?: FABSize;
  icon: React.ReactNode;
  isLoading?: boolean;
  extended?: boolean;
  label?: string;
}

export const FloatingActionButton = forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "lg",
      icon,
      isLoading = false,
      extended = false,
      label,
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
    };

    // Size styles
    const sizeStyles = {
      md: extended ? "h-14 px-6" : "h-14 w-14",
      lg: extended ? "h-16 px-8" : "h-16 w-16",
    };
    
    // Icon sizes
    const iconSizes = {
      md: "h-6 w-6",
      lg: "h-7 w-7",
    };

    // Animation props for Framer Motion
    const motionProps = {
      whileHover: { scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)" },
      whileTap: { scale: 0.98 }
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          "fixed shadow-lg rounded-full inline-flex items-center justify-center z-overlay",
          variantStyles[variant],
          sizeStyles[size],
          extended && label ? "gap-2" : "",
          "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vaya-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          "bottom-6 right-6",
          className
        )}
        {...motionProps}
        {...props}
      >
        {isLoading ? (
          <Loader2 className={cn("animate-spin", iconSizes[size])} />
        ) : (
          <>
            <span className={iconSizes[size]}>{icon}</span>
            {extended && label && (
              <span className="font-medium text-base">{label}</span>
            )}
          </>
        )}
      </motion.button>
    );
  }
);

FloatingActionButton.displayName = "FloatingActionButton";
