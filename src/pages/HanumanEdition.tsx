
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { HanumanEditionChat } from '@/components/chat/HanumanEditionChat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SuggestedPrompts } from '@/components/narra/SuggestedPrompts';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HanumanEdition() {
  const { isSpanish } = useLanguage();
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              {isSpanish ? "Edición Hanuman" : "Hanuman Edition"}
            </CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto">
              {isSpanish 
                ? "Una experiencia de narración de historias culturalmente relevante para familias del sur de Asia, con enfoque en tradiciones gujarati e hindi."
                : "A culturally relevant storytelling experience for South Asian families, with a focus on Gujarati and Hindi traditions."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-4xl mx-auto">
              <HanumanEditionChat />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {isSpanish ? "Ideas para Historias" : "Story Ideas"}
            </CardTitle>
            <CardDescription>
              {isSpanish 
                ? "Explora estas sugerencias para capturar las historias de tu familia"
                : "Explore these suggestions to capture your family's stories"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SuggestedPrompts 
              isSpanish={isSpanish} 
              onPromptSelect={(prompt) => {
                // This would typically navigate to the chat with the prompt pre-filled
                console.log("Selected prompt:", prompt);
                // For now just scroll to the chat
                document.querySelector('.HanumanEditionChat')?.scrollIntoView({ behavior: 'smooth' });
              }} 
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
