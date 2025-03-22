
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChat } from "./hooks/useChat";
import { Button } from "@/components/ui/button";
import { User, Settings, MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FamilyContextForm } from "./FamilyContextForm";
import { HanumanBanner } from "./HanumanBanner";
import { HanumanEditionSettings } from "./HanumanEditionSettings";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import PromptCategories from "./PromptCategories";
import { useLanguage } from "@/contexts/LanguageContext";

export function HanumanEditionChat() {
  const [activeTab, setActiveTab] = useState("chat");
  const { messages, input, setInput, handleSend, handleMorePrompts, familyContext, saveFamilyContext } = useChat();
  const { isSpanish, setLanguagePreference } = useLanguage();

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
  };

  const toggleLanguage = () => {
    setLanguagePreference(isSpanish ? 'en' : 'es');
  };

  const handleFamilyContextSave = (context: any) => {
    saveFamilyContext(context);
    setActiveTab("chat");
  };

  return (
    <Card className="h-[80vh] max-h-[80vh] flex flex-col">
      <CardHeader className="px-4 py-2 flex-none">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-xl">
            <HanumanBanner />
          </CardTitle>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={toggleLanguage} variant="ghost" size="sm">
            {isSpanish ? "EN" : "ES"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <TabsContent value="chat" className="h-full flex flex-col m-0">
          <div className="px-4 py-2 border-b">
            <PromptCategories 
              onPromptSelect={handlePromptSelect} 
              isSpanish={isSpanish}
              edition="hanuman"
            />
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, i) => (
                <ChatMessage key={i} message={message} isSpanish={isSpanish} />
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t mt-auto">
            <ChatInput
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              handleMorePrompts={() => handleMorePrompts(isSpanish)}
              setIsRecording={() => {}}
              isSpanish={isSpanish}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="profile" className="h-full m-0 p-4 overflow-auto">
          <FamilyContextForm 
            initialContext={familyContext} 
            onSave={handleFamilyContextSave}
            edition="hanuman"
          />
        </TabsContent>
        
        <TabsContent value="settings" className="h-full m-0 p-4 overflow-auto">
          <HanumanEditionSettings />
        </TabsContent>
      </CardContent>
    </Card>
  );
}
