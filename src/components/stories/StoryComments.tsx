
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Heart, Plus, Send, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    relationship?: string;
  };
  content: string;
  timestamp: Date;
  reactions: {
    heart: number;
    smile: number;
    wow: number;
  };
  userReaction?: 'heart' | 'smile' | 'wow';
}

interface StoryCommentsProps {
  storyId: string;
  comments: Comment[];
  onAddComment: (content: string) => void;
  onReact: (commentId: string, reaction: 'heart' | 'smile' | 'wow') => void;
  className?: string;
}

export const StoryComments = ({ 
  storyId, 
  comments, 
  onAddComment, 
  onReact,
  className 
}: StoryCommentsProps) => {
  const { getTextSizeClass, getTouchTargetClass } = useAccessibilityContext();
  const [newComment, setNewComment] = useState('');
  const [showAddComment, setShowAddComment] = useState(false);

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
      setShowAddComment(false);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getReactionEmoji = (reaction: string) => {
    switch (reaction) {
      case 'heart': return '❤️';
      case 'smile': return '😊';
      case 'wow': return '😮';
      default: return '👍';
    }
  };

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-4">
        <CardTitle className={cn('flex items-center space-x-2', getTextSizeClass())}>
          <MessageCircle className="h-5 w-5" />
          <span>Family Comments ({comments.length})</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Comments List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback className="text-xs">
                      {comment.author.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={cn('font-medium', getTextSizeClass())}>
                        {comment.author.name}
                      </span>
                      {comment.author.relationship && (
                        <Badge variant="outline" className="text-xs">
                          {comment.author.relationship}
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(comment.timestamp)}
                      </span>
                    </div>
                    
                    <p className={cn('text-gray-700', getTextSizeClass())}>
                      {comment.content}
                    </p>
                    
                    {/* Reactions */}
                    <div className="flex items-center space-x-4 mt-2">
                      {Object.entries(comment.reactions).map(([reaction, count]) => (
                        count > 0 && (
                          <Button
                            key={reaction}
                            variant="ghost"
                            size="sm"
                            className={cn(
                              'h-8 px-2 text-xs',
                              comment.userReaction === reaction && 'bg-blue-100 text-blue-600'
                            )}
                            onClick={() => onReact(comment.id, reaction as 'heart' | 'smile' | 'wow')}
                          >
                            {getReactionEmoji(reaction)} {count}
                          </Button>
                        )
                      ))}
                      
                      {/* Add reaction button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => onReact(comment.id, 'heart')}
                      >
                        <Heart className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Add Comment Section */}
        <div className="border-t pt-4">
          <AnimatePresence>
            {showAddComment ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <Textarea
                  placeholder="Share your thoughts about this story..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px] resize-none"
                  maxLength={500}
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {500 - newComment.length} characters remaining
                  </span>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowAddComment(false);
                        setNewComment('');
                      }}
                    >
                      Cancel
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <Button
                variant="outline"
                className={cn('w-full', getTouchTargetClass())}
                onClick={() => setShowAddComment(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your Thoughts
              </Button>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};
