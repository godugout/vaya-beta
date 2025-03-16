
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Rocket, Shield, Download, Key, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { HanumanBanner } from './HanumanBanner';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

export const HanumanEditionChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to the Hanuman Edition. I can assist with recording family stories, cultural wisdom, and traditions. How can I help you today?',
      sender: 'system',
      timestamp: new Date()
    }
  ]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've recorded your story about family traditions. Would you like to add any specific details about when these traditions started or any special significance they hold?",
        sender: 'system',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };
  
  const handleFamilySettingsClick = () => {
    // In a real app, this would open settings
    console.log('Open family settings');
  };
  
  return (
    <div className="space-bg rounded-lg overflow-hidden relative">
      <div className="space-stars"></div>
      <div className="relative z-10">
        <HanumanBanner onFamilySettingsClick={handleFamilySettingsClick} />
        
        <div className="p-6">
          <div className="bg-space-darkBlue/80 backdrop-blur-md rounded-lg border border-space-indigo overflow-hidden">
            {/* Chat messages */}
            <div className="h-[60vh] overflow-y-auto p-6">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.sender === 'user' 
                        ? 'bg-space-blue text-white ml-12' 
                        : 'bg-space-indigo text-space-text-primary mr-12'
                    }`}
                  >
                    {message.sender === 'system' && (
                      <div className="flex items-center mb-2">
                        <div className="h-6 w-6 rounded-full bg-space-lightBlue/20 flex items-center justify-center mr-2">
                          <Rocket className="h-3 w-3 text-space-lightBlue" />
                        </div>
                        <span className="text-xs font-medium text-space-lightBlue">HANUMAN AI</span>
                      </div>
                    )}
                    <p>{message.content}</p>
                    <div className="mt-1 text-right">
                      <span className="text-xs opacity-60">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Input area */}
            <div className="border-t border-space-indigo p-4">
              <div className="flex items-end gap-2">
                <div className="flex-1 space-terminal">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    className="bg-transparent border-none focus:ring-0 min-h-[60px] text-space-text-primary"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                </div>
                
                <Button 
                  onClick={handleSend}
                  className="bg-space-blue hover:bg-space-lightBlue text-white h-10 w-10 rounded-full p-0 flex items-center justify-center"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-xs text-space-text-tertiary">
                <div className="flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  <span>Protected with advanced encryption</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="flex items-center hover:text-space-lightBlue transition-colors">
                    <Download className="h-3 w-3 mr-1" />
                    <span>Export</span>
                  </button>
                  
                  <button className="flex items-center hover:text-space-lightBlue transition-colors">
                    <Lock className="h-3 w-3 mr-1" />
                    <span>Privacy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-space-text-secondary">
              All conversation history is preserved in your family's secure vault.
              <span className="block mt-1">
                <Key className="h-3 w-3 inline mr-1" />
                <span className="text-space-gold">Anjanaeya Vault</span> protection active
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
