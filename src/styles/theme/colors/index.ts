
import { brandColors } from './brand';
import { featureColors } from './features';
import { lovableColors } from './lovable';
import { greystoneColors } from './greystone';
import { shadcnColors } from './shadcn';
import { vayaColors } from './vaya';

// Export the full colors object with the same structure as before
export const colors = {
  // Re-export all the color modules with the original structure
  ...brandColors,
  features: featureColors,
  lovable: lovableColors,
  greystone: greystoneColors,
  shadcn: shadcnColors,
  vaya: vayaColors
};
