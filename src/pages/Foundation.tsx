
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedVoiceRecorder } from '@/components/voice/EnhancedVoiceRecorder';
import { FlexibleFamilyTree } from '@/components/family/FlexibleFamilyTree';
import { AdvancedMemorySystem } from '@/components/memory/AdvancedMemorySystem';
import { ContextualStoryAssistant } from '@/components/ai/ContextualStoryAssistant';
import { AccessibleButton } from '@/components/foundation/AccessibleButton';
import { useFamilyContext } from '@/contexts/FamilyContext';
import { useCultureContext } from '@/contexts/CultureContext';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';
import { Settings, Plus, Mic, Users, BookOpen, Sparkles } from 'lucide-react';

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
            tags: ['wedding', 'tradition', 'family', 'celebration'],
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '2',
            title: 'Festival Preparations',
            type: 'audio' as const,
            tags: ['festival', 'cooking', 'tradition', 'family'],
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
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
        stories: [
          {
            id: '3',
            title: 'Business Stories',
            type: 'audio' as const,
            tags: ['career', 'wisdom', 'entrepreneurship'],
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          }
        ],
        metadata: {
          gender: 'male',
          culturalRole: 'Storyteller',
          birthDate: '1965-07-20',
        },
      },
      {
        name: 'Cousin Priya',
        relationships: [],
        stories: [],
        metadata: {
          gender: 'female',
          culturalRole: 'Bridge Between Generations',
          birthDate: '1990-12-03',
        },
      },
    ];

    sampleMembers.forEach(member => addMember(member));
  };

  const handleRecordingComplete = (audioBlob: Blob, transcription?: string) => {
    console.log('Recording completed:', audioBlob, transcription);
    // Here you would typically save the recording to your backend
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Vaya - Enhanced Foundation</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          A flexible, accessible family storytelling platform designed for inclusivity and user experience excellence. 
          Built with voice-first interactions, cultural adaptability, and multi-generational accessibility.
        </p>
      </div>

      {/* Accessibility & Settings Quick Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Foundation Settings & Accessibility</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          {/* Accessibility Settings */}
          <div className="space-y-3">
            <h3 className="font-semibold">Accessibility Features</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={a11ySettings.highContrast}
                  onChange={(e) => updateA11ySettings({ highContrast: e.target.checked })}
                  className="h-5 w-5"
                />
                <span>High Contrast Mode</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={a11ySettings.largeText}
                  onChange={(e) => updateA11ySettings({ largeText: e.target.checked })}
                  className="h-5 w-5"
                />
                <span>Large Text</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={a11ySettings.reducedMotion}
                  onChange={(e) => updateA11ySettings({ reducedMotion: e.target.checked })}
                  className="h-5 w-5"
                />
                <span>Reduced Motion</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={a11ySettings.voiceCommands}
                  onChange={(e) => updateA11ySettings({ voiceCommands: e.target.checked })}
                  className="h-5 w-5"
                />
                <span>Voice Commands</span>
              </label>
            </div>
          </div>

          {/* Cultural Settings */}
          <div className="space-y-3">
            <h3 className="font-semibold">Cultural Adaptation</h3>
            <div className="space-y-2">
              <label className="block">
                <span className="text-sm font-medium">Language</span>
                <select
                  value={cultureSettings.language}
                  onChange={(e) => updateSettings({ 
                    language: e.target.value as 'en' | 'hi' | 'gu' | 'auto' 
                  })}
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 min-h-[44px]"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="gu">Gujarati</option>
                  <option value="auto">Auto-detect</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium">Visual Style</span>
                <select
                  value={cultureSettings.visualStyle}
                  onChange={(e) => updateSettings({ 
                    visualStyle: e.target.value as 'modern' | 'traditional' | 'minimal' 
                  })}
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 min-h-[44px]"
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
              <div className="text-xs text-gray-500 mt-2">
                Touch targets: 60px+ • Voice commands enabled • Screen reader optimized
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Voice Recording System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="h-5 w-5" />
            <span>Enhanced Voice Recording System</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Large 80px recording button • Breathing animation • Voice commands • Visual feedback
          </p>
        </CardHeader>
        <CardContent>
          <EnhancedVoiceRecorder onRecordingComplete={handleRecordingComplete} />
        </CardContent>
      </Card>

      {/* Flexible Family Tree */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Flexible Family Tree</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Cultural glyphs: {cultureSettings.glyphSystem.male} Male • {cultureSettings.glyphSystem.female} Female • {cultureSettings.glyphSystem.nonBinary} Non-binary | 
            Story indicators • Responsive layouts • Search functionality
          </p>
        </CardHeader>
        <CardContent>
          <FlexibleFamilyTree />
        </CardContent>
      </Card>

      {/* Contextual Story Assistant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span>AI Story Assistant</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Contextual prompts • Cultural awareness • Family relationship understanding
          </p>
        </CardHeader>
        <CardContent>
          <ContextualStoryAssistant 
            onPromptSelect={(prompt) => console.log('Selected prompt:', prompt)}
          />
        </CardContent>
      </Card>

      {/* Advanced Memory System */}
      {members.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Advanced Memory Organization</span>
            </CardTitle>
            <p className="text-sm text-gray-600">
              Smart search • Flexible tagging • Timeline organization • Privacy controls
            </p>
          </CardHeader>
          <CardContent>
            <AdvancedMemorySystem />
          </CardContent>
        </Card>
      )}

      {/* Foundation Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Foundation Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">60px+</div>
              <div className="text-sm text-gray-600">Min Touch Targets</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">4.5:1</div>
              <div className="text-sm text-gray-600">Color Contrast</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{members.length}</div>
              <div className="text-sm text-gray-600">Family Members</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {members.reduce((acc, member) => acc + member.stories.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Stories Recorded</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Foundation;
