
import { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  User, 
  Mic, 
  ImagePlus, 
  SendHorizontal, 
  Languages, 
  MoreHorizontal, 
  Sparkles,
  FileText,
  MessagesSquare,
  History,
  Settings,
  Pin,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NarraStoryPrompt } from "./NarraStoryPrompt";
import { NarraProcessingIndicator } from "./NarraProcessingIndicator";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: Array<{
    type: "image" | "audio";
    url: string;
  }>;
}

interface NarraConversationProps {
  initialMessages?: Message[];
}

export const NarraConversation = ({ initialMessages = [] }: NarraConversationProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages.length > 0 ? initialMessages : [
    {
      id: "welcome",
      role: "assistant",
      content: "¡Hola! I'm Narra, your storytelling companion. I'd love to help you capture and share your family's stories and traditions. What would you like to talk about today?",
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpanish, setIsSpanish] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const newUserMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: input,
        timestamp: new Date()
      };
      
      setMessages([...messages, newUserMessage]);
      setInput("");
      
      // Simulate AI processing
      setIsProcessing(true);
      
      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: isSpanish 
            ? "Gracias por compartir eso conmigo. Me encantaría saber más sobre tu familia. ¿Podrías contarme alguna tradición familiar especial?" 
            : "Thank you for sharing that with me. I'd love to hear more about your family. Could you tell me about a special family tradition?",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsProcessing(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Here would be the actual recording logic
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Simulate a recorded message
    const recordedMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: "This is a transcription of my recorded audio message.",
      timestamp: new Date(),
      attachments: [
        {
          type: "audio",
          url: "/placeholder.svg" // This would be the actual audio URL
        }
      ]
    };
    
    setMessages([...messages, recordedMessage]);
    
    // Simulate AI processing
    setIsProcessing(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: isSpanish 
          ? "Gracias por compartir ese audio. Me encantó escuchar tu historia. ¿Hay algo más que quisieras contar?" 
          : "Thank you for sharing that audio. I loved hearing your story. Is there anything else you'd like to tell?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 2000);
  };

  const toggleLanguage = () => {
    setIsSpanish(!isSpanish);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMessage]);
    
    // Simulate AI processing
    setIsProcessing(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: isSpanish 
          ? "Esa es una gran pregunta. Me encantaría explorar ese tema contigo. ¿Podrías compartir más detalles?" 
          : "That's a great question. I'd love to explore that topic with you. Could you share more details?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 2000);
  };

  const suggestedPrompts = [
    {
      id: "traditions",
      promptEn: "Tell me about a family tradition that's special to you.",
      promptEs: "Cuéntame sobre una tradición familiar que sea especial para ti.",
      icon: <Bookmark className="h-4 w-4" />
    },
    {
      id: "memories",
      promptEn: "What's your earliest childhood memory?",
      promptEs: "¿Cuál es tu primer recuerdo de la infancia?",
      icon: <History className="h-4 w-4" />
    },
    {
      id: "recipes",
      promptEn: "Is there a family recipe that has been passed down through generations?",
      promptEs: "¿Hay alguna receta familiar que se haya transmitido de generación en generación?",
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: "lessons",
      promptEn: "What's the most important lesson your parents taught you?",
      promptEs: "¿Cuál es la lección más importante que te enseñaron tus padres?",
      icon: <MessagesSquare className="h-4 w-4" />
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-lovable-blue text-white">
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Narra</h2>
            <p className="text-xs text-gray-500">Your storytelling companion</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleLanguage} title={isSpanish ? "Switch to English" : "Cambiar a Español"}>
            <Languages className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" title="Settings">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <div className="border-b px-4 py-2">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="chat">
              <MessagesSquare className="h-4 w-4 mr-2" />
              {isSpanish ? "Conversación" : "Conversation"}
            </TabsTrigger>
            <TabsTrigger value="prompts">
              <Sparkles className="h-4 w-4 mr-2" />
              {isSpanish ? "Ideas" : "Prompts"}
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="chat" className="flex-1 flex flex-col m-0 pt-4">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"} items-start gap-3`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="mt-0.5 bg-lovable-blue text-white">
                      <AvatarFallback>N</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div 
                    className={`max-w-[80%] rounded-xl p-4 ${
                      message.role === "assistant" 
                        ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white" 
                        : "bg-lovable-blue text-white"
                    }`}
                  >
                    <div className="text-sm md:text-base whitespace-pre-wrap">
                      {message.content}
                    </div>
                    
                    {message.attachments?.map((attachment, i) => (
                      <div key={i} className="mt-2 text-xs flex items-center gap-2">
                        {attachment.type === "audio" && <Mic className="h-4 w-4" />}
                        {attachment.type === "image" && <ImagePlus className="h-4 w-4" />}
                        <span>{attachment.type === "audio" ? "Audio recording" : "Image attachment"}</span>
                      </div>
                    ))}
                    
                    <div className="mt-1 text-xs opacity-70 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  {message.role === "user" && (
                    <Avatar className="mt-0.5 bg-gray-200 dark:bg-gray-700">
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex justify-start items-start gap-3">
                  <Avatar className="mt-0.5 bg-lovable-blue text-white">
                    <AvatarFallback>N</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 max-w-[80%]">
                    <NarraProcessingIndicator />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="border-t p-4">
            <div className="max-w-3xl mx-auto">
              {isRecording ? (
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span>{isSpanish ? "Grabando..." : "Recording..."}</span>
                  </div>
                  <Button variant="ghost" onClick={stopRecording}>
                    {isSpanish ? "Detener" : "Stop"}
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder={isSpanish ? "Escribe tu mensaje..." : "Type your message..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button 
                    variant="default"
                    className="bg-lovable-blue hover:bg-lovable-teal text-white" 
                    onClick={handleSendMessage}
                  >
                    <SendHorizontal className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={startRecording}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                </div>
              )}
              
              <Button 
                variant="ghost" 
                className="mt-2 text-gray-500 text-sm w-full justify-start"
              >
                <MoreHorizontal className="h-4 w-4 mr-1" />
                {isSpanish ? "Más sugerencias" : "More suggestions"}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="prompts" className="flex-1 m-0 overflow-auto p-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Pin className="h-4 w-4 text-lovable-teal" />
                    {isSpanish ? "Tradiciones Familiares" : "Family Traditions"}
                  </CardTitle>
                  <CardDescription>
                    {isSpanish ? "Comparte historias sobre tradiciones especiales" : "Share stories about special traditions"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <NarraStoryPrompt 
                        key={i}
                        prompt={isSpanish 
                          ? `¿Cuál es una tradición familiar que continúas practicando hasta hoy?` 
                          : `What's a family tradition you continue to practice today?`
                        }
                        onClick={handleSuggestedPrompt}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <History className="h-4 w-4 text-lovable-magenta" />
                    {isSpanish ? "Recuerdos de la Infancia" : "Childhood Memories"}
                  </CardTitle>
                  <CardDescription>
                    {isSpanish ? "Reflexiona sobre momentos especiales" : "Reflect on special moments"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <NarraStoryPrompt 
                        key={i}
                        prompt={isSpanish 
                          ? `¿Cuál es tu recuerdo más preciado de la infancia?` 
                          : `What's your most treasured childhood memory?`
                        }
                        onClick={handleSuggestedPrompt}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessagesSquare className="h-4 w-4 text-lovable-blue" />
                    {isSpanish ? "Lecciones de Vida" : "Life Lessons"}
                  </CardTitle>
                  <CardDescription>
                    {isSpanish ? "Comparte sabiduría y enseñanzas" : "Share wisdom and teachings"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <NarraStoryPrompt 
                        key={i}
                        prompt={isSpanish 
                          ? `¿Qué consejo te dio un familiar que nunca has olvidado?` 
                          : `What advice did a family member give you that you've never forgotten?`
                        }
                        onClick={handleSuggestedPrompt}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-4 w-4 text-lovable-teal" />
                    {isSpanish ? "Historias Familiares" : "Family Stories"}
                  </CardTitle>
                  <CardDescription>
                    {isSpanish ? "Relata historias transmitidas" : "Recount passed-down stories"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <NarraStoryPrompt 
                        key={i}
                        prompt={isSpanish 
                          ? `¿Hay alguna historia familiar que se ha transmitido por generaciones?` 
                          : `Is there a family story that has been passed down through generations?`
                        }
                        onClick={handleSuggestedPrompt}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
