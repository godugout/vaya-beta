
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-transparent text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
        destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-500 dark:text-white",
        outline: "border border-black bg-transparent text-black hover:bg-black/5 dark:border-white dark:text-white dark:hover:bg-white/10",
        secondary: "bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
        ghost: "hover:bg-gray-100 text-black dark:text-white dark:hover:bg-white/10",
        link: "text-black dark:text-white underline-offset-4 hover:underline p-0 h-auto",
        
        // Sacred Color Variants
        forest: "bg-forest text-white hover:bg-forest/90 dark:bg-forest dark:text-white dark:hover:bg-forest/80",
        water: "bg-water text-white hover:bg-water/90 dark:bg-water dark:text-white dark:hover:bg-water/80",
        leaf: "bg-leaf text-black hover:bg-leaf/90 dark:bg-leaf dark:text-black dark:hover:bg-leaf/80",
        autumn: "bg-autumn text-white hover:bg-autumn/90 dark:bg-autumn dark:text-white dark:hover:bg-autumn/80",
        mountain: "bg-mountain text-white hover:bg-mountain/90 dark:bg-mountain dark:text-white dark:hover:bg-mountain/80",
        
        // Hanuman Edition Sacred Colors
        hanuman: "bg-autumn text-white hover:bg-autumn/90 dark:bg-autumn dark:text-white dark:hover:bg-autumn/80",
        "sacred-teal": "bg-water text-white hover:bg-water/90 dark:bg-water dark:text-white dark:hover:bg-water/80",
        "sunshine": "bg-ui-yellow text-black hover:bg-ui-yellow/90 dark:bg-ui-yellow dark:text-black dark:hover:bg-ui-yellow/80",
        "kelly": "bg-leaf text-black hover:bg-leaf/90 dark:bg-leaf dark:text-black dark:hover:bg-leaf/80",
        
        // Modern variants
        modern: "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90",
        "modern-outline": "border-2 border-black bg-transparent text-black hover:bg-black/5 dark:border-white dark:text-white dark:hover:bg-white/10",
        "modern-secondary": "bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
        
        // Feature-specific variants
        stories: "bg-forest text-white hover:bg-forest/90 dark:bg-forest dark:text-white dark:hover:bg-forest/80",
        memories: "bg-water text-white hover:bg-water/90 dark:bg-water dark:text-white dark:hover:bg-water/80", 
        capsules: "bg-autumn text-white hover:bg-autumn/90 dark:bg-autumn dark:text-white dark:hover:bg-autumn/80",
        narra: "bg-leaf text-black hover:bg-leaf/90 dark:bg-leaf dark:text-black dark:hover:bg-leaf/80",
        timeline: "bg-ui-yellow text-black hover:bg-ui-yellow/90 dark:bg-ui-yellow dark:text-black dark:hover:bg-ui-yellow/80",
        
        // Additional accent variants
        accent: "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
        coral: "bg-autumn text-white hover:bg-autumn/90 dark:bg-autumn dark:text-white dark:hover:bg-autumn/80",
        purple: "bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-500 dark:text-white dark:hover:bg-purple-600",
        yellow: "bg-ui-yellow text-black hover:bg-ui-yellow/90 dark:bg-ui-yellow dark:text-black dark:hover:bg-ui-yellow/80",
        orange: "bg-autumn text-white hover:bg-autumn/90 dark:bg-autumn dark:text-white dark:hover:bg-autumn/80",
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
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
