
import { useNavigate } from "react-router-dom";
import { VayaLogo } from "@/components/branding/VayaLogo";

export const LogoSection = () => {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate('/')} 
      className="flex items-center gap-2 py-2"
      aria-label="Go to homepage"
    >
      <VayaLogo 
        size="xl" 
        animated={true} 
        textClassName="text-forest dark:text-leaf hover:text-forest" 
      />
    </button>
  );
};
