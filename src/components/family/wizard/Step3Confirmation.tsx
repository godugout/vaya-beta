
import { Users } from "lucide-react";
import { WizardStepProps } from "./types";

export const Step3Confirmation = ({ formData }: WizardStepProps) => {
  return (
    <div className="space-y-6 text-center">
      <div className="w-20 h-20 bg-[#F8F5FF] rounded-full flex items-center justify-center mx-auto">
        <Users className="h-10 w-10 text-vaya-home" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-vaya-text-primary">
        {formData.name} is ready!
      </h3>
      <p className="text-vaya-text-secondary">
        Your family space has been created. Start capturing and preserving your family's legacy.
      </p>
    </div>
  );
};
