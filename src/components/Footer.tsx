import React from 'react';
import { Button } from '@/components/ui/button';
import MindBridgeLogo from './MindBridgeLogo';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <MindBridgeLogo size="lg" />
              <div>
                <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  MindBridge
                </h3>
                <p className="text-sm text-muted-foreground">
                  Connecting Mental Health Resources
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Bridging the gap between mental health service supply and demand for newcomer women in Canada through data-driven insights and community connections.
            </p>
            <div className="flex gap-4">
              <Button variant="hero" size="sm">
                <Heart className="w-4 h-4" />
                Get Started
              </Button>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform Access</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Policy Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-wellness transition-colors">
                  Community Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Resource Directory
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Analytics Suite
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support & Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Crisis Support
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  User Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="text-sm text-muted-foreground">
              © 2024 MindBridge. Supporting mental health across Canada.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;