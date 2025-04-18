
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
    <Filters searchPlaceholder="Search capsules...">
      <FilterButton 
        active={statusFilter.includes("upcoming")} 
        onClick={() => toggleFilter("upcoming")}
        variant="sacred-teal"
      >
        Upcoming
      </FilterButton>
      
      <FilterButton 
        active={statusFilter.includes("active")} 
        onClick={() => toggleFilter("active")}
        variant="kelly"
      >
        Active
      </FilterButton>
      
      <FilterButton 
        active={statusFilter.includes("locked")} 
        onClick={() => toggleFilter("locked")}
        variant="hanuman"
      >
        Locked
      </FilterButton>
      
      <FilterButton 
        active={statusFilter.includes("revealed")} 
        onClick={() => toggleFilter("revealed")}
        variant="sunshine"
      >
        Revealed
      </FilterButton>
    </Filters>
  );
};
