
import React from 'react';
import { PluginDefinition } from '@/plugins/PluginManager';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Example action button component
const ExampleActionButton = ({ onAction }: { onAction: () => void }) => {
  return React.createElement(Button, {
    variant: 'outline',
    size: 'sm',
    onClick: onAction,
    children: 'Example Action'
  });
};

// Example sidebar widget
const ExampleSidebarWidget = () => {
  return React.createElement('div', {
    className: 'p-4 bg-blue-50 rounded-lg'
  }, [
    React.createElement('h4', { 
      key: 'title', 
      className: 'font-medium mb-2' 
    }, 'Example Plugin Widget'),
    React.createElement(Badge, {
      key: 'badge',
      variant: 'secondary'
    }, 'Active')
  ]);
};

export const examplePlugin: PluginDefinition = {
  id: 'example-plugin',
  name: 'Example Plugin',
  version: '1.0.0',
  description: 'An example plugin demonstrating the plugin system',
  author: 'Vaya Team',
  
  hooks: {
    beforeMemoryCreate: (memory) => {
      console.log('Example plugin: Before memory create', memory);
      return memory;
    },
    
    afterMemoryCreate: (memory) => {
      console.log('Example plugin: After memory create', memory);
    },
    
    onAudioPlaybackStart: (audio) => {
      console.log('Example plugin: Audio playback started', audio);
    }
  },
  
  components: [
    {
      component: ExampleActionButton,
      slot: 'memory-actions',
      priority: 1
    },
    {
      component: ExampleSidebarWidget,
      slot: 'sidebar',
      priority: 1
    }
  ],
  
  init: async () => {
    console.log('Example plugin initialized');
  },
  
  destroy: async () => {
    console.log('Example plugin destroyed');
  }
};
