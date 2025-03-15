
import { memo } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';

interface FamilyTreeEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: any;
  targetPosition: any;
  style?: any;
  markerEnd?: string;
  data?: {
    relationship?: string;
  };
}

const FamilyTreeEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: FamilyTreeEdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isSpouseEdge = sourcePosition === 'right' && targetPosition === 'left';
  
  return (
    <>
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{ 
          ...style, 
          stroke: isSpouseEdge ? '#D946EF' : '#0EA5E9', 
          strokeWidth: 2,
          ...(isSpouseEdge && { strokeDasharray: '5 5' })
        }} 
      />
      
      {data?.relationship && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="px-2 py-0.5 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 text-xs font-medium"
          >
            {data.relationship}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default memo(FamilyTreeEdge);
