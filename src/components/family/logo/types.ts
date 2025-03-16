
import { ReactNode } from "react";

export interface FamilyLogoIconOption {
  icon: ReactNode;
  name: string;
  background?: string;
  customIcon?: boolean;
}

export interface LogoCustomizerProps {
  familyId?: string;
  initialLogo?: {
    icon: string;
    color: string;
    background: string;
    isCustomIcon?: boolean;
  };
  onLogoChange?: (logo: any) => void;
}
