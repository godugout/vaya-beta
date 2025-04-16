
import { Button } from "@/components/ui/button";
import { WizardStepProps } from "./types";
import { Input } from "@/components/ui/input";
import { ClipboardCheck, Users } from "lucide-react";

export const QuickCreatePath = ({ formData, handleChange, loading }: WizardStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Family Name
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., The Rodriguez Family"
          className="w-full"
          disabled={loading}
        />
      </div>
      
      <div className="mt-6">
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ClipboardCheck className="h-5 w-5 text-amber-500" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Quick Setup</h3>
              <div className="mt-2 text-sm text-amber-700 dark:text-amber-400">
                <p>
                  You can invite family members and customize your family space later from your family dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
