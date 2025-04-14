
import React, { useState, useRef, useEffect } from 'react';
import { AidaLayout } from '@/components/layout/AidaLayout';
import { 
  ArrowLeft, 
  MoreVertical, 
  Paperclip, 
  Mic, 
  Send, 
  Image,
  Video,
  File
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  const [showAttachments, setShowAttachments] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    
    // Simulate assistant typing
    setIsTyping(true);
    
    // Simulate response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      const newAssistantMessage = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for sharing that memory! The special cinnamon mix sounds intriguing. Would you like to record more details about your grandmother's apple pie recipe, or perhaps explore other memories related to family cooking traditions?",
        sender: 'assistant' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAssistantMessage]);
    }, 2500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat Header */}
      <header className="bg-white px-4 py-3 flex items-center border-b border-gray-200">
        <Link to="/" className="mr-3">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src="/lovable-uploads/a13e3eee-a6a0-40a3-8dea-0f28af1f142e.png" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h1 className="font-medium">Aida</h1>
          <p className="text-xs text-gray-500">Memory Companion</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical size={20} className="text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Search Messages</DropdownMenuItem>
            <DropdownMenuItem>Media & Links</DropdownMenuItem>
            <DropdownMenuItem>Clear Chat</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.sender === 'assistant' && (
                <Avatar className="h-8 w-8 mr-2 self-end">
                  <AvatarImage src="/lovable-uploads/a13e3eee-a6a0-40a3-8dea-0f28af1f142e.png" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              
              <div className={`max-w-[75%] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block chat-bubble ${message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-other'}`}>
                  {message.content}
                </div>
                <div className="text-xs text-gray-500 mt-1 mx-1">
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {message.sender === 'user' && (
                <Avatar className="h-8 w-8 ml-2 self-end">
                  <AvatarImage src="" />
                  <AvatarFallback>Me</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <Avatar className="h-8 w-8 mr-2 self-end">
                <AvatarImage src="/lovable-uploads/a13e3eee-a6a0-40a3-8dea-0f28af1f142e.png" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              
              <div className="chat-typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Attachment Options */}
      {showAttachments && (
        <div className="p-2 bg-white border-t border-gray-200 grid grid-cols-3 gap-2">
          <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full mb-2">
              <Image size={20} className="text-blue-500" />
            </div>
            <span className="text-xs text-gray-700">Photo</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg">
            <div className="bg-purple-100 p-2 rounded-full mb-2">
              <Video size={20} className="text-purple-500" />
            </div>
            <span className="text-xs text-gray-700">Video</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-lg">
            <div className="bg-orange-100 p-2 rounded-full mb-2">
              <File size={20} className="text-orange-500" />
            </div>
            <span className="text-xs text-gray-700">Document</span>
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowAttachments(!showAttachments)}
            className="text-gray-500"
          >
            <Paperclip size={20} />
          </Button>
          
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-gray-100 border-0 rounded-full py-2.5 px-4 focus:ring-blue-500"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-500"
          >
            <Mic size={20} />
          </Button>
          
          <Button 
            size="icon" 
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
            onClick={handleSendMessage}
            disabled={inputMessage.trim() === ''}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
