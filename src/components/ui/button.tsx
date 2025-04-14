
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-gray-800",
        outline: "border border-black bg-white hover:bg-gray-100 text-black",
        secondary: "bg-gray-200 text-black hover:bg-gray-300",
        ghost: "hover:bg-gray-100 text-black",
        link: "text-black underline-offset-4 hover:underline",
        // Add additional variants that are being used
        destructive: "bg-red-500 text-white hover:bg-red-600",
        purple: "bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white",
        autumn: "bg-amber-500 text-white hover:bg-amber-600",
        water: "bg-blue-500 text-white hover:bg-blue-600",
        forest: "bg-green-600 text-white hover:bg-green-700",
        capsules: "bg-purple-500 text-white hover:bg-purple-600",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
