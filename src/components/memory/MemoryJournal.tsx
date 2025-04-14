
import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Mic, Image, Video, Upload, Play } from 'lucide-react';

interface MemoryJournalProps {
  question: string;
  onBack: () => void;
  onNext: () => void;
}

export const MemoryJournal: React.FC<MemoryJournalProps> = ({ 
  question = "What's your earliest childhood memory?",
  onBack,
  onNext
}) => {
  const [hasRecording, setHasRecording] = useState(false);
  const [showResponseOptions, setShowResponseOptions] = useState(false);
  
  const handleRecord = () => {
    // Simulate recording functionality
    setHasRecording(true);
  };
  
  const handleAddResponse = () => {
    setShowResponseOptions(!showResponseOptions);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="aida-memory-header">
        <button onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div className="aida-memory-title">Memory Journal</div>
        <div className="w-5"></div> {/* Empty div for alignment */}
      </div>
      
      <div className="p-4 border-b border-[#EEEEEE]">
        <div className="text-sm text-[#8A898C]">Today's Question</div>
        <h2 className="text-xl font-medium mt-1">{question}</h2>
      </div>
      
      {!hasRecording ? (
        <div className="p-4 flex-1">
          <button 
            className="aida-recorder-button"
            onClick={handleRecord}
          >
            <Mic className="mr-2" size={20} />
            Record Voice Answer
          </button>
          
          <div className="flex justify-around mt-8">
            <button className="text-center">
              <div className="w-10 h-10 flex items-center justify-center mx-auto border border-[#EEEEEE] rounded-md">
                <Image size={20} />
              </div>
              <div className="text-xs mt-1">Photo</div>
            </button>
            
            <button className="text-center">
              <div className="w-10 h-10 flex items-center justify-center mx-auto border border-[#EEEEEE] rounded-md">
                <Video size={20} />
              </div>
              <div className="text-xs mt-1">Video</div>
            </button>
            
            <button className="text-center">
              <div className="w-10 h-10 flex items-center justify-center mx-auto border border-[#EEEEEE] rounded-md">
                <Upload size={20} />
              </div>
              <div className="text-xs mt-1">Upload</div>
            </button>
          </div>
          
          <div className="mt-8 text-xs text-[#8A898C] text-center">
            <p>Your responses will be saved privately to be shared with people you choose later.</p>
          </div>
        </div>
      ) : (
        <div className="p-4 flex-1">
          <div className="border border-[#EEEEEE] rounded-md p-3 mb-4">
            <div className="flex items-center">
              <Play size={16} className="text-black mr-2" />
              <div className="h-1 bg-gray-200 flex-1 rounded-full">
                <div className="h-1 bg-black rounded-full w-3/5"></div>
              </div>
              <div className="text-xs ml-2">2:45</div>
            </div>
          </div>
          
          <div className="text-xs text-[#8A898C] mb-4">
            Your Response
          </div>
          
          <div className="border border-[#EEEEEE] rounded-md p-3 mb-4">
            <p className="text-sm">
              "I think the earliest memory I have is from when I was about 3 years old. We had this big tree in our backyard, and I remember climbing it with my dad helping me reach the first branch..."
            </p>
          </div>
          
          <div className="border-t border-b border-[#EEEEEE] py-4 my-4">
            <div className="text-xs text-[#8A898C] mb-2">
              Uploaded Files
            </div>
            
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center">
                <Image size={16} className="mr-2" />
                <span className="text-sm">childhood-tree.jpg</span>
              </div>
              <ChevronRight size={16} />
            </div>
          </div>
          
          {showResponseOptions ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="aida-response-option">
                <div className="mb-2">
                  <Mic size={24} />
                </div>
                <div className="text-xs">Voice</div>
              </div>
              
              <div className="aida-response-option">
                <div className="mb-2">
                  <Image size={24} />
                </div>
                <div className="text-xs">Text</div>
              </div>
              
              <div className="aida-response-option">
                <div className="mb-2">
                  <Video size={24} />
                </div>
                <div className="text-xs">Video</div>
              </div>
              
              <div className="aida-response-option">
                <div className="mb-2">
                  <Upload size={24} />
                </div>
                <div className="text-xs">Upload</div>
              </div>
            </div>
          ) : (
            <button 
              className="text-black border border-black rounded-md w-full py-2 flex items-center justify-center"
              onClick={handleAddResponse}
            >
              + Add Another Response
            </button>
          )}
        </div>
      )}
      
      <div className="p-4 border-t border-[#EEEEEE] flex justify-between">
        <button 
          className="px-4 py-2 border border-black rounded-md"
          onClick={onBack}
        >
          Previous
        </button>
        
        <button 
          className="px-4 py-2 bg-black text-white rounded-md"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
