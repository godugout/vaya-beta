
import React from 'react';
import MemoryFeedLayout from '@/components/memory/MemoryFeedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Memories() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card className="bg-black/40 border-gray-800 mb-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {/* Subtle cosmic background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-1 left-[10%]"></span>
            <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-2 left-[30%]"></span>
            <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-3 left-[50%]"></span>
            <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-2 left-[70%]"></span>
            <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-1 left-[90%]"></span>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-heading text-white">Your Family Memories</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            Preserve and share your family's most precious moments. Add photos, record stories, and create a lasting legacy.
          </p>
        </CardContent>
      </Card>
      
      <MemoryFeedLayout />
    </div>
  );
}
