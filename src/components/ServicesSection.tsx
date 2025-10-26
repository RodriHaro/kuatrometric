'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
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
  image: string;
  tags: string[];
}

const services: Service[] = [
  {
    id: '01',
    number: '1',
    title: 'SEO',
    description: 'Construimos identidades de marca distintivas que generan reconocimiento y crean impresiones duraderas.',
    image: '/images/services/service-1.jpg',
    tags: ['Logos', 'Corporate Identity', 'Copywriting', 'Wireframes']
  },
  {
    id: '02',
    number: '2',
    title: 'Marketing Digital',
    description: 'Estrategias de marketing digital que impulsan el crecimiento y maximizan el retorno de inversión.',
    image: '/images/services/service-2.jpg',
    tags: ['Social Media', 'Content Marketing', 'Email Marketing', 'Analytics']
  },
  {
    id: '03',
    number: '3',
    title: 'Desarrollo Web',
    description: 'Sitios web modernos y aplicaciones que combinan diseño atractivo con funcionalidad excepcional.',
    image: '/images/services/service-3.jpg',
    tags: ['Frontend', 'Backend', 'E-commerce', 'Mobile Apps']
  },
  {
    id: '04',
    number: '4',
    title: 'Consultoría',
    description: 'Asesoramiento estratégico para optimizar procesos y acelerar el crecimiento empresarial.',
    image: '/images/services/service-4.jpg',
    tags: ['Strategy', 'Business Analysis', 'Process Optimization', 'Growth Hacking']
  }
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header elements on scroll
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

      // Animate services with stagger
      if (servicesRef.current) {
        const serviceItems = servicesRef.current.querySelectorAll('.service-item');
        
        serviceItems.forEach((item, index) => {
          const serviceElements = item.querySelectorAll('.animate-service');
          
          gsap.set(serviceElements, {
            y: 80,
            opacity: 0,
            scale: 0.9
          });
          
          gsap.to(serviceElements, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: {
              amount: 0.3,
              from: 'start'
            },
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="servicios" className="py-20 bg-[#F8F8F8]">
      {/* Header */}
      <div className="container mx-auto px-6 lg:px-8">
        {/* Scroll Down Button */}
        <div className="flex justify-center mb-16">
          <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors duration-300 cursor-pointer animate-header">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-600"
            >
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>

        <div ref={headerRef} className="text-center mb-20">
          {/* QUE OFRECEMOS indicator */}
          <div className="flex items-center justify-center mb-8 animate-header">
            <div className="w-3 h-3 bg-black rounded-full mr-3"></div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              QUE OFRECEMOS
            </span>
          </div>
          
          {/* Section title */}
          <div className="flex items-center justify-between mb-8 animate-header">
            <span className="text-sm font-mono text-gray-400">[02]</span>
            <h2 className="text-5xl md:text-7xl font-bold text-black text-center flex-1">
              Servicios
            </h2>
            <span className="text-sm font-mono text-gray-400">©2025</span>
          </div>
          
          {/* Description */}
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed animate-header">
            Nuestro equipo reúne desarrolladores, diseñadores, estrategas y analistas para 
            crear experiencias digitales perfectas. No recortamos esquinas - cada producto 
            se construye con precisión, manteniéndose fiel a su visión original.
          </p>
        </div>
        
        {/* Services List */}
        <div ref={servicesRef} className="space-y-24">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={`service-item flex flex-col lg:flex-row items-start gap-12 lg:gap-16 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Service Content */}
              <div className="flex-1 lg:max-w-lg">
                {/* Service Number */}
                <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center mb-8 animate-service">
                  <span className="text-2xl font-bold text-gray-700">{service.number}</span>
                </div>

                {/* Service Title */}
                <div className="flex items-center mb-6 animate-service">
                  <div className="w-3 h-3 bg-black rounded-full mr-4"></div>
                  <h3 className="text-3xl md:text-4xl font-bold text-black">
                    {service.title}
                  </h3>
                </div>

                {/* Service Description */}
                <p className="text-lg text-gray-600 leading-relaxed mb-8 animate-service">
                  {service.description}
                </p>

                {/* Service Tags */}
                <div className="flex flex-wrap gap-3 animate-service">
                  {service.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service Image */}
              <div className="flex-1 lg:max-w-2xl animate-service">
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg">
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gray-300 rounded mb-4 mx-auto"></div>
                        <p className="text-sm">Service Image {index + 1}</p>
                      </div>
                    </div>
                  </div>
                  {/* Optional: Add real image when available
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}