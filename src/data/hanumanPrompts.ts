
import { MessagesSquare, History, FileText, Quote, Bookmark, Star, Heart, Users, Home, Globe } from "lucide-react";
import { PromptCategory, LocalizedPrompt } from "@/components/chat/types";

// Categories for Hanuman Edition
export const hanumanPromptCategories: PromptCategory[] = [
  {
    id: "heritage",
    name_en: "Family Heritage",
    name_es: "Herencia Familiar",
    name_hi: "पारिवारिक विरासत",
    name_gu: "પરિવાર વારસો",
    description_en: "Explore your family's roots and traditions",
    description_es: "Explora las raíces y tradiciones de tu familia",
    description_hi: "अपने परिवार की जड़ों और परंपराओं का अन्वेषण करें",
    description_gu: "તમારા પરિવારના મૂળ અને પરંપરાઓની શોધ કરો",
    colorKey: "heritage",
    icon: <Bookmark />
  },
  {
    id: "personal",
    name_en: "Personal Connections",
    name_es: "Conexiones Personales",
    name_hi: "व्यक्तिगत संबंध",
    name_gu: "વ્યક્તિગત જોડાણ",
    description_en: "Reflect on personal relationships and bonds",
    description_es: "Reflexiona sobre relaciones y vínculos personales",
    description_hi: "व्यक्तिगत संबंधों और बंधनों पर चिंतन करें",
    description_gu: "વ્યક્તિગત સંબંધો અને બંધનો પર પ્રતિબિંબિત કરો",
    colorKey: "personal",
    icon: <Heart />
  },
  {
    id: "generations",
    name_en: "Intergenerational Bridges",
    name_es: "Puentes Intergeneracionales",
    name_hi: "पीढ़ीगत संबंध",
    name_gu: "પેઢીઓ વચ્ચેના સેતુઓ",
    description_en: "Connect stories across generations",
    description_es: "Conecta historias a través de generaciones",
    description_hi: "पीढ़ियों में कहानियों को जोड़ें",
    description_gu: "પેઢીઓ વચ્ચે વાર્તાઓને જોડો",
    colorKey: "generations",
    icon: <History />
  },
  {
    id: "celebrations",
    name_en: "Milestones & Celebrations",
    name_es: "Hitos y Celebraciones",
    name_hi: "मील के पत्थर और उत्सव",
    name_gu: "સીમાચિહ્ન અને ઉજવણીઓ",
    description_en: "Capture important family moments",
    description_es: "Captura momentos familiares importantes",
    description_hi: "महत्वपूर्ण पारिवारिक क्षणों को कैप्चर करें",
    description_gu: "મહત્વપૂર્ણ પારિવારિક ક્ષણોને કેપ્ચર કરો",
    colorKey: "celebrations",
    icon: <Star />
  },
  {
    id: "characters",
    name_en: "Family Characters",
    name_es: "Personajes Familiares",
    name_hi: "परिवार के चरित्र",
    name_gu: "પરિવારના પાત્રો",
    description_en: "Explore memorable personalities",
    description_es: "Explora personalidades memorables",
    description_hi: "यादगार व्यक्तित्वों का अन्वेषण करें",
    description_gu: "યાદગાર વ્યક્તિત્વોની શોધ કરો",
    colorKey: "characters",
    icon: <Users />
  },
  {
    id: "history",
    name_en: "Historical Context",
    name_es: "Contexto Histórico",
    name_hi: "ऐतिहासिक संदर्भ",
    name_gu: "ઐતિહાસિક સંદર્ભ",
    description_en: "Place family stories in historical moments",
    description_es: "Ubica historias familiares en momentos históricos",
    description_hi: "ऐतिहासिक क्षणों में पारिवारिक कहानियों को रखें",
    description_gu: "ઐતિહાસિક ક્ષણોમાં પારિવારિક વાર્તાઓને મૂકો",
    colorKey: "history",
    icon: <Globe />
  },
  {
    id: "wisdom",
    name_en: "Family Wisdom",
    name_es: "Sabiduría Familiar",
    name_hi: "पारिवारिक ज्ञान",
    name_gu: "પરિવારનું જ્ઞાન",
    description_en: "Preserve advice and life lessons",
    description_es: "Preserva consejos y lecciones de vida",
    description_hi: "सलाह और जीवन के सबक संरक्षित करें",
    description_gu: "સલાહ અને જીવનના પાઠોનું જતન કરો",
    colorKey: "wisdom",
    icon: <Quote />
  },
  {
    id: "cultural",
    name_en: "Cultural Dimensions",
    name_es: "Dimensiones Culturales",
    name_hi: "सांस्कृतिक आयाम",
    name_gu: "સાંસ્કૃતિક પરિમાણો",
    description_en: "Explore cultural identity and practices",
    description_es: "Explora identidad y prácticas culturales",
    description_hi: "सांस्कृतिक पहचान और प्रथाओं का अन्वेषण करें",
    description_gu: "સાંસ્કૃતિક ઓળખ અને પ્રથાઓની શોધ કરો",
    colorKey: "cultural",
    icon: <FileText />
  },
  {
    id: "places",
    name_en: "Meaningful Places",
    name_es: "Lugares Significativos",
    name_hi: "सार्थक स्थान",
    name_gu: "અર્થપૂર્ણ સ્થળો",
    description_en: "Capture stories of important locations",
    description_es: "Captura historias de lugares importantes",
    description_hi: "महत्वपूर्ण स्थानों की कहानियों को कैप्चर करें",
    description_gu: "મહત્વપૂર્ણ સ્થળોની વાર્તાઓને કેપ્ચર કરો",
    colorKey: "places",
    icon: <Home />
  },
  {
    id: "relationships",
    name_en: "Family Relationships",
    name_es: "Relaciones Familiares",
    name_hi: "पारिवारिक संबंध",
    name_gu: "પારિવારિક સંબંધો",
    description_en: "Explore bonds between family members",
    description_es: "Explora vínculos entre miembros de la familia",
    description_hi: "परिवार के सदस्यों के बीच बंधन का अन्वेषण करें",
    description_gu: "પરિવારના સભ્યો વચ્ચેના બંધનોની શોધ કરો",
    colorKey: "relationships",
    icon: <MessagesSquare />
  }
];

