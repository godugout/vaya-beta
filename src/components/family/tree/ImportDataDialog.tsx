
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FileUploadTab } from "./import/FileUploadTab";
import { JsonInputTab } from "./import/JsonInputTab";
import { ErrorDisplay } from "./import/ErrorDisplay";
import { parseCSVFile, parseJSONFile, parseExcelFile } from "./import/importUtils";
import { Sparkles } from "lucide-react";

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
  const [enhanceWithAI, setEnhanceWithAI] = useState(false);

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
        
        // If AI enhancement is enabled, we would process the data here
        if (enhanceWithAI && data.length > 0) {
          try {
            data = await enrichFamilyDataWithAI(data);
          } catch (aiError) {
            console.error('Error enriching data with AI:', aiError);
            // Continue with original data if AI enhancement fails
          }
        }
        
        onImportData(data);
        onOpenChange(false);
      } else if (activeTab === 'json' && jsonData.trim()) {
        try {
          const data = JSON.parse(jsonData);
          
          // If AI enhancement is enabled
          if (enhanceWithAI && (Array.isArray(data) ? data.length > 0 : data.nodes?.length > 0)) {
            try {
              const dataToEnrich = Array.isArray(data) ? data : data.nodes;
              const enrichedData = await enrichFamilyDataWithAI(dataToEnrich);
              
              if (Array.isArray(data)) {
                onImportData(enrichedData);
              } else {
                // If the original data had a nodes/edges structure
                onImportData({
                  ...data,
                  nodes: enrichedData
                });
              }
            } catch (aiError) {
              console.error('Error enriching data with AI:', aiError);
              // Continue with original data if AI enhancement fails
              onImportData(data);
            }
          } else {
            onImportData(data);
          }
          
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

  // Function to enrich family data with AI
  // This is a placeholder for where you would implement the actual AI enhancement
  const enrichFamilyDataWithAI = async (data: any[]) => {
    // In a real implementation, this would call an API to enrich the data
    console.log('Enriching data with AI...', data);
    
    // For now, we'll simulate the enhancement by adding placeholders
    // In a real implementation, you would call an API service
    return data.map(member => {
      // Only enhance if we have a name
      if (!member.name || member.name === 'Unknown Member') {
        return member;
      }
      
      return {
        ...member,
        details: member.details ? 
          `${member.details}\n\n[AI could enhance this profile with additional information found online]` :
          '[AI could enhance this profile with additional information found online]',
        // We're not actually modifying data here, just demonstrating what could be done
        // This would be replaced with real AI-generated content
      };
    });
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
        
        <div className="flex items-center space-x-2 py-2">
          <Switch
            id="ai-enhance"
            checked={enhanceWithAI}
            onCheckedChange={setEnhanceWithAI}
          />
          <label
            htmlFor="ai-enhance"
            className="text-sm font-medium flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-amber-500" />
            AI-enhance family data (placeholder - full implementation coming soon)
          </label>
        </div>
        
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
