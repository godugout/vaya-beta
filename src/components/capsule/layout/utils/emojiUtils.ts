import { LucideIcon } from "lucide-react";

export const getEmojiForIcon = (icon: LucideIcon, title?: string, description?: string): string => {
  const contentLower = `${title} ${description}`.toLowerCase();
  
  if (contentLower.includes('beach')) return '🏖️';
  if (contentLower.includes('heritage') || contentLower.includes('cultural')) return '🏺';
  if (contentLower.includes('story') || contentLower.includes('share')) return '📖';
  if (contentLower.includes('family') || contentLower.includes('reunion')) return '👨‍👩‍👧‍👦';
  if (contentLower.includes('dinner') || contentLower.includes('food')) return '🍽️';
  if (contentLower.includes('holiday') || contentLower.includes('celebration')) return '🎊';
  if (contentLower.includes('wedding')) return '💑';
  if (contentLower.includes('graduation')) return '🎓';
  if (contentLower.includes('birthday')) return '🎂';
  if (contentLower.includes('music') || contentLower.includes('concert')) return '🎵';
  if (contentLower.includes('travel') || contentLower.includes('vacation')) return '✈️';
  if (contentLower.includes('garden') || contentLower.includes('nature')) return '🌺';
  if (contentLower.includes('sport') || contentLower.includes('game')) return '⚽';
  if (contentLower.includes('cooking') || contentLower.includes('recipe')) return '👩‍🍳';
  if (contentLower.includes('art') || contentLower.includes('craft')) return '🎨';
  
  const emojiMap = {
    Camera: '📸',
    MessageCircle: '💭',
    Heart: '💝',
    HelpCircle: '💡',
    Users: '👥',
    Music: '🎼',
    Book: '📚',
    Calendar: '📅',
    MapPin: '📍',
    Image: '🖼️',
    Star: '⭐',
    Gift: '🎁',
    GraduationCap: '🎓',
  };
  
  return emojiMap[icon.name as keyof typeof emojiMap] || '💫';
};