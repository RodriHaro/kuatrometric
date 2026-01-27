'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface NavItem {
  href: string;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { href: '#inicio', label: 'INICIO', path: '/' },
  { href: '#proyectos', label: 'PROYECTOS', path: '/proyectos' },
  { href: '#nosotros', label: 'NOSOTROS', path: '/nosotros' },
  { href: '#servicios', label: 'SERVICIOS', path: '/servicios' },
  { href: '#contacto', label: 'CONTACTO', path: '/contacto' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/kuatrometric' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/kuatrometric' },
];

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'contain';
    } else {
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const navbarHeight = 72;
      const targetPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsOpen(false);
  };

  const isActiveSection = (href: string) => {
    const sectionId = href.replace('#', '');
    // Simple active detection - you can enhance this with intersection observer
    return pathname === '/' && sectionId === 'inicio';
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
            <ul className="space-y-4 text-center">
              {navItems.map((item) => {
                const isActive = isActiveSection(item.href);
                
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => smoothScrollTo(item.href.replace('#', ''))}
                      className={`
                        block w-full text-center text-[24px] tracking-wider font-medium
                        transition-all duration-200 ease-out
                        focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 rounded
                        ${isActive 
                          ? 'text-black font-semibold' 
                          : 'text-black hover:text-gray-700 active:text-gray-800'
                        }
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
                  (+359) 932 91 20 42
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => window.location.href = 'mailto:info@kuatrometric.com'}
                  className="
                    group flex items-center space-x-3
                    transition-all duration-200 ease-out
                    focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 rounded-lg
                    hover:-translate-y-px active:translate-y-0
                  "
                  aria-label="Enviar email a info@kuatrometric.com"
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
                      className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path d="m7 7 10 10M7 17 17 7"/>
                    </svg>
                  </div>
                  <span className="
                    text-[18px] font-bold text-black
                    transition-transform duration-200 ease-out
                    group-hover:-translate-y-px
                  ">
                    INFO@KUATROMETRIC.COM
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="text-center">
            <h3 className="text-gray-400 text-[16px] mb-8 tracking-wide">
              Follow us
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
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      className="transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
                    >
                      <path d="m7 7 10 10M7 17 17 7"/>
                    </svg>
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
