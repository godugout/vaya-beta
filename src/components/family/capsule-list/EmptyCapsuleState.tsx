
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const EmptyCapsuleState = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12 bg-card dark:bg-gray-800 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-2">No capsules found</h3>
      <p className="text-muted-foreground mb-6">
        Create your first memory capsule to preserve special moments
      </p>
      <Button onClick={() => navigate('/create-capsule')}>
        Create Your First Capsule
      </Button>
    </div>
  );
};
