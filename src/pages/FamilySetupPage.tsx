
import { FamilySetupWizard } from "@/components/setup/FamilySetupWizard";

export default function FamilySetupPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Create Your Family Space</h1>
      <FamilySetupWizard />
    </div>
  );
}
