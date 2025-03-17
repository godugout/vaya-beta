
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MediaGallery } from '@/components/media/MediaGallery';
import { MediaUpload } from '@/components/media/MediaUpload';
import { MediaDetail } from '@/components/media/MediaDetail';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Search, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ErrorDisplay } from '@/components/family/tree/import/ErrorDisplay';

export default function MediaLibraryEnhanced() {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize Supabase Storage when component mounts
  useEffect(() => {
    const checkStorage = async () => {
      try {
        // Check if media bucket exists by trying to list files
        const { data: listData, error: listError } = await supabase.storage
          .from('media')
          .list();
          
        if (listError && listError.message.includes('The resource was not found')) {
          setError('Media storage not configured. Please contact your administrator.');
        }
      } catch (error) {
        console.error('Error checking storage:', error);
      }
    };
    
    checkStorage();
  }, []);

  const handleUploadComplete = (urls: string[]) => {
    toast({
      title: "Upload Complete",
      description: `Successfully uploaded ${urls.length} file${urls.length === 1 ? '' : 's'}`,
    });
    setShowUploadForm(false);
    setActiveTab('browse');
  };

  const handleMediaSelect = (mediaId: string) => {
    setSelectedMediaId(mediaId);
  };

  const handleBackFromDetail = () => {
    setSelectedMediaId(null);
  };

  return (
    <>
      <Helmet>
        <title>Media Library | Vaya</title>
        <link href="https://fonts.googleapis.com/css2?family=Mukta+Vaani:wght@400;500;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto px-4 py-8 max-w-screen-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold font-heading text-autumn dark:text-leaf">Family Media Library</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                View, upload, and annotate your family's historical photos and media
              </p>
            </div>
            
            {!selectedMediaId && (
              <Button 
                onClick={() => {
                  setShowUploadForm(true);
                  setActiveTab('upload');
                }}
                className="bg-autumn hover:bg-autumn/90 text-white"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Media
              </Button>
            )}
          </div>
          
          <ErrorDisplay error={error} />
          
          {selectedMediaId ? (
            <MediaDetail id={selectedMediaId} onBack={handleBackFromDetail} />
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <TabsList>
                  <TabsTrigger value="browse">Browse</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>
                
                {activeTab === 'browse' && (
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search media..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                )}
              </div>
              
              <TabsContent value="browse" className="space-y-8">
                <MediaGallery 
                  onSelect={(asset) => handleMediaSelect(asset.id)}
                  searchTerm={searchQuery}
                />
              </TabsContent>
              
              <TabsContent value="upload">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      Upload your family photos and media to preserve your history. You can add annotations to identify people, places, and objects in the images.
                    </p>
                    <MediaUpload 
                      onUploadComplete={handleUploadComplete}
                      maxFileSize={50}
                      allowedFileTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
                      multiple={true}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </MainLayout>
    </>
  );
}
