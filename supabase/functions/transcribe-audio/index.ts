
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Transcribe audio function invoked');
    
    const requestData = await req.json();
    
    // Check if this is a test request
    if (requestData.test === true) {
      console.log('Test mode: Validating API key');
      const apiKey = Deno.env.get('OPENAI_API_KEY');
      
      if (!apiKey) {
        throw new Error('OpenAI API key not configured. Please add it to the Supabase Edge Function Secrets.')
      }
      
      // Test the OpenAI API connection with a minimal request
      const testResponse = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      
      if (!testResponse.ok) {
        const errorData = await testResponse.json();
        throw new Error(`OpenAI API test failed: ${JSON.stringify(errorData)}`);
      }
      
      console.log('API key validation successful');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "OpenAI API key is valid and connection is working" 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { audio } = requestData;
    
    if (!audio) {
      console.error('Error: No audio data provided');
      throw new Error('No audio data provided')
    }

    console.log(`Received audio data of length: ${audio.length}`);
    
    // Process audio in chunks to prevent memory issues
    const binaryAudio = processBase64Chunks(audio)
    console.log(`Processed binary audio of size: ${binaryAudio.length}`);
    
    const formData = new FormData()
    const blob = new Blob([binaryAudio], { type: 'audio/webm' })
    formData.append('file', blob, 'audio.webm')
    formData.append('model', 'whisper-1')

    console.log('Sending request to OpenAI API');
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!apiKey) {
      console.error('OpenAI API key not found in environment variables');
      throw new Error('OpenAI API key not configured. Please add it to the Supabase Edge Function Secrets.')
    }
    
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${errorText}`);
      throw new Error(`OpenAI API error: ${errorText}`)
    }

    const result = await response.json()
    console.log('Successfully received transcription:', result.text?.substring(0, 30) + '...');

    return new Response(
      JSON.stringify({ text: result.text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Transcription error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: typeof error === 'object' ? JSON.stringify(error) : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
