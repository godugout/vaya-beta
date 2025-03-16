
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Rocket, Database, Star, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { spaceVaultColors } from '@/styles/theme/colors/space-vault';

const mockMedia = [
  {
    id: '1',
    title: 'Patel Family Reunion',
    type: 'image',
    date: '2023-05-12',
    tags: ['family', 'reunion', 'celebration'],
    url: '/lovable-uploads/79a7f098-5d08-4543-8610-cab0055c5960.png',
    createdBy: 'Rajesh Patel'
  },
  {
    id: '2',
    title: 'Grandma\'s Cooking Secrets',
    type: 'video',
    date: '2023-04-03',
    tags: ['cooking', 'tradition', 'stories'],
    url: '/lovable-uploads/530d6c54-2d96-42b1-ac19-0192889eb279.png',
    createdBy: 'Meena Patel'
  },
  {
    id: '3',
    title: 'Family Trip to Gujarat',
    type: 'image',
    date: '2022-11-22',
    tags: ['travel', 'heritage', 'history'],
    url: '/lovable-uploads/601683fb-5c58-4468-946b-7bd998a42791.png',
    createdBy: 'Vikram Patel'
  },
  {
    id: '4',
    title: 'Grandfather\'s War Stories',
    type: 'audio',
    date: '2023-02-15',
    tags: ['history', 'personal', 'stories'],
    url: '/lovable-uploads/33c609d9-9189-49d2-b9c1-106d8257557c.png',
    createdBy: 'Anil Patel'
  },
  {
    id: '5',
    title: 'Traditional Wedding Photos',
    type: 'image',
    date: '2021-09-30',
    tags: ['wedding', 'tradition', 'celebration'],
    url: '/lovable-uploads/4425ec86-56fe-44c4-9f47-75e59d3cb287.png',
    createdBy: 'Leela Patel'
  }
];

export const SpaceMediaGallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedia, setFilteredMedia] = useState(mockMedia);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    let results = mockMedia;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by tab/type
    if (activeTab !== 'all') {
      results = results.filter(item => item.type === activeTab);
    }
    
    setFilteredMedia(results);
  }, [searchTerm, activeTab]);

  return (
    <div className="min-h-screen bg-space-black text-space-text-primary">
      <div className="px-6 py-10 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-space-text-primary flex items-center gap-2">
              <Rocket className="h-7 w-7 text-space-purple" />
              Anjanaeya Space Vault
            </h1>
            <p className="text-space-text-secondary mt-1 max-w-xl">
              Securely preserving your family's digital legacy across time and space
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="border-space-ui-border bg-space-ui-surface hover:bg-space-ui-subtle text-space-text-primary"
            >
              <ShieldCheck className="h-4 w-4 mr-2 text-space-gold" />
              Security Settings
            </Button>
            <Button 
              className="bg-space-purple hover:bg-space-violet text-white"
            >
              <Database className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </div>
        </div>
        
        {/* Search and filter bar */}
        <div className="p-4 bg-space-ui-surface rounded-lg border border-space-ui-border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-space-text-tertiary" />
              <Input 
                type="text"
                placeholder="Search media by name or tags..." 
                className="bg-space-black border-space-ui-border text-space-text-primary pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-space-ui-border text-space-text-secondary">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" className="border-space-ui-border text-space-text-secondary">
                <Star className="h-4 w-4 mr-2 text-space-gold" />
                Favorites
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs and content */}
        <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="bg-space-ui-surface border border-space-ui-border p-1">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-space-ui-accent data-[state=active]:text-space-black"
            >
              All Media
            </TabsTrigger>
            <TabsTrigger 
              value="image" 
              className="data-[state=active]:bg-space-ui-accent data-[state=active]:text-space-black"
            >
              Images
            </TabsTrigger>
            <TabsTrigger 
              value="video" 
              className="data-[state=active]:bg-space-ui-accent data-[state=active]:text-space-black"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger 
              value="audio" 
              className="data-[state=active]:bg-space-ui-accent data-[state=active]:text-space-black"
            >
              Audio
            </TabsTrigger>
            <TabsTrigger 
              value="document" 
              className="data-[state=active]:bg-space-ui-accent data-[state=active]:text-space-black"
            >
              Documents
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6 space-y-4">
            {filteredMedia.length === 0 ? (
              <div className="py-20 text-center bg-space-ui-surface rounded-lg border border-space-ui-border">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center gap-4"
                >
                  <Database className="h-16 w-16 text-space-text-tertiary" />
                  <h3 className="text-xl font-medium text-space-text-primary">No media found</h3>
                  <p className="text-space-text-tertiary max-w-md">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-2 border-space-ui-border text-space-text-primary"
                    onClick={() => {
                      setSearchTerm('');
                      setActiveTab('all');
                    }}
                  >
                    Clear filters
                  </Button>
                </motion.div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedia.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Card className="overflow-hidden bg-space-ui-surface border-space-ui-border hover:border-space-ui-accent transition-all">
                      <div className="aspect-video relative overflow-hidden bg-space-darkBlue">
                        <img 
                          src={item.url} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-space-ui-surface/80 backdrop-blur-sm text-space-text-primary border-none">
                            {item.type}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="py-3">
                        <CardTitle className="text-lg text-space-text-primary">{item.title}</CardTitle>
                        <CardDescription className="text-space-text-tertiary">
                          Added by {item.createdBy} on {new Date(item.date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="py-3 flex flex-wrap gap-1">
                        {item.tags.map(tag => (
                          <Badge 
                            key={tag}
                            variant="outline" 
                            className="bg-transparent border-space-ui-border text-space-text-secondary"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="image" className="mt-6">
            {/* Same grid structure as "all" tab */}
          </TabsContent>
          
          <TabsContent value="video" className="mt-6">
            {/* Same grid structure as "all" tab */}
          </TabsContent>
          
          <TabsContent value="audio" className="mt-6">
            {/* Same grid structure as "all" tab */}
          </TabsContent>
          
          <TabsContent value="document" className="mt-6">
            {/* Same grid structure as "all" tab */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
