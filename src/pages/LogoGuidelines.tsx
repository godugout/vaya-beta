
import { PageTransition } from "@/components/animation/PageTransition";
import LogoShowcase from "@/components/branding/LogoShowcase";

const LogoGuidelines = () => {
  return (
    <PageTransition location="logo-guidelines">
      <div className="container mx-auto py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">VAYA Brand Guidelines</h1>
          <p className="text-muted-foreground">
            Various sizes, colors, and formats of the VAYA logo for consistent branding.
          </p>
        </div>
        
        <LogoShowcase />
      </div>
    </PageTransition>
  );
};

export default LogoGuidelines;
