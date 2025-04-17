
import { useCallback } from 'react';
import { ReactFlowInstance } from '@xyflow/react';

export const useTreeLayoutControls = (reactFlowInstanceRef: React.MutableRefObject<ReactFlowInstance | null>) => {
  const handleZoomIn = useCallback(() => {
    if (reactFlowInstanceRef.current) {
      reactFlowInstanceRef.current.zoomIn();
    }
  }, [reactFlowInstanceRef]);

  const handleZoomOut = useCallback(() => {
    if (reactFlowInstanceRef.current) {
      reactFlowInstanceRef.current.zoomOut();
    }
  }, [reactFlowInstanceRef]);

  const handleFitView = useCallback(() => {
    if (reactFlowInstanceRef.current) {
      reactFlowInstanceRef.current.fitView();
    }
  }, [reactFlowInstanceRef]);

  return {
    handleZoomIn,
    handleZoomOut,
    handleFitView
  };
};

