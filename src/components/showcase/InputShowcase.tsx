
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoiceRecorderButton } from "@/components/input/VoiceRecorderButton";
import { AudioWaveform } from "@/components/input/AudioWaveform";
import { SearchInput } from "@/components/input/SearchInput";
import { TranscriptionInput } from "@/components/input/TranscriptionInput";
import { CheckboxField, RadioGroup, ToggleSwitch } from "@/components/input/FormControls";
import { VayaButton } from "@/components/actions/Button";
import { Pause, Play } from "lucide-react";

export const InputShowcase = () => {
  const [recorderState, setRecorderState] = useState<"idle" | "recording" | "processing">("idle");
  const [isRecording, setIsRecording] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [transcription, setTranscription] = useState("");
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
    <div className="space-y-10">
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
    </div>
  );
};
