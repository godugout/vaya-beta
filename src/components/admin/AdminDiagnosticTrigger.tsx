
import React from 'react';
import { Bug } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AdminDiagnosticTriggerProps {
  onClick: () => void;
}

export const AdminDiagnosticTrigger: React.FC<AdminDiagnosticTriggerProps> = ({ onClick }) => {
  const handleClick = () => {
    onClick();
    toast({
      title: "Admin Diagnostic Panel",
      description: "Panel is now open. Use Ctrl+Shift+D to toggle.",
    });
  };

  return (
    <button 
      onClick={handleClick}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-forest text-white shadow-lg hover:bg-forest/90 transition-all hover:scale-105 z-50"
      aria-label="Open Admin Diagnostic Panel"
      title="Open Admin Diagnostic Panel (Ctrl+Shift+D)"
    >
      <Bug size={20} />
    </button>
  );
};
