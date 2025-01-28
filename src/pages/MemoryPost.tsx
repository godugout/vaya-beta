import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, MessageSquare, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoryMemoryCard } from "@/components/memory/StoryMemoryCard";
import { PhotoMemoryCard } from "@/components/memory/PhotoMemoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Memory } from "@/components/memory/types";

const MemoryPost = () => {
  const { id } = useParams();

  const { data: memory, isLoading } = useQuery({
    queryKey: ["memory", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("memories")
        .select(`
          *,
          uploaded_by (
            full_name,
            avatar_url
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Memory;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white sticky top-16 z-30">
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center">
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1400px] mx-auto">
            <div className="lg:col-span-8">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
            <div className="hidden lg:block lg:col-span-4">
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!memory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Memory not found</h1>
          <p className="text-gray-600 mb-4">This memory might have been removed or you don't have access to it.</p>
          <Link to="/memory-lane">
            <Button variant="outline">Return to Memory Lane</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Primary Navigation */}
      <div className="border-b bg-white sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/memory-lane"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Memory Lane
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-900"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-900"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-900"
              >
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1400px] mx-auto">
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            {memory.type === "story" ? (
              <StoryMemoryCard memory={memory} />
            ) : (
              <PhotoMemoryCard memory={memory} />
            )}
          </div>
          
          {/* Sidebar Column */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-40">
              <h2 className="text-lg font-semibold mb-4">Memory Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-gray-900">
                    {new Date(memory.created_at).toLocaleDateString()}
                  </p>
                </div>
                {memory.tags && memory.tags.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500">Tags</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {memory.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryPost;