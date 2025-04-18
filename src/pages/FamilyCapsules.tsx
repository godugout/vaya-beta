
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/animation/PageTransition";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { CapsuleFilters } from "@/components/capsule/CapsuleFilters";
import { CapsuleScrollSection } from "@/components/capsule/sections/CapsuleScrollSection";
import { useCapsules } from "@/components/capsule/useCapsules";
import { CapsuleStatus } from "@/types/capsule";
import { Plus, Package, Calendar, Gift } from "lucide-react";
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

  // Helper function to get appropriate icon for capsule status
  const getIconForStatus = (status: CapsuleStatus) => {
    switch (status) {
      case 'upcoming':
        return Calendar;
      case 'locked':
        return Package;
      case 'active':
        return Gift;
      case 'revealed':
        return Gift;
      default:
        return Package;
    }
  };

  // Helper function to get color key for capsule status
  const getColorKeyForStatus = (status: CapsuleStatus) => {
    switch (status) {
      case 'upcoming':
        return 'sacred-teal';
      case 'locked':
        return 'hanuman';
      case 'active':
        return 'kelly';
      case 'revealed':
        return 'sunshine';
      default:
        return 'sacred-teal';
    }
  };

  return (
    <PageTransition location="family-capsules">
      <div className="min-h-screen bg-background">
        <PageHeader
          title="Family Capsules"
          description="Create and manage your family's digital time capsules"
          background="hanuman"
          actions={
            <Button onClick={handleCreateCapsule} size="lg" variant="hanuman">
              <Plus className="h-4 w-4 mr-2" />
              Create Capsule
            </Button>
          }
        />

        <SectionContainer maxWidth="7xl" className="space-y-6">
          <ModernCard variant="modern" withPattern className="overflow-visible">
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
              <PatternBackground pattern="family-languages" opacity="light" />
              <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No capsules found</h3>
              <p className="text-muted-foreground mb-6">Start creating memory capsules for your family</p>
              <Button onClick={handleCreateCapsule} variant="hanuman">Create Your First Capsule</Button>
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
