import { StoryMemoryCard } from "./memory/StoryMemoryCard";
import { PhotoMemoryCard } from "./memory/PhotoMemoryCard";
import { useMemories } from "./memory/useMemories";
import { Memory } from "./memory/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, Info } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CapsulePreview {
  id: string;
  title: string;
  lock_deadline: string;
  reveal_date: string;
}

const MemoryFeed = () => {
  const { data, isLoading } = useMemories();
  const [capsules, setCapsules] = useState<CapsulePreview[]>([]);

  useEffect(() => {
    const fetchCapsules = async () => {
      const { data: capsuleData } = await supabase
        .from('capsule_schedules')
        .select('id, title, lock_deadline, reveal_date')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (capsuleData) {
        setCapsules(capsuleData);
      }
    };

    fetchCapsules();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse text-gray-400">Loading memories...</div>
      </div>
    );
  }

  const memories = data?.pages.flatMap((page) => page.memories) ?? [];

  return (
    <div className="space-y-4 animate-fade-in">
      {capsules.map((capsule) => (
        <Card key={capsule.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Time Capsule Created</h3>
              <p className="text-sm text-gray-500">
                {capsule.title}
              </p>
            </div>
            <Info className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Locks: {format(new Date(capsule.lock_deadline), "MMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Reveals: {format(new Date(capsule.reveal_date), "MMM d, yyyy")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {memories.map((memory: Memory) => (
        memory.type === "story" ? (
          <StoryMemoryCard key={memory.id} memory={memory} />
        ) : (
          <PhotoMemoryCard key={memory.id} memory={memory} />
        )
      ))}
    </div>
  );
};

export default MemoryFeed;