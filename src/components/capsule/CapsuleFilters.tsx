
import { Filters, FilterButton } from "@/components/ui/filters";
import { CapsuleStatus } from "@/types/capsule";

interface CapsuleFiltersProps {
  statusFilter: CapsuleStatus[];
  onFilterChange: (value: CapsuleStatus[]) => void;
}

export const CapsuleFilters = ({ statusFilter, onFilterChange }: CapsuleFiltersProps) => {
  const toggleFilter = (status: CapsuleStatus) => {
    if (statusFilter.includes(status)) {
      onFilterChange(statusFilter.filter(s => s !== status));
    } else {
      onFilterChange([...statusFilter, status]);
    }
  };

  return (
    <Filters searchPlaceholder="Search family stories...">
      <FilterButton 
        active={statusFilter.includes("upcoming")} 
        onClick={() => toggleFilter("upcoming")}
        variant="hanuman"
      >
        Not Started
      </FilterButton>
      
      <FilterButton 
        active={statusFilter.includes("active")} 
        onClick={() => toggleFilter("active")}
        variant="kelly"
      >
        Recording
      </FilterButton>
      
      <FilterButton 
        active={statusFilter.includes("locked")} 
        onClick={() => toggleFilter("locked")}
        variant="sacred-teal"
      >
        In Progress
      </FilterButton>
      
      <FilterButton 
        active={statusFilter.includes("revealed")} 
        onClick={() => toggleFilter("revealed")}
        variant="sunshine"
      >
        Complete
      </FilterButton>
    </Filters>
  );
};
