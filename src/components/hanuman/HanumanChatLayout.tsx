
import React from "react";

interface HanumanChatLayoutProps {
  children: React.ReactNode;
}

export const HanumanChatLayout: React.FC<HanumanChatLayoutProps> = ({ children }) => {
  return (
    <div className="hanuman-chat-layout my-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3 lg:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
};
