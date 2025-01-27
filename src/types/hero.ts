export interface CtaConfig {
  text: string;
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