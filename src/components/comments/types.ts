
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
  };
  content: string;
  timestamp: Date;
  reactions: CommentReactions;
  userReaction?: 'heart' | 'smile' | 'wow';
}

export type ReactionType = 'heart' | 'smile' | 'wow';
