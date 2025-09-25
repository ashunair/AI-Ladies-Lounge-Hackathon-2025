import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import MindBridgeLogo from '@/components/MindBridgeLogo';
import { 
  Search, 
  MapPin, 
  List,
  Star,
  Clock,
  Phone,
  MessageCircle,
  Bookmark,
  Users,
  ArrowLeft,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommunityPortal = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const recommendedServices = [
    {
      id: 1,
      name: "Somali Women's Mental Health Circle",
      language: "Somali, English",
      hours: "Evening Sessions",
      rating: 4.8,
      features: ["Childcare Available", "Cultural Support"],
      transit: "8 min • Transit"
    },
    {
      id: 2,
      name: "New Canadians Wellness Center", 
      language: "Multiple Languages",
      hours: "Flexible Hours",
      rating: 4.6,
      features: ["Free Service", "Transit Accessible"],
      transit: "12 min • Transit"
    }
  ];

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
                <h1 className="text-xl font-bold bg-gradient-wellness bg-clip-text text-transparent">
                  MindBridge
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                Amara H.
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Search Section */}
        <Card className="p-6 mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              className="pl-10 h-12 text-base"
              placeholder="What support are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Card>

        {/* Recommended Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Recommended Services</h2>
          
          <div className="space-y-4 mb-6">
            {recommendedServices.map((service) => (
              <Card key={service.id} className="p-6 hover:shadow-medium transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-wellness text-wellness" />
                        <span className="text-sm font-medium text-wellness">{service.rating}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3">Language: {service.language}</p>
                    <p className="text-sm text-muted-foreground mb-3">{service.transit}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-wellness/10 text-wellness border-wellness/20">
                        <Clock className="w-3 h-3 mr-1" />
                        {service.hours}
                      </Badge>
                      {service.features.map((feature, index) => (
                        <Badge key={index} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="community" size="sm">
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters and View Options */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="font-medium">FILTERS:</span>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Map
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="flex items-center gap-2"
              >
                <List className="w-4 h-4" />
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-wellness" />
              <div>
                <h3 className="font-semibold">Join Peer Group</h3>
                <p className="text-sm text-muted-foreground">Connect with other newcomer women</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li>• Weekly support meetings</li>
              <li>• Cultural celebration events</li>
              <li>• Childcare coordination</li>
            </ul>
            <Button variant="community" size="sm" className="w-full">
              Join Group
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Peer Support Chat</h3>
                <p className="text-sm text-muted-foreground">24/7 community support</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li>• Anonymous support</li>
              <li>• Language-specific groups</li>
              <li>• Moderated discussions</li>
            </ul>
            <Button variant="outline" size="sm" className="w-full">
              Start Chat
            </Button>
          </Card>
        </div>

        {/* Crisis Hotline */}
        <Card className="p-6 bg-destructive/5 border-destructive/20">
          <div className="text-center">
            <h3 className="text-xl font-bold text-destructive mb-4">Crisis Hotline</h3>
            <p className="text-muted-foreground mb-4">
              24/7 immediate support available in multiple languages
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="destructive" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now: 1-800-CRISIS
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Text Support
              </Button>
            </div>
          </div>
        </Card>

        {/* Status Indicators */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <h4 className="font-semibold mb-4 text-muted-foreground">Your Journey</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
              <span className="text-sm text-muted-foreground">Sign in Banner</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
              <span className="text-sm text-muted-foreground">Onboarding Step</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
              <span className="text-sm text-muted-foreground">Empty State</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-wellness"></div>
              <span className="text-sm font-medium">Success Toast</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-wellness transition-colors">About</a>
            <a href="#" className="hover:text-wellness transition-colors">Terms</a>
            <a href="#" className="hover:text-wellness transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommunityPortal;