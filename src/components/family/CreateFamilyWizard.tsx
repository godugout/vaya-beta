import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Users, ArrowRight, Check } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    title: "Create Your Family",
    description: "Start by giving your family group a name and description.",
  },
  {
    title: "Almost Done",
    description: "Review your family details before creating.",
  },
];

export function CreateFamilyWizard({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Insert the family
      const { data: familyData, error: familyError } = await supabase
        .from('vaya_families')
        .insert([
          { name: formData.name, description: formData.description }
        ])
        .select()
        .single();

      if (familyError) throw familyError;

      // Add the creator as an admin
      const { error: memberError } = await supabase
        .from('vaya_family_members')
        .insert([
          { 
            family_id: familyData.id,
            user_id: (await supabase.auth.getUser()).data.user?.id,
            role: 'admin'
          }
        ]);

      if (memberError) throw memberError;

      toast({
        title: "Family created!",
        description: "Your family has been created successfully.",
      });

      navigate("/families");
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

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Users className="h-6 w-6" />
            {steps[step].title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 
                    ${i <= step ? 'border-vaya-home bg-vaya-home text-white' : 'border-gray-300'}`}>
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-[2px] w-16 ${i < step ? 'bg-vaya-home' : 'bg-gray-300'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="space-y-6 py-4">
            {step === 0 && (
              <>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Family Name
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your family name"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description (Optional)
                  </label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Tell us a bit about your family"
                    className="w-full"
                  />
                </div>
              </>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="font-medium">Family Name</h3>
                  <p className="text-gray-600">{formData.name}</p>
                  {formData.description && (
                    <>
                      <h3 className="mt-4 font-medium">Description</h3>
                      <p className="text-gray-600">{formData.description}</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => step === 0 ? onOpenChange(false) : prevStep()}
            >
              {step === 0 ? "Cancel" : "Back"}
            </Button>
            <Button
              onClick={() => step === steps.length - 1 ? handleSubmit() : nextStep()}
              disabled={step === 0 && !formData.name || loading}
              className="gap-2"
            >
              {loading ? (
                "Creating..."
              ) : step === steps.length - 1 ? (
                "Create Family"
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
