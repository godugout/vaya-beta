
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useSoftTheme } from "@/contexts/SoftThemeContext"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border border-transparent text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
        destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-500 dark:text-white",
        outline: "border border-black bg-transparent text-black hover:bg-black/5 dark:border-white dark:text-white dark:hover:bg-white/10",
        secondary: "bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
        ghost: "hover:bg-gray-100 text-black dark:text-white dark:hover:bg-white/10",
        link: "text-black dark:text-white underline-offset-4 hover:underline p-0 h-auto",
        
        // New soft UI variants
        soft: "bg-[var(--meta-blue)] text-white hover:bg-[var(--meta-blue)]/90",
        "soft-outline": "border border-[var(--soft-border)] bg-transparent text-[var(--soft-text-primary)] hover:bg-[var(--soft-hover)]",
        "soft-secondary": "bg-[var(--soft-bg-secondary)] text-[var(--soft-text-primary)] hover:bg-[var(--soft-hover)]",
        "soft-ghost": "hover:bg-[var(--soft-hover)] text-[var(--soft-text-primary)]",
        "soft-destructive": "bg-red-500 text-white hover:bg-red-600",
        
        // Forest Stream variants
        forest: "bg-forest text-white hover:bg-forest/90 dark:bg-forest dark:text-white dark:hover:bg-forest/80",
        water: "bg-water text-white hover:bg-water/90 dark:bg-water dark:text-white dark:hover:bg-water/80",
        leaf: "bg-leaf text-black hover:bg-leaf/90 dark:bg-leaf dark:text-black dark:hover:bg-leaf/80",
        autumn: "bg-autumn text-black hover:bg-autumn/90 dark:bg-autumn dark:text-black dark:hover:bg-autumn/80",
        mountain: "bg-mountain text-white hover:bg-mountain/90 dark:bg-mountain dark:text-white dark:hover:bg-mountain/80",
        
        // Feature-specific variants
        stories: "bg-forest text-white hover:bg-forest/90 dark:bg-forest dark:text-white dark:hover:bg-forest/80",
        memories: "bg-water text-white hover:bg-water/90 dark:bg-water dark:text-white dark:hover:bg-water/80", 
        capsules: "bg-autumn text-black hover:bg-autumn/90 dark:bg-autumn dark:text-black dark:hover:bg-autumn/80",
        narra: "bg-leaf text-black hover:bg-leaf/90 dark:bg-leaf dark:text-black dark:hover:bg-leaf/80",
        
        // Additional accent variants
        accent: "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
        coral: "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
        purple: "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
        yellow: "bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
        orange: "bg-autumn text-black hover:bg-autumn/90 dark:bg-autumn dark:text-black dark:hover:bg-autumn/80",
        green: "bg-leaf text-black hover:bg-leaf/90 dark:bg-leaf dark:text-black dark:hover:bg-leaf/80",
        blue: "bg-water text-white hover:bg-water/90 dark:bg-water dark:text-white dark:hover:bg-water/80",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-10 text-lg",
        xl: "h-16 px-12 text-xl",
        icon: "h-10 w-10",
        pill: "h-10 rounded-full px-5",
        "pill-lg": "h-14 rounded-full px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const { softTheme } = useSoftTheme();
    const isSoft = softTheme === 'soft';
    
    // Apply soft variants when soft theme is active
    let softVariant = variant;
    if (isSoft && !variant?.toString().startsWith('soft')) {
      if (variant === 'default') softVariant = 'soft';
      if (variant === 'outline') softVariant = 'soft-outline';
      if (variant === 'secondary') softVariant = 'soft-secondary';
      if (variant === 'ghost') softVariant = 'soft-ghost';
      if (variant === 'destructive') softVariant = 'soft-destructive';
    }
    
    // Apply soft sizing and rounded corners
    const softSize = isSoft && size !== 'icon' && size !== 'pill' && size !== 'pill-lg' 
      ? 'pill' 
      : size;
    
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant: softVariant, size: softSize, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
