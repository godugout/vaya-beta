
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface FamilyEditButtonProps {
  familyId: string;
}

export function FamilyEditButton({ familyId }: FamilyEditButtonProps) {
  const navigate = useNavigate();
  
  return (
    <Button 
      variant="outline" 
      className="flex items-center"
      onClick={() => navigate(`/edit-family/${familyId}`)}
    >
      <Edit className="h-4 w-4 mr-2" />
      Edit Family
    </Button>
  );
}
