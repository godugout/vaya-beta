
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, Table } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { FileUploadTab } from './import/FileUploadTab';
import { JsonInputTab } from './import/JsonInputTab';
import { ErrorDisplay } from './import/ErrorDisplay';
import { parseCSVFile, parseJSONFile, parseExcelFile } from './import/importUtils';

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
  const { toast } = useToast();
  const [importMethod, setImportMethod] = useState('file');
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleImport = async () => {
    setProcessing(true);
    setError(null);
    
    try {
      if (importMethod === 'file' && file) {
        // For CSV files
        if (file.name.endsWith('.csv')) {
          const data = await parseCSVFile(file);
          onImportData(data);
          onOpenChange(false);
          toast({
            title: "Import successful",
            description: `Imported ${data.length} records from CSV`,
          });
        } 
        // For JSON files
        else if (file.name.endsWith('.json')) {
          const jsonData = await parseJSONFile(file);
          onImportData(jsonData);
          onOpenChange(false);
          toast({
            title: "Import successful",
            description: "JSON data imported successfully",
          });
        } 
        // For Excel files
        else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          try {
            const data = await parseExcelFile(file);
            onImportData(data);
            onOpenChange(false);
            toast({
              title: "Import successful",
              description: `Imported ${data.length} records from Excel`,
            });
          } catch (error: any) {
            setError(error.message || 'Error parsing Excel file. Please check the format.');
            console.error('Error parsing Excel file:', error);
          }
        } else {
          setError(`Unsupported file format: ${file.name}. Please use .xlsx, .xls, .csv, or .json files.`);
        }
      } else if (importMethod === 'json' && jsonData.trim()) {
        try {
          const data = JSON.parse(jsonData);
          onImportData(data);
          onOpenChange(false);
          toast({
            title: "Import successful",
            description: "JSON data imported successfully",
          });
        } catch (error) {
          setError('Invalid JSON format');
          console.error('Invalid JSON format:', error);
        }
      } else {
        setError('No data to import');
      }
    } catch (error: any) {
      console.error('Import error:', error);
      setError(error.message || 'An unexpected error occurred during import');
    } finally {
      setProcessing(false);
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
            <FileUploadTab file={file} handleFileUpload={handleFileUpload} />
          </TabsContent>
          
          <TabsContent value="json" className="py-4">
            <JsonInputTab jsonData={jsonData} setJsonData={setJsonData} />
          </TabsContent>
        </Tabs>
        
        <ErrorDisplay error={error} />
        
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
