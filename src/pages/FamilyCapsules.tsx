
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/animation/PageTransition";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { CapsuleFilters } from "@/components/capsule/CapsuleFilters";
import { CapsuleScrollSection } from "@/components/capsule/sections/CapsuleScrollSection";
import { useCapsules } from "@/components/capsule/useCapsules";
import { CapsuleStatus } from "@/types/capsule";
import { Plus, MicrophoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingIndicator } from "@/components/animation/LoadingIndicator";
import { ModernCard } from "@/components/ui/modern-card";
import { PatternBackground } from "@/components/ui/pattern-background";

const FamilyCapsules = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<CapsuleStatus[]>([]);
  
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useCapsules(
    statusFilter.length > 0 ? statusFilter as string[] : undefined
  );

  const allCapsules = data?.pages.flatMap((page) => page.capsules) || [];
  
  const handleFilterChange = (selected: CapsuleStatus[]) => {
    setStatusFilter(selected);
  };

  const handleCreateCapsule = () => {
    navigate("/create-capsule");
  };

  return (
    <PageTransition location="family-capsules">
      <div className="min-h-screen bg-background">
        <PageHeader
          title="Family Memory Capsules"
          description="Preserve and share your cherished family memories through voice stories"
          background="hanuman"
          actions={
            <div className="flex gap-4">
              <Button onClick={handleCreateCapsule} size="lg" variant="hanuman">
                <MicrophoneIcon className="h-5 w-5 mr-2" />
                Record Story
              </Button>
              <Button onClick={handleCreateCapsule} size="lg" variant="sacred-teal">
                <Plus className="h-5 w-5 mr-2" />
                Create Capsule
              </Button>
            </div>
          }
        />

        <SectionContainer maxWidth="7xl" className="space-y-6">
          <ModernCard variant="modern" withPattern>
            <CapsuleFilters 
              statusFilter={statusFilter} 
              onFilterChange={handleFilterChange} 
            />
          </ModernCard>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoadingIndicator size="lg" />
            </div>
          ) : allCapsules.length === 0 ? (
            <ModernCard variant="modern" className="p-12 text-center">
              <PatternBackground pattern="sacred" opacity="light" />
              <div className="mx-auto w-24 h-24 bg-hanuman/10 dark:bg-hanuman/20 rounded-full flex items-center justify-center mb-4">
                <MicrophoneIcon className="w-12 h-12 text-hanuman" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Your Family Legacy</h3>
              <p className="text-muted-foreground mb-6">
                Begin preserving your family memories by recording your first story
              </p>
              <Button onClick={handleCreateCapsule} variant="hanuman">
                Record Your First Story
              </Button>
            </ModernCard>
          ) : (
            <CapsuleScrollSection 
              capsules={allCapsules.map((capsule) => ({
                ...capsule,
                link: `/capsule/${capsule.id}`,
                icon: getIconForStatus(capsule.status as CapsuleStatus),
                colorKey: getColorKeyForStatus(capsule.status as CapsuleStatus),
                metadata: {
                  creatorInitials: capsule.creator?.name?.substring(0, 2).toUpperCase() || "?",
                  itemCount: capsule.item_count || 0,
                  status: capsule.status as CapsuleStatus,
                  date: capsule.reveal_date || capsule.created_at
                }
              }))} 
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </SectionContainer>
      </div>
    </PageTransition>
  );
};

export default FamilyCapsules;
