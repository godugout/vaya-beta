
import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';

interface UseDataImportProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  autoLayoutTree: () => void;
}

export function useDataImport({ setNodes, setEdges, autoLayoutTree }: UseDataImportProps) {
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

  return { handleImportData };
}
