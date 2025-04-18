
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useTestTranscription = () => {
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testResults, setTestResults] = useState<{ success: boolean; message: string } | null>(null);
  const { toast } = useToast();

  // Function to test if the OpenAI API key is configured correctly
  const testOpenAIConnection = async () => {
    setIsRunningTest(true);
    setTestResults(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: { test: true }
      });
      
      if (error) {
        throw new Error(`Function error: ${error.message}`);
      }
      
      if (data.success) {
        setTestResults({ 
          success: true, 
          message: "Connection to OpenAI API is working properly!" 
        });
        toast({
          title: "API Connection Successful",
          description: "Your OpenAI API key is valid and working correctly.",
        });
      } else {
        throw new Error(data.message || "Unknown error testing API connection");
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error("API test error:", errorMessage);
      
      setTestResults({ 
        success: false, 
        message: errorMessage
      });
      
      toast({
        variant: "destructive",
        title: "API Connection Failed",
        description: errorMessage,
      });
    } finally {
      setIsRunningTest(false);
    }
  };

  return {
    testOpenAIConnection,
    isRunningTest,
    testResults
  };
};
