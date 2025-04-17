
import { useNavigate } from "react-router-dom";

export const LogoSection = () => {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate('/')} 
      className="flex items-center gap-2 py-2"
      aria-label="Go to homepage"
    >
      <img 
        src="/lovable-uploads/7a139c69-d8f3-4454-9eca-472016d74c47.png" 
        alt="Vaya Logo" 
        className="h-9" 
      />
      <span className="text-xl font-heading font-semibold text-forest dark:text-leaf">VAYA</span>
    </button>
  );
};
