
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HanumanMessage } from "@/types/hanuman";

const HanumanChat: React.FC = () => {
  const [messages, setMessages] = useState<HanumanMessage[]>([
    { role: "assistant", content: "Namaste! How can I assist you today in exploring your family's heritage and stories?" }
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", content: input }]);
    
    // Simulate response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: "I've received your message. This is a placeholder response in our demo interface." 
        }
      ]);
    }, 1000);
    
    setInput("");
  };

  return (
    <div className="hanuman-chat-container bg-black/30 backdrop-blur-sm rounded-lg border border-hanuman-orange/20 h-[600px] flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-3/4 p-3 rounded-lg ${
                message.role === "user" 
                  ? "bg-hanuman-orange/30 text-white ml-12" 
                  : "bg-black/40 text-white mr-12"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-hanuman-orange/20 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-black/30 border-hanuman-orange/30 focus:border-hanuman-gold/50 text-white"
          />
          <Button 
            type="submit"
            className="bg-hanuman-orange/80 hover:bg-hanuman-orange text-white"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HanumanChat;
