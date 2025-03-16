
interface FamilyTitleProps {
  familyName: string;
  familyDescription: string | null;
}

export function FamilyTitle({ familyName, familyDescription }: FamilyTitleProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{familyName}</h1>
      {familyDescription && (
        <p className="text-gray-500 dark:text-gray-400 mt-1">{familyDescription}</p>
      )}
    </div>
  );
}
