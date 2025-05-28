
import React from 'react';
import { usePlugins } from '@/hooks/usePlugins';
import { PluginComponent } from '@/plugins/PluginManager';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

interface PluginSlotProps {
  slot: PluginComponent['slot'];
  props?: Record<string, any>;
  className?: string;
}

export const PluginSlot = ({ slot, props = {}, className }: PluginSlotProps) => {
  const { getComponentsForSlot } = usePlugins();
  const components = getComponentsForSlot(slot);

  if (components.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {components.map((pluginComponent, index) => {
        const Component = pluginComponent.component;
        return (
          <ErrorBoundary
            key={`${slot}-${index}`}
            fallback={
              <div className="text-sm text-red-500 p-2 border border-red-200 rounded">
                Plugin component failed to load
              </div>
            }
          >
            <Component {...props} />
          </ErrorBoundary>
        );
      })}
    </div>
  );
};
