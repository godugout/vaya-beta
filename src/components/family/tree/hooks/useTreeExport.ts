
import { Node, Edge } from '@xyflow/react';
import { useDataImport } from './useDataImport';
import { useDataExport } from './useDataExport';
import { useFileParser } from './useFileParser';

interface UseTreeExportProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  autoLayoutTree: () => void;
}

export function useTreeExport({ setNodes, setEdges, autoLayoutTree }: UseTreeExportProps) {
  const { handleImportData } = useDataImport({ setNodes, setEdges, autoLayoutTree });
  const { handleExportToExcel } = useDataExport();
  const { parseExcelFile } = useFileParser();

  return { 
    handleImportData,
    handleExportToExcel,
    parseExcelFile
  };
}
