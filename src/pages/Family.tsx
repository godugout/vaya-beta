
import React from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from "@/components/ui/card";

export default function Family() {
  const { id } = useParams<{ id: string }>();

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Family Details</h1>
        <Card className="p-6">
          <p>Family ID: {id}</p>
          <p className="text-gray-500 mt-4">This page is under development. More family details will be displayed here soon.</p>
        </Card>
      </div>
    </MainLayout>
  );
}
