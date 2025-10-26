'use client';

import Image from 'next/image';
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
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header elements
      if (headerRef.current) {
        const headerElements = headerRef.current.querySelectorAll('.animate-header');
        
        gsap.set(headerElements, {
          y: 60,
          opacity: 0
        });
        
        gsap.to(headerElements, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: {
            amount: 0.4,
            from: 'start'
          },
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      }

      // Animate projects with stagger
      if (projectsRef.current) {
        const projectCards = projectsRef.current.querySelectorAll('.project-card');
        
        gsap.set(projectCards, {
          y: 100,
          opacity: 0,
          scale: 0.8
        });
        
        gsap.to(projectCards, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: {
            amount: 0.6,
            from: 'start',
            grid: 'auto'
          },
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="proyectos" className="py-20 bg-[#FFFEFA]">
      {/* Header */}
      <div className="container mx-auto px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          {/* Showcase indicator */}
          <div className="flex items-center justify-center mb-8 animate-header">
            <div className="w-3 h-3 bg-black rounded-full mr-3"></div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              SHOWCASE
            </span>
          </div>
          
          {/* Section title */}
          <div className="flex items-center justify-between mb-8 animate-header">
            <span className="text-sm font-mono text-gray-400">[01]</span>
            <h2 className="text-5xl md:text-7xl font-bold text-black text-center flex-1">
              Proyectos
            </h2>
            <span className="text-sm font-mono text-gray-400">©2025</span>
          </div>
          
          {/* Description */}
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed animate-header">
            Una selección curada de proyectos, mostrando nuestra experiencia en diseño web, 
            branding, animación y más. Cada proyecto refleja nuestra pasión por la creatividad 
            y la innovación—descubre cómo podemos dar vida a tus ideas.
          </p>
        </div>
        
        {/* Projects Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="project-card group cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg">
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 rounded mb-4 mx-auto"></div>
                      <p className="text-sm">Project Image {index + 1}</p>
                    </div>
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
              
              {/* Project Info */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-black group-hover:text-gray-700 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 uppercase tracking-wide">
                    {project.category}
                  </span>
                  
                  {/* Learn More Button */}
                  <button className="group/btn flex items-center space-x-3 px-6 py-3 border border-gray-300 rounded-full hover:border-gray-400 transition-all duration-300 hover:-translate-y-0.5">
                    <span className="text-sm font-medium text-black">LEARN MORE</span>
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:scale-110">
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="2"
                        className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      >
                        <path d="m7 7 10 10M7 17 17 7"/>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}