
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRound, Mic, BookOpen, Settings } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="space-y-6 py-4">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Vaya</h1>
        <p className="text-gray-600">Preserve and share your family stories</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Vaya</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Vaya helps you record and preserve your family's precious memories and stories for generations to come.</p>
          
          <div className="grid grid-cols-1 gap-4 mt-4">
            <Link to="/record">
              <Button className="w-full justify-start" variant="default">
                <Mic className="mr-2 h-4 w-4" />
                Record a Story
              </Button>
            </Link>
            
            <Link to="/stories">
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                View Stories
              </Button>
            </Link>
            
            <Link to="/profile">
              <Button className="w-full justify-start" variant="outline">
                <UserRound className="mr-2 h-4 w-4" />
                My Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-auto pt-6">
        <div className="border-t border-gray-200 pt-4 flex justify-around">
          <Link to="/" className="flex flex-col items-center text-xs">
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <span>Home</span>
          </Link>
          
          <Link to="/record" className="flex flex-col items-center text-xs">
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              <Mic size={20} />
            </div>
            <span>Record</span>
          </Link>
          
          <Link to="/stories" className="flex flex-col items-center text-xs">
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <span>Stories</span>
          </Link>
          
          <Link to="/profile" className="flex flex-col items-center text-xs">
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              <UserRound size={20} />
            </div>
            <span>Profile</span>
          </Link>
        </div>
      </footer>
    </div>
  );
};
