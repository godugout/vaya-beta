
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, User, Users, Image, Calendar, MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VayaOnboardingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VayaOnboarding({ open, onOpenChange }: VayaOnboardingProps) {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  
  const screens = [
    {
      id: "welcome",
      title: "Welcome to Vaya",
      description: "Connect with your family and preserve memories for generations to come.",
      image: "/lovable-uploads/f3f72986-bf8f-4015-a04d-9a35ae90d558.png"
    },
    {
      id: "purpose",
      title: "What's your purpose?",
      description: "Help us personalize your experience based on why you're here."
    },
    {
      id: "interests",
      title: "What are you into?",
      description: "Select topics you'd like to explore with your family."
    },
    {
      id: "features",
      title: "Explore these features",
      description: "Discover what you can do with Vaya."
    }
  ];
  
  const purposeOptions = [
    { id: "preserve", label: "Preserve memories", icon: <Image className="h-5 w-5" /> },
    { id: "connect", label: "Connect with family", icon: <Users className="h-5 w-5" /> },
    { id: "record", label: "Record family history", icon: <Calendar className="h-5 w-5" /> },
    { id: "stories", label: "Share stories", icon: <MessageCircle className="h-5 w-5" /> }
  ];
  
  const interestOptions = [
    { id: "traditions", label: "Traditions" },
    { id: "recipes", label: "Recipes" },
    { id: "heritage", label: "Heritage" },
    { id: "travel", label: "Travel" },
    { id: "music", label: "Music" },
    { id: "celebrations", label: "Celebrations" },
    { id: "stories", label: "Stories" },
    { id: "history", label: "History" }
  ];
  
  const featureOptions = [
    {
      id: "memories",
      title: "Family Memories",
      description: "Create and share memorable moments with your loved ones",
      icon: <Image className="h-10 w-10 text-blue-400" />
    },
    {
      id: "chat",
      title: "Storytelling Chat",
      description: "Use AI to help capture and preserve meaningful stories",
      icon: <MessageCircle className="h-10 w-10 text-purple-400" />
    },
    {
      id: "timecapsule",
      title: "Time Capsules",
      description: "Create digital capsules to be opened in the future",
      icon: <Calendar className="h-10 w-10 text-amber-400" />
    }
  ];
  
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const handleNext = () => {
    if (step < screens.length - 1) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // Save preferences
    localStorage.setItem("vaya-onboarding-complete", "true");
    localStorage.setItem("vaya-selected-purposes", JSON.stringify(selectedPurposes));
    localStorage.setItem("vaya-selected-interests", JSON.stringify(selectedInterests));
    
    // Show completion toast
    toast({
      title: "Welcome to Vaya!",
      description: "Your preferences have been saved. Let's start preserving memories!",
    });
    
    onOpenChange(false);
  };
  
  const togglePurpose = (id: string) => {
    if (selectedPurposes.includes(id)) {
      setSelectedPurposes(selectedPurposes.filter(item => item !== id));
    } else {
      setSelectedPurposes([...selectedPurposes, id]);
    }
  };
  
  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(item => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };
  
  const isNextDisabled = () => {
    if (step === 1 && selectedPurposes.length === 0) return true;
    if (step === 2 && selectedInterests.length === 0) return true;
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-md sm:max-w-lg bg-dark-bg-secondary border-dark-border-primary">
        <div className="flex flex-col h-full">
          {step === 0 && (
            <div className="relative h-60 overflow-hidden">
              <img 
                src={screens[0].image} 
                alt="Welcome to Vaya" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  {screens[0].title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/80"
                >
                  {screens[0].description}
                </motion.p>
              </div>
            </div>
          )}

          {step > 0 && (
            <div className="p-6 border-b border-dark-border-primary">
              <h2 className="text-xl font-semibold text-white">{screens[step].title}</h2>
              <p className="text-white/70 mt-1">{screens[step].description}</p>
            </div>
          )}

          <div className="p-6 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {step === 0 && (
                  <div className="text-center space-y-4">
                    <p className="text-white/80">
                      Vaya helps you preserve and share your family's legacy through memories, stories, and meaningful connections.
                    </p>
                    <div className="flex justify-center">
                      <img 
                        src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png" 
                        alt="Vaya Logo" 
                        className="w-24 h-24"
                      />
                    </div>
                    <p className="text-white/80">
                      Let's personalize your experience to make it perfect for your family.
                    </p>
                  </div>
                )}

                {step === 1 && (
                  <div className="grid grid-cols-2 gap-3">
                    {purposeOptions.map((purpose) => (
                      <button
                        key={purpose.id}
                        onClick={() => togglePurpose(purpose.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                          selectedPurposes.includes(purpose.id)
                            ? "bg-dark-accent-blue/20 border-dark-accent-blue text-white"
                            : "border-dark-border-primary bg-dark-bg-elevated text-white/70 hover:bg-dark-bg-input"
                        }`}
                      >
                        <div className={`p-2 rounded-full mb-2 ${
                          selectedPurposes.includes(purpose.id)
                            ? "bg-dark-accent-blue/20"
                            : "bg-dark-bg-secondary"
                        }`}>
                          {purpose.icon}
                        </div>
                        <span className="text-sm">{purpose.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`px-4 py-2 rounded-full transition-all text-sm ${
                          selectedInterests.includes(interest.id)
                            ? "bg-dark-accent-blue text-white"
                            : "bg-dark-bg-elevated text-white/70 hover:bg-dark-bg-input"
                        }`}
                      >
                        {interest.label}
                      </button>
                    ))}
                  </div>
                )}

                {step === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {featureOptions.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex flex-col items-center text-center p-4 rounded-lg bg-dark-bg-elevated border border-dark-border-primary"
                      >
                        <div className="p-3 rounded-full bg-dark-bg-secondary mb-3">
                          {feature.icon}
                        </div>
                        <h3 className="font-medium text-white mb-1">{feature.title}</h3>
                        <p className="text-white/70 text-sm">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-4 border-t border-dark-border-primary flex justify-between items-center">
            <div className="flex items-center gap-1">
              {screens.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === step ? "bg-dark-accent-blue" : "bg-dark-border-primary"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {step > 0 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-dark-border-primary text-white/70"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              )}
              <Button 
                onClick={handleNext}
                disabled={isNextDisabled()}
                className="bg-dark-accent-blue hover:bg-blue-600 text-white"
              >
                {step === screens.length - 1 ? (
                  <span>Get Started</span>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default VayaOnboarding;
