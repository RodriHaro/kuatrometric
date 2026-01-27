'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-cta-anim]');
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
    <section ref={sectionRef} id="contacto" className="py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-[#0b0b0b]/80 backdrop-blur-sm p-10 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(202,0,19,0.25),transparent_50%)]" />

          <div className="relative z-10 max-w-4xl">
            <span className="text-sm font-mono text-[#ca0013] tracking-wider" data-cta-anim>
              [03] HABLEMOS
            </span>
            <h2
              className="mt-4 text-4xl md:text-6xl font-bold text-white leading-tight"
              data-cta-anim
            >
              ¿Listos para impulsar tu marca con una estrategia clara?
            </h2>
            <p className="mt-4 text-lg text-white/70" data-cta-anim>
              Cuéntanos tu objetivo y armamos una propuesta a medida en menos de 48 horas.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4" data-cta-anim>
              <a
                href="mailto:info@kuatrometric.com"
                className="inline-flex items-center justify-center rounded-full bg-[#ca0013] px-8 py-4 text-white font-semibold tracking-wide transition-transform duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ca0013]"
              >
                Agenda una llamada
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-white/80 font-semibold tracking-wide transition-colors duration-300 hover:text-white hover:border-white"
              >
                Ver servicios
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
