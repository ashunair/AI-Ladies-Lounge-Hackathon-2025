import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MindBridgeLogo from '@/components/MindBridgeLogo';
import CommunityPortalSection from '@/components/CommunityPortalSection';
import gtaMapBackground from '@/assets/toronto-map-real.png';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Filter,
  Download,
  Settings,
  Users,
  AlertCircle,
  ArrowLeft,
  Search,
  List,
  Star,
  Clock,
  Phone,
  MessageCircle,
  Bookmark,
  Navigation,
  Languages,
  Baby,
  Calendar,
  Heart,
  X,
  TrendingDown,
  Activity,
  Send,
  Bot
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface Service {
  id: number;
  name: string;
  rating: number;
  language: string;
  hours: string;
  features: string[];
  transit: string;
}

interface Resource {
  id: number;
  name: string;
  type: 'counseling' | 'group' | 'crisis' | 'peer';
  distance: number;
  rating: number;
  address: string;
  phone: string;
  hours: string;
  languages: string[];
  features: string[];
  coordinates: { lat: number; lng: number };
  waitTime: string;
  cost: string;
}

const PolicyDashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('SERVICE DENSITY');
  const [activeTab, setActiveTab] = useState('policy-dashboard');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'immediate' | 'nearby'>('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'bot', timestamp: Date}>>([
    {
      id: '1',
      text: "Hello! I'm your virtual AI support assistant. I'm here to help you find mental health resources, provide crisis support information, or just listen. How can I support you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  // Mock resources data for community portal
  const resources: Resource[] = [
    {
      id: 1,
      name: "Newcomer Women's Crisis Center",
      type: 'crisis',
      distance: 0.8,
      rating: 4.9,
      address: "245 Main St, Toronto ON",
      phone: "416-555-0123",
      hours: "24/7",
      languages: ["English", "Somali", "Arabic", "French"],
      features: ["24/7 Crisis Support", "Childcare Available", "Cultural Counselors"],
      coordinates: { lat: 43.6532, lng: -79.3832 },
      waitTime: "Immediate",
      cost: "Free"
    },
    {
      id: 2,
      name: "Somali Women's Mental Health Circle",
      type: 'group',
      distance: 1.2,
      rating: 4.8,
      address: "156 Dundas St W, Toronto ON",
      phone: "416-555-0456",
      hours: "Mon-Fri 6-9 PM",
      languages: ["Somali", "English"],
      features: ["Group Therapy", "Childcare", "Evening Sessions"],
      coordinates: { lat: 43.6566, lng: -79.3859 },
      waitTime: "2-3 days",
      cost: "Free"
    },
    {
      id: 3,
      name: "Multicultural Family Counseling",
      type: 'counseling',
      distance: 2.1,
      rating: 4.6,
      address: "789 Queen St E, Toronto ON", 
      phone: "416-555-0789",
      hours: "Mon-Sat 9 AM-6 PM",
      languages: ["English", "Arabic", "French", "Spanish"],
      features: ["Individual Therapy", "Family Sessions", "Sliding Scale Fees"],
      coordinates: { lat: 43.6572, lng: -79.3521 },
      waitTime: "1-2 weeks",
      cost: "Sliding Scale"
    },
    {
      id: 4,
      name: "New Canadians Peer Support",
      type: 'peer',
      distance: 3.5,
      rating: 4.7,
      address: "321 College St, Toronto ON",
      phone: "416-555-0321",
      hours: "Daily 2-8 PM",
      languages: ["Multiple Languages"],
      features: ["Peer Mentorship", "Drop-in Center", "Resource Navigation"],
      coordinates: { lat: 43.6577, lng: -79.4103 },
      waitTime: "Walk-in",
      cost: "Free"
    }
  ];

  // Request geolocation on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationPermission('granted');
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationPermission('denied');
          // Default to Toronto downtown for demo
          setUserLocation({ lat: 43.6532, lng: -79.3832 });
        }
      );
    } else {
      setLocationPermission('denied');
      setUserLocation({ lat: 43.6532, lng: -79.3832 });
    }
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'immediate' && (resource.type === 'crisis' || resource.waitTime === 'Walk-in')) ||
                         (selectedFilter === 'nearby' && resource.distance <= 2);
    
    return matchesSearch && matchesFilter;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'crisis': return <AlertCircle className="w-5 h-5 text-destructive" />;
      case 'group': return <Users className="w-5 h-5 text-wellness" />;
      case 'counseling': return <Heart className="w-5 h-5 text-primary" />;
      case 'peer': return <MessageCircle className="w-5 h-5 text-secondary-foreground" />;
      default: return <Heart className="w-5 h-5" />;
    }
  };

  // Mock data for the map regions
  const mapRegions = [
    { id: 1, x: 15, y: 20, density: 'high', utilization: 85, community: 'Downtown West', population: 12500, services: 8, avgWaitTime: '2 days', topIssue: 'Anxiety & Depression' },
    { id: 2, x: 45, y: 30, density: 'medium', utilization: 62, community: 'Midtown', population: 8200, services: 5, avgWaitTime: '1 week', topIssue: 'Family Counseling' },
    { id: 3, x: 75, y: 25, density: 'low', utilization: 34, community: 'East End', population: 4800, services: 2, avgWaitTime: '3 weeks', topIssue: 'Crisis Support' },
    { id: 4, x: 25, y: 60, density: 'high', utilization: 78, community: 'Central', population: 15000, services: 12, avgWaitTime: '3 days', topIssue: 'Group Therapy' },
    { id: 5, x: 55, y: 50, density: 'medium', utilization: 45, community: 'Riverside', population: 6700, services: 4, avgWaitTime: '2 weeks', topIssue: 'Peer Support' },
    { id: 6, x: 85, y: 65, density: 'low', utilization: 28, community: 'Northside', population: 3200, services: 2, avgWaitTime: '4 weeks', topIssue: 'Language Services' },
    { id: 7, x: 35, y: 80, density: 'medium', utilization: 56, community: 'Southgate', population: 9100, services: 6, avgWaitTime: '1 week', topIssue: 'Youth Programs' },
    { id: 8, x: 65, y: 75, density: 'high', utilization: 89, community: 'Harbor District', population: 11800, services: 10, avgWaitTime: '1 day', topIssue: 'Crisis Intervention' },
  ];

  const handleRegionClick = (region: any) => {
    setSelectedRegion(region);
    setIsPanelOpen(true);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(currentMessage),
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('crisis') || input.includes('emergency') || input.includes('help')) {
      return "I understand you may be in crisis. Please know that immediate help is available:\n\n🆘 Crisis Hotline: 1-800-CRISIS (24/7)\n📞 Emergency: 911\n💬 Crisis Text Line: Text HOME to 741741\n\nWould you like me to help you find local crisis support services?";
    }
    
    if (input.includes('anxious') || input.includes('anxiety')) {
      return "I hear that you're experiencing anxiety. That's very common and you're not alone. Here are some immediate coping strategies:\n\n• Take 3 deep breaths (4 counts in, 6 counts out)\n• Try the 5-4-3-2-1 grounding technique\n• Consider talking to a counselor\n\nWould you like me to find anxiety support resources near you?";
    }
    
    if (input.includes('depression') || input.includes('depressed') || input.includes('sad')) {
      return "Thank you for sharing that with me. Depression is treatable and support is available. Some resources that might help:\n\n• Professional counseling services\n• Support groups in your community\n• Crisis support if needed\n\nWould you like me to help you find mental health services in your area?";
    }
    
    if (input.includes('resources') || input.includes('services')) {
      return "I can help you find mental health resources! We have:\n\n🏥 Crisis centers with 24/7 support\n👥 Group therapy sessions\n🗣️ Individual counseling\n🤝 Peer support networks\n\nWhat type of support are you looking for? I can provide specific recommendations based on your needs.";
    }
    
    return "Thank you for sharing that with me. I'm here to listen and help you find the support you need. Whether you're looking for crisis support, counseling services, or just someone to talk to, there are resources available. What kind of support would be most helpful for you right now?";
  };

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

  const getRegionColor = (region: any) => {
    if (activeFilter === 'SERVICE DENSITY') {
      return region.density === 'high' ? 'hsl(var(--wellness))' : 
             region.density === 'medium' ? 'hsl(var(--primary))' : 
             'hsl(var(--destructive))';
    } else {
      return region.utilization > 70 ? 'hsl(var(--wellness))' :
             region.utilization > 50 ? 'hsl(var(--primary))' :
             'hsl(var(--destructive))';
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
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
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  MindBridge
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline">Dashboard</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="policy-dashboard">Policy Dashboard</TabsTrigger>
            <TabsTrigger value="community-portal">Community Portal</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="policy-dashboard" className="mt-8">
            {/* Policy Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-wellness/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-wellness" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Service Utilization</p>
                    <p className="text-2xl font-bold">73%</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">↑ 12% from last month</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <p className="text-2xl font-bold">2,847</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">↑ 8% from last month</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Crisis Interventions</p>
                    <p className="text-2xl font-bold">127</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">↓ 5% from last month</p>
              </Card>
            </div>

            {/* Geographic Resource Distribution */}
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Geographic Resource Distribution</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Filter by:</span>
                  <Button 
                    variant={activeFilter === 'SERVICE DENSITY' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveFilter('SERVICE DENSITY')}
                  >
                    Service Density
                  </Button>
                  <Button 
                    variant={activeFilter === 'UTILIZATION' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveFilter('UTILIZATION')}
                  >
                    Utilization
                  </Button>
                </div>
              </div>
              
              <div className="relative h-96 bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg border overflow-hidden">
                {/* Background Map Image */}
                <img 
                  src={gtaMapBackground} 
                  alt="Greater Toronto Area Map" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                
                {/* Overlay for better visibility */}
                <div className="absolute inset-0 bg-background/20"></div>
                
                {/* Data Points */}
                {mapRegions.map((region) => (
                  <div
                    key={region.id}
                    className="absolute w-4 h-4 rounded-full border-2 border-background shadow-lg cursor-pointer hover:scale-125 transition-transform"
                    style={{
                      left: `${region.x}%`,
                      top: `${region.y}%`,
                      backgroundColor: getRegionColor(region),
                      transform: 'translate(-50%, -50%)'
                    }}
                    title={`${activeFilter === 'SERVICE DENSITY' ? region.density : region.utilization + '%'} ${activeFilter.toLowerCase()}`}
                    onClick={() => handleRegionClick(region)}
                  >
                    <div 
                      className="absolute inset-0 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: getRegionColor(region) }}
                    ></div>
                  </div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 border shadow-soft">
                  <h4 className="text-xs font-medium mb-2">
                    {activeFilter === 'SERVICE DENSITY' ? 'Service Density' : 'Utilization Rate'}
                  </h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-wellness"></div>
                      <span>{activeFilter === 'SERVICE DENSITY' ? 'High' : '70%+'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>{activeFilter === 'SERVICE DENSITY' ? 'Medium' : '50-70%'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-destructive"></div>
                      <span>{activeFilter === 'SERVICE DENSITY' ? 'Low' : '<50%'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold mb-4">Top Service Categories</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mental Health Counseling</span>
                    <Badge variant="outline">42%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Crisis Support</span>
                    <Badge variant="outline">28%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Group Therapy</span>
                    <Badge variant="outline">18%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Peer Support</span>
                    <Badge variant="outline">12%</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold mb-4">Resource Gaps</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm">Evening counseling services</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm">Language-specific therapy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm">Youth mental health programs</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-8">
            <Card className="p-8">
              <div className="text-center mb-6">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Generate Custom Reports</h3>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Generate comprehensive reports</span>
                </div>
              </div>
              
              <div className="flex gap-3 mb-6">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  2 Export
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-medium">Hotspots Analysis</span>
                <Badge variant="outline" className="ml-auto">Ready</Badge>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="community-portal" className="mt-8">
            <CommunityPortalSection onAISupportClick={() => setIsChatOpen(true)} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          </div>
        </div>
      </footer>

      {/* Side Panel */}
      {isPanelOpen && selectedRegion && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsPanelOpen(false)}
          />
          
          {/* Panel */}
          <div className="fixed right-0 top-0 h-full w-[480px] bg-background border-l border-border shadow-2xl z-50 overflow-y-auto">
            {/* Panel Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{selectedRegion.community}</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsPanelOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{selectedRegion.population.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Population</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-wellness">{selectedRegion.services}</p>
                  <p className="text-xs text-muted-foreground">Services</p>
                </div>
              </div>
              
              {/* Key Insights */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-primary" />
                  <span>Top Need: {selectedRegion.topIssue}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Avg Wait Time: {selectedRegion.avgWaitTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-wellness" />
                  <span>Utilization: {selectedRegion.utilization}%</span>
                </div>
              </div>
            </div>
            
            {/* Panel Content */}
            <div className="p-6 space-y-6">
              {/* Utilization Chart */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Resource Utilization</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mental Health Counseling</span>
                      <span>{Math.min(selectedRegion.utilization + 15, 100)}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${Math.min(selectedRegion.utilization + 15, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Crisis Support</span>
                      <span>{selectedRegion.utilization}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className="bg-destructive h-2 rounded-full" 
                        style={{ width: `${selectedRegion.utilization}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Group Therapy</span>
                      <span>{Math.max(selectedRegion.utilization - 20, 0)}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className="bg-wellness h-2 rounded-full" 
                        style={{ width: `${Math.max(selectedRegion.utilization - 20, 0)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Peer Support</span>
                      <span>{Math.max(selectedRegion.utilization - 30, 0)}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className="bg-secondary h-2 rounded-full" 
                        style={{ width: `${Math.max(selectedRegion.utilization - 30, 0)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Community Insights */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Community Insights</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">High Demand Period</p>
                      <p className="text-muted-foreground">Evening sessions (6-9 PM) show 40% higher utilization</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-wellness mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Language Services</p>
                      <p className="text-muted-foreground">
                        {selectedRegion.density === 'high' ? 'Multi-language support available' : 'Need for more diverse language options'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Resource Gap</p>
                      <p className="text-muted-foreground">
                        {selectedRegion.density === 'low' ? 'Insufficient weekend coverage' : 'Need for specialized youth programs'}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Available Resources */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Available Resources</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Crisis Support Center</p>
                      <p className="text-xs text-muted-foreground">24/7 Emergency Support</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Community Wellness Hub</p>
                      <p className="text-xs text-muted-foreground">Group & Individual Therapy</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Full</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Peer Support Network</p>
                      <p className="text-xs text-muted-foreground">Community-led Support</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Available</Badge>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                  onClick={() => setActiveTab('community-portal')}
                >
                  View All Resources
                </Button>
              </Card>
            </div>
          </div>
        </>
      )}

      {/* Chat Interface */}
      {isChatOpen && (
        <>
          {/* Chat Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsChatOpen(false)}
          />
          
          {/* Chat Panel */}
          <div className="fixed right-4 bottom-4 top-4 w-96 bg-background border border-border rounded-lg shadow-2xl z-50 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-primary/5 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Virtual AI Support</h3>
                  <p className="text-xs text-muted-foreground">Online • Ready to help</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsChatOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start gap-2 max-w-[80%]">
                    {message.sender === 'bot' && (
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 text-sm ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chat Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                🔒 This is a supportive AI assistant. For immediate crisis support, call 1-800-CRISIS
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PolicyDashboard;