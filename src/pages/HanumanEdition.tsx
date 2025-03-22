
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { HanumanEditionChat } from '@/components/chat/HanumanEditionChat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SuggestedPrompts } from '@/components/narra/SuggestedPrompts';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { JamnabenCircularGlyph } from '@/components/sacred/JamnabenCircularGlyph';
import { AmbaTriangleGlyph } from '@/components/sacred/AmbaTriangleGlyph';
import { ChanchalRectangleGlyph } from '@/components/sacred/ChanchalRectangleGlyph';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function HanumanEdition() {
  const { isSpanish, setLanguagePreference } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es' | 'hi' | 'gu'>('en');
  
  const handleLanguageChange = (lang: 'en' | 'es' | 'hi' | 'gu') => {
    setSelectedLanguage(lang);
    if (lang === 'es') {
      setLanguagePreference('es');
    } else {
      setLanguagePreference('en');
    }
  };
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <MainLayout>
      <motion.div 
        className="container mx-auto py-8"
        variants={staggerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Card */}
        <motion.div variants={fadeInUpVariants}>
          <Card className="mb-8 overflow-hidden border-2 border-amber-100 dark:border-amber-900/40">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="w-full h-full bg-[url('/patterns/sacred-yantra.svg')] bg-repeat opacity-20"></div>
            </div>
            
            <CardHeader className="text-center relative z-10">
              <div className="flex justify-center items-center gap-4 mb-4">
                <AmbaTriangleGlyph size="md" className="text-amber-600 dark:text-amber-500" />
                <JamnabenCircularGlyph size="md" className="text-amber-600 dark:text-amber-500" />
                <ChanchalRectangleGlyph size="md" className="text-amber-600 dark:text-amber-500" />
              </div>
              
              <CardTitle className="text-3xl font-bold text-amber-800 dark:text-amber-400">
                {selectedLanguage === 'en' && "Hanuman Edition"}
                {selectedLanguage === 'es' && "Edición Hanuman"}
                {selectedLanguage === 'hi' && "हनुमान संस्करण"}
                {selectedLanguage === 'gu' && "હનુમાન એડિશન"}
              </CardTitle>
              
              <CardDescription className="text-lg max-w-2xl mx-auto">
                {selectedLanguage === 'en' && "A culturally relevant storytelling experience for South Asian families, with a focus on Gujarati and Hindi traditions."}
                {selectedLanguage === 'es' && "Una experiencia de narración de historias culturalmente relevante para familias del sur de Asia, con enfoque en tradiciones gujarati e hindi."}
                {selectedLanguage === 'hi' && "दक्षिण एशियाई परिवारों के लिए एक सांस्कृतिक रूप से प्रासंगिक कहानी अनुभव, गुजराती और हिंदी परंपराओं पर विशेष ध्यान देने के साथ।"}
                {selectedLanguage === 'gu' && "દક્ષિણ એશિયાઈ પરિવારો માટે સાંસ્કૃતિક રીતે પ્રસ્તુત વાર્તા અનુભવ, ગુજરાતી અને હિન્દી પરંપરાઓ પર ધ્યાન કેન્દ્રિત કરવાની સાથે."}
              </CardDescription>
              
              <div className="flex justify-center gap-2 mt-4">
                <Button 
                  variant={selectedLanguage === 'en' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleLanguageChange('en')}
                  className="font-medium"
                >
                  English
                </Button>
                <Button 
                  variant={selectedLanguage === 'es' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleLanguageChange('es')}
                  className="font-medium"
                >
                  Español
                </Button>
                <Button 
                  variant={selectedLanguage === 'hi' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleLanguageChange('hi')}
                  className="font-medium hindi-content"
                >
                  हिंदी
                </Button>
                <Button 
                  variant={selectedLanguage === 'gu' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleLanguageChange('gu')}
                  className="font-medium gujarati-content"
                >
                  ગુજરાતી
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="max-w-4xl mx-auto">
                <HanumanEditionChat />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Story Ideas Card */}
        <motion.div variants={fadeInUpVariants}>
          <Card className="border-2 border-amber-100 dark:border-amber-900/40">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Globe className="h-5 w-5 text-amber-600" />
                {selectedLanguage === 'en' && "Story Ideas"}
                {selectedLanguage === 'es' && "Ideas para Historias"}
                {selectedLanguage === 'hi' && "कहानी के विचार"}
                {selectedLanguage === 'gu' && "વાર્તા વિચારો"}
              </CardTitle>
              <CardDescription>
                {selectedLanguage === 'en' && "Explore these suggestions to capture your family's stories"}
                {selectedLanguage === 'es' && "Explora estas sugerencias para capturar las historias de tu familia"}
                {selectedLanguage === 'hi' && "अपने परिवार की कहानियों को कैप्चर करने के लिए इन सुझावों का अन्वेषण करें"}
                {selectedLanguage === 'gu' && "તમારા પરિવારની વાર્તાઓને કેપ્ચર કરવા માટે આ સૂચનોની શોધ કરો"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <SuggestedPrompts 
                isSpanish={selectedLanguage === 'es'} 
                onPromptSelect={(prompt) => {
                  document.querySelector('.HanumanEditionChat')?.scrollIntoView({ behavior: 'smooth' });
                }} 
              />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
