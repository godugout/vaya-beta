
import { useState } from "react";
import { PageTransition } from "@/components/animation/PageTransition";
import { MediaGallery } from "@/components/media/MediaGallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MediaAsset {
  id: string;
  title: string;
  description: string | null;
  file_path: string;
  alt_text: string;
  category: string;
  tags: string[];
}

const MediaLibrary = () => {
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  const handleAssetSelect = (asset: MediaAsset) => {
    setSelectedAsset(asset);
  };

  const closeAssetDetail = () => {
    setSelectedAsset(null);
  };

  return (
    <PageTransition location="media-library" mode="fade">
      <div className="min-h-screen bg-gray-50 dark:bg-dark-background pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary">
              Media Library
            </h1>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="all">All Media</TabsTrigger>
              <TabsTrigger value="nature">Nature</TabsTrigger>
              <TabsTrigger value="sky">Sky & Space</TabsTrigger>
              <TabsTrigger value="fantasy">Fantasy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <MediaGallery onSelect={handleAssetSelect} limit={24} />
            </TabsContent>
            
            <TabsContent value="nature">
              <MediaGallery category="nature" onSelect={handleAssetSelect} limit={24} />
            </TabsContent>
            
            <TabsContent value="sky">
              <MediaGallery category="sky" onSelect={handleAssetSelect} limit={24} />
            </TabsContent>
            
            <TabsContent value="fantasy">
              <MediaGallery category="fantasy" onSelect={handleAssetSelect} limit={24} />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Asset detail modal */}
        {selectedAsset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={closeAssetDetail}>
            <div 
              className="relative bg-white dark:bg-dark-background-surface rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b border-gray-200 dark:border-dark-background-elevated bg-white dark:bg-dark-background-surface">
                <h2 className="text-xl font-medium">{selectedAsset.title}</h2>
                <button 
                  onClick={closeAssetDetail}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-background-elevated"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="aspect-video mb-6 overflow-hidden bg-gray-100 dark:bg-dark-background-surface rounded-lg border border-gray-200 dark:border-dark-background-elevated">
                  <img 
                    src={selectedAsset.file_path} 
                    alt={selectedAsset.alt_text}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Description</h3>
                    <p className="mt-1">{selectedAsset.description || "No description available."}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Category</h3>
                    <p className="mt-1 capitalize">{selectedAsset.category}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Tags</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedAsset.tags && selectedAsset.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-gray-100 dark:bg-dark-background-elevated rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">File Path</h3>
                    <code className="block p-2 mt-1 bg-gray-100 dark:bg-dark-background-elevated rounded text-sm overflow-x-auto">
                      {selectedAsset.file_path}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default MediaLibrary;
