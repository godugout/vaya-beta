
export type TimelinePeriod = 'day' | 'week' | 'month' | 'year' | 'decade';
export type ContentType = 'memory' | 'story' | 'event' | 'photo' | 'audio' | 'capsule';
export type EmotionType = 'joy' | 'nostalgia' | 'reverence' | 'excitement' | 'sadness';

export interface TimelineFilters {
  contentTypes: ContentType[];
  groupBy: TimelinePeriod;
  searchQuery?: string;
  dateRange?: {
    start?: Date | string;
    end?: Date | string;
  };
  emotions?: EmotionType[];
}

export interface TimelineItem {
  id: string;
  title: string;
  date: Date | string;
  type: ContentType;
  content: string;
  image?: string;
  emotions?: string[];
  description?: string;
}

export interface TimelineGroup {
  label: string;
  startDate: string;
  endDate?: string;
  period?: TimelinePeriod;
  items: TimelineItem[];
}

/**
 * Converts database record to TimelineItem
 * @param record Database record from stories or memories table
 * @param type Content type (story, memory, etc.)
 * @returns Standardized TimelineItem object
 */
export function convertToTimelineItem(record: any, type: ContentType): TimelineItem {
  // Base TimelineItem properties
  const item: TimelineItem = {
    id: record.id,
    title: record.title,
    date: record.created_at || new Date().toISOString(),
    type: type,
    content: record.description || '',
  };

  // Add type-specific properties
  switch (type) {
    case 'story':
      item.image = record.thumbnail_url || '';
      // If we have emotion tags from the story_emotion_tags join
      if (record.emotions && Array.isArray(record.emotions)) {
        item.emotions = record.emotions.map((e: any) => e.emotion);
      }
      break;
    case 'memory':
      item.image = record.content_url || '';
      break;
    case 'photo':
      item.image = record.photo_url || '';
      break;
    case 'audio':
      item.image = '/placeholder.svg'; // Default placeholder for audio
      break;
  }

  return item;
}
