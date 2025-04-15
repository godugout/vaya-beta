
import { ReactNode } from "react";

export interface FamilyLogoIconOption {
  icon: JSX.Element;
  name: string;
  background?: string;
}

export interface FamilyLogo {
  icon: string;
  color: string;
  background: string;
}

export interface LogoCustomizerProps {
  familyId?: string;
  initialLogo?: FamilyLogo;
  onLogoChange?: (logo: FamilyLogo) => void;
}
