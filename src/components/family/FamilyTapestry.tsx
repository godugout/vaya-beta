
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Users, Book, Camera, Sparkles, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PatternBackground } from "@/components/ui/pattern-background";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface FamilyTapestryProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FamilyMember {
  id: string;
  name: string;
  title?: string;
  description?: string;
  birth_date?: string;
  photo_url?: string;
}

interface TapestrySection {
  id: string;
  title: string;
  content: string;
  votes: number;
  userVoted: boolean;
  comments: { id: string; author: string; text: string }[];
}

export function FamilyTapestry({ isOpen, onClose }: FamilyTapestryProps) {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<{ id: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("members");
  const { toast } = useToast();
  
  // Sample tapestry sections (would be fetched from database in production)
  const [tapentrySections, setTapestrySections] = useState<TapestrySection[]>([
    {
      id: "origins",
      title: "Family Origins",
      content: "Our family originated from the highlands of Scotland in the late 1800s before emigrating to America.",
      votes: 5,
      userVoted: false,
      comments: [
        { id: "c1", author: "John", text: "I heard we also had some Irish ancestry too!" }
      ]
    },
    {
      id: "traditions",
      title: "Family Traditions",
      content: "Every Christmas, we gather to make homemade ornaments representing the year's most significant events.",
      votes: 7,
      userVoted: true,
      comments: []
    },
    {
      id: "values",
      title: "Core Values",
      content: "Honesty, perseverance, and kindness have been passed down through generations as our guiding principles.",
      votes: 3,
      userVoted: false,
      comments: [
        { id: "c2", author: "Mary", text: "Don't forget about our emphasis on education!" }
      ]
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      fetchFamilyDetails();
    }
  }, [isOpen]);

  const fetchFamilyDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch first family
      const { data: familiesData, error: familyError } = await supabase
        .from('families')
        .select('id, name')
        .limit(1);

      if (familyError) throw familyError;
      
      if (familiesData && familiesData.length > 0) {
        const family = familiesData[0];
        setSelectedFamily(family);

        // Fetch family members for this family
        const { data: membersData, error: membersError } = await supabase
          .from('family_members')
          .select('id, name, title, description, birth_date, photo_url')
          .eq('family_id', family.id);

        if (membersError) throw membersError;
        
        setFamilyMembers(membersData || []);
      }
    } catch (error: any) {
      console.error("Error loading family details:", error);
      toast({
        title: "Error loading family details",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (sectionId: string) => {
    setTapestrySections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          votes: section.userVoted ? section.votes - 1 : section.votes + 1,
          userVoted: !section.userVoted
        };
      }
      return section;
    }));
    
    toast({
      title: "Vote recorded",
      description: "Your vote has been submitted successfully",
    });
  };

  const handleAddComment = (sectionId: string, comment: string) => {
    if (!comment.trim()) return;
    
    setTapestrySections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          comments: [
            ...section.comments,
            { id: Date.now().toString(), author: "You", text: comment }
          ]
        };
      }
      return section;
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <PatternBackground pattern="family-languages" opacity="medium" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-indigo-900/60 backdrop-blur-md overflow-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-white">
                  {selectedFamily ? `${selectedFamily.name} Tapestry` : 'Family Tapestry'}
                </h1>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <p className="text-white/80 mb-12 max-w-2xl">
                Welcome to your Family Tapestry - a collaborative space to weave together your family's 
                stories, traditions, and connections. Together with your family members, you can vote on content, 
                share stories, and build a rich family history.
              </p>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
                <TabsList className="grid grid-cols-4 max-w-md mx-auto bg-white/10 backdrop-blur p-1 rounded-full border border-white/20">
                  <TabsTrigger value="members" className="text-white data-[state=active]:bg-white/20 rounded-full">
                    <Users className="h-4 w-4 mr-2" />
                    Members
                  </TabsTrigger>
                  <TabsTrigger value="stories" className="text-white data-[state=active]:bg-white/20 rounded-full">
                    <Book className="h-4 w-4 mr-2" />
                    Stories
                  </TabsTrigger>
                  <TabsTrigger value="photos" className="text-white data-[state=active]:bg-white/20 rounded-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Photos
                  </TabsTrigger>
                  <TabsTrigger value="traditions" className="text-white data-[state=active]:bg-white/20 rounded-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Traditions
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="members" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {familyMembers.map(member => (
                      <Card key={member.id} className="bg-white/10 backdrop-blur border border-white/20 text-white overflow-hidden">
                        <div className="relative p-4">
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="bg-purple-500/50 hover:bg-purple-500/70">
                              {member.title || 'Member'}
                            </Badge>
                          </div>
                          <div className="flex flex-col items-center pt-6">
                            <Avatar className="h-24 w-24 mb-4 border-4 border-purple-300/30">
                              {member.photo_url ? (
                                <AvatarImage src={member.photo_url} alt={member.name} />
                              ) : (
                                <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-600 text-white text-2xl">
                                  {member.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                            {member.birth_date && (
                              <p className="text-white/70 text-sm mb-2">
                                Born: {new Date(member.birth_date).toLocaleDateString()}
                              </p>
                            )}
                            {member.description && (
                              <p className="text-white/80 text-center text-sm mt-2">{member.description}</p>
                            )}
                          </div>
                          <div className="flex justify-center mt-4">
                            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Add Story
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}

                    <Card className="bg-white/5 backdrop-blur border border-white/10 border-dashed text-white p-4 flex flex-col items-center justify-center">
                      <Button variant="ghost" className="text-white hover:bg-white/10 h-32 w-full">
                        <div className="flex flex-col items-center">
                          <Users className="h-10 w-10 mb-2 opacity-70" />
                          <span className="text-lg">Add Family Member</span>
                        </div>
                      </Button>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="stories" className="mt-8">
                  <div className="space-y-8">
                    {tapentrySections.map(section => (
                      <Card key={section.id} className="bg-white/10 backdrop-blur border border-white/20 text-white p-6">
                        <h3 className="text-xl font-semibold mb-2 flex items-center">
                          <Sparkles className="h-5 w-5 mr-2 text-amber-300" />
                          {section.title}
                        </h3>
                        <p className="mb-4 text-white/90">{section.content}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className={`flex items-center ${section.userVoted ? 'text-green-400' : 'text-white/70'}`}
                              onClick={() => handleVote(section.id)}
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>{section.votes} votes</span>
                            </Button>
                            
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-white/70 hover:text-white hover:bg-white/10"
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>{section.comments.length} comments</span>
                            </Button>
                          </div>
                          
                          <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                            Edit
                          </Button>
                        </div>
                        
                        {section.comments.length > 0 && (
                          <div className="mt-4 space-y-3 pt-4 border-t border-white/10">
                            {section.comments.map(comment => (
                              <div key={comment.id} className="bg-white/5 p-3 rounded-lg">
                                <p className="text-sm font-semibold text-white/80">{comment.author}:</p>
                                <p className="text-sm text-white/90">{comment.text}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </Card>
                    ))}
                    
                    <Card className="bg-white/5 backdrop-blur border border-white/10 border-dashed text-white p-4">
                      <Button variant="ghost" className="text-white hover:bg-white/10 h-20 w-full">
                        <div className="flex flex-col items-center">
                          <Book className="h-6 w-6 mb-2 opacity-70" />
                          <span>Add New Story</span>
                        </div>
                      </Button>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="photos" className="mt-8">
                  <div className="text-center text-white py-12">
                    <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">Family Photos</h3>
                    <p className="max-w-md mx-auto text-white/70 mb-6">
                      Upload and share your precious family moments. Create photo albums and let family members add their own photos.
                    </p>
                    <Button className="bg-white/10 text-white border border-white/20 hover:bg-white/20">
                      Upload Photos
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="traditions" className="mt-8">
                  <div className="text-center text-white py-12">
                    <Heart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">Family Traditions</h3>
                    <p className="max-w-md mx-auto text-white/70 mb-6">
                      Document your family's special traditions, celebrations, and rituals that make your family unique.
                    </p>
                    <Button className="bg-white/10 text-white border border-white/20 hover:bg-white/20">
                      Add Tradition
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
