
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, Grid, List, Filter } from 'lucide-react';
import { useFamilyContext, FamilyMember } from '@/contexts/FamilyContext';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';
import { AccessibleButton } from '@/components/foundation/AccessibleButton';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FlexibleFamilyTreeProps {
  className?: string;
}

type ViewMode = 'tree' | 'grid' | 'list';
type LayoutMode = 'vertical' | 'horizontal';

export const FlexibleFamilyTree = ({ className }: FlexibleFamilyTreeProps) => {
  const { members, selectedMember, setSelectedMember } = useFamilyContext();
  const { getTouchTargetClass, getTextSizeClass } = useAccessibilityContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('tree');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('vertical');
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set());

  // Filter members based on search
  const filteredMembers = useMemo(() => {
    if (!searchTerm) return members;
    return members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.metadata.culturalRole?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [members, searchTerm]);

  const toggleBranch = (memberId: string) => {
    const newExpanded = new Set(expandedBranches);
    if (newExpanded.has(memberId)) {
      newExpanded.delete(memberId);
    } else {
      newExpanded.add(memberId);
    }
    setExpandedBranches(newExpanded);
  };

  const getStoryIndicator = (member: FamilyMember) => {
    const storyCount = member.stories.length;
    if (storyCount === 0) return null;
    
    return (
      <Badge 
        variant={storyCount > 5 ? 'default' : 'secondary'}
        className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
      >
        {storyCount > 9 ? '9+' : storyCount}
      </Badge>
    );
  };

  const MemberCard = ({ member, index }: { member: FamilyMember; index: number }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <AccessibleButton
        variant={selectedMember?.id === member.id ? 'default' : 'outline'}
        className={cn(
          getTouchTargetClass(),
          'flex flex-col items-center p-4 space-y-2 border-2 transition-all duration-200 hover:shadow-lg',
          selectedMember?.id === member.id && 'ring-2 ring-blue-500/30 bg-blue-50'
        )}
        onClick={() => setSelectedMember(member)}
        ariaLabel={`Select ${member.name}, ${member.stories.length} stories`}
      >
        {/* Cultural Symbol */}
        <div className="text-4xl mb-2">
          {member.metadata.gender === 'male' ? '△' : 
           member.metadata.gender === 'female' ? '○' : '□'}
        </div>
        
        {/* Name */}
        <div className={cn('font-medium text-center', getTextSizeClass())}>
          {member.name}
        </div>
        
        {/* Cultural Role */}
        {member.metadata.culturalRole && (
          <div className="text-xs text-gray-500 text-center">
            {member.metadata.culturalRole}
          </div>
        )}
        
        {/* Story Count Indicator */}
        {getStoryIndicator(member)}
      </AccessibleButton>
    </motion.div>
  );

  const TreeView = () => (
    <div className={cn(
      'grid gap-6',
      layoutMode === 'vertical' 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
        : 'grid-flow-col auto-cols-max gap-8 overflow-x-auto pb-4'
    )}>
      {filteredMembers.map((member, index) => (
        <MemberCard key={member.id} member={member} index={index} />
      ))}
    </div>
  );

  const GridView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {filteredMembers.map((member, index) => (
        <MemberCard key={member.id} member={member} index={index} />
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-3">
      {filteredMembers.map((member, index) => (
        <motion.div
          key={member.id}
          layout
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <AccessibleButton
            variant={selectedMember?.id === member.id ? 'default' : 'outline'}
            className={cn(
              'w-full flex items-center space-x-4 p-4 border-2',
              selectedMember?.id === member.id && 'ring-2 ring-blue-500/30 bg-blue-50'
            )}
            onClick={() => setSelectedMember(member)}
          >
            <div className="text-2xl">
              {member.metadata.gender === 'male' ? '△' : 
               member.metadata.gender === 'female' ? '○' : '□'}
            </div>
            <div className="flex-1 text-left">
              <div className={cn('font-medium', getTextSizeClass())}>
                {member.name}
              </div>
              {member.metadata.culturalRole && (
                <div className="text-sm text-gray-500">
                  {member.metadata.culturalRole}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {member.stories.length > 0 && (
                <Badge variant="secondary">
                  {member.stories.length} stories
                </Badge>
              )}
            </div>
          </AccessibleButton>
        </motion.div>
      ))}
    </div>
  );

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className="p-6">
        
        {/* Header Controls */}
        <div className="flex flex-col space-y-4 mb-6">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search family members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              aria-label="Search family members"
            />
          </div>
          
          {/* View Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex space-x-2">
              <AccessibleButton
                variant={viewMode === 'tree' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('tree')}
                ariaLabel="Tree view"
              >
                <Users className="h-4 w-4 mr-2" />
                Tree
              </AccessibleButton>
              
              <AccessibleButton
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                ariaLabel="Grid view"
              >
                <Grid className="h-4 w-4 mr-2" />
                Grid
              </AccessibleButton>
              
              <AccessibleButton
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                ariaLabel="List view"
              >
                <List className="h-4 w-4 mr-2" />
                List
              </AccessibleButton>
            </div>
            
            {viewMode === 'tree' && (
              <div className="flex space-x-2">
                <AccessibleButton
                  variant={layoutMode === 'vertical' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLayoutMode('vertical')}
                  ariaLabel="Vertical layout"
                >
                  Vertical
                </AccessibleButton>
                
                <AccessibleButton
                  variant={layoutMode === 'horizontal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLayoutMode('horizontal')}
                  ariaLabel="Horizontal layout"
                >
                  Horizontal
                </AccessibleButton>
              </div>
            )}
          </div>
        </div>

        {/* Family Tree Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {viewMode === 'tree' && <TreeView />}
            {viewMode === 'grid' && <GridView />}
            {viewMode === 'list' && <ListView />}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            {searchTerm ? (
              <div>
                <div className="text-6xl mb-4">🔍</div>
                <div className="text-lg font-medium text-gray-600">No family members found</div>
                <div className="text-gray-500">Try adjusting your search terms</div>
              </div>
            ) : (
              <div>
                <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
                <div className="text-lg font-medium text-gray-600">Your Family Tree</div>
                <div className="text-gray-500">Add family members to get started</div>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
