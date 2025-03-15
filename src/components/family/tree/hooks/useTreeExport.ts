
import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';

interface UseTreeExportProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  autoLayoutTree: () => void;
}

export function useTreeExport({ setNodes, setEdges, autoLayoutTree }: UseTreeExportProps) {
  // Import tree data from external source
  const handleImportData = useCallback((data: any) => {
    try {
      if (!data || (!data.nodes && !data.edges)) {
        console.error('Invalid import data format');
        return;
      }
      
      // Import nodes if available
      if (data.nodes && Array.isArray(data.nodes)) {
        setNodes(data.nodes.map((node: any) => ({
          ...node,
          type: node.type || 'familyMember',
          draggable: true
        })));
      }
      
      // Import edges if available
      if (data.edges && Array.isArray(data.edges)) {
        setEdges(data.edges.map((edge: any) => ({
          ...edge,
          type: edge.type || 'parentChild',
          animated: true
        })));
      }
      
      // Auto-layout the tree after import
      setTimeout(() => {
        autoLayoutTree();
      }, 100);
      
    } catch (error) {
      console.error('Error importing data:', error);
    }
  }, [setNodes, setEdges, autoLayoutTree]);

  // Note: We could add more export-related functions here like:
  // - handleExportData
  // - handleExportImage
  // - handleExportPDF
  // etc.

  return { handleImportData };
}
