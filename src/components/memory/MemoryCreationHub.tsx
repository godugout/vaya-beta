
import { useState } from "react";
import { Card } from "@/components/ui/card";
import MemoryTypeCard from "./memory-creation/MemoryTypeCard";
import QuickStartDialog from "./memory-creation/QuickStartDialog";
import { memoryTypes } from "./memory-creation/memoryTypes";

interface MemoryCreationHubProps {
  onStartImmersiveRecording: () => void;
  onOpenMemoryModal: () => void;
}

const MemoryCreationHub = ({ 
  onStartImmersiveRecording,
  onOpenMemoryModal
}: MemoryCreationHubProps) => {
  const [isQuickDialogOpen, setIsQuickDialogOpen] = useState(false);
  const [activeMethod, setActiveMethod] = useState<"voice" | "text" | "photo">("voice");

  const handleQuickStart = (method: "voice" | "text" | "photo") => {
    setActiveMethod(method);
    setIsQuickDialogOpen(true);
  };

  const handleCardClick = (type: string) => {
    if (type === "voice") {
      onStartImmersiveRecording();
    } else {
      onOpenMemoryModal();
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {memoryTypes.map((type) => (
              <MemoryTypeCard
                key={type.id}
                {...type}
                onCardClick={() => handleCardClick(type.id)}
                onQuickStart={() => handleQuickStart(type.id as "voice" | "text" | "photo")}
              />
            ))}
          </div>
        </div>
      </Card>

      <QuickStartDialog
        isOpen={isQuickDialogOpen}
        onClose={() => setIsQuickDialogOpen(false)}
        activeMethod={activeMethod}
        onComplete={() => setIsQuickDialogOpen(false)}
      />
    </div>
  );
};

export default MemoryCreationHub;
