
-- Create the emotion tag table for stories
CREATE TABLE IF NOT EXISTS public.story_emotion_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  emotion TEXT NOT NULL CHECK (emotion IN ('joy', 'sadness', 'nostalgia', 'excitement', 'reverence')),
  confidence FLOAT NOT NULL DEFAULT 0.5 CHECK (confidence BETWEEN 0.0 AND 1.0),
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Each emotion can only appear once per story
  UNIQUE(story_id, emotion)
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_story_emotion_tags_story_id ON public.story_emotion_tags(story_id);

-- Add index for primary emotions
CREATE INDEX IF NOT EXISTS idx_story_emotion_tags_primary ON public.story_emotion_tags(story_id, is_primary);

-- Set RLS policies to allow access to emotion tags
ALTER TABLE public.story_emotion_tags ENABLE ROW LEVEL SECURITY;

-- Anyone can read emotion tags
CREATE POLICY "Anyone can read story emotion tags"
  ON public.story_emotion_tags
  FOR SELECT
  USING (true);

-- Only authenticated users can insert or update emotion tags
CREATE POLICY "Authenticated users can insert emotion tags"
  ON public.story_emotion_tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update emotion tags"
  ON public.story_emotion_tags
  FOR UPDATE
  TO authenticated
  USING (true);

-- Add a trigger to ensure only one primary emotion per story
CREATE OR REPLACE FUNCTION public.ensure_single_primary_emotion()
RETURNS TRIGGER AS $$
BEGIN
  -- If this is being set as the primary emotion, unset any other primary emotion for this story
  IF NEW.is_primary = true THEN
    UPDATE public.story_emotion_tags
    SET is_primary = false
    WHERE story_id = NEW.story_id
      AND id != NEW.id
      AND is_primary = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_ensure_single_primary_emotion
  BEFORE INSERT OR UPDATE ON public.story_emotion_tags
  FOR EACH ROW
  EXECUTE FUNCTION public.ensure_single_primary_emotion();
