
export type CapsuleStatus = "upcoming" | "active" | "locked" | "revealed";

export interface CapsuleMetadata {
  creatorInitials: string;
  itemCount: number;
  status: CapsuleStatus;
  date: string;
}

export interface Capsule {
  id?: string;  // Adding id property to the Capsule interface
  title: string;
  description?: string;
  icon: any;
  colorKey: string;
  link?: string;
  metadata?: CapsuleMetadata;
  isPlaceholder?: boolean;
  prompts?: string[];
  backgroundImage?: string;
}
