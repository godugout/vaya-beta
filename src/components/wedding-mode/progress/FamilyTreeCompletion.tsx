
import React from 'react';
import { useWeddingMode } from '../WeddingModeProvider';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { TreeDeciduous, GitBranch, Plus, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TreeNodeProps {
  depth: number;
  maxDepth: number;
  maxSiblings: number;
  completionPercentage: number;
  theme: 'classic' | 'modern' | 'rustic';
  progress: number;
}

interface FamilyTreeCompletionProps {
  completionPercentage?: number;
  treeDepth?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ 
  depth, 
  maxDepth, 
  maxSiblings,
  completionPercentage,
  theme,
  progress
}) => {
  if (depth >= maxDepth) return null;
  
  const themeColors = {
    classic: {
      nodeComplete: 'bg-autumn text-white',
      nodeIncomplete: 'bg-gray-200 text-gray-400',
      branchComplete: 'bg-autumn/60',
      branchIncomplete: 'bg-gray-200',
    },
    modern: {
      nodeComplete: 'bg-water text-white',
      nodeIncomplete: 'bg-gray-200 text-gray-400',
      branchComplete: 'bg-water/60',
      branchIncomplete: 'bg-gray-200',
    },
    rustic: {
      nodeComplete: 'bg-forest text-white',
      nodeIncomplete: 'bg-gray-200 text-gray-400',
      branchComplete: 'bg-forest/60',
      branchIncomplete: 'bg-gray-200',
    }
  };
  
  const colors = themeColors[theme];
  
  // Calculate how many siblings to show based on depth
  const siblingCount = maxSiblings - depth;
  
  // Calculate which nodes should be complete based on progress
  const calculateNodeStatus = (index: number) => {
    const threshold = (progress / 100) * siblingCount;
    return index < threshold;
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-1 md:space-x-3">
        {Array.from({ length: siblingCount }).map((_, i) => {
          const isComplete = calculateNodeStatus(i);
          return (
            <div key={i} className="flex flex-col items-center">
              <motion.div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shadow-sm",
                  isComplete ? colors.nodeComplete : colors.nodeIncomplete
                )}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i + 0.1 * depth }}
              >
                {isComplete ? <GitBranch size={16} /> : <Plus size={16} />}
              </motion.div>
              
              {depth < maxDepth - 1 && (
                <>
                  <motion.div 
                    className={cn(
                      "h-10 w-0.5 my-1",
                      isComplete ? colors.branchComplete : colors.branchIncomplete
                    )}
                    initial={{ height: 0 }}
                    animate={{ height: 40 }}
                    transition={{ delay: 0.1 * i + 0.2 * depth }}
                  />
                  <TreeNode 
                    depth={depth + 1} 
                    maxDepth={maxDepth} 
                    maxSiblings={maxSiblings}
                    completionPercentage={completionPercentage}
                    theme={theme}
                    progress={Math.max(0, progress - 25 * (i + 1))}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const FamilyTreeCompletion: React.FC<FamilyTreeCompletionProps> = ({
  completionPercentage = 65,
  treeDepth = 3
}) => {
  const { theme } = useWeddingMode();
  
  const themeStyles = {
    classic: {
      accent: 'text-autumn',
      button: 'autumn',
      border: 'border-autumn',
    },
    modern: {
      accent: 'text-water',
      button: 'water',
      border: 'border-water',
    },
    rustic: {
      accent: 'text-forest',
      button: 'forest',
      border: 'border-forest',
    }
  };
  
  const currentTheme = themeStyles[theme];
  
  return (
    <div className="p-6">
      <AnimatedContainer variant="fade" className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <TreeDeciduous size={40} className={cn("mx-auto mb-2", currentTheme.accent)} />
          <h2 className="text-3xl font-heading font-bold">Family Tree</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress in completing your family tree
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-8">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0] 
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                <TreeDeciduous size={40} className={currentTheme.accent} />
              </motion.div>
            </div>
            
            <div className="overflow-x-auto w-full pb-4">
              <div className="min-w-[600px]">
                <TreeNode 
                  depth={0} 
                  maxDepth={treeDepth} 
                  maxSiblings={4}
                  completionPercentage={completionPercentage}
                  theme={theme}
                  progress={completionPercentage}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatedContainer variant="fade" delay={0.3} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-medium mb-4">Tree Completion Status</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Completion</span>
                  <span className="font-medium">{completionPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={cn("h-full", theme === 'classic' ? 'bg-autumn' : theme === 'modern' ? 'bg-water' : 'bg-forest')}
                    initial={{ width: '0%' }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Paternal Side</span>
                  <span className="font-medium">80%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={cn("h-full", theme === 'classic' ? 'bg-autumn' : theme === 'modern' ? 'bg-water' : 'bg-forest')}
                    initial={{ width: '0%' }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Maternal Side</span>
                  <span className="font-medium">50%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={cn("h-full", theme === 'classic' ? 'bg-autumn' : theme === 'modern' ? 'bg-water' : 'bg-forest')}
                    initial={{ width: '0%' }}
                    animate={{ width: '50%' }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
              </div>
            </div>
          </AnimatedContainer>
          
          <AnimatedContainer variant="fade" delay={0.4} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-medium mb-4">Achievements</h3>
            
            <div className="space-y-4">
              <div className={cn(
                "p-3 rounded-lg border flex items-center",
                currentTheme.border
              )}>
                <Award size={24} className={currentTheme.accent} />
                <div className="ml-3">
                  <h4 className="font-medium">Family Historian</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Added 10+ family members
                  </p>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border border-dashed flex items-center">
                <Award size={24} className="text-gray-400" />
                <div className="ml-3">
                  <h4 className="font-medium text-gray-600">Ancestral Explorer</h4>
                  <p className="text-sm text-gray-500">
                    Complete 3 generations of ancestors
                  </p>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border border-dashed flex items-center">
                <Award size={24} className="text-gray-400" />
                <div className="ml-3">
                  <h4 className="font-medium text-gray-600">Legendary Lineage</h4>
                  <p className="text-sm text-gray-500">
                    Complete your entire family tree
                  </p>
                </div>
              </div>
            </div>
            
            <Button variant={currentTheme.button} className="w-full mt-4">
              Add Family Members
            </Button>
          </AnimatedContainer>
        </div>
      </AnimatedContainer>
    </div>
  );
};
