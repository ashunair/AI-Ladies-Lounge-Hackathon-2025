import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import MindBridgeLogo from './MindBridgeLogo';
import AuthDialog from './AuthDialog';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MindBridgeLogo size="lg" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MindBridge
              </h1>
              <p className="text-sm text-muted-foreground">
                Connecting Mental Health Resources
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setAuthDialogOpen(true)}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
      
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
      />
    </header>
  );
};

export default Header;