
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useFamilyContextManagement } from "@/hooks/useFamilyContextManagement";

export interface WizardState {
  activeStep: number;
  familyId: string | null;
  secretWord: string;
  inviteLink: string;
  linkCopied: boolean;
  familyContext: any | null;
}

export const useWizardState = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { saveFamilyContext } = useFamilyContextManagement();
  
  const [state, setState] = useState<WizardState>({
    activeStep: 0,
    familyId: null,
    secretWord: "hanuman",
    inviteLink: "",
    linkCopied: false,
    familyContext: null,
  });

  const handleFamilyCreated = async (newFamilyId: string) => {
    setState(prev => ({ ...prev, familyId: newFamilyId }));
    
    // Create a secret word "hanuman" for this family if not already set
    try {
      // We'll create a secret word even for guest users
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
    handleNext();
  };

  const handleAudioRecorded = (data: { audioUrl?: string; transcription?: string }) => {
    if (data.audioUrl) {
      toast({
        title: "Welcome message recorded",
        description: "Your welcome message has been saved successfully",
      });
      handleNext();
    }
  };

  const handleFamilyContextSaved = async (contextData: any) => {
    setState(prev => ({ ...prev, familyContext: contextData }));
    
    try {
      // Save to local storage via hook for now
      await saveFamilyContext(contextData);
      
      toast({
        title: "Family context saved",
        description: "Your family context information has been saved",
      });
      
      handleNext();
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not save family context",
        variant: "destructive",
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
    
    // If we have family context, save it to the database/localStorage
    if (state.familyContext) {
      saveFamilyContext(state.familyContext);
    }
    
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
    handleFamilyContextSaved,
    handleCopyLink,
    handleComplete,
  };
};
