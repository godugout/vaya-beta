
import { Bot } from "lucide-react";
import { AnimatedContainer } from "@/components/animation/AnimatedContainer";
import { NarraConversation } from "@/components/narra/NarraConversation";

export const NarraAssistantSection = () => {
  return (
    <AnimatedContainer variant="fade" className="relative">
      <div className="flex items-center mb-8">
        <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
          <Bot className="h-5 w-5 text-green-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Narra AI Assistant</h2>
          <p className="text-gray-400">AI-powered storytelling assistant to help capture and enhance family stories</p>
        </div>
      </div>

      <div className="space-y-12">
        <div className="space-y-4">
          <div className="flex items-center">
            <h3 className="text-2xl font-semibold text-green-300">Narra Conversational Interface</h3>
            <div className="h-px flex-grow bg-gradient-to-r from-green-500/50 to-transparent ml-4"></div>
          </div>
          <p className="text-gray-400 mb-6">
            Interactive chat interface with Narra, the AI storytelling assistant.
          </p>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-1 backdrop-blur-sm shadow-xl">
            <div className="border rounded-lg shadow-sm overflow-hidden h-[800px] max-w-4xl mx-auto">
              <NarraConversation />
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};
