
import { Pin, History, MessagesSquare, FileText, Bookmark, Globe, Users, Heart, Star, Quote } from "lucide-react";
import { LocalizedPrompt, PromptCategory } from "@/components/chat/types";
import { ReactNode } from "react";

export const hanumanPromptCategories: PromptCategory[] = [
  {
    id: "heritage",
    name_en: "Heritage & Roots",
    name_es: "Herencia y Raíces",
    name_hi: "विरासत और जड़ें",
    name_gu: "વારસો અને મૂળ",
    description_en: "Explore your family's origins and cultural roots",
    description_es: "Explora los orígenes y raíces culturales de tu familia",
    description_hi: "अपने परिवार के मूल और सांस्कृतिक जड़ों का पता लगाएं",
    description_gu: "તમારા પરિવારના મૂળ અને સાંસ્કૃતિક વારસાની શોધ કરો",
    colorKey: "heritage",
    icon: <Pin className="h-4 w-4" />
  },
  {
    id: "traditions",
    name_en: "Traditions & Celebrations",
    name_es: "Tradiciones y Celebraciones",
    name_hi: "परंपराएं और उत्सव",
    name_gu: "પરંપરાઓ અને ઉજવણીઓ",
    description_en: "Record your family's unique customs and celebrations",
    description_es: "Registra las costumbres y celebraciones únicas de tu familia",
    description_hi: "अपने परिवार के अनूठे रीति-रिवाजों और उत्सवों को रिकॉर्ड करें",
    description_gu: "તમારા પરિવારની અનોખી રીતરિવાજો અને ઉજવણીઓને રેકોર્ડ કરો",
    colorKey: "celebrations",
    icon: <Star className="h-4 w-4" />
  },
  {
    id: "wisdom",
    name_en: "Wisdom & Values",
    name_es: "Sabiduría y Valores",
    name_hi: "ज्ञान और मूल्य",
    name_gu: "જ્ઞાન અને મૂલ્યો",
    description_en: "Preserve the values and wisdom passed through generations",
    description_es: "Preserva los valores y la sabiduría transmitidos a través de generaciones",
    description_hi: "पीढ़ियों से चले आ रहे मूल्यों और ज्ञान को संरक्षित करें",
    description_gu: "પેઢીઓથી પસાર થતા મૂલ્યો અને જ્ઞાનને સંરક્ષિત કરો",
    colorKey: "wisdom",
    icon: <Quote className="h-4 w-4" />
  },
  {
    id: "food",
    name_en: "Food & Recipes",
    name_es: "Comida y Recetas",
    name_hi: "भोजन और व्यंजन",
    name_gu: "ખોરાક અને વાનગીઓ",
    description_en: "Document family recipes and food traditions",
    description_es: "Documenta recetas familiares y tradiciones culinarias",
    description_hi: "परिवार के व्यंजनों और खाद्य परंपराओं का दस्तावेजीकरण करें",
    description_gu: "પરિવારની વાનગીઓ અને ખોરાકની પરંપરાઓનું દસ્તાવેજીકરણ કરો",
    colorKey: "cultural",
    icon: <Heart className="h-4 w-4" />
  },
  {
    id: "places",
    name_en: "Places & Journeys",
    name_es: "Lugares y Viajes",
    name_hi: "स्थान और यात्राएँ",
    name_gu: "સ્થળો અને પ્રવાસો",
    description_en: "Remember significant places and family journeys",
    description_es: "Recuerda lugares significativos y viajes familiares",
    description_hi: "महत्वपूर्ण स्थानों और परिवार की यात्राओं को याद रखें",
    description_gu: "મહત્વપૂર્ણ સ્થળો અને પરિવારના પ્રવાસોને યાદ કરો",
    colorKey: "places",
    icon: <Globe className="h-4 w-4" />
  },
  {
    id: "people",
    name_en: "People & Characters",
    name_es: "Personas y Personajes",
    name_hi: "लोग और चरित्र",
    name_gu: "લોકો અને પાત્રો",
    description_en: "Capture memories of influential family members",
    description_es: "Captura recuerdos de miembros influyentes de la familia",
    description_hi: "प्रभावशाली परिवार के सदस्यों की यादों को कैप्चर करें",
    description_gu: "પ્રભાવશાળી પરિવારના સભ્યોની યાદોને કેપ્ચર કરો",
    colorKey: "characters",
    icon: <Users className="h-4 w-4" />
  },
  {
    id: "history",
    name_en: "History & Events",
    name_es: "Historia y Eventos",
    name_hi: "इतिहास और घटनाएँ",
    name_gu: "ઇતિહાસ અને ઘટનાઓ",
    description_en: "Record how your family experienced historical events",
    description_es: "Registra cómo tu familia experimentó eventos históricos",
    description_hi: "रिकॉर्ड करें कि आपके परिवार ने ऐतिहासिक घटनाओं का अनुभव कैसे किया",
    description_gu: "નોંધો કે તમારા પરિવારે ઐતિહાસિક ઘટનાઓનો અનુભવ કેવી રીતે કર્યો",
    colorKey: "history",
    icon: <History className="h-4 w-4" />
  },
  {
    id: "stories",
    name_en: "Stories & Legends",
    name_es: "Historias y Leyendas",
    name_hi: "कहानियाँ और किंवदंतियाँ",
    name_gu: "વાર્તાઓ અને દંતકથાઓ",
    description_en: "Preserve family stories passed through generations",
    description_es: "Preserva historias familiares transmitidas a través de generaciones",
    description_hi: "पीढ़ियों से चली आ रही परिवार की कहानियों को संरक्षित करें",
    description_gu: "પેઢીઓથી વહેતી આવતી પરિવારની વાર્તાઓને સંરક્ષિત કરો",
    colorKey: "personal",
    icon: <MessagesSquare className="h-4 w-4" />
  },
  {
    id: "craft",
    name_en: "Crafts & Skills",
    name_es: "Artesanías y Habilidades",
    name_hi: "शिल्प और कौशल",
    name_gu: "કારીગરી અને કૌશલ્યો",
    description_en: "Document traditional skills and crafts in your family",
    description_es: "Documenta habilidades tradicionales y artesanías en tu familia",
    description_hi: "अपने परिवार में पारंपरिक कौशल और शिल्प का दस्तावेजीकरण करें",
    description_gu: "તમારા પરિવારમાં પરંપરાગત કૌશલ્યો અને કારીગરીનું દસ્તાવેજીકરણ કરો",
    colorKey: "generations",
    icon: <Bookmark className="h-4 w-4" />
  },
  {
    id: "documents",
    name_en: "Documents & Records",
    name_es: "Documentos y Registros",
    name_hi: "दस्तावेज़ और रिकॉर्ड",
    name_gu: "દસ્તાવેજો અને રેકોર્ડ્સ",
    description_en: "Preserve important family documents and records",
    description_es: "Preserva documentos y registros familiares importantes",
    description_hi: "महत्वपूर्ण परिवार के दस्तावेज़ों और रिकॉर्ड को संरक्षित करें",
    description_gu: "મહત્વપૂર્ણ પરિવારના દસ્તાવેજો અને રેકોર્ડ્સને સંરક્ષિત કરો",
    colorKey: "relationships",
    icon: <FileText className="h-4 w-4" />
  }
];

