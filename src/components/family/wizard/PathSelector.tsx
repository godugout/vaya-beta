
import { Button } from "@/components/ui/button";
import { WizardStepProps } from "./types";
import { Check, ClipboardList, Zap } from "lucide-react";
import { motion } from "framer-motion";

export const PathSelector = ({ 
  formData, 
  handleChange 
}: WizardStepProps) => {
  const handleSelectPath = (path: "quick" | "detailed") => {
    const event = {
      target: {
        name: "userPreference",
        value: path
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleChange(event);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
        Choose your setup preference
      </h3>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            formData.userPreference === "quick" 
              ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700" 
              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          }`}
          onClick={() => handleSelectPath("quick")}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-blue-500 mr-2" />
              <h4 className="text-sm font-medium">Quick Create</h4>
            </div>
            {formData.userPreference === "quick" && (
              <Check className="h-5 w-5 text-blue-500" />
            )}
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Create your family quickly now and add details later
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            formData.userPreference === "detailed" 
              ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700" 
              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          }`}
          onClick={() => handleSelectPath("detailed")}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <ClipboardList className="h-5 w-5 text-amber-500 mr-2" />
              <h4 className="text-sm font-medium">Detailed Setup</h4>
            </div>
            {formData.userPreference === "detailed" && (
              <Check className="h-5 w-5 text-amber-500" />
            )}
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Complete the full setup process with all details
          </p>
        </motion.div>
      </div>
    </div>
  );
};
