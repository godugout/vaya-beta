import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AccessibleButton } from '@/components/foundation/AccessibleButton';
import { useFamilyContext } from '@/contexts/FamilyContext';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';
import { Play, Pause, Heart, Share, MessageCircle, MoreHorizontal, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EnhancedAudioPlayer } from '@/components/audio/EnhancedAudioPlayer';
import { StoryComments } from '@/components/stories/StoryComments';
import { StoryPrivacySettings } from '@/components/privacy/StoryPrivacySettings';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const [showComments, setShowComments] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showEnhancedPlayer, setShowEnhancedPlayer] = useState(false);

  const member = members.find(m => m.id === memberId);
  const memberName = member?.name || 'Unknown';

  // Mock data - in real app this would come from props or context
  const [comments, setComments] = useState([
    {
      id: '1',
      author: { name: 'Grandmother Rosa', relationship: 'Grandmother' },
      content: 'This brings back so many memories of when I was young!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      reactions: { heart: 3, smile: 1, wow: 0 },
      userReaction: 'heart' as const
    }
  ]);

  const [privacySettings, setPrivacySettings] = useState({
    level: 'family' as const,
    allowedMembers: members.map(m => m.id),
    allowComments: true,
    allowDownload: true,
    allowSharing: true
  });

  const handleAddComment = (content: string) => {
    const newComment = {
      id: crypto.randomUUID(),
      author: { name: 'You', relationship: 'Family Member' },
      content,
      timestamp: new Date(),
      reactions: { heart: 0, smile: 0, wow: 0 }
    };
    setComments(prev => [...prev, newComment]);
  };

  const handleReact = (commentId: string, reaction: 'heart' | 'smile' | 'wow') => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        const newReactions = { ...comment.reactions };
        if (comment.userReaction === reaction) {
          newReactions[reaction]--;
          return { ...comment, reactions: newReactions, userReaction: undefined };
        } else {
          if (comment.userReaction) {
            newReactions[comment.userReaction]--;
          }
          newReactions[reaction]++;
          return { ...comment, reactions: newReactions, userReaction: reaction };
        }
      }
      return comment;
    }));
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
          
          <div className="flex items-center space-x-2">
            {story.type === 'audio' && story.duration && (
              <Badge variant="secondary" className="text-xs">
                {formatDuration(story.duration)}
              </Badge>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  ariaLabel="More options"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </AccessibleButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowPrivacySettings(!showPrivacySettings)}>
                  Privacy Settings
                </DropdownMenuItem>
                {privacySettings.allowDownload && (
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Content Preview */}
        {story.content && (
          <div className={cn('text-gray-700 line-clamp-3', getTextSizeClass())}>
            {story.content}
          </div>
        )}

        {/* Enhanced Audio Player */}
        {story.type === 'audio' && showEnhancedPlayer && story.audioUrl && (
          <EnhancedAudioPlayer
            audioUrl={story.audioUrl}
            title={story.title}
            duration={story.duration}
            onDownload={privacySettings.allowDownload ? () => console.log('Download') : undefined}
            onShare={privacySettings.allowSharing ? onShare : undefined}
          />
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
                onClick={() => setShowEnhancedPlayer(!showEnhancedPlayer)}
                ariaLabel={showEnhancedPlayer ? 'Show simple player' : 'Show enhanced player'}
                className="flex items-center space-x-2"
              >
                {showEnhancedPlayer ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{showEnhancedPlayer ? 'Simple' : 'Enhanced'} Player</span>
              </AccessibleButton>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={onLike}
              ariaLabel="Like this story"
              className="flex items-center space-x-1"
            >
              <Heart className="h-4 w-4" />
              <span className="text-xs">Like</span>
            </AccessibleButton>
            
            {privacySettings.allowComments && (
              <AccessibleButton
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                ariaLabel="Toggle comments"
                className="flex items-center space-x-1"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{comments.length}</span>
              </AccessibleButton>
            )}
            
            {privacySettings.allowSharing && (
              <AccessibleButton
                variant="ghost"
                size="sm"
                onClick={onShare}
                ariaLabel="Share this story"
              >
                <Share className="h-4 w-4" />
              </AccessibleButton>
            )}
          </div>
        </div>

        {/* Privacy Settings */}
        {showPrivacySettings && (
          <StoryPrivacySettings
            storyId={story.id}
            currentSettings={privacySettings}
            familyMembers={members.map(m => ({
              id: m.id,
              name: m.name,
              relationship: m.metadata.culturalRole || 'Family Member'
            }))}
            onSettingsChange={setPrivacySettings}
            onGenerateShareLink={() => `https://vaya.app/story/${story.id}?token=${crypto.randomUUID()}`}
          />
        )}

        {/* Comments Section */}
        {showComments && privacySettings.allowComments && (
          <StoryComments
            storyId={story.id}
            comments={comments}
            onAddComment={handleAddComment}
            onReact={handleReact}
          />
        )}
      </CardContent>
    </Card>
  );
};
