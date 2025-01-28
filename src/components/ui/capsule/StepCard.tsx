import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const StepCard = ({ step, title, description, icon: Icon }: StepCardProps) => {
  return (
    <motion.div 
      className="flex flex-col items-center text-center space-y-4 p-4"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-vaya-accent-orange rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 md:w-10 md:h-10 text-vaya-capsules" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-vaya-capsules rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
          {step}
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-bold text-vaya-gray-900 font-outfit">{title}</h3>
      <p className="text-sm md:text-base text-vaya-gray-600 max-w-[280px] md:max-w-sm">{description}</p>
    </motion.div>
  );
};