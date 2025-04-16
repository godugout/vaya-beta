
import { Dispatch, SetStateAction } from "react";

export type UserPreference = "quick" | "detailed";

export interface FamilyFormData {
  name: string;
  description: string;
  userPreference?: UserPreference;
}

export interface WizardStepProps {
  formData: FamilyFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  loading?: boolean;
}

export interface WizardControllerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
