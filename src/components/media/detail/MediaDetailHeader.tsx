
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaDetailHeaderProps {
  filePath: string;
  onBack: () => void;
}

export const MediaDetailHeader = ({ filePath, onBack }: MediaDetailHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <Button variant="ghost" size="sm" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to gallery
      </Button>
      
      <Button variant="outline" size="sm" asChild>
        <a href={filePath} download target="_blank" rel="noopener noreferrer">
          <Download className="h-4 w-4 mr-2" />
          Download
        </a>
      </Button>
    </div>
  );
};
