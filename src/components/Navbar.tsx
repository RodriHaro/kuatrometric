'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '#inicio', label: 'INICIO' },
  { href: '#proyectos', label: 'PROYECTOS' },
  { href: '#nosotros', label: 'NOSOTROS' },
  { href: '#servicios', label: 'SERVICIOS' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const navbarHeight = 90; // navbar height
      
      let currentSection = 'inicio';
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top - navbarHeight;
        const sectionBottom = rect.bottom - navbarHeight;
        
        if (sectionTop <= 100 && sectionBottom > 100) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const navbarHeight = 90;
      const targetPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
      
      setActiveSection(elementId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setActiveSection('inicio');
  };

  return (
    <nav 
      className={`
        hidden md:block fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 ease-out
        ${isScrolled 
          ? 'bg-[#FFFEFA]/95 border-black/10 backdrop-blur-xl' 
          : 'bg-[#FFFEFA] border-black/[0.06]'
        }
        border-b
      `}
    >
      <div className="max-w-screen-2xl mx-auto px-10 h-[90px] flex items-center">
        
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={scrollToTop}
            className="transition-transform duration-300 hover:scale-105 focus:outline-none"
            aria-label="KUATROMETRIC - Volver al inicio"
          >
            <Image
              src="/images/logos/logokuatrometric.png"
              alt="KUATROMETRIC Logo"
              width={500}
              height={500}
              priority
              className="h-[28rem] w-[28rem] object-contain"
            />
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-12 ml-20">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            
            return (
              <li key={item.href}>
                <button
                  onClick={() => smoothScrollTo(sectionId)}
                  className={`
                    group relative font-medium text-base tracking-wide px-2 py-2
                    transition-all duration-300 ease-out
                    focus:outline-none
                    ${isActive 
                      ? 'text-black font-semibold' 
                      : 'text-gray-600 hover:text-black'
                    }
                  `}
                >
                  {item.label}
                  
                  
                </button>
              </li>
            );
          })}
        </ul>

        {/* Contact Button */}
        <div className="flex items-center ml-auto mr-8">
          <button
            onClick={() => smoothScrollTo('contacto')}
            className="
              group flex items-center space-x-2 
              px-6 py-4 border border-gray-300 rounded-full
              bg-transparent text-black text-sm font-medium tracking-wide
              transition-all duration-300 ease-out
              hover:border-gray-500 hover:shadow-lg hover:-translate-y-0.5
              focus:outline-none
            "
          >
            <span>CONTACTO</span>
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="m7 7 10 10M7 17 17 7"/>
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button (for future mobile implementation) */}
        <div className="md:hidden">
          <button
            className="p-2 text-gray-600 hover:text-black transition-colors focus:outline-none"
            aria-label="Abrir menú de navegación"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}