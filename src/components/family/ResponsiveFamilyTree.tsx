
import React, { useState, useMemo } from 'react';
import { FamilyMemberNode } from './FamilyMemberNode';
import { useFamilyContext } from '@/contexts/FamilyContext';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

interface TreeLayout {
  id: string;
  x: number;
  y: number;
  level: number;
}

export const ResponsiveFamilyTree = ({ className }: { className?: string }) => {
  const { members, selectedMember } = useFamilyContext();
  const { settings } = useAccessibilityContext();
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 800, height: 600 });

  // Simple tree layout algorithm - can be extended for complex family structures
  const layout = useMemo(() => {
    if (members.length === 0) return [];

    const positions: TreeLayout[] = [];
    const nodeWidth = 120;
    const nodeHeight = 100;
    const levelHeight = 150;

    // Group members by generation (simplified)
    const levels = new Map<number, typeof members>();
    
    members.forEach((member, index) => {
      // Simple level assignment - in real implementation, 
      // this would be based on family relationships
      const level = Math.floor(index / 4);
      if (!levels.has(level)) {
        levels.set(level, []);
      }
      levels.get(level)!.push(member);
    });

    // Position nodes
    levels.forEach((levelMembers, level) => {
      levelMembers.forEach((member, index) => {
        const totalWidth = levelMembers.length * nodeWidth;
        const startX = (viewBox.width - totalWidth) / 2;
        
        positions.push({
          id: member.id,
          x: startX + (index * nodeWidth),
          y: level * levelHeight + 50,
          level,
        });
      });
    });

    return positions;
  }, [members, viewBox.width]);

  return (
    <div className={cn('relative w-full h-96 overflow-auto bg-gray-50 rounded-lg', className)}>
      <div className="absolute inset-0 p-4">
        {layout.map((position) => {
          const member = members.find(m => m.id === position.id);
          if (!member) return null;

          return (
            <FamilyMemberNode
              key={member.id}
              member={member}
              position={{ x: position.x, y: position.y }}
              isSelected={selectedMember?.id === member.id}
            />
          );
        })}

        {/* Connection Lines - Extension point for relationship visualization */}
        <svg className="absolute inset-0 pointer-events-none">
          {/* Simple connections - can be enhanced with proper relationship mapping */}
          {layout.map((position, index) => {
            if (index === 0) return null;
            const prevPosition = layout[index - 1];
            
            return (
              <line
                key={`connection-${position.id}`}
                x1={prevPosition.x + 60}
                y1={prevPosition.y + 50}
                x2={position.x + 60}
                y2={position.y + 50}
                stroke="#e5e7eb"
                strokeWidth="2"
                strokeDasharray={position.level !== prevPosition.level ? "5,5" : "none"}
              />
            );
          })}
        </svg>
      </div>

      {/* Empty State */}
      {members.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
            <div className="text-lg font-medium">Your Family Tree</div>
            <div className="text-sm">Add family members to get started</div>
          </div>
        </div>
      )}
    </div>
  );
};
