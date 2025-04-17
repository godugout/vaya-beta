
import { useState, useRef, useEffect } from "react";
import { Pencil, Check, X, Volume2, User, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TranscriptionSegment, TranscriptionResult } from "@/hooks/useMultilingualTranscription";

interface TranscriptionEditorProps {
  transcription: TranscriptionResult | null;
  audioBlob?: Blob | null;
  onSegmentEdit?: (index: number, text: string) => void;
  onSpeakerNameChange?: (speakerId: string, name: string) => void;
  className?: string;
  compact?: boolean;
}

export function TranscriptionEditor({
  transcription,
  audioBlob,
  onSegmentEdit,
  onSpeakerNameChange,
  className,
  compact = false
}: TranscriptionEditorProps) {
  const [editingSegment, setEditingSegment] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [playingSegment, setPlayingSegment] = useState<number | null>(null);
  const [editingSpeaker, setEditingSpeaker] = useState<string | null>(null);
  const [speakerName, setSpeakerName] = useState("");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const editInputRef = useRef<HTMLInputElement | null>(null);
  const speakerInputRef = useRef<HTMLInputElement | null>(null);
  
  // Set up audio element if audioBlob is provided
  useEffect(() => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(audioUrl);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          URL.revokeObjectURL(audioUrl);
        }
      };
    }
  }, [audioBlob]);
  
  // Focus input when editing starts
  useEffect(() => {
    if (editingSegment !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
    
    if (editingSpeaker !== null && speakerInputRef.current) {
      speakerInputRef.current.focus();
    }
  }, [editingSegment, editingSpeaker]);
  
  if (!transcription) return null;
  
  const { segments, metadata, language } = transcription;
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleEditStart = (index: number) => {
    setEditingSegment(index);
    setEditText(segments[index].text);
  };
  
  const handleEditSave = () => {
    if (editingSegment !== null && onSegmentEdit) {
      onSegmentEdit(editingSegment, editText);
    }
    setEditingSegment(null);
  };
  
  const handleEditCancel = () => {
    setEditingSegment(null);
  };
  
  const handleSpeakerEditStart = (speakerId: string, name?: string) => {
    setEditingSpeaker(speakerId);
    setSpeakerName(name || `Speaker ${speakerId}`);
  };
  
  const handleSpeakerEditSave = () => {
    if (editingSpeaker !== null && onSpeakerNameChange) {
      onSpeakerNameChange(editingSpeaker, speakerName);
    }
    setEditingSpeaker(null);
  };
  
  const handleSpeakerEditCancel = () => {
    setEditingSpeaker(null);
  };
  
  const playSegmentAudio = (index: number) => {
    if (!audioRef.current || !segments[index]) return;
    
    const { start, end } = segments[index];
    
    audioRef.current.currentTime = start;
    audioRef.current.play();
    setPlayingSegment(index);
    
    // Stop playing when segment ends
    const checkTime = () => {
      if (audioRef.current && audioRef.current.currentTime >= end) {
        audioRef.current.pause();
        setPlayingSegment(null);
        audioRef.current.removeEventListener('timeupdate', checkTime);
      }
    };
    
    audioRef.current.addEventListener('timeupdate', checkTime);
    audioRef.current.addEventListener('ended', () => setPlayingSegment(null), { once: true });
  };
  
  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.9) {
      return <Badge className="bg-green-100 text-green-800">High</Badge>;
    } else if (confidence >= 0.7) {
      return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Low</Badge>;
    }
  };
  
  const getSpeakerColor = (speakerId?: string) => {
    if (!speakerId) return "bg-gray-200";
    
    // Generate consistent colors based on speakerId
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-amber-100 text-amber-800",
      "bg-pink-100 text-pink-800"
    ];
    
    const index = parseInt(speakerId) % colors.length;
    return colors[index];
  };
  
  const getLanguageName = (code: string) => {
    const languages: Record<string, string> = {
      'en': 'English',
      'es': 'Spanish',
      'hi': 'Hindi',
      'gu': 'Gujarati',
      'auto': 'Auto-detected'
    };
    return languages[code] || code;
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      {/* Transcription metadata */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline">{getLanguageName(language)}</Badge>
        <Badge variant="outline">{formatTime(metadata.duration)} duration</Badge>
        <Badge variant="outline">
          {metadata.speakers.length} speaker{metadata.speakers.length !== 1 ? 's' : ''}
        </Badge>
        <Badge variant="outline" className={metadata.confidence >= 0.8 ? "bg-green-50" : "bg-yellow-50"}>
          {Math.round(metadata.confidence * 100)}% overall confidence
        </Badge>
      </div>

      {/* Segments display */}
      <div className="space-y-2">
        {segments.map((segment, index) => (
          <Card 
            key={index}
            className={cn(
              "p-3 relative transition-all",
              segment.confidence < 0.7 && "border-yellow-300 bg-yellow-50",
              segment.isEdited && "border-green-300",
              compact ? "text-sm" : ""
            )}
          >
            <div className="flex gap-2 items-start">
              {/* Speaker badge */}
              {editingSpeaker === segment.speakerId ? (
                <div className="flex gap-1 items-center">
                  <Input
                    ref={speakerInputRef}
                    value={speakerName}
                    onChange={(e) => setSpeakerName(e.target.value)}
                    className="h-6 w-28 text-xs py-0"
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-5 w-5"
                    onClick={handleSpeakerEditSave}
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-5 w-5"
                    onClick={handleSpeakerEditCancel}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <Badge 
                  className={cn("cursor-pointer", getSpeakerColor(segment.speakerId))}
                  onClick={() => segment.speakerId && handleSpeakerEditStart(segment.speakerId, segment.speakerName)}
                >
                  <User className="h-3 w-3 mr-1" />
                  {segment.speakerName || `Speaker ${segment.speakerId || '?'}`}
                </Badge>
              )}
              
              {/* Timestamp */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="cursor-pointer">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(segment.start)}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>From {formatTime(segment.start)} to {formatTime(segment.end)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {/* Confidence indicator */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help">
                      {getConfidenceBadge(segment.confidence)}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{Math.round(segment.confidence * 100)}% confidence</p>
                    {segment.confidence < 0.7 && (
                      <p className="text-xs text-red-500">This segment may need correction</p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {/* Play button */}
              {audioBlob && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => playSegmentAudio(index)}
                  disabled={playingSegment !== null}
                >
                  <Volume2 className="h-3.5 w-3.5" />
                </Button>
              )}
              
              {/* Low confidence warning */}
              {segment.confidence < 0.7 && !compact && (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
            </div>
            
            {/* Text content */}
            <div className={cn("mt-1.5", compact ? "pl-0" : "pl-1")}>
              {editingSegment === index ? (
                <div className="flex gap-2 items-center">
                  <Input
                    ref={editInputRef}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleEditSave}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleEditCancel}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex justify-between gap-4 items-start">
                  <p className={cn(
                    "transition-colors",
                    segment.isEdited && "text-green-800",
                    segment.confidence < 0.7 && !segment.isEdited && "text-yellow-800"
                  )}>
                    {segment.text}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 flex-shrink-0"
                    onClick={() => handleEditStart(index)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
            
            {/* Playing indicator */}
            {playingSegment === index && (
              <div className="absolute top-0 left-0 w-full h-full bg-blue-50/30 border border-blue-200 rounded-lg pointer-events-none" />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
