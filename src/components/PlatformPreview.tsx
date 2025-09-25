import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Map, 
  Filter, 
  Calendar,
  Users,
  MessageSquare,
  Search,
  Star
} from 'lucide-react';

const PlatformPreview = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Platform Capabilities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed for both strategic oversight and personal support discovery.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Policy Dashboard Preview */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                Policy Dashboard
              </Badge>
              <h3 className="text-2xl font-bold mb-4">
                Strategic Intelligence Center
              </h3>
            </div>
            
            {/* Mock Dashboard */}
            <Card className="p-6 shadow-strong bg-card">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Mental Health Resource Distribution</h4>
                <Filter className="w-4 h-4 text-muted-foreground" />
              </div>
              
              {/* Mock Chart Area */}
              <div className="h-48 bg-gradient-primary/5 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Interactive Analytics Dashboard</p>
                </div>
              </div>
              
              {/* Mock Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-secondary/30 rounded-lg">
                  <div className="font-bold text-primary">127</div>
                  <div className="text-xs text-muted-foreground">Active Services</div>
                </div>
                <div className="text-center p-3 bg-secondary/30 rounded-lg">
                  <div className="font-bold text-wellness">23%</div>
                  <div className="text-xs text-muted-foreground">Coverage Gap</div>
                </div>
                <div className="text-center p-3 bg-secondary/30 rounded-lg">
                  <div className="font-bold text-primary">$2.1M</div>
                  <div className="text-xs text-muted-foreground">Budget Impact</div>
                </div>
              </div>
            </Card>
            
            {/* Features List */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Map className="w-4 h-4 text-primary" />
                Geographic Analysis
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-primary" />
                Demand Forecasting
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BarChart3 className="w-4 h-4 text-primary" />
                ROI Tracking
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                Trend Analysis
              </div>
            </div>
          </div>
          
          {/* Community Portal Preview */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-4 bg-wellness/10 text-wellness">
                Community Portal
              </Badge>
              <h3 className="text-2xl font-bold mb-4">
                Personal Support Navigator
              </h3>
            </div>
            
            {/* Mock Portal Interface */}
            <Card className="p-6 shadow-strong bg-card">
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1 h-10 bg-input rounded-md flex items-center px-3 text-sm text-muted-foreground">
                  Find culturally appropriate support near me...
                </div>
              </div>
              
              {/* Mock Service Cards */}
              <div className="space-y-3 mb-4">
                <div className="p-3 bg-wellness/5 border border-wellness/20 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-sm">Somali Women's Mental Health Circle</h5>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-wellness text-wellness" />
                      <span className="text-xs">4.8</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Culturally sensitive group therapy in Somali and English
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">Evening Sessions</Badge>
                    <Badge variant="outline" className="text-xs">Childcare Available</Badge>
                  </div>
                </div>
                
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-sm">New Canadians Wellness Center</h5>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-wellness text-wellness" />
                      <span className="text-xs">4.6</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Individual counseling with interpretation services
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">Free Service</Badge>
                    <Badge variant="outline" className="text-xs">Transit Accessible</Badge>
                  </div>
                </div>
              </div>
              
              {/* Mock Chat Preview */}
              <div className="bg-gradient-subtle p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-wellness" />
                  <span className="text-sm font-medium">Peer Support Chat</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Connect with other Somali-Canadian mothers in your area
                </p>
              </div>
            </Card>
            
            {/* Features List */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Search className="w-4 h-4 text-wellness" />
                Smart Matching
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageSquare className="w-4 h-4 text-wellness" />
                Peer Support
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-wellness" />
                Flexible Scheduling
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-wellness" />
                Reviewed Services
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformPreview;