
import React from 'react';
import { LifeBuoy, Heart, Trees, MessageCircle, BookOpen, Users, Home } from 'lucide-react';
import { PromptCategory, PromptItem } from '@/components/chat/hooks/types';

export const promptCategories: PromptCategory[] = [
  {
    id: 'family',
    name: { en: 'Family', es: 'Familia' },
    icon: React.createElement(Users, { size: 20 }),
    description: {
      en: 'Discover stories about your family history and traditions',
      es: 'Descubre historias sobre la historia y tradiciones de tu familia'
    }
  },
  {
    id: 'spirituality',
    name: { en: 'Spirituality', es: 'Espiritualidad' },
    icon: React.createElement(Heart, { size: 20 }),
    description: {
      en: 'Explore spiritual teachings and wisdom',
      es: 'Explora enseñanzas espirituales y sabiduría'
    }
  },
  {
    id: 'stories',
    name: { en: 'Stories', es: 'Historias' },
    icon: React.createElement(BookOpen, { size: 20 }),
    description: {
      en: 'Listen to engaging stories and parables',
      es: 'Escucha historias y parábolas interesantes'
    }
  },
  {
    id: 'nature',
    name: { en: 'Nature', es: 'Naturaleza' },
    icon: React.createElement(Trees, { size: 20 }),
    description: {
      en: 'Learn about natural harmony and environmental wisdom',
      es: 'Aprende sobre la armonía natural y la sabiduría ambiental'
    }
  },
  {
    id: 'general',
    name: { en: 'General', es: 'General' },
    icon: React.createElement(MessageCircle, { size: 20 }),
    description: {
      en: 'Ask about various topics and get helpful responses',
      es: 'Pregunta sobre varios temas y obtén respuestas útiles'
    }
  },
  {
    id: 'home',
    name: { en: 'Home', es: 'Hogar' },
    icon: React.createElement(Home, { size: 20 }),
    description: {
      en: 'Guidance for creating a harmonious home environment',
      es: 'Guía para crear un ambiente hogareño armonioso'
    }
  },
  {
    id: 'help',
    name: { en: 'Help', es: 'Ayuda' },
    icon: React.createElement(LifeBuoy, { size: 20 }),
    description: {
      en: 'Get help with using this application',
      es: 'Obtén ayuda para usar esta aplicación'
    }
  }
];

export const familyPrompts: PromptItem[] = [
  {
    id: 'family-history',
    category: 'family',
    content: {
      en: 'Tell me about the history of the Patel family',
      es: 'Cuéntame sobre la historia de la familia Patel'
    },
    context: 'Learn about your roots'
  },
  {
    id: 'family-traditions',
    category: 'family',
    content: {
      en: 'What are some important family traditions we should maintain?',
      es: '¿Cuáles son algunas tradiciones familiares importantes que deberíamos mantener?'
    },
    context: 'Cultural preservation'
  },
  {
    id: 'family-values',
    category: 'family',
    content: {
      en: 'What values were most important to our ancestors?',
      es: '¿Qué valores eran más importantes para nuestros antepasados?'
    },
    context: 'Family wisdom'
  }
];

export const spiritualityPrompts: PromptItem[] = [
  {
    id: 'spiritual-teaching',
    category: 'spirituality',
    content: {
      en: 'Share a spiritual teaching about inner peace',
      es: 'Comparte una enseñanza espiritual sobre la paz interior'
    },
    context: 'Spiritual wisdom'
  },
  {
    id: 'meditation-guidance',
    category: 'spirituality',
    content: {
      en: 'Can you guide me through a simple meditation practice?',
      es: '¿Puedes guiarme a través de una práctica de meditación simple?'
    },
    context: 'Meditation'
  }
];

export const storyPrompts: PromptItem[] = [
  {
    id: 'hanuman-story',
    category: 'stories',
    content: {
      en: 'Tell me a story about Lord Hanuman',
      es: 'Cuéntame una historia sobre el Señor Hanuman'
    },
    context: 'Mythology'
  },
  {
    id: 'wisdom-parable',
    category: 'stories',
    content: {
      en: 'Share a parable that teaches about patience',
      es: 'Comparte una parábola que enseñe sobre la paciencia'
    },
    context: 'Wisdom stories'
  }
];

export const naturePrompts: PromptItem[] = [
  {
    id: 'harmony-nature',
    category: 'nature',
    content: {
      en: 'How can we live in harmony with nature?',
      es: '¿Cómo podemos vivir en armonía con la naturaleza?'
    },
    context: 'Environmental wisdom'
  },
  {
    id: 'plants-teaching',
    category: 'nature',
    content: {
      en: 'What can we learn from plants and trees?',
      es: '¿Qué podemos aprender de las plantas y los árboles?'
    },
    context: 'Natural wisdom'
  }
];

export const generalPrompts: PromptItem[] = [
  {
    id: 'daily-wisdom',
    category: 'general',
    content: {
      en: 'Share a piece of daily wisdom',
      es: 'Comparte un poco de sabiduría diaria'
    },
    context: 'Inspiration'
  },
  {
    id: 'balance-life',
    category: 'general',
    content: {
      en: 'How can I find better balance in my life?',
      es: '¿Cómo puedo encontrar mejor equilibrio en mi vida?'
    },
    context: 'Life advice'
  }
];

export const homePrompts: PromptItem[] = [
  {
    id: 'harmonious-home',
    category: 'home',
    content: {
      en: 'How can I create a more harmonious home environment?',
      es: '¿Cómo puedo crear un ambiente hogareño más armonioso?'
    },
    context: 'Home harmony'
  },
  {
    id: 'family-space',
    category: 'home',
    content: {
      en: 'What makes a house feel like a family home?',
      es: '¿Qué hace que una casa se sienta como un hogar familiar?'
    },
    context: 'Family spaces'
  }
];

export const helpPrompts: PromptItem[] = [
  {
    id: 'app-features',
    category: 'help',
    content: {
      en: 'What can I do with this application?',
      es: '¿Qué puedo hacer con esta aplicación?'
    },
    context: 'App features'
  },
  {
    id: 'conversation-tips',
    category: 'help',
    content: {
      en: 'How can I have the most meaningful conversations here?',
      es: '¿Cómo puedo tener las conversaciones más significativas aquí?'
    },
    context: 'Usage tips'
  }
];

// All prompts combined
export const allPrompts: PromptItem[] = [
  ...familyPrompts,
  ...spiritualityPrompts,
  ...storyPrompts,
  ...naturePrompts,
  ...generalPrompts,
  ...homePrompts,
  ...helpPrompts
];
