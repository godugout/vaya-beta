
import { Button } from "@/components/ui/button";
import { HeroConfig } from "@/types/hero";

interface HeroContentProps {
  config: HeroConfig;
  isSpanish: boolean;
}

export const HeroContent = ({ config, isSpanish }: HeroContentProps) => {
  const title = isSpanish ? config.title_es : config.title_en;
  const subtitle = isSpanish ? config.subtitle_es : config.subtitle_en;

  return (
    <div className="mx-auto max-w-2xl lg:mx-0">
      <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h1>
      <p className="font-handwritten mt-6 text-xl leading-8 text-gray-600">
        {subtitle}
      </p>
      <div className="mt-10 flex items-center gap-x-4">
        {config.primaryCta && (
          <Button variant="default" className="font-heading whitespace-nowrap">
            <span>{config.primaryCta.text}</span>
            {config.primaryCta.icon}
          </Button>
        )}
        {config.secondaryCta && (
          <Button variant="outline" className="font-heading whitespace-nowrap">
            <span>{config.secondaryCta.text}</span>
            {config.secondaryCta.icon}
          </Button>
        )}
      </div>
    </div>
  );
};
