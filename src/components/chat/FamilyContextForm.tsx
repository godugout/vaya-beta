
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FamilyContext } from './types';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';

interface FamilyContextFormProps {
  initialContext?: Partial<FamilyContext>;
  onSave: (context: FamilyContext) => void;
  onCancel: () => void;
}

export const FamilyContextForm: React.FC<FamilyContextFormProps> = ({
  initialContext,
  onSave,
  onCancel
}) => {
  const [context, setContext] = useState<Partial<FamilyContext>>(initialContext || {
    ancestralRegion: '',
    currentLocation: '',
    culturalIdentity: '',
    familyElders: [],
    traditions: [],
    hobbies: []
  });

  const [newElder, setNewElder] = useState('');
  const [newTradition, setNewTradition] = useState('');
  const [newHobby, setNewHobby] = useState('');

  const handleSave = () => {
    // Ensure we have at least some data before saving
    if (!context.ancestralRegion && !context.currentLocation && 
        (!context.familyElders || context.familyElders.length === 0)) {
      alert('Please fill in at least some information to personalize your experience');
      return;
    }
    
    onSave(context as FamilyContext);
  };

  const addElder = () => {
    if (newElder.trim()) {
      setContext({
        ...context,
        familyElders: [...(context.familyElders || []), newElder.trim()]
      });
      setNewElder('');
    }
  };

  const removeElder = (index: number) => {
    const newElders = [...(context.familyElders || [])];
    newElders.splice(index, 1);
    setContext({
      ...context,
      familyElders: newElders
    });
  };

  const addTradition = () => {
    if (newTradition.trim()) {
      setContext({
        ...context,
        traditions: [...(context.traditions || []), newTradition.trim()]
      });
      setNewTradition('');
    }
  };

  const removeTradition = (index: number) => {
    const newTraditions = [...(context.traditions || [])];
    newTraditions.splice(index, 1);
    setContext({
      ...context,
      traditions: newTraditions
    });
  };

  const addHobby = () => {
    if (newHobby.trim()) {
      setContext({
        ...context,
        hobbies: [...(context.hobbies || []), newHobby.trim()]
      });
      setNewHobby('');
    }
  };

  const removeHobby = (index: number) => {
    const newHobbies = [...(context.hobbies || [])];
    newHobbies.splice(index, 1);
    setContext({
      ...context,
      hobbies: newHobbies
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-heading text-amber-600">Family Context</CardTitle>
        <CardDescription>
          Personalize your storytelling experience by sharing details about your family.
          This information will be used to make prompts more relevant to your heritage.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="ancestralRegion">Ancestral Region</Label>
          <Input
            id="ancestralRegion"
            placeholder="e.g., Gujarat, Punjab, Kerala"
            value={context.ancestralRegion || ''}
            onChange={(e) => setContext({...context, ancestralRegion: e.target.value})}
          />
          <p className="text-xs text-gray-500">Where your family originated from in India</p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="currentLocation">Current Location</Label>
          <Input
            id="currentLocation"
            placeholder="e.g., Toronto, New Jersey, London"
            value={context.currentLocation || ''}
            onChange={(e) => setContext({...context, currentLocation: e.target.value})}
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="culturalIdentity">Cultural Identity</Label>
          <Input
            id="culturalIdentity"
            placeholder="e.g., Gujarati, Indo-Canadian, Punjabi-American"
            value={context.culturalIdentity || ''}
            onChange={(e) => setContext({...context, culturalIdentity: e.target.value})}
          />
        </div>

        <div className="space-y-3">
          <Label>Family Elders</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Dada, Nani, Uncle Raj"
              value={newElder}
              onChange={(e) => setNewElder(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addElder()}
            />
            <Button type="button" onClick={addElder} variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {context.familyElders?.map((elder, index) => (
              <div key={index} className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-md">
                <span className="text-sm">{elder}</span>
                <button 
                  onClick={() => removeElder(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Family Traditions</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Diwali puja, Garba, special thali recipe"
              value={newTradition}
              onChange={(e) => setNewTradition(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTradition()}
            />
            <Button type="button" onClick={addTradition} variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {context.traditions?.map((tradition, index) => (
              <div key={index} className="flex items-center gap-1 bg-teal-100 px-2 py-1 rounded-md">
                <span className="text-sm">{tradition}</span>
                <button 
                  onClick={() => removeTradition(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Hobbies & Interests</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Cricket, Cooking, Music"
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHobby()}
            />
            <Button type="button" onClick={addHobby} variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {context.hobbies?.map((hobby, index) => (
              <div key={index} className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-md">
                <span className="text-sm">{hobby}</span>
                <button 
                  onClick={() => removeHobby(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700">
          Save Family Context
        </Button>
      </CardFooter>
    </Card>
  );
};
