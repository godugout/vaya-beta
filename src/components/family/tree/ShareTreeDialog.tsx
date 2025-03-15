
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, Link, Mail, Share } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ShareTreeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  familyId: string;
}

export const ShareTreeDialog = ({ 
  open, 
  onOpenChange,
  familyId
}: ShareTreeDialogProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}/family/${familyId}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    
    toast({
      title: "Link copied",
      description: "The share link has been copied to your clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleEmailShare = () => {
    if (email.trim() && email.includes('@')) {
      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${email}`,
      });
      setEmail('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Family Tree</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="link">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <span>Share Link</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Invite via Email</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="link" className="py-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  readOnly
                  value={shareUrl}
                  className="font-mono text-sm"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleCopyLink}
                  className="flex-shrink-0"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                <p>Anyone with this link can view your family tree.</p>
              </div>

              <div className="flex flex-col space-y-2 mt-4">
                <p className="text-sm font-medium">Share on:</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Share className="h-4 w-4 mr-2" />
                    Social
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Enter email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <Button 
                  onClick={handleEmailShare}
                  disabled={!email.trim() || !email.includes('@')}
                  className="w-full"
                >
                  Send Invitation
                </Button>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                <p>The recipient will receive an email with a link to view your family tree.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
