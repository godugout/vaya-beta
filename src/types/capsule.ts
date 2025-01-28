export type CapsuleStatus = "upcoming" | "active" | "locked" | "revealed";

export interface CapsuleMetadata {
  creatorInitials: string;
  itemCount: number;
  status: CapsuleStatus;
  date: string;
}

export interface Capsule {
  title: string;
  description?: string;
  icon: any;
  colorKey: string;
  link?: string;
  metadata?: CapsuleMetadata;
  isPlaceholder?: boolean;
  prompts?: string[];
}