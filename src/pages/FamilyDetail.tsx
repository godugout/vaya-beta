
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { FamilyDetailHeader } from "@/components/family/FamilyDetailHeader";
import { FamilyNotFound } from "@/components/family/FamilyNotFound";
import { FamilyLoadingState } from "@/components/family/FamilyLoadingState";
import { FamilyTabsContent } from "@/components/family/FamilyTabsContent";
import { useFamilyDetail } from "@/hooks/useFamilyDetail";

export default function FamilyDetail() {
  const { familyId } = useParams<{ familyId: string }>();
  const { family, loading, isAdmin } = useFamilyDetail(familyId);

  return (
    <MainLayout>
      <div className="container py-8 max-w-6xl">
        {loading ? (
          <FamilyLoadingState />
        ) : family ? (
          <div className="space-y-8">
            <FamilyDetailHeader 
              familyName={family.name}
              familyDescription={family.description}
              isAdmin={isAdmin}
              familyId={family.id}
            />
            
            <FamilyTabsContent 
              family={family}
              isAdmin={isAdmin}
            />
          </div>
        ) : (
          <FamilyNotFound />
        )}
      </div>
    </MainLayout>
  );
}
