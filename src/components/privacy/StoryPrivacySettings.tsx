
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Globe, 
  Users, 
  UserCheck, 
  Eye, 
  EyeOff, 
  Share2,
  Settings,
  ChevronDown,
  Plus,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

type PrivacyLevel = 'private' | 'family' | 'selected' | 'public';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  avatar?: string;
}

interface PrivacySettings {
  level: PrivacyLevel;
  allowedMembers: string[];
  allowComments: boolean;
  allowDownload: boolean;
  allowSharing: boolean;
  expiresAt?: Date;
}

interface StoryPrivacySettingsProps {
  storyId: string;
  currentSettings: PrivacySettings;
  familyMembers: FamilyMember[];
  onSettingsChange: (settings: PrivacySettings) => void;
  onGenerateShareLink?: () => string;
  className?: string;
}

export const StoryPrivacySettings = ({
  storyId,
  currentSettings,
  familyMembers,
  onSettingsChange,
  onGenerateShareLink,
  className
}: StoryPrivacySettingsProps) => {
  const { getTextSizeClass, getTouchTargetClass } = useAccessibilityContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [shareLink, setShareLink] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<string>('');

  const privacyLevels = [
    {
      value: 'private' as PrivacyLevel,
      label: 'Private',
      description: 'Only you can see this story',
      icon: Lock,
      color: 'text-red-600'
    },
    {
      value: 'family' as PrivacyLevel,
      label: 'Family Only',
      description: 'All family members can see this story',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      value: 'selected' as PrivacyLevel,
      label: 'Selected Members',
      description: 'Only chosen family members can see this story',
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      value: 'public' as PrivacyLevel,
      label: 'Public',
      description: 'Anyone with the link can see this story',
      icon: Globe,
      color: 'text-purple-600'
    }
  ];

  const currentLevel = privacyLevels.find(level => level.value === currentSettings.level);

  const handleLevelChange = (level: PrivacyLevel) => {
    onSettingsChange({
      ...currentSettings,
      level,
      allowedMembers: level === 'family' ? familyMembers.map(m => m.id) : 
                     level === 'private' ? [] :
                     currentSettings.allowedMembers
    });
  };

  const addMember = () => {
    if (selectedMember && !currentSettings.allowedMembers.includes(selectedMember)) {
      onSettingsChange({
        ...currentSettings,
        allowedMembers: [...currentSettings.allowedMembers, selectedMember]
      });
      setSelectedMember('');
    }
  };

  const removeMember = (memberId: string) => {
    onSettingsChange({
      ...currentSettings,
      allowedMembers: currentSettings.allowedMembers.filter(id => id !== memberId)
    });
  };

  const generateShareLink = () => {
    if (onGenerateShareLink) {
      const link = onGenerateShareLink();
      setShareLink(link);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-4">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <CardTitle className={cn('flex items-center space-x-2', getTextSizeClass())}>
            <Settings className="h-5 w-5" />
            <span>Privacy & Sharing</span>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            {currentLevel && (
              <Badge 
                variant="outline" 
                className={cn('flex items-center space-x-1', currentLevel.color)}
              >
                <currentLevel.icon className="h-3 w-3" />
                <span>{currentLevel.label}</span>
              </Badge>
            )}
            
            <ChevronDown 
              className={cn(
                'h-4 w-4 transition-transform',
                isExpanded && 'rotate-180'
              )} 
            />
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <CardContent className="space-y-6">
              
              {/* Privacy Level Selection */}
              <div className="space-y-3">
                <h4 className={cn('font-medium', getTextSizeClass())}>Who can see this story?</h4>
                
                <div className="grid gap-3">
                  {privacyLevels.map((level) => (
                    <Button
                      key={level.value}
                      variant={currentSettings.level === level.value ? 'default' : 'outline'}
                      className={cn(
                        'justify-start h-auto p-4 space-x-3',
                        getTouchTargetClass()
                      )}
                      onClick={() => handleLevelChange(level.value)}
                    >
                      <level.icon className={cn('h-5 w-5', level.color)} />
                      <div className="text-left">
                        <div className="font-medium">{level.label}</div>
                        <div className="text-sm text-gray-500">{level.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Selected Members (when privacy level is 'selected') */}
              {currentSettings.level === 'selected' && (
                <div className="space-y-3">
                  <h4 className={cn('font-medium', getTextSizeClass())}>
                    Selected Family Members ({currentSettings.allowedMembers.length})
                  </h4>
                  
                  {/* Add Member */}
                  <div className="flex space-x-2">
                    <Select value={selectedMember} onValueChange={setSelectedMember}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Choose a family member" />
                      </SelectTrigger>
                      <SelectContent>
                        {familyMembers
                          .filter(member => !currentSettings.allowedMembers.includes(member.id))
                          .map(member => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name} ({member.relationship})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      onClick={addMember} 
                      disabled={!selectedMember}
                      size="icon"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Selected Members List */}
                  <div className="space-y-2">
                    {currentSettings.allowedMembers.map(memberId => {
                      const member = familyMembers.find(m => m.id === memberId);
                      if (!member) return null;
                      
                      return (
                        <div 
                          key={memberId}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <div>
                            <span className="font-medium">{member.name}</span>
                            <span className="text-sm text-gray-500 ml-2">
                              ({member.relationship})
                            </span>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMember(memberId)}
                            className="h-8 w-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Permissions */}
              <div className="space-y-4">
                <h4 className={cn('font-medium', getTextSizeClass())}>Permissions</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Allow Comments</div>
                      <div className="text-sm text-gray-500">
                        Let others add comments to this story
                      </div>
                    </div>
                    <Switch
                      checked={currentSettings.allowComments}
                      onCheckedChange={(checked) => 
                        onSettingsChange({ ...currentSettings, allowComments: checked })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Allow Download</div>
                      <div className="text-sm text-gray-500">
                        Let others download this story
                      </div>
                    </div>
                    <Switch
                      checked={currentSettings.allowDownload}
                      onCheckedChange={(checked) => 
                        onSettingsChange({ ...currentSettings, allowDownload: checked })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Allow Sharing</div>
                      <div className="text-sm text-gray-500">
                        Let others share this story with others
                      </div>
                    </div>
                    <Switch
                      checked={currentSettings.allowSharing}
                      onCheckedChange={(checked) => 
                        onSettingsChange({ ...currentSettings, allowSharing: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Share Link Generation */}
              {currentSettings.level !== 'private' && onGenerateShareLink && (
                <div className="space-y-3">
                  <h4 className={cn('font-medium', getTextSizeClass())}>Share Link</h4>
                  
                  {!shareLink ? (
                    <Button
                      variant="outline"
                      onClick={generateShareLink}
                      className="w-full"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Generate Share Link
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <Input
                          value={shareLink}
                          readOnly
                          className="flex-1 font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          onClick={() => copyToClipboard(shareLink)}
                        >
                          Copy
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Anyone with this link can access the story based on your privacy settings.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
