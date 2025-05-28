
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VoiceRecordingButton } from '@/components/voice/VoiceRecordingButton';
import { ResponsiveFamilyTree } from '@/components/family/ResponsiveFamilyTree';
import { MemoryCapsule } from '@/components/memory/MemoryCapslule';
import { AccessibleButton } from '@/components/foundation/AccessibleButton';
import { useFamilyContext } from '@/contexts/FamilyContext';
import { useCultureContext } from '@/contexts/CultureContext';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';
import { Settings, Plus, Mic } from 'lucide-react';

const Foundation = () => {
  const { members, addMember } = useFamilyContext();
  const { settings: cultureSettings, updateSettings } = useCultureContext();
  const { settings: a11ySettings, updateSettings: updateA11ySettings } = useAccessibilityContext();

  const handleAddSampleMembers = () => {
    const sampleMembers = [
      {
        name: 'Grandmother Kamala',
        relationships: [],
        stories: [
          {
            id: '1',
            title: 'Wedding Day Memories',
            type: 'audio' as const,
            tags: ['wedding', 'tradition', 'family'],
            createdAt: new Date().toISOString(),
          }
        ],
        metadata: {
          gender: 'female',
          culturalRole: 'Family Matriarch',
          birthDate: '1945-03-15',
        },
      },
      {
        name: 'Uncle Rajesh',
        relationships: [],
        stories: [],
        metadata: {
          gender: 'male',
          culturalRole: 'Storyteller',
          birthDate: '1965-07-20',
        },
      },
    ];

    sampleMembers.forEach(member => addMember(member));
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Vaya Foundation</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A flexible, extensible foundation for voice-first family storytelling. 
          Built with accessibility, cultural adaptation, and rapid experimentation in mind.
        </p>
      </div>

      {/* Quick Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Foundation Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          {/* Accessibility Settings */}
          <div className="space-y-3">
            <h3 className="font-semibold">Accessibility</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={a11ySettings.highContrast}
                  onChange={(e) => updateA11ySettings({ highContrast: e.target.checked })}
                />
                <span>High Contrast</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={a11ySettings.largeText}
                  onChange={(e) => updateA11ySettings({ largeText: e.target.checked })}
                />
                <span>Large Text</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={a11ySettings.reducedMotion}
                  onChange={(e) => updateA11ySettings({ reducedMotion: e.target.checked })}
                />
                <span>Reduced Motion</span>
              </label>
            </div>
          </div>

          {/* Cultural Settings */}
          <div className="space-y-3">
            <h3 className="font-semibold">Cultural Adaptation</h3>
            <div className="space-y-2">
              <label className="block">
                <span className="text-sm">Language</span>
                <select
                  value={cultureSettings.language}
                  onChange={(e) => updateSettings({ 
                    language: e.target.value as 'en' | 'hi' | 'gu' | 'auto' 
                  })}
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="gu">Gujarati</option>
                  <option value="auto">Auto-detect</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm">Visual Style</span>
                <select
                  value={cultureSettings.visualStyle}
                  onChange={(e) => updateSettings({ 
                    visualStyle: e.target.value as 'modern' | 'traditional' | 'minimal' 
                  })}
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
                >
                  <option value="modern">Modern</option>
                  <option value="traditional">Traditional</option>
                  <option value="minimal">Minimal</option>
                </select>
              </label>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <AccessibleButton 
                onClick={handleAddSampleMembers}
                className="w-full justify-start"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Sample Family
              </AccessibleButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice Recording Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="h-5 w-5" />
            <span>Voice Recording System</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <VoiceRecordingButton
            onRecordingComplete={(blob) => {
              console.log('Recording completed:', blob);
            }}
          />
        </CardContent>
      </Card>

      {/* Family Tree Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Family Tree</CardTitle>
          <p className="text-sm text-gray-600">
            Cultural glyphs: {cultureSettings.glyphSystem.male} Male, {cultureSettings.glyphSystem.female} Female, {cultureSettings.glyphSystem.nonBinary} Non-binary
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveFamilyTree />
        </CardContent>
      </Card>

      {/* Memory Capsules Demo */}
      {members.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Memory Capsules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {members.map((member) =>
              member.stories.map((story) => (
                <MemoryCapsule
                  key={story.id}
                  story={story}
                  memberId={member.id}
                  onPlay={() => console.log('Playing story:', story.id)}
                  onShare={() => console.log('Sharing story:', story.id)}
                  onLike={() => console.log('Liking story:', story.id)}
                />
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Foundation;
