
import { Heart, History, Star, Lightbulb, Music, Scroll, Laugh, Utensils, Tree, Globe } from 'lucide-react';
import React from 'react';

export interface LocalizedPrompt {
  id: string;
  content: string;
  context?: string;
}

export interface HanumanPromptCategory {
  id: string;
  name_en: string;
  name_es: string;
  description_en: string;
  description_es: string;
  icon: React.ReactNode;
  colorKey: string;
  prompts?: LocalizedPrompt[];
  prompts_es?: LocalizedPrompt[];
}

export const hanumanPromptCategories: HanumanPromptCategory[] = [
  {
    id: "love",
    name_en: "Love & Relationships",
    name_es: "Amor y Relaciones",
    description_en: "Explore the bonds of love and relationships in your family",
    description_es: "Explora los lazos de amor y relaciones en tu familia",
    icon: React.createElement(Heart),
    colorKey: "red",
    prompts: [
      {
        id: "love-1",
        content: "Tell me about how your parents met and fell in love."
      },
      {
        id: "love-2",
        content: "What's the most romantic gesture someone in your family has made?"
      }
    ],
    prompts_es: [
      {
        id: "love-1-es",
        content: "Cuéntame cómo se conocieron y se enamoraron tus padres."
      },
      {
        id: "love-2-es",
        content: "¿Cuál es el gesto más romántico que ha hecho alguien en tu familia?"
      }
    ]
  },
  {
    id: "history",
    name_en: "Family History",
    name_es: "Historia Familiar",
    description_en: "Discover your family's heritage and historical journey",
    description_es: "Descubre la herencia e historia de tu familia",
    icon: React.createElement(History),
    colorKey: "blue",
    prompts: [
      {
        id: "history-1",
        content: "What's the oldest family story that has been passed down through generations?"
      },
      {
        id: "history-2",
        content: "Tell me about your family's migration story or how they came to live where they are now."
      }
    ],
    prompts_es: [
      {
        id: "history-1-es",
        content: "¿Cuál es la historia familiar más antigua que se ha transmitido de generación en generación?"
      },
      {
        id: "history-2-es",
        content: "Cuéntame sobre la historia de migración de tu familia o cómo llegaron a vivir donde están ahora."
      }
    ]
  },
  {
    id: "values",
    name_en: "Values & Beliefs",
    name_es: "Valores y Creencias",
    description_en: "Reflect on the core values that unite your family",
    description_es: "Reflexiona sobre los valores fundamentales que unen a tu familia",
    icon: React.createElement(Star),
    colorKey: "yellow",
    prompts: [
      {
        id: "values-1",
        content: "What values do you think are most important in your family?"
      },
      {
        id: "values-2",
        content: "How have your family's beliefs shaped who you are today?"
      }
    ],
    prompts_es: [
      {
        id: "values-1-es",
        content: "¿Qué valores crees que son más importantes en tu familia?"
      },
      {
        id: "values-2-es",
        content: "¿Cómo han influido las creencias de tu familia en quién eres hoy?"
      }
    ]
  },
  {
    id: "lessons",
    name_en: "Life Lessons",
    name_es: "Lecciones de Vida",
    description_en: "Share important lessons and wisdom gained through experience",
    description_es: "Comparte lecciones importantes y sabiduría adquirida a través de la experiencia",
    icon: React.createElement(Lightbulb),
    colorKey: "purple",
    prompts: [
      {
        id: "lessons-1",
        content: "What's the most important life lesson you've learned from an elder in your family?"
      },
      {
        id: "lessons-2",
        content: "Share a mistake you've made that taught you something valuable."
      }
    ],
    prompts_es: [
      {
        id: "lessons-1-es",
        content: "¿Cuál es la lección de vida más importante que has aprendido de un anciano en tu familia?"
      },
      {
        id: "lessons-2-es",
        content: "Comparte un error que hayas cometido que te enseñó algo valioso."
      }
    ]
  },
  {
    id: "traditions",
    name_en: "Traditions",
    name_es: "Tradiciones",
    description_en: "Celebrate the traditions that define your family's identity",
    description_es: "Celebra las tradiciones que definen la identidad de tu familia",
    icon: React.createElement(Music),
    colorKey: "green",
    prompts: [
      {
        id: "traditions-1",
        content: "Describe a special family tradition and why it's meaningful to you."
      },
      {
        id: "traditions-2",
        content: "What holiday celebration is most important in your family and how do you celebrate it?"
      }
    ],
    prompts_es: [
      {
        id: "traditions-1-es",
        content: "Describe una tradición familiar especial y por qué es significativa para ti."
      },
      {
        id: "traditions-2-es",
        content: "¿Qué celebración festiva es más importante en tu familia y cómo la celebran?"
      }
    ]
  },
  {
    id: "stories",
    name_en: "Family Stories",
    name_es: "Historias Familiares",
    description_en: "Capture the memorable stories that bring your family to life",
    description_es: "Captura las historias memorables que dan vida a tu familia",
    icon: React.createElement(Scroll),
    colorKey: "orange",
    prompts: [
      {
        id: "stories-1",
        content: "Tell me about a family member who has an extraordinary or unusual story."
      },
      {
        id: "stories-2",
        content: "What's your favorite childhood memory involving your family?"
      }
    ],
    prompts_es: [
      {
        id: "stories-1-es",
        content: "Háblame de un familiar que tenga una historia extraordinaria o inusual."
      },
      {
        id: "stories-2-es",
        content: "¿Cuál es tu recuerdo de infancia favorito que involucre a tu familia?"
      }
    ]
  },
  {
    id: "humor",
    name_en: "Humor",
    name_es: "Humor",
    description_en: "Share the laughter and jokes that lighten your family gatherings",
    description_es: "Comparte las risas y bromas que alegran tus reuniones familiares",
    icon: React.createElement(Laugh),
    colorKey: "pink",
    prompts: [
      {
        id: "humor-1",
        content: "Who is the funniest person in your family and what makes them so funny?"
      },
      {
        id: "humor-2",
        content: "Share a family inside joke and the story behind it."
      }
    ],
    prompts_es: [
      {
        id: "humor-1-es",
        content: "¿Quién es la persona más divertida de tu familia y qué la hace tan graciosa?"
      },
      {
        id: "humor-2-es",
        content: "Comparte una broma interna familiar y la historia detrás de ella."
      }
    ]
  },
  {
    id: "food",
    name_en: "Food & Recipes",
    name_es: "Comida y Recetas",
    description_en: "Preserve the flavors and recipes that have been passed down",
    description_es: "Preserva los sabores y recetas que se han transmitido",
    icon: React.createElement(Utensils),
    colorKey: "teal",
    prompts: [
      {
        id: "food-1",
        content: "What's a family recipe that has been passed down through generations?"
      },
      {
        id: "food-2",
        content: "Tell me about a memorable meal that your family shared together."
      }
    ],
    prompts_es: [
      {
        id: "food-1-es",
        content: "¿Cuál es una receta familiar que se ha transmitido de generación en generación?"
      },
      {
        id: "food-2-es",
        content: "Cuéntame sobre una comida memorable que tu familia compartió junta."
      }
    ]
  },
  {
    id: "ancestry",
    name_en: "Ancestry & Roots",
    name_es: "Ancestros y Raíces",
    description_en: "Trace your family's roots and connect with your ancestors",
    description_es: "Rastrea las raíces de tu familia y conéctate con tus ancestros",
    icon: React.createElement(Tree),
    colorKey: "brown",
    prompts: [
      {
        id: "ancestry-1",
        content: "Do you know the story of your family name and what it means?"
      },
      {
        id: "ancestry-2",
        content: "If you've done ancestry research, what's the most interesting thing you've discovered?"
      }
    ],
    prompts_es: [
      {
        id: "ancestry-1-es",
        content: "¿Conoces la historia de tu apellido familiar y lo que significa?"
      },
      {
        id: "ancestry-2-es",
        content: "Si has hecho investigación de ancestros, ¿qué es lo más interesante que has descubierto?"
      }
    ]
  },
  {
    id: "culture",
    name_en: "Cultural Heritage",
    name_es: "Herencia Cultural",
    description_en: "Honor the cultural traditions that enrich your family's heritage",
    description_es: "Honra las tradiciones culturales que enriquecen la herencia de tu familia",
    icon: React.createElement(Globe),
    colorKey: "indigo",
    prompts: [
      {
        id: "culture-1",
        content: "How does your family maintain connection to its cultural heritage?"
      },
      {
        id: "culture-2",
        content: "What aspects of your cultural background are you most proud of?"
      }
    ],
    prompts_es: [
      {
        id: "culture-1-es",
        content: "¿Cómo mantiene tu familia la conexión con su herencia cultural?"
      },
      {
        id: "culture-2-es",
        content: "¿Qué aspectos de tu origen cultural te enorgullecen más?"
      }
    ]
  }
];
