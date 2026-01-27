'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const highlights = [
  {
    title: 'Estrategia primero',
    description: 'Diagnóstico claro, objetivos medibles y un plan que prioriza impacto.'
  },
  {
    title: 'Creatividad con propósito',
    description: 'Conceptos visuales y mensajes que conectan, no solo que se ven bien.'
  },
  {
    title: 'Iteración constante',
    description: 'Medimos, ajustamos y optimizamos cada etapa para crecer sostenido.'
  },
  {
    title: 'Equipo cercano',
    description: 'Trabajo colaborativo, comunicación directa y ejecución ágil.'
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="nosotros" className="py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6" data-anim>
              <span className="w-3 h-3 rounded-full bg-[#ca0013]" />
              <span className="text-sm font-medium text-white/70 uppercase tracking-wider">
                Sobre nosotros
              </span>
            </div>
            <h2
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
              data-anim
            >
              Diseñamos marcas que crecen con estrategia y performance.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="text-lg text-white/70 leading-relaxed" data-anim>
              Somos una agencia digital enfocada en construir identidades sólidas y
              campañas que convierten. Combinamos creatividad, data y ejecución
              precisa para impulsar resultados sostenibles.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="border border-white/10 bg-[#050205]/40 backdrop-blur-sm p-6 rounded-2xl"
                  data-anim
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
