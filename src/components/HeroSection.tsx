import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BarChart3, Users, MapPin, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative py-20 bg-gradient-subtle overflow-hidden">
      {/* Background image with 20% opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: "url('/team-unity-background.jpg')" }}
      ></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-wellness blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Bridging Mental Health
            <span className="bg-gradient-hero bg-clip-text text-transparent block">
              Resources & Communities
            </span>
          </h1>
          <p className="text-xl text-foreground mb-8 max-w-2xl mx-auto relative bg-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-glow border border-white/20 before:absolute before:inset-px before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none">
            Connecting policymakers with strategic insights and newcomer women with compassionate mental health support across Canada.
          </p>
          
          {/* Dual CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="xl" 
              className="min-w-[240px]"
              onClick={() => navigate('/policy-dashboard')}
            >
              <BarChart3 className="w-5 h-5" />
              Policy Dashboard
            </Button>
            <Button 
              variant="community" 
              size="xl" 
              className="min-w-[240px]"
              onClick={() => navigate('/support-map')}
            >
              <Heart className="w-5 h-5" />
              Find Support Now
            </Button>
          </div>
        </div>
        
        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 text-center shadow-soft hover:shadow-medium transition-shadow">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">39%</h3>
            <p className="text-muted-foreground">
              of newcomer women experience anxiety symptoms
            </p>
          </Card>
          
          <Card className="p-6 text-center shadow-soft hover:shadow-medium transition-shadow">
            <div className="w-16 h-16 bg-gradient-wellness rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-wellness-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-wellness mb-2">48.8%</h3>
            <p className="text-muted-foreground">
              access rate for those with mental health needs
            </p>
          </Card>
          
          <Card className="p-6 text-center shadow-soft hover:shadow-medium transition-shadow">
            <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">$4B</h3>
            <p className="text-muted-foreground">
              annual opportunity cost in Canada
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;