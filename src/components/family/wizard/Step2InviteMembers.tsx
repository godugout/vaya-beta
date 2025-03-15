
import { Check } from "lucide-react";
import { WizardStepProps } from "./types";

export const Step2InviteMembers = ({}: WizardStepProps) => {
  return (
    <div className="space-y-6">
      <p className="text-vaya-text-secondary">
        You can invite family members to join after creating your family. They'll be able to contribute stories and memories.
      </p>
      <div className="bg-[#F8F5FF] p-4 rounded-lg border border-vaya-home/20">
        <h4 className="font-medium text-vaya-text-primary mb-2">Benefits of adding family members:</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Check className="h-5 w-5 text-vaya-home mr-2 flex-shrink-0 mt-0.5" />
            <span>Collect stories from multiple perspectives</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-vaya-home mr-2 flex-shrink-0 mt-0.5" />
            <span>Build a comprehensive family tree</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-vaya-home mr-2 flex-shrink-0 mt-0.5" />
            <span>Preserve memories across generations</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
