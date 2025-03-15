import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Vault, Lock, Key, EyeOff, Shield, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useWeddingMode } from '../WeddingModeProvider';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnjanaeyaVaultProps {
  hasAccess?: boolean;
  onAccessAttempt?: (passcode: string) => Promise<boolean>;
}

export const AnjanaeyaVault: React.FC<AnjanaeyaVaultProps> = ({
  hasAccess = false,
  onAccessAttempt
}) => {
  const { theme } = useWeddingMode();
  const [passcode, setPasscode] = useState('');
  const [accessStatus, setAccessStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [vaultOpen, setVaultOpen] = useState(hasAccess);
  const [securitySteps, setSecuritySteps] = useState(1);
  
  const themeStyles = {
    classic: {
      accent: 'text-autumn',
      button: 'autumn' as const,
      bgAccent: 'bg-autumn',
      borderAccent: 'border-autumn',
    },
    modern: {
      accent: 'text-water',
      button: 'water' as const,
      bgAccent: 'bg-water',
      borderAccent: 'border-water',
    },
    rustic: {
      accent: 'text-forest',
      button: 'forest' as const,
      bgAccent: 'bg-forest',
      borderAccent: 'border-forest',
    }
  };
  
  const currentTheme = themeStyles[theme];
  
  const handleAccessAttempt = async () => {
    if (!passcode) return;
    
    setAccessStatus('loading');
    
    if (onAccessAttempt) {
      const success = await onAccessAttempt(passcode);
      setAccessStatus(success ? 'success' : 'error');
      if (success) {
        setTimeout(() => {
          setSecuritySteps(2);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        setAccessStatus('success');
        setTimeout(() => {
          setSecuritySteps(2);
        }, 1000);
      }, 1500);
    }
  };
  
  const handleLocationVerify = () => {
    setSecuritySteps(3);
  };
  
  const handleFinalVerification = () => {
    setTimeout(() => {
      setVaultOpen(true);
    }, 1000);
  };
  
  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center">
      <AnimatedContainer variant="fade" className="max-w-md w-full mx-auto">
        <div className="mb-8 text-center">
          <Vault size={40} className={cn("mx-auto mb-2", currentTheme.accent)} />
          <h2 className="text-3xl font-heading font-bold">Family Vault</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Secure access to your family's treasured memories
          </p>
        </div>
        
        {vaultOpen ? (
          <VaultContents theme={theme} />
        ) : (
          <Card className="p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full">
              <Progress value={securitySteps * 33} className="rounded-none h-1.5" />
            </div>
            
            <div className="pt-6">
              {securitySteps === 1 && (
                <AnimatedContainer variant="fade" className="text-center py-4">
                  <Lock size={40} className={`mx-auto mb-4 ${currentTheme.accent}`} />
                  <h3 className="text-xl font-medium mb-6">Enter Anjanaeya Vault Passcode</h3>
                  
                  <div className="space-y-4">
                    <Input
                      type="password"
                      placeholder="Enter your family passcode"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="text-center text-lg tracking-[0.5em]"
                      maxLength={6}
                    />
                    
                    {accessStatus === 'error' && (
                      <p className="text-red-500 text-sm">Incorrect passcode. Please try again.</p>
                    )}
                    
                    <Button 
                      variant={currentTheme.button}
                      className="w-full"
                      onClick={handleAccessAttempt}
                      disabled={accessStatus === 'loading' || !passcode}
                    >
                      {accessStatus === 'loading' ? 'Verifying...' : 'Verify Passcode'}
                    </Button>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                      The passcode was provided to you by the family elders.
                    </p>
                  </div>
                </AnimatedContainer>
              )}
              
              {securitySteps === 2 && (
                <AnimatedContainer variant="fade" className="text-center py-4">
                  <Shield size={40} className={`mx-auto mb-4 ${currentTheme.accent}`} />
                  <h3 className="text-xl font-medium mb-2">Verify Your Location</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    The vault can only be accessed at specific sacred locations
                  </p>
                  
                  <div className="border rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Current Location:</span>
                      <span className="text-sm font-medium">Wedding Venue</span>
                    </div>
                    <div className="mt-4 flex items-center">
                      <motion.div 
                        className={`w-4 h-4 rounded-full ${currentTheme.bgAccent}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                      <span className="ml-2 text-sm">Location matches a sacred site</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant={currentTheme.button}
                    className="w-full"
                    onClick={handleLocationVerify}
                  >
                    Confirm Location Verification
                  </Button>
                </AnimatedContainer>
              )}
              
              {securitySteps === 3 && (
                <AnimatedContainer variant="fade" className="text-center py-4">
                  <Key size={40} className={`mx-auto mb-4 ${currentTheme.accent}`} />
                  <h3 className="text-xl font-medium mb-2">Final Verification</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Complete the family phrase to access the vault
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className={`p-3 rounded border ${currentTheme.borderAccent}`}>
                      <span className="text-lg">उत्तम</span>
                      <div className="text-xs text-gray-500">Uttama</div>
                    </div>
                    <div className={`p-3 rounded border ${currentTheme.borderAccent}`}>
                      <span className="text-lg">प्रेम</span>
                      <div className="text-xs text-gray-500">Prema</div>
                    </div>
                    <div className="p-3 rounded border border-dashed">
                      <Input placeholder="?" className="h-7 min-h-7 p-0 text-center border-0" />
                    </div>
                  </div>
                  
                  <Button 
                    variant={currentTheme.button}
                    className="w-full"
                    onClick={handleFinalVerification}
                  >
                    Open Anjanaeya Vault
                  </Button>
                </AnimatedContainer>
              )}
            </div>
          </Card>
        )}
      </AnimatedContainer>
    </div>
  );
};

interface VaultContentsProps {
  theme: 'classic' | 'modern' | 'rustic';
}

const VaultContents: React.FC<VaultContentsProps> = ({ theme }) => {
  const themeStyles = {
    classic: {
      accent: 'text-autumn',
      button: 'autumn' as const,
      bgAccent: 'bg-autumn/10',
    },
    modern: {
      accent: 'text-water',
      button: 'water' as const,
      bgAccent: 'bg-water/10',
    },
    rustic: {
      accent: 'text-forest',
      button: 'forest' as const,
      bgAccent: 'bg-forest/10',
    }
  };
  
  const currentTheme = themeStyles[theme];
  
  return (
    <AnimatedContainer variant="scale" className="space-y-6">
      <div className={cn("p-6 rounded-lg text-center", currentTheme.bgAccent)}>
        <AnimatedContainer variant="fade">
          <h3 className="text-xl font-medium mb-2">Vault Unlocked</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You now have access to the family's treasured memories and sacred knowledge
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="text-center">
              <div className="rounded-lg border p-4 h-32 flex items-center justify-center bg-white dark:bg-gray-800">
                <EyeOff size={32} className={currentTheme.accent} />
              </div>
              <p className="mt-2 text-sm font-medium">Family Secrets</p>
            </div>
            <div className="text-center">
              <div className="rounded-lg border p-4 h-32 flex items-center justify-center bg-white dark:bg-gray-800">
                <Share2 size={32} className={currentTheme.accent} />
              </div>
              <p className="mt-2 text-sm font-medium">Legacy Transfer</p>
            </div>
          </div>
          
          <Button variant={currentTheme.button} className="mt-6">
            Explore Family Legacy
          </Button>
        </AnimatedContainer>
      </div>
    </AnimatedContainer>
  );
};
