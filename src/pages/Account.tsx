
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams, useNavigate } from "react-router-dom";
import AccountHeader from "@/components/account/AccountHeader";
import ProfileForm from "@/components/account/ProfileForm";
import PasswordResetDialog from "@/components/account/PasswordResetDialog";

export default function Account() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [passwordResetOpen, setPasswordResetOpen] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }
      
      const user = session.user;
      setEmail(user.email || "");
      setFullName(user.user_metadata?.full_name || "");
      setAvatar(user.user_metadata?.avatar_url || null);
      
      // Check if user is here to reset password
      if (searchParams.get("reset") === "true") {
        setShowResetDialog(true);
      }
    };
    
    fetchProfile();
  }, [navigate, searchParams]);

  const handleProfileUpdate = (newFullName: string, newAvatar: string | null) => {
    setFullName(newFullName);
    if (newAvatar) {
      setAvatar(newAvatar);
    }
  };

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <AccountHeader />
        <CardContent className="space-y-6">
          <ProfileForm 
            email={email}
            fullName={fullName}
            avatar={avatar}
            onPasswordResetClick={() => setPasswordResetOpen(true)}
            onProfileUpdated={handleProfileUpdate}
          />
        </CardContent>
      </Card>
      
      {/* Password Reset Dialog */}
      <PasswordResetDialog 
        open={passwordResetOpen || showResetDialog} 
        onOpenChange={(open) => {
          setPasswordResetOpen(open);
          if (!open) setShowResetDialog(false);
        }}
      />
    </div>
  );
}
