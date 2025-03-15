
import { FadeIn } from "@/components/animation/FadeIn";
import { SuccessAnimation } from "@/components/animation/SuccessAnimation";

interface SuccessMessageProps {
  hasSaved: boolean;
}

const SuccessMessage = ({ hasSaved }: SuccessMessageProps) => {
  if (!hasSaved) return null;
  
  return (
    <FadeIn>
      <SuccessAnimation 
        message="Your memory has been saved successfully!" 
        className="mt-4"
      />
    </FadeIn>
  );
};

export default SuccessMessage;
