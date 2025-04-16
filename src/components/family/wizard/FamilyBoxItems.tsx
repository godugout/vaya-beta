
import { Button } from "@/components/ui/button";
import { WizardStepProps } from "./types";
import { Check, Photo, FileText, BookOpen, UserPlus, Plus, Box } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface BoxItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
}

export const FamilyBoxItems = ({ formData }: WizardStepProps) => {
  const [items, setItems] = useState<BoxItem[]>([
    { id: "photos", name: "Family Photos", icon: <Photo className="h-5 w-5" />, selected: false },
    { id: "stories", name: "Family Stories", icon: <FileText className="h-5 w-5" />, selected: false },
    { id: "history", name: "Family History", icon: <BookOpen className="h-5 w-5" />, selected: false },
    { id: "members", name: "Family Members", icon: <UserPlus className="h-5 w-5" />, selected: false },
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3">
          Add to your Family Box
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Select items you'd like to add to your Family Box to organize and revisit later.
        </p>
        
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                item.selected 
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700" 
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-autumn mr-3">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {item.selected ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Plus className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Box className="h-5 w-5 text-autumn mr-2" />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          You can manage your Family Box items anytime from your family dashboard
        </span>
      </div>
    </div>
  );
};
