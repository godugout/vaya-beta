
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Extract the authorization header for user identification
    const authorization = req.headers.get('Authorization');
    
    // Create a Supabase client for the function
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authorization || '' },
        },
      }
    );

    // Parse the request body
    const { activity_type, metadata, anonymous_id } = await req.json();

    if (!activity_type) {
      return new Response(
        JSON.stringify({ error: 'Activity type is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Get the user ID from the auth context if available
    let userId = null;
    if (authorization) {
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (user) {
        userId = user.id;
      }
    }
    
    // Enrich the activity data with additional info
    const enrichedMetadata = {
      ...metadata,
      userAgent: req.headers.get('User-Agent'),
      referer: req.headers.get('Referer'),
      ipAddress: req.headers.get('X-Forwarded-For') || req.headers.get('CF-Connecting-IP')
    };

    // Insert the activity
    const { data, error } = await supabaseClient
      .from('user_activities')
      .insert({
        user_id: userId,
        activity_type,
        metadata: enrichedMetadata,
        anonymous_id: anonymous_id || null
      });

    if (error) {
      console.error('Error logging activity:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to log activity' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('Error in track-activity function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
