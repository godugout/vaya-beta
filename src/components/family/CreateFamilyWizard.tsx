
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CreateFamilyWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateFamilyWizard = ({ open, onOpenChange }: CreateFamilyWizardProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.name) {
      toast({
        title: "Family name required",
        description: "Please enter a name for your family",
        variant: "destructive",
      });
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Create family
      const { data: family, error: familyError } = await supabase
        .from("families")
        .insert({
          name: formData.name,
          description: formData.description || null,
        })
        .select()
        .single();

      if (familyError) throw familyError;

      // Add current user as family admin
      const { error: memberError } = await supabase
        .from("family_members")
        .insert({
          family_id: family.id,
          user_id: user.id,
          role: "admin",
        });

      if (memberError) throw memberError;

      toast({
        title: "Family created!",
        description: `You've successfully created ${formData.name}`,
      });

      // Reset form and close dialog
      setFormData({ name: "", description: "" });
      setStep(1);
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error creating family",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Create Your Family",
      content: (
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
      ),
    },
    {
      title: "Invite Family Members",
      content: (
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
      ),
    },
    {
      title: "Ready to Begin",
      content: (
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
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
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
        
        <div className="flex justify-end gap-2 mt-6">
          {step > 1 && step < steps.length && (
            <Button
              variant="outline"
              onClick={() => setStep((prev) => prev - 1)}
              disabled={loading}
            >
              Back
            </Button>
          )}
          
          {step < steps.length - 1 && (
            <Button onClick={handleNext} disabled={loading} className="bg-ui-orange hover:bg-ui-orange/90 text-white">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          
          {step === steps.length - 1 && (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-ui-orange hover:bg-ui-orange/90 text-white"
            >
              {loading ? "Creating..." : "Create Family"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
