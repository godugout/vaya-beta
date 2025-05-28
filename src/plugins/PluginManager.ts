
export interface Plugin {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  dependencies?: string[];
  config?: Record<string, any>;
}

export interface PluginHooks {
  beforeMemoryCreate?: (memory: any) => any;
  afterMemoryCreate?: (memory: any) => void;
  beforeStoryShare?: (story: any) => any;
  afterStoryShare?: (story: any) => void;
  beforeCommentAdd?: (comment: any) => any;
  afterCommentAdd?: (comment: any) => void;
  onPrivacySettingsChange?: (settings: any) => void;
  onAudioPlaybackStart?: (audio: any) => void;
  onAudioPlaybackEnd?: (audio: any) => void;
}

export interface PluginComponent {
  component: React.ComponentType<any>;
  slot: 'memory-actions' | 'story-toolbar' | 'sidebar' | 'header' | 'footer';
  priority?: number;
}

export interface PluginDefinition extends Plugin {
  hooks?: PluginHooks;
  components?: PluginComponent[];
  init?: () => void | Promise<void>;
  destroy?: () => void | Promise<void>;
}

class PluginManager {
  private plugins: Map<string, PluginDefinition> = new Map();
  private initialized = false;

  async register(plugin: PluginDefinition): Promise<void> {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin ${plugin.id} is already registered`);
    }

    // Check dependencies
    if (plugin.dependencies) {
      for (const dep of plugin.dependencies) {
        if (!this.plugins.has(dep)) {
          throw new Error(`Plugin ${plugin.id} depends on ${dep} which is not registered`);
        }
      }
    }

    this.plugins.set(plugin.id, plugin);

    if (this.initialized && plugin.init) {
      await plugin.init();
    }

    console.log(`Plugin ${plugin.name} (${plugin.id}) registered successfully`);
  }

  async unregister(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} is not registered`);
    }

    // Check if other plugins depend on this one
    for (const [id, p] of this.plugins) {
      if (p.dependencies?.includes(pluginId)) {
        throw new Error(`Cannot unregister ${pluginId}: Plugin ${id} depends on it`);
      }
    }

    if (plugin.destroy) {
      await plugin.destroy();
    }

    this.plugins.delete(pluginId);
    console.log(`Plugin ${pluginId} unregistered successfully`);
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    // Initialize plugins in dependency order
    const initOrder = this.getInitializationOrder();
    
    for (const pluginId of initOrder) {
      const plugin = this.plugins.get(pluginId);
      if (plugin?.init) {
        try {
          await plugin.init();
          console.log(`Plugin ${pluginId} initialized`);
        } catch (error) {
          console.error(`Failed to initialize plugin ${pluginId}:`, error);
        }
      }
    }

    this.initialized = true;
  }

  private getInitializationOrder(): string[] {
    const visited = new Set<string>();
    const order: string[] = [];

    const visit = (pluginId: string) => {
      if (visited.has(pluginId)) return;
      visited.add(pluginId);

      const plugin = this.plugins.get(pluginId);
      if (plugin?.dependencies) {
        for (const dep of plugin.dependencies) {
          visit(dep);
        }
      }

      order.push(pluginId);
    };

    for (const pluginId of this.plugins.keys()) {
      visit(pluginId);
    }

    return order;
  }

  executeHook<T extends keyof PluginHooks>(
    hookName: T,
    ...args: Parameters<NonNullable<PluginHooks[T]>>
  ): any {
    let result = args[0];

    for (const plugin of this.plugins.values()) {
      const hook = plugin.hooks?.[hookName];
      if (hook) {
        try {
          const hookResult = (hook as any)(...args);
          if (hookResult !== undefined) {
            result = hookResult;
          }
        } catch (error) {
          console.error(`Error executing hook ${hookName} in plugin ${plugin.id}:`, error);
        }
      }
    }

    return result;
  }

  getComponentsForSlot(slot: PluginComponent['slot']): PluginComponent[] {
    const components: PluginComponent[] = [];

    for (const plugin of this.plugins.values()) {
      if (plugin.components) {
        const slotComponents = plugin.components.filter(c => c.slot === slot);
        components.push(...slotComponents);
      }
    }

    return components.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  getPlugin(pluginId: string): PluginDefinition | undefined {
    return this.plugins.get(pluginId);
  }

  getAllPlugins(): PluginDefinition[] {
    return Array.from(this.plugins.values());
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const pluginManager = new PluginManager();
