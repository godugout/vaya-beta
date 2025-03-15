
import { FamilyTheme } from "./types";

interface ThemePreviewProps {
  theme: FamilyTheme;
}

export const ThemePreview = ({ theme }: ThemePreviewProps) => {
  return (
    <div className="space-y-4 mt-6">
      <p className="text-sm text-vaya-text-secondary">Theme Preview:</p>
      
      <div 
        className="p-4 rounded-xl border"
        style={{ 
          backgroundColor: theme.secondaryColor + "20", // Using hex opacity
          borderColor: theme.primaryColor + "40" 
        }}
      >
        <h3 
          className="text-lg font-semibold mb-2"
          style={{ color: theme.textColor }}
        >
          Family Capsule Title
        </h3>
        <p className="text-sm mb-3" style={{ color: theme.textColor + "CC" }}>
          This is how your family's custom content would appear.
        </p>
        <button
          className="px-4 py-2 rounded transition-all"
          style={{ 
            backgroundColor: theme.primaryColor,
            color: "#FFFFFF"
          }}
        >
          Custom Action
        </button>
      </div>
    </div>
  );
};
