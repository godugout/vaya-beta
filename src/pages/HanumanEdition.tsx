
import React from 'react';
import HanumanTopNav from "@/components/navigation/HanumanTopNav";
import HanumanBackground from "@/components/hanuman/HanumanBackground";
import HanumanChat from "@/components/hanuman/HanumanChat";
import { HanumanChatLayout } from "@/components/hanuman/HanumanChatLayout";

const HanumanEdition: React.FC = () => {
  return (
    <div className="hanuman-theme min-h-screen flex flex-col bg-hanuman-dark text-white relative">
      <HanumanBackground />
      <HanumanTopNav />
      <div className="flex-1 container mx-auto px-4">
        <HanumanChatLayout>
          <HanumanChat />
        </HanumanChatLayout>
      </div>
    </div>
  );
};

export default HanumanEdition;
