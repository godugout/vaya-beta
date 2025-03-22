
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { familyContext, language = 'en', category = null } = await req.json()
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    const openaiKey = Deno.env.get('OPENAI_API_KEY') as string

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Generate a personalized cultural prompt based on the user's family context
    const messages = [
      {
        role: "system",
        content: `You are a cultural expert specializing in South Asian family traditions, particularly those of North Indian and Gujarati heritage. You generate personalized prompt suggestions that help families record and preserve their stories, traditions, and heritage.
        
        When creating prompts:
        1. Focus on topics that are culturally relevant to ${familyContext.culturalIdentity || 'South Asian'} families.
        2. Use culturally appropriate terminology and references.
        3. Create prompts that are respectful, engaging, and sensitive to cultural nuances.
        4. Include specific references to the user's family context when appropriate.
        5. Make prompts accessible to both elders and younger generations.
        
        Respond with ONLY the prompt text - no explanations or additional content.`
      },
      {
        role: "user",
        content: `Generate a culturally sensitive prompt for a family with the following context:
        
        - Cultural Identity: ${familyContext.culturalIdentity || 'South Asian, likely with Gujarati or Hindi heritage'}
        - Ancestral Region: ${familyContext.ancestralRegion || 'Unknown region in India'}
        - Current Location: ${familyContext.currentLocation || 'Unknown'}
        - Primary Language: ${familyContext.primaryLanguage || 'Likely Gujarati, Hindi, or English'}
        - Family Elders: ${familyContext.familyElders?.join(', ') || 'Unknown'}
        - Traditions: ${familyContext.traditions?.join(', ') || 'Traditional South Asian customs'}
        - Hobbies: ${familyContext.hobbies?.join(', ') || 'Unknown'}
        
        ${category ? `The prompt should focus on the category: ${category}` : ''}
        The prompt should be in ${language === 'en' ? 'English' : language === 'es' ? 'Spanish' : language === 'hi' ? 'Hindi' : 'Gujarati'}.
        `
      }
    ]

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 150,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${await response.text()}`)
    }

    const result = await response.json()
    const prompt = result.choices[0].message.content.trim()

    // Optional: Save the generated prompt to the database for future reference
    await supabase
      .from('generated_prompts')
      .insert({
        prompt: prompt,
        language: language,
        category: category,
        family_context_id: familyContext.id || null
      })

    return new Response(
      JSON.stringify({ prompt }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in ai-cultural-prompts function:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