// Hanuman Edition Prompts organized by category
export const hanumanPrompts: LocalizedPrompt[] = [
  // Heritage Category
  {
    id: "1",
    category_id: "heritage",
    prompt_en: "Would you like to share the story of how your ancestors first came from your ancestral village to where you live today?",
    prompt_es: "¿Te gustaría compartir la historia de cómo tus antepasados llegaron desde tu pueblo ancestral hasta donde vives hoy?",
    prompt_hi: "क्या आप बताना चाहेंगे कि आपके पूर्वज अपने पैतृक गांव से आज आप जहां रहते हैं वहां कैसे आए?",
    prompt_gu: "શું તમે વાર્તા શેર કરવા માંગો છો કે તમારા પૂર્વજો તમારા વંશીય ગામથી આજે તમે જ્યાં રહો છો ત્યાં કેવી રીતે આવ્યા?",
    cultural_context_en: "Migration stories are central to understanding family journeys across generations.",
    cultural_context_es: "Las historias de migración son fundamentales para comprender los viajes familiares a través de generaciones.",
    cultural_context_hi: "प्रवास की कहानियां पीढ़ियों में परिवार की यात्राओं को समझने के लिए केंद्रीय हैं।",
    cultural_context_gu: "સ્થળાંતરની વાર્તાઓ પેઢીઓમાં પરિવારની યાત્રાઓને સમજવા માટે કેન્દ્રીય છે.",
    active: true,
    edition: "hanuman"
  },
  {
    id: "2",
    category_id: "heritage",
    prompt_en: "Could you share a family tradition that has been followed through generations, like a special Diwali ritual or wedding custom?",
    prompt_es: "¿Podrías compartir una tradición familiar que se haya seguido durante generaciones, como un ritual especial de Diwali o una costumbre de boda?",
    prompt_hi: "क्या आप एक पारिवारिक परंपरा साझा कर सकते हैं जो पीढ़ियों से चली आ रही है, जैसे दिवाली का कोई विशेष अनुष्ठान या विवाह की रीति?",
    prompt_gu: "શું તમે એક પારિવારિક પરંપરા શેર કરી શકો છો જે પેઢીઓથી અનુસરવામાં આવી છે, જેમ કે દિવાળીની ખાસ વિધિ અથવા લગ્નની રીત?",
    cultural_context_en: "Parampara (traditions) carry our culture forward and create continuity across generations.",
    cultural_context_es: "Parampara (tradiciones) transmiten nuestra cultura y crean continuidad a través de generaciones.",
    cultural_context_hi: "परंपराएं हमारी संस्कृति को आगे ले जाती हैं और पीढ़ियों में निरंतरता बनाती हैं।",
    cultural_context_gu: "પરંપરાઓ આપણી સંસ્કૃતિને આગળ લઈ જાય છે અને પેઢીઓમાં સાતત્ય બનાવે છે.",
    active: true,
    edition: "hanuman"
  },
  {
    id: "3",
    category_id: "heritage",
    prompt_en: "Would you like to record the story behind your family's special thali preparation, or perhaps a guarded masala recipe?",
    prompt_es: "¿Te gustaría registrar la historia detrás de la preparación especial del thali de tu familia, o quizás una receta de masala celosamente guardada?",
    prompt_hi: "क्या आप अपने परिवार की विशेष थाली की तैयारी, या शायद एक संरक्षित मसाला व्यंजन के पीछे की कहानी रिकॉर्ड करना चाहेंगे?",
    prompt_gu: "શું તમે તમારા પરિવારની ખાસ થાળી તૈયારી, અથવા કદાચ એક સુરક્ષિત મસાલા રેસિપી પાછળની વાર્તા રેકોર્ડ કરવા માંગો છો?",
    cultural_context_en: "Food recipes are cherished family heirlooms that preserve cultural identity and memories.",
    cultural_context_es: "Las recetas de comida son reliquias familiares preciadas que preservan la identidad cultural y los recuerdos.",
    cultural_context_hi: "खाना पकाने की विधियाँ मूल्यवान पारिवारिक धरोहर हैं जो सांस्कृतिक पहचान और यादों को संरक्षित करती हैं।",
    cultural_context_gu: "ખાવાની રેસીપીઓ મૂલ્યવાન પારિવારિક વારસો છે જે સાંસ્કૃતિક ઓળખ અને યાદોને જાળવી રાખે છે.",
    active: true,
    edition: "hanuman"
  },
  // Personal Connections Category
  {
    id: "4",
    category_id: "personal",
    prompt_en: "Was there a family elder who introduced you to your favorite hobby or interest? Perhaps a nana-nani or dada-dadi?",
    prompt_es: "¿Hubo un anciano de la familia que te introdujo a tu pasatiempo o interés favorito? ¿Tal vez un nana-nani o dada-dadi?",
    prompt_hi: "क्या कोई परिवार के बड़े थे जिन्होंने आपको आपके पसंदीदा शौक या रुचि से परिचित कराया? शायद कोई नाना-नानी या दादा-दादी?",
    prompt_gu: "શું કોઈ પરિવારના વડીલ હતા જેમણે તમને તમારા મનપસંદ શોખ કે રસનો પરિચય કરાવ્યો? કદાચ કોઈ નાના-નાની કે દાદા-દાદી?",
    cultural_context_en: "Elders play a crucial role in passing down skills and interests in South Asian families.",
    cultural_context_es: "Los ancianos juegan un papel crucial en la transmisión de habilidades e intereses en las familias del sur de Asia.",
    cultural_context_hi: "बड़े लोग दक्षिण एशियाई परिवारों में कौशल और रुचियों को आगे बढ़ाने में महत्वपूर्ण भूमिका निभाते हैं।",
    cultural_context_gu: "વડીલો દક્ષિણ એશિયાઈ પરિવારોમાં કૌશલ્યો અને રસોને આગળ વધારવામાં મહત્વપૂર્ણ ભૂમિકા ભજવે છે.",
    active: true,
    edition: "hanuman"
  },
  {
    id: "5",
    category_id: "personal",
    prompt_en: "Has anyone told you that you resemble a particular relative in mannerism or appearance? What traits do you share?",
    prompt_es: "¿Alguien te ha dicho que te pareces a un pariente en particular en modales o apariencia? ¿Qué rasgos compartes?",
    prompt_hi: "क्या किसी ने आपको बताया है कि आप किसी विशेष रिश्तेदार के व्यवहार या रूप में समान दिखते हैं? आप कौन से गुण साझा करते हैं?",
    prompt_gu: "શું કોઈએ તમને કહ્યું છે કે તમે કોઈ ચોક્કસ સંબંધીના વર્તન કે દેખાવમાં સમાન લાગો છો? તમે કયા લક્ષણો શેર કરો છો?",
    cultural_context_en: "Paraaya (traits) passing through generations are often noted and celebrated in family gatherings.",
    cultural_context_es: "Paraaya (rasgos) que pasan a través de generaciones a menudo se notan y celebran en reuniones familiares.",
    cultural_context_hi: "पराया (विशेषताएँ) जो पीढ़ियों से चली आ रही हैं, अक्सर पारिवारिक समारोहों में नोट की जाती हैं और मनाई जाती हैं।",
    cultural_context_gu: "પરાયા (લક્ષણો) જે પેઢીઓમાંથી પસાર થાય છે તે ઘણીવાર પારિવારિક મેળાવડાઓમાં નોંધવામાં આવે છે અને ઉજવવામાં આવે છે.",
    active: true,
    edition: "hanuman"
  },
  // Generations Category
  {
    id: "6",
    category_id: "generations",
    prompt_en: "Would you like to record a memory of attending a garba, bhajan, or cricket match together with family members of different generations?",
    prompt_es: "¿Te gustaría registrar un recuerdo de asistir a un garba, bhajan o partido de cricket junto con miembros de la familia de diferentes generaciones?",
    prompt_hi: "क्या आप विभिन्न पीढ़ियों के परिवार के सदस्यों के साथ गरबा, भजन या क्रिकेट मैच में भाग लेने की यादें रिकॉर्ड करना चाहेंगे?",
    prompt_gu: "શું તમે વિવિધ પેઢીઓના પરિવારના સભ્યો સાથે ગરબા, ભજન, અથવા ક્રિકેટ મેચમાં હાજરી આપવાની યાદ રેકોર્ડ કરવા માંગો છો?",
    cultural_context_en: "Shared cultural experiences across generations create powerful family bonds.",
    cultural_context_es: "Las experiencias culturales compartidas entre generaciones crean poderosos lazos familiares.",
    cultural_context_hi: "पीढ़ियों में साझा सांस्कृतिक अनुभव शक्तिशाली पारिवारिक बंधन बनाते हैं।",
    cultural_context_gu: "પેઢીઓમાં શેર કરેલા સાંસ્કૃતિક અનુભવો શક્તિશાળી પારિવારિક બંધનો બનાવે છે.",
    active: true,
    edition: "hanuman"
  },
  {
    id: "7",
    category_id: "generations",
    prompt_en: "How have views on topics like education or career choices changed between your grandparents' generation and yours?",
    prompt_es: "¿Cómo han cambiado las opiniones sobre temas como la educación o las elecciones profesionales entre la generación de tus abuelos y la tuya?",
    prompt_hi: "शिक्षा या करियर विकल्पों जैसे विषयों पर दृष्टिकोण आपके दादा-दादी की पीढ़ी और आपकी पीढ़ी के बीच कैसे बदले हैं?",
    prompt_gu: "શિક્ષણ અથવા કારકિર્દીની પસંદગી જેવા વિષયો પર દૃષ્ટિકોણ તમારા દાદા-દાદીની પેઢી અને તમારી વચ્ચે કેવી રીતે બદલાયા છે?",
    cultural_context_en: "Rapid social changes have transformed expectations and opportunities across generations in South Asian families.",
    cultural_context_es: "Los rápidos cambios sociales han transformado las expectativas y oportunidades a través de generaciones en familias del sur de Asia.",
    cultural_context_hi: "तीव्र सामाजिक परिवर्तनों ने दक्षिण एशियाई परिवारों में पीढ़ियों में अपेक्षाओं और अवसरों को बदल दिया है।",
    cultural_context_gu: "ઝડપી સામાજિક પરિવર્તનોએ દક્ષિણ એશિયાઈ પરિવારોમાં પેઢીઓમાં અપેક્ષાઓ અને તકોને બદલી નાખી છે.",
    active: true,
    edition: "hanuman"
  },
  // Celebrations Category
  {
    id: "8",
    category_id: "celebrations",
    prompt_en: "Would you like to share a particularly memorable Diwali, Navratri, or Raksha Bandhan celebration from your childhood?",
    prompt_es: "¿Te gustaría compartir una celebración particularmente memorable de Diwali, Navratri o Raksha Bandhan de tu infancia?",
    prompt_hi: "क्या आप अपने बचपन के किसी विशेष यादगार दिवाली, नवरात्रि या रक्षा बंधन उत्सव के बारे में बताना चाहेंगे?",
    prompt_gu: "શું તમે તમારા બાળપણના કોઈ ખાસ યાદગાર દિવાળી, નવરાત્રિ, અથવા રક્ષાબંધનની ઉજવણી વિશે શેર કરવા માંગો છો?",
    cultural_context_en: "Festival celebrations create some of the most vivid family memories and strengthen cultural identity.",
    cultural_context_es: "Las celebraciones de festivales crean algunos de los recuerdos familiares más vívidos y fortalecen la identidad cultural.",
    cultural_context_hi: "त्योहारों के उत्सव सबसे जीवंत पारिवारिक यादें बनाते हैं और सांस्कृतिक पहचान को मजबूत करते हैं।",
    cultural_context_gu: "તહેવારોની ઉજવણીઓ સૌથી જીવંત પારિવારિક યાદો બનાવે છે અને સાંસ્કૃતિક ઓળખને મજબૂત કરે છે.",
    active: true,
    edition: "hanuman"
  },
  {
    id: "9",
    category_id: "celebrations",
    prompt_en: "Would you like to record the story of an important family milestone, like a mundan, janoi, or annaprashan ceremony?",
    prompt_es: "¿Te gustaría registrar la historia de un hito familiar importante, como una ceremonia de mundan, janoi o annaprashan?",
    prompt_hi: "क्या आप एक महत्वपूर्ण पारिवारिक उपलब्धि की कहानी रिकॉर्ड करना चाहेंगे, जैसे मुंडन, जनोई, या अन्नप्राशन संस्कार?",
    prompt_gu: "શું તમે એક મહત્વપૂર્ણ પારિવારિક સીમાચિહ્નની વાર્તા રેકોર્ડ કરવા માંગો છો, જેમ કે મુંડન, જનોઈ, અથવા અન્નપ્રાશન સંસ્કાર?",
    cultural_context_en: "Sanskaras (life ceremonies) mark important transitions and connect individuals to community traditions.",
    cultural_context_es: "Sanskaras (ceremonias de vida) marcan transiciones importantes y conectan a los individuos con las tradiciones comunitarias.",
    cultural_context_hi: "संस्कार महत्वपूर्ण परिवर्तनों को चिह्नित करते हैं और व्यक्तियों को सामुदायिक परंपराओं से जोड़ते हैं।",
    cultural_context_gu: "સંસ્કારો મહત્વપૂર્ણ સંક્રમણને ચિહ્નિત કરે છે અને વ્યક્તિઓને સામુદાયિક પરંપરાઓ સાથે જોડે છે.",
    active: true,
    edition: "hanuman"
  },
  // Characters Category
  {
    id: "10",
    category_id: "characters",
    prompt_en: "Would you like to create a detailed profile of a family elder—their favorite saying, their daily rituals, or the wisdom they shared?",
    prompt_es: "¿Te gustaría crear un perfil detallado de un anciano de la familia: su dicho favorito, sus rituales diarios o la sabiduría que compartieron?",
    prompt_hi: "क्या आप परिवार के एक बुजुर्ग का विस्तृत विवरण बनाना चाहेंगे—उनकी पसंदीदा कहावत, उनके दैनिक अनुष्ठान, या उनके द्वारा साझा की गई बुद्धिमत्ता?",
    prompt_gu: "શું તમે પરિવારના એક વડીલની વિગતવાર પ્રોફાઇલ બનાવવા માંગો છો-તેમની મનપસંદ કહેવત, તેમની દૈનિક વિધિઓ, અથવા તેમણે શેર કરેલી જ્ઞાન?",
    cultural_context_en: "Family elders are repositories of wisdom, customs and family history in South Asian culture.",
    cultural_context_es: "Los ancianos de la familia son repositorios de sabiduría, costumbres e historia familiar en la cultura del sur de Asia.",
    cultural_context_hi: "परिवार के बड़े लोग दक्षिण एशियाई संस्कृति में ज्ञान, रीति-रिवाजों और पारिवारिक इतिहास के भंडार हैं।",
    cultural_context_gu: "પરિવારના વડીલો દક્ષિણ એશિયાઈ સંસ્કૃતિમાં જ્ઞાન, રીતિ-રિવાજો અને પારિવારિક ઇતિહાસના ભંડાર છે.",
    active: true,
    edition: "hanuman"
  },
  // History Category
  {
    id: "11",
    category_id: "history",
    prompt_en: "How did historical events like Partition, Independence, or economic reforms affect your family's journey?",
    prompt_es: "¿Cómo afectaron a la trayectoria de tu familia acontecimientos históricos como la Partición, la Independencia o las reformas económicas?",
    prompt_hi: "विभाजन, स्वतंत्रता, या आर्थिक सुधारों जैसी ऐतिहासिक घटनाओं ने आपके परिवार की यात्रा को कैसे प्रभावित किया?",
    prompt_gu: "ભાગલા, સ્વતંત્રતા, અથવા આર્થિક સુધારાઓ જેવી ઐતિહાસિક ઘટનાઓએ તમારા પરિવારની યાત્રાને કેવી રીતે અસર કરી?",
    cultural_context_en: "Major historical events profoundly shaped family trajectories and decisions in South Asian contexts.",
    cultural_context_es: "Los principales acontecimientos históricos moldearon profundamente las trayectorias y decisiones familiares en contextos del sur de Asia.",
    cultural_context_hi: "प्रमुख ऐतिहासिक घटनाओं ने दक्षिण एशियाई संदर्भों में पारिवारिक प्रक्षेपवक्र और निर्णयों को गहराई से आकार दिया।",
    cultural_context_gu: "મુખ્ય ઐતિહાસિક ઘટનાઓએ દક્ષિણ એશિયાઈ સંદર્ભોમાં પારિવારિક ગતિ અને નિર્ણયોને ઊંડાણથી આકાર આપ્યો.",
    active: true,
    edition: "hanuman"
  },
  // Wisdom Category
  {
    id: "12",
    category_id: "wisdom",
    prompt_en: "Is there a kahavat (proverb) or expression frequently used by your family elders that carries special meaning?",
    prompt_es: "¿Hay algún kahavat (proverbio) o expresión que usen frecuentemente los ancianos de tu familia y que tenga un significado especial?",
    prompt_hi: "क्या आपके परिवार के बड़े लोगों द्वारा अक्सर इस्तेमाल की जाने वाली कोई कहावत या अभिव्यक्ति है जिसका विशेष अर्थ है?",
    prompt_gu: "શું તમારા પરિવારના વડીલો દ્વારા વારંવાર ઉપયોગમાં લેવાતી કોઈ કહેવત અથવા અભિવ્યક્તિ છે જે ખાસ અર્થ ધરાવે છે?",
    cultural_context_en: "Proverbs and sayings transmit cultural wisdom and family values across generations.",
    cultural_context_es: "Los proverbios y dichos transmiten sabiduría cultural y valores familiares a través de generaciones.",
    cultural_context_hi: "कहावतें और कहावतें पीढ़ियों में सांस्कृतिक ज्ञान और पारिवारिक मूल्यों का संचार करती हैं।",
    cultural_context_gu: "કહેવતો અને કહેવતો પેઢીઓમાં સાંસ્કૃતિક જ્ઞાન અને પારિવારિક મૂલ્યોનું પ્રસારણ કરે છે.",
    active: true,
    edition: "hanuman"
  },
  // Cultural Category
  {
    id: "13",
    category_id: "cultural",
    prompt_en: "Would you like to share the significance of a particular dish—perhaps a special thepla recipe, dal preparation, or mithai that defines your family gatherings?",
    prompt_es: "¿Te gustaría compartir el significado de un plato en particular, tal vez una receta especial de thepla, una preparación de dal o mithai que defina las reuniones de tu familia?",
    prompt_hi: "क्या आप एक विशेष व्यंजन के महत्व को साझा करना चाहेंगे—शायद एक विशेष थेपला व्यंजन, दाल की तैयारी, या मिठाई जो आपके पारिवारिक समारोहों को परिभाषित करती है?",
    prompt_gu: "શું તમે કોઈ ખાસ વાનગીના મહત્વને શેર કરવા માંગો છો-કદાચ એક ખાસ થેપલા રેસીપી, દાળની તૈયારી, અથવા મિઠાઈ જે તમારા પારિવારિક મેળાવડાઓને વ્યાખ્યાયિત કરે છે?",
    cultural_context_en: "Food is a central element of cultural identity and family bonding in South Asian communities.",
    cultural_context_es: "La comida es un elemento central de la identidad cultural y los lazos familiares en las comunidades del sur de Asia.",
    cultural_context_hi: "भोजन दक्षिण एशियाई समुदायों में सांस्कृतिक पहचान और पारिवारिक बंधन का एक केंद्रीय तत्व है।",
    cultural_context_gu: "ખોરાક દક્ષિણ એશિયાઈ સમુદાયોમાં સાંસ્કૃતિક ઓળખ અને પારિવારિક બંધનનું એક કેન્દ્રીય તત્વ છે.",
    active: true,
    edition: "hanuman"
  },
  // Places Category
  {
    id: "14",
    category_id: "places",
    prompt_en: "Would you like to describe a memorable family home, perhaps an ancestral house in your native village or the first home after migration?",
    prompt_es: "¿Te gustaría describir una casa familiar memorable, tal vez una casa ancestral en tu pueblo natal o la primera casa después de la migración?",
    prompt_hi: "क्या आप एक यादगार पारिवारिक घर का वर्णन करना चाहेंगे, शायद आपके मूल गांव में एक पैतृक घर या प्रवास के बाद पहला घर?",
    prompt_gu: "શું તમે એક યાદગાર પારિવારિક ઘરનું વર્ણન કરવા માંગો છો, કદાચ તમારા મૂળ ગામમાં એક વંશીય ઘર અથવા સ્થળાંતર પછીનું પહેલું ઘર?",
    cultural_context_en: "Ancestral homes and places hold deep emotional significance and connection to family roots.",
    cultural_context_es: "Los hogares y lugares ancestrales tienen un profundo significado emocional y conexión con las raíces familiares.",
    cultural_context_hi: "पैतृक घर और स्थान गहरे भावनात्मक महत्व और पारिवारिक जड़ों से जुड़ाव रखते हैं।",
    cultural_context_gu: "વંશીય ઘરો અને સ્થળો ઊંડા ભાવનાત્મક મહત્વ અને પારિવારિક મૂળ સાથે જોડાણ ધરાવે છે.",
    active: true,
    edition: "hanuman"
  },
  // Relationships Category
  {
    id: "15",
    category_id: "relationships",
    prompt_en: "Would you like to share stories about your relationship with your brothers or sisters growing up in a South Asian family context?",
    prompt_es: "¿Te gustaría compartir historias sobre tu relación con tus hermanos o hermanas mientras crecías en un contexto familiar del sur de Asia?",
    prompt_hi: "क्या आप दक्षिण एशियाई पारिवारिक संदर्भ में अपने भाइयों या बहनों के साथ अपने संबंधों के बारे में कहानियां साझा करना चाहेंगे?",
    prompt_gu: "શું તમે દક્ષિણ એશિયાઈ પારિવારિક સંદર્ભમાં ઉછરતા તમારા ભાઈઓ અથવા બહેનો સાથેના તમારા સંબંધો વિશે વાર્તાઓ શેર કરવા માંગો છો?",
    cultural_context_en: "Sibling relationships in South Asian families often involve unique dynamics and responsibilities based on birth order and gender.",
    cultural_context_es: "Las relaciones entre hermanos en familias del sur de Asia a menudo implican dinámicas y responsabilidades únicas basadas en el orden de nacimiento y el género.",
    cultural_context_hi: "दक्षिण एशियाई परिवारों में भाई-बहन के रिश्ते अक्सर जन्म क्रम और लिंग के आधार पर अनूठी गतिशीलता और जिम्मेदारियों को शामिल करते हैं।",
    cultural_context_gu: "દક્ષિણ એશિયાઈ પરિવારોમાં ભાઈ-બહેનના સંબંધોમાં ઘણીવાર જન્મક્રમ અને લિંગ પર આધારિત અનોખી ગતિશીલતા અને જવાબદારીઓ શામિલ હોય છે.",
    active: true,
    edition: "hanuman"
  }
];
