
import { LucideIcon } from "lucide-react";
import { BasePill } from "./BasePill";
import { PillButton } from "./PillButton";
import { getEmojiForIcon } from "../utils/emojiUtils";
import { useTheme } from "next-themes";

interface PlaceholderPillProps {
  title: string;
  icon: LucideIcon;
  colorKey: string;
  description?: string;
  prompts?: string[];
  isHovered: boolean;
}

export const PlaceholderPill = ({
  title,
  icon,
  colorKey,
  description,
  prompts,
  isHovered
}: PlaceholderPillProps) => {
  const emoji = getEmojiForIcon(icon, title, description);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <BasePill colorKey={colorKey} isHovered={isHovered}>
      <div className="flex items-center gap-4 w-full">
        <span className="text-3xl">{emoji}</span>
        <div className="flex flex-col justify-start">
          <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} font-outfit text-left`}>
            {title}
          </h3>
          {prompts && prompts.length > 0 && (
            <div className={`flex items-center gap-2 text-xs ${isDark ? "text-gray-300" : "text-gray-600"} mt-1`}>
              <span>{prompts[0]}</span>
            </div>
          )}
        </div>
        <PillButton colorKey={colorKey} isHovered={isHovered} />
      </div>
    </BasePill>
  );
};
