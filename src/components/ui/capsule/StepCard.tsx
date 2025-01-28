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
        "flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-300",
        "font-sans text-foreground shadow-sm hover:shadow-md",
        "border border-border/50 bg-white",
        isRevealCard && "reveal-card",
        className
      )}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative mb-6">
        <div 
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center",
            color,
            isRevealCard && "animate-glow"
          )}
        >
          <Icon className={cn(
            "w-10 h-10",
            iconColor,
            isRevealCard && "animate-sparkle"
          )} />
          {isRevealCard && (
            <div className="absolute inset-0 animate-capsule-rotate">
              <div className="capsule-confetti" />
            </div>
          )}
        </div>
        <div className={cn(
          "absolute -top-2 -right-2 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-sm font-outfit",
          numberColor
        )}>
          {step}
        </div>
      </div>
      <h3 className="text-xl font-bold text-vaya-gray-900 font-outfit mb-3">{title}</h3>
      <p className="text-sm text-vaya-gray-600 font-inter">{description}</p>
    </motion.div>
  );
};