
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-transparent text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md",
        outline: "border border-black/30 bg-transparent text-black hover:bg-black/10",
        secondary: "bg-gray-200 text-black hover:bg-gray-300 shadow-sm hover:shadow-md",
        ghost: "hover:bg-gray-100 text-black",
        link: "text-black underline-offset-4 hover:underline p-0 h-auto",
        
        // Feature-specific variants
        stories: "bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md",
        memories: "bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md", 
        capsules: "bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md",
        narra: "bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md",
        
        // Accent color variants
        accent: "bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md",
        coral: "bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md",
        purple: "bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md",
        yellow: "bg-gray-100 text-black hover:bg-gray-200 shadow-sm hover:shadow-md",
        orange: "bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md",
        green: "bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md",
        blue: "bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md",
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
