
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Lightbulb, Heart, Sparkles, RefreshCw } from 'lucide-react';
import { useFamilyContext } from '@/contexts/FamilyContext';
import { useCultureContext } from '@/contexts/CultureContext';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';
import { AccessibleButton } from '@/components/foundation/AccessibleButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ContextualStoryAssistantProps {
  className?: string;
  onPromptSelect?: (prompt: string) => void;
}

interface StoryPrompt {
  id: string;
  category: 'memory' | 'tradition' | 'relationship' | 'milestone' | 'wisdom';
  prompt: string;
  followUp?: string;
  culturalContext?: string;
}

export const ContextualStoryAssistant = ({ 
  className, 
  onPromptSelect 
}: ContextualStoryAssistantProps) => {
  const { selectedMember, members } = useFamilyContext();
  const { settings: cultureSettings } = useCultureContext();
  const { getTextSizeClass, announceToScreenReader } = useAccessibilityContext();
  
  const [currentPrompts, setCurrentPrompts] = useState<StoryPrompt[]>([]);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Base prompts that adapt to context
  const basePrompts: StoryPrompt[] = [
    {
      id: 'childhood',
      category: 'memory',
      prompt: "Tell me about your favorite childhood memory.",
      followUp: "What made that moment so special to you?"
    },
    {
      id: 'tradition',
      category: 'tradition',
      prompt: "What's a family tradition that means a lot to you?",
      followUp: "How did this tradition start in your family?"
    },
    {
      id: 'wisdom',
      category: 'wisdom',
      prompt: "What's the best advice you've ever received?",
      followUp: "How has this advice shaped your life?"
    },
    {
      id: 'milestone',
      category: 'milestone',
      prompt: "Tell me about a moment when you felt really proud.",
      followUp: "What did you learn about yourself in that moment?"
    },
    {
      id: 'relationship',
      category: 'relationship',
      prompt: "Describe someone who has been important in your life.",
      followUp: "What did they teach you or how did they change you?"
    }
  ];

  // Generate contextual prompts based on selected family member
  const generateContextualPrompts = () => {
    setIsGenerating(true);
    
    let contextualPrompts = [...basePrompts];
    
    if (selectedMember) {
      const memberName = selectedMember.name;
      const memberRole = selectedMember.metadata.culturalRole;
      const existingStories = selectedMember.stories;
      
      // Add prompts specific to the selected member
      if (memberRole) {
        contextualPrompts.push({
          id: 'role-specific',
          category: 'tradition',
          prompt: `Tell me about your role as ${memberRole} in the family.`,
          followUp: "What responsibilities or joys come with this role?"
        });
      }
      
      // Add relationship-specific prompts
      if (members.length > 1) {
        const otherMembers = members.filter(m => m.id !== selectedMember.id);
        const randomMember = otherMembers[Math.floor(Math.random() * otherMembers.length)];
        
        contextualPrompts.push({
          id: 'relationship-specific',
          category: 'relationship',
          prompt: `Tell me about your relationship with ${randomMember.name}.`,
          followUp: "What's your favorite memory together?"
        });
      }
      
      // Avoid repeating story themes
      const existingTags = existingStories.flatMap(story => story.tags);
      if (!existingTags.includes('wedding') && !existingTags.includes('marriage')) {
        contextualPrompts.push({
          id: 'wedding',
          category: 'milestone',
          prompt: "Tell me about your wedding day or a memorable wedding you attended.",
          followUp: "What made that celebration special?"
        });
      }
    }
    
    // Cultural adaptations based on settings
    if (cultureSettings.language === 'hi' || cultureSettings.language === 'gu') {
      contextualPrompts.push({
        id: 'festivals',
        category: 'tradition',
        prompt: "Tell me about your favorite festival celebration.",
        followUp: "What traditions make this festival special for your family?",
        culturalContext: "South Asian festivals"
      });
    }
    
    // Shuffle and select 3-4 prompts
    const shuffled = contextualPrompts.sort(() => Math.random() - 0.5);
    setCurrentPrompts(shuffled.slice(0, 4));
    
    setTimeout(() => setIsGenerating(false), 800);
  };

  useEffect(() => {
    generateContextualPrompts();
  }, [selectedMember, members, cultureSettings]);

  const handlePromptSelect = (prompt: StoryPrompt) => {
    setConversationHistory(prev => [...prev, prompt.prompt]);
    onPromptSelect?.(prompt.prompt);
    announceToScreenReader(`Selected prompt: ${prompt.prompt}`);
  };

  const getCategoryIcon = (category: StoryPrompt['category']) => {
    switch (category) {
      case 'memory': return '💭';
      case 'tradition': return '🎉';
      case 'relationship': return '💝';
      case 'milestone': return '🏆';
      case 'wisdom': return '🧠';
      default: return '✨';
    }
  };

  const getCategoryColor = (category: StoryPrompt['category']) => {
    switch (category) {
      case 'memory': return 'bg-blue-100 text-blue-800';
      case 'tradition': return 'bg-purple-100 text-purple-800';
      case 'relationship': return 'bg-pink-100 text-pink-800';
      case 'milestone': return 'bg-yellow-100 text-yellow-800';
      case 'wisdom': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className={cn('flex items-center space-x-2', getTextSizeClass())}>
          <Sparkles className="h-5 w-5 text-purple-600" />
          <span>Story Inspiration</span>
          {selectedMember && (
            <Badge variant="outline" className="ml-2">
              for {selectedMember.name}
            </Badge>
          )}
        </CardTitle>
        <p className="text-sm text-gray-600">
          {selectedMember 
            ? `Personalized prompts to help ${selectedMember.name} share their stories`
            : 'Choose a family member to get personalized story prompts'
          }
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        
        {/* Generate New Prompts Button */}
        <div className="flex justify-between items-center">
          <AccessibleButton
            variant="outline"
            size="sm"
            onClick={generateContextualPrompts}
            disabled={isGenerating}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={cn('h-4 w-4', isGenerating && 'animate-spin')} />
            <span>New Prompts</span>
          </AccessibleButton>
          
          {conversationHistory.length > 0 && (
            <div className="text-xs text-gray-500">
              {conversationHistory.length} prompts used
            </div>
          )}
        </div>
        
        {/* Story Prompts */}
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-8"
              >
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </motion.div>
                  <span className="text-gray-600">Generating personalized prompts...</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="prompts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {currentPrompts.map((prompt, index) => (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AccessibleButton
                      variant="outline"
                      className={cn(
                        'w-full text-left p-4 h-auto border-2 hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200',
                        getTextSizeClass()
                      )}
                      onClick={() => handlePromptSelect(prompt)}
                      ariaLabel={`Story prompt: ${prompt.prompt}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl flex-shrink-0 mt-1">
                          {getCategoryIcon(prompt.category)}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="font-medium text-gray-900">
                            {prompt.prompt}
                          </div>
                          {prompt.followUp && (
                            <div className="text-sm text-gray-600 italic">
                              Follow-up: {prompt.followUp}
                            </div>
                          )}
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant="secondary" 
                              className={cn('text-xs', getCategoryColor(prompt.category))}
                            >
                              {prompt.category}
                            </Badge>
                            {prompt.culturalContext && (
                              <Badge variant="outline" className="text-xs">
                                {prompt.culturalContext}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </AccessibleButton>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Encouragement Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100"
        >
          <Heart className="h-5 w-5 text-purple-600 mx-auto mb-2" />
          <p className="text-sm text-gray-700">
            Every story you share becomes a precious gift for future generations. 
            Take your time and speak from the heart.
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};
