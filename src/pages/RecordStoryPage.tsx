
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, StopCircle, Send, ArrowLeft, Save } from 'lucide-react';
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
        <h1 className="text-xl font-medium">Tell your story</h1>
      </div>
      
      <div className="border border-[#EEEEEE] rounded-lg p-6">
        <img 
          src="/lovable-uploads/f0ede801-068f-43a9-85ba-16652b3ca7a8.png"
          alt="Placeholder" 
          className="w-16 h-16 mx-auto mb-4 opacity-50"
        />
        
        <p className="text-center mb-6">
          Jimmy would love to hear your story
        </p>
        
        <div className="border-t border-b border-[#EEEEEE] py-6 my-4">
          {isRecording ? (
            <div className="text-center">
              <div className="mb-4 text-lg">Recording... {formatTime(recordedTime)}</div>
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full h-14 w-14 p-0 flex items-center justify-center"
                  onClick={toggleRecording}
                >
                  <StopCircle size={28} className="text-red-600" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-4">Tap to start recording</div>
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full h-14 w-14 p-0 flex items-center justify-center"
                  onClick={toggleRecording}
                >
                  <Mic size={28} />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <button 
            className="w-full py-3 bg-black text-white rounded-md"
          >
            Tell your story
          </button>
          
          <button 
            className="w-full py-3 border border-[#EEEEEE] rounded-md text-[#8A898C]"
          >
            Save for later
          </button>
        </div>
      </div>
    </div>
  );
};
