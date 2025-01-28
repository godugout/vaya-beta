import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { PlaceholderPill } from "./pills/PlaceholderPill";
import { DetailedPill } from "./pills/DetailedPill";
import { CapsuleMetadata } from "@/types/capsule";

interface CapsulePillProps {
  title: string;
  icon: LucideIcon;
  colorKey: string;
  description?: string;
  prompts?: string[];
  metadata?: CapsuleMetadata;
  isPlaceholder?: boolean;
  backgroundImage?: string;
  isDetailed?: boolean;
  isPaused?: boolean;
}

export const CapsulePill = ({
  title,
  icon,
  colorKey,
  description,
  prompts,
  metadata,
  isPlaceholder,
  backgroundImage,
  isDetailed,
  isPaused
}: CapsulePillProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: isPaused ? 1.03 : 1 }}
      className="flex-shrink-0 transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPlaceholder ? (
        <PlaceholderPill
          title={title}
          icon={icon}
          colorKey={colorKey}
          description={description}
          prompts={prompts}
          isHovered={isHovered}
        />
      ) : (
        <DetailedPill
          title={title}
          icon={icon}
          colorKey={colorKey}
          description={description}
          metadata={metadata}
          backgroundImage={backgroundImage}
        />
      )}
    </motion.div>
  );
};