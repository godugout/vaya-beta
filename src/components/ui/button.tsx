
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-transparent text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-greystone-green text-white hover:bg-greystone-green-90",
        destructive: "bg-greystone-ui-error text-white hover:bg-red-600",
        outline: "border border-greystone-green-30 bg-transparent text-greystone-green hover:bg-greystone-green-10",
        secondary: "bg-greystone-sandstone text-greystone-green hover:bg-greystone-sandstone-dark",
        ghost: "hover:bg-greystone-ui-gray text-greystone-green",
        link: "text-greystone-green underline-offset-4 hover:underline p-0 h-auto",
        // Feature-specific variants
        stories: "bg-lovable-magenta text-white hover:bg-lovable-magenta-bright",
        memories: "bg-lovable-teal text-white hover:bg-lovable-teal-bright", 
        capsules: "bg-lovable-purple text-white hover:bg-lovable-purple-bright",
        narra: "bg-lovable-blue text-white hover:bg-lovable-blue-bright",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-sm",
        lg: "h-14 rounded-xl px-8 text-lg",
        icon: "h-10 w-10",
        pill: "h-10 rounded-full px-5",
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
