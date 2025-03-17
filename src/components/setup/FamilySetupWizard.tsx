
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Steps, Step, StepLabel, StepContent } from "@/components/ui/stepper";
import { useToast } from "@/components/ui/use-toast";
import { InitialSetupForm } from "./InitialSetupForm";
import { MediaGallery } from "@/components/media/MediaGallery";
import { MediaUpload } from "@/components/media/MediaUpload";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import { CopyIcon, CheckIcon, ArrowRightIcon, ArrowLeftIcon } from "lucide-react";

export function FamilySetupWizard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(0);
  const [familyId, setFamilyId] = useState<string | null>(null);
  const [secretWord, setSecretWord] = useState<string>("hanuman");
  const [inviteLink, setInviteLink] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);

  const handleFamilyCreated = async (newFamilyId: string) => {
    setFamilyId(newFamilyId);
    
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
      setInviteLink(`${baseUrl}/join-family?secret=${secretWord}`);
      
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
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
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
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    toast({
      title: "Link copied",
      description: "Invite link copied to clipboard",
    });
    
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const handleComplete = () => {
    toast({
      title: "Setup complete!",
      description: "Your family space is ready to use",
    });
    navigate(`/family/${familyId}`);
  };

  const steps = [
    {
      label: "Create your family",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Start by creating your family space and setting up the "hanuman" secret word.</p>
          <InitialSetupForm onSubmit={handleFamilyCreated} defaultSecretWord="hanuman" />
        </div>
      )
    },
    {
      label: "Upload photos",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Upload some initial photos to your family space.</p>
          {familyId && (
            <>
              <MediaUpload familyId={familyId} onUploadComplete={handleMediaUploaded} />
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Your uploaded media</h3>
                <MediaGallery limit={4} />
              </div>
            </>
          )}
        </div>
      )
    },
    {
      label: "Record welcome message",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Record a welcome message to greet your family members when they join.</p>
          <VoiceRecordingExperience onMemorySaved={handleAudioRecorded} />
        </div>
      )
    },
    {
      label: "Share with family",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Your family is ready!</h3>
            <p className="text-blue-600 mb-4">
              Share this link with your family members to invite them to join your space.
              They will need to use the secret word "hanuman" to access.
            </p>
            
            <div className="flex items-center space-x-2">
              <div className="flex-1 p-3 bg-white rounded border font-mono text-sm truncate">
                {inviteLink}
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleCopyLink}
                className="flex-shrink-0"
              >
                {linkCopied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <h3 className="text-lg font-medium text-amber-800 mb-2">Secret Word</h3>
            <p className="text-amber-600 mb-2">
              Remember to tell your family members the secret word:
            </p>
            <div className="font-bold text-center p-3 bg-white rounded border text-amber-800">
              hanuman
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Family Setup Wizard</CardTitle>
        </CardHeader>
        <CardContent>
          <Steps activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <div className="py-4">{step.content}</div>
                </StepContent>
              </Step>
            ))}
          </Steps>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div>
            {activeStep === steps.length - 1 ? (
              <Button onClick={handleComplete}>
                Complete Setup
              </Button>
            ) : activeStep === 0 ? (
              null // First step has its own next button in the form
            ) : (
              <Button onClick={handleNext}>
                Next
                <ArrowRightIcon className="ml-2 h-4 w-4" />  
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
