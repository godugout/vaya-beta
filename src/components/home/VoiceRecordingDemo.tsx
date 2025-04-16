
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, Square, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const VoiceRecordingDemo = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  // Simulated waveform data points
  const staticWaveform = Array(40).fill(0).map(() => Math.random() * 0.8 + 0.2);
  const [waveform, setWaveform] = useState(staticWaveform);
  
  // Handle recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        // Simulate changing waveform
        setWaveform(prev => prev.map(() => Math.random() * 0.8 + 0.2));
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);
  
  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };
  
  const handleStopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
  };
  
  const handlePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      // Simulate playback ending after recorded time
      setTimeout(() => setIsPlaying(false), recordingTime * 1000);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-2xl border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        {/* Waveform visualization */}
        <div className="h-20 flex items-center justify-center">
          <div className="w-full flex items-center justify-between space-x-0.5">
            {waveform.map((amplitude, index) => (
              <motion.div
                key={index}
                className={`w-1.5 rounded-full ${
                  isRecording || isPlaying
                    ? "bg-autumn"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                style={{
                  height: `${amplitude * 100}%`,
                }}
                animate={{
                  height: (isRecording || isPlaying) 
                    ? `${amplitude * 100}%` 
                    : `${amplitude * 60}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.3,
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Timer display */}
        <div className="text-center text-lg font-medium text-gray-900 dark:text-gray-200">
          {formatTime(recordingTime)}
        </div>
        
        {/* Recording controls */}
        <div className="flex justify-center space-x-4">
          {!hasRecording ? (
            <Button
              className={`rounded-full w-16 h-16 flex items-center justify-center p-0 ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-autumn hover:bg-autumn/90"
              }`}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
            >
              {isRecording ? (
                <Square className="h-6 w-6 text-white" />
              ) : (
                <Mic className={`h-6 w-6 text-white ${isRecording ? "animate-pulse" : ""}`} />
              )}
            </Button>
          ) : (
            <Button
              className="rounded-full w-16 h-16 flex items-center justify-center p-0 bg-water hover:bg-water/90"
              onClick={handlePlayback}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 text-white" />
              ) : (
                <Play className="h-6 w-6 text-white ml-1" />
              )}
            </Button>
          )}
        </div>
        
        {/* Transcription preview */}
        {hasRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-sm text-gray-700 dark:text-gray-300 font-story"
          >
            <p className="italic">
              "I remember my grandmother's kitchen always smelled like cinnamon and fresh bread. Every Sunday, she would teach me the family recipes that had been passed down for generations..."
            </p>
          </motion.div>
        )}
      </div>
    </Card>
  );
};
