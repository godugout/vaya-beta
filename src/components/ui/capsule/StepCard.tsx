import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  iconColor: string;
  numberColor?: string;
  className?: string;
}

export const StepCard = ({ 
  step, 
  title, 
  description, 
  icon: Icon, 
  color, 
  iconColor,
  numberColor = "text-gray-700",
  className 
}: StepCardProps) => {
  const isRevealCard = step === 4;

  return (
    <motion.div 
      className={cn(
        "flex flex-col items-stretch justify-center min-h-[320px] text-left p-8 rounded-2xl transition-all duration-300",
        "font-sans text-foreground shadow-sm hover:shadow-md",
        "border border-border/50 bg-white",
        isRevealCard && "reveal-card",
        className
      )}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-6 pl-4">
        <div className="relative">
          <div className="flex items-center justify-center h-20">
            {isRevealCard ? (
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Icon className="absolute top-0 left-0 w-8 h-8 text-blue-500 animate-sparkle" />
                <Icon className="absolute top-2 right-0 w-5 h-5 text-amber-500 animate-sparkle" style={{ animationDelay: "0.2s" }} />
                <Icon className="absolute bottom-0 left-2 w-6 h-6 text-emerald-500 animate-sparkle" style={{ animationDelay: "0.4s" }} />
              </div>
            ) : (
              <Icon className={cn(
                "w-14 h-14",
                iconColor
              )} />
            )}
          </div>
          <div className={cn(
            "absolute -top-2 -right-2 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-sm font-outfit",
            numberColor
          )}>
            {step}
          </div>
        </div>
        <div className="flex flex-col justify-center flex-1">
          <h3 className="text-xl font-bold text-vaya-gray-900 font-outfit mb-3">{title}</h3>
          <p className="text-sm text-vaya-gray-600 font-inter">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};