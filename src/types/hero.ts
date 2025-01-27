import { LucideIcon } from "lucide-react";

export interface CtaConfig {
  text: string;
  icon: JSX.Element;
}

export interface HeroConfig {
  title_en: string;
  title_es: string;
  subtitle_en: string;
  subtitle_es: string;
  primaryCta: CtaConfig;
  secondaryCta?: CtaConfig;
}

export type HeroConfigs = Record<string, HeroConfig>;