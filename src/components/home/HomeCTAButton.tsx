
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HomeCTAButtonProps {
  user: any | null;
  hasFamilies: boolean | null;
  loading: boolean;
}

export const HomeCTAButton = ({ user, hasFamilies, loading }: HomeCTAButtonProps) => {
  const navigate = useNavigate();
  
  const handleCTAClick = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (hasFamilies === false) {
      navigate('/setup');
      return;
    }
    
    navigate('/families');
  };

  return (
    <Button 
      size="lg" 
      variant="default" 
      onClick={handleCTAClick}
      className="bg-blue-600 hover:bg-blue-700 text-white"
      disabled={loading}
    >
      {loading ? "Loading..." : 
       !user ? "Sign In or Join" : 
       hasFamilies === false ? "Create Your Family" : 
       "View Your Family"}
    </Button>
  );
};
