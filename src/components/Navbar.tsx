'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

declare global {
  interface Window {
    __lenis?: {
      scrollTo: (target: HTMLElement | number | string, options?: { offset?: number }) => void;
    } | null;
  }
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    const handleWindowScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const attachLenisListener = () => {
      const lenis = window.__lenis as any;
      if (!lenis || typeof lenis.on !== 'function' || typeof lenis.off !== 'function') {
        return false;
      }

      const onLenisScroll = (e: { scroll: number }) => {
        setIsScrolled(e.scroll > 50);
      };

      lenis.on('scroll', onLenisScroll);
      cleanupFns.push(() => lenis.off('scroll', onLenisScroll));
      return true;
    };

    // Intentamos usar Lenis; si no está listo, usamos window.scroll y esperamos el evento "lenisReady"
    if (!attachLenisListener()) {
      window.addEventListener('scroll', handleWindowScroll, { passive: true });
      cleanupFns.push(() => window.removeEventListener('scroll', handleWindowScroll));

      const onLenisReady = () => {
        window.removeEventListener('scroll', handleWindowScroll);
        attachLenisListener();
        window.removeEventListener('lenisReady', onLenisReady as EventListener);
      };

      window.addEventListener('lenisReady', onLenisReady as EventListener);
      cleanupFns.push(() => window.removeEventListener('lenisReady', onLenisReady as EventListener));
    }

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const lenis = window.__lenis;

    if (lenis) {
      lenis.scrollTo(element, { offset: -90 });
    } else {
      const navbarHeight = 90;
      const targetPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    const lenis = window.__lenis;

    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="
        hidden md:block fixed top-6 left-0 right-0 z-50
        flex justify-center
        px-4
        pointer-events-none
      "
    >
      <div
        className={`
          pointer-events-auto
          w-full max-w-[900px] lg:max-w-[980px] mx-auto
          px-6 md:px-8 lg:px-10
          py-3 lg:py-4
          flex justify-between items-center relative
          rounded-full border border-gray-800
          transition-all duration-300 ease-out
          ${isScrolled ? 'bg-black/70 backdrop-blur-md shadow-xl' : 'bg-black/40 backdrop-blur-md shadow-lg'}
        `}
      >
        
        {/* Left Links */}
        <div className="flex gap-6 lg:gap-10 w-1/3 justify-end">
          <button 
            onClick={() => smoothScrollTo('clientes')}
            className="text-base lg:text-lg font-semibold tracking-wide hover:opacity-60 transition-opacity uppercase text-white text-left leading-none whitespace-nowrap"
          >
            01. Clientes
          </button>
          <button 
            onClick={() => smoothScrollTo('servicios')}
            className="text-base lg:text-lg font-semibold tracking-wide hover:opacity-60 transition-opacity uppercase text-white text-left leading-none whitespace-nowrap"
          >
            02. Servicios
          </button>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button onClick={scrollToTop} className="block transition-transform hover:scale-105">
            <Image
              src="/images/logos/logok.png"
              alt="KUATROMETRIC"
              width={120}
              height={120}
              priority
              fetchPriority="high"
              className="w-[120px] lg:w-[130px] h-auto object-contain"
            />
          </button>
        </div>

        {/* Right Links */}
        <div className="flex gap-6 lg:gap-10 w-1/3 justify-start">
          <button 
            onClick={() => smoothScrollTo('nosotros')}
            className="text-base lg:text-lg font-semibold tracking-wide hover:opacity-60 transition-opacity uppercase text-white text-left leading-none whitespace-nowrap"
          >
            03. Nosotros
          </button>
          <button 
            onClick={() => smoothScrollTo('contacto')}
            className="text-base lg:text-lg font-semibold tracking-wide hover:opacity-60 transition-opacity uppercase text-white text-left leading-none whitespace-nowrap"
          >
            04. Contacto
          </button>
        </div>
      </div>
    </nav>
  );
}
