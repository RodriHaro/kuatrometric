'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const navbarHeight = 90;
      const targetPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      className={`
        hidden md:block fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 ease-out py-6
        ${isScrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-transparent'}
      `}
    >
      <div className="max-w-screen-2xl mx-auto px-10 flex justify-between items-center relative">
        
        {/* Left Links */}
        <div className="flex gap-12 w-1/3">
          <button 
            onClick={() => smoothScrollTo('proyectos')}
            className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity uppercase text-black"
          >
            01. Proyectos
          </button>
          <button 
            onClick={() => smoothScrollTo('nosotros')}
            className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity uppercase text-black"
          >
            02. Nosotros
          </button>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button onClick={scrollToTop} className="block transition-transform hover:scale-105">
            <Image
              src="/images/logos/logokuatrometric.png"
              alt="KUATROMETRIC"
              width={400}
              height={100}
              priority
              className="w-[400px] h-auto object-contain"
            />
          </button>
        </div>

        {/* Right Links */}
        <div className="flex gap-12 w-1/3 justify-end">
          <button 
            onClick={() => smoothScrollTo('servicios')}
            className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity uppercase text-black"
          >
            03. Servicios
          </button>
           <button 
            onClick={() => smoothScrollTo('contacto')}
            className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity uppercase text-black"
          >
            04. Contacto
          </button>
        </div>
      </div>
    </nav>
  );
}