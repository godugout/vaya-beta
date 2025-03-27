
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SoftThemeToggle } from "@/components/theme/SoftThemeToggle";
import { PremiumThemeToggle } from "@/components/theme/PremiumThemeToggle";
import { useSoftTheme } from "@/contexts/SoftThemeContext";
import { usePremiumTheme } from "@/contexts/PremiumThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";

export const HanumanEditionSettings = () => {
  const { softTheme, toggleSoftTheme } = useSoftTheme();
  const { premiumTheme } = usePremiumTheme();
  const { isSpanish } = useLanguage();
  const isPremium = premiumTheme === 'premium';
  
  return (
    <div className="space-y-6">
      <Card className={isPremium ? "premium-theme card" : ""}>
        <CardHeader>
          <CardTitle>
            {isSpanish ? "Ajustes de Interfaz" : "Interface Settings"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {isSpanish ? "Tema de la Aplicación" : "Application Theme"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isSpanish ? "Cambia entre modo claro y oscuro" : "Switch between light and dark mode"}
              </p>
            </div>
            <ThemeToggle />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {isSpanish ? "Tema Suave" : "Soft Interface"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isSpanish ? "Interfaz con esquinas redondeadas y colores suaves" : "Rounded corners and soft colors interface"}
              </p>
            </div>
            <SoftThemeToggle variant="switch" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium flex items-center">
                {isSpanish ? "Tema Premium" : "Premium Theme"}
                <Sparkles className="ml-2 h-4 w-4 text-amber-500" />
              </p>
              <p className="text-sm text-muted-foreground">
                {isSpanish ? "Activa el tema premium con efectos visuales mejorados" : "Enable premium theme with enhanced visual effects"}
              </p>
            </div>
            <PremiumThemeToggle variant="switch" />
          </div>
        </CardContent>
      </Card>
      
      <Card className={isPremium ? "premium-theme card" : ""}>
        <CardHeader>
          <CardTitle>
            {isSpanish ? "Idioma y Localización" : "Language & Localization"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {isSpanish ? "Español" : "Spanish"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isSpanish ? "Mostrar la interfaz en español" : "Display interface in Spanish"}
              </p>
            </div>
            <Switch checked={isSpanish} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HanumanEditionSettings;
