
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageScriptPicker } from "./LanguageScriptPicker";

export const HouseOfHanumanContent = () => {
  const { language } = useLanguage();
  
  // Content for different languages
  const content = {
    en: {
      title: "Vaya Family Memory Capsule: Hanuman Edition",
      preface: "Preface: The Blessings of Ambalal and Hanuman",
      introVerse: "O Hanuman, ocean of wisdom and virtue\nVictory to you who illuminates all three worlds",
      intro: "Life is a collection of stories, a thread woven through memories that connects us to our ancestors. Today, we embark on a sacred journey to keep alive the legacy of our elder Ambalal and to preserve our family's narrative in such a way that future generations will find inspiration in it.",
      ambalTitle: "Life of Ambalal: Triangle Tiger Glyph",
      ambalDetails: "Ambalal Patel (1890-1972)\nBirth: Vaso village, Gujarat\nOccupation: Farmer, Social Worker\nSpouse: Chanchalben Patel",
      ambalDescription: "Ambalal was a person with a heart that combined adventure and compassion. His eyes sparkled with truth and his words contained a treasure of wisdom. The Triangle Tiger Glyph represents his three main qualities: courage, integrity, and unwavering love for family.",
      chanchalTitle: "Chanchalben: Rectangle Paths Glyph",
      chanchalDetails: "Chanchalben Patel (1897-1978)\nBirth: Anand, Gujarat\nOccupation: Homemaker, Social Worker\nSpouse: Ambalal Patel",
      chanchalDescription: "Chanchalben was a woman with a simple heart, who held the thread of the family in her hands. Her Rectangle Paths Glyph represents the four main paths of her life: motherhood, service, spirituality, and preservation of tradition. The taste of her cooking is still remembered in the family today.",
      jamnaTitle: "Jamnaben: Oval Tree Glyph",
      jamnaDetails: "Jamnaben Shah (1905-1985)\nBirth: Surat, Gujarat\nOccupation: Teacher, Writer\nRelation: Sister of Ambalal",
      jamnaDescription: "Jamnaben was Ambalal's younger sister, a literature lover with unique expressive power. The Oval Tree Glyph symbolizes the cultivation of knowledge and literature in her life. She took up the challenge of educating many women at a time when this was considered impossible.",
      quote: ""Those who remember their elders brighten their own future." - Ambalal Patel",
      closing: "This webpage and the Vaya application are means to preserve our family's stories. History, cultural traditions, and the experiences of our elders are an invaluable treasure that will guide future generations."
    },
    gu: {
      title: "વાયા પારિવારિક સ્મૃતિ કેપ્સ્યુલ: હનુમાન સંસ્કરણ",
      preface: "પ્રસ્તાવના: અંબાલાલ અને હનુમાનજીનું આશીર્વાદ",
      introVerse: "હે હનુમાન, જ્ઞાન ગુણ સાગર\nજય કપિશ તિહું લોક ઉજાગર",
      intro: "જીવન એ વાર્તાઓનો સંગ્રહ છે, સ્મૃતિઓમાં ગૂંથાયેલો તાંતણો છે જે આપણને આપણા પૂર્વજો સાથે જોડે છે. આજે આપણે એક પવિત્ર યાત્રા શરૂ કરીએ છીએ, આપણા વડીલ અંબાલાલની વિરાસતને જીવંત રાખવાની અને આપણા પરિવારની કથાને એવી રીતે સંરક્ષિત કરવાની કે જેથી આવનારી પેઢીઓને પણ તેમાંથી પ્રેરણા મળે.",
      ambalTitle: "અંબાલાલનું જીવન: ત્રિકોણ વ્યાઘ્ર પ્રતીક",
      ambalDetails: "અંબાલાલ પટેલ (૧૮૯૦-૧૯૭૨)\nજન્મ: વસો ગામ, ગુજરાત\nવ્યવસાય: કિસાન, સમાજસેવક\nજીવનસાથી: ચંચલબેન પટેલ",
      ambalDescription: "અંબાલાલ એક એવા વ્યક્તિ હતા જેમના હૃદયમાં સાહસ અને કરુણાનો સંગમ હતો. તેમની આંખોમાં સત્યની ચમક અને તેમના શબ્દોમાં જ્ઞાનનો ખજાનો હતો. ત્રિકોણ વ્યાઘ્ર પ્રતીક તેમના ત્રણ મુખ્ય ગુણોનું પ્રતિનિધિત્વ કરે છે: સાહસ, સત્યનિષ્ઠા, અને પરિવાર પ્રત્યે અતૂટ પ્રેમ.",
      chanchalTitle: "ચંચલબેન: ચતુષ્કોણ પથ પ્રતીક",
      chanchalDetails: "ચંચલબેન પટેલ (૧૮૯૭-૧૯૭૮)\nજન્મ: આણંદ, ગુજરાત\nવ્યવસાય: ગૃહિણી, સમાજ કાર્યકર્તા\nજીવનસાથી: અંબાલાલ પટેલ",
      chanchalDescription: "ચંચલબેન એક સરળ હૃદયની મહિલા હતાં, જેમના હાથમાં પરિવારનો તંતુ હતો. તેમના ચતુષ્કોણ પથ પ્રતીક તેમના જીવનના ચાર મુખ્ય માર્ગોને દર્શાવે છે: માતૃત્વ, સેવા, અધ્યાત્મ, અને પરંપરાનું જતન. તેમની વાનગીઓનો સ્વાદ આજે પણ પરિવારમાં યાદ કરવામાં આવે છે.",
      jamnaTitle: "જમનાબેન: અંડાકાર વૃક્ષ પ્રતીક",
      jamnaDetails: "જમનાબેન શાહ (૧૯૦૫-૧૯૮૫)\nજન્મ: સુરત, ગુજરાત\nવ્યવસાય: શિક્ષિકા, સાહિત્યકાર\nસંબંધ: અંબાલાલની બહેન",
      jamnaDescription: "જમનાબેન અંબાલાલની નાની બહેન હતાં, એક અજોડ વિધાન શક્તિ ધરાવતા સાહિત્ય પ્રેમી. અંડાકાર વૃક્ષ પ્રતીક તેમના જીવનમાં જ્ઞાન અને સાહિત્યની ખેતીનું સૂચક છે. તેમણે અનેક સ્ત્રીઓને શિક્ષિત કરવાનું બીડું ઝડપ્યું હતું, જ્યારે આ અશક્ય માનવામાં આવતું હતું.",
      quote: ""જે પોતાના વડીલોને યાદ રાખે છે, એ પોતાનું ભવિષ્ય ઉજ્જવળ બનાવે છે." - અંબાલાલ પટેલ",
      closing: "આ વેબપેજ અને વાયા એપ્લિકેશન આપણા પરિવારની કથાઓને સંરક્ષિત કરવાનું માધ્યમ છે. ઇતિહાસ, સાંસ્કૃતિક પરંપરાઓ, અને વડીલોના અનુભવો એ અમૂલ્ય ખજાનો છે જે આવનારી પેઢીઓને માર્ગદર્શન આપશે."
    },
    hi: {
      title: "वाया पारिवारिक स्मृति कैप्सूल: हनुमान संस्करण",
      preface: "प्रस्तावना: अंबालाल और हनुमानजी का आशीर्वाद",
      introVerse: "हे हनुमान, ज्ञान गुण सागर\nजय कपिश तिहुँ लोक उजागर",
      intro: "जीवन कहानियों का संग्रह है, स्मृतियों में गूंथा हुआ वह धागा है जो हमें हमारे पूर्वजों से जोड़ता है। आज हम एक पवित्र यात्रा शुरू करते हैं, हमारे बुजुर्ग अंबालाल की विरासत को जीवंत रखने की और हमारे परिवार की कहानी को इस तरह से संरक्षित करने की कि आने वाली पीढ़ियां भी उससे प्रेरणा प्राप्त करें।",
      ambalTitle: "अंबालाल का जीवन: त्रिकोण व्याघ्र प्रतीक",
      ambalDetails: "अंबालाल पटेल (१८९०-१९७२)\nजन्म: वसो गांव, गुजरात\nव्यवसाय: किसान, समाजसेवक\nजीवनसाथी: चंचलबेन पटेल",
      ambalDescription: "अंबालाल एक ऐसे व्यक्ति थे जिनके हृदय में साहस और करुणा का संगम था। उनकी आंखों में सत्य की चमक और उनके शब्दों में ज्ञान का खजाना था। त्रिकोण व्याघ्र प्रतीक उनके तीन मुख्य गुणों का प्रतिनिधित्व करता है: साहस, सत्यनिष्ठा, और परिवार के प्रति अटूट प्रेम।",
      chanchalTitle: "चंचलबेन: चतुष्कोण पथ प्रतीक",
      chanchalDetails: "चंचलबेन पटेल (१८९७-१९७८)\nजन्म: आनंद, गुजरात\nव्यवसाय: गृहिणी, समाज कार्यकर्ता\nजीवनसाथी: अंबालाल पटेल",
      chanchalDescription: "चंचलबेन एक सरल हृदय की महिला थीं, जिनके हाथों में परिवार का धागा था। उनके चतुष्कोण पथ प्रतीक उनके जीवन के चार मुख्य मार्गों को दर्शाते हैं: मातृत्व, सेवा, अध्यात्म, और परंपरा का जतन। उनके व्यंजनों का स्वाद आज भी परिवार में याद किया जाता है।",
      jamnaTitle: "जमनाबेन: अंडाकार वृक्ष प्रतीक",
      jamnaDetails: "जमनाबेन शाह (१९०५-१९८५)\nजन्म: सूरत, गुजरात\nव्यवसाय: शिक्षिका, साहित्यकार\nसंबंध: अंबालाल की बहन",
      jamnaDescription: "जमनाबेन अंबालाल की छोटी बहन थीं, एक अद्वितीय अभिव्यक्ति शक्ति वाली साहित्य प्रेमी। अंडाकार वृक्ष प्रतीक उनके जीवन में ज्ञान और साहित्य की खेती का सूचक है। उन्होंने अनेक महिलाओं को शिक्षित करने का बीड़ा उठाया था, जब यह असंभव माना जाता था।",
      quote: ""जो अपने बड़ों को याद रखते हैं, वे अपना भविष्य उज्ज्वल बनाते हैं।" - अंबालाल पटेल",
      closing: "यह वेबपेज और वाया एप्लिकेशन हमारे परिवार की कहानियों को संरक्षित करने का माध्यम है। इतिहास, सांस्कृतिक परंपराएं, और बड़ों के अनुभव एक अमूल्य खजाना है जो आने वाली पीढ़ियों को मार्गदर्शन देगा।"
    }
  };

  // Default to English if the current language isn't supported
  const currentContent = language === 'gu' ? content.gu : 
                          language === 'hi' ? content.hi : content.en;

  return (
    <div className="gujarati-content surya-glow-container">
      <div className="absolute top-4 right-4 z-10">
        <LanguageScriptPicker />
      </div>
      
      <div className="surya-glow"></div>
      
      <h1 className="gujarati-title">{currentContent.title}</h1>
      
      <h2 className="gujarati-subtitle">{currentContent.preface}</h2>
      
      <div className="sacred-verse">
        <p>{currentContent.introVerse}</p>
      </div>
      
      <p className="gujarati-text">{currentContent.intro}</p>
      
      <div className="family-glyph-container">
        <div>
          <div className="glyph">
            <svg viewBox="0 0 100 100">
              <polygon className="triangle-glyph" points="50,10 90,80 10,80" />
              <line className="ray" x1="50" y1="10" x2="50" y2="0" />
              <line className="ray" x1="90" y1="80" x2="100" y2="90" />
              <line className="ray" x1="10" y1="80" x2="0" y2="90" />
              <circle className="center-dot" cx="50" cy="50" r="3" />
            </svg>
          </div>
          <div className="glyph-caption">
            <strong>{currentContent.ambalTitle}</strong>
            <p>{currentContent.ambalDetails}</p>
            <p>{currentContent.ambalDescription}</p>
          </div>
        </div>
        
        <div>
          <div className="glyph">
            <svg viewBox="0 0 100 100">
              <rect className="rect-glyph" x="20" y="20" width="60" height="60" />
              <path className="path-glyph" d="M30,30 Q50,10 70,30 T70,70" />
              <circle className="center-dot" cx="50" cy="50" r="3" />
            </svg>
          </div>
          <div className="glyph-caption">
            <strong>{currentContent.chanchalTitle}</strong>
            <p>{currentContent.chanchalDetails}</p>
            <p>{currentContent.chanchalDescription}</p>
          </div>
        </div>
        
        <div>
          <div className="glyph">
            <svg viewBox="0 0 100 100">
              <ellipse className="oval-glyph" cx="50" cy="50" rx="30" ry="40" />
              <path className="tree-glyph" d="M50,10 L50,90 M30,30 Q50,20 70,30 M35,50 Q50,40 65,50 M40,70 Q50,60 60,70" />
              <circle className="center-dot" cx="50" cy="50" r="3" />
            </svg>
          </div>
          <div className="glyph-caption">
            <strong>{currentContent.jamnaTitle}</strong>
            <p>{currentContent.jamnaDetails}</p>
            <p>{currentContent.jamnaDescription}</p>
          </div>
        </div>
      </div>
      
      <div className="quote-container">
        <p className="quote">{currentContent.quote}</p>
      </div>
      
      <p className="gujarati-text">{currentContent.closing}</p>
      
      <div className="back-to-top-button" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
        <span>{language === 'gu' ? 'ઉપર જાઓ' : language === 'hi' ? 'ऊपर जाएं' : 'Back to Top'}</span>
      </div>
    </div>
  );
};
