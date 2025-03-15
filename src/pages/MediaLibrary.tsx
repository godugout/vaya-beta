
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Upload, Image, Video, AudioLines, FileText, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const MediaGalleryItem = ({ 
  type, 
  title, 
  date, 
  thumbnail = "/placeholder.svg" 
}: { 
  type: 'image' | 'video' | 'audio' | 'document'; 
  title: string; 
  date: string; 
  thumbnail?: string;
}) => {
  const iconMap = {
    image: <Image className="h-5 w-5 text-blue-500" />,
    video: <Video className="h-5 w-5 text-purple-500" />,
    audio: <AudioLines className="h-5 w-5 text-green-500" />,
    document: <FileText className="h-5 w-5 text-orange-500" />
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 group bg-white dark:bg-gray-800">
      <div className="relative pt-[70%] bg-gray-100 dark:bg-gray-700">
        <img 
          src={thumbnail} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            {iconMap[type]}
            <span className="capitalize">{type}</span>
          </Badge>
        </div>
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium text-sm truncate">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
      </CardContent>
    </Card>
  );
};

const MediaLibrary = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Dummy data for example
  const mediaItems = [
    { id: 1, type: 'image', title: 'Family Trip to Gujarat', date: '4/8/2024', thumbnail: '/placeholder.svg' },
    { id: 2, type: 'audio', title: 'Grandmother\'s Recipes', date: '4/6/2024', thumbnail: '/placeholder.svg' },
    { id: 3, type: 'audio', title: 'Our First Diwali in America', date: '4/2/2024', thumbnail: '/placeholder.svg' },
    { id: 4, type: 'image', title: 'Dad\'s Special Chai', date: '4/1/2024', thumbnail: '/placeholder.svg' },
    { id: 5, type: 'video', title: 'Navratri Garba Night', date: '3/28/2024', thumbnail: '/placeholder.svg' },
    { id: 6, type: 'document', title: 'Family Tree Document', date: '3/22/2024', thumbnail: '/placeholder.svg' },
  ];

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Media Library</h1>
          <p className="text-gray-600 dark:text-gray-400">
            All your family memories in one place
          </p>
        </div>
        
        <Button className="bg-forest text-white hover:bg-forest/90">
          <Upload className="mr-2 h-4 w-4" /> Upload Media
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search media files..." 
            className="pl-10 bg-white dark:bg-gray-800" 
          />
        </div>
        
        <Button variant="outline" className="flex items-center gap-2 md:w-auto">
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 mb-6">
          <TabsTrigger value="all" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            All Media
          </TabsTrigger>
          <TabsTrigger value="images" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            Images
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            Videos
          </TabsTrigger>
          <TabsTrigger value="audio" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            Audio
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            Documents
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6 mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaItems.map((item) => (
              <MediaGalleryItem 
                key={item.id}
                type={item.type as 'image' | 'video' | 'audio' | 'document'}
                title={item.title}
                date={item.date}
                thumbnail={item.thumbnail}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="space-y-6 mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaItems
              .filter(item => item.type === 'image')
              .map((item) => (
                <MediaGalleryItem 
                  key={item.id}
                  type={item.type as 'image' | 'video' | 'audio' | 'document'}
                  title={item.title}
                  date={item.date}
                  thumbnail={item.thumbnail}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-6 mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaItems
              .filter(item => item.type === 'video')
              .map((item) => (
                <MediaGalleryItem 
                  key={item.id}
                  type={item.type as 'image' | 'video' | 'audio' | 'document'}
                  title={item.title}
                  date={item.date}
                  thumbnail={item.thumbnail}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="audio" className="space-y-6 mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaItems
              .filter(item => item.type === 'audio')
              .map((item) => (
                <MediaGalleryItem 
                  key={item.id}
                  type={item.type as 'image' | 'video' | 'audio' | 'document'}
                  title={item.title}
                  date={item.date}
                  thumbnail={item.thumbnail}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-6 mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaItems
              .filter(item => item.type === 'document')
              .map((item) => (
                <MediaGalleryItem 
                  key={item.id}
                  type={item.type as 'image' | 'video' | 'audio' | 'document'}
                  title={item.title}
                  date={item.date}
                  thumbnail={item.thumbnail}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MediaLibrary;
