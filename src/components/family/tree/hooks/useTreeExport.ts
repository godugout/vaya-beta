
import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';
import * as XLSX from 'xlsx';

interface UseTreeExportProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  autoLayoutTree: () => void;
}

export function useTreeExport({ setNodes, setEdges, autoLayoutTree }: UseTreeExportProps) {
  // Import tree data from external source
  const handleImportData = useCallback((data: any) => {
    try {
      // For direct JSON object input
      if (data && (data.nodes || data.edges)) {
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
        
        return;
      }
      
      // For array data (like from CSV or Excel)
      if (Array.isArray(data) && data.length > 0) {
        // Map spreadsheet data to nodes/edges
        const nodes: Node[] = [];
        const edges: Edge[] = [];
        
        // Process each row as a potential family member
        data.forEach((row, index) => {
          // Create a node for this person
          const id = row.id || `node-${index}`;
          nodes.push({
            id: id,
            type: 'familyMember',
            position: { x: 0, y: index * 100 },
            data: {
              name: row.name || row.fullName || row.full_name || `Person ${index}`,
              role: row.role || 'member',
              birthDate: row.birthDate || row.birth_date || row.dob || null,
              imageUrl: row.imageUrl || row.avatar_url || row.image || null,
              details: row.details || row.bio || row.description || null
            },
            draggable: true
          });
          
          // Create edges if parent/child relationships are defined
          if (row.parentId || row.parent_id) {
            edges.push({
              id: `edge-${row.parentId || row.parent_id}-${id}`,
              source: row.parentId || row.parent_id,
              target: id,
              type: 'parentChild',
              animated: true
            });
          }
          
          // Create spouse edges if defined
          if (row.spouseId || row.spouse_id) {
            edges.push({
              id: `edge-spouse-${id}-${row.spouseId || row.spouse_id}`,
              source: id,
              target: row.spouseId || row.spouse_id,
              type: 'spouse',
              animated: false
            });
          }
        });
        
        setNodes(nodes);
        setEdges(edges);
        
        // Auto-layout the tree after import
        setTimeout(() => {
          autoLayoutTree();
        }, 100);
      }
    } catch (error) {
      console.error('Error importing data:', error);
    }
  }, [setNodes, setEdges, autoLayoutTree]);

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
    }
  }, []);

  // Function to parse Excel files
  const parseExcelFile = useCallback((file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          
          // Get first worksheet
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          
          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  }, []);

  return { 
    handleImportData,
    handleExportToExcel,
    parseExcelFile
  };
}
