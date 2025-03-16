
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Upload, Download, Image, FileText, Video, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  title: string;
  date: string;
  thumbnail: string;
}

interface SpaceMediaGalleryProps {
  items?: MediaItem[];
}

export const SpaceMediaGallery: React.FC<SpaceMediaGalleryProps> = ({ 
  items = [
    {
      id: '1',
      type: 'image',
      title: 'Family Trip to Desert',
      date: '4/8/2024',
      thumbnail: '/lovable-uploads/60d1aa5e-d476-4567-9b1b-720dc12f7cb3.png'
    },
    {
      id: '2',
      type: 'audio',
      title: 'Grandmother's Recipe Audio',
      date: '4/6/2024',
      thumbnail: '/lovable-uploads/f9015ba9-559b-4f81-afb6-7c358ee51916.png'
    },
    {
      id: '3',
      type: 'audio',
      title: 'Oral Family History Recording',
      date: '4/3/2024',
      thumbnail: '/lovable-uploads/435ea637-5431-4138-b96b-02215c79ea0a.png'
    },
    {
      id: '4',
      type: 'image',
      title: 'Ancient Family Cave Art',
      date: '4/1/2024',
      thumbnail: '/lovable-uploads/81d7d1f8-871f-42b5-a3b3-2503e3d355d8.png'
    },
    {
      id: '5',
      type: 'video',
      title: 'Ceremony Recording',
      date: '3/28/2024',
      thumbnail: '/lovable-uploads/435ea637-5431-4138-b96b-02215c79ea0a.png'
    },
    {
      id: '6',
      type: 'document',
      title: 'Family Tree Document',
      date: '3/25/2024',
      thumbnail: '/lovable-uploads/81d7d1f8-871f-42b5-a3b3-2503e3d355d8.png'
    }
  ]
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'audio':
        return <Music className="h-5 w-5" />;
      case 'document':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="space-bg p-8 min-h-screen text-white">
      <div className="space-stars"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-space-silver">Media Vault</h1>
            <p className="text-space-text-secondary text-sm">Secure storage for family artifacts and memories</p>
          </div>
          
          <Button className="mt-4 sm:mt-0 bg-space-blue hover:bg-space-blue/90 flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span>Upload Media</span>
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-6 space-terminal">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-space-lightBlue/80" />
              <Input 
                placeholder="Search vault archives..."
                className="pl-10 bg-transparent border-space-indigo text-space-lightBlue w-full focus:border-space-lightBlue transition-colors"
              />
            </div>
            
            <Button variant="outline" className="border-space-indigo text-space-lightBlue hover:bg-space-indigo/20 hover:border-space-lightBlue">
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </Button>
          </div>
          
          {/* Category tabs */}
          <div className="mt-4 border-t border-space-indigo/50 pt-4">
            <div className="flex flex-wrap gap-2">
              {['All Media', 'Images', 'Videos', 'Audio', 'Documents'].map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={index === 0 ? 
                    "bg-space-blue hover:bg-space-blue/90" : 
                    "border-space-indigo/50 text-space-text-secondary hover:border-space-lightBlue hover:text-space-lightBlue"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="space-card"
            >
              <div className="relative aspect-square overflow-hidden rounded mb-3 space-scanner">
                <div className="absolute inset-0 flex items-center justify-center bg-space-indigo">
                  {item.thumbnail ? (
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      {getTypeIcon(item.type)}
                    </div>
                  )}
                </div>
                
                <div className="absolute top-2 left-2 bg-space-darkBlue/80 backdrop-blur-sm text-space-lightBlue rounded px-2 py-1 text-xs flex items-center gap-1">
                  {getTypeIcon(item.type)}
                  <span>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
                </div>
              </div>
              
              <h3 className="font-medium text-space-text-primary mb-1">{item.title}</h3>
              <p className="text-space-text-tertiary text-xs">{item.date}</p>
              
              <div className="mt-3 pt-3 border-t border-space-indigo/40 flex justify-end">
                <Button size="sm" variant="ghost" className="text-space-lightBlue hover:bg-space-blue/10">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
