import React from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { ColorSwatch as ColorSwatchType } from './color/types';

type ColorSwatchProps = ColorSwatchType;

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ 
  color, 
  name, 
  hex, 
  textClass = "text-white" 
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex || color);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: `${name}: ${hex || color}`,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div 
      className="relative group cursor-pointer rounded-md overflow-hidden transition-all hover:shadow-md"
      onClick={copyToClipboard}
      style={{ backgroundColor: color }}
      role="button"
      aria-label={`Copy ${name} color: ${hex || color}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          copyToClipboard();
        }
      }}
    >
      <div className="p-6 h-24 flex flex-col justify-between">
        <div className={cn("text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity", textClass)}>
          {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
        </div>
        <div className={cn("space-y-1", textClass)}>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs opacity-90">{hex || color}</div>
        </div>
      </div>
    </div>
  );
};
