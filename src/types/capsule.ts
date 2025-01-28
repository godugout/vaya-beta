export type CapsuleStatus = "upcoming" | "active" | "locked" | "revealed";

export interface CapsuleMetadata {
  creatorInitials: string;
  itemCount: number;
  status: CapsuleStatus;
  date: string;
}

export interface Capsule {
  title: string;
  description?: string; // Added optional description
  icon: any;
  colorKey: string;
  metadata?: CapsuleMetadata;
  isPlaceholder?: boolean; // Added optional isPlaceholder flag
}