
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AddSecretWordForm } from './secret/AddSecretWordForm';
import { SecretWordList } from './secret/SecretWordList';
import { useSecretWords } from './secret/useSecretWords';

interface FamilySecretManagerProps {
  familyId: string;
}

export function FamilySecretManager({ familyId }: FamilySecretManagerProps) {
  const { secretWords, loading, addSecretWord, deactivateSecretWord } = useSecretWords(familyId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Family Secret Words</CardTitle>
        <CardDescription>
          Manage the secret words that allow family members to join this family.
          Share these only with people you want to invite.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AddSecretWordForm onAddSecretWord={addSecretWord} loading={loading} />
        <SecretWordList secretWords={secretWords} onDeactivate={deactivateSecretWord} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-gray-500">
          Active secret words: {secretWords.filter(code => code.active).length}
        </p>
      </CardFooter>
    </Card>
  );
}
