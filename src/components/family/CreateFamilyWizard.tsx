
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Type definitions
type WizardStep = "name" | "description" | "members" | "confirmation";

export function CreateFamilyWizard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<WizardStep>("name");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    members: [] as string[]
  });
  const [loading, setLoading] = useState(false);

  const handleNextStep = () => {
    if (step === "name") setStep("description");
    else if (step === "description") setStep("members");
    else if (step === "members") setStep("confirmation");
  };

  const handlePreviousStep = () => {
    if (step === "description") setStep("name");
    else if (step === "members") setStep("description");
    else if (step === "confirmation") setStep("members");
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Create the family
      const { data: familyData, error: familyError } = await supabase
        .from('families')
        .insert([
          { 
            name: formData.name, 
            description: formData.description 
          }
        ])
        .select()
        .single();

      if (familyError) throw familyError;

      // Add current user as admin
      const user = await supabase.auth.getUser();
      
      if (user.error) throw user.error;
      
      const { error: memberError } = await supabase
        .from('family_members')
        .insert([
          { 
            family_id: familyData.id, 
            user_id: user.data.user?.id,
            role: "admin" 
          }
        ]);

      if (memberError) throw memberError;

      toast({
        title: "Success!",
        description: "Your family has been created successfully.",
      });
      
      navigate(`/families`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Component UI render
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        {step === "name" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Family Name</h2>
            <p className="text-muted-foreground">
              What would you like to call your family group?
            </p>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full"
              placeholder="Enter family name"
            />
          </div>
        )}

        {step === "description" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Family Description</h2>
            <p className="text-muted-foreground">
              Add a short description about your family (optional)
            </p>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Enter family description"
            />
          </div>
        )}

        {step === "members" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Invite Family Members</h2>
            <p className="text-muted-foreground">
              You can invite family members after creating your family group.
            </p>
            {/* Member invitation UI would go here */}
          </div>
        )}

        {step === "confirmation" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Confirm Family Creation</h2>
            <div className="p-4 border rounded bg-muted">
              <h3 className="font-semibold">Family Name:</h3>
              <p>{formData.name}</p>
              
              {formData.description && (
                <>
                  <h3 className="font-semibold mt-2">Description:</h3>
                  <p>{formData.description}</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          disabled={step === "name" || loading}
        >
          Back
        </Button>
        
        {step !== "confirmation" ? (
          <Button
            onClick={handleNextStep}
            disabled={step === "name" && !formData.name.trim() || loading}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Family"}
          </Button>
        )}
      </div>
    </div>
  );
}
