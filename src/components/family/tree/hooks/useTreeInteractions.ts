
import { useCallback } from 'react';
import { Connection, Node } from '@xyflow/react';

export const useTreeInteractions = () => {
  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Node clicked:', node);
  }, []);

  const setReactFlowInstance = useCallback((instance: any) => {
    reactFlowInstanceRef.current = instance;
  }, []);

  return {
    handleNodeClick,
    setReactFlowInstance,
  };
};

