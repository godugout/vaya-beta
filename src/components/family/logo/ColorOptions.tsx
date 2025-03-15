
import { cn } from "@/lib/utils";

interface ColorOptionsProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const ColorOptions = ({
  selectedColor,
  onColorChange,
}: ColorOptionsProps) => {
  const colorOptions = [
    "#6C5CE7", // Purple
    "#FF7675", // Coral
    "#00CEC9", // Turquoise
    "#FFEAA7", // Yellow
    "#FF9F43", // Orange
    "#55EFC4", // Green
  ];

  return (
    <div>
      <h4 className="text-sm font-medium text-vaya-text-secondary mb-3">
        Icon Color
      </h4>
      <div className="grid grid-cols-6 gap-2">
        {colorOptions.map((color) => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className={cn(
              "w-full aspect-square rounded-full transition-all",
              selectedColor === color && "ring-2 ring-vaya-gray-800 ring-offset-2"
            )}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};
