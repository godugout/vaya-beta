
import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';

interface UseTreeLayoutProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
}

export function useTreeLayout({ nodes, setNodes, edges }: UseTreeLayoutProps) {
  // Auto-layout the tree based on relationships
  const autoLayoutTree = useCallback(() => {
    // Simple layout algorithm - this could be enhanced with a more sophisticated layout
    const nodeMap = new Map(nodes.map(node => [node.id, { ...node, children: [] }]));
    
    // Build parent-child relationships
    edges.forEach(edge => {
      const source = nodeMap.get(edge.source);
      const target = nodeMap.get(edge.target);
      if (source && target && edge.type === 'parentChild') {
        source.children.push(target);
      }
    });
    
    // Find root nodes (those without parents)
    const rootNodes = Array.from(nodeMap.values()).filter(node => {
      return !edges.some(edge => edge.target === node.id && edge.type === 'parentChild');
    });
    
    // Position nodes in a tree layout
    const positionNodes = (node: any, x: number, y: number, horizontalSpacing = 200, verticalSpacing = 150) => {
      // Set position for current node
      node.position = { x, y };
      
      // Position children
      if (node.children && node.children.length > 0) {
        const childrenWidth = (node.children.length - 1) * horizontalSpacing;
        const startX = x - childrenWidth / 2;
        
        node.children.forEach((child: any, index: number) => {
          const childX = startX + index * horizontalSpacing;
          positionNodes(child, childX, y + verticalSpacing, horizontalSpacing, verticalSpacing);
        });
      }
    };
    
    // Layout each root node and its descendants
    let rootX = 0;
    const rootSpacing = 400;
    rootNodes.forEach(root => {
      positionNodes(root, rootX, 100);
      rootX += rootSpacing;
    });
    
    // Update the nodes with their new positions
    setNodes(
      nodes.map(node => {
        const layoutNode = nodeMap.get(node.id);
        return layoutNode ? { 
          ...node, 
          position: layoutNode.position 
        } : node;
      })
    );
  }, [nodes, edges, setNodes]);

  return { autoLayoutTree };
}
