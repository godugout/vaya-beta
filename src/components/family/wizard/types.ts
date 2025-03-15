
import { Dispatch, SetStateAction } from "react";

export interface FamilyFormData {
  name: string;
  description: string;
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
