
import { Button } from '@/components/ui/button';
import { Layout, Smartphone, Laptop, Users } from 'lucide-react';

interface LayoutSelectorProps {
  layoutType: 'vertical' | 'horizontal' | 'radial';
  setLayoutType: (type: 'vertical' | 'horizontal' | 'radial') => void;
}

export const LayoutSelector = ({ layoutType, setLayoutType }: LayoutSelectorProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold mb-2 flex items-center">
        <Layout className="w-4 h-4 mr-1" /> Layout
      </h3>
      <div className="flex flex-col gap-2">
        <Button 
          size="sm" 
          variant={layoutType === 'vertical' ? "default" : "outline"}
          className="flex items-center justify-start"
          onClick={() => setLayoutType('vertical')}
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Vertical
        </Button>
        <Button 
          size="sm" 
          variant={layoutType === 'horizontal' ? "default" : "outline"}
          className="flex items-center justify-start"
          onClick={() => setLayoutType('horizontal')}
        >
          <Laptop className="w-4 h-4 mr-2" />
          Horizontal
        </Button>
        <Button 
          size="sm" 
          variant={layoutType === 'radial' ? "default" : "outline"}
          className="flex items-center justify-start"
          onClick={() => setLayoutType('radial')}
        >
          <Users className="w-4 h-4 mr-2" />
          Radial
        </Button>
      </div>
    </div>
  );
};
