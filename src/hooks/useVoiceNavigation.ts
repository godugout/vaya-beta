
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function useVoiceNavigation() {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const { toast } = useToast();

  const toggleVoiceNavigation = () => {
    setIsVoiceActive(prev => !prev);
    
    if (!isVoiceActive) {
      toast({
        title: "Voice Navigation Active",
        description: "Try saying 'Go to Home' or 'Record Story'",
      });
    } else {
      toast({
        title: "Voice Navigation Disabled",
        description: "Voice commands have been turned off.",
      });
    }
  };

  return {
    isVoiceActive,
    toggleVoiceNavigation
  };
}
