
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  Download,
  Image,
  FileAudio,
  FileVideo,
  FileText,
  Filter,
  Upload
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MediaItem {
  id: string;
  title: string;
  description: string | null;
  type: 'image' | 'audio' | 'video' | 'document';
  url: string;
  size: number;
  created_at: string;
  uploaded_by: string;
  family_id: string | null;
  tags: string[];
}

export default function AdminMedia() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaType, setMediaType] = useState<string>("all");

  useEffect(() => {
    async function fetchMedia() {
      setLoading(true);
      try {
        // Fetch photos from Supabase
        const { data: photos, error: photosError } = await supabase
          .from("photos")
          .select(`
            id,
            caption,
            photo_url,
            created_at,
            family_id,
            uploader_id,
            profiles:uploader_id(full_name)
          `);
        
        if (photosError) {
          console.error("Error fetching photos:", photosError);
        }
        
        // Fetch stories from Supabase
        const { data: stories, error: storiesError } = await supabase
          .from("stories")
          .select(`
            id,
            title,
            description,
            audio_url,
            created_at,
            family_id,
            author_id,
            profiles:author_id(full_name)
          `);
        
        if (storiesError) {
          console.error("Error fetching stories:", storiesError);
        }
        
        // Process and combine data
        const processedMedia: MediaItem[] = [];
        
        // Add photos to media items
        if (photos) {
          const processedPhotos = photos.map((photo: any) => ({
            id: photo.id,
            title: photo.caption || 'Untitled Photo',
            description: null,
            type: 'image' as const,
            url: photo.photo_url,
            size: Math.floor(Math.random() * 5000) + 500, // Mock size in KB
            created_at: photo.created_at,
            uploaded_by: photo.profiles?.full_name || 'Unknown User',
            family_id: photo.family_id,
            tags: ['photo', 'memory']
          }));
          
          processedMedia.push(...processedPhotos);
        }
        
        // Add stories to media items
        if (stories) {
          const processedStories = stories.map((story: any) => ({
            id: story.id,
            title: story.title,
            description: story.description,
            type: 'audio' as const,
            url: story.audio_url,
            size: Math.floor(Math.random() * 10000) + 1000, // Mock size in KB
            created_at: story.created_at,
            uploaded_by: story.profiles?.full_name || 'Unknown User',
            family_id: story.family_id,
            tags: ['story', 'audio', 'memory']
          }));
          
          processedMedia.push(...processedStories);
        }
        
        // Add mock videos and documents for demo purposes
        const mockMedia = [
          {
            id: 'mock-video-1',
            title: 'Family Vacation 2022',
            description: 'Summer trip to Costa Rica',
            type: 'video' as const,
            url: 'https://example.com/videos/family-vacation.mp4',
            size: 25600,
            created_at: '2022-07-15T14:22:00Z',
            uploaded_by: 'Maria Garcia',
            family_id: null,
            tags: ['vacation', 'video', 'summer']
          },
          {
            id: 'mock-video-2',
            title: 'Wedding Anniversary',
            description: '50 years celebration',
            type: 'video' as const,
            url: 'https://example.com/videos/anniversary.mp4',
            size: 42500,
            created_at: '2022-02-25T10:15:00Z',
            uploaded_by: 'Carlos Rodriguez',
            family_id: null,
            tags: ['anniversary', 'celebration', 'family']
          },
          {
            id: 'mock-doc-1',
            title: 'Family Recipe Book',
            description: 'Collection of traditional recipes',
            type: 'document' as const,
            url: 'https://example.com/documents/recipes.pdf',
            size: 3200,
            created_at: '2022-04-10T08:30:00Z',
            uploaded_by: 'Elena Martinez',
            family_id: null,
            tags: ['recipes', 'tradition', 'cookbook']
          },
          {
            id: 'mock-doc-2',
            title: 'Family History',
            description: 'Documented history from 1900-2000',
            type: 'document' as const,
            url: 'https://example.com/documents/history.pdf',
            size: 8700,
            created_at: '2021-11-05T16:40:00Z',
            uploaded_by: 'Jose Gonzalez',
            family_id: null,
            tags: ['history', 'genealogy', 'documentation']
          }
        ];
        
        processedMedia.push(...mockMedia);
        
        // Sort by creation date (newest first)
        processedMedia.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        
        setMediaItems(processedMedia);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, []);

  const filteredMedia = mediaItems.filter(item => {
    // Filter by type if not "all"
    if (mediaType !== "all" && item.type !== mediaType) {
      return false;
    }
    
    // Filter by search query
    return (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <AdminLayout title="Media Library">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Media Files</CardTitle>
              <CardDescription>
                Manage all media assets across the platform
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Media
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Bulk Upload
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setMediaType} className="mb-6">
            <TabsList>
              <TabsTrigger value="all" className="flex items-center gap-2">
                All Media
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Images
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex items-center gap-2">
                <FileAudio className="h-4 w-4" />
                Audio
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <FileVideo className="h-4 w-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="document" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="flex flex-col items-center">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
                <div className="mt-4 text-sm text-muted-foreground">Loading media files...</div>
              </div>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground">No media files found</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <MediaCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <MediaStats mediaItems={mediaItems} />
    </AdminLayout>
  );
}

function MediaCard({ item }: { item: MediaItem }) {
  const getIconByType = () => {
    switch (item.type) {
      case 'image': return <Image className="h-6 w-6" />;
      case 'audio': return <FileAudio className="h-6 w-6" />;
      case 'video': return <FileVideo className="h-6 w-6" />;
      case 'document': return <FileText className="h-6 w-6" />;
      default: return <Image className="h-6 w-6" />;
    }
  };
  
  const getBackgroundByType = () => {
    switch (item.type) {
      case 'image': return 'bg-blue-100 dark:bg-blue-900';
      case 'audio': return 'bg-green-100 dark:bg-green-900';
      case 'video': return 'bg-purple-100 dark:bg-purple-900';
      case 'document': return 'bg-amber-100 dark:bg-amber-900';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  };
  
  const formatSize = (sizeInKb: number) => {
    if (sizeInKb < 1000) {
      return `${sizeInKb} KB`;
    } else {
      return `${(sizeInKb / 1000).toFixed(1)} MB`;
    }
  };
  
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square relative overflow-hidden">
        {item.type === 'image' ? (
          <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${getBackgroundByType()}`}>
            <div className="text-foreground">{getIconByType()}</div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
            <Download className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 mr-2">
            <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground">
              {new Date(item.created_at).toLocaleDateString()} · {formatSize(item.size)}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {item.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs py-0 h-5">
              {tag}
            </Badge>
          ))}
          {item.tags.length > 3 && (
            <Badge variant="outline" className="text-xs py-0 h-5">
              +{item.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function MediaStats({ mediaItems }: { mediaItems: MediaItem[] }) {
  const totalSize = mediaItems.reduce((sum, item) => sum + item.size, 0);
  
  const countByType = {
    image: mediaItems.filter(item => item.type === 'image').length,
    audio: mediaItems.filter(item => item.type === 'audio').length,
    video: mediaItems.filter(item => item.type === 'video').length,
    document: mediaItems.filter(item => item.type === 'document').length
  };
  
  const formatTotalSize = (sizeInKb: number) => {
    if (sizeInKb < 1000) {
      return `${sizeInKb} KB`;
    } else if (sizeInKb < 1000000) {
      return `${(sizeInKb / 1000).toFixed(1)} MB`;
    } else {
      return `${(sizeInKb / 1000000).toFixed(1)} GB`;
    }
  };
  
  const statsItems = [
    { label: "Total Files", value: mediaItems.length, icon: FileText },
    { label: "Images", value: countByType.image, icon: Image },
    { label: "Audio Files", value: countByType.audio, icon: FileAudio },
    { label: "Videos", value: countByType.video, icon: FileVideo },
    { label: "Documents", value: countByType.document, icon: FileText },
    { label: "Total Size", value: formatTotalSize(totalSize), icon: Download },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
      {statsItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Icon className="h-4 w-4 mr-2 text-muted-foreground" />
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
