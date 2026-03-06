'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '#clientes', label: '01. Clientes' },
  { href: '#servicios', label: '02. Servicios' },
  { href: '#nosotros', label: '03. Nosotros' },
  { href: '#contacto', label: '04. Contacto' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/kuatrometric' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/kuatrometric' },
];

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'contain';
      document.body.dataset.mobileMenuOpen = 'true';
    } else {
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
      delete document.body.dataset.mobileMenuOpen;
    }

    window.dispatchEvent(
      new CustomEvent('mobileMenuStateChange', {
        detail: { isOpen },
      })
    );

    return () => {
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
      delete document.body.dataset.mobileMenuOpen;
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const lenis = window.__lenis;
      const offset = elementId === 'nosotros' ? -156 : -72;

      if (lenis) {
        lenis.scrollTo(element, { offset });
      } else {
        const targetPosition = element.offsetTop + offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    const lenis = window.__lenis;

    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <nav 
        className={`
          md:hidden fixed top-0 left-0 right-0 z-50
          h-[72px] flex items-center pl-0
          transition-all duration-300 ease-out
          ${isScrolled 
            ? 'bg-black/95 backdrop-blur-md border-b border-white/10' 
            : 'bg-black'
          }
        `}
        style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}
      >
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 rounded -ml-46"
          aria-label="KUATROMETRIC - Volver al inicio"
        >
          <Image
            src="/images/logos/logokuatrometric.png"
            alt="KUATROMETRIC Logo"
            width={500}
            height={500}
            priority
            fetchPriority="high"
            className="h-[32rem] w-[32rem] object-contain"
          />
        </button>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className={`
            relative w-11 h-11 flex flex-col items-center justify-center ml-auto mr-8
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 rounded-lg
          `}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span 
            className={`
              block w-6 h-0.5 bg-white transition-all duration-250 ease-out origin-center
              ${isOpen ? 'rotate-45 translate-y-2' : ''}
            `}
          />
          <span 
            className={`
              block w-6 h-0.5 bg-white mt-1.5 transition-all duration-250 ease-out
              ${isOpen ? 'opacity-0 scale-0' : ''}
            `}
          />
          <span 
            className={`
              block w-6 h-0.5 bg-white mt-1.5 transition-all duration-250 ease-out origin-center
              ${isOpen ? '-rotate-45 -translate-y-2' : ''}
            `}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`
          md:hidden fixed inset-0 z-40 
          bg-[#FFFEFA] border-b border-[#E7E3DC]
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-y-0' : '-translate-y-full'}
          overscroll-contain
        `}
        style={{ 
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 72px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0)'
        }}
      >
        <div className="flex flex-col h-full px-6 py-12">
          
          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col justify-center">
            <ul className="mx-auto w-[260px] space-y-4 pl-8 text-center">
              {navItems.map((item) => {
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => smoothScrollTo(item.href.replace('#', ''))}
                      className={`
                        inline-flex w-full items-center justify-start text-left text-[24px] uppercase tracking-wider font-medium tabular-nums
                        transition-all duration-200 ease-out
                        focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 rounded
                        text-black hover:text-gray-700 active:text-gray-800
                      `}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Contact Section */}
          <div className="mt-12 mb-8 text-center">
            <div className="space-y-3">
              <div>
                <p className="text-gray-600 text-[18px]">
                  +54 9 2604 272400
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => window.location.href = 'mailto:kuatrometric@gmail.com'}
                  className="
                    group flex items-center space-x-3
                    transition-all duration-200 ease-out
                    focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 rounded-lg
                    hover:-translate-y-px active:translate-y-0
                  "
                  aria-label="Enviar email a kuatrometric@gmail.com"
                >
                  <div className="
                    w-10 h-10 bg-black rounded-full flex items-center justify-center
                    transition-all duration-200 ease-out
                    group-hover:w-[42px] group-hover:h-[42px]
                    group-focus:w-[42px] group-focus:h-[42px]
                  ">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="2"
                      className="rotate-45 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                  <span className="
                    text-[18px] font-bold text-black
                    transition-transform duration-200 ease-out
                    group-hover:-translate-y-px
                  ">
                    KUATROMETRIC@GMAIL.COM
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="text-center">
            <h3 className="text-gray-400 text-[16px] mb-8 tracking-wide">
              Seguinos
            </h3>
            <ul className="space-y-6 max-w-xs mx-auto">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group flex items-center justify-between
                      text-[18px] text-black font-medium
                      transition-all duration-200 ease-out
                      focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 rounded
                      hover:text-gray-700 active:text-gray-800
                    "
                    aria-label={`Visitar ${social.name} de KUATROMETRIC`}
                  >
                    <span>{social.name}</span>
                    {social.name === 'Instagram' ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
                      >
                        <rect x="4" y="4" width="16" height="16" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17" cy="7" r="1" />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
                      >
                        <path d="M6 9H9V19H6V9Z" />
                        <path d="M7.5 5C6.7 5 6 5.7 6 6.5C6 7.3 6.7 8 7.5 8C8.3 8 9 7.3 9 6.5C9 5.7 8.3 5 7.5 5Z" />
                        <path d="M11 9H14V10.5C14.4 9.8 15.3 9 16.7 9C19.1 9 19.5 10.6 19.5 12.6V19H16.5V13.3C16.5 12.3 16.3 11.5 15.3 11.5C14.3 11.5 13.9 12.2 13.9 13.3V19H11V9Z" />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
