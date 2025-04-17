
import { useRef, useCallback } from 'react';
import { Node } from '@xyflow/react';

export const useTreeInteractions = () => {
  const reactFlowInstanceRef = useRef<any>(null);

  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Node clicked:', node);
  }, []);

  const setReactFlowInstance = useCallback((instance: any) => {
    reactFlowInstanceRef.current = instance;
  }, []);

  return {
    handleNodeClick,
    setReactFlowInstance,
    reactFlowInstanceRef,
  };
};
