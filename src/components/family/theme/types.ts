
export interface FamilyTheme {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}

export interface ThemePreset extends FamilyTheme {
  name: string;
}

export interface FamilyThemeCustomizerProps {
  familyId?: string;
  initialTheme?: FamilyTheme;
  onThemeChange?: (theme: FamilyTheme) => void;
}
