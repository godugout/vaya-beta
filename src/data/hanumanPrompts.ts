
import { ReactNode } from 'react';
import { 
  Pin, Calendar, Cake, Heart, Camera, Family, 
  Map, School, Briefcase, Sparkles, Music 
} from 'lucide-react';

export interface HanumanPromptCategory {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  prompts: string[];
}

export const hanumanPromptCategories: HanumanPromptCategory[] = [
  {
    id: 'childhood',
    name: 'Childhood',
    description: 'Memories from your early years',
    icon: <Pin className="h-4 w-4" />,
    prompts: [
      'Tell me about your favorite childhood toy.',
      'What was your favorite game to play as a child?',
      'Describe your childhood home.',
    ]
  },
  {
    id: 'events',
    name: 'Events',
    description: 'Significant occasions and celebrations',
    icon: <Calendar className="h-4 w-4" />,
    prompts: [
      'Share a memory from an important family celebration.',
      'Tell me about a holiday tradition your family keeps.',
      'Describe a memorable family vacation.',
    ]
  },
  {
    id: 'milestones',
    name: 'Milestones',
    description: 'Important life achievements',
    icon: <Cake className="h-4 w-4" />,
    prompts: [
      'What was one of your proudest moments?',
      'Tell me about a significant transition in your life.',
      'Describe an important decision you made.',
    ]
  },
  {
    id: 'relationships',
    name: 'Relationships',
    description: 'Connections with family and friends',
    icon: <Heart className="h-4 w-4" />,
    prompts: [
      'How did you meet your spouse or partner?',
      'Tell me about a friendship that has meant a lot to you.',
      'Who has been a mentor in your life?',
    ]
  },
  {
    id: 'photographs',
    name: 'Photographs',
    description: 'Stories behind family pictures',
    icon: <Camera className="h-4 w-4" />,
    prompts: [
      'Tell me about an old family photograph.',
      'What's the story behind this picture?',
      'Describe a photograph you wish you had taken.',
    ]
  },
  {
    id: 'ancestors',
    name: 'Ancestors',
    description: 'Stories from previous generations',
    icon: <Family className="h-4 w-4" />,
    prompts: [
      'What stories did your grandparents tell about their lives?',
      'Tell me about a family heirloom and its history.',
      'What do you know about where our family came from?',
    ]
  },
  {
    id: 'places',
    name: 'Places',
    description: 'Locations that shaped your life',
    icon: <Map className="h-4 w-4" />,
    prompts: [
      'Tell me about where you grew up.',
      'What place holds special meaning for you?',
      'Describe a place you've lived that changed you.',
    ]
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Learning experiences and schooling',
    icon: <School className="h-4 w-4" />,
    prompts: [
      'Who was your favorite teacher and why?',
      'Tell me about a lesson that stayed with you.',
      'What was school like for you?',
    ]
  },
  {
    id: 'career',
    name: 'Career',
    description: 'Work experiences and professional life',
    icon: <Briefcase className="h-4 w-4" />,
    prompts: [
      'What was your first job?',
      'Tell me about your career path.',
      'What work achievements are you most proud of?',
    ]
  },
  {
    id: 'wisdom',
    name: 'Wisdom',
    description: 'Life lessons and advice',
    icon: <Sparkles className="h-4 w-4" />,
    prompts: [
      'What's the best advice you've ever received?',
      'What would you tell your younger self?',
      'What life lessons would you like to pass on?',
    ]
  },
  {
    id: 'traditions',
    name: 'Traditions',
    description: 'Family customs and rituals',
    icon: <Music className="h-4 w-4" />,
    prompts: [
      'What family traditions are most important to you?',
      'Tell me about a food tradition in our family.',
      'What cultural practices have you maintained?',
    ]
  }
];

export default hanumanPromptCategories;
