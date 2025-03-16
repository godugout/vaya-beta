
import { Node, Edge } from '@xyflow/react';
import { useDataImport } from './useDataImport';
import { useDataExport } from './useDataExport';
import { useFileParser } from './useFileParser';
import { enrichFamilyData } from '../services/familyDataEnrichment';

interface UseTreeExportProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  autoLayoutTree: () => void;
}

export function useTreeExport({ setNodes, setEdges, autoLayoutTree }: UseTreeExportProps) {
  const { handleImportData } = useDataImport({ setNodes, setEdges, autoLayoutTree });
  const { handleExportToExcel } = useDataExport();
  const { parseExcelFile } = useFileParser();

  // Add a function to enrich family data with AI
  const enrichFamilyTreeData = async (data: any[]) => {
    try {
      return await enrichFamilyData(data);
    } catch (error) {
      console.error('Error enriching family data:', error);
      return data;
    }
  };

  return { 
    handleImportData,
    handleExportToExcel,
    parseExcelFile,
    enrichFamilyTreeData
  };
}
