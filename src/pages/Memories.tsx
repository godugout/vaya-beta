
import React from 'react';
import MemoryFeedLayout from '@/components/memory/MemoryFeedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Memories() {
  return (
    <div className="container max-w-4xl py-8">
      <Card className="bg-black/40 border-gray-800 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-white">Your Family Memories</CardTitle>
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
