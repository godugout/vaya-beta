
import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';

interface UseTreeLayoutProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
}

export function useTreeLayout({ nodes, setNodes, edges }: UseTreeLayoutProps) {
  // Auto-layout the tree based on relationships
  const autoLayoutTree = useCallback((layoutType: 'vertical' | 'horizontal' | 'radial' = 'vertical') => {
    // Simple layout algorithm - this could be enhanced with a more sophisticated layout
    const nodeMap = new Map(nodes.map(node => [node.id, { ...node, children: [], level: 0, parent: null }]));
    
    // Build parent-child relationships
    edges.forEach(edge => {
      const source = nodeMap.get(edge.source);
      const target = nodeMap.get(edge.target);
      if (source && target && edge.type === 'parentChild') {
        source.children.push(target);
        target.parent = source;
      }
    });
    
    // Find root nodes (those without parents)
    const rootNodes = Array.from(nodeMap.values()).filter(node => {
      return !edges.some(edge => edge.target === node.id && edge.type === 'parentChild');
    });
    
    // Assign levels to nodes (distance from root)
    const assignLevels = (node: any, level = 0) => {
      node.level = level;
      node.children.forEach((child: any) => assignLevels(child, level + 1));
    };
    
    rootNodes.forEach(root => assignLevels(root));
    
    // Position nodes based on layout type
    if (layoutType === 'vertical') {
      positionVertical(rootNodes);
    } else if (layoutType === 'horizontal') {
      positionHorizontal(rootNodes);
    } else if (layoutType === 'radial') {
      positionRadial(rootNodes);
    }
    
    // Update the nodes with their new positions
    setNodes(
      nodes.map(node => {
        const layoutNode = nodeMap.get(node.id);
        return layoutNode ? { 
          ...node, 
          position: layoutNode.position,
          data: {
            ...node.data,
            generation: layoutNode.level,
            isInDirectLineage: isInDirectLineage(layoutNode, nodeMap),
          }
        } : node;
      })
    );
  }, [nodes, edges, setNodes]);

  // Position nodes in a vertical tree layout (parent at top, children below)
  const positionVertical = (rootNodes: any[], horizontalSpacing = 200, verticalSpacing = 150) => {
    const positionNodes = (node: any, x: number, y: number) => {
      // Set position for current node
      node.position = { x, y };
      
      // Position children
      if (node.children && node.children.length > 0) {
        const childrenWidth = (node.children.length - 1) * horizontalSpacing;
        const startX = x - childrenWidth / 2;
        
        node.children.forEach((child: any, index: number) => {
          const childX = startX + index * horizontalSpacing;
          positionNodes(child, childX, y + verticalSpacing);
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
  };
  
  // Position nodes in a horizontal tree layout (parent at left, children to right)
  const positionHorizontal = (rootNodes: any[], horizontalSpacing = 250, verticalSpacing = 120) => {
    const positionNodes = (node: any, x: number, y: number) => {
      // Set position for current node
      node.position = { x, y };
      
      // Position children
      if (node.children && node.children.length > 0) {
        const childrenHeight = (node.children.length - 1) * verticalSpacing;
        const startY = y - childrenHeight / 2;
        
        node.children.forEach((child: any, index: number) => {
          const childY = startY + index * verticalSpacing;
          positionNodes(child, x + horizontalSpacing, childY);
        });
      }
    };
    
    // Layout each root node and its descendants
    let rootY = 0;
    const rootSpacing = 300;
    rootNodes.forEach(root => {
      positionNodes(root, 100, rootY);
      rootY += rootSpacing;
    });
  };
  
  // Position nodes in a radial layout (roots at center, children in concentric circles)
  const positionRadial = (rootNodes: any[]) => {
    const centerX = 500;
    const centerY = 300;
    const radiusStep = 200;
    
    // Helper to position a node at a specific angle and distance from center
    const positionAtAngle = (x: number, y: number, angle: number, distance: number) => {
      const radians = (angle * Math.PI) / 180;
      return {
        x: x + distance * Math.cos(radians),
        y: y + distance * Math.sin(radians),
      };
    };
    
    const positionNodes = (node: any, centerX: number, centerY: number, startAngle: number, endAngle: number, level: number) => {
      // Position current node
      const midAngle = (startAngle + endAngle) / 2;
      const distance = level * radiusStep;
      node.position = positionAtAngle(centerX, centerY, midAngle, distance);
      
      // Position children in a fan layout
      if (node.children && node.children.length > 0) {
        const angleStep = (endAngle - startAngle) / node.children.length;
        
        node.children.forEach((child: any, index: number) => {
          const childStartAngle = startAngle + index * angleStep;
          const childEndAngle = childStartAngle + angleStep;
          positionNodes(child, centerX, centerY, childStartAngle, childEndAngle, level + 1);
        });
      }
    };
    
    // Position the root nodes around the center
    if (rootNodes.length === 1) {
      // Single root at center
      rootNodes[0].position = { x: centerX, y: centerY };
      
      if (rootNodes[0].children && rootNodes[0].children.length > 0) {
        const angleStep = 360 / rootNodes[0].children.length;
        rootNodes[0].children.forEach((child: any, index: number) => {
          const childStartAngle = index * angleStep;
          const childEndAngle = childStartAngle + angleStep;
          positionNodes(child, centerX, centerY, childStartAngle, childEndAngle, 1);
        });
      }
    } else {
      // Multiple roots arranged in a circle
      const angleStep = 360 / rootNodes.length;
      rootNodes.forEach((root, index) => {
        const rootAngle = index * angleStep;
        const rootPos = positionAtAngle(centerX, centerY, rootAngle, radiusStep / 2);
        root.position = rootPos;
        
        if (root.children && root.children.length > 0) {
          const childAngleStep = 360 / root.children.length;
          root.children.forEach((child: any, childIndex: number) => {
            const childStartAngle = rootAngle - 45 + childIndex * childAngleStep;
            const childEndAngle = childStartAngle + childAngleStep;
            positionNodes(child, rootPos.x, rootPos.y, childStartAngle, childEndAngle, 1);
          });
        }
      });
    }
  };
  
  // Determine if a node is in the direct lineage path (for focus mode)
  const isInDirectLineage = (node: any, nodeMap: Map<string, any>) => {
    // This is a simplified example - in a real app, you'd determine this based on user's family position
    // For now, we'll just mark the first chain from root as direct lineage
    
    // Start from the first root node
    const rootNodes = Array.from(nodeMap.values()).filter(n => !n.parent);
    if (rootNodes.length === 0) return false;
    
    const mainRoot = rootNodes[0];
    
    // If node is the main root, it's in direct lineage
    if (node.id === mainRoot.id) return true;
    
    // Check if node is a direct descendant of main root
    let currentNode = node;
    while (currentNode.parent) {
      if (currentNode.parent.id === mainRoot.id) return true;
      currentNode = currentNode.parent;
    }
    
    return false;
  };

  return { autoLayoutTree };
}
