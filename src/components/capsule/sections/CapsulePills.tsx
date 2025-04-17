
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CapsuleStatus } from "@/types/capsule";

interface CapsulePillsProps {
  statusFilter: CapsuleStatus[];
  onFilterChange: (value: CapsuleStatus[]) => void;
}

export const CapsulePills = ({ statusFilter, onFilterChange }: CapsulePillsProps) => {
  return (
    <div className="mb-8">
      <ToggleGroup 
        type="multiple" 
        value={statusFilter}
        onValueChange={(value) => onFilterChange(value as CapsuleStatus[])}
        className="bg-white border rounded-lg p-1"
      >
        <ToggleGroupItem value="upcoming" aria-label="Show upcoming capsules">
          Upcoming
        </ToggleGroupItem>
        <ToggleGroupItem value="active" aria-label="Show active capsules">
          Active
        </ToggleGroupItem>
        <ToggleGroupItem value="locked" aria-label="Show locked capsules">
          Locked
        </ToggleGroupItem>
        <ToggleGroupItem value="revealed" aria-label="Show revealed capsules">
          Revealed
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
