
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/MainLayout';

export default function Index() {
  const navigate = useNavigate();
  
  const handleExploreClick = () => {
    navigate('/families');
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Vaya</h1>
          <p className="text-lg mb-8 text-gray-300">Your family history preservation platform</p>
          
          <div className="p-8 bg-slate-800 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-white">Getting Started</h2>
            <p className="mb-6 text-gray-300">
              Vaya helps you preserve and share your family's history through stories, memories, and family trees.
              Start exploring the features and build your family's digital legacy today.
            </p>
            <Button 
              size="lg" 
              variant="default" 
              onClick={handleExploreClick}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
