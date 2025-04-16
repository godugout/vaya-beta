
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export function useSimplifiedView() {
  const [isSimplifiedView, setIsSimplifiedView] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedPreference = localStorage.getItem('simplifiedView');
    if (savedPreference) {
      setIsSimplifiedView(savedPreference === 'true');
    }
  }, []);

  const toggleSimplifiedView = () => {
    const newValue = !isSimplifiedView;
    setIsSimplifiedView(newValue);
    localStorage.setItem('simplifiedView', String(newValue));
    
    toast({
      title: newValue ? "Simplified View Enabled" : "Standard View Enabled",
      description: newValue 
        ? "Larger text and touch targets for easier navigation." 
        : "Standard navigation view restored.",
    });
  };

  return {
    isSimplifiedView,
    toggleSimplifiedView
  };
}
