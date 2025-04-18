
import { useState } from "react";
import { VoiceStoryRecorder } from "./VoiceStoryRecorder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const ShareStories = () => {
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Card className="border border-slate-200 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="text-gray-900 font-outfit">Family Stories</CardTitle>
      </CardHeader>
      <CardContent>
        <VoiceStoryRecorder onSuccess={handleSuccess} />
      </CardContent>
    </Card>
  );
};

export default ShareStories;
