
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, Pause } from 'lucide-react';

// Mock data for stories
const MOCK_STORIES = [
  {
    id: '1',
    title: 'My First Day of School',
    date: '2023-10-15',
    duration: '2:45',
    author: 'John Smith'
  },
  {
    id: '2',
    title: 'Family Vacation to the Mountains',
    date: '2023-09-22',
    duration: '3:12',
    author: 'Sarah Johnson'
  },
  {
    id: '3',
    title: 'Grandma\'s Secret Recipe',
    date: '2023-08-05',
    duration: '4:30',
    author: 'Michael Williams'
  }
];

export const ViewStoriesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/" className="mr-2">
          <Button variant="ghost" size="icon">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Family Stories</h1>
      </div>
      
      <div className="space-y-4">
        {MOCK_STORIES.map(story => (
          <Card key={story.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{story.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>By {story.author}</span>
                <span>{story.date}</span>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                <span className="text-sm text-gray-500">{story.duration}</span>
                <Button variant="outline" size="sm">
                  <Play size={16} className="mr-1" />
                  Play
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/record">
          <Button>
            Record a New Story
          </Button>
        </Link>
      </div>
    </div>
  );
};
