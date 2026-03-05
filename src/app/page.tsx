'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '../components/HeroSection';
import ClientsSection from '../components/ClientsSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import WhatsappButton from '../components/WhatsappButton';
import ScrollToTopButton from '../components/ScrollToTopButton';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#050205]">
      <div className="fixed inset-0 z-0 select-none pointer-events-none">
        <Scene />
      </div>

      <div
        className={`relative z-10 transition-opacity duration-500 ease-out ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <section id="inicio">
          <HeroSection />
        </section>
        <ClientsSection />
        <ServicesSection />
        <AboutSection />
        <CtaSection />
        <Footer />
      </div>

      <WhatsappButton />
      <ScrollToTopButton />
    </main>
  );
}
