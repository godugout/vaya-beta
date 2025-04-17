
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CapsuleScrollSection } from "@/components/capsule/sections/CapsuleScrollSection";
import { CapsulePills } from "@/components/capsule/sections/CapsulePills";
import { useCapsules } from "@/components/capsule/useCapsules";
import { CapsuleData } from "@/components/capsule/types";
import { CapsuleStatus } from "@/types/capsule";
import { Button } from "@/components/ui/button";
import { Plus, Package, Calendar, Gift } from "lucide-react";
import { LoadingIndicator } from "@/components/animation/LoadingIndicator";

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
    // Navigate to create capsule page
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
        return 'blue';
      case 'locked':
        return 'amber';
      case 'active':
        return 'green';
      case 'revealed':
        return 'purple';
      default:
        return 'blue';
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="container mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-medium mb-4 sm:mb-0">Family Capsules</h1>
          <Button onClick={handleCreateCapsule} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Capsule
          </Button>
        </div>
        
        <CapsulePills statusFilter={statusFilter} onFilterChange={handleFilterChange} />
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <LoadingIndicator size="lg" />
          </div>
        ) : allCapsules.length === 0 ? (
          <div className="text-center py-12 bg-card dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No capsules found</h3>
            <p className="text-muted-foreground mb-6">Start creating memory capsules for your family</p>
            <Button onClick={handleCreateCapsule}>Create Your First Capsule</Button>
          </div>
        ) : (
          <CapsuleScrollSection 
            capsules={allCapsules.map((capsule: CapsuleData) => ({
              ...capsule,
              link: `/capsule/${capsule.id}`,
              icon: getIconForStatus(capsule.status as CapsuleStatus),
              colorKey: getColorKeyForStatus(capsule.status as CapsuleStatus),
              metadata: {
                creatorInitials: "FV", // This would need to be fetched from user profile
                itemCount: capsule.itemCount || 0,
                status: capsule.status as CapsuleStatus,
                date: capsule.reveal_date || capsule.created_at
              }
            }))} 
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </div>
    </div>
  );
};

export default FamilyCapsules;
