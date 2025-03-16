
export interface MemoryCapsuleContributor {
  name: string;
  avatar?: string;
}

export interface MemoryCapsule {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  revealDate: string;
  status: "locked" | "unlocked";
  contributors: MemoryCapsuleContributor[];
  contentType: "text" | "image" | "audio" | "mixed";
  contentCount: number;
}

export interface MemoryCapsuleTimelineProps {
  capsules?: MemoryCapsule[];
  onViewCapsule?: (id: string) => void;
  onCreateCapsule?: () => void;
}
