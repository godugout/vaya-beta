
import { 
  MessageSquare,
  AudioWaveform,
  BookOpen,
  Users,
  HeartHandshake,
  Lightbulb,
  Globe,
  Heart,
  Milestone,
  User,
  Home,
  Network,
  Image,
  Link,
  Landmark,
  LucideIcon,
  LucideProps
} from "lucide-react";
import React, { ReactNode } from "react";

export const getIconComponent = (iconName: string): ReactNode => {
  const iconMap: Record<string, ReactNode> = {
    "message-square": React.createElement(MessageSquare, { className: "h-4 w-4" }),
    "audio-waveform": React.createElement(AudioWaveform, { className: "h-4 w-4" }),
    "book-open": React.createElement(BookOpen, { className: "h-4 w-4" }),
    "users": React.createElement(Users, { className: "h-4 w-4" }),
    "heart-handshake": React.createElement(HeartHandshake, { className: "h-4 w-4" }),
    "lightbulb": React.createElement(Lightbulb, { className: "h-4 w-4" }),
    "globe": React.createElement(Globe, { className: "h-4 w-4" }),
    "heart": React.createElement(Heart, { className: "h-4 w-4" }),
    "milestone": React.createElement(Milestone, { className: "h-4 w-4" }),
    "user": React.createElement(User, { className: "h-4 w-4" }),
    "home": React.createElement(Home, { className: "h-4 w-4" }),
    "network": React.createElement(Network, { className: "h-4 w-4" }),
    "image": React.createElement(Image, { className: "h-4 w-4" }),
    "link": React.createElement(Link, { className: "h-4 w-4" }),
    "landmark": React.createElement(Landmark, { className: "h-4 w-4" })
  };
  
  return iconMap[iconName] || React.createElement(MessageSquare, { className: "h-4 w-4" });
};

export const getCategoryColor = (categoryId: string): string => {
  // Map category IDs to color classes
  const colorMapping: Record<string, string> = {
    // Assign colors based on category types
    "family_heritage": "lovable-magenta",
    "personal_connections": "lovable-yellow",
    "cultural_identity": "lovable-blue",
    "life_milestones": "lovable-teal",
    "cultural_dimensions": "lovable-magenta",
    "intergenerational_bridges": "lovable-yellow",
    "family_wisdom": "lovable-teal",
    "historical_context": "lovable-blue",
    // If we have more categories than colors, we can recycle colors
  };
  
  // If we don't have a specific mapping, determine based on index in categories
  if (!colorMapping[categoryId]) {
    const availableColors = ["lovable-magenta", "lovable-yellow", "lovable-teal", "lovable-blue"];
    const index = Math.abs(categoryId.charCodeAt(0) + categoryId.charCodeAt(1)) % availableColors.length;
    return availableColors[index];
  }
  
  return colorMapping[categoryId] || "lovable-magenta";
};
