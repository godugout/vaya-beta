import { LucideIcon } from "lucide-react";

export interface CapsuleMetadata {
  creatorAvatar?: string;
  creatorInitials: string;
  itemCount: number;
  status: "active" | "upcoming" | "locked" | "revealed";
  date: string;
}

export interface Capsule {
  title: string;
  link: string;
  icon: LucideIcon;
  colorKey: string;
  metadata?: CapsuleMetadata;
}

export interface CapsuleLayoutProps {
  capsules: Capsule[];
}