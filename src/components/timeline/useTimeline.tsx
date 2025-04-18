import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  TimelineItem, 
  TimelineGroup, 
  TimelineFilters,
  TimelinePeriod,
  convertToTimelineItem
} from './types';
import { 
  format, 
  parseISO, 
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
  startOfDecade,
  endOfDay,
  endOfWeek,
  endOfMonth,
  endOfYear,
  endOfDecade,
} from 'date-fns';

export const useTimeline = (filters: TimelineFilters = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [timelineGroups, setTimelineGroups] = useState<TimelineGroup[]>([]);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch data from multiple sources based on filters
  useEffect(() => {
    const fetchTimelineData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Example: Fetch data from memories, stories, and capsules tables
        const memoriesPromise = supabase
          .from('memories')
          .select('*')
          .order('created_at', { ascending: false });
          
        const storiesPromise = supabase
          .from('stories')
          .select('*, tags:story_tags(*)')
          .order('created_at', { ascending: false });
          
        const [memoriesResult, storiesResult] = await Promise.all([
          memoriesPromise,
          storiesPromise
        ]);
        
        // Check for errors in responses
        if (memoriesResult.error) throw new Error(memoriesResult.error.message);
        if (storiesResult.error) throw new Error(storiesResult.error.message);
        
        const memoriesData = memoriesResult.data || [];
        const storiesData = storiesResult.data || [];
        
        // Map DB records to TimelineItems
        const memoryItems: TimelineItem[] = memoriesData.map(memory => 
          convertToTimelineItem(memory, 'memory')
        );
        
        const storyItems: TimelineItem[] = storiesData.map(story => 
          convertToTimelineItem(story, 'story')
        );
        
        // Combine all items
        let allItems = [...memoryItems, ...storyItems];
        
        // Apply filters if provided
        if (filters.contentTypes && filters.contentTypes.length > 0) {
          allItems = allItems.filter(item => 
            filters.contentTypes?.includes(item.type)
          );
        }
        
        if (filters.dateRange?.start) {
          allItems = allItems.filter(item => 
            new Date(item.date) >= new Date(filters.dateRange?.start || '')
          );
        }
        
        if (filters.dateRange?.end) {
          allItems = allItems.filter(item => 
            new Date(item.date) <= new Date(filters.dateRange?.end || '')
          );
        }
        
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          allItems = allItems.filter(item => 
            item.title.toLowerCase().includes(query) || 
            (item.description && item.description.toLowerCase().includes(query))
          );
        }
        
        // Group items based on the groupBy filter
        const groupedItems = groupItemsByPeriod(allItems, filters.groupBy || 'month');
        
        setItems(allItems);
        setTimelineGroups(groupedItems);
      } catch (err) {
        console.error('Error fetching timeline data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch timeline data'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTimelineData();
  }, [filters]);
  
  return { isLoading, items, timelineGroups, error };
};

// Helper function to group items by time period
const groupItemsByPeriod = (items: TimelineItem[], period: TimelinePeriod): TimelineGroup[] => {
  if (items.length === 0) return [];
  
  // Sort items by date, most recent first
  const sortedItems = [...items].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const groupMap: Map<string, TimelineItem[]> = new Map();
  
  sortedItems.forEach(item => {
    try {
      const date = parseISO(item.date);
      let periodStart: Date;
      let periodEnd: Date;
      let groupLabel: string;
      
      switch (period) {
        case 'day':
          periodStart = startOfDay(date);
          periodEnd = endOfDay(date);
          groupLabel = format(date, "MMMM d, yyyy");
          break;
        case 'week':
          periodStart = startOfWeek(date);
          periodEnd = endOfWeek(date);
          groupLabel = `Week of ${format(periodStart, "MMM d")} - ${format(periodEnd, "MMM d, yyyy")}`;
          break;
        case 'month':
          periodStart = startOfMonth(date);
          periodEnd = endOfMonth(date);
          groupLabel = format(date, "MMMM yyyy");
          break;
        case 'year':
          periodStart = startOfYear(date);
          periodEnd = endOfYear(date);
          groupLabel = format(date, "yyyy");
          break;
        case 'decade':
          const year = date.getFullYear();
          const decadeStart = Math.floor(year / 10) * 10;
          periodStart = startOfDecade(date);
          periodEnd = endOfDecade(date);
          groupLabel = `${decadeStart}s`;
          break;
        default:
          periodStart = startOfMonth(date);
          periodEnd = endOfMonth(date);
          groupLabel = format(date, "MMMM yyyy");
      }
      
      const key = format(periodStart, "yyyy-MM-dd");
      
      if (!groupMap.has(key)) {
        groupMap.set(key, []);
      }
      
      groupMap.get(key)?.push(item);
      
    } catch (error) {
      console.error('Error processing date for item:', item, error);
    }
  });
  
  // Convert map to array of groups
  const groups: TimelineGroup[] = Array.from(groupMap).map(([key, groupItems]) => {
    const firstItem = groupItems[0];
    const date = parseISO(firstItem.date);
    
    let label: string;
    let startDate: string;
    let endDate: string;
    
    switch (period) {
      case 'day':
        label = format(date, "MMMM d, yyyy");
        startDate = format(startOfDay(date), "yyyy-MM-dd");
        endDate = format(endOfDay(date), "yyyy-MM-dd");
        break;
      case 'week':
        const weekStart = startOfWeek(date);
        const weekEnd = endOfWeek(date);
        label = `Week of ${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`;
        startDate = format(weekStart, "yyyy-MM-dd");
        endDate = format(weekEnd, "yyyy-MM-dd");
        break;
      case 'month':
        label = format(date, "MMMM yyyy");
        startDate = format(startOfMonth(date), "yyyy-MM-dd");
        endDate = format(endOfMonth(date), "yyyy-MM-dd");
        break;
      case 'year':
        label = format(date, "yyyy");
        startDate = format(startOfYear(date), "yyyy-MM-dd");
        endDate = format(endOfYear(date), "yyyy-MM-dd");
        break;
      case 'decade':
        const year = date.getFullYear();
        const decadeStart = Math.floor(year / 10) * 10;
        label = `${decadeStart}s`;
        startDate = `${decadeStart}-01-01`;
        endDate = `${decadeStart + 9}-12-31`;
        break;
      default:
        label = format(date, "MMMM yyyy");
        startDate = format(startOfMonth(date), "yyyy-MM-dd");
        endDate = format(endOfMonth(date), "yyyy-MM-dd");
    }
    
    return {
      label,
      period,
      startDate,
      endDate,
      items: groupItems
    };
  });
  
  return groups;
};
