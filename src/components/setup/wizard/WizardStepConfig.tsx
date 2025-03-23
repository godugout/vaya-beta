
import React from "react";
import { WizardState } from "./useWizardState";
import {
  FamilyCreationStep,
  MediaUploadStep,
  AudioRecordingStep,
  ShareInviteStep,
  FamilyContextStep
} from "./WizardSteps";

export interface WizardStep {
  label: string;
  content: React.ReactNode;
}

interface WizardStepConfigProps {
  wizardState: WizardState;
  onFamilyCreated: (familyId: string) => void;
  onMediaUploaded: () => void;
  onAudioRecorded: (data: { audioUrl?: string; transcription?: string }) => void;
  onCopyLink: () => void;
  onFamilyContextSaved: (contextData: any) => void;
}

export const useWizardSteps = ({
  wizardState,
  onFamilyCreated,
  onMediaUploaded,
  onAudioRecorded,
  onCopyLink,
  onFamilyContextSaved,
}: WizardStepConfigProps): WizardStep[] => {
  const { familyId, inviteLink, linkCopied } = wizardState;

  return [
    {
      label: "Create your family",
      content: <FamilyCreationStep onFamilyCreated={onFamilyCreated} />
    },
    {
      label: "Family Context",
      content: <FamilyContextStep onContextSaved={onFamilyContextSaved} />
    },
    {
      label: "Upload photos",
      content: <MediaUploadStep familyId={familyId} onMediaUploaded={onMediaUploaded} />
    },
    {
      label: "Record welcome message",
      content: <AudioRecordingStep onAudioRecorded={onAudioRecorded} />
    },
    {
      label: "Share with family",
      content: <ShareInviteStep 
        inviteLink={inviteLink} 
        onCopyLink={onCopyLink} 
        linkCopied={linkCopied} 
      />
    }
  ];
};
