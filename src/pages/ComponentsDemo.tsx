import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FamilyTreeMain } from "@/components/family/FamilyTreeMain";
import { FamilyMemberDetailCard } from "@/components/family/FamilyMemberDetailCard";
import { MemoryCapsuleCreator } from "@/components/capsule/MemoryCapsuleCreator";
import { MemoryCapsuleTimeline } from "@/components/capsule/MemoryCapsuleTimeline";
import { NarraConversation } from "@/components/narra/NarraConversation";
import FamilyStoryCard from "@/components/stories/FamilyStoryCard";
import RecordingButton from "@/components/audio/RecordingButton";
import TranscriptionDisplay from "@/components/audio/TranscriptionDisplay";
import { AnimatedContainer } from "@/components/animation/AnimatedContainer";
import { motion } from "framer-motion";
import { 
  TreeDeciduous, 
  Package, 
  Bot, 
  Sparkles,
  MessageSquare,
  Phone,
  ChevronRight,
  UploadCloud
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ComponentsDemo = () => {
  const [activeTab, setActiveTab] = useState("family-tree");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);

  const sampleStories = [
    {
      title: "Grandma's Apple Pie Recipe",
      description: "The secret family recipe that's been passed down for generations. Grandma Rose shares her tips for the perfect crust!",
      author: "Grandma Rose",
      date: "July 15, 2023",
      storyCount: 3
    },
    {
      title: "Dad's College Adventures",
      description: "Stories from Dad's wild college years, including the infamous road trip of '89 and how he met Mom.",
      author: "Dad",
      date: "March 5, 2023",
      storyCount: 5
    },
    {
      title: "Summer at Uncle Mike's Farm",
      description: "Childhood memories of spending summers at Uncle Mike's farm, from riding tractors to chasing fireflies.",
      author: "Cousin Emma",
      date: "June 20, 2023",
      storyCount: 2
    }
  ];

  const handleRecordingClick = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        setTranscription("This is a sample transcription of a recorded story about our family vacation to the Grand Canyon last summer. We had such an amazing time hiking and exploring the natural beauty of the canyon.");
      }, 2000);
    } else {
      setIsRecording(true);
      setTranscription(null);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen text-white">
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Vaya Component Demo
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore the building blocks of the Vaya family storytelling platform
          </p>
        </motion.div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-10">
          <TabsList className="grid grid-cols-3 w-full max-w-3xl mx-auto bg-gray-800 p-1 rounded-lg">
            <TabsTrigger 
              value="family-tree" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-md"
            >
              <TreeDeciduous className="h-4 w-4 mr-2" />
              Family Tree
            </TabsTrigger>
            <TabsTrigger 
              value="memory-capsules"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-md"
            >
              <Package className="h-4 w-4 mr-2" />
              Memory Capsules
            </TabsTrigger>
            <TabsTrigger 
              value="narra-assistant"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-md"
            >
              <Bot className="h-4 w-4 mr-2" />
              Narra Assistant
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="family-tree" className="space-y-16">
            <AnimatedContainer variant="fade" className="relative">
              <div className="flex items-center mb-8">
                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                  <TreeDeciduous className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Family Tree Components</h2>
                  <p className="text-gray-400">Visual representations of family connections and storytelling progress</p>
                </div>
              </div>
              
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <h3 className="text-2xl font-semibold text-blue-300">Smart Family Tree Builder</h3>
                    <div className="h-px flex-grow bg-gradient-to-r from-blue-500/50 to-transparent ml-4"></div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="md:w-2/3">
                      <p className="text-gray-400 mb-6">
                        Upload spreadsheets or JSON files to automatically generate your family tree, or build it manually by adding each member.
                      </p>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30 p-3 flex gap-3 items-center">
                        <UploadCloud className="h-8 w-8 text-blue-400" />
                        <div>
                          <p className="text-sm font-semibold text-blue-300">Quick Start</p>
                          <p className="text-xs text-gray-400">Upload CSV, JSON or Excel files</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-1 backdrop-blur-sm shadow-xl">
                    <div className="h-[600px] rounded-lg overflow-hidden">
                      <FamilyTreeMain />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 mt-16">
                  <div className="flex items-center">
                    <h3 className="text-2xl font-semibold text-blue-300">Family Member Detail Cards</h3>
                    <div className="h-px flex-grow bg-gradient-to-r from-blue-500/50 to-transparent ml-4"></div>
                  </div>
                  <p className="text-gray-400 mb-6">
                    Detailed cards showing family member information and story progress.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FamilyMemberDetailCard 
                      id="1"
                      name="Grandma Rose"
                      relationship="Grandmother"
                      storyCount={8}
                      totalStoryGoal={10}
                      lastStoryDate="July 15, 2023"
                      upcomingEvent={{
                        title: "Birthday Celebration",
                        date: "October 12, 2023"
                      }}
                      onMessageClick={() => {}}
                      onCallClick={() => {}}
                      onViewStories={() => {}}
                    />
                    
                    <FamilyMemberDetailCard 
                      id="2"
                      name="Uncle Mike"
                      relationship="Uncle"
                      storyCount={3}
                      totalStoryGoal={10}
                      lastStoryDate="March 5, 2023"
                      onMessageClick={() => {}}
                      onCallClick={() => {}}
                      onViewStories={() => {}}
                    />
                    
                    <FamilyMemberDetailCard 
                      id="3"
                      name="Cousin Emma"
                      relationship="Cousin"
                      storyCount={5}
                      totalStoryGoal={10}
                      onMessageClick={() => {}}
                      onCallClick={() => {}}
                      onViewStories={() => {}}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 mt-16">
                  <div className="flex items-center">
                    <h3 className="text-2xl font-semibold text-blue-300">Family Stories</h3>
                    <div className="h-px flex-grow bg-gradient-to-r from-blue-500/50 to-transparent ml-4"></div>
                  </div>
                  <p className="text-gray-400 mb-6">
                    Story cards displaying captured family memories and experiences.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sampleStories.map((story, index) => (
                      <FamilyStoryCard
                        key={index}
                        title={story.title}
                        description={story.description}
                        author={story.author}
                        date={story.date}
                        storyCount={story.storyCount}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4 mt-16">
                  <div className="flex items-center">
                    <h3 className="text-2xl font-semibold text-blue-300">Story Recording Experience</h3>
                    <div className="h-px flex-grow bg-gradient-to-r from-blue-500/50 to-transparent ml-4"></div>
                  </div>
                  <p className="text-gray-400 mb-6">
                    Voice recording interface for capturing family stories.
                  </p>
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-8 shadow-xl">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-full md:w-1/3">
                        <RecordingButton 
                          isRecording={isRecording} 
                          onClick={handleRecordingClick}
                          isProcessing={isProcessing}
                        />
                      </div>
                      <div className="w-full md:w-2/3">
                        <TranscriptionDisplay 
                          transcription={transcription} 
                          isGenerating={isProcessing}
                        />
                        
                        {transcription && (
                          <div className="mt-6 flex justify-end">
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                              <Sparkles className="h-4 w-4 mr-2" />
                              Save Story
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          </TabsContent>
          
          <TabsContent value="memory-capsules" className="space-y-16">
            <AnimatedContainer variant="fade" className="relative">
              <div className="flex items-center mb-8">
                <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                  <Package className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Memory Capsule Components</h2>
                  <p className="text-gray-400">Time capsule components for preserving and sharing memories</p>
                </div>
              </div>
              
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <h3 className="text-2xl font-semibold text-purple-300">Memory Capsule Creator</h3>
                    <div className="h-px flex-grow bg-gradient-to-r from-purple-500/50 to-transparent ml-4"></div>
                  </div>
                  <p className="text-gray-400 mb-6">
                    Interface for creating and configuring memory time capsules.
                  </p>
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 backdrop-blur-sm shadow-xl">
                    <MemoryCapsuleCreator onComplete={(data) => console.log(data)} />
                  </div>
                </div>
                
                <div className="space-y-4 mt-16">
                  <div className="flex items-center">
                    <h3 className="text-2xl font-semibold text-purple-300">Memory Capsule Timeline</h3>
                    <div className="h-px flex-grow bg-gradient-to-r from-purple-500/50 to-transparent ml-4"></div>
                  </div>
                  <p className="text-gray-400 mb-6">
                    Timeline view of memory capsules organized by reveal date.
                  </p>
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 backdrop-blur-sm shadow-xl">
                    <MemoryCapsuleTimeline 
                      onViewCapsule={(id) => console.log(`View capsule ${id}`)}
                      onCreateCapsule={() => console.log("Create new capsule")}
                    />
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          </TabsContent>
          
          <TabsContent value="narra-assistant" className="space-y-16">
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
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center mt-20 pb-12">
          <div className="flex gap-4">
            <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800">
              <MessageSquare className="h-4 w-4 mr-2" />
              Component Documentation
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <ChevronRight className="h-4 w-4 mr-2" />
              Explore All Components
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsDemo;
