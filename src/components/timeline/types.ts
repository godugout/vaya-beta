
export type TimelinePeriod = 'day' | 'week' | 'month' | 'year' | 'decade';
export type ContentType = 'memory' | 'story' | 'event' | 'photo';

export interface TimelineFilters {
  contentTypes: ContentType[];
  groupBy: TimelinePeriod;
  dateRange?: {
    from: Date;
    to: Date;
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
