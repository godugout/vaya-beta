
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Process base64 in chunks to prevent memory issues
function processBase64Chunks(base64String: string, chunkSize = 32768) {
  const chunks: Uint8Array[] = [];
  let position = 0;
  
  while (position < base64String.length) {
    const chunk = base64String.slice(position, position + chunkSize);
    const binaryChunk = atob(chunk);
    const bytes = new Uint8Array(binaryChunk.length);
    
    for (let i = 0; i < binaryChunk.length; i++) {
      bytes[i] = binaryChunk.charCodeAt(i);
    }
    
    chunks.push(bytes);
    position += chunkSize;
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

// Function to get optimal API parameters based on language
function getLanguageParams(languageCode: string) {
  switch(languageCode) {
    case 'en':
      return { model: 'whisper-1', language: 'en' };
    case 'es':
      return { model: 'whisper-1', language: 'es' };
    case 'hi':
      return { model: 'whisper-1', language: 'hi' };
    case 'gu':
      return { model: 'whisper-1', language: 'gu' };
    default:
      return { model: 'whisper-1' }; // Default to auto-detection
  }
}

// Handle speaker identification
function identifySpeakers(segments: any[], maxSpeakers: number = 4) {
  if (!segments || segments.length === 0) return segments;
  
  // This is a simplified version. In a production app, you'd use a more 
  // sophisticated speaker diarization algorithm or API
  
  // Step 1: Create embeddings (simulated here)
  const speakerFeatures: Record<number, number[]> = {};
  
  segments.forEach((segment, index) => {
    // In real implementation, would extract audio features
    // For now, just use start time and average pitch as simple features
    speakerFeatures[index] = [
      segment.start,
      segment.end - segment.start, // duration
      Math.random() * 100 // simulate pitch
    ];
  });
  
  // Step 2: Simple clustering
  const speakers: Record<number, number> = {}; // segment index to speaker ID
  let currentSpeakerId = 1;
  
  // Assign first segment to first speaker
  speakers[0] = currentSpeakerId;
  
  // For each remaining segment, check if it's similar to existing speakers
  for (let i = 1; i < segments.length; i++) {
    let assignedSpeaker = false;
    
    // Compare with all previous segments that have speakers assigned
    for (let j = 0; j < i; j++) {
      const distance = Math.abs(speakerFeatures[i][2] - speakerFeatures[j][2]);
      
      // If features are similar and we haven't exceeded max speakers
      if (distance < 20 && speakers[j] <= maxSpeakers) {
        speakers[i] = speakers[j];
        assignedSpeaker = true;
        break;
      }
    }
    
    // If no existing speaker matches and we haven't reached max speakers
    if (!assignedSpeaker && currentSpeakerId < maxSpeakers) {
      currentSpeakerId++;
      speakers[i] = currentSpeakerId;
    } 
    // If we've reached max speakers, assign to closest
    else if (!assignedSpeaker) {
      // Find closest speaker
      let closestSpeaker = 1;
      let minDistance = Number.MAX_VALUE;
      
      for (let j = 0; j < i; j++) {
        const distance = Math.abs(speakerFeatures[i][2] - speakerFeatures[j][2]);
        if (distance < minDistance) {
          minDistance = distance;
          closestSpeaker = speakers[j];
        }
      }
      
      speakers[i] = closestSpeaker;
    }
  }
  
  // Add speaker IDs to segments
  return segments.map((segment, index) => ({
    ...segment,
    speaker_id: speakers[index].toString()
  }));
}

// Artificial Intelligence enhancement for transcription
async function enhanceTranscription(segments: any[], language: string) {
  // In a real implementation, you would call an AI service like OpenAI to improve the transcription
  // For now, we'll just simulate some improvements
  
  const enhancedSegments = segments.map(segment => {
    // Simulate improved text with better punctuation, etc.
    let enhancedText = segment.text;
    
    // Simulate fixing common transcription errors
    if (language === 'en') {
      enhancedText = enhancedText
        .replace(/(\w+)(?= \1)/, '') // Remove repetitions
        .replace(/\bi\b/g, 'I') // Capitalize "I"
        .replace(/(?<!\.)$/, '.'); // Add period if missing
    }
    
    return {
      ...segment,
      text: enhancedText,
      // Slightly increase confidence after AI enhancement
      confidence: Math.min(segment.confidence * 1.1, 1.0)
    };
  });
  
  return enhancedSegments;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const {
      audio,
      language = 'auto', 
      speaker_identification = true, 
      generate_timestamps = true,
      max_speakers = 4,
      enhance_with_ai = true
    } = await req.json();
    
    if (!audio) {
      throw new Error('No audio data provided');
    }

    console.log(`Processing transcription request: lang=${language}, speakers=${speaker_identification}, timestamps=${generate_timestamps}`);
    
    // Process audio in chunks
    const binaryAudio = processBase64Chunks(audio);
    
    // Get appropriate parameters for the selected language
    const langParams = getLanguageParams(language);
    
    // Prepare form data for OpenAI Whisper API
    const formData = new FormData();
    const blob = new Blob([binaryAudio], { type: 'audio/webm' });
    formData.append('file', blob, 'audio.webm');
    formData.append('model', langParams.model);
    
    if (langParams.language) {
      formData.append('language', langParams.language);
    }
    
    // Add parameters for detailed response
    formData.append('response_format', 'verbose_json');
    formData.append('timestamp_granularities', generate_timestamps ? '["word", "segment"]' : '["segment"]');
    
    // Get OpenAI API key from environment variables
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Send to OpenAI
    console.log('Sending to OpenAI Whisper API');
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      console.error(`OpenAI API error: ${await response.text()}`);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    // Process the result
    const result = await response.json();
    console.log('Received response from OpenAI Whisper API');
    
    // Extract segments and process them
    let segments = result.segments.map((segment: any) => ({
      text: segment.text,
      start: segment.start,
      end: segment.end,
      confidence: segment.confidence || 0.7 // Default if not provided
    }));
    
    // Add speaker identification if requested
    if (speaker_identification) {
      console.log('Adding speaker identification');
      segments = identifySpeakers(segments, max_speakers);
    }
    
    // Enhance transcription with AI if requested
    if (enhance_with_ai) {
      console.log('Enhancing transcription with AI');
      segments = await enhanceTranscription(segments, language);
    }
    
    // Construct the final response
    const detectedLanguage = result.language || language;
    const fullText = segments.map((segment: any) => segment.text).join(' ');
    
    const response_data = {
      segments,
      language: detectedLanguage,
      full_text: fullText,
      metadata: {
        duration: result.duration || segments[segments.length - 1]?.end || 0,
        speakers: speaker_identification ? 
          [...new Set(segments.map((s: any) => s.speaker_id))]
            .map(id => ({ id })) : 
          [],
        confidence: segments.reduce((sum: number, s: any) => sum + s.confidence, 0) / segments.length
      }
    };

    return new Response(
      JSON.stringify(response_data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in advanced-transcribe function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: Deno.env.get('NODE_ENV') === 'development' ? error.stack : undefined
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
