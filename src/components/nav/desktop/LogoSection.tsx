
import { useNavigate } from "react-router-dom";

export const LogoSection = () => {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate('/')} 
      className="flex items-center gap-2 py-2"
      aria-label="Go to homepage"
    >
      <img src="/lovable-uploads/4425ec86-56fe-44c4-9f47-75e59d3cb287.png" alt="Vaya Logo" className="h-9" />
      <span className="text-xl font-heading font-semibold text-forest dark:text-leaf">Vaya</span>
    </button>
  );
};
