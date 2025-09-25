import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import gtaMapBackground from '@/assets/toronto-map-real.png';
import { 
  Search, 
  Filter,
  Navigation,
  MapPin,
  Star,
  Clock,
  Phone,
  MessageCircle,
  AlertCircle,
  Users,
  Heart,
  Calendar,
  Languages,
  Baby,
  Bot
} from 'lucide-react';

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

interface CommunityPortalSectionProps {
  onAISupportClick?: () => void;
}

const CommunityPortalSection = ({ onAISupportClick }: CommunityPortalSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'immediate' | 'nearby'>('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'pending'>('pending');

  // Mock resources data
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

  return (
    <div className="max-w-none">
      {/* Crisis Banner */}
      <Card className="p-4 mb-6 bg-destructive/5 border-destructive/20">
        <div className="flex items-center gap-4">
          <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-bold text-destructive">Need Immediate Help?</h3>
            <p className="text-sm text-muted-foreground">24/7 crisis support available in multiple languages</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="destructive" 
              size="sm"
              onClick={onAISupportClick}
              className="flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              Virtual AI Support
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4" />
              Text Crisis Line
            </Button>
          </div>
        </div>
      </Card>

      {/* Search and Location */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map and Controls */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search Controls */}
          <Card className="p-4">
            <div className="flex gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Search for support services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
              >
                All Services
              </Button>
              <Button 
                variant={selectedFilter === 'immediate' ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('immediate')}
              >
                Immediate Help
              </Button>
              <Button 
                variant={selectedFilter === 'nearby' ? 'wellness' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('nearby')}
              >
                <Navigation className="w-4 h-4" />
                Nearby
              </Button>
            </div>
          </Card>

          {/* Interactive Map */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Resources Near You</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {locationPermission === 'granted' ? 'Using your location' : 'Using default location'}
              </div>
            </div>
            
            {/* Map Container */}
            <div className="relative h-96 bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg border overflow-hidden">
              {/* Background Map Image */}
              <img 
                src={gtaMapBackground} 
                alt="Toronto Map" 
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              
              {/* Overlay for better visibility */}
              <div className="absolute inset-0 bg-background/20"></div>

              {/* User Location */}
              {userLocation && (
                <div 
                  className="absolute w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg animate-pulse"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  title="Your Location"
                >
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
                </div>
              )}

              {/* Resource Markers */}
              {filteredResources.map((resource, index) => (
                <div
                  key={resource.id}
                  className="absolute w-8 h-8 rounded-full border-2 border-background shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center text-white text-xs font-bold"
                  style={{
                    left: `${20 + (index * 20)}%`,
                    top: `${25 + (index * 15)}%`,
                    backgroundColor: resource.type === 'crisis' ? 'hsl(var(--destructive))' :
                                   resource.type === 'group' ? 'hsl(var(--wellness))' :
                                   resource.type === 'counseling' ? 'hsl(var(--primary))' :
                                   'hsl(var(--secondary-foreground))'
                  }}
                  title={`${resource.name} - ${resource.distance}km away`}
                >
                  {resource.distance.toFixed(1)}
                </div>
              ))}

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 border shadow-soft">
                <h4 className="text-xs font-medium mb-2">Service Types</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <span>Crisis Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-wellness"></div>
                    <span>Group Therapy</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span>Counseling</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Resource List */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Available Resources ({filteredResources.length})</h3>
          
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="p-4 hover:shadow-medium transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                {getResourceIcon(resource.type)}
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">{resource.name}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-wellness text-wellness" />
                      <span className="text-xs">{resource.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Navigation className="w-3 h-3" />
                      {resource.distance} km
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{resource.hours}</span>
                  <Badge variant="outline" className="text-xs">
                    {resource.waitTime}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  <Languages className="w-3 h-3" />
                  <span>{resource.languages.slice(0, 2).join(', ')}</span>
                  {resource.languages.length > 2 && <span>+{resource.languages.length - 2} more</span>}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {resource.features.slice(0, 2).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature.includes('Childcare') && <Baby className="w-3 h-3 mr-1" />}
                    {feature.includes('24/7') && <Clock className="w-3 h-3 mr-1" />}
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="destructive"
                  className="flex-1"
                >
                  <Phone className="w-3 h-3" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Navigation className="w-3 h-3" />
                  Directions
                </Button>
              </div>
            </Card>
          ))}

          {/* Quick Actions */}
          <Card className="p-4 bg-wellness/5 border-wellness/20">
            <h4 className="font-semibold mb-3 text-wellness">Quick Actions</h4>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="w-4 h-4" />
                Join Support Group
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MessageCircle className="w-4 h-4" />
                Start Chat Support
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunityPortalSection;