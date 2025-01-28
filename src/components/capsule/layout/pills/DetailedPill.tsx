import { LucideIcon } from "lucide-react";
import { BasePill } from "./BasePill";
import { PillTimer } from "./PillTimer";
import { getEmojiForIcon } from "../utils/emojiUtils";
import { CapsuleMetadata } from "@/types/capsule";
import { cn } from "@/lib/utils";

interface DetailedPillProps {
  title: string;
  icon: LucideIcon;
  colorKey: string;
  description?: string;
  metadata?: CapsuleMetadata;
  backgroundImage?: string;
}

export const DetailedPill = ({
  title,
  icon,
  colorKey,
  description,
  metadata,
  backgroundImage
}: DetailedPillProps) => {
  const emoji = getEmojiForIcon(icon, title, description);

  return (
    <BasePill colorKey={colorKey} isDetailed backgroundImage={backgroundImage}>
      <div className="flex items-start">
        <span className="text-3xl mr-4">{emoji}</span>
        <div className="flex flex-col justify-start">
          <h3 className="text-xl font-semibold text-vaya-gray-900 font-outfit mb-1 text-left">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-vaya-gray-600 line-clamp-2 font-inter text-left">
              {description}
            </p>
          )}
          {metadata && (
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-xs text-vaya-gray-500">
                <span>{metadata.itemCount} items</span>
              </div>
              <span className={cn(
                "capitalize px-2 py-0.5 rounded-full text-xs font-medium",
                `bg-vaya-${colorKey} bg-opacity-20 text-vaya-${colorKey}`
              )}>
                {metadata.status}
              </span>
            </div>
          )}
        </div>
      </div>
      {metadata?.date && (
        <PillTimer 
          date={metadata.date}
          status={metadata.status}
          colorKey={colorKey}
        />
      )}
    </BasePill>
  );
};