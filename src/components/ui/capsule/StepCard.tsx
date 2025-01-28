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
        "flex flex-col items-center text-center p-8 rounded-3xl transition-all duration-300",
        "font-sans text-foreground shadow-sm hover:shadow-md",
        "border border-border/50 bg-white",
        className
      )}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative mb-6">
        <div className={`w-20 h-20 ${color} rounded-full flex items-center justify-center`}>
          <Icon className={`w-10 h-10 ${iconColor}`} />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-vaya-capsules rounded-full flex items-center justify-center text-white font-bold text-sm">
          {step}
        </div>
      </div>
      <h3 className="text-xl font-bold text-vaya-gray-900 font-outfit mb-3">{title}</h3>
      <p className="text-sm text-vaya-gray-600 font-inter">{description}</p>
    </motion.div>
  );
};