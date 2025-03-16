
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface FamilyAccessCode {
  id: string;
  secret_word: string;
  created_at: string;
  active: boolean;
}

interface SecretWordItemProps {
  code: FamilyAccessCode;
  onDeactivate: (id: string) => Promise<void>;
}

export function SecretWordItem({ code, onDeactivate }: SecretWordItemProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Secret word copied to clipboard',
    });
  };

  const handleDeactivate = async () => {
    setLoading(true);
    try {
      await onDeactivate(code.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`flex items-center justify-between p-3 rounded-md ${
        code.active ? 'bg-gray-100 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900 opacity-50'
      }`}
    >
      <div className="flex-1">
        <p className="font-medium">{code.secret_word}</p>
        <p className="text-xs text-gray-500">
          Created: {new Date(code.created_at).toLocaleDateString()}
          {!code.active && ' (Inactive)'}
        </p>
      </div>
      <div className="flex space-x-2">
        {code.active && (
          <>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(code.secret_word)}
              disabled={loading}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDeactivate}
              disabled={loading}
            >
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
