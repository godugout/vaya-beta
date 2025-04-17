
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VayaLogo } from "./VayaLogo";

export const LogoShowcase = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Logo Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-8 items-end">
            <VayaLogo size="xs" />
            <VayaLogo size="sm" />
            <VayaLogo size="md" />
            <VayaLogo size="lg" />
            <VayaLogo size="xl" />
            <VayaLogo size="2xl" />
            <VayaLogo size="3xl" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logo Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-2">
              <VayaLogo size="xl" color="default" />
              <span className="text-sm text-muted-foreground">Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <VayaLogo size="xl" color="white" />
              <span className="text-sm text-muted-foreground">White</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-gray-100 p-4 rounded-lg">
              <VayaLogo size="xl" color="black" />
              <span className="text-sm text-muted-foreground">Black</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <VayaLogo size="xl" color="forest" />
              <span className="text-sm text-muted-foreground">Forest</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <VayaLogo size="xl" color="purple" />
              <span className="text-sm text-muted-foreground">Purple</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <VayaLogo size="xl" color="coral" />
              <span className="text-sm text-muted-foreground">Coral</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <VayaLogo size="xl" color="grayscale" />
              <span className="text-sm text-muted-foreground">Grayscale</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logo Variations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-2">
              <VayaLogo size="xl" type="standard" />
              <span className="text-sm text-muted-foreground">Standard</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <VayaLogo size="xl" type="simple" withText={false} />
              <span className="text-sm text-muted-foreground">Icon Only</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <VayaLogo size="xl" type="text-only" />
              <span className="text-sm text-muted-foreground">Text Only</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogoShowcase;
