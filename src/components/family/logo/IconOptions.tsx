
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
  // Group icons into categories
  const standardIcons = FamilyIconOptions.filter(icon => !icon.customIcon);
  const specialIcons = FamilyIconOptions.filter(icon => icon.customIcon);

  return (
    <div className="space-y-6">
      {/* Special Icons Section */}
      <div>
        <h4 className="text-sm font-medium text-vaya-text-secondary dark:text-gray-300 mb-3">
          Vaya Special Icons
        </h4>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {specialIcons.map((option) => (
            <button
              key={option.name}
              onClick={() => onIconSelect(option)}
              className={cn(
                "flex flex-col items-center p-3 rounded-lg transition-all",
                option.background,
                selectedIcon === option.name && "ring-2 ring-autumn ring-offset-2 dark:ring-offset-gray-900"
              )}
            >
              <div className="h-8 w-8 flex items-center justify-center">
                {option.icon}
              </div>
              <span className="text-xs mt-1 text-vaya-text-secondary dark:text-gray-300">
                {option.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Standard Icons Section */}
      <div>
        <h4 className="text-sm font-medium text-vaya-text-secondary dark:text-gray-300 mb-3">
          Standard Icons
        </h4>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {standardIcons.map((option) => (
            <button
              key={option.name}
              onClick={() => onIconSelect(option)}
              className={cn(
                "flex flex-col items-center p-3 rounded-lg transition-all",
                option.background,
                selectedIcon === option.name && "ring-2 ring-vaya-brand-primary dark:ring-autumn ring-offset-2 dark:ring-offset-gray-900"
              )}
            >
              <span style={{ color: selectedIcon === option.name ? selectedColor : undefined }}>
                {option.icon}
              </span>
              <span className="text-xs mt-1 text-vaya-text-secondary dark:text-gray-300">
                {option.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
