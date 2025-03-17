
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface WizardState {
  activeStep: number;
  familyId: string | null;
  secretWord: string;
  inviteLink: string;
  linkCopied: boolean;
}

export const useWizardState = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [state, setState] = useState<WizardState>({
    activeStep: 0,
    familyId: null,
    secretWord: "hanuman",
    inviteLink: "",
    linkCopied: false,
  });

  const handleFamilyCreated = async (newFamilyId: string) => {
    setState(prev => ({ ...prev, familyId: newFamilyId }));
    
    // Create a secret word "hanuman" for this family if not already set
    try {
      const { error } = await supabase
        .from("family_access_codes")
        .insert({
          family_id: newFamilyId,
          secret_word: "hanuman",
        })
        .select()
        .single();

      if (error && !error.message.includes('duplicate')) {
        throw error;
      }
      
      // Generate invite link
      const baseUrl = window.location.origin;
      setState(prev => ({ 
        ...prev, 
        inviteLink: `${baseUrl}/join-family?secret=${prev.secretWord}` 
      }));
      
      // Move to next step
      handleNext();
    } catch (error) {
      console.error("Error creating secret word:", error);
      toast({
        title: "Error",
        description: "Could not create family secret word",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    setState(prev => ({ ...prev, activeStep: prev.activeStep + 1 }));
  };

  const handleBack = () => {
    setState(prev => ({ ...prev, activeStep: prev.activeStep - 1 }));
  };

  const handleMediaUploaded = () => {
    toast({
      title: "Media uploaded",
      description: "Your media has been successfully uploaded",
    });
  };

  const handleAudioRecorded = (data: { audioUrl?: string; transcription?: string }) => {
    if (data.audioUrl) {
      toast({
        title: "Welcome message recorded",
        description: "Your welcome message has been saved successfully",
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(state.inviteLink);
    setState(prev => ({ ...prev, linkCopied: true }));
    toast({
      title: "Link copied",
      description: "Invite link copied to clipboard",
    });
    
    setTimeout(() => setState(prev => ({ ...prev, linkCopied: false })), 3000);
  };

  const handleComplete = () => {
    toast({
      title: "Setup complete!",
      description: "Your family space is ready to use",
    });
    if (state.familyId) {
      navigate(`/family/${state.familyId}`);
    }
  };

  return {
    state,
    handleFamilyCreated,
    handleNext,
    handleBack,
    handleMediaUploaded,
    handleAudioRecorded,
    handleCopyLink,
    handleComplete,
  };
};
