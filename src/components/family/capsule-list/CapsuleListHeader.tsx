
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CapsuleListHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Capsules</h2>
      <Button 
        variant="outline" 
        onClick={() => navigate('/family-capsules')}
      >
        View All
      </Button>
    </div>
  );
};
