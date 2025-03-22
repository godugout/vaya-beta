
import React, { ReactNode } from 'react';
import { 
  Pin, Calendar, Cake, Heart, Camera, Family, 
  Map, School, Briefcase, Sparkles, Music 
} from 'lucide-react';

export interface HanumanPromptCategory {
  id: string;
  name_en: string;
  name_es: string;
  description_en: string;
  description_es: string;
  colorKey: string;
  icon: ReactNode;
  prompts?: string[];
}

export interface LocalizedPrompt {
  id: string;
  category_id: string;
  prompt_en: string;
  prompt_es: string;
  cultural_context_en?: string;
  cultural_context_es?: string;
  active: boolean;
}

export const hanumanPromptCategories: HanumanPromptCategory[] = [
  {
    id: 'childhood',
    name_en: 'Childhood',
    name_es: 'Infancia',
    description_en: 'Memories from your early years',
    description_es: 'Recuerdos de tus primeros años',
    colorKey: 'personal',
    icon: <Pin className="h-4 w-4" />,
    prompts: [
      'Tell me about your favorite childhood toy.',
      'What was your favorite game to play as a child?',
      'Describe your childhood home.'
    ]
  },
  {
    id: 'events',
    name_en: 'Events',
    name_es: 'Eventos',
    description_en: 'Significant occasions and celebrations',
    description_es: 'Ocasiones y celebraciones importantes',
    colorKey: 'celebrations',
    icon: <Calendar className="h-4 w-4" />,
    prompts: [
      'Share a memory from an important family celebration.',
      'Tell me about a holiday tradition your family keeps.',
      'Describe a memorable family vacation.'
    ]
  },
  {
    id: 'milestones',
    name_en: 'Milestones',
    name_es: 'Hitos',
    description_en: 'Important life achievements',
    description_es: 'Logros importantes de la vida',
    colorKey: 'wisdom',
    icon: <Cake className="h-4 w-4" />,
    prompts: [
      'What was one of your proudest moments?',
      'Tell me about a significant transition in your life.',
      'Describe an important decision you made.'
    ]
  },
  {
    id: 'relationships',
    name_en: 'Relationships',
    name_es: 'Relaciones',
    description_en: 'Connections with family and friends',
    description_es: 'Conexiones con familiares y amigos',
    colorKey: 'relationships',
    icon: <Heart className="h-4 w-4" />,
    prompts: [
      'How did you meet your spouse or partner?',
      'Tell me about a friendship that has meant a lot to you.',
      'Who has been a mentor in your life?'
    ]
  },
  {
    id: 'photographs',
    name_en: 'Photographs',
    name_es: 'Fotografías',
    description_en: 'Stories behind family pictures',
    description_es: 'Historias detrás de fotos familiares',
    colorKey: 'heritage',
    icon: <Camera className="h-4 w-4" />,
    prompts: [
      'Tell me about an old family photograph.',
      'What\'s the story behind this picture?',
      'Describe a photograph you wish you had taken.'
    ]
  },
  {
    id: 'ancestors',
    name_en: 'Ancestors',
    name_es: 'Ancestros',
    description_en: 'Stories from previous generations',
    description_es: 'Historias de generaciones anteriores',
    colorKey: 'generations',
    icon: <Family className="h-4 w-4" />,
    prompts: [
      'What stories did your grandparents tell about their lives?',
      'Tell me about a family heirloom and its history.',
      'What do you know about where our family came from?'
    ]
  },
  {
    id: 'places',
    name_en: 'Places',
    name_es: 'Lugares',
    description_en: 'Locations that shaped your life',
    description_es: 'Lugares que formaron tu vida',
    colorKey: 'places',
    icon: <Map className="h-4 w-4" />,
    prompts: [
      'Tell me about where you grew up.',
      'What place holds special meaning for you?',
      'Describe a place you\'ve lived that changed you.'
    ]
  },
  {
    id: 'education',
    name_en: 'Education',
    name_es: 'Educación',
    description_en: 'Learning experiences and schooling',
    description_es: 'Experiencias de aprendizaje y educación',
    colorKey: 'cultural',
    icon: <School className="h-4 w-4" />,
    prompts: [
      'Who was your favorite teacher and why?',
      'Tell me about a lesson that stayed with you.',
      'What was school like for you?'
    ]
  },
  {
    id: 'career',
    name_en: 'Career',
    name_es: 'Carrera',
    description_en: 'Work experiences and professional life',
    description_es: 'Experiencias laborales y vida profesional',
    colorKey: 'default',
    icon: <Briefcase className="h-4 w-4" />,
    prompts: [
      'What was your first job?',
      'Tell me about your career path.',
      'What work achievements are you most proud of?'
    ]
  },
  {
    id: 'wisdom',
    name_en: 'Wisdom',
    name_es: 'Sabiduría',
    description_en: 'Life lessons and advice',
    description_es: 'Lecciones de vida y consejos',
    colorKey: 'wisdom',
    icon: <Sparkles className="h-4 w-4" />,
    prompts: [
      'What\'s the best advice you\'ve ever received?',
      'What would you tell your younger self?',
      'What life lessons would you like to pass on?'
    ]
  },
  {
    id: 'traditions',
    name_en: 'Traditions',
    name_es: 'Tradiciones',
    description_en: 'Family customs and rituals',
    description_es: 'Costumbres y rituales familiares',
    colorKey: 'heritage',
    icon: <Music className="h-4 w-4" />,
    prompts: [
      'What family traditions are most important to you?',
      'Tell me about a food tradition in our family.',
      'What cultural practices have you maintained?'
    ]
  }
];

export const hanumanPrompts: LocalizedPrompt[] = [
  {
    id: 'childhood-1',
    category_id: 'childhood',
    prompt_en: 'Tell me about your favorite childhood toy.',
    prompt_es: 'Cuéntame sobre tu juguete favorito de la infancia.',
    cultural_context_en: 'Toys often have cultural significance across generations',
    cultural_context_es: 'Los juguetes a menudo tienen significado cultural a través de generaciones',
    active: true
  },
  {
    id: 'childhood-2',
    category_id: 'childhood',
    prompt_en: 'What games did you play as a child?',
    prompt_es: '¿A qué juegos jugabas cuando eras niño/a?',
    cultural_context_en: 'Traditional games reflect cultural values',
    cultural_context_es: 'Los juegos tradicionales reflejan valores culturales',
    active: true
  },
  {
    id: 'childhood-3',
    category_id: 'childhood',
    prompt_en: 'Describe your childhood home and neighborhood.',
    prompt_es: 'Describe tu hogar y vecindario de la infancia.',
    active: true
  }
];

export default hanumanPromptCategories;
