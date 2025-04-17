
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TimelineFilters, TimelineItem, TimelineGroup, TimelinePeriod } from "./types";
import { format, parseISO, isValid, startOfMonth, endOfMonth, startOfYear, endOfYear, addMonths, addYears } from "date-fns";

export const useTimeline = (initialFilters?: TimelineFilters) => {
  const [filters, setFilters] = useState<TimelineFilters>(initialFilters || {});

  const { data, isLoading, error } = useQuery({
    queryKey: ["timeline", filters],
    queryFn: async () => {
      // For now, we'll simulate fetching mixed content by getting memories
      // In a real implementation, we would fetch from multiple tables based on filters
      const { contentTypes = ['story', 'memory', 'photo'], dateRange, tags, searchQuery } = filters;
      
      let timelineItems: TimelineItem[] = [];
      
      // Fetch memories
      if (contentTypes.includes('memory')) {
        const query = supabase
          .from('memories')
          .select('*, memory_tags(tag, id)')
          .order('created_at', { ascending: false });
          
        // Apply filters
        if (dateRange?.start) {
          query.gte('created_at', dateRange.start);
        }
        if (dateRange?.end) {
          query.lte('created_at', dateRange.end);
        }
        if (searchQuery) {
          query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
        }
        
        const { data: memories, error } = await query;
        
        if (error) throw error;
        
        if (memories) {
          const memoryItems = memories.map(memory => ({
            id: memory.id,
            type: 'memory' as const,
            title: memory.title,
            description: memory.description || '',
            date: memory.created_at,
            content_url: memory.content_url,
            tags: memory.memory_tags || [],
            metadata: memory.metadata || {}
          }));
          
          timelineItems = [...timelineItems, ...memoryItems];
        }
      }
      
      // Fetch stories
      if (contentTypes.includes('story')) {
        const query = supabase
          .from('stories')
          .select('*, story_tags(tag, id)')
          .order('created_at', { ascending: false });
          
        // Apply filters
        if (dateRange?.start) {
          query.gte('created_at', dateRange.start);
        }
        if (dateRange?.end) {
          query.lte('created_at', dateRange.end);
        }
        if (searchQuery) {
          query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
        }
        
        const { data: stories, error } = await query;
        
        if (error) throw error;
        
        if (stories) {
          const storyItems = stories.map(story => ({
            id: story.id,
            type: 'story' as const,
            title: story.title,
            description: story.description || '',
            date: story.created_at,
            content_url: story.audio_url,
            tags: story.story_tags || [],
            metadata: story.metadata || {}
          }));
          
          timelineItems = [...timelineItems, ...storyItems];
        }
      }

      // Fetch photos
      if (contentTypes.includes('photo')) {
        const query = supabase
          .from('photos')
          .select('*')
          .order('created_at', { ascending: false });
          
        // Apply filters
        if (dateRange?.start) {
          query.gte('created_at', dateRange.start);
        }
        if (dateRange?.end) {
          query.lte('created_at', dateRange.end);
        }
        
        const { data: photos, error } = await query;
        
        if (error) throw error;
        
        if (photos) {
          const photoItems = photos.map(photo => ({
            id: photo.id,
            type: 'photo' as const,
            title: photo.caption || 'Photo',
            date: photo.taken_at || photo.created_at,
            content_url: photo.photo_url,
            metadata: {}
          }));
          
          timelineItems = [...timelineItems, ...photoItems];
        }
      }
      
      // Filter by tags if needed
      if (tags && tags.length > 0) {
        timelineItems = timelineItems.filter(item => {
          if (!item.tags) return false;
          return tags.some(tag => item.tags?.some(t => t.tag === tag));
        });
      }
      
      // Sort all items by date (newest first)
      timelineItems.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      
      return timelineItems;
    }
  });

  const updateFilters = (newFilters: Partial<TimelineFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Group items by time period
  const groupItemsByPeriod = (items: TimelineItem[] = [], groupBy: TimelinePeriod = 'month'): TimelineGroup[] => {
    if (!items.length) return [];
    
    const groups: Record<string, TimelineGroup> = {};
    
    items.forEach(item => {
      const date = parseISO(item.date);
      if (!isValid(date)) return;
      
      let groupKey: string;
      let label: string;
      let startDate: Date;
      let endDate: Date;
      
      switch (groupBy) {
        case 'day':
          groupKey = format(date, 'yyyy-MM-dd');
          label = format(date, 'MMMM d, yyyy');
          startDate = date;
          endDate = date;
          break;
        case 'month':
          groupKey = format(date, 'yyyy-MM');
          label = format(date, 'MMMM yyyy');
          startDate = startOfMonth(date);
          endDate = endOfMonth(date);
          break;
        case 'year':
          groupKey = format(date, 'yyyy');
          label = format(date, 'yyyy');
          startDate = startOfYear(date);
          endDate = endOfYear(date);
          break;
        case 'decade':
          const decade = Math.floor(date.getFullYear() / 10) * 10;
          groupKey = `${decade}`;
          label = `${decade}s`;
          startDate = new Date(decade, 0, 1);
          endDate = new Date(decade + 9, 11, 31);
          break;
        default:
          groupKey = format(date, 'yyyy-MM');
          label = format(date, 'MMMM yyyy');
          startDate = startOfMonth(date);
          endDate = endOfMonth(date);
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = {
          label,
          period: groupBy,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          items: []
        };
      }
      
      groups[groupKey].items.push(item);
    });
    
    // Convert to array and sort by date (newest first)
    return Object.values(groups).sort((a, b) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  };

  // Generate time periods for navigation
  const generateTimePeriods = (
    startDate: Date, 
    endDate: Date, 
    period: TimelinePeriod
  ): { label: string; value: { start: string; end: string } }[] => {
    const periods = [];
    let current = startDate;
    
    while (current <= endDate) {
      let periodEndDate: Date;
      let label: string;
      
      switch (period) {
        case 'month':
          label = format(current, 'MMMM yyyy');
          periodEndDate = endOfMonth(current);
          periods.push({
            label,
            value: {
              start: current.toISOString(),
              end: periodEndDate.toISOString()
            }
          });
          current = addMonths(current, 1);
          break;
        case 'year':
          label = format(current, 'yyyy');
          periodEndDate = endOfYear(current);
          periods.push({
            label,
            value: {
              start: current.toISOString(),
              end: periodEndDate.toISOString()
            }
          });
          current = addYears(current, 1);
          break;
        // Add other period types as needed
        default:
          label = format(current, 'MMMM yyyy');
          periodEndDate = endOfMonth(current);
          periods.push({
            label,
            value: {
              start: current.toISOString(),
              end: periodEndDate.toISOString()
            }
          });
          current = addMonths(current, 1);
      }
    }
    
    return periods;
  };

  return {
    items: data || [],
    isLoading,
    error,
    filters,
    updateFilters,
    groupItemsByPeriod,
    generateTimePeriods
  };
};
