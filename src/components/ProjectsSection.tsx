'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

const projects: Project[] = [
  {
    id: '01',
    title: 'Lévrière Passion',
    description: 'Luxury cosmetics that redefine elegance, empowering women with timeless beauty and sophistication',
    image: '/images/projects/project-1.jpg',
    category: 'Branding & Web Design'
  },
  {
    id: '02',
    title: 'GiftGrove',
    description: 'Handcrafted gift packaging that transforms every present into a beautifully curated experience',
    image: '/images/projects/project-2.jpg',
    category: 'E-commerce & Packaging'
  },
  {
    id: '03',
    title: 'TechFlow Solutions',
    description: 'Innovative software solutions that streamline business processes and drive digital transformation',
    image: '/images/projects/project-3.jpg',
    category: 'Software Development'
  },
  {
    id: '04',
    title: 'Verde Wellness',
    description: 'Natural wellness products that promote healthy living and sustainable lifestyle choices',
    image: '/images/projects/project-4.jpg',
    category: 'Health & Wellness'
  }
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (projectsRef.current) {
        const projectCards = projectsRef.current.querySelectorAll('.project-card');
        
        projectCards.forEach((card, i) => {
          const speed = (i % 2 === 0) ? 0.2 : -0.2; // Parallax speed difference
          
          gsap.fromTo(card, 
            { y: 0 },
            {
              y: () => (i % 2 === 0 ? 100 * speed * 5 : -100 * speed * 5), // Move opposite directions with speed factor
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="proyectos" className="py-20 bg-transparent overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-6 lg:px-8 mb-24 relative z-10">
        <div className="text-center">
          {/* Showcase indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              SHOWCASE
            </span>
          </div>
          
          {/* Section title */}
          <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto">
            <span className="text-sm font-mono text-gray-500 hidden md:block">[01]</span>
            <h2 className="text-5xl md:text-8xl font-bold text-white text-center flex-1 leading-none tracking-tight">
              Proyectos
            </h2>
            <span className="text-sm font-mono text-gray-500 hidden md:block">©2025</span>
          </div>
          
          {/* Description */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Una selección curada de proyectos, mostrando nuestra experiencia.
          </p>
        </div>
      </div>
        
      {/* Projects Grid */}
      <div className="container mx-auto px-6 lg:px-8">
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-x-24 lg:gap-y-32">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`project-card group cursor-pointer ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
              {/* Project Image */}
              <div className="relative aspect-[4/5] mb-8 overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-gray-900/50">
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <span className="text-xs uppercase tracking-widest">{project.category}</span>
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Project Info */}
              <div className="space-y-3 md:pr-12">
                <div className="flex items-baseline justify-between border-b border-gray-800 pb-4 mb-4">
                  <h3 className="text-2xl font-medium text-white group-hover:text-gray-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                   <span className="text-xs font-mono text-gray-500">0{index + 1}</span>
                </div>
                
                <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}