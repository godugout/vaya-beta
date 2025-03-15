
import React from 'react';
import { Trophy, Star, CheckCheck, Users, BookOpen, Camera, Mic } from 'lucide-react';
import { useWeddingMode } from '../WeddingModeProvider';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FamilyMember {
  id: string;
  name: string;
  avatar?: string;
  contribution: number;
  activities: {
    stories: number;
    photos: number;
    recordings: number;
  };
}

interface FamilyParticipationDashboardProps {
  familyMembers?: FamilyMember[];
  familyProgress?: number;
  totalStories?: number;
  achievementUnlocked?: boolean;
}

export const FamilyParticipationDashboard: React.FC<FamilyParticipationDashboardProps> = ({
  familyMembers = [],
  familyProgress = 65,
  totalStories = 24,
  achievementUnlocked = true
}) => {
  const { theme } = useWeddingMode();
  
  // Mock data if no family members are provided
  const defaultFamilyMembers: FamilyMember[] = [
    {
      id: '1',
      name: 'Grandma Patel',
      contribution: 85,
      activities: { stories: 5, photos: 12, recordings: 3 }
    },
    {
      id: '2',
      name: 'Uncle Ravi',
      contribution: 70,
      activities: { stories: 3, photos: 8, recordings: 2 }
    },
    {
      id: '3',
      name: 'Cousin Ananya',
      contribution: 50,
      activities: { stories: 2, photos: 4, recordings: 1 }
    },
    {
      id: '4',
      name: 'Brother Jay',
      contribution: 30,
      activities: { stories: 1, photos: 2, recordings: 0 }
    },
  ];
  
  const allFamilyMembers = familyMembers.length > 0 ? familyMembers : defaultFamilyMembers;
  
  const themeStyles = {
    classic: {
      accent: 'text-autumn',
      button: 'autumn',
      progressBg: 'bg-autumn',
      badgeBg: 'bg-autumn/10',
      badgeText: 'text-autumn',
    },
    modern: {
      accent: 'text-water',
      button: 'water',
      progressBg: 'bg-water',
      badgeBg: 'bg-water/10',
      badgeText: 'text-water',
    },
    rustic: {
      accent: 'text-forest',
      button: 'forest',
      progressBg: 'bg-forest',
      badgeBg: 'bg-forest/10',
      badgeText: 'text-forest',
    }
  };
  
  const currentTheme = themeStyles[theme];
  
  const getProgressColor = (percentage: number) => {
    if (percentage < 40) return 'bg-gray-300';
    if (percentage < 70) return 'bg-blue-400';
    return currentTheme.progressBg;
  };
  
  return (
    <div className="p-6">
      <AnimatedContainer variant="fade" className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <Trophy size={40} className={cn("mx-auto mb-2", currentTheme.accent)} />
          <h2 className="text-3xl font-heading font-bold">Family Participation</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track how your family is contributing to preserving memories
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <AnimatedContainer variant="fade" delay={0.1}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen size={18} className="mr-2" /> 
                  Stories Collected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalStories}</div>
                <Progress 
                  value={75} 
                  className="h-2 mt-2" 
                  // @ts-ignore - custom class
                  indicatorClassName={currentTheme.progressBg}
                />
                <p className="text-sm text-gray-500 mt-2">Goal: 32 stories</p>
              </CardContent>
            </Card>
          </AnimatedContainer>
          
          <AnimatedContainer variant="fade" delay={0.2}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Camera size={18} className="mr-2" /> 
                  Photos Shared
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">48</div>
                <Progress 
                  value={90} 
                  className="h-2 mt-2"
                  // @ts-ignore - custom class
                  indicatorClassName={currentTheme.progressBg}
                />
                <p className="text-sm text-gray-500 mt-2">Goal: 50 photos</p>
              </CardContent>
            </Card>
          </AnimatedContainer>
          
          <AnimatedContainer variant="fade" delay={0.3}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Mic size={18} className="mr-2" /> 
                  Voice Recordings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <Progress 
                  value={40} 
                  className="h-2 mt-2"
                  // @ts-ignore - custom class
                  indicatorClassName={currentTheme.progressBg}
                />
                <p className="text-sm text-gray-500 mt-2">Goal: 30 recordings</p>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>
        
        {achievementUnlocked && (
          <AnimatedContainer 
            variant="scale" 
            className={cn(
              "mb-8 p-6 rounded-lg text-center relative overflow-hidden",
              currentTheme.badgeBg
            )}
          >
            <div className="relative z-10">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Star size={40} className={cn("mx-auto mb-2", currentTheme.accent)} />
                <h3 className="text-xl font-medium mb-2">Achievement Unlocked!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your family has collected over 20 stories about the couple
                </p>
                
                <div className={cn(
                  "inline-block px-4 py-2 rounded-full",
                  currentTheme.badgeText,
                  "border border-current"
                )}>
                  <div className="flex items-center gap-2">
                    <Trophy size={16} />
                    <span className="font-medium">Memory Keeper</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ 
                    x: Math.random() * 100 - 50 + "%", 
                    y: Math.random() * 100 - 50 + "%",
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{ 
                    opacity: [0, 0.7, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 3 + Math.random() * 3,
                    delay: Math.random() * 5,
                  }}
                >
                  <Star size={Math.random() * 20 + 10} className={currentTheme.accent} />
                </motion.div>
              ))}
            </div>
          </AnimatedContainer>
        )}
        
        <AnimatedContainer variant="fade" delay={0.4}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users size={20} className="mr-2" /> 
                Family Participation Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allFamilyMembers.map((member, index) => (
                  <div key={member.id} className="flex items-center">
                    <div className="w-8 text-gray-500 text-sm">{index + 1}</div>
                    <Avatar className="mr-3">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className={cn(
                        index === 0 ? "bg-yellow-500" : 
                        index === 1 ? "bg-gray-400" : 
                        index === 2 ? "bg-amber-700" : "bg-gray-200",
                        "text-white"
                      )}>
                        {member.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{member.name}</span>
                        <span className="text-sm">{member.contribution}%</span>
                      </div>
                      <Progress 
                        value={member.contribution} 
                        className="h-2"
                        // @ts-ignore - custom class
                        indicatorClassName={getProgressColor(member.contribution)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <div className="flex justify-between border-t pt-4">
                  <div>Overall Family Participation:</div>
                  <div className="font-medium">{familyProgress}%</div>
                </div>
                <Progress 
                  value={familyProgress} 
                  className="h-1 mt-2"
                  // @ts-ignore - custom class
                  indicatorClassName={currentTheme.progressBg}
                />
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>
      </AnimatedContainer>
    </div>
  );
};
