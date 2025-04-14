
import React from 'react';
import { AidaLayout } from '@/components/layout/AidaLayout';
import { AidaChat } from '@/components/chat/AidaChat';

export const ChatPage = () => {
  // Sample initial messages
  const initialMessages = [
    {
      id: '1',
      content: "Hi, I'm Aida, your personal memory companion. I'm here to help you preserve stories.",
      sender: 'assistant',
      timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
    },
    {
      id: '2',
      content: "Hi Aida, nice to meet you.",
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 4) // 4 minutes ago
    },
    {
      id: '3',
      content: "Nice to meet you, Jeremy! I'd love to know what's your earliest memory of your grandmother's kitchen?",
      sender: 'assistant',
      timestamp: new Date(Date.now() - 1000 * 60 * 3) // 3 minutes ago
    }
  ];

  return (
    <AidaLayout withPadding={false} className="flex flex-col h-screen">
      <AidaChat initialMessages={initialMessages} />
    </AidaLayout>
  );
};
