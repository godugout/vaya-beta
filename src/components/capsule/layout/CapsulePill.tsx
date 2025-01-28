import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Capsule } from "@/types/capsule";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export const CapsulePill = ({ 
  title,
  description,
  icon: Icon,
  colorKey,
  isPlaceholder,
  backgroundImage,
  prompts = [],
}: Capsule) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getColorConfig = (key: string) => {
    const colors = {
      memories: [[14, 165, 233]], // sky-500
      stories: [[249, 115, 22]], // orange-500
      capsules: [[34, 197, 94]], // green-500
      narra: [[155, 135, 245]], // purple-400
    };
    return colors[key as keyof typeof colors] || colors.memories;
  };

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-gray-200",
        "flex flex-col justify-between p-6 transition-all duration-300",
        "min-h-[200px] w-full md:w-[300px]",
        isPlaceholder ? "bg-gray-50/80" : "bg-white",
        "hover:border-transparent hover:shadow-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            <CanvasRevealEffect
              colors={getColorConfig(colorKey)}
              animationSpeed={3}
              containerClassName={`bg-vaya-${colorKey}/5`}
              dotSize={2}
              opacities={[0.1, 0.1, 0.2, 0.2, 0.3, 0.3, 0.4, 0.4, 0.5, 0.6]}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className={cn(
              "text-lg font-semibold tracking-tight",
              `text-vaya-${colorKey}`
            )}>
              {title}
            </h3>
            {description && (
              <p className="text-sm text-gray-600">
                {description}
              </p>
            )}
          </div>
          {Icon && (
            <Icon className={cn(
              "h-6 w-6 transition-transform duration-300",
              `text-vaya-${colorKey}`,
              "group-hover:scale-110"
            )} />
          )}
        </div>

        {prompts.length > 0 && (
          <div className="space-y-2">
            {prompts.map((prompt, index) => (
              <p 
                key={index}
                className="text-sm text-gray-500 italic"
              >
                {prompt}
              </p>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};