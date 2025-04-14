
import React, { useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Memory, 
  isPhotoMemory, 
  isVideoMemory, 
  isAudioMemory,
  isStoryMemory 
} from '@/components/memory/types';

const fetchMemory = async (id: string): Promise<Memory | null> => {
  // This would normally fetch from an API, using sample data for now
  const sampleMemories = [
    {
      id: "1",
      type: "story",
      content_url: "/path/to/sample-audio.mp3",
      created_at: "2024-03-20T10:00:00Z",
      title: "Abuela's Secret Gallo Pinto Recipe",
      description: "My grandmother shares the story behind our family's traditional Costa Rican breakfast.",
      duration: 180,
    },
    {
      id: "2",
      type: "photo",
      content_url: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      created_at: "2024-03-19T15:30:00Z",
      photo_url: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      caption: "Family trip to Monteverde Cloud Forest - The kids were amazed by the wildlife!",
    },
    {
      id: "3",
      type: "video",
      content_url: "https://example.com/sample-video.mp4",
      created_at: "2024-03-18T09:15:00Z",
      video_url: "https://example.com/sample-video.mp4",
      caption: "Family beach day",
      duration: 120,
    },
    {
      id: "4",
      type: "audio",
      content_url: "/path/to/sample-audio.mp3",
      created_at: "2024-03-17T14:20:00Z",
      audio_url: "/path/to/sample-audio.mp3",
      transcript: "This is a transcript of the audio memory.",
      duration: 240,
    }
  ];
  
  const memory = sampleMemories.find(m => m.id === id);
  return memory as Memory || null;
};

const MemoryPost = () => {
  const { id } = useParams<{ id: string }>();
  const { data: memory, isLoading, error } = useQuery({
    queryKey: ['memory', id],
    queryFn: () => fetchMemory(id || ''),
    enabled: !!id
  });

  // Add Hanuman theme class when the component mounts
  useEffect(() => {
    document.body.classList.add('hanuman-theme');
    return () => {
      document.body.classList.remove('hanuman-theme');
    };
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="hanuman-container py-10">
          <div className="hanuman-card p-8 text-center">
            <div className="animate-pulse">Loading memory...</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !memory) {
    return (
      <MainLayout>
        <div className="hanuman-container py-10">
          <div className="hanuman-card p-8 text-center">
            <h2 className="text-xl text-hanuman-text-primary mb-4">Memory Not Found</h2>
            <p className="text-hanuman-text-secondary">
              We couldn't find the memory you're looking for. It may have been removed or the link is incorrect.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="hanuman-container py-10">
        <div className="hanuman-card p-8">
          {/* Dynamically render based on memory type */}
          {isPhotoMemory(memory) && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-hanuman-text-primary">Photo Memory</h1>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={memory.photo_url || memory.content_url} 
                  alt="Memory" 
                  className="w-full object-cover"
                />
              </div>
              {memory.caption && (
                <p className="text-hanuman-text-primary">{memory.caption}</p>
              )}
              <div className="text-sm text-hanuman-text-secondary">
                Captured on {new Date(memory.created_at).toLocaleDateString()}
              </div>
            </div>
          )}

          {isVideoMemory(memory) && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-hanuman-text-primary">Video Memory</h1>
              <div className="rounded-lg overflow-hidden aspect-video bg-black">
                <video 
                  src={memory.video_url || memory.content_url}
                  controls
                  className="w-full h-full"
                  poster={memory.video_url || memory.content_url}
                >
                  Your browser does not support video playback.
                </video>
              </div>
              {memory.caption && (
                <p className="text-hanuman-text-primary">{memory.caption}</p>
              )}
              <div className="text-sm text-hanuman-text-secondary">
                Recorded on {new Date(memory.created_at).toLocaleDateString()}
              </div>
            </div>
          )}

          {isAudioMemory(memory) && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-hanuman-text-primary">Audio Memory</h1>
              <div className="bg-hanuman-primary/10 p-4 rounded-lg">
                <audio 
                  src={memory.audio_url || memory.content_url}
                  controls
                  className="w-full"
                >
                  Your browser does not support audio playback.
                </audio>
              </div>
              {memory.transcript && (
                <div>
                  <h3 className="text-lg font-medium text-hanuman-text-primary mb-2">Transcript</h3>
                  <p className="text-hanuman-text-primary">{memory.transcript}</p>
                </div>
              )}
              <div className="text-sm text-hanuman-text-secondary">
                Recorded on {new Date(memory.created_at).toLocaleDateString()}
              </div>
            </div>
          )}

          {isStoryMemory(memory) && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-hanuman-text-primary">
                {memory.title || "Story Memory"}
              </h1>
              {memory.description && (
                <p className="text-hanuman-text-primary">{memory.description}</p>
              )}
              <div className="bg-hanuman-primary/10 p-4 rounded-lg">
                <audio 
                  src={memory.content_url}
                  controls
                  className="w-full"
                >
                  Your browser does not support audio playback.
                </audio>
              </div>
              <div className="text-sm text-hanuman-text-secondary">
                Recorded on {new Date(memory.created_at).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MemoryPost;
