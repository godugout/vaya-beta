
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileAudio, BookOpen, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StoriesHeroSection() {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="sm:pr-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Share Your Family Stories
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Capture and preserve your family's oral traditions, stories, and memories for future generations. Record audio stories, add photos, and create a lasting legacy.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-autumn/10 dark:bg-leaf/10 flex items-center justify-center">
              <FileAudio className="h-5 w-5 text-autumn dark:text-leaf" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Record Audio Stories</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use our simple voice recorder to capture stories in your own voice
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-water/10 dark:bg-water/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-water dark:text-water" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Story Prompts</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get inspiration with culturally relevant prompts that help you tell better stories
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-forest/10 dark:bg-forest/10 flex items-center justify-center">
              <Heart className="h-5 w-5 text-forest dark:text-forest" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Share With Family</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Easily share your stories with family members and preserve your legacy
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Card className="bg-gradient-to-b from-autumn/5 to-autumn/10 dark:from-leaf/5 dark:to-leaf/10 border-autumn/20 dark:border-leaf/20 overflow-hidden relative">
        <CardContent className="p-6">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-autumn/20 to-transparent dark:from-leaf/20 dark:to-transparent rounded-full blur-3xl -mr-24 -mt-24 z-0"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Start Recording Today
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your family stories are precious. Don't let them fade away. Start recording your memories in just a few minutes.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                className="bg-autumn hover:bg-autumn/90 text-white dark:bg-leaf dark:hover:bg-leaf/90 dark:text-black"
                onClick={() => navigate('/share-stories')}
              >
                <FileAudio className="mr-2 h-4 w-4" />
                Record a Story
              </Button>
              
              <Button 
                variant="outline"
                className="border-autumn text-autumn hover:text-autumn hover:bg-autumn/10 dark:border-leaf dark:text-leaf dark:hover:text-leaf dark:hover:bg-leaf/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
