
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StoryCard } from "@/components/content/StoryCard";
import { FamilyMemberCard } from "@/components/content/FamilyMemberCard";
import { MemoryCapsuleCard } from "@/components/content/MemoryCapsuleCard";
import { NotificationBanner } from "@/components/content/NotificationBanner";
import { VoiceRecorderButton } from "@/components/input/VoiceRecorderButton";
import { AudioWaveform } from "@/components/input/AudioWaveform";
import { SearchInput } from "@/components/input/SearchInput";
import { TranscriptionInput } from "@/components/input/TranscriptionInput";
import { CheckboxField, RadioGroup, ToggleSwitch } from "@/components/input/FormControls";
import { VayaButton } from "@/components/actions/Button";
import { IconButton } from "@/components/actions/IconButton";
import { ActionMenu } from "@/components/actions/ActionMenu";
import { FloatingActionButton } from "@/components/actions/FloatingActionButton";
import { 
  Play, 
  Pause, 
  Plus, 
  Settings, 
  User, 
  Bell, 
  Heart, 
  Share, 
  Send, 
  Mic, 
  Calendar, 
  Edit, 
  Trash, 
  Download, 
  Archive,
  Copy
} from "lucide-react";

export default function ComponentsShowcase() {
  const [recorderState, setRecorderState] = useState<"idle" | "recording" | "processing">("idle");
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [transcription, setTranscription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [toggleChecked, setToggleChecked] = useState(false);
  
  const handleRecorderClick = () => {
    if (recorderState === "idle") {
      setRecorderState("recording");
    } else if (recorderState === "recording") {
      setRecorderState("processing");
      // Simulate processing
      setTimeout(() => {
        setRecorderState("idle");
      }, 2000);
    }
  };
  
  return (
    <div className="container max-w-7xl py-10">
      <h1 className="text-4xl font-bold mb-10">Vaya Component Library</h1>
      
      <Tabs defaultValue="content" className="mb-10">
        <TabsList className="mb-8">
          <TabsTrigger value="content">Content Containers</TabsTrigger>
          <TabsTrigger value="input">Input Controls</TabsTrigger>
          <TabsTrigger value="actions">Action Components</TabsTrigger>
        </TabsList>
        
        {/* Content Containers */}
        <TabsContent value="content" className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Story Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StoryCard
                id="1"
                title="My First Memory"
                content="This is an audio recording of my earliest childhood memory."
                type="audio"
                audioUrl="/sample.mp3"
                date="2023-05-15"
                author={{ name: "Jay Patel" }}
              />
              
              <StoryCard
                id="2"
                title="Family Vacation 2022"
                content="Our amazing trip to the mountains last summer."
                type="photo"
                imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
                audioUrl="/sample.mp3"
                date="2022-08-10"
                author={{ name: "Maya Patel" }}
              />
              
              <StoryCard
                id="3"
                title="Grandma's Wisdom"
                content="I still remember the day my grandmother told me about her childhood in India. The stories of her village, the festivals they celebrated, and the traditions they upheld have stayed with me all these years. She described the vibrant colors of the markets, the delicious smells of home cooking, and the sense of community that defined her early years."
                type="transcript"
                date="2023-02-20"
                author={{ name: "Rohan Patel" }}
              />
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Family Member Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FamilyMemberCard
                id="1"
                name="Priya Patel"
                relation="Mother"
                bio="Priya loves gardening and teaching her grandchildren about plants and nature."
                onMessage={() => {}}
                onCall={() => {}}
                onToggleLove={() => {}}
              />
              
              <FamilyMemberCard
                id="2"
                name="Raj Patel"
                relation="Father"
                bio="An amazing storyteller who keeps family history alive through his tales."
                isLoved={true}
                onMessage={() => {}}
                onCall={() => {}}
                onToggleLove={() => {}}
              />
              
              <FamilyMemberCard
                id="3"
                name="Ananya Patel"
                relation="Sister"
                bio="Creative and artistic, she captures family moments through her photography."
                onMessage={() => {}}
                onCall={() => {}}
                onToggleLove={() => {}}
              />
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Memory Capsule Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MemoryCapsuleCard
                id="1"
                title="Family Reunion 2025"
                description="A collection of photos, stories, and mementos from our 2023 reunion, to be opened at our next reunion."
                createdAt="2023-07-15"
                unlocksAt="2025-07-15"
                isLocked={true}
                contributors={[
                  { name: "Jay Patel" },
                  { name: "Priya Patel" },
                  { name: "Raj Patel" }
                ]}
                itemCount={15}
                onOpen={() => {}}
              />
              
              <MemoryCapsuleCard
                id="2"
                title="Grandparents' Anniversary"
                description="Memories and wishes collected for their 50th anniversary celebration."
                createdAt="2023-04-10"
                unlocksAt="2023-06-10"
                isLocked={false}
                contributors={[
                  { name: "Maya Patel" },
                  { name: "Arjun Patel" },
                  { name: "Kiran Patel" },
                  { name: "Neha Patel" }
                ]}
                itemCount={8}
                onOpen={() => {}}
              />
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Notification Banners</h2>
            <div className="space-y-4">
              <NotificationBanner
                type="info"
                title="Welcome to Vaya!"
                message="Explore our new features designed to help preserve your family memories."
                action={{
                  label: "Learn More",
                  onClick: () => {},
                }}
              />
              
              <NotificationBanner
                type="success"
                title="Memory saved successfully"
                message="Your story has been added to your family's collection."
              />
              
              <NotificationBanner
                type="warning"
                title="Capsule nearing unlock date"
                message="The 'Childhood Memories' capsule will be available to open in 3 days."
                action={{
                  label: "View Capsule",
                  onClick: () => {},
                }}
              />
              
              <NotificationBanner
                type="error"
                title="Failed to upload recording"
                message="There was an issue with your audio file. Please try again."
                action={{
                  label: "Retry",
                  onClick: () => {},
                }}
              />
            </div>
          </section>
        </TabsContent>
        
        {/* Input Controls */}
        <TabsContent value="input" className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Voice Recording Button</h2>
            <div className="space-y-8">
              <div className="flex items-center space-x-8">
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle>Recording States</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center space-x-6">
                    <div className="text-center">
                      <VoiceRecorderButton 
                        state="idle" 
                        onStart={handleRecorderClick}
                        onStop={handleRecorderClick}
                      />
                      <p className="mt-2 text-sm text-gray-500">Idle</p>
                    </div>
                    
                    <div className="text-center">
                      <VoiceRecorderButton 
                        state="recording" 
                        onStart={() => {}}
                        onStop={() => {}}
                      />
                      <p className="mt-2 text-sm text-gray-500">Recording</p>
                    </div>
                    
                    <div className="text-center">
                      <VoiceRecorderButton 
                        state="processing" 
                        onStart={() => {}}
                        onStop={() => {}}
                      />
                      <p className="mt-2 text-sm text-gray-500">Processing</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="p-6 flex-1">
                  <CardHeader>
                    <CardTitle>Live Demo</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <VoiceRecorderButton 
                      state={recorderState}
                      size="lg"
                      onStart={handleRecorderClick}
                      onStop={handleRecorderClick}
                    />
                    <p className="mt-4 text-gray-500 capitalize">Current state: {recorderState}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Audio Waveform Visualization</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Static Waveform</CardTitle>
                </CardHeader>
                <CardContent>
                  <AudioWaveform />
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Active Waveform</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AudioWaveform isRecording={isRecording} />
                  
                  <div className="flex justify-center">
                    <VayaButton
                      variant="secondary"
                      leftIcon={isRecording ? <Pause /> : <Play />}
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? "Stop" : "Start"} Animation
                    </VayaButton>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Text Input Fields</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Search Input</CardTitle>
                </CardHeader>
                <CardContent>
                  <SearchInput 
                    placeholder="Search memories..." 
                    value={searchValue}
                    onChange={setSearchValue}
                    onSearch={(value) => console.log("Searching for:", value)}
                  />
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Transcription Input</CardTitle>
                </CardHeader>
                <CardContent>
                  <TranscriptionInput 
                    value={transcription}
                    onChange={setTranscription}
                    onRequestVoice={() => setIsRecording(true)}
                    isRecording={isRecording}
                    maxLength={500}
                  />
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Form Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Checkbox</CardTitle>
                </CardHeader>
                <CardContent>
                  <CheckboxField 
                    id="terms" 
                    label="I agree to the terms and conditions" 
                    checked={checked}
                    onCheckedChange={setChecked}
                    description="By checking this box, you agree to our Privacy Policy and Terms of Service."
                  />
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Radio Group</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    name="options"
                    options={[
                      { value: "option1", label: "Public" },
                      { value: "option2", label: "Family Only" },
                      { value: "option3", label: "Private" }
                    ]}
                    value={radioValue}
                    onChange={setRadioValue}
                  />
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Toggle Switch</CardTitle>
                </CardHeader>
                <CardContent>
                  <ToggleSwitch 
                    id="notifications" 
                    label="Enable Notifications" 
                    checked={toggleChecked}
                    onCheckedChange={setToggleChecked}
                    description="Receive alerts about new memories and family events."
                  />
                </CardContent>
              </Card>
            </div>
          </section>
        </TabsContent>
        
        {/* Action Components */}
        <TabsContent value="actions" className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Buttons</h2>
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <VayaButton variant="primary">Primary</VayaButton>
                  <VayaButton variant="secondary">Secondary</VayaButton>
                  <VayaButton variant="tertiary">Tertiary</VayaButton>
                  <VayaButton variant="outline">Outline</VayaButton>
                  <VayaButton variant="ghost">Ghost</VayaButton>
                  <VayaButton variant="destructive">Destructive</VayaButton>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <VayaButton variant="primary" size="sm">Small</VayaButton>
                  <VayaButton variant="primary" size="md">Medium</VayaButton>
                  <VayaButton variant="primary" size="lg">Large</VayaButton>
                  <VayaButton variant="primary" size="xl">Extra Large</VayaButton>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <VayaButton variant="primary" isLoading>Loading</VayaButton>
                  <VayaButton variant="primary" leftIcon={<Play />}>With Left Icon</VayaButton>
                  <VayaButton variant="primary" rightIcon={<Send />}>With Right Icon</VayaButton>
                  <VayaButton variant="primary" disabled>Disabled</VayaButton>
                </div>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Icon Buttons</h2>
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Icon Button Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <IconButton variant="primary" icon={<Plus />} />
                  <IconButton variant="secondary" icon={<Heart />} />
                  <IconButton variant="tertiary" icon={<Share />} />
                  <IconButton variant="outline" icon={<Bell />} />
                  <IconButton variant="ghost" icon={<Settings />} />
                  <IconButton variant="destructive" icon={<Trash />} />
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <IconButton variant="primary" size="sm" icon={<Plus />} />
                  <IconButton variant="primary" size="md" icon={<Plus />} />
                  <IconButton variant="primary" size="lg" icon={<Plus />} />
                  <IconButton variant="primary" size="xl" icon={<Plus />} />
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <IconButton variant="primary" shape="circle" icon={<Plus />} />
                  <IconButton variant="primary" shape="square" icon={<Plus />} />
                  <IconButton variant="primary" shape="rounded" icon={<Plus />} />
                  <IconButton variant="primary" isLoading icon={<Plus />} />
                  <IconButton variant="primary" disabled icon={<Plus />} />
                </div>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Action Menus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Dropdown Menu</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ActionMenu
                    label="Options"
                    items={[
                      { id: "edit", label: "Edit", icon: <Edit /> },
                      { id: "share", label: "Share", icon: <Share /> },
                      { id: "download", label: "Download", icon: <Download /> },
                      { id: "archive", label: "Archive", icon: <Archive /> },
                      { id: "delete", label: "Delete", icon: <Trash />, destructive: true }
                    ]}
                  />
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Minimal Menu</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ActionMenu
                    variant="minimal"
                    items={[
                      { id: "edit", label: "Edit", icon: <Edit /> },
                      { id: "share", label: "Share", icon: <Share /> },
                      { id: "download", label: "Download", icon: <Download /> },
                      { id: "copy", label: "Duplicate", icon: <Copy /> },
                      { id: "delete", label: "Delete", icon: <Trash />, destructive: true }
                    ]}
                    position="bottom"
                  />
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Floating Action Button</h2>
            <Card className="p-6 relative h-64">
              <CardHeader>
                <CardTitle>Floating Action Button Variants</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-full">
                <div className="space-y-4 text-center">
                  <p className="text-gray-500">Floating Action Buttons appear fixed to the corner of the screen</p>
                  <div className="flex justify-center gap-4">
                    <FloatingActionButton
                      variant="primary"
                      icon={<Plus />}
                      className="position-static relative bottom-0 right-0"
                    />
                    <FloatingActionButton
                      variant="secondary"
                      icon={<Mic />}
                      extended
                      label="Record"
                      className="position-static relative bottom-0 right-0"
                    />
                  </div>
                </div>
                
                <FloatingActionButton
                  variant="primary"
                  icon={<Plus />}
                  className="bottom-6 right-6"
                />
              </CardContent>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
