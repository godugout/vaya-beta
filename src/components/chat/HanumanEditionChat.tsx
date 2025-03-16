
import React, { useState, useRef } from 'react';
import { useChat } from './useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import PromptCategories from './PromptCategories';
import { HanumanEditionSettings } from './HanumanEditionSettings';
import { HanumanBanner } from './HanumanBanner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FamilyContextForm } from './FamilyContextForm';
import { FamilyContext } from './types';
import { SacredGlyphGrid } from '../sacred/SacredGlyphGrid';

export const HanumanEditionChat: React.FC = () => {
  const { 
    messages, 
    input, 
    setInput, 
    handleSend, 
    handleMorePrompts,
    familyContext,
    saveFamilyContext,
    edition,
    setHanumanEdition
  } = useChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showFamilyContextForm, setShowFamilyContextForm] = useState(!familyContext);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  React.useEffect(() => {
    // Set Hanuman edition on mount
    setHanumanEdition();
  }, []);
  
  const handleFamilyContextSave = async (context: FamilyContext) => {
    await saveFamilyContext(context);
    setShowFamilyContextForm(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50 rounded-lg border">
      <div className="p-4 border-b bg-white">
        <HanumanBanner onFamilySettingsClick={() => setShowFamilyContextForm(true)} />
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-heading text-amber-800">Family Stories</h2>
          <HanumanEditionSettings 
            familyContext={familyContext}
            saveFamilyContext={saveFamilyContext}
          />
        </div>
        <div className="my-4">
          <PromptCategories 
            onPromptSelect={(prompt) => {
              setInput(prompt);
            }}
            edition="hanuman"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, idx) => (
          <ChatMessage key={idx} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t bg-white">
        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          additionalButton={
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleMorePrompts(false)}
              className="text-gray-500 border-gray-300"
            >
              More Prompts
            </Button>
          }
        />
      </div>
      
      <Dialog open={showFamilyContextForm} onOpenChange={setShowFamilyContextForm}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <FamilyContextForm 
            initialContext={familyContext || {}}
            onSave={handleFamilyContextSave}
            onCancel={() => setShowFamilyContextForm(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Sacred visual elements */}
      <div className="p-6 bg-white border-t mt-4">
        <h3 className="text-lg font-heading text-amber-800 mb-4">Sacred Family Glyphs</h3>
        <SacredGlyphGrid />
      </div>
    </div>
  );
};
