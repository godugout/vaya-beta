
import { motion, AnimatePresence } from "framer-motion";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Step1FamilyInfo } from "./Step1FamilyInfo";
import { Step2InviteMembers } from "./Step2InviteMembers";
import { Step3Confirmation } from "./Step3Confirmation";
import { useWizardController } from "./useWizardController";
import { WizardControllerProps } from "./types";
import { WizardNavigation } from "./WizardNavigation";

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

  const steps = [
    {
      title: "Create Your Family",
      content: <Step1FamilyInfo formData={formData} handleChange={handleChange} />,
    },
    {
      title: "Invite Family Members",
      content: <Step2InviteMembers formData={formData} handleChange={handleChange} />,
    },
    {
      title: "Ready to Begin",
      content: <Step3Confirmation formData={formData} handleChange={handleChange} />,
    },
  ];

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-heading font-semibold text-vaya-text-primary">
          {steps[step - 1].title}
        </DialogTitle>
        <DialogDescription className="text-gray-500 dark:text-gray-400">
          Create your family space to collect and share memories
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
          {steps[step - 1].content}
        </motion.div>
      </AnimatePresence>
      
      <WizardNavigation
        step={step}
        totalSteps={steps.length}
        loading={loading}
        handleBack={handleBack}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
