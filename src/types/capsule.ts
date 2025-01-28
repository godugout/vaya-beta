export type CapsuleStatus = "upcoming" | "active" | "locked" | "revealed";

export interface CapsuleMetadata {
  creatorInitials: string;
  itemCount: number;
  status: CapsuleStatus;
  date: string;
}

export interface Capsule {
  title: string;
  link: string;
  icon: any;
  colorKey: string;
  metadata?: CapsuleMetadata;
}