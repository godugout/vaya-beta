
import React from 'react';
import { Heart, User, Home, Clock, Gift, Star, Sparkles, Music, Leaf, Sun } from 'lucide-react';
import { PromptCategory } from '@/components/chat/hooks/types';

export const hanumanPrompts: PromptCategory[] = [
  {
    id: "family",
    name: "Family",
    nameEs: "Familia",
    description: "Explore your family roots and connections",
    descriptionEs: "Explora tus raíces familiares y conexiones",
    icon: React.createElement(Home, { size: 20 }),
    prompts: [
      {
        id: "family-1",
        content: "Tell me about your earliest family memory.",
        category: "family",
        isSpanish: false
      },
      {
        id: "family-2",
        content: "Who was the family member that influenced you the most growing up?",
        category: "family",
        isSpanish: false
      },
      {
        id: "family-3",
        content: "What family traditions are most important to you?",
        category: "family",
        isSpanish: false
      },
      {
        id: "family-1-es",
        content: "Cuéntame sobre tu primer recuerdo familiar.",
        category: "family",
        isSpanish: true
      },
      {
        id: "family-2-es",
        content: "¿Quién fue el miembro de la familia que más te influyó durante tu crecimiento?",
        category: "family",
        isSpanish: true
      },
      {
        id: "family-3-es",
        content: "¿Qué tradiciones familiares son más importantes para ti?",
        category: "family",
        isSpanish: true
      }
    ]
  },
  {
    id: "childhood",
    name: "Childhood",
    nameEs: "Infancia",
    description: "Remember your early years",
    descriptionEs: "Recuerda tus primeros años",
    icon: React.createElement(Star, { size: 20 }),
    prompts: [
      {
        id: "childhood-1",
        content: "What was your favorite childhood game or toy?",
        category: "childhood",
        isSpanish: false
      },
      {
        id: "childhood-2",
        content: "Describe the neighborhood where you grew up.",
        category: "childhood",
        isSpanish: false
      },
      {
        id: "childhood-3",
        content: "What is your most vivid school memory?",
        category: "childhood",
        isSpanish: false
      },
      {
        id: "childhood-1-es",
        content: "¿Cuál era tu juego o juguete favorito de la infancia?",
        category: "childhood",
        isSpanish: true
      },
      {
        id: "childhood-2-es",
        content: "Describe el vecindario donde creciste.",
        category: "childhood",
        isSpanish: true
      },
      {
        id: "childhood-3-es",
        content: "¿Cuál es tu recuerdo escolar más vívido?",
        category: "childhood",
        isSpanish: true
      }
    ]
  },
  {
    id: "love",
    name: "Love & Relationships",
    nameEs: "Amor y Relaciones",
    description: "Share stories of love and connection",
    descriptionEs: "Comparte historias de amor y conexión",
    icon: React.createElement(Heart, { size: 20 }),
    prompts: [
      {
        id: "love-1",
        content: "How did you meet your partner/spouse?",
        category: "love",
        isSpanish: false
      },
      {
        id: "love-2",
        content: "What was your first date like?",
        category: "love",
        isSpanish: false
      },
      {
        id: "love-3",
        content: "Tell me about your wedding day.",
        category: "love",
        isSpanish: false
      },
      {
        id: "love-1-es",
        content: "¿Cómo conociste a tu pareja/cónyuge?",
        category: "love",
        isSpanish: true
      },
      {
        id: "love-2-es",
        content: "¿Cómo fue tu primera cita?",
        category: "love",
        isSpanish: true
      },
      {
        id: "love-3-es",
        content: "Háblame de tu día de boda.",
        category: "love",
        isSpanish: true
      }
    ]
  },
  {
    id: "legacy",
    name: "Legacy & Wisdom",
    nameEs: "Legado y Sabiduría",
    description: "Capture your life lessons",
    descriptionEs: "Captura las lecciones de tu vida",
    icon: React.createElement(Sparkles, { size: 20 }),
    prompts: [
      {
        id: "legacy-1",
        content: "What life lessons would you like to pass on to future generations?",
        category: "legacy",
        isSpanish: false
      },
      {
        id: "legacy-2",
        content: "What are you most proud of in your life?",
        category: "legacy",
        isSpanish: false
      },
      {
        id: "legacy-3",
        content: "What values are most important to you?",
        category: "legacy",
        isSpanish: false
      },
      {
        id: "legacy-1-es",
        content: "¿Qué lecciones de vida te gustaría transmitir a las generaciones futuras?",
        category: "legacy",
        isSpanish: true
      },
      {
        id: "legacy-2-es",
        content: "¿De qué estás más orgulloso/a en tu vida?",
        category: "legacy",
        isSpanish: true
      },
      {
        id: "legacy-3-es",
        content: "¿Qué valores son más importantes para ti?",
        category: "legacy",
        isSpanish: true
      }
    ]
  },
  {
    id: "celebrations",
    name: "Celebrations",
    nameEs: "Celebraciones",
    description: "Remember special occasions",
    descriptionEs: "Recuerda ocasiones especiales",
    icon: React.createElement(Gift, { size: 20 }),
    prompts: [
      {
        id: "celebrations-1",
        content: "What was your most memorable birthday?",
        category: "celebrations",
        isSpanish: false
      },
      {
        id: "celebrations-2",
        content: "How did your family celebrate holidays?",
        category: "celebrations",
        isSpanish: false
      },
      {
        id: "celebrations-3",
        content: "Tell me about a family reunion that stands out in your memory.",
        category: "celebrations",
        isSpanish: false
      },
      {
        id: "celebrations-1-es",
        content: "¿Cuál fue tu cumpleaños más memorable?",
        category: "celebrations",
        isSpanish: true
      },
      {
        id: "celebrations-2-es",
        content: "¿Cómo celebraba tu familia los días festivos?",
        category: "celebrations",
        isSpanish: true
      },
      {
        id: "celebrations-3-es",
        content: "Cuéntame sobre una reunión familiar que destaque en tu memoria.",
        category: "celebrations",
        isSpanish: true
      }
    ]
  }
];
