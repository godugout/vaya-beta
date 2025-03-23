
import React from "react";
import { InitialSetupForm } from "../InitialSetupForm";
import { MediaGallery } from "@/components/media/MediaGallery";
import { MediaUpload } from "@/components/media/MediaUpload";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import { FamilyContextForm } from "@/components/chat/FamilyContextForm";
import { CopyIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface FamilyCreationStepProps {
  onFamilyCreated: (familyId: string) => void;
}

export const FamilyCreationStep: React.FC<FamilyCreationStepProps> = ({ onFamilyCreated }) => {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">Start by creating your family space and setting up the "hanuman" secret word.</p>
      <InitialSetupForm onSubmit={onFamilyCreated} defaultSecretWord="hanuman" />
    </div>
  );
};

interface FamilyContextStepProps {
  onContextSaved: (contextData: any) => void;
}

export const FamilyContextStep: React.FC<FamilyContextStepProps> = ({ onContextSaved }) => {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">Tell us about your family context to help personalize your experience.</p>
      <FamilyContextForm onSave={onContextSaved} edition="hanuman" />
    </div>
  );
};

interface MediaUploadStepProps {
  familyId: string | null;
  onMediaUploaded: () => void;
}

export const MediaUploadStep: React.FC<MediaUploadStepProps> = ({ familyId, onMediaUploaded }) => {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">Upload some initial photos to your family space.</p>
      {familyId && (
        <>
          <MediaUpload familyId={familyId} onUploadComplete={onMediaUploaded} />
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Your uploaded media</h3>
            <MediaGallery limit={4} />
          </div>
        </>
      )}
    </div>
  );
};

interface AudioRecordingStepProps {
  onAudioRecorded: (data: { audioUrl?: string; transcription?: string }) => void;
}

export const AudioRecordingStep: React.FC<AudioRecordingStepProps> = ({ onAudioRecorded }) => {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">Record a welcome message to greet your family members when they join.</p>
      <VoiceRecordingExperience onMemorySaved={onAudioRecorded} />
    </div>
  );
};

interface ShareInviteStepProps {
  inviteLink: string;
  onCopyLink: () => void;
  linkCopied: boolean;
}

export const ShareInviteStep: React.FC<ShareInviteStepProps> = ({ inviteLink, onCopyLink, linkCopied }) => {
  return (
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
            onClick={onCopyLink}
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
  );
};
