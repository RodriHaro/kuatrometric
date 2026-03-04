'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
}

const services: Service[] = [
  {
    id: '01',
    number: '01',
    title: 'SEO & Performance',
    description: 'Optimizamos tu presencia digital para maximizar el rendimiento y la visibilidad orgánica.',
    tags: ['Auditoría', 'Optimización', 'Velocidad', 'Ranking']
  },
  {
    id: '02',
    number: '02',
    title: 'Marketing Digital',
    description: 'Estrategias de marketing digital que impulsan el crecimiento y maximizan el retorno de inversión.',
    tags: ['Social Media', 'Content', 'Email', 'Analytics']
  },
  {
    id: '03',
    number: '03',
    title: 'Desarrollo Web',
    description: 'Sitios web modernos y aplicaciones que combinan diseño atractivo con funcionalidad excepcional.',
    tags: ['Frontend', 'Backend', 'E-commerce', 'App']
  },
  {
    id: '04',
    number: '04',
    title: 'Consultoría',
    description: 'Asesoramiento estratégico para optimizar procesos y acelerar el crecimiento empresarial.',
    tags: ['Estrategia', 'Análisis', 'Procesos', 'Growth']
  },
  {
    id: '05',
    number: '05',
    title: 'Branding',
    description: 'Construimos identidades de marca que conectan y perduran en la mente del consumidor.',
    tags: ['Logo', 'Identidad', 'Voz', 'Diseño']
  },
  {
    id: '06',
    number: '06',
    title: 'Automatización y software a medida',
    description: 'Diseñamos y desarrollamos soluciones digitales a medida que automatizan procesos clave, reducen errores operativos y liberan tiempo para que tu equipo se enfoque en lo estratégico.',
    tags: ['Automatización', 'Integraciones', 'Sistemas a medida', 'Flujos']
  }
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Use useLayoutEffect for GSAP to ensure DOM is ready for measurement
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;

      if (track && section) {
        
        const getScrollAmount = () => {
           // Calculate exactly how much we need to move left
           // (Full Content Width) - (Viewport Width)
           return -(track.scrollWidth - window.innerWidth);
        };

        const tween = gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            // Pin duration: equal to the distance we need to scroll horizontally
            // Multiplied by window.innerHeight/viewport width or a factor to control speed if desired
            // here strictly simply ensuring we cover the full distance
            end: () => `+=${track.scrollWidth - window.innerWidth}`, 
            scrub: 1,
            invalidateOnRefresh: true, 
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="servicios" className="h-screen bg-transparent relative overflow-hidden flex items-center">
      {/* Background/Overlay elements can go here if needed */}
      
      <div ref={trackRef} className="flex gap-12 px-12 md:px-24 w-max items-center">
        {/* Header/Intro Card */}
        <div className="w-[80vw] md:w-[600px] shrink-0 flex flex-col justify-center">
            <span className="text-sm font-mono text-[#e40014] mb-4 tracking-wider">[02] SERVICIOS</span>
            <h2 className="text-6xl md:text-8xl font-bold text-white leading-none mb-8">
              LO QUE<br/>HACEMOS
            </h2>
            <p className="text-xl text-gray-400 max-w-md">
              Soluciones digitales integrales diseñadas para elevar tu marca en un ecosistema competitivo.
            </p>
            <div className="mt-12 flex items-center gap-4">
              <span className="text-gray-500 text-sm font-mono">DESLIZÁ PARA EXPLORAR</span>
              <div className="h-[1px] w-20 bg-gray-600"></div>
            </div>
        </div>

        {/* Service Cards */}
        {services.map((service, index) => (
            <div
            key={service.id}
            className="w-[85vw] md:w-[450px] h-[550px] shrink-0 border border-gray-800 bg-[#050205]/40 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-between group hover:border-[#e40014]/50 transition-colors duration-500 rounded-sm"
          >
            <div>
              <span className="block text-7xl md:text-9xl font-bold text-[#e40014] mb-6 leading-none">
                {service.number}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white uppercase mb-4 group-hover:text-[#e40014] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="pt-8 border-t border-gray-800 mt-auto">
               <div className="flex flex-wrap gap-2">
                 {service.tags.map((tag, i) => (
                   <span key={i} className="text-xs font-mono text-gray-500 uppercase tracking-widest border border-gray-800 px-2 py-1 rounded-sm">
                     {tag}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        ))}
        
        {/* Final Trigger/Spacer */}
        <div className="w-[20vw] shrink-0"></div>
      </div>
    </section>
  );
}
