
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-input bg-black/5 px-3 py-2 text-base shadow-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-1 focus-visible:shadow-[0_0_15px_rgba(139,92,246,0.3)] disabled:cursor-not-allowed disabled:opacity-50 transition-shadow duration-200 md:text-sm backdrop-blur-sm bg-purple-900/10 border-purple-500/20",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
