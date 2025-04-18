
interface OnboardingHeaderProps {
  title: string;
  description: string;
}

export const OnboardingHeader = ({ title, description }: OnboardingHeaderProps) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-white/90">{description}</p>
    </div>
  );
};
