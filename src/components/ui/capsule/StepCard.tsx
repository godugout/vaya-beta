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
        "flex flex-col items-center justify-start min-h-[320px] text-center p-8 rounded-2xl transition-all duration-300",
        "font-sans text-foreground shadow-sm hover:shadow-md",
        "border border-border/50 bg-white",
        className
      )}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative mb-6">
        <div className="flex items-center justify-center h-24">
          {isRevealCard ? (
            <div className="relative w-16 h-16 flex items-center justify-center">
              <Icon className="absolute top-0 left-0 w-10 h-10 text-blue-500 animate-pulse" />
              <Icon className="absolute top-2 right-0 w-8 h-8 text-amber-500 animate-pulse" style={{ animationDelay: "0.3s" }} />
              <Icon className="absolute bottom-0 left-2 w-9 h-9 text-emerald-500 animate-pulse" style={{ animationDelay: "0.6s" }} />
            </div>
          ) : (
            <Icon className={cn(
              "w-16 h-16",
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

      <div className="flex flex-col items-center flex-1">
        <h3 className="text-xl font-bold text-vaya-gray-900 font-outfit mb-3">{title}</h3>
        <p className="text-sm text-vaya-gray-600 font-inter">{description}</p>
      </div>
    </motion.div>
  );
};