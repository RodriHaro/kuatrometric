'use client';

import dynamic from 'next/dynamic';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import ServicesSection from '../components/ServicesSection';
import Footer from '../components/Footer';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050205]">
       {/* Global 3D Background */}
      <div className="fixed inset-0 z-0 select-none pointer-events-none">
        <Scene />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <section id="inicio">
            <HeroSection />
        </section>

        <ProjectsSection />
        {/* ViewAllWorksButton Removed */}
        <ServicesSection />
        <Footer />
      </div>
    </main>
  );
}
