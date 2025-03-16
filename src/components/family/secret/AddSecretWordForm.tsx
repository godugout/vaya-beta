
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddSecretWordFormProps {
  onAddSecretWord: (secretWord: string) => Promise<void>;
  loading: boolean;
}

export function AddSecretWordForm({ onAddSecretWord, loading }: AddSecretWordFormProps) {
  const [newSecretWord, setNewSecretWord] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newSecretWord.trim()) {
      await onAddSecretWord(newSecretWord);
      setNewSecretWord('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        placeholder="Enter a new secret word"
        value={newSecretWord}
        onChange={(e) => setNewSecretWord(e.target.value)}
        disabled={loading}
      />
      <Button 
        type="submit"
        disabled={loading || !newSecretWord.trim()}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  );
}
