'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlowingMenu from './FlowingMenu';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const flowingItems = [
  {
    text: 'Estrategia primero',
    link: '#servicios',
    image: '/images/logos/logok.png'
  },
  {
    text: 'Creatividad con propósito',
    link: '#servicios',
    image: '/images/logos/logok.png'
  },
  {
    text: 'Iteración constante',
    link: '#servicios',
    image: '/images/logos/logok.png'
  },
  {
    text: 'Equipo cercano',
    link: '#servicios',
    image: '/images/logos/logok.png'
  }
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-anim]');
      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      // FlowingMenu handles its own hover animations.
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="h-[600px] py-12 md:py-24 bg-transparent overflow-hidden flex flex-col justify-center items-center"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="flex items-center mb-6" data-anim>
              <span className="text-sm font-mono text-[#e40014] uppercase tracking-wider">
                [03] NOSOTROS
              </span>
            </div>
            <h2
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
              data-anim
            >
              Diseñamos estrategias que hacen crecer tu marca
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="text-lg text-white/70 leading-relaxed" data-anim>
              Somos una agencia digital enfocada en construir identidades sólidas y
              campañas que convierten. Combinamos creatividad, data y ejecución
              precisa para impulsar resultados sostenibles.
            </p>

            <div className="mt-10" style={{ height: '320px', position: 'relative' }} data-anim>
              <FlowingMenu
                items={flowingItems}
                speed={10}
                textColor="#ffffff"
                bgColor="transparent"
                marqueeBgColor="#ffffff"
                marqueeTextColor="#060010"
                borderColor="#ffffff"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
