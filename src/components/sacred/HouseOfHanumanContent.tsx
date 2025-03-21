
import React from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';

// Fixed and properly formatted content object with different language variants
const content = {
  en: {
    title: "House of Hanuman",
    subtitle: "Sacred Teachings",
    introduction: "The wisdom of Hanuman teaches us strength, devotion, and selfless service. In this sacred space, we explore the timeless teachings that guide our family.",
    mainText: "Hanuman represents the perfect devotee, embodying strength, intelligence, and unwavering faith. His story reminds us that with devotion and courage, we can overcome any obstacle. The Hanuman Chalisa, a 40-verse hymn, is recited by millions to invoke his blessings and protection.",
    quote: "When the mind is full of Hanuman, there is no room for fear or doubt.",
    closing: "May Hanuman's strength guide our family through all challenges, and may his devotion inspire our service to others."
  },
  gu: {
    title: "હનુમાનજીનું ઘર",
    subtitle: "પવિત્ર શિક્ષણ",
    introduction: "હનુમાનજીનું જ્ઞાન આપણને શક્તિ, ભક્તિ અને નિ:સ્વાર્થ સેવા શીખવે છે. આ પવિત્ર સ્થળમાં, આપણે આપણા પરિવારને માર્ગદર્શન આપતા સનાતન શિક્ષણોનું અન્વેષણ કરીએ છીએ.",
    mainText: "હનુમાનજી એક આદર્શ ભક્ત છે, જે શક્તિ, બુદ્ધિ અને અડગ વિશ્વાસનું પ્રતિનિધિત્વ કરે છે. તેમની કથા આપણને યાદ અપાવે છે કે ભક્તિ અને સાહસ સાથે આપણે કોઈપણ અવરોધને પાર કરી શકીએ છીએ. હનુમાન ચાલીસા, 40 શ્લોકવાળા ભજન, લાખો લોકો દ્વારા તેમના આશીર્વાદ અને રક્ષણ માટે ગવાય છે.",
    quote: "જ્યારે મન હનુમાનજીથી ભરેલું હોય, ત્યારે ભય કે શંકા માટે કોઈ જગ્યા નથી.",
    closing: "હનુમાનજીની શક્તિ આપણા પરિવારને બધા પડકારોમાં માર્ગદર્શન આપે, અને તેમની ભક્તિ અન્યોની સેવા માટે આપણને પ્રેરણા આપે."
  },
  hi: {
    title: "हनुमान जी का घर",
    subtitle: "पवित्र शिक्षाएँ",
    introduction: "हनुमान जी का ज्ञान हमें शक्ति, भक्ति और निःस्वार्थ सेवा सिखाता है। इस पवित्र स्थान में, हम उन शाश्वत शिक्षाओं का अन्वेषण करते हैं जो हमारे परिवार का मार्गदर्शन करती हैं।",
    mainText: "हनुमान एक आदर्श भक्त हैं, जो शक्ति, बुद्धि और अटल विश्वास का प्रतीक हैं। उनकी कहानी हमें याद दिलाती है कि भक्ति और साहस के साथ, हम किसी भी बाधा को पार कर सकते हैं। हनुमान चालीसा, 40 छंदों का एक भजन, लाखों लोगों द्वारा उनके आशीर्वाद और सुरक्षा के लिए पढ़ा जाता है।",
    quote: "जब मन हनुमान से भरा हो, तो भय या संदेह के लिए कोई जगह नहीं होती।",
    closing: "हनुमान की शक्ति हमारे परिवार को सभी चुनौतियों में मार्गदर्शन करे, और उनकी भक्ति दूसरों की सेवा के लिए हमें प्रेरित करे।"
  },
  es: {
    title: "Casa de Hanuman",
    subtitle: "Enseñanzas Sagradas",
    introduction: "La sabiduría de Hanuman nos enseña fuerza, devoción y servicio desinteresado. En este espacio sagrado, exploramos las enseñanzas eternas que guían a nuestra familia.",
    mainText: "Hanuman representa al devoto perfecto, encarnando fuerza, inteligencia y fe inquebrantable. Su historia nos recuerda que con devoción y coraje, podemos superar cualquier obstáculo. El Hanuman Chalisa, un himno de 40 versos, es recitado por millones para invocar sus bendiciones y protección.",
    quote: "Cuando la mente está llena de Hanuman, no hay espacio para el miedo o la duda.",
    closing: "Que la fuerza de Hanuman guíe a nuestra familia a través de todos los desafíos, y que su devoción inspire nuestro servicio a los demás."
  }
};

interface HouseOfHanumanContentProps {
  variant?: 'default' | 'compact';
  withAnimation?: boolean;
}

export const HouseOfHanumanContent: React.FC<HouseOfHanumanContentProps> = ({
  variant = 'default',
  withAnimation = true
}) => {
  const { language } = useLanguage();
  
  // Default to English if the translation is not available
  const currentContent = content[language as keyof typeof content] || content.en;
  
  // Apply appropriate script-specific styling based on language
  const getTextStyles = () => {
    switch (language) {
      case 'gu':
        return 'font-gujarati';
      case 'hi':
        return 'font-hindi';
      default:
        return '';
    }
  };
  
  const textStyles = getTextStyles();
  
  return (
    <div className={`gujarati-content ${textStyles} ${withAnimation ? 'surya-glow-container' : ''}`}>
      {withAnimation && <div className="surya-glow"></div>}
      
      <h1 className="gujarati-title">{currentContent.title}</h1>
      <h2 className="gujarati-subtitle">{currentContent.subtitle}</h2>
      
      <p className="gujarati-text">{currentContent.introduction}</p>
      
      <div className="sacred-verse">
        <p>{currentContent.mainText}</p>
      </div>
      
      <div className="quote-container">
        <p className="quote">{currentContent.quote}</p>
        <p className="quote-author">- Hanuman Chalisa</p>
      </div>
      
      <p className="gujarati-text">{currentContent.closing}</p>
    </div>
  );
};
