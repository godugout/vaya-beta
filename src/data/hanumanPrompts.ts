
import { PromptCategory } from "@/components/chat/hooks/types";

export const hanumanPrompts: PromptCategory[] = [
  {
    id: "family-heritage",
    name: "Family Heritage",
    nameSpanish: "Herencia Familiar",
    iconName: "Tree",
    prompts: [
      {
        id: "family-heritage-1",
        content: "Tell me about your grandparents and what you remember about them.",
        isSpanish: false
      },
      {
        id: "family-heritage-2",
        content: "What family traditions have been passed down through generations?",
        isSpanish: false
      },
      {
        id: "family-heritage-3",
        content: "Share a story about your family's name or ancestry that's meaningful to you.",
        isSpanish: false
      },
      {
        id: "family-heritage-4",
        content: "Cuéntame sobre tus abuelos y qué recuerdas de ellos.",
        isSpanish: true
      },
      {
        id: "family-heritage-5",
        content: "¿Qué tradiciones familiares se han transmitido a través de generaciones?",
        isSpanish: true
      },
      {
        id: "family-heritage-6",
        content: "Comparte una historia sobre el nombre de tu familia o tu ascendencia que sea significativa para ti.",
        isSpanish: true
      }
    ]
  },
  {
    id: "spiritual-wisdom",
    name: "Spiritual Wisdom",
    nameSpanish: "Sabiduría Espiritual",
    iconName: "Flame",
    prompts: [
      {
        id: "spiritual-wisdom-1",
        content: "What spiritual principles guide your daily life?",
        isSpanish: false
      },
      {
        id: "spiritual-wisdom-2",
        content: "Share a teaching from an elder that has stayed with you throughout your life.",
        isSpanish: false
      },
      {
        id: "spiritual-wisdom-3",
        content: "How do you connect with your spiritual side or practice devotion?",
        isSpanish: false
      },
      {
        id: "spiritual-wisdom-4",
        content: "¿Qué principios espirituales guían tu vida diaria?",
        isSpanish: true
      },
      {
        id: "spiritual-wisdom-5",
        content: "Comparte una enseñanza de un anciano que te haya acompañado a lo largo de tu vida.",
        isSpanish: true
      },
      {
        id: "spiritual-wisdom-6",
        content: "¿Cómo te conectas con tu lado espiritual o practicas la devoción?",
        isSpanish: true
      }
    ]
  },
  {
    id: "cultural-traditions",
    name: "Cultural Traditions",
    nameSpanish: "Tradiciones Culturales",
    iconName: "Utensils",
    prompts: [
      {
        id: "cultural-traditions-1",
        content: "Describe a cultural celebration that's important to your family.",
        isSpanish: false
      },
      {
        id: "cultural-traditions-2",
        content: "What traditional recipes have been passed down in your family?",
        isSpanish: false
      },
      {
        id: "cultural-traditions-3",
        content: "Share a story about a meaningful cultural ritual you practice.",
        isSpanish: false
      },
      {
        id: "cultural-traditions-4",
        content: "Describe una celebración cultural que sea importante para tu familia.",
        isSpanish: true
      },
      {
        id: "cultural-traditions-5",
        content: "¿Qué recetas tradicionales se han transmitido en tu familia?",
        isSpanish: true
      },
      {
        id: "cultural-traditions-6",
        content: "Comparte una historia sobre un ritual cultural significativo que practiques.",
        isSpanish: true
      }
    ]
  },
  {
    id: "life-milestones",
    name: "Life Milestones",
    nameSpanish: "Hitos de la Vida",
    iconName: "Sparkles",
    prompts: [
      {
        id: "life-milestones-1",
        content: "Tell me about an important rite of passage in your life.",
        isSpanish: false
      },
      {
        id: "life-milestones-2",
        content: "Share a memory from a family wedding or celebration that stands out to you.",
        isSpanish: false
      },
      {
        id: "life-milestones-3",
        content: "What life lessons did you learn during major transitions in your life?",
        isSpanish: false
      },
      {
        id: "life-milestones-4",
        content: "Cuéntame sobre un rito de paso importante en tu vida.",
        isSpanish: true
      },
      {
        id: "life-milestones-5",
        content: "Comparte un recuerdo de una boda familiar o celebración que te haya marcado.",
        isSpanish: true
      },
      {
        id: "life-milestones-6",
        content: "¿Qué lecciones de vida aprendiste durante las principales transiciones de tu vida?",
        isSpanish: true
      }
    ]
  }
];
