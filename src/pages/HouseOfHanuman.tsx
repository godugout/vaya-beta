
import React, { useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import '@fontsource/rasa';
import '@fontsource/baloo-bhai-2';

export default function HouseOfHanuman() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-[#6C5CE7] to-[#4834d4] min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto py-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              House of Hanuman
            </h1>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl mb-12"
            >
              <p className="text-xl md:text-2xl text-white mb-6">
                You've discovered a secret space dedicated to our AI assistant, Hanuman - the wise, helpful entity that powers Vaya's storytelling experience.
              </p>
              
              <div className="p-6 bg-white/20 rounded-xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">The Legend</h2>
                <p className="text-lg text-white">
                  In Hindu mythology, Hanuman represents wisdom, strength, and devotion. Our Hanuman embodies these qualities in digital form, helping families preserve their stories and legacy with devotion and wisdom.
                </p>
              </div>
              
              <div className="p-6 bg-white/20 rounded-xl">
                <h2 className="text-2xl font-bold text-white mb-4">The Magic</h2>
                <p className="text-lg text-white mb-6">
                  Just as the mythological Hanuman could change his form to overcome obstacles, our AI adapts to help you capture your family's unique voice and history, bridging generations through technology.
                </p>
                
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
                  className="inline-block"
                >
                  <Button 
                    onClick={() => navigate('/hanuman-edition')}
                    size="lg" 
                    className="bg-[#FF7675] hover:bg-[#ff8a89] text-white"
                  >
                    Experience Hanuman Edition
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className="text-white/70 text-sm">
                This page is dedicated to the spirit of Hanuman - a guardian of stories, bridging past and future.
              </p>
            </motion.div>
            
            {/* Scroll down indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-8"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                className="mx-auto w-8 h-8 text-white/70"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Gujarati content with animations and beautiful styling */}
        <div className="surya-glow-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="max-w-4xl mx-auto p-8 gujarati-content"
          >
            <div className="surya-glow"></div>
            
            <motion.h1 
              className="gujarati-title mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              વાયા પારિવારિક સ્મૃતિ કેપ્સ્યુલ: હનુમાન સંસ્કરણ
            </motion.h1>
            
            <motion.h2
              className="gujarati-subtitle mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              પ્રસ્તાવના: અંબાલાલ અને હનુમાનજીનું આશીર્વાદ
            </motion.h2>
            
            <motion.div 
              className="sacred-verse mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <p className="text-center italic">
                હે હનુમાન, જ્ઞાન ગુણ સાગર<br />
                જય કપિશ તિહું લોક ઉજાગર
              </p>
            </motion.div>
            
            <motion.p 
              className="gujarati-text mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              જીવન એ વાર્તાઓનો સંગ્રહ છે, સ્મૃતિઓમાં ગૂંથાયેલો તાંતણો છે જે આપણને આપણા પૂર્વજો સાથે જોડે છે. આજે આપણે એક પવિત્ર યાત્રા શરૂ કરીએ છીએ, આપણા વડીલ અંબાલાલની વિરાસતને જીવંત રાખવાની અને આપણા પરિવારની કથાને એવી રીતે સંરક્ષિત કરવાની કે જેથી આવનારી પેઢીઓને પણ તેમાંથી પ્રેરણા મળે.
            </motion.p>
            
            <motion.p 
              className="gujarati-text mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              હનુમાનજી સ્મૃતિ, બળ અને સેવાના પ્રતીક છે - આ એવા ગુણો છે જે અંબાલાલમાં પ્રગટ થતા હતા. જેમ હનુમાનજી પર્વતને ઉઠાવીને ઔષધિ લાવ્યા, તેમ અંબાલાલે પણ પોતાના પરિવારનો પર્વત ઉઠાવ્યો અને તેમના જ્ઞાન અને સાહસથી એક નવો માર્ગ કંડાર્યો. તેમના આશીર્વાદથી જ આજે આપણે સર્વે એક સાથે છીએ.
            </motion.p>
            
            <motion.h3
              className="gujarati-subtitle-2 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
            >
              શ્રી હનુમાન ચાલીસા
            </motion.h3>
            
            <motion.div 
              className="sacred-verse mb-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 2.6 }}
            >
              <p className="text-center italic">
                શ્રી ગુરુ ચરણ સરોજ રજ નિજમન મુકુર સુધારી<br />
                બરનઉં રઘુબર બિમલ જસુ જો દાયકુ ફલ ચારી<br /><br />
                
                બુદ્ધિહીન તનુ જાનિકે સુમિરૌં પવન કુમાર<br />
                બલ બુદ્ધિ વિદ્યા દેહુ મોહિં હરહુ કલેશ વિકાર
              </p>
            </motion.div>
            
            <motion.h2
              className="gujarati-subtitle mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.8 }}
            >
              અંબાલાલનું જીવન: ત્રિકોણ વ્યાઘ્ર પ્રતીક
            </motion.h2>
            
            <motion.div 
              className="family-glyph-container mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 3 }}
            >
              <div className="glyph ambalal-glyph">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <polygon className="triangle-glyph" points="50,10 90,90 10,90" />
                  <circle className="center-dot" cx="50" cy="50" r="5" />
                  <line className="ray" x1="50" y1="50" x2="50" y2="10" />
                  <line className="ray" x1="50" y1="50" x2="90" y2="90" />
                  <line className="ray" x1="50" y1="50" x2="10" y2="90" />
                </svg>
              </div>
              <div className="glyph-caption">
                <strong>અંબાલાલ પટેલ (1890-1972)</strong><br />
                જન્મ: વસો ગામ, ગુજરાત<br />
                વ્યવસાય: કિસાન, સમાજસેવક<br />
                જીવનસાથી: ચંચલબેન પટેલ
              </div>
            </motion.div>
            
            <motion.p 
              className="gujarati-text mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3.2 }}
            >
              અંબાલાલ એક એવા વ્યક્તિ હતા જેમના હૃદયમાં સાહસ અને કરુણાનો સંગમ હતો. તેમની આંખોમાં સત્યની ચમક અને તેમના શબ્દોમાં જ્ઞાનનો ખજાનો હતો. ત્રિકોણ વ્યાઘ્ર પ્રતીક તેમના ત્રણ મુખ્ય ગુણોનું પ્રતિનિધિત્વ કરે છે: સાહસ, સત્યનિષ્ઠા, અને પરિવાર પ્રત્યે અતૂટ પ્રેમ.
            </motion.p>
            
            <motion.h2
              className="gujarati-subtitle mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.4 }}
            >
              ચંચલબેન: ચતુષ્કોણ પથ પ્રતીક
            </motion.h2>
            
            <motion.div 
              className="family-glyph-container mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 3.6 }}
            >
              <div className="glyph chanchal-glyph">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <rect className="rect-glyph" x="15" y="15" width="70" height="70" />
                  <path className="path-glyph" d="M25,25 C40,35 60,25 75,35 C60,45 40,65 25,75 C40,65 60,55 75,65" />
                  <circle className="center-dot" cx="50" cy="50" r="5" />
                </svg>
              </div>
              <div className="glyph-caption">
                <strong>ચંચલબેન પટેલ (1897-1978)</strong><br />
                જન્મ: આણંદ, ગુજરાત<br />
                વ્યવસાય: ગૃહિણી, સમાજ કાર્યકર્તા<br />
                જીવનસાથી: અંબાલાલ પટેલ
              </div>
            </motion.div>
            
            <motion.p 
              className="gujarati-text mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3.8 }}
            >
              ચંચલબેન એક સરળ હૃદયની મહિલા હતાં, જેમના હાથમાં પરિવારનો તંતુ હતો. તેમના ચતુષ્કોણ પથ પ્રતીક તેમના જીવનના ચાર મુખ્ય માર્ગોને દર્શાવે છે: માતૃત્વ, સેવા, અધ્યાત્મ, અને પરંપરાનું જતન. તેમની વાનગીઓનો સ્વાદ આજે પણ પરિવારમાં યાદ કરવામાં આવે છે.
            </motion.p>
            
            <motion.h2
              className="gujarati-subtitle mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 4 }}
            >
              જમનાબેન: અંડાકાર વૃક્ષ પ્રતીક
            </motion.h2>
            
            <motion.div 
              className="family-glyph-container mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 4.2 }}
            >
              <div className="glyph jamna-glyph">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <ellipse className="oval-glyph" cx="50" cy="50" rx="40" ry="35" />
                  <path className="tree-glyph" d="M50,20 L50,80 M50,30 C30,40 35,60 25,75 M50,30 C70,40 65,60 75,75 M50,40 C40,45 35,50 30,65 M50,40 C60,45 65,50 70,65" />
                  <circle className="center-dot" cx="50" cy="50" r="5" />
                </svg>
              </div>
              <div className="glyph-caption">
                <strong>જમનાબેન શાહ (1905-1985)</strong><br />
                જન્મ: સુરત, ગુજરાત<br />
                વ્યવસાય: શિક્ષિકા, સાહિત્યકાર<br />
                સંબંધ: અંબાલાલની બહેન
              </div>
            </motion.div>
            
            <motion.p 
              className="gujarati-text mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 4.4 }}
            >
              જમનાબેન અંબાલાલની નાની બહેન હતાં, એક અજોડ વિધાન શક્તિ ધરાવતા સાહિત્ય પ્રેમી. અંડાકાર વૃક્ષ પ્રતીક તેમના જીવનમાં જ્ઞાન અને સાહિત્યની ખેતીનું સૂચક છે. તેમણે અનેક સ્ત્રીઓને શિક્ષિત કરવાનું બીડું ઝડપ્યું હતું, જ્યારે આ અશક્ય માનવામાં આવતું હતું.
            </motion.p>
            
            <motion.h2
              className="gujarati-subtitle mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 4.6 }}
            >
              આપણી વારસાગત સંસ્કૃતિનું જતન
            </motion.h2>
            
            <motion.div 
              className="quote-container mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 4.8 }}
            >
              <p className="quote">
                "જે પોતાના વડીલોને યાદ રાખે છે, એ પોતાનું ભવિષ્ય ઉજ્જવળ બનાવે છે."
              </p>
              <p className="quote-author">- અંબાલાલ પટેલ</p>
            </motion.div>
            
            <motion.p 
              className="gujarati-text mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 5 }}
            >
              આ વેબપેજ અને વાયા એપ્લિકેશન આપણા પરિવારની કથાઓને સંરક્ષિત કરવાનું માધ્યમ છે. ઇતિહાસ, સાંસ્કૃતિક પરંપરાઓ, અને વડીલોના અનુભવો એ અમૂલ્ય ખજાનો છે જે આવનારી પેઢીઓને માર્ગદર્શન આપશે.
            </motion.p>
            
            <motion.p 
              className="gujarati-text mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 5.2 }}
            >
              આપણે સૌ મળીને આપણી વારસાગત સંસ્કૃતિનું જતન કરીને અંબાલાલ, ચંચલબેન, અને જમનાબેનના સપનાઓને જીવંત રાખીશું.
            </motion.p>
            
            <motion.div
              className="back-to-top-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 5.4 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(255, 126, 95, 0.8)" 
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>Scroll to Top</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}

