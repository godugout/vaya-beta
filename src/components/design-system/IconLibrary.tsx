
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CopyIcon, SearchIcon, CheckIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export const IconLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const { toast } = useToast();

  // Get all icons from Lucide
  const allIcons = Object.entries(LucideIcons)
    .filter(([name]) => name !== 'createLucideIcon' && !name.startsWith('__'))
    .sort(([a], [b]) => a.localeCompare(b));

  const filteredIcons = allIcons.filter(([name]) => 
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (iconName: string) => {
    const importStatement = `import { ${iconName} } from 'lucide-react';`;
    navigator.clipboard.writeText(importStatement);
    setCopiedIcon(iconName);
    toast({
      title: "Copied to clipboard",
      description: `${importStatement}`,
    });
    
    setTimeout(() => {
      setCopiedIcon(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Icon Library</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
          Browse and search through the available icons from the Lucide icon library. Click on any icon to copy its import statement.
        </p>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search icons..."
          className="pl-10"
        />
      </div>

      <div className="border rounded-md">
        <ScrollArea className="h-[600px] rounded-md">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-4">
            {filteredIcons.map(([name, Icon]) => (
              <Card 
                key={name}
                className="flex flex-col items-center justify-center p-4 hover:border-primary cursor-pointer transition-colors"
                onClick={() => copyToClipboard(name)}
              >
                {/* @ts-ignore - Icon is a valid component */}
                <Icon className="h-8 w-8 mb-2" />
                <div className="relative text-xs text-center font-mono mt-2 truncate w-full">
                  {name}
                  {copiedIcon === name && (
                    <span className="absolute inset-0 flex items-center justify-center bg-primary/90 text-primary-foreground rounded">
                      <CheckIcon className="h-4 w-4 mr-1" /> Copied
                    </span>
                  )}
                </div>
              </Card>
            ))}
            {filteredIcons.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                No icons found matching "{searchTerm}"
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">How to use icons</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          Click on any icon above to copy its import statement. Then use it in your React components.
        </p>
        <div className="bg-gray-900 text-gray-100 p-3 rounded-md text-sm font-mono">
          <div className="text-blue-400">import</div> {'{ CircleCheck } '}
          <div className="text-blue-400">from</div> 
          <span className="text-green-400">'lucide-react'</span>;
          <div className="mt-2">{`<CircleCheck className="h-6 w-6" />`}</div>
        </div>
      </div>
    </div>
  );
};
