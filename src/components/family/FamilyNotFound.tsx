
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function FamilyNotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="text-center p-8">
      <h2 className="text-xl font-semibold">Family not found</h2>
      <p className="mt-2">The family you're looking for doesn't exist or you don't have access to it.</p>
      <Button 
        className="mt-4"
        onClick={() => navigate("/families")}
      >
        Back to Families
      </Button>
    </div>
  );
}
