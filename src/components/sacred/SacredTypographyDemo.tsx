
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const SacredTypographyDemo: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sacred Typography System</CardTitle>
        <CardDescription>
          A typography system that bridges generations with support for multiple languages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="english">
          <TabsList className="mb-4">
            <TabsTrigger value="english">English</TabsTrigger>
            <TabsTrigger value="gujarati">Gujarati</TabsTrigger>
            <TabsTrigger value="bilingual">Bilingual</TabsTrigger>
          </TabsList>
          
          <TabsContent value="english" className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-heading text-4xl font-semibold tracking-tight">
                Mukta Vaani Heading (H1)
              </h1>
              <h2 className="font-heading text-3xl font-semibold tracking-tight">
                Mukta Vaani Subheading (H2)
              </h2>
              <h3 className="font-heading text-2xl font-semibold">
                Mukta Vaani Section Title (H3)
              </h3>
              <div className="mt-6 space-y-2">
                <p className="font-body text-base leading-7">
                  <strong>Inter Regular (Body)</strong>: This is the standard body text set in Inter Regular at 16px (1rem) with a comfortable line height of 1.5. 
                  The 8px grid system ensures perfect vertical rhythm in all typography.
                </p>
                <p className="font-body text-base leading-7">
                  <strong>Inter Medium</strong>: Medium weight is used for emphasis within body text or for UI elements that need slightly more visual weight.
                </p>
                <p className="font-story text-lg leading-7 italic">
                  <strong>Georgia (Story Text)</strong>: Family stories are set in Georgia for warmth and readability. 
                  This serif font adds a traditional feeling to personal narratives and important family memories.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="gujarati" className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-gujarati text-4xl font-semibold tracking-tight">
                મુક્તા વાણી શીર્ષક (H1)
              </h1>
              <h2 className="font-gujarati text-3xl font-semibold tracking-tight">
                મુક્તા વાણી ઉપશીર્ષક (H2)
              </h2>
              <h3 className="font-gujarati text-2xl font-semibold">
                મુક્તા વાણી વિભાગ શીર્ષક (H3)
              </h3>
              <div className="mt-6 space-y-2">
                <p className="font-gujarati text-base leading-7">
                  આ માનક મુખ્ય લખાણ છે જે 16px (1rem) ના મુક્તા વાણી નિયમિત માં સેટ કરેલ છે 
                  અને 1.5 ની આરામદાયક લાઇન ઊંચાઈ ધરાવે છે. 8px ગ્રિડ સિસ્ટમ બધા ટાઈપોગ્રાફીમાં સંપૂર્ણ ઊભી લય સુનિશ્ચિત કરે છે.
                </p>
                <p className="font-gujarati text-base leading-7 font-medium">
                  મધ્યમ વજન મુખ્ય લખાણની અંદર ભાર માટે અથવા UI ઘટકો માટે વાપરવામાં આવે છે જેને થોડા વધુ દૃશ્ય વજનની જરૂર હોય છે.
                </p>
                <p className="font-story text-lg leading-7 italic">
                  આ પરિવારની વાર્તાઓ ઉષ્ણતા અને વાંચનક્ષમતા માટે સેટ કરવામાં આવી છે.
                  આ સેરિફ ફોન્ટ વ્યક્તિગત કથાઓ અને મહત્વપૂર્ણ પરિવારની યાદોમાં પરંપરાગત લાગણી ઉમેરે છે.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bilingual" className="space-y-8">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <h1 className="font-heading text-3xl font-semibold tracking-tight">
                  Sacred Family Wisdom
                </h1>
                <h1 className="font-gujarati text-3xl font-semibold tracking-tight text-right">
                  પવિત્ર પરિવાર જ્ઞાન
                </h1>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="font-body text-base leading-7">
                  Our family stories connect us to our heritage and guide future generations toward wisdom and understanding.
                </p>
                <p className="font-gujarati text-base leading-7 text-right">
                  અમારી પરિવારની વાર્તાઓ અમને અમારા વારસા સાથે જોડે છે અને ભવિષ્યની પેઢીઓને જ્ઞાન અને સમજણ તરફ માર્ગદર્શન આપે છે.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-gray-200 dark:border-gray-800 rounded-md p-4">
                  <h3 className="font-heading text-lg font-semibold mb-2">Family Prayer</h3>
                  <p className="font-story text-base">
                    "May we honor our ancestors through our actions, and may our children find strength in our stories."
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-800 rounded-md p-4">
                  <h3 className="font-gujarati text-lg font-semibold mb-2 text-right">પરિવાર પ્રાર્થના</h3>
                  <p className="font-gujarati text-base text-right">
                    "અમારા કાર્યો દ્વારા અમે અમારા પૂર્વજોનું સન્માન કરીએ, અને અમારા બાળકો અમારી વાર્તાઓમાં શક્તિ મેળવે."
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="font-heading text-xl font-semibold mb-3">8px Typography Grid</h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <div className="h-8 bg-sacred-primary-saffron/20 flex items-center justify-center">
                  8px
                </div>
              </div>
              <div>
                <div className="h-16 bg-sacred-primary-teal/20 flex items-center justify-center">
                  16px
                </div>
              </div>
              <div>
                <div className="h-24 bg-sacred-primary-yellow/20 flex items-center justify-center">
                  24px
                </div>
              </div>
              <div>
                <div className="h-32 bg-sacred-primary-green/20 flex items-center justify-center">
                  32px
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              All typography follows an 8px baseline grid for vertical rhythm and visual harmony
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
