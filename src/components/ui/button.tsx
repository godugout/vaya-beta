
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-transparent text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-vaya-brand-primary text-white hover:bg-vaya-brand-primary/90 shadow-sm hover:shadow-md",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md",
        outline: "border border-vaya-brand-primary/30 bg-transparent text-vaya-brand-primary hover:bg-vaya-brand-primary/10",
        secondary: "bg-vaya-brand-secondary text-white hover:bg-vaya-brand-secondary/90 shadow-sm hover:shadow-md",
        ghost: "hover:bg-vaya-gray-100 text-vaya-brand-primary",
        link: "text-vaya-brand-primary underline-offset-4 hover:underline p-0 h-auto",
        
        // Feature-specific variants
        stories: "bg-vaya-stories text-white hover:bg-vaya-stories/90 shadow-sm hover:shadow-md",
        memories: "bg-vaya-memories text-white hover:bg-vaya-memories/90 shadow-sm hover:shadow-md", 
        capsules: "bg-vaya-capsules text-white hover:bg-vaya-capsules/90 shadow-sm hover:shadow-md",
        narra: "bg-vaya-narra text-white hover:bg-vaya-narra/90 shadow-sm hover:shadow-md",
        
        // Accent color variants
        accent: "bg-vaya-accent-turquoise text-white hover:bg-vaya-accent-turquoise/90 shadow-sm hover:shadow-md",
        coral: "bg-vaya-accent-coral text-white hover:bg-vaya-accent-coral/90 shadow-sm hover:shadow-md",
        purple: "bg-vaya-brand-primary text-white hover:bg-vaya-brand-primary/90 shadow-sm hover:shadow-md",
        yellow: "bg-vaya-accent-yellow text-vaya-text-primary hover:bg-vaya-accent-yellow/90 shadow-sm hover:shadow-md",
        orange: "bg-vaya-accent-orange text-white hover:bg-vaya-accent-orange/90 shadow-sm hover:shadow-md",
        green: "bg-vaya-accent-green text-vaya-text-primary hover:bg-vaya-accent-green/90 shadow-sm hover:shadow-md",
        blue: "bg-vaya-accent-blue text-white hover:bg-vaya-accent-blue/90 shadow-sm hover:shadow-md",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-sm",
        lg: "h-14 rounded-xl px-8 text-lg",
        xl: "h-16 rounded-2xl px-10 text-xl",
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
