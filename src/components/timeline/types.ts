
export type TimelinePeriod = 'day' | 'week' | 'month' | 'year' | 'decade';
export type ContentType = 'memory' | 'story' | 'event' | 'photo' | 'audio' | 'capsule';

export interface TimelineFilters {
  contentTypes: ContentType[];
  groupBy: TimelinePeriod;
  searchQuery?: string;
  dateRange?: {
    start?: Date | string;
    end?: Date | string;
  };
}

export interface TimelineItem {
  id: string;
  title: string;
  date: Date;
  type: ContentType;
  content: string;
  image?: string;
  emotions?: string[];
}

export interface TimelineGroup {
  label: string;
  startDate: string;
  items: TimelineItem[];
}
