
import React, { useState } from 'react';
import { Send, Mic, Paperclip, ArrowUp } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface AidaChatProps {
  initialMessages?: Message[];
}

export const AidaChat: React.FC<AidaChatProps> = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm Aida, your memory companion. I'm here to help you capture and preserve stories.",
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="aida-chat-header">
        <div className="flex items-center">
          <div className="font-medium">Aida</div>
          <div className="text-xs text-[#8A898C] ml-2">Online</div>
        </div>
      </div>
      
      <div className="aida-chat-body flex-1 overflow-y-auto">
        <div className="flex flex-col space-y-4 p-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div>
                <div 
                  className={`aida-bubble ${message.sender === 'user' ? 'aida-bubble-user' : 'aida-bubble-assistant'}`}
                >
                  {message.content}
                </div>
                <div className={`aida-message-time ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="aida-chat-footer p-4">
        <div className="flex items-center relative">
          <input
            type="text"
            className="aida-input flex-1 pr-10"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          <button 
            className="absolute right-0 p-2 text-black"
            onClick={handleSend}
          >
            <Send size={20} />
          </button>
        </div>
        <div className="flex justify-between mt-3">
          <button className="p-2">
            <Mic size={20} />
          </button>
          <button className="p-2">
            <Paperclip size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
