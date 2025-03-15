
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CustomLogoUploadProps {
  onLogoUploaded: (logoUrl: string) => void;
}

export const CustomLogoUpload = ({ onLogoUploaded }: CustomLogoUploadProps) => {
  const { toast } = useToast();

  const handleCustomLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onLogoUploaded(event.target.result as string);
        toast({
          title: "Logo Uploaded",
          description: "Your custom family logo has been uploaded.",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="border-t border-vaya-gray-200 pt-6">
      <h4 className="text-sm font-medium text-vaya-text-secondary mb-3">
        Upload Custom Logo
      </h4>
      <div className="flex justify-center">
        <div className="relative">
          <input 
            type="file" 
            id="logo-upload" 
            className="sr-only"
            accept="image/*"
            onChange={handleCustomLogoUpload}
          />
          <label 
            htmlFor="logo-upload"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-vaya-gray-100 hover:bg-vaya-gray-200 text-vaya-text-secondary rounded-lg transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Choose Image</span>
          </label>
        </div>
      </div>
    </div>
  );
};
