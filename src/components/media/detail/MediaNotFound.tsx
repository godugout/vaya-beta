
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaNotFoundProps {
  onBack: () => void;
}

export const MediaNotFound = ({ onBack }: MediaNotFoundProps) => {
  return (
    <div className="text-center py-12">
      <Info className="h-8 w-8 mx-auto text-gray-400 mb-2" />
      <h3 className="text-lg font-medium">Media not found</h3>
      <p className="text-gray-500 mb-4">The requested media could not be found</p>
      <Button onClick={onBack}>Back to gallery</Button>
    </div>
  );
};
