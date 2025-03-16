
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface FamilyDetailHeaderProps {
  familyName: string;
  familyDescription: string | null;
  isAdmin: boolean;
  familyId: string;
}

export function FamilyDetailHeader({
  familyName,
  familyDescription,
  isAdmin,
  familyId
}: FamilyDetailHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">{familyName}</h1>
        {familyDescription && (
          <p className="text-gray-500 dark:text-gray-400 mt-1">{familyDescription}</p>
        )}
      </div>
      
      {isAdmin && (
        <Button 
          variant="outline" 
          className="flex items-center"
          onClick={() => navigate(`/edit-family/${familyId}`)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Family
        </Button>
      )}
    </div>
  );
}
