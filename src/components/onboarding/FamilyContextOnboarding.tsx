
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Globe, MapPin, Users, Heart, Calendar, Sparkles, Scroll, Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface FamilyContextData {
  ancestralRegion: string;
  currentLocation: string;
  languages: string[];
  familySize: string;
  traditions: string[];
  importantValues: string[];
  significantEvents: string[];
  familyRecipes: string;
  specialHeirlooms: string;
  culturalIdentity: string;
  religiousPractices: string[];
  migrationStory: string;
  familyElders: string[];
}

type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  fields: JSX.Element;
};

export function FamilyContextOnboarding({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { isSpanish } = useLanguage();
  const [formData, setFormData] = useState<FamilyContextData>({
    ancestralRegion: "",
    currentLocation: "",
    languages: [],
    familySize: "medium",
    traditions: [],
    importantValues: [],
    significantEvents: [],
    familyRecipes: "",
    specialHeirlooms: "",
    culturalIdentity: "",
    religiousPractices: [],
    migrationStory: "",
    familyElders: [],
  });

  const handleInputChange = (field: keyof FamilyContextData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (field: keyof FamilyContextData, value: string) => {
    if (!value.trim()) return;
    
    setFormData((prev) => {
      const currentArray = prev[field] as string[];
      if (currentArray.includes(value)) return prev;
      return { ...prev, [field]: [...currentArray, value] };
    });
  };

  const handleRemoveArrayItem = (field: keyof FamilyContextData, item: string) => {
    setFormData((prev) => {
      const currentArray = prev[field] as string[];
      return { ...prev, [field]: currentArray.filter(i => i !== item) };
    });
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleSave();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // If not logged in, still save to local storage for now
        localStorage.setItem('familyContextData', JSON.stringify(formData));
        toast({
          title: "Profile saved locally",
          description: "Your family context has been saved to this device.",
        });
        onOpenChange(false);
        return;
      }
      
      // Save to Supabase if user is logged in
      const { error } = await supabase
        .from('user_family_context')
        .upsert({
          user_id: user.id,
          context_data: formData,
          created_at: new Date().toISOString(),
        });
      
      if (error) throw error;
      
      toast({
        title: "Profile saved successfully",
        description: "Your family context has been saved to your profile.",
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving family context:", error);
      toast({
        title: "Error saving profile",
        description: "There was a problem saving your family context. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Define the steps of the onboarding flow
  const steps: OnboardingStep[] = [
    {
      id: "heritage",
      title: isSpanish ? "Herencia Cultural" : "Cultural Heritage",
      description: isSpanish 
        ? "Cuéntanos sobre las raíces culturales de tu familia"
        : "Tell us about your family's cultural roots",
      icon: <Globe className="h-6 w-6 text-lovable-magenta" />,
      fields: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="culturalIdentity">
              {isSpanish ? "Identidad cultural" : "Cultural identity"}
            </Label>
            <Input 
              id="culturalIdentity"
              placeholder={isSpanish ? "Ej. Gujarati, Norte de India, Indo-Americano" : "E.g. Gujarati, North Indian, Indian-American"}
              value={formData.culturalIdentity}
              onChange={(e) => handleInputChange("culturalIdentity", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="ancestralRegion">
              {isSpanish ? "Región ancestral" : "Ancestral region"}
            </Label>
            <Input 
              id="ancestralRegion"
              placeholder={isSpanish ? "Ej. Gujarat, Punjab, Rajasthan" : "E.g. Gujarat, Punjab, Rajasthan"}
              value={formData.ancestralRegion}
              onChange={(e) => handleInputChange("ancestralRegion", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="currentLocation">
              {isSpanish ? "Ubicación actual" : "Current location"}
            </Label>
            <Input 
              id="currentLocation"
              placeholder={isSpanish ? "Ej. Toronto, Londres, Mumbai" : "E.g. Toronto, London, Mumbai"}
              value={formData.currentLocation}
              onChange={(e) => handleInputChange("currentLocation", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      )
    },
    {
      id: "languages",
      title: isSpanish ? "Idiomas Familiares" : "Family Languages",
      description: isSpanish 
        ? "¿Qué idiomas son importantes en tu familia?"
        : "What languages are important in your family?",
      icon: <Scroll className="h-6 w-6 text-lovable-blue" />,
      fields: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="languageInput">
              {isSpanish ? "Añadir idioma" : "Add language"}
            </Label>
            <div className="flex mt-1">
              <Input 
                id="languageInput"
                placeholder={isSpanish ? "Ej. Gujarati, Hindi, Inglés" : "E.g. Gujarati, Hindi, English"}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleArrayInputChange("languages", e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <Button 
                type="button" 
                variant="outline" 
                className="ml-2"
                onClick={(e) => {
                  const input = document.getElementById('languageInput') as HTMLInputElement;
                  handleArrayInputChange("languages", input.value);
                  input.value = '';
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.languages.map((lang) => (
              <div key={lang} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <span className="text-sm">{lang}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 ml-1"
                  onClick={() => handleRemoveArrayItem("languages", lang)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "traditions",
      title: isSpanish ? "Tradiciones Familiares" : "Family Traditions",
      description: isSpanish 
        ? "Comparte las tradiciones importantes en tu familia"
        : "Share the important traditions in your family",
      icon: <Calendar className="h-6 w-6 text-lovable-yellow" />,
      fields: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="traditionInput">
              {isSpanish ? "Añadir tradición o festival" : "Add tradition or festival"}
            </Label>
            <div className="flex mt-1">
              <Input 
                id="traditionInput"
                placeholder={isSpanish ? "Ej. Diwali, Navratri, Raksha Bandhan" : "E.g. Diwali, Navratri, Raksha Bandhan"}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleArrayInputChange("traditions", e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <Button 
                type="button" 
                variant="outline" 
                className="ml-2"
                onClick={(e) => {
                  const input = document.getElementById('traditionInput') as HTMLInputElement;
                  handleArrayInputChange("traditions", input.value);
                  input.value = '';
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.traditions.map((tradition) => (
              <div key={tradition} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <span className="text-sm">{tradition}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 ml-1"
                  onClick={() => handleRemoveArrayItem("traditions", tradition)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Label htmlFor="religiousPracticesInput">
              {isSpanish ? "Prácticas religiosas" : "Religious practices"}
            </Label>
            <div className="flex mt-1">
              <Input 
                id="religiousPracticesInput"
                placeholder={isSpanish ? "Ej. Puja diaria, visitas al templo" : "E.g. Daily puja, temple visits"}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleArrayInputChange("religiousPractices", e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <Button 
                type="button" 
                variant="outline" 
                className="ml-2"
                onClick={(e) => {
                  const input = document.getElementById('religiousPracticesInput') as HTMLInputElement;
                  handleArrayInputChange("religiousPractices", input.value);
                  input.value = '';
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.religiousPractices.map((practice) => (
              <div key={practice} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <span className="text-sm">{practice}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 ml-1"
                  onClick={() => handleRemoveArrayItem("religiousPractices", practice)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "values",
      title: isSpanish ? "Valores Familiares" : "Family Values",
      description: isSpanish 
        ? "¿Qué valores son más importantes en tu familia?"
        : "What values are most important in your family?",
      icon: <Heart className="h-6 w-6 text-lovable-red" />,
      fields: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="valueInput">
              {isSpanish ? "Añadir valor" : "Add value"}
            </Label>
            <div className="flex mt-1">
              <Input 
                id="valueInput"
                placeholder={isSpanish ? "Ej. Respeto a los mayores, Educación" : "E.g. Respect for elders, Education"}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleArrayInputChange("importantValues", e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <Button 
                type="button" 
                variant="outline" 
                className="ml-2"
                onClick={(e) => {
                  const input = document.getElementById('valueInput') as HTMLInputElement;
                  handleArrayInputChange("importantValues", input.value);
                  input.value = '';
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.importantValues.map((value) => (
              <div key={value} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <span className="text-sm">{value}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 ml-1"
                  onClick={() => handleRemoveArrayItem("importantValues", value)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "family-members",
      title: isSpanish ? "Miembros de la Familia" : "Family Members",
      description: isSpanish 
        ? "Cuéntanos sobre los miembros importantes de tu familia"
        : "Tell us about important members of your family",
      icon: <Users className="h-6 w-6 text-lovable-teal" />,
      fields: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="familySize">
              {isSpanish ? "Tamaño de la familia" : "Family size"}
            </Label>
            <RadioGroup 
              id="familySize" 
              className="flex space-x-4 mt-2"
              value={formData.familySize}
              onValueChange={(value) => handleInputChange("familySize", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small">{isSpanish ? "Pequeño" : "Small"}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">{isSpanish ? "Medio" : "Medium"}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large">{isSpanish ? "Grande" : "Large"}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="extended" id="extended" />
                <Label htmlFor="extended">{isSpanish ? "Extendido" : "Extended"}</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="elderInput">
              {isSpanish ? "Añadir miembro mayor influyente" : "Add influential elder"}
            </Label>
            <div className="flex mt-1">
              <Input 
                id="elderInput"
                placeholder={isSpanish ? "Ej. Abuela Meena, Tío Raj" : "E.g. Grandmother Meena, Uncle Raj"}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleArrayInputChange("familyElders", e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <Button 
                type="button" 
                variant="outline" 
                className="ml-2"
                onClick={(e) => {
                  const input = document.getElementById('elderInput') as HTMLInputElement;
                  handleArrayInputChange("familyElders", input.value);
                  input.value = '';
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.familyElders.map((elder) => (
              <div key={elder} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <span className="text-sm">{elder}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 ml-1"
                  onClick={() => handleRemoveArrayItem("familyElders", elder)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "special-items",
      title: isSpanish ? "Recuerdos Especiales" : "Special Memories",
      description: isSpanish 
        ? "Comparte objetos y recuerdos significativos de tu familia"
        : "Share significant objects and memories from your family",
      icon: <Sparkles className="h-6 w-6 text-lovable-purple" />,
      fields: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="familyRecipes">
              {isSpanish ? "Recetas familiares especiales" : "Special family recipes"}
            </Label>
            <Textarea 
              id="familyRecipes"
              placeholder={isSpanish ? "Ej. El thepla de la abuela, masala chai especial" : "E.g. Grandmother's thepla, special masala chai"}
              value={formData.familyRecipes}
              onChange={(e) => handleInputChange("familyRecipes", e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="specialHeirlooms">
              {isSpanish ? "Objetos familiares con historia" : "Family heirlooms with history"}
            </Label>
            <Textarea 
              id="specialHeirlooms"
              placeholder={isSpanish ? "Ej. Joyería antigua, instrumentos musicales, artefactos religiosos" : "E.g. Antique jewelry, musical instruments, religious artifacts"}
              value={formData.specialHeirlooms}
              onChange={(e) => handleInputChange("specialHeirlooms", e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="migrationStory">
              {isSpanish ? "Historia de migración familiar" : "Family migration story"}
            </Label>
            <Textarea 
              id="migrationStory"
              placeholder={isSpanish ? "Ej. Cómo tu familia se mudó de Gujarat a Londres en los años 70" : "E.g. How your family moved from Gujarat to London in the 1970s"}
              value={formData.migrationStory}
              onChange={(e) => handleInputChange("migrationStory", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      )
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white">
        <div className="flex h-full">
          {/* Sidebar with steps */}
          <div className="hidden md:block w-1/4 bg-gray-50 p-4 border-r">
            <div className="space-y-2">
              {steps.map((s, index) => (
                <button
                  key={s.id}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center ${
                    step === index
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setStep(index)}
                >
                  {index < step ? (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  ) : (
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                      step === index ? "bg-white text-primary" : "bg-gray-200 text-gray-500"
                    }`}>
                      <span className="text-xs">{index + 1}</span>
                    </div>
                  )}
                  <span className="truncate">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col max-h-[80vh]">
            <DialogHeader className="px-6 pt-6 pb-2">
              <div className="flex items-center mb-2">
                {steps[step].icon}
                <DialogTitle className="ml-2 text-xl">{steps[step].title}</DialogTitle>
              </div>
              <DialogDescription>
                {steps[step].description}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 px-6 py-4 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={steps[step].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {steps[step].fields}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-4 border-t flex justify-between items-center">
              <div className="md:hidden flex items-center gap-1">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === step ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  {isSpanish ? "Atrás" : "Back"}
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={saving}
                >
                  {step === steps.length - 1 ? (
                    saving ? (
                      <span>{isSpanish ? "Guardando..." : "Saving..."}</span>
                    ) : (
                      <span>{isSpanish ? "Finalizar" : "Finish"}</span>
                    )
                  ) : (
                    <>
                      {isSpanish ? "Siguiente" : "Next"}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
