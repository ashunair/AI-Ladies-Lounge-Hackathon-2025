import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import UserPathways from '@/components/UserPathways';
import PlatformPreview from '@/components/PlatformPreview';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <UserPathways />
        <PlatformPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
