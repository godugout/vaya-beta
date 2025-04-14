
import React from 'react';
import { Link } from 'react-router-dom';
import { AidaLayout } from '@/components/layout/AidaLayout';
import { Button } from '@/components/ui/button';
import { Mic, BookOpen, UserRound, PlusCircle } from 'lucide-react';

export const HomePage = () => {
  return (
    <AidaLayout className="space-y-6 py-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
            <img 
              src="/lovable-uploads/a13e3eee-a6a0-40a3-8dea-0f28af1f142e.png" 
              alt="Vaya Logo" 
              className="w-5 h-5"
            />
          </div>
          <span className="font-semibold">Vaya</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/record">
            <PlusCircle size={20} />
          </Link>
          <Link to="/profile">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </Link>
        </div>
      </header>

      <div className="mt-4">
        <h2 className="text-lg font-medium mb-4">Find a Person</h2>
        <input
          type="text"
          placeholder="Search people"
          className="aida-input w-full"
        />
      </div>
      
      <div className="border-t border-[#EEEEEE] pt-4">
        <h2 className="text-lg font-medium mb-4">Recent</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
              <div>
                <div className="font-medium">Grandma Patricia</div>
                <div className="text-xs text-[#8A898C]">Last chat: 3 days ago</div>
              </div>
            </div>
            <Link to="/chat">
              <Button variant="outline" className="rounded-full px-3 py-1 text-xs">
                Chat
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
              <div>
                <div className="font-medium">Uncle James</div>
                <div className="text-xs text-[#8A898C]">Last chat: 1 week ago</div>
              </div>
            </div>
            <Link to="/chat">
              <Button variant="outline" className="rounded-full px-3 py-1 text-xs">
                Chat
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="mt-auto pt-6 fixed bottom-0 left-0 right-0 bg-white border-t border-[#EEEEEE]">
        <div className="flex justify-around max-w-md mx-auto">
          <Link to="/" className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <span className="text-xs">Home</span>
          </Link>
          
          <Link to="/record" className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              <Mic size={20} />
            </div>
            <span className="text-xs">Record</span>
          </Link>
          
          <Link to="/stories" className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <span className="text-xs">Stories</span>
          </Link>
          
          <Link to="/profile" className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              <UserRound size={20} />
            </div>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </footer>
    </AidaLayout>
  );
};
