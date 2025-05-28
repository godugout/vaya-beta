
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useFamilyContext, FamilyMember } from '@/contexts/FamilyContext';
import { useCultureContext } from '@/contexts/CultureContext';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';
import { AccessibleButton } from '@/components/foundation/AccessibleButton';
import { cn } from '@/lib/utils';

interface FamilyMemberNodeProps {
  member: FamilyMember;
  isSelected?: boolean;
  position?: { x: number; y: number };
  onSelect?: (member: FamilyMember) => void;
  className?: string;
}

export const FamilyMemberNode = ({
  member,
  isSelected = false,
  position,
  onSelect,
  className,
}: FamilyMemberNodeProps) => {
  const { selectedMember, setSelectedMember } = useFamilyContext();
  const { settings: cultureSettings } = useCultureContext();
  const { getTouchTargetClass, getTextSizeClass } = useAccessibilityContext();

  const handleSelect = () => {
    setSelectedMember(member);
    onSelect?.(member);
  };

  const getGlyph = () => {
    // This is where cultural customization happens
    const gender = member.metadata.gender || 'nonBinary';
    return cultureSettings.glyphSystem[gender as keyof typeof cultureSettings.glyphSystem] || '□';
  };

  const storyCount = member.stories.length;
  const hasStories = storyCount > 0;

  return (
    <div
      className={cn(
        'relative group',
        position && 'absolute'
      )}
      style={position ? { left: position.x, top: position.y } : undefined}
    >
      <AccessibleButton
        variant={isSelected ? 'default' : 'outline'}
        className={cn(
          getTouchTargetClass(),
          'flex flex-col items-center space-y-2 p-4 rounded-lg border-2 transition-all duration-200',
          'hover:shadow-lg hover:scale-105',
          isSelected && 'ring-4 ring-blue-500/30 bg-blue-50',
          hasStories && 'border-green-500',
          className
        )}
        ariaLabel={`Select ${member.name}${hasStories ? `, ${storyCount} stories` : ', no stories'}`}
        onClick={handleSelect}
      >
        {/* Cultural Glyph */}
        <div className={cn(
          'text-3xl font-bold mb-1',
          isSelected ? 'text-blue-600' : 'text-gray-600'
        )}>
          {getGlyph()}
        </div>

        {/* Name */}
        <div className={cn(
          'text-center font-medium',
          getTextSizeClass(),
          isSelected ? 'text-blue-900' : 'text-gray-900'
        )}>
          {member.name}
        </div>

        {/* Story Count Badge */}
        {hasStories && (
          <Badge 
            variant="secondary" 
            className="absolute -top-2 -right-2 bg-green-500 text-white text-xs"
          >
            {storyCount}
          </Badge>
        )}

        {/* Cultural Role */}
        {member.metadata.culturalRole && (
          <div className="text-xs text-gray-500 text-center mt-1">
            {member.metadata.culturalRole}
          </div>
        )}
      </AccessibleButton>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 rounded-lg border-4 border-blue-500 animate-pulse" />
        </div>
      )}
    </div>
  );
};
