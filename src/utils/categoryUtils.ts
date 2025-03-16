
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
  Landmark
} from "lucide-react";
import { ReactNode } from "react";

export const getIconComponent = (iconName: string): ReactNode => {
  const iconMap: Record<string, ReactNode> = {
    "message-square": <MessageSquare className="h-4 w-4" />,
    "audio-waveform": <AudioWaveform className="h-4 w-4" />,
    "book-open": <BookOpen className="h-4 w-4" />,
    "users": <Users className="h-4 w-4" />,
    "heart-handshake": <HeartHandshake className="h-4 w-4" />,
    "lightbulb": <Lightbulb className="h-4 w-4" />,
    "globe": <Globe className="h-4 w-4" />,
    "heart": <Heart className="h-4 w-4" />,
    "milestone": <Milestone className="h-4 w-4" />,
    "user": <User className="h-4 w-4" />,
    "home": <Home className="h-4 w-4" />,
    "network": <Network className="h-4 w-4" />,
    "image": <Image className="h-4 w-4" />,
    "link": <Link className="h-4 w-4" />,
    "landmark": <Landmark className="h-4 w-4" />
  };
  
  return iconMap[iconName] || <MessageSquare className="h-4 w-4" />;
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
