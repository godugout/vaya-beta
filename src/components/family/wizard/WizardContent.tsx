
import { motion, AnimatePresence } from "framer-motion";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Step1FamilyInfo } from "./Step1FamilyInfo";
import { Step2InviteMembers } from "./Step2InviteMembers";
import { Step3Confirmation } from "./Step3Confirmation";
import { useWizardController } from "./useWizardController";
import { WizardControllerProps } from "./types";
import { WizardNavigation } from "./WizardNavigation";
import { PathSelector } from "./PathSelector";
import { QuickCreatePath } from "./QuickCreatePath";
import { FamilyBoxItems } from "./FamilyBoxItems";

export const WizardContent = ({ open, onOpenChange }: WizardControllerProps) => {
  const {
    step,
    loading,
    formData,
    handleChange,
    handleNext,
    handleBack,
    handleSubmit,
  } = useWizardController(onOpenChange);

  // Generate steps based on user preference
  const getSteps = () => {
    // Initial steps common to both paths
    const initialSteps = [
      {
        title: "Create Your Family",
        description: "Start by naming your family space",
        content: <Step1FamilyInfo formData={formData} handleChange={handleChange} />,
      },
      {
        title: "Choose Setup Path",
        description: "Select how you'd like to set up your family",
        content: <PathSelector formData={formData} handleChange={handleChange} />,
      },
    ];

    // If no preference selected yet, just show initial steps
    if (!formData.userPreference) {
      return initialSteps;
    }

    if (formData.userPreference === "quick") {
      // Quick path
      return [
        ...initialSteps,
        {
          title: "Quick Family Setup",
          description: "Create your family in one step",
          content: <QuickCreatePath formData={formData} handleChange={handleChange} loading={loading} />,
        }
      ];
    } else {
      // Detailed path
      return [
        ...initialSteps,
        {
          title: "Family Box Items",
          description: "Choose items to save for later",
          content: <FamilyBoxItems formData={formData} handleChange={handleChange} />,
        },
        {
          title: "Invite Family Members",
          description: "Add members to your family space",
          content: <Step2InviteMembers formData={formData} handleChange={handleChange} />,
        },
        {
          title: "Ready to Begin",
          description: "Review and create your family",
          content: <Step3Confirmation formData={formData} handleChange={handleChange} />,
        },
      ];
    }
  };

  const steps = getSteps();
  const currentStep = steps[step - 1];

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-heading font-semibold text-vaya-text-primary">
          {currentStep.title}
        </DialogTitle>
        <DialogDescription className="text-gray-500 dark:text-gray-400">
          {currentStep.description}
        </DialogDescription>
      </DialogHeader>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep.content}
        </motion.div>
      </AnimatePresence>
      
      <WizardNavigation
        step={step}
        totalSteps={steps.length}
        loading={loading}
        handleBack={handleBack}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
        shouldShowSubmit={formData.userPreference === "quick" ? step === 3 : step === steps.length}
      />
    </>
  );
};
