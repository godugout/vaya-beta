
import { useEffect, useState } from 'react';
import { pluginManager, PluginComponent, PluginDefinition } from '@/plugins/PluginManager';

export const usePlugins = () => {
  const [plugins, setPlugins] = useState<PluginDefinition[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const updatePlugins = () => {
      setPlugins(pluginManager.getAllPlugins());
      setInitialized(pluginManager.isInitialized());
    };

    updatePlugins();

    // Initialize plugin manager if not already initialized
    if (!pluginManager.isInitialized()) {
      pluginManager.initialize().then(updatePlugins);
    }
  }, []);

  const getComponentsForSlot = (slot: PluginComponent['slot']) => {
    return pluginManager.getComponentsForSlot(slot);
  };

  const executeHook = (hookName: any, ...args: any[]) => {
    return pluginManager.executeHook(hookName, ...args);
  };

  return {
    plugins,
    initialized,
    getComponentsForSlot,
    executeHook,
    registerPlugin: pluginManager.register.bind(pluginManager),
    unregisterPlugin: pluginManager.unregister.bind(pluginManager),
  };
};
