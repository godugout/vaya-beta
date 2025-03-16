
import { FamilyTitle } from "./header/FamilyTitle";
import { FamilyEditButton } from "./header/FamilyEditButton";

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
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <FamilyTitle 
        familyName={familyName} 
        familyDescription={familyDescription} 
      />
      
      {isAdmin && <FamilyEditButton familyId={familyId} />}
    </div>
  );
}
