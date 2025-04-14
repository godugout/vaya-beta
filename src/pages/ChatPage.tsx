import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatBubble } from '@/components/chat/messages/ChatBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatHeader } from '@/components/chat/ChatHeader';

// Sample messages data
const initialMessages = [
  {
    id: '1',
    content: "Hi Jeremy, I'm Aida, your personal memory companion. How can I help preserve your family stories today?",
    sender: 'assistant',
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  },
  {
    id: '2',
    content: "Hi Aida! I'd like to chat about my grandmother's recipes.",
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 28) // 28 minutes ago
  },
  {
    id: '3',
    content: "That sounds wonderful! Family recipes often carry so much history and emotion. What's your earliest memory of your grandmother's cooking?",
    sender: 'assistant',
    timestamp: new Date(Date.now() - 1000 * 60 * 26) // 26 minutes ago
  },
  {
    id: '4',
    content: "I remember her apple pie. The kitchen would smell amazing all day while she baked it. She had this special cinnamon mix she'd use.",
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 24) // 24 minutes ago
  },
  {
    id: '5',
    content: "That sounds delicious! The aroma of baking is such a powerful memory trigger. Do you know if her recipe was written down anywhere? Or was it something she made from memory?",
    sender: 'assistant',
    timestamp: new Date(Date.now() - 1000 * 60 * 22) // 22 minutes ago
  }
];

export const ChatPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newUserMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate response
    setTimeout(() => {
      setIsTyping(false);
      const newAssistantMessage = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for sharing! Would you like to explore more family memories or record another story?",
        sender: 'assistant' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newAssistantMessage]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              content={message.content}
              isUser={message.sender === 'user'}
              timestamp={message.timestamp}
              avatar={{
                src: message.sender === 'assistant' 
                  ? "/lovable-uploads/a13e3eee-a6a0-40a3-8dea-0f28af1f142e.png"
                  : undefined,
                fallback: message.sender === 'user' ? 'Me' : 'AI'
              }}
            />
          ))}
          
          {isTyping && (
            <ChatBubble
              content="..."
              avatar={{
                src: "/lovable-uploads/a13e3eee-a6a0-40a3-8dea-0f28af1f142e.png",
                fallback: "AI"
              }}
            />
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput
        value={inputMessage}
        onChange={setInputMessage}
        onSubmit={handleSendMessage}
      />
    </div>
  );
};
