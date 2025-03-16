
import { SecretWordItem } from './SecretWordItem';

interface FamilyAccessCode {
  id: string;
  secret_word: string;
  created_at: string;
  active: boolean;
}

interface SecretWordListProps {
  secretWords: FamilyAccessCode[];
  onDeactivate: (id: string) => Promise<void>;
}

export function SecretWordList({ secretWords, onDeactivate }: SecretWordListProps) {
  if (secretWords.length === 0) {
    return (
      <p className="text-sm text-gray-500">No secret words found. Create one to allow family members to join.</p>
    );
  }

  return (
    <div className="space-y-2">
      {secretWords.map((code) => (
        <SecretWordItem 
          key={code.id} 
          code={code} 
          onDeactivate={onDeactivate} 
        />
      ))}
    </div>
  );
}
