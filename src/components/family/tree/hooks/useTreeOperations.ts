
import { Node, Edge } from '@xyflow/react';
import { useMemberOperations } from './operations/useMemberOperations';
import { useConnectionOperations } from './operations/useConnectionOperations';
import { useStoryOperations } from './operations/useStoryOperations';

interface UseTreeOperationsProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export function useTreeOperations({ nodes, edges, setNodes, setEdges }: UseTreeOperationsProps) {
  const memberOperations = useMemberOperations({ nodes, setNodes, setEdges });
  const connectionOperations = useConnectionOperations({ edges, setEdges });
  const storyOperations = useStoryOperations({ setNodes, setEdges });

  return {
    ...memberOperations,
    ...connectionOperations,
    ...storyOperations
  };
}
