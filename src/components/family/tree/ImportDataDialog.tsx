
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileInput } from "./FileInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, Table, Upload } from "lucide-react";

interface ImportDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportData: (data: any) => void;
}

export const ImportDataDialog = ({ 
  open, 
  onOpenChange, 
  onImportData 
}: ImportDataDialogProps) => {
  const [importMethod, setImportMethod] = useState('file');
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleImport = async () => {
    setProcessing(true);
    
    try {
      if (importMethod === 'file' && file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          try {
            // For CSV files
            if (file.name.endsWith('.csv')) {
              // Simple CSV parsing - in a real app, use a proper CSV parser
              const text = e.target?.result as string;
              const lines = text.split('\n');
              const headers = lines[0].split(',');
              
              const data = lines.slice(1).map(line => {
                const values = line.split(',');
                return headers.reduce((obj, header, i) => {
                  obj[header.trim()] = values[i]?.trim() || '';
                  return obj;
                }, {} as Record<string, string>);
              });
              
              onImportData(data);
            } 
            // For JSON files
            else if (file.name.endsWith('.json')) {
              const jsonData = JSON.parse(e.target?.result as string);
              onImportData(jsonData);
            } 
            // For Excel files - in a real app, you'd use a library like xlsx
            else if (file.name.endsWith('.xlsx')) {
              // Placeholder for Excel parsing - would use xlsx in production
              alert('Excel parsing would be implemented in production');
            }
          } catch (error) {
            console.error('Error parsing file:', error);
            alert('Error parsing file. Please check the format.');
          } finally {
            setProcessing(false);
            onOpenChange(false);
          }
        };
        
        reader.onerror = () => {
          alert('Error reading file');
          setProcessing(false);
        };
        
        if (file.name.endsWith('.csv') || file.name.endsWith('.json')) {
          reader.readAsText(file);
        } else {
          reader.readAsArrayBuffer(file);
        }
      } else if (importMethod === 'json' && jsonData.trim()) {
        try {
          const data = JSON.parse(jsonData);
          onImportData(data);
          onOpenChange(false);
        } catch (error) {
          alert('Invalid JSON format');
        } finally {
          setProcessing(false);
        }
      } else {
        setProcessing(false);
      }
    } catch (error) {
      console.error('Import error:', error);
      setProcessing(false);
      alert('An error occurred during import');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Import Family Data</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="file" onValueChange={setImportMethod}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file" className="flex items-center gap-2">
              <FileUp className="h-4 w-4" />
              <span>File Upload</span>
            </TabsTrigger>
            <TabsTrigger value="json" className="flex items-center gap-2">
              <Table className="h-4 w-4" />
              <span>Paste JSON</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="file" className="py-4">
            <div className="space-y-4">
              <FileInput onFileSelected={handleFileUpload} />
              
              {file && (
                <div className="text-sm text-green-600 dark:text-green-400">
                  File selected: {file.name}
                </div>
              )}
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Supported formats:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>CSV (.csv)</li>
                  <li>JSON (.json)</li>
                  <li>Excel (.xlsx) - Coming soon</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="json" className="py-4">
            <div className="space-y-4">
              <Textarea
                placeholder={`Paste your JSON data here...\n{\n  "members": [\n    {"name": "John Doe", "role": "parent"},\n    {"name": "Jane Doe", "role": "parent"}\n  ]\n}`}
                className="h-[200px] font-mono text-sm"
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleImport}
            disabled={processing || (importMethod === 'file' && !file) || (importMethod === 'json' && !jsonData.trim())}
          >
            {processing ? 'Processing...' : 'Import Data'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
