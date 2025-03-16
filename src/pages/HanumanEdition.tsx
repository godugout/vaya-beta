
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { HanumanEditionChat } from '@/components/chat/HanumanEditionChat';

export default function HanumanEdition() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <HanumanEditionChat />
        </div>
      </div>
    </MainLayout>
  );
}
