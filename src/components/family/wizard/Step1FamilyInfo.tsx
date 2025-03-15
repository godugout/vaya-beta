
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WizardStepProps } from "./types";

export const Step1FamilyInfo = ({ formData, handleChange }: WizardStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Family Name
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., The Rodriguez Family"
          className="w-full"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell us a bit about your family..."
          className="w-full min-h-[120px]"
        />
      </div>
    </div>
  );
};
