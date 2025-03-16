
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { seedPatelFamily } from "@/utils/seedPatelFamily";
import { Plus, Loader2 } from "lucide-react";
import { UserFamiliesSection } from "@/components/profile/UserFamiliesSection";
import { ProfilesSection } from "@/components/profile/ProfilesSection";

export default function Profile() {
  const { toast } = useToast();
  const [seeding, setSeeding] = useState(false);

  const handleSeedPatelFamily = async () => {
    setSeeding(true);
    try {
      const result = await seedPatelFamily();
      if (result.success) {
        toast({
          title: "Success",
          description: "Patel family members have been added successfully",
        });
        // Force page refresh to show the newly added profiles
        window.location.reload();
      } else {
        throw new Error("Failed to seed Patel family");
      }
    } catch (error: any) {
      console.error("Error seeding Patel family:", error);
      toast({
        title: "Error",
        description: "Failed to seed Patel family members",
        variant: "destructive",
      });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="container max-w-6xl py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-vaya-text-primary dark:text-dark-text-primary">
          Profile Database
        </h1>
        <Button 
          onClick={handleSeedPatelFamily} 
          disabled={seeding}
          className="flex items-center gap-2"
        >
          {seeding ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Seeding...</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Seed Patel Family</span>
            </>
          )}
        </Button>
      </div>
      
      <UserFamiliesSection />
      <ProfilesSection />
    </div>
  );
}
