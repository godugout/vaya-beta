
import React from 'react';
import { VayaCard } from '@/components/ui/vaya-card';
import { StoryHeading, StoryText } from '@/components/ui/story-text';

export const MultilingualStoryExample: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Multilingual Story</h3>
      
      <VayaCard elevation={2} className="overflow-hidden">
        <div className="p-6 space-y-4">
          <StoryHeading level={3} size="lg" language="gujarati">
            જયેશ પટેલની યાદગાર
          </StoryHeading>
          
          <StoryText language="gujarati" leading="relaxed">
            ૧૯૭૨માં અમે ગુજરાતના ગામમાં રહેતા હતા. અમારું ઘર નાનું હતું, પણ આખો પરિવાર સાથે રહેતો
            હતો. દાદા-દાદી, માતા-પિતા, કાકા-કાકી, અને ઘણા બધા ભાઈ-બહેન. દરરોજ સવારે માતા ગરમ ચા 
            બનાવતી અને આખો પરિવાર સાથે નાસ્તો કરતો.
          </StoryText>
          
          <StoryHeading level={3} size="lg" language="hindi">
            जयेश पटेल की यादें
          </StoryHeading>
          
          <StoryText language="hindi" leading="relaxed">
            १९७२ में हम गुजरात के एक छोटे से गांव में रहते थे। हमारा घर छोटा था, लेकिन पूरा परिवार एक साथ रहता था।
            दादा-दादी, माता-पिता, चाचा-चाची, और कई भाई-बहन। हर सुबह माँ गरम चाय बनाती थी और पूरा परिवार साथ
            में नाश्ता करता था।
          </StoryText>
        </div>
      </VayaCard>
    </div>
  );
};
