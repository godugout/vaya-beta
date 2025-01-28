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
  className?: string;
}

export const StepCard = ({ 
  step, 
  title, 
  description, 
  icon: Icon, 
  color, 
  iconColor,
  className 
}: StepCardProps) => {
  return (
    <motion.div 
      className={cn(
        "flex flex-col items-center text-center p-6 rounded-3xl transition-all duration-300 hover:shadow-lg",
        "font-sans text-foreground tab-size-4",
        "border border-border/50",
        className
      )}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative mb-4">
        <div className={`w-16 h-16 md:w-20 md:h-20 ${color} rounded-full flex items-center justify-center`}>
          <Icon className={`w-8 h-8 md:w-10 md:h-10 ${iconColor}`} />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-vaya-capsules rounded-full flex items-center justify-center text-white font-bold">
          {step}
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-bold text-vaya-gray-900 font-outfit mb-2">{title}</h3>
      <p className="text-sm md:text-base text-vaya-gray-600">{description}</p>
    </motion.div>
  );
};