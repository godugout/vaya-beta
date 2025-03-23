
import React from "react";
import { motion } from "framer-motion";
import { HanumanMessage } from "@/types/hanuman";
import { Sparkles, User } from "lucide-react";

interface ChatMessagesProps {
  messages: HanumanMessage[];
  isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  // Only display loading state when no messages
  const showWelcomeMessage = messages.length === 0 && !isLoading;
  
  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      {showWelcomeMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center py-12"
        >
          <div className="max-w-md text-center px-8 py-6 bg-gradient-to-br from-hanuman-primary/10 via-black/30 to-hanuman-saffron/10 rounded-xl border border-hanuman-orange/20">
            <Sparkles className="w-12 h-12 text-hanuman-gold mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-hanuman-gold mb-2">
              Explore Your Family Heritage
            </h3>
            <p className="text-white/80 text-sm mb-4">
              Share stories, traditions, and wisdom from your family. 
              Ask questions or use the suggested prompts to begin your journey.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button className="px-3 py-1.5 text-xs rounded-full bg-black/30 border border-hanuman-orange/30 text-white hover:bg-hanuman-primary/20 hover:border-hanuman-orange/50 transition-all">
                Share a family story
              </button>
              <button className="px-3 py-1.5 text-xs rounded-full bg-black/30 border border-hanuman-orange/30 text-white hover:bg-hanuman-primary/20 hover:border-hanuman-orange/50 transition-all">
                Record a memory
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center py-12"
        >
          <div className="flex items-center gap-3 text-white/80 bg-black/20 px-4 py-3 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-hanuman-orange/80 animate-pulse"></div>
            <span>Connecting to your family wisdom...</span>
          </div>
        </motion.div>
      )}

      {/* Actual Messages */}
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
        >
          {/* Avatar for assistant messages */}
          {message.role === 'assistant' && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-hanuman-orange to-hanuman-gold flex items-center justify-center text-black flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
          )}
          
          {/* Message Bubble */}
          <div className={
            message.role === 'user' 
              ? 'hanuman-chat-bubble-user' 
              : 'hanuman-chat-bubble-assistant'
          }>
            {message.content}
          </div>
          
          {/* Avatar for user messages */}
          {message.role === 'user' && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-hanuman-cosmic-purple to-hanuman-cosmic-blue flex items-center justify-center text-white flex-shrink-0">
              <User className="w-4 h-4" />
            </div>
          )}
        </motion.div>
      ))}
      
      {/* Live Loading for New Messages */}
      {isLoading && messages.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start"
        >
          <div className="hanuman-chat-bubble-assistant" style={{ minWidth: '60px' }}>
            <div className="flex gap-1 items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-hanuman-orange animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-hanuman-orange animate-bounce" style={{ animationDelay: '200ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-hanuman-orange animate-bounce" style={{ animationDelay: '400ms' }}></div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatMessages;
