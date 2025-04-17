
import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';
import { buildNodeRelationships, assignLevels, isInDirectLineage } from './layout/useTreeLayoutUtils';
import { useVerticalLayout } from './layout/useVerticalLayout';
import { useHorizontalLayout } from './layout/useHorizontalLayout';
import { useRadialLayout } from './layout/useRadialLayout';

interface UseTreeLayoutProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
}

export function useTreeLayout({ nodes, setNodes, edges }: UseTreeLayoutProps) {
  const { layoutVertical } = useVerticalLayout();
  const { layoutHorizontal } = useHorizontalLayout();
  const { layoutRadial } = useRadialLayout();

  const autoLayoutTree = useCallback((layoutType: 'vertical' | 'horizontal' | 'radial' = 'vertical') => {
    const { nodeMap, rootNodes } = buildNodeRelationships(nodes, edges);
    
    rootNodes.forEach(root => assignLevels(root));
    
    if (layoutType === 'vertical') {
      layoutVertical(rootNodes);
    } else if (layoutType === 'horizontal') {
      layoutHorizontal(rootNodes);
    } else if (layoutType === 'radial') {
      layoutRadial(rootNodes);
    }
    
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

  return { autoLayoutTree };
}
