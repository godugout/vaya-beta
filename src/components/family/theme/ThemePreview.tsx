
import { FamilyTheme } from "./types";
import { useTheme } from "next-themes";

interface ThemePreviewProps {
  theme: FamilyTheme;
}

export const ThemePreview = ({ theme }: ThemePreviewProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="space-y-6 mt-8 relative">
      <p className="text-sm text-gray-600 dark:text-gray-400">Theme Preview:</p>
      
      <div 
        className="p-8 border transition-all duration-300"
        style={{ 
          backgroundColor: isDark ? "#171717" : "#FFFFFF",
          borderColor: theme.primaryColor,
          boxShadow: isDark ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "0 4px 12px rgba(0, 0, 0, 0.05)" 
        }}
      >
        <h3 
          className="text-2xl font-medium mb-4 tracking-tight"
          style={{ color: theme.textColor }}
        >
          Family Capsule Title
        </h3>
        <p 
          className="text-base mb-6" 
          style={{ color: theme.textColor }}
        >
          This is how your family's custom content would appear with the Agencs design style.
        </p>
        <button
          className="px-8 py-3 transition-all"
          style={{ 
            backgroundColor: theme.primaryColor,
            color: isDark ? "#111111" : "#FFFFFF",
          }}
        >
          Custom Action
        </button>
      </div>
    </div>
  );
};
