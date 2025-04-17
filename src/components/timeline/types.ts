
import { Memory } from "../memory/types";
import { Tag } from "../tags/types";

export type TimelinePeriod = 'day' | 'week' | 'month' | 'year' | 'decade' | 'custom';

export interface TimelineItem {
  id: string;
  type: 'story' | 'memory' | 'photo' | 'audio' | 'capsule';
  title: string;
  description?: string;
  date: string;
  content_url?: string;
  tags?: Tag[];
  metadata?: Record<string, any>;
}

export interface TimelineFilters {
  contentTypes?: string[];
  dateRange?: {
    start?: string;
    end?: string;
  };
  tags?: string[];
  searchQuery?: string;
  groupBy?: TimelinePeriod;
}

export interface TimelineGroup {
  label: string;
  period: TimelinePeriod;
  startDate: string;
  endDate: string;
  items: TimelineItem[];
}

export interface TimelineViewProps {
  items?: TimelineItem[];
  isLoading?: boolean;
  filters?: TimelineFilters;
  onFilterChange?: (filters: TimelineFilters) => void;
  emptyStateMessage?: string;
}

// Helper function to convert various content types to TimelineItem
export const convertToTimelineItem = (
  item: any, 
  type: TimelineItem['type']
): TimelineItem => {
  switch (type) {
    case 'memory':
      const memory = item as Memory;
      return {
        id: memory.id,
        type,
        title: memory.title,
        description: memory.description,
        date: memory.created_at,
        content_url: memory.content_url,
        metadata: memory.metadata
      };
    case 'story':
      return {
        id: item.id,
        type,
        title: item.title,
        description: item.description,
        date: item.created_at,
        content_url: item.audio_url,
        tags: item.tags,
        metadata: item.metadata
      };
    case 'photo':
      return {
        id: item.id,
        type,
        title: item.caption || 'Photo',
        date: item.taken_at || item.created_at,
        content_url: item.photo_url,
        metadata: item.metadata
      };
    // Add other types as needed
    default:
      return {
        id: item.id,
        type,
        title: item.title || 'Untitled',
        description: item.description,
        date: item.created_at,
        metadata: item.metadata
      };
  }
};
