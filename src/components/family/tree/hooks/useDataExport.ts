
import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';
import * as XLSX from 'xlsx';

export function useDataExport() {
  // Export the current tree to XLSX
  const handleExportToExcel = useCallback((nodes: Node[], edges: Edge[]) => {
    try {
      // Create a worksheet with family members data
      const worksheetData = nodes.map(node => {
        // Find parent relationships
        const parentEdges = edges.filter(edge => 
          edge.type === 'parentChild' && edge.target === node.id
        );
        
        // Find spouse relationships
        const spouseEdges = edges.filter(edge => 
          edge.type === 'spouse' && (edge.source === node.id || edge.target === node.id)
        );
        
        // Extract parent and spouse IDs
        const parentId = parentEdges.length > 0 ? parentEdges[0].source : null;
        const spouseId = spouseEdges.length > 0 
          ? (spouseEdges[0].source === node.id ? spouseEdges[0].target : spouseEdges[0].source) 
          : null;
        
        return {
          id: node.id,
          name: node.data.name,
          role: node.data.role,
          birthDate: node.data.birthDate,
          imageUrl: node.data.imageUrl,
          details: node.data.details,
          parentId: parentId,
          spouseId: spouseId
        };
      });
      
      // Create workbook and add worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Family Tree");
      
      // Generate Excel file
      XLSX.writeFile(workbook, "family_tree_export.xlsx");
      
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      throw error;
    }
  }, []);

  return { handleExportToExcel };
}
