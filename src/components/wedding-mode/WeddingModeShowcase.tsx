
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WeddingModeProvider } from './WeddingModeProvider';
import { WelcomeScreen } from './welcome/WelcomeScreen';
import { QRPlaceCardGenerator } from './qr-card/QRPlaceCardGenerator';
import { FamilyProximityVisualization } from './proximity/FamilyProximityVisualization';
import { GroupStorytellingInterface } from './storytelling/GroupStorytellingInterface';
import { AnjanaeyaVault } from './vault/AnjanaeyaVault';
import { FamilyParticipationDashboard } from './progress/FamilyParticipationDashboard';
import { FamilyTreeCompletion } from './progress/FamilyTreeCompletion';

export default function WeddingModeShowcase() {
  const [currentView, setCurrentView] = useState('welcome');

  return (
    <WeddingModeProvider>
      <div className="container max-w-7xl py-10">
        <h1 className="text-4xl font-bold mb-10">Wedding Event Mode</h1>
        
        <Tabs defaultValue="welcome" onValueChange={setCurrentView} value={currentView}>
          <TabsList className="mb-8 grid grid-cols-2 md:grid-cols-7 max-w-full overflow-auto">
            <TabsTrigger value="welcome">Welcome</TabsTrigger>
            <TabsTrigger value="qr-cards">QR Cards</TabsTrigger>
            <TabsTrigger value="proximity">Family Radar</TabsTrigger>
            <TabsTrigger value="stories">Group Stories</TabsTrigger>
            <TabsTrigger value="vault">Anjaneya Vault</TabsTrigger>
            <TabsTrigger value="participation">Dashboard</TabsTrigger>
            <TabsTrigger value="family-tree">Family Tree</TabsTrigger>
          </TabsList>
          
          <TabsContent value="welcome">
            <WelcomeScreen 
              coupleName="Arjun & Meera"
              date="June 15, 2024"
              location="Grand Pavilion, Mumbai"
              onContinue={() => setCurrentView('qr-cards')}
            />
          </TabsContent>
          
          <TabsContent value="qr-cards">
            <QRPlaceCardGenerator />
          </TabsContent>
          
          <TabsContent value="proximity">
            <FamilyProximityVisualization />
          </TabsContent>
          
          <TabsContent value="stories">
            <GroupStorytellingInterface />
          </TabsContent>
          
          <TabsContent value="vault">
            <AnjanaeyaVault />
          </TabsContent>
          
          <TabsContent value="participation">
            <FamilyParticipationDashboard />
          </TabsContent>
          
          <TabsContent value="family-tree">
            <FamilyTreeCompletion />
          </TabsContent>
        </Tabs>
      </div>
    </WeddingModeProvider>
  );
}
