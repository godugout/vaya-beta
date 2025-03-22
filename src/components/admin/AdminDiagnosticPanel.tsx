
import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, ChevronRight, Bug, Clipboard, ClipboardCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { VayaCard } from '@/components/ui/vaya-card';
import { motion, AnimatePresence } from 'framer-motion';

export type DiagnosticItem = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'inProgress' | 'completed' | 'error';
  type: 'feature' | 'bug' | 'enhancement';
  route?: string;
  logs?: string[];
  createdAt: Date;
  updatedAt: Date;
};

interface AdminDiagnosticPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDiagnosticPanel: React.FC<AdminDiagnosticPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'bugs' | 'features' | 'routes'>('bugs');
  const [routeStatus, setRouteStatus] = useState<Record<string, boolean>>({});
  const [logs, setLogs] = useState<string[]>([]);
  
  // Mock data - in a real app this would come from a store or API
  const diagnosticItems: DiagnosticItem[] = [
    {
      id: '1',
      title: 'Black screens on most pages',
      description: 'Many pages showing only black background without content',
      status: 'inProgress',
      type: 'bug',
      route: '/',
      logs: ['MainLayout not rendering children properly', 'Dark theme styles possibly overriding content'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Route not found errors',
      description: 'Error: No routes matched location "/customizer?forceHideBadge=true"',
      status: 'inProgress',
      type: 'bug',
      route: '/customizer',
      logs: ['Route missing in App.tsx', 'DesignSystem.tsx route may need updating'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      title: 'Typography system implementation',
      description: 'Finish implementing Georgia for stories',
      status: 'completed',
      type: 'feature',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      title: 'Color system implementation',
      description: 'Complete color system with primary coral, secondary purple, green accents',
      status: 'completed',
      type: 'feature',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5',
      title: 'Component elevation standardization',
      description: 'Standardize components on 8px grid with elevation levels (1-5)',
      status: 'completed',
      type: 'feature',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '6',
      title: 'Voice-First Recording System',
      description: 'Implement recording system with waveform visualization',
      status: 'pending',
      type: 'feature',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const routes = [
    { path: '/', name: 'Home', status: true },
    { path: '/memories', name: 'Memories', status: true },
    { path: '/family-setup', name: 'Family Setup', status: true },
    { path: '/stories', name: 'Stories', status: true },
    { path: '/settings', name: 'Settings', status: true },
    { path: '/account', name: 'Account', status: true },
    { path: '/auth', name: 'Auth', status: true },
    { path: '/hanuman-edition', name: 'Hanuman Edition', status: true },
    { path: '/houseofhanuman', name: 'House of Hanuman', status: true },
    { path: '/design-system', name: 'Design System', status: false },
    { path: '/design-system/customizer', name: 'Theme Customizer', status: false },
    { path: '/design-system/colors', name: 'Color Palette', status: false },
    { path: '/design-system/typography', name: 'Typography', status: false },
    { path: '/design-system/spacing', name: 'Spacing & Grid', status: false },
    { path: '/design-system/components', name: 'Components', status: false },
    { path: '/design-system/stories', name: 'Story Showcase', status: false },
    { path: '/design-system/icons', name: 'Icon Library', status: false },
    { path: '/design-system/accessibility', name: 'Accessibility', status: false }
  ];

  // Check route status
  useEffect(() => {
    const checkRoutes = async () => {
      const results: Record<string, boolean> = {};
      
      for (const route of routes) {
        try {
          // In a real app, this would be checking if the route exists
          // For now, we'll just use the status from our mock data
          results[route.path] = route.status;
        } catch (error) {
          results[route.path] = false;
        }
      }
      
      setRouteStatus(results);
    };
    
    if (isOpen) {
      checkRoutes();
      
      // Collect recent console logs
      const recentLogs = [
        "warning: No routes matched location '/customizer?forceHideBadge=true'",
        "error: Error tracking activity: Failed to send a request to the Edge Function",
        "error: Failed to fetch API endpoint",
        "Many pages showing black screens - possible theme issue"
      ];
      
      setLogs(recentLogs);
    }
  }, [isOpen]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "The diagnostic information has been copied to your clipboard.",
      });
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-0 right-0 bottom-0 w-96 bg-white dark:bg-gray-900 z-50 shadow-xl overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-forest dark:text-leaf">Admin Diagnostic Panel</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex border-b border-gray-200 dark:border-gray-800">
            <button 
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'bugs' ? 'border-b-2 border-autumn text-autumn' : 'text-gray-600 dark:text-gray-400'}`}
              onClick={() => setActiveTab('bugs')}
            >
              Issues & Bugs
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'features' ? 'border-b-2 border-autumn text-autumn' : 'text-gray-600 dark:text-gray-400'}`}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'routes' ? 'border-b-2 border-autumn text-autumn' : 'text-gray-600 dark:text-gray-400'}`}
              onClick={() => setActiveTab('routes')}
            >
              Routes
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'bugs' && (
              <div className="space-y-4">
                {diagnosticItems
                  .filter(item => item.type === 'bug')
                  .map(bug => (
                    <VayaCard key={bug.id} variant="filled" elevation={1} className="overflow-visible">
                      <div className="flex items-start gap-3">
                        <div className={`rounded-full p-1 ${bug.status === 'error' ? 'bg-red-100 text-red-600' : bug.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                          {bug.status === 'error' ? <AlertCircle size={18} /> : bug.status === 'completed' ? <CheckCircle size={18} /> : <Bug size={18} />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{bug.title}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{bug.description}</p>
                          
                          {bug.route && (
                            <div className="mt-2 text-xs text-gray-500">
                              <span className="font-medium">Route:</span> {bug.route}
                            </div>
                          )}
                          
                          {bug.logs && bug.logs.length > 0 && (
                            <details className="mt-2">
                              <summary className="text-xs font-medium cursor-pointer text-gray-700 dark:text-gray-300">
                                Logs
                              </summary>
                              <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                                {bug.logs.map((log, idx) => (
                                  <div key={idx} className="py-1">{log}</div>
                                ))}
                              </div>
                            </details>
                          )}
                          
                          <div className="mt-2 text-xs text-gray-400">
                            Updated: {bug.updatedAt.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </VayaCard>
                  ))}
              </div>
            )}
            
            {activeTab === 'features' && (
              <div className="space-y-4">
                {diagnosticItems
                  .filter(item => item.type === 'feature' || item.type === 'enhancement')
                  .map(feature => (
                    <VayaCard key={feature.id} variant="filled" elevation={1} className="overflow-visible">
                      <div className="flex items-start gap-3">
                        <div className={`rounded-full p-1 ${
                          feature.status === 'completed' 
                            ? 'bg-green-100 text-green-600' 
                            : feature.status === 'inProgress' 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'bg-gray-100 text-gray-600'
                        }`}>
                          {feature.status === 'completed' ? <CheckCircle size={18} /> : <ChevronRight size={18} />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{feature.title}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{feature.description}</p>
                          
                          <div className="mt-2 flex items-center">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              feature.status === 'completed' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : feature.status === 'inProgress' 
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                            }`}>
                              {feature.status === 'completed' ? 'Completed' : feature.status === 'inProgress' ? 'In Progress' : 'Pending'}
                            </span>
                          </div>
                          
                          <div className="mt-2 text-xs text-gray-400">
                            Updated: {feature.updatedAt.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </VayaCard>
                  ))}
              </div>
            )}
            
            {activeTab === 'routes' && (
              <div>
                <div className="space-y-1">
                  {routes.map(route => (
                    <div 
                      key={route.path} 
                      className="p-2 rounded flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <div>
                        <div className="font-medium text-sm">{route.name}</div>
                        <div className="text-xs text-gray-500">{route.path}</div>
                      </div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${routeStatus[route.path] ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                        {routeStatus[route.path] ? 'Active' : 'Issue'}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Recent Console Logs</h3>
                  <VayaCard variant="filled" elevation={1} className="overflow-x-auto">
                    <div className="text-xs space-y-1">
                      {logs.map((log, idx) => (
                        <div key={idx} className="py-1 border-b border-gray-100 dark:border-gray-800 last:border-0">
                          {log}
                        </div>
                      ))}
                    </div>
                  </VayaCard>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button 
              onClick={() => copyToClipboard(JSON.stringify(diagnosticItems, null, 2))}
              className="flex items-center justify-center w-full py-2 bg-forest text-white rounded-md hover:bg-forest/90 transition-colors text-sm"
            >
              <Clipboard size={16} className="mr-2" />
              Copy Diagnostic Data
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
