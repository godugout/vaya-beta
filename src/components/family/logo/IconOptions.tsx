
import { cn } from "@/lib/utils";
import { FamilyIconOptions } from "./constants";
import { FamilyLogoIconOption } from "./types";

interface IconOptionsProps {
  selectedIcon: string;
  selectedColor: string;
  onIconSelect: (option: FamilyLogoIconOption) => void;
}

export const IconOptions = ({
  selectedIcon,
  selectedColor,
  onIconSelect,
}: IconOptionsProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-vaya-text-secondary mb-3">
        Built-in Icons
      </h4>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
        {FamilyIconOptions.map((option) => (
          <button
            key={option.name}
            onClick={() => onIconSelect(option)}
            className={cn(
              "flex flex-col items-center p-3 rounded-lg transition-all",
              option.background,
              selectedIcon === option.name && "ring-2 ring-vaya-brand-primary ring-offset-2"
            )}
          >
            <span style={{ color: selectedIcon === option.name ? selectedColor : undefined }}>
              {option.icon}
            </span>
            <span className="text-xs mt-1 text-vaya-text-secondary">
              {option.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
