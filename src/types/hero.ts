import { ReactNode } from "react";

export interface CtaConfig {
  text: string;
  icon?: ReactNode;
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