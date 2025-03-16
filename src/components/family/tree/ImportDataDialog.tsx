
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileInput } from "./FileInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, Table, Upload, AlertCircle, Download, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ImportDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportData: (data: any) => void;
  parseExcelFile?: (file: File) => Promise<any[]>;
}

export const ImportDataDialog = ({ 
  open, 
  onOpenChange, 
  onImportData,
  parseExcelFile
}: ImportDataDialogProps) => {
  const { toast } = useToast();
  const [importMethod, setImportMethod] = useState('file');
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFormat, setShowFormat] = useState(false);

  const handleFileUpload = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
  };

  const downloadSampleTemplate = () => {
    // Create sample data
    const sampleData = [
      { id: "1", name: "John Smith", role: "parent", birthDate: "1965-05-12", details: "Family patriarch", parentId: "", spouseId: "2" },
      { id: "2", name: "Mary Smith", role: "parent", birthDate: "1968-09-23", details: "Family matriarch", parentId: "", spouseId: "1" },
      { id: "3", name: "James Smith", role: "child", birthDate: "1990-02-15", details: "Eldest son", parentId: "1", spouseId: "4" },
      { id: "4", name: "Sarah Johnson", role: "in-law", birthDate: "1992-07-08", details: "James's wife", parentId: "", spouseId: "3" },
      { id: "5", name: "Emma Smith", role: "child", birthDate: "1995-11-30", details: "Daughter", parentId: "1", spouseId: "" }
    ];
    
    // Convert to worksheet
    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sample Family Tree");
    
    // Download the file
    XLSX.writeFile(workbook, "family_tree_template.xlsx");
  };

  const handleImport = async () => {
    setProcessing(true);
    setError(null);
    
    try {
      if (importMethod === 'file' && file) {
        // For CSV files
        if (file.name.endsWith('.csv')) {
          const reader = new FileReader();
          
          reader.onload = (e) => {
            try {
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
              onOpenChange(false);
              toast({
                title: "Import successful",
                description: `Imported ${data.length} records from CSV`,
              });
            } catch (error) {
              setError('Error parsing CSV file. Please check the format.');
              console.error('Error parsing CSV file:', error);
            } finally {
              setProcessing(false);
            }
          };
          
          reader.onerror = () => {
            setError('Error reading file');
            setProcessing(false);
          };
          
          reader.readAsText(file);
        } 
        // For JSON files
        else if (file.name.endsWith('.json')) {
          const reader = new FileReader();
          
          reader.onload = (e) => {
            try {
              const jsonData = JSON.parse(e.target?.result as string);
              onImportData(jsonData);
              onOpenChange(false);
              toast({
                title: "Import successful",
                description: "JSON data imported successfully",
              });
            } catch (error) {
              setError('Error parsing JSON file. Please check the format.');
              console.error('Error parsing JSON file:', error);
            } finally {
              setProcessing(false);
            }
          };
          
          reader.onerror = () => {
            setError('Error reading file');
            setProcessing(false);
          };
          
          reader.readAsText(file);
        } 
        // For Excel files
        else if ((file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) && parseExcelFile) {
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
          } finally {
            setProcessing(false);
          }
        } else {
          setError(`Unsupported file format: ${file.name}. Please use .xlsx, .xls, .csv, or .json files.`);
          setProcessing(false);
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
        } finally {
          setProcessing(false);
        }
      } else {
        setError('No data to import');
        setProcessing(false);
      }
    } catch (error: any) {
      console.error('Import error:', error);
      setError(error.message || 'An unexpected error occurred during import');
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
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowFormat(!showFormat)}
                  className="mb-2"
                >
                  <Info className="h-4 w-4 mr-1" />
                  {showFormat ? "Hide Format Info" : "Show Format Info"}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadSampleTemplate}
                  className="mb-2"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download Template
                </Button>
              </div>
              
              {showFormat && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Expected Excel Format</AlertTitle>
                  <AlertDescription>
                    <p className="text-sm mt-1">Your Excel file should have these columns:</p>
                    <ul className="list-disc list-inside text-sm ml-2 mt-1">
                      <li><strong>id</strong>: Unique identifier for each person</li>
                      <li><strong>name</strong>: Full name of the person</li>
                      <li><strong>role</strong>: e.g., parent, child, in-law (optional)</li>
                      <li><strong>birthDate</strong>: Date of birth (optional)</li>
                      <li><strong>details</strong>: Additional information (optional)</li>
                      <li><strong>parentId</strong>: ID of parent (for establishing parent-child relationships)</li>
                      <li><strong>spouseId</strong>: ID of spouse (for establishing marriage relationships)</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              
              <FileInput onFileSelected={handleFileUpload} />
              
              {file && (
                <div className="text-sm text-green-600 dark:text-green-400">
                  File selected: {file.name}
                </div>
              )}
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Supported formats:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>Excel (.xlsx, .xls)</li>
                  <li>CSV (.csv)</li>
                  <li>JSON (.json)</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="json" className="py-4">
            <div className="space-y-4">
              <Textarea
                placeholder={`Paste your JSON data here...\n{\n  "nodes": [\n    {"id": "1", "data": {"name": "John Doe"}},\n    {"id": "2", "data": {"name": "Jane Doe"}}\n  ],\n  "edges": [\n    {"id": "e1-2", "source": "1", "target": "2"}\n  ]\n}`}
                className="h-[200px] font-mono text-sm"
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm flex items-start">
            <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
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
