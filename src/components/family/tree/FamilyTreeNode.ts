
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export const FamilyTreeNode = memo(({ data }: { data: any }) => {
  return (
    <div className="family-tree-node">
      <Handle type="target" position={Position.Top} />
      <div className="node-content">
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

