
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audio, model = "whisper-1", language, response_format = "json", temperature = 0.2, noise_filtering = true } = await req.json();

    if (!audio) {
      throw new Error("No audio data provided");
    }

    // Process the base64 audio data
    const binaryData = atob(audio);
    const bytes = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      bytes[i] = binaryData.charCodeAt(i);
    }

    // Create a blob from the binary data
    const blob = new Blob([bytes], { type: 'audio/webm' });

    // Create FormData to send to OpenAI
    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');
    formData.append('model', model);
    
    if (language) {
      formData.append('language', language);
    }
    
    formData.append('response_format', response_format);
    formData.append('temperature', temperature.toString());

    // Call OpenAI API for transcription
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error("OpenAI API key not configured");
    }

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    // Track the transcription activity
    const createClient = (await import("https://esm.sh/@supabase/supabase-js@2.7.1")).createClient;
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    
    if (supabaseUrl && supabaseServiceKey) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
      
      // Extract user ID if available
      let userId = null;
      let anonymousId = null;
      const authorization = req.headers.get('Authorization');
      if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.slice(7);
        const { data: { user } } = await supabaseAdmin.auth.getUser(token);
        if (user) {
          userId = user.id;
        }
      }
      
      // Try to get anonymous ID from headers if user is not authenticated
      if (!userId) {
        anonymousId = req.headers.get('X-Anonymous-ID');
      }
      
      // Log the transcription activity
      await supabaseAdmin.from('user_activities').insert({
        user_id: userId,
        anonymous_id: anonymousId,
        activity_type: 'audio_transcribed',
        metadata: {
          model,
          has_language_specified: !!language,
          response_format,
          audio_duration_approx: (blob.size / 16000).toFixed(2) + 's', // Rough estimate
          noise_filtering
        }
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in transcribe-audio function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
