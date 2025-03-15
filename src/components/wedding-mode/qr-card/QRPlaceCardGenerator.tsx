
import React, { useState } from 'react';
import { QrCode, Download, Copy, Check, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWeddingMode } from '../WeddingModeProvider';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface QRPlaceCardGeneratorProps {
  onGenerate?: (guestName: string, tableNumber: string) => void;
}

export const QRPlaceCardGenerator: React.FC<QRPlaceCardGeneratorProps> = ({ 
  onGenerate 
}) => {
  const [guestName, setGuestName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const { theme } = useWeddingMode();
  
  const themeStyles = {
    classic: {
      accent: 'text-autumn border-autumn',
      button: 'autumn',
      cardBg: 'bg-sand/10',
    },
    modern: {
      accent: 'text-water border-water',
      button: 'water',
      cardBg: 'bg-sky/10',
    },
    rustic: {
      accent: 'text-forest border-forest',
      button: 'forest',
      cardBg: 'bg-leaf/10',
    }
  };
  
  const currentTheme = themeStyles[theme];
  
  const handleGenerate = () => {
    if (guestName && tableNumber) {
      setGenerated(true);
      if (onGenerate) {
        onGenerate(guestName, tableNumber);
      }
    }
  };
  
  const handleCopy = () => {
    // Simulate copying to clipboard
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="p-6">
      <AnimatedContainer variant="fade" className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <QrCode size={40} className={cn("mx-auto mb-2", currentTheme.accent)} />
          <h2 className="text-3xl font-heading font-bold">Place Card Generator</h2>
          <p className="text-gray-600 dark:text-gray-400">Create beautiful QR code place cards for your wedding guests</p>
        </div>
        
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="create">Create Cards</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Create</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="guestName">Guest Name</Label>
                <Input 
                  id="guestName" 
                  placeholder="Enter guest name" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="tableNumber">Table Number</Label>
                <Input 
                  id="tableNumber" 
                  placeholder="Enter table number" 
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                />
              </div>
            </div>
            
            <Button 
              variant={currentTheme.button} 
              onClick={handleGenerate}
              disabled={!guestName || !tableNumber}
              className="w-full"
            >
              Generate Place Card
            </Button>
            
            {generated && (
              <AnimatedContainer variant="scale" className="mt-8">
                <div className={cn("border rounded-xl p-6 text-center", currentTheme.cardBg)}>
                  <div className="mb-4 relative mx-auto w-40 h-40 bg-white flex items-center justify-center rounded-md shadow-sm">
                    <QrCode size={120} />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                        <Users size={20} className={cn(currentTheme.accent)} />
                      </div>
                    </motion.div>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-1">{guestName}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Table {tableNumber}</p>
                  
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      {copied ? <Check size={16} className="mr-1" /> : <Copy size={16} className="mr-1" />}
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                    <Button variant={currentTheme.button} size="sm">
                      <Download size={16} className="mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </AnimatedContainer>
            )}
          </TabsContent>
          
          <TabsContent value="bulk">
            <div className="border border-dashed rounded-lg p-8 text-center">
              <Users size={32} className="mx-auto mb-2 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Upload Guest List</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Upload a CSV file with guest names and table assignments
              </p>
              <Button variant="outline">Choose File</Button>
            </div>
          </TabsContent>
        </Tabs>
      </AnimatedContainer>
    </div>
  );
};
