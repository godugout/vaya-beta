
import { useState, useCallback } from 'react';
import { TimelineFilters, TimelineItem, TimelinePeriod, TimelineGroup } from './types';

// Mock items for development, this would be replaced with real data from Supabase
const mockItems: TimelineItem[] = [
  {
    id: '1',
    title: 'Wedding Anniversary',
    date: new Date('2023-06-15'),
    type: 'event',
    content: 'Our 25th wedding anniversary celebration',
    image: '/placeholder.svg',
    emotions: ['joy', 'reverence']
  },
  {
    id: '2',
    title: 'Graduation Day',
    date: new Date('2022-05-20'),
    type: 'memory',
    content: 'When Emma graduated from college',
    image: '/placeholder.svg',
    emotions: ['pride', 'excitement']
  },
  {
    id: '3',
    title: 'First Family Reunion',
    date: new Date('2021-07-10'),
    type: 'story',
    content: 'The first time all siblings got together in 10 years',
    image: '/placeholder.svg',
    emotions: ['nostalgia', 'joy']
  },
  {
    id: '4',
    title: 'Moving to New Home',
    date: new Date('2020-03-15'),
    type: 'memory',
    content: 'When we moved into our current home',
    image: '/placeholder.svg',
    emotions: ['excitement', 'nostalgia']
  },
  {
    id: '5',
    title: 'Grandpa\'s Stories',
    date: new Date('2019-12-25'),
    type: 'story',
    content: 'Recording of grandpa telling his childhood stories',
    image: '/placeholder.svg',
    emotions: ['nostalgia', 'reverence']
  },
];

export const useTimeline = (initialFilters?: TimelineFilters) => {
  const [filters, setFilters] = useState<TimelineFilters>(initialFilters || {
    contentTypes: [],
    groupBy: 'month',
  });
  
  const [emotionFilters, setEmotionFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, this would fetch from Supabase
  const items = mockItems.filter(item => {
    // Apply content type filters
    if (filters.contentTypes.length > 0 && !filters.contentTypes.includes(item.type)) {
      return false;
    }
    
    // Apply emotion filters
    if (emotionFilters.length > 0) {
      return item.emotions?.some(emotion => emotionFilters.includes(emotion));
    }
    
    return true;
  });

  const formatDateByPeriod = (date: Date, period: TimelinePeriod): string => {
    switch (period) {
      case 'day':
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
      case 'week':
        // Getting the week number
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        return `Week ${weekNum}, ${date.getFullYear()}`;
      case 'month':
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      case 'year':
        return date.getFullYear().toString();
      case 'decade':
        const decade = Math.floor(date.getFullYear() / 10) * 10;
        return `${decade}s`;
      default:
        return date.toLocaleDateString();
    }
  };

  const groupItemsByPeriod = useCallback(
    (items: TimelineItem[], period: TimelinePeriod): TimelineGroup[] => {
      const groups: Record<string, TimelineItem[]> = {};
      
      // Sort items by date, newest first
      const sortedItems = [...items].sort((a, b) => b.date.getTime() - a.date.getTime());
      
      // Group items by the specified period
      sortedItems.forEach((item) => {
        const periodLabel = formatDateByPeriod(item.date, period);
        if (!groups[periodLabel]) {
          groups[periodLabel] = [];
        }
        groups[periodLabel].push(item);
      });
      
      // Convert the groups object to an array
      return Object.entries(groups).map(([label, items]) => ({
        label,
        startDate: items[items.length - 1].date.toISOString(), // Earliest date in the group
        items,
      }));
    },
    []
  );

  return {
    isLoading,
    items,
    filters,
    setFilters,
    emotionFilters,
    setEmotionFilters,
    groupItemsByPeriod,
  };
};
