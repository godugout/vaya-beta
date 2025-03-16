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
        
        // Map of ids to ensure we don't create duplicate nodes
        const idMap = new Map<string, boolean>();
        
        // Process each row as a potential family member
        data.forEach((row, index) => {
          // Skip rows without name data
          if (!row.name && !row.fullName && !row.full_name) {
            console.warn('Skipping row without name data:', row);
            return;
          }
          
          // Create a node ID or use provided one
          const id = row.id || `node-${index}`;
          
          // Skip duplicate IDs
          if (idMap.has(id)) {
            console.warn(`Duplicate ID found: ${id}, skipping`);
            return;
          }
          
          idMap.set(id, true);
          
          // Create a node for this person
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
            const parentId = row.parentId || row.parent_id;
            edges.push({
              id: `edge-${parentId}-${id}`,
              source: parentId,
              target: id,
              type: 'parentChild',
              animated: true
            });
          }
          
          // Create spouse edges if defined
          if (row.spouseId || row.spouse_id) {
            const spouseId = row.spouseId || row.spouse_id;
            edges.push({
              id: `edge-spouse-${id}-${spouseId}`,
              source: id,
              target: spouseId,
              type: 'spouse',
              animated: false
            });
          }
        });
        
        if (nodes.length === 0) {
          throw new Error('No valid family members found in the imported data');
        }
        
        setNodes(nodes);
        setEdges(edges);
        
        // Auto-layout the tree after import
        setTimeout(() => {
          autoLayoutTree();
        }, 100);
      } else {
        throw new Error('Invalid data format: Expected array or object with nodes/edges');
      }
    } catch (error) {
      console.error('Error importing data:', error);
      throw error; // Rethrow to allow handling in the UI
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
      throw error;
    }
  }, []);

  // Function to parse Excel files
  const parseExcelFile = useCallback((file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          if (!data) {
            throw new Error('Failed to read file data');
          }
          
          // Parse based on file extension
          if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
            const workbook = XLSX.read(data, { type: 'binary' });
            
            // Get first worksheet
            const worksheetName = workbook.SheetNames[0];
            if (!worksheetName) {
              throw new Error('Excel file contains no worksheets');
            }
            
            const worksheet = workbook.Sheets[worksheetName];
            
            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            console.log('Parsed Excel data:', jsonData);
            
            if (!Array.isArray(jsonData) || jsonData.length === 0) {
              throw new Error('Excel file contains no valid data');
            }
            
            resolve(jsonData);
          } else {
            reject(new Error('Unsupported file format. Please upload an .xlsx or .xls file.'));
          }
        } catch (error) {
          console.error('Error parsing Excel file:', error);
          reject(error);
        }
      };
      
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        reject(new Error('Error reading the file'));
      };
      
      reader.readAsBinaryString(file);
    });
  }, []);

  return { 
    handleImportData,
    handleExportToExcel,
    parseExcelFile
  };
}
