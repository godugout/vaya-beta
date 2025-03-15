
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Home, Mic, ArrowRight, Search, Calendar, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ShareStories = () => {
  return (
    <div className="min-h-screen bg-sky-50 dark:bg-gray-900">
      {/* Voice Navigation Banner */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <Mic className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-medium">Voice navigation active</span>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
            <span className="text-xs">Listening...</span>
          </Button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="p-0 h-8">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <Home className="h-4 w-4" />
        </Button>
        <span className="text-sm text-gray-500 dark:text-gray-400">/</span>
        <span className="text-sm font-medium">Share Stories</span>
      </div>

      {/* Page Content */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Share Your Stories</h1>
            <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-6">Share Your Family Stories</h2>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                    <Mic className="h-5 w-5 text-autumn-orange" />
                  </div>
                  <div>
                    <h3 className="font-medium">Use our simple voice recorder to capture stories in your own voice</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                    <Calendar className="h-5 w-5 text-leaf-green" />
                  </div>
                  <div>
                    <h3 className="font-medium">Get inspiration with culturally relevant prompts that help you tell better stories</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                    <Home className="h-5 w-5 text-stream-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">Easily share your stories with family members and preserve your legacy</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-1/2 lg:w-2/5">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <p className="text-center mb-4">Your family stories are precious. Don't let them fade away. Start recording your memories in just a few clicks.</p>
              
              <div className="flex justify-center space-x-4 my-6">
                <Button className="bg-autumn-orange hover:bg-autumn-orange/90 text-white">
                  Record a Story
                </Button>
                <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Patel Family Events Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Patel Family Events & Celebrations</h2>
          
          <div className="mb-6 flex justify-between items-center">
            <Input 
              placeholder="Search capsules..." 
              className="max-w-xs bg-white dark:bg-gray-800"
              startIcon={<Search className="h-4 w-4" />}
            />
            
            <div className="flex space-x-4">
              <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                Upcoming
              </Button>
              <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                Active
              </Button>
              <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                Locked
              </Button>
              <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                Revealed
              </Button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-2">🎓</span>
                      <span className="font-medium">Riya's Graduation</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Celebrating Riya's medical school graduation
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">AP</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">upcoming</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">5/14/2025</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
                
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-2">💍</span>
                      <span className="font-medium">Amit & Priya's Wedding</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Family wedding celebration memories
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">MP</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">locked</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">12/11/2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Family Stories */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Recent Family Stories</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">Demo Content</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-4">
                <p className="text-xs text-gray-500 mb-2">4/6/2024</p>
                <h3 className="text-lg font-medium mb-2">My Grandmother's Recipes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  I remember how she would wake up early to prepare fresh rotis and...
                </p>
                <Button variant="ghost" size="sm" className="flex items-center text-stream-blue">
                  <Play className="h-4 w-4 mr-1" /> Play Audio
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-4">
                <p className="text-xs text-gray-500 mb-2">4/2/2024</p>
                <h3 className="text-lg font-medium mb-2">Our First Diwali in America</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  It was difficult finding all the materials for the puja, but we managed to...
                </p>
                <Button variant="ghost" size="sm" className="flex items-center text-stream-blue">
                  <Play className="h-4 w-4 mr-1" /> Play Audio
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-4">
                <p className="text-xs text-gray-500 mb-2">4/1/2024</p>
                <h3 className="text-lg font-medium mb-2">Learning to Make Dad's Special Chai</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  The secret was the fresh ginger and cardamom he'd grind himself...
                </p>
                <Button variant="ghost" size="sm" className="flex items-center text-stream-blue">
                  <Play className="h-4 w-4 mr-1" /> Play Audio
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button className="flex items-center bg-autumn-orange hover:bg-autumn-orange/90 text-white">
              Share a New Story
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareStories;
