
import { FamilyTheme } from "./types";
import { useTheme } from "next-themes";

interface ThemePreviewProps {
  theme: FamilyTheme;
}

export const ThemePreview = ({ theme }: ThemePreviewProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="space-y-4 mt-6">
      <p className="text-sm text-vaya-text-secondary dark:text-dark-text-secondary">Theme Preview:</p>
      
      <div 
        className="p-4 rounded-xl border"
        style={{ 
          backgroundColor: `${theme.secondaryColor}${isDark ? "30" : "20"}`, // Slightly higher opacity for dark mode
          borderColor: `${theme.primaryColor}${isDark ? "60" : "40"}`,
          boxShadow: isDark ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "0 4px 12px rgba(0, 0, 0, 0.05)" 
        }}
      >
        <h3 
          className="text-lg font-semibold mb-2"
          style={{ color: theme.textColor }}
        >
          Family Capsule Title
        </h3>
        <p 
          className="text-sm mb-3" 
          style={{ color: `${theme.textColor}${isDark ? "E6" : "CC"}` }} // More opacity in dark mode
        >
          This is how your family's custom content would appear.
        </p>
        <button
          className="px-4 py-2 rounded transition-all"
          style={{ 
            backgroundColor: theme.primaryColor,
            color: "#FFFFFF",
            boxShadow: isDark ? "0 2px 8px rgba(0, 0, 0, 0.3)" : "0 2px 6px rgba(0, 0, 0, 0.1)"
          }}
        >
          Custom Action
        </button>
      </div>
    </div>
  );
};

