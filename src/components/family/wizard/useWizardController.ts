
import { useState } from "react";
import { FamilyFormData, UserPreference } from "./types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useWizardController = (onOpenChange: (open: boolean) => void) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FamilyFormData>({
    name: "",
    description: "",
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    // Path selection validation
    if (step === 2 && !formData.userPreference) {
      toast({
        title: "Path selection required",
        description: "Please select a setup path to continue",
        variant: "destructive",
      });
      return;
    }
    
    // Family name validation
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

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Create family in the families table
      const { data: family, error: familyError } = await supabase
        .from("families")
        .insert({
          name: formData.name,
          description: formData.description || null,
        })
        .select()
        .single();

      if (familyError) throw familyError;

      // Add current user as family member with admin role
      const { error: memberError } = await supabase
        .from("family_members")
        .insert({
          family_id: family.id,
          user_id: user.id,
          role: "admin",
        });

      if (memberError) {
        console.error("Error adding family member:", memberError);
        // If we can't add the member, we should delete the family to avoid orphaned records
        await supabase.from("families").delete().match({ id: family.id });
        throw new Error("Failed to add you as a family member");
      }

      toast({
        title: "Family created!",
        description: formData.userPreference === "quick" 
          ? `You've quickly created ${formData.name}. You can add more details later.` 
          : `You've successfully created ${formData.name}`,
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

  return {
    step,
    loading,
    formData,
    handleChange,
    handleNext,
    handleBack,
    handleSubmit,
  };
};
