import { Camera, Heart, Mic, Hourglass, MessageSquare } from "lucide-react";
import { HeroConfigs } from "@/types/hero";

export const heroConfigs: HeroConfigs = {
  "/": {
    title_en: "Share Your Stories",
    title_es: "Descubre, comparte y atesora los momentos más significativos de tu familia",
    subtitle_en: "Create digital time capsules to share your family's stories, traditions, and precious moments with loved ones.",
    subtitle_es: "Vaya transforma tus recuerdos en cápsulas digitales llenas de vida, tradiciones y amor. Crea, guarda y revive historias únicas con herramientas fáciles de usar y asistencia inteligente. Dale voz y color a tus memorias para que vivan por siempre.",
    primaryCta: {
      text: "Share a Story",
      icon: <Mic className="ml-2 h-5 w-5" />,
    },
    secondaryCta: {
      text: "Start a Family Capsule",
      icon: <Hourglass className="ml-2 h-5 w-5" />,
    }
  },
  "/family-capsules": {
    title_en: "Family Time Capsules",
    title_es: "Cápsulas del Tiempo Familiar",
    subtitle_en: "Create and curate meaningful collections of memories, stories, and traditions to share with future generations.",
    subtitle_es: "Crea y organiza colecciones significativas de recuerdos, historias y tradiciones para compartir con las generaciones futuras.",
    primaryCta: {
      text: "Create New Capsule",
      icon: <Hourglass className="ml-2 h-5 w-5" />,
    }
  },
  "/memory-lane": {
    title_en: "Your Family's Memory Lane",
    title_es: "El Camino de los Recuerdos Familiares",
    subtitle_en: "A beautiful collection of stories, photos, and precious moments that make your family unique.",
    subtitle_es: "Una hermosa colección de historias, fotos y momentos preciosos que hacen única a tu familia.",
    primaryCta: {
      text: "Add Memory",
      icon: <Camera className="ml-2 h-5 w-5" />,
    },
    secondaryCta: {
      text: "Ask Family Anything",
      icon: <Heart className="ml-2 h-5 w-5 fill-red-500 text-red-500" />,
    }
  },
  "/share-stories": {
    title_en: "Capture Special Moments",
    title_es: "Captura Momentos Especiales",
    subtitle_en: "Record stories, share photos, or create video memories of your family's journey. Every story strengthens our cultural bonds.",
    subtitle_es: "Graba historias, comparte fotos o crea recuerdos en video del viaje de tu familia. Cada historia fortalece nuestros lazos culturales.",
    primaryCta: {
      text: "Record a Story",
      icon: <Mic className="ml-2 h-5 w-5" />,
    },
    secondaryCta: {
      text: "Chat with Narra",
      icon: <MessageSquare className="ml-2 h-5 w-5" />,
    }
  }
};
