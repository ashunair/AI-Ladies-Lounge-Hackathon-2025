import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  MapIcon, 
  Users,
  Heart,
  Globe,
  MessageCircle,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserPathways = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Two Pathways, One Mission
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're shaping policy or seeking support, MindBridge connects you to the right resources.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Policy Dashboard Path */}
          <Card className="p-8 shadow-medium hover:shadow-strong transition-all duration-300 border-primary/20">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">
                Policy Dashboard
              </h3>
              <p className="text-muted-foreground">
                Strategic insights for evidence-based mental health policy decisions
              </p>
            </div>
            
            {/* Persona */}
            <div className="bg-secondary/50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-primary mb-2">Dr. Sarah Chen</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Mental Health Policy Analyst, Ontario Ministry of Health
              </p>
              <p className="text-sm">
                "I need real-time data to optimize our $50M annual budget and identify underserved communities."
              </p>
            </div>
            
            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Real-time analytics & resource mapping</span>
              </div>
              <div className="flex items-center gap-3">
                <MapIcon className="w-5 h-5 text-primary" />
                <span>Geographic gap analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>ROI measurement & impact tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <span>Community demand forecasting</span>
              </div>
            </div>
            
            <Button 
              variant="policy" 
              className="w-full" 
              size="lg"
              onClick={() => navigate('/policy-dashboard')}
            >
              Access Policy Dashboard
            </Button>
          </Card>
          
          {/* Community Portal Path */}
          <Card className="p-8 shadow-medium hover:shadow-strong transition-all duration-300 border-wellness/20">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-wellness rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-wellness-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-wellness mb-2">
                Community Portal
              </h3>
              <p className="text-muted-foreground">
                Personalized support discovery for newcomer women
              </p>
            </div>
            
            {/* Persona */}
            <div className="bg-secondary/50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-wellness mb-2">Amara Hassan</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Recent immigrant from Somalia, mother of 3
              </p>
              <p className="text-sm">
                "I need culturally appropriate support that fits my family's schedule and religious practices."
              </p>
            </div>
            
            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-wellness" />
                <span>Culturally appropriate services</span>
              </div>
              <div className="flex items-center gap-3">
                <MapIcon className="w-5 h-5 text-wellness" />
                <span>Location-based resource finder</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-wellness" />
                <span>Peer support connections</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-wellness" />
                <span>Flexible scheduling options</span>
              </div>
            </div>
            
            <Button 
              variant="community" 
              className="w-full" 
              size="lg"
              onClick={() => navigate('/support-map')}
            >
              Find Support Now
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UserPathways;