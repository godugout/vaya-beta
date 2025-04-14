
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, StopCircle, Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RecordStoryPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedTime, setRecordedTime] = useState(0);
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start timer for recording
      setRecordedTime(0);
    }
  };
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  React.useEffect(() => {
    let interval: number | undefined;
    
    if (isRecording) {
      interval = window.setInterval(() => {
        setRecordedTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/" className="mr-2">
          <Button variant="ghost" size="icon">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Record Your Story</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tell us about a childhood memory</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Record a story about a meaningful childhood memory. What made it special?
          </p>
          
          <div className="border-t border-b border-gray-200 py-4 my-4">
            {isRecording ? (
              <div className="text-center">
                <div className="mb-4 text-lg">Recording... {formatTime(recordedTime)}</div>
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full h-16 w-16 p-0 flex items-center justify-center"
                    onClick={toggleRecording}
                  >
                    <StopCircle size={32} className="text-red-600" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4">Tap the microphone to start recording</div>
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full h-16 w-16 p-0 flex items-center justify-center"
                    onClick={toggleRecording}
                  >
                    <Mic size={32} />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <textarea
              placeholder="Or type your story here..."
              className="w-full p-3 border border-gray-300 rounded-md min-h-[100px]"
            ></textarea>
            
            <div className="flex justify-end mt-4">
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Save Story
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6">
        <h3 className="font-medium mb-2">Recording Tips:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
          <li>Find a quiet place with minimal background noise</li>
          <li>Speak clearly and at a normal pace</li>
          <li>Share specific details that make your story unique</li>
          <li>You can pause and resume recording if needed</li>
        </ul>
      </div>
    </div>
  );
};
