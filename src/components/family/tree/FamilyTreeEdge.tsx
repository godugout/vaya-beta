
import { memo } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';
import { motion } from 'framer-motion';

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
    sharedStories?: number;
    isDirectLineage?: boolean;
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
    targetPosition,
    targetX,
    targetY,
  });

  const isSpouseEdge = sourcePosition === 'right' && targetPosition === 'left';
  const isDirectLineage = data?.isDirectLineage || false;
  const sharedStories = data?.sharedStories || 0;
  
  // Calculate stroke width based on number of shared stories
  const baseStrokeWidth = 2;
  const additionalWidth = Math.min(sharedStories / 2, 3); // Max 3px additional width
  const strokeWidth = isDirectLineage ? baseStrokeWidth + 1 : baseStrokeWidth;
  
  // Define stroke appearance based on relationship
  const strokeColor = isSpouseEdge 
    ? '#D946EF' // Purple for spouse
    : isDirectLineage 
      ? '#F59E0B' // Amber for direct lineage
      : '#0EA5E9'; // Blue for parent-child
  
  const strokeDasharray = isSpouseEdge ? '5 5' : 'none';
  
  // Add pulse animation for edges with shared stories
  const animationProps = sharedStories > 0 
    ? {
        animate: {
          opacity: [0.7, 1, 0.7],
          strokeWidth: [strokeWidth, strokeWidth + additionalWidth, strokeWidth],
        },
        transition: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse" as const,
        }
      } 
    : {};

  return (
    <>
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{ 
          ...style, 
          stroke: strokeColor, 
          strokeWidth: strokeWidth,
          strokeDasharray: strokeDasharray
        }} 
      />
      
      {/* Add glowing effect for edges with shared stories */}
      {sharedStories > 0 && (
        <motion.path
          d={edgePath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeOpacity={0.5}
          {...animationProps}
        />
      )}
      
      {data?.relationship && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className={`px-2 py-0.5 rounded-full shadow-sm border text-xs font-medium ${
              isDirectLineage 
                ? 'bg-amber-500/20 text-amber-200 border-amber-500/30' 
                : 'bg-gray-800 text-gray-200 border-gray-700'
            }`}
          >
            {data.relationship}
            {sharedStories > 0 && ` · ${sharedStories} 📚`}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default memo(FamilyTreeEdge);