export const hanumanPrompts: LocalizedPrompt[] = [
  // Heritage & Roots Prompts
  {
    id: "heritage-1",
    category_id: "heritage",
    prompt_en: "Your family has roots in [user's specific region in India]. Would you like to share the story of how your ancestors first came from [ancestral village/city] to where you live today?",
    prompt_es: "Tu familia tiene raíces en [región específica del usuario en India]. ¿Te gustaría compartir la historia de cómo tus antepasados llegaron por primera vez desde [pueblo/ciudad ancestral] hasta donde vives hoy?",
    prompt_hi: "आपके परिवार की जड़ें [उपयोगकर्ता के भारत में विशिष्ट क्षेत्र] में हैं। क्या आप यह कहानी साझा करना चाहेंगे कि आपके पूर्वज पहली बार [पैतृक गांव/शहर] से आज आप जहां रहते हैं, वहां कैसे आए?",
    prompt_gu: "તમારા પરિવારના મૂળ [ભારતમાં વપરાશકર્તાના ચોક્કસ પ્રદેશ]માં છે. શું તમે વાર્તા શેર કરવા માંગો છો કે તમારા પૂર્વજો પ્રથમ વખત [વંશીય ગામ/શહેર]થી આજે તમે જ્યાં રહો છો ત્યાં કેવી રીતે આવ્યા?",
    cultural_context_en: "Migration stories reveal much about family values and resilience.",
    cultural_context_es: "Las historias de migración revelan mucho sobre los valores familiares y la resiliencia.",
    cultural_context_hi: "प्रवास की कहानियां परिवार के मूल्यों और लचीलेपन के बारे में बहुत कुछ बताती हैं।",
    cultural_context_gu: "સ્થળાંતરની વાર્તાઓ પરિવારના મૂલ્યો અને સ્થિતિસ્થાપકતા વિશે ઘણું બધું પ્રગટ કરે છે.",
    active: true,
    edition: "hanuman"
  },
  {
    id: "heritage-2",
    category_id: "heritage",
    prompt_en: "Parampara (traditions) carry our culture forward. Could you share a family tradition that has been followed through generations, like a special Diwali ritual or wedding custom?",
    prompt_es: "Parampara (tradiciones) llevan nuestra cultura adelante. ¿Podrías compartir una tradición familiar que se haya seguido a través de generaciones, como un ritual especial de Diwali o una costumbre de boda?",
    prompt_hi: "परंपरा हमारी संस्कृति को आगे ले जाती हैं। क्या आप एक ऐसी पारिवारिक परंपरा साझा कर सकते हैं जो पीढ़ियों से चली आ रही है, जैसे दिवाली का कोई विशेष अनुष्ठान या विवाह की कोई रीति?",
    prompt_gu: "પરંપરા આપણી સંસ્કૃતિને આગળ લઈ જાય છે. શું તમે એવી પારિવારિક પરંપરા શેર કરી શકો છો જે પેઢીઓથી અનુસરવામાં આવી છે, જેમ કે દિવાળીની કોઈ ખાસ વિધિ અથવા લગ્નના રિવાજ?",
    cultural_context_en: "Rituals are the backbone of cultural preservation.",
    cultural_context_es: "Los rituales son la columna vertebral de la preservación cultural.",
    cultural_context_hi: "अनुष्ठान सांस्कृतिक संरक्षण की रीढ़ हैं।",
    cultural_context_gu: "વિધિઓ સાંસ્કૃતિક જાળવણીની કરોડરજ્જુ છે.",
    active: true,
    edition: "hanuman"
  },
  {
    id: "heritage-3",
    category_id: "heritage",
    prompt_en: "Every family has cherished recipes. Would you like to record the story behind your family's special thali preparation, or perhaps a guarded masala recipe?",
    prompt_es: "Cada familia tiene recetas preciadas. ¿Te gustaría grabar la historia detrás de la preparación especial de thali de tu familia, o tal vez una receta de masala bien guardada?",
    prompt_hi: "हर परिवार के पास संजोये हुए व्यंजन होते हैं। क्या आप अपने परिवार की विशेष थाली तैयारी के पीछे की कहानी, या शायद एक संरक्षित मसाला रेसिपी के पीछे की कहानी रिकॉर्ड करना चाहेंगे?",
    prompt_gu: "દરેક પરિવાર પાસે જતન કરેલી વાનગીઓ હોય છે. શું તમે તમારા પરિવારની ખાસ થાળી તૈયારી પાછળની વાર્તા, અથવા કદાચ સાચવીને રાખેલી મસાલાની રેસિપી રેકોર્ડ કરવા માંગો છો?",
    cultural_context_en: "Food traditions are often the most resilient aspect of cultural heritage.",
    cultural_context_es: "Las tradiciones alimentarias son a menudo el aspecto más resistente del patrimonio cultural.",
    cultural_context_hi: "खाद्य परंपराएं अक्सर सांस्कृतिक विरासत का सबसे लचीला पहलू होती हैं।",
    cultural_context_gu: "ખોરાકની પરંપરાઓ ઘણીવાર સાંસ્કૃતિક વારસાનું સૌથી સ્થિતિસ્થાપક પાસું હોય છે.",
    active: true,
    edition: "hanuman"
  },
  // Add more prompts for each category as needed...
];
