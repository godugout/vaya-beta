
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Download } from "lucide-react";
import * as XLSX from 'xlsx';

interface FormatInfoProps {
  showFormat: boolean;
  setShowFormat: (show: boolean) => void;
}

export const FormatInfo = ({ showFormat, setShowFormat }: FormatInfoProps) => {
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

  return (
    <>
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
    </>
  );
};
