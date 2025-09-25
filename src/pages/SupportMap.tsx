import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import MindBridgeLogo from '@/components/MindBridgeLogo';
import CommunityPortalSection from '@/components/CommunityPortalSection';
import AIChatbot from '@/components/AIChatbot';
import { 
  ArrowLeft,
  Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SupportMap = () => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <MindBridgeLogo size="default" />
                <div>
                  <h1 className="text-lg font-bold bg-gradient-wellness bg-clip-text text-transparent">
                    MindBridge Support
                  </h1>
                  <p className="text-xs text-muted-foreground">Find help near you</p>
                </div>
              </div>
            </div>
            
            {/* Crisis Hotline - Always Visible */}
            <Button variant="destructive" className="font-bold animate-pulse shadow-glow">
              <Phone className="w-4 h-4" />
              Crisis: 1-800-HELP
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <CommunityPortalSection onAISupportClick={() => setIsChatbotOpen(true)} />
      </div>

      <AIChatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </div>
  );
};

export default SupportMap;