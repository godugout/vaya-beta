
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileInput } from "./FileInput";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { parseFamilyTreeData } from "./utils/treeDataParser";
import { useToast } from "@/components/ui/use-toast";

interface TreeUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDataParsed: (data: any) => void;
}

export const TreeUploadDialog = ({ 
  open, 
  onOpenChange, 
  onDataParsed 
}: TreeUploadDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setProcessing(true);
    setError(null);
    
    try {
      const parsedData = await parseFamilyTreeData(file);
      onDataParsed(parsedData);
      
      toast({
        title: "File processed successfully",
        description: `Family tree created from ${file.name}`,
      });
      
      onOpenChange(false);
    } catch (err) {
      console.error('Error parsing file:', err);
      setError(err instanceof Error ? err.message : 'Failed to parse file');
      
      toast({
        title: "Error processing file",
        description: err instanceof Error ? err.message : 'Failed to parse file',
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Family Tree from File</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <FileInput 
            onFileSelected={handleFileSelected} 
            className="bg-gray-800/30"
          />
          
          {file && (
            <div className="flex items-center space-x-2 text-sm text-green-400">
              <Check className="h-4 w-4" />
              <span>File selected: {file.name}</span>
            </div>
          )}
          
          {error && (
            <div className="flex items-start space-x-2 bg-red-500/10 text-red-400 p-3 rounded-md text-sm">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Error processing file</p>
                <p>{error}</p>
              </div>
            </div>
          )}
          
          <div className="bg-gray-800/60 rounded-md p-4 space-y-3">
            <h3 className="font-medium text-gray-200">Supported File Formats</h3>
            
            <div className="space-y-2 text-sm text-gray-300">
              <div>
                <p className="font-medium">JSON Format</p>
                <pre className="bg-gray-800 p-2 rounded text-xs mt-1 overflow-x-auto">
{`{
  "members": [
    { 
      "name": "John Smith", 
      "role": "parent",
      "children": ["Mary Smith", "James Smith"]
    },
    { "name": "Mary Smith", "role": "child" }
  ]
}`}
                </pre>
              </div>
              
              <div>
                <p className="font-medium">CSV Format</p>
                <pre className="bg-gray-800 p-2 rounded text-xs mt-1 overflow-x-auto">
{`name,role,parent
John Smith,parent,
Mary Smith,child,John Smith`}
                </pre>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={processing || !file}>
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Create Tree'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
