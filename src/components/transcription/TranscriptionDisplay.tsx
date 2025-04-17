
import { useState } from "react";
import { User, Clock, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TranscriptionResult } from "@/hooks/useMultilingualTranscription";

interface TranscriptionDisplayProps {
  transcription: TranscriptionResult | null;
  isGenerating?: boolean;
  showDetails?: boolean;
  className?: string;
}

export function TranscriptionDisplay({ 
  transcription, 
  isGenerating = false,
  showDetails = false,
  className 
}: TranscriptionDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(showDetails);
  
  if (!transcription && !isGenerating) return null;
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            Transcription
            {transcription && (
              <Badge variant="outline">
                {getLanguageName(transcription.language)}
              </Badge>
            )}
          </CardTitle>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {isGenerating ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : transcription ? (
          <div className="space-y-4">
            {!isExpanded ? (
              <p className="text-gray-700 whitespace-pre-line">
                {transcription.fullText}
              </p>
            ) : (
              <div className="space-y-2">
                {transcription.segments.map((segment, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-2 border rounded-md",
                      segment.confidence < 0.7 && "border-yellow-300 bg-yellow-50",
                      segment.isEdited && "border-green-300"
                    )}
                  >
                    <div className="flex flex-wrap gap-1.5 mb-1">
                      {segment.speakerId && (
                        <Badge className={getSpeakerColor(segment.speakerId)}>
                          <User className="h-3 w-3 mr-1" />
                          {segment.speakerName || `Speaker ${segment.speakerId}`}
                        </Badge>
                      )}
                      
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(segment.start)}
                      </Badge>
                      
                      {segment.confidence < 0.7 && (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Low confidence
                        </Badge>
                      )}
                    </div>
                    
                    <p className={cn(
                      "text-sm",
                      segment.confidence < 0.7 && !segment.isEdited && "text-yellow-800"
                    )}>
                      {segment.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
