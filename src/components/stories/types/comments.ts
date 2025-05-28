
export type ReactionType = 'heart' | 'smile' | 'wow';

export interface CommentReactions {
  heart: number;
  smile: number;
  wow: number;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    relationship: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date;
  reactions: CommentReactions;
  userReaction?: ReactionType;
}
