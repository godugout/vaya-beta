
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileUploadTab } from "./import/FileUploadTab";
import { JsonInputTab } from "./import/JsonInputTab";
import { ErrorDisplay } from "./import/ErrorDisplay";
import { parseCSVFile, parseJSONFile, parseExcelFile } from "./import/importUtils";

export interface ImportDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportData: (data: any) => void;
}

export const ImportDataDialog = ({
  open,
  onOpenChange,
  onImportData,
}: ImportDataDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('file');

  const handleFileUpload = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleImport = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      if (activeTab === 'file' && file) {
        let data;
        if (file.name.endsWith('.csv')) {
          data = await parseCSVFile(file);
        } else if (file.name.endsWith('.json')) {
          data = await parseJSONFile(file);
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          data = await parseExcelFile(file);
        } else {
          throw new Error('Unsupported file format. Please upload a CSV, JSON, or Excel file.');
        }
        
        onImportData(data);
        onOpenChange(false);
      } else if (activeTab === 'json' && jsonData.trim()) {
        try {
          const data = JSON.parse(jsonData);
          onImportData(data);
          onOpenChange(false);
        } catch (e) {
          throw new Error('Invalid JSON format. Please check your input.');
        }
      } else {
        throw new Error('Please upload a file or enter JSON data first.');
      }
    } catch (error) {
      console.error('Import error:', error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import Family Tree Data</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="file" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">Upload File</TabsTrigger>
            <TabsTrigger value="json">Paste JSON</TabsTrigger>
          </TabsList>
          
          <TabsContent value="file" className="py-4 space-y-4">
            <FileUploadTab 
              file={file} 
              handleFileUpload={handleFileUpload} 
            />
          </TabsContent>
          
          <TabsContent value="json" className="py-4 space-y-4">
            <JsonInputTab 
              jsonData={jsonData}
              setJsonData={setJsonData}
            />
          </TabsContent>
        </Tabs>
        
        <ErrorDisplay error={error} />
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={isLoading}>
            {isLoading ? 'Importing...' : 'Import Data'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
