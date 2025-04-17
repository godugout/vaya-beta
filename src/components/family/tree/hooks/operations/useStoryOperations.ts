
import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';

interface UseStoryOperationsProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export function useStoryOperations({ setNodes, setEdges }: UseStoryOperationsProps) {
  const updateNodeStoryCount = useCallback((nodeId: string, storyCount: number, hasNewStories: boolean = false) => {
    setNodes(nodes => 
      nodes.map(node => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              storyCount,
              hasNewStories
            }
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  const updateEdgeSharedStories = useCallback((sourceId: string, targetId: string, sharedCount: number) => {
    setEdges(edges => 
      edges.map(edge => {
        if ((edge.source === sourceId && edge.target === targetId) || 
            (edge.source === targetId && edge.target === sourceId)) {
          return {
            ...edge,
            data: {
              ...edge.data,
              sharedStories: sharedCount
            }
          };
        }
        return edge;
      })
    );
  }, [setEdges]);

  return {
    updateNodeStoryCount,
    updateEdgeSharedStories
  };
}
