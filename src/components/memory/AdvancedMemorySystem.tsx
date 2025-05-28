
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Tag, Heart, Calendar, MapPin, Users, Filter, SortAsc } from 'lucide-react';
import { useFamilyContext } from '@/contexts/FamilyContext';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';
import { MemoryCapsule } from './MemoryCapslule';
import { AccessibleButton } from '@/components/foundation/AccessibleButton';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface AdvancedMemorySystemProps {
  className?: string;
}

type SortOption = 'newest' | 'oldest' | 'mostStories' | 'alphabetical';
type FilterOption = 'all' | 'audio' | 'text' | 'video';

export const AdvancedMemorySystem = ({ className }: AdvancedMemorySystemProps) => {
  const { members } = useFamilyContext();
  const { getTextSizeClass } = useAccessibilityContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get all stories with member information
  const allStories = useMemo(() => {
    return members.flatMap(member => 
      member.stories.map(story => ({
        ...story,
        memberName: member.name,
        memberId: member.id,
        memberRole: member.metadata.culturalRole
      }))
    );
  }, [members]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allStories.forEach(story => {
      story.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allStories]);

  // Filter and sort stories
  const filteredStories = useMemo(() => {
    let filtered = allStories;

    // Text search
    if (searchTerm) {
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter(story => 
        story.tags.includes(selectedTag)
      );
    }

    // Type filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(story => story.type === filterBy);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'mostStories':
          return b.tags.length - a.tags.length;
        default:
          return 0;
      }
    });

    return filtered;
  }, [allStories, searchTerm, selectedTag, filterBy, sortBy]);

  // Group stories by categories for better organization
  const groupedStories = useMemo(() => {
    const groups: Record<string, typeof filteredStories> = {};
    
    filteredStories.forEach(story => {
      const date = new Date(story.createdAt);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(story);
    });
    
    return groups;
  }, [filteredStories]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audio': return '🎵';
      case 'video': return '🎬';
      case 'text': return '📝';
      default: return '💭';
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      
      {/* Search and Filter Header */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className={cn('text-2xl', getTextSizeClass())}>
            Family Stories & Memories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search stories, people, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              aria-label="Search memories"
            />
          </div>
          
          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <AccessibleButton
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              ariaLabel="Toggle filters"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters {showFilters ? '−' : '+'}
            </AccessibleButton>
            
            <div className="text-sm text-gray-500">
              {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'}
            </div>
          </div>
          
          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-4 border-t pt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Sort Options */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Sort By</label>
                    <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="alphabetical">Alphabetical</SelectItem>
                        <SelectItem value="mostStories">Most Tagged</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Type Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Story Type</label>
                    <Select value={filterBy} onValueChange={(value: FilterOption) => setFilterBy(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="audio">🎵 Audio</SelectItem>
                        <SelectItem value="text">📝 Text</SelectItem>
                        <SelectItem value="video">🎬 Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Tag Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Filter by Tag</label>
                    <Select value={selectedTag} onValueChange={setSelectedTag}>
                      <SelectTrigger>
                        <SelectValue placeholder="All tags" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Tags</SelectItem>
                        {allTags.map(tag => (
                          <SelectItem key={tag} value={tag}>
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Popular Tags */}
                {allTags.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Popular Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {allTags.slice(0, 8).map(tag => (
                        <AccessibleButton
                          key={tag}
                          variant={selectedTag === tag ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                          className="text-xs"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </AccessibleButton>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Stories Display */}
      <div className="space-y-8">
        {Object.keys(groupedStories).length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-6xl mb-4">📚</div>
              <div className="text-xl font-medium text-gray-600 mb-2">
                {searchTerm || selectedTag ? 'No stories found' : 'No stories yet'}
              </div>
              <div className="text-gray-500">
                {searchTerm || selectedTag 
                  ? 'Try adjusting your search or filters'
                  : "Start recording your family's stories to see them here"
                }
              </div>
              {(searchTerm || selectedTag) && (
                <AccessibleButton
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTag('');
                  }}
                >
                  Clear Filters
                </AccessibleButton>
              )}
            </CardContent>
          </Card>
        ) : (
          Object.entries(groupedStories).map(([period, stories]) => (
            <motion.div
              key={period}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <h3 className={cn('text-lg font-semibold text-gray-700', getTextSizeClass())}>
                  {period}
                </h3>
                <Badge variant="secondary">{stories.length}</Badge>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MemoryCapsule
                      story={story}
                      memberId={story.memberId}
                      className="h-full"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
