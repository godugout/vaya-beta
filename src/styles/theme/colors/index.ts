
// Re-export all color modules in a structured way
import { brandColors } from './brand';
import { featureColors } from './features';
import { lovableColors } from './lovable';
import { greystoneColors } from './greystone';
import { shadcnColors } from './shadcn';
import { vayaColors } from './vaya';
import { darkModeColors } from './darkMode';
import { forestStreamColors } from './forestStream';
import { autumnColors } from './autumn';

// Export a structured color system
export const colors = {
  // Brand identity
  brand: brandColors,
  
  // Feature-specific colors
  features: featureColors,
  
  // Theme variations
  themes: {
    lovable: lovableColors,
    greystone: greystoneColors,
    forestStream: forestStreamColors,
    vaya: vayaColors,
    autumn: autumnColors,
  },
  
  // UI component colors
  ui: shadcnColors,
  
  // Dark mode specific colors
  dark: darkModeColors,
};
