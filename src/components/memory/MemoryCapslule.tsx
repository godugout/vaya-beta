
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AccessibleButton } from '@/components/foundation/AccessibleButton';
import { useFamilyContext } from '@/contexts/FamilyContext';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';
import { Play, Pause, Heart, Share } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MemoryCapsuleProps {
  story: {
    id: string;
    title: string;
    type: 'audio' | 'text' | 'video';
    tags: string[];
    createdAt: string;
    content?: string;
    audioUrl?: string;
    duration?: number;
  };
  memberId: string;
  onPlay?: () => void;
  onShare?: () => void;
  onLike?: () => void;
  className?: string;
}

export const MemoryCapsule = ({
  story,
  memberId,
  onPlay,
  onShare,
  onLike,
  className,
}: MemoryCapsuleProps) => {
  const { members } = useFamilyContext();
  const { getTextSizeClass, announceToScreenReader } = useAccessibilityContext();
  const [isPlaying, setIsPlaying] = React.useState(false);

  const member = members.find(m => m.id === memberId);
  const memberName = member?.name || 'Unknown';

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    onPlay?.();
    announceToScreenReader(isPlaying ? 'Paused story' : 'Playing story');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeIcon = () => {
    switch (story.type) {
      case 'audio': return '🎵';
      case 'video': return '🎬';
      case 'text': return '📝';
      default: return '💭';
    }
  };

  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-lg', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className={cn('line-clamp-2', getTextSizeClass())}>
              {getTypeIcon()} {story.title}
            </CardTitle>
            <div className="text-sm text-gray-500 mt-1">
              by {memberName} • {formatDate(story.createdAt)}
            </div>
          </div>
          
          {story.type === 'audio' && story.duration && (
            <Badge variant="secondary" className="text-xs">
              {formatDuration(story.duration)}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Content Preview */}
        {story.content && (
          <div className={cn('text-gray-700 line-clamp-3', getTextSizeClass())}>
            {story.content}
          </div>
        )}

        {/* Tags */}
        {story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex space-x-2">
            {story.type === 'audio' && (
              <AccessibleButton
                variant="outline"
                size="sm"
                onClick={handlePlay}
                ariaLabel={isPlaying ? 'Pause story' : 'Play story'}
                className="flex items-center space-x-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </AccessibleButton>
            )}
          </div>

          <div className="flex space-x-2">
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={onLike}
              ariaLabel="Like this story"
            >
              <Heart className="h-4 w-4" />
            </AccessibleButton>
            
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={onShare}
              ariaLabel="Share this story"
            >
              <Share className="h-4 w-4" />
            </AccessibleButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
