'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const brandRef = useRef<HTMLHeadingElement | null>(null);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const navbarHeight = 90;
      const targetPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  useLayoutEffect(() => {
    if (!brandRef.current) return;

    const ctx = gsap.context(() => {
      const chars = brandRef.current?.querySelectorAll<HTMLElement>('[data-footer-char]');
      if (!chars || !chars.length) return;

      gsap.set(chars, {
        transformOrigin: '50% 50%',
      });

      // Entrada tipo "matrix" en rojo al entrar el footer en viewport
      gsap.fromTo(
        chars,
        {
          y: 60,
          skewX: 30,
          scaleY: 1.8,
          opacity: 0,
          filter: 'blur(10px)',
        },
        {
          y: 0,
          skewX: 0,
          scaleY: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'expo.out',
          stagger: {
            amount: 0.9,
            from: 'random',
          },
          scrollTrigger: {
            trigger: brandRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Pequeña deformación continua, estilo glitch/matrix suave solo cuando el footer está en viewport
      gsap.to(chars, {
        y: () => gsap.utils.random(-3, 3),
        skewX: () => gsap.utils.random(-6, 6),
        filter: 'blur(1px)',
        duration: 0.3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.5,
          from: 'random',
        },
        repeatDelay: 1.4,
        scrollTrigger: {
          trigger: brandRef.current,
          start: 'top 80%',
        },
      });
    }, brandRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-[#F8F8F8] h-[710px] py-8 md:py-16 px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Contact Section */}
        <div className="mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-light text-gray-600 mb-6 md:mb-12">
            Contacto
          </h2>
          
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className="rotate-45"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <a 
                href="mailto:kuatrometric@gmail.com"
                className="text-xl md:text-2xl font-medium text-black hover:text-gray-600 transition-colors duration-300"
              >
                KUATROMETRIC@GMAIL.COM
              </a>
            </div>
            
            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className="rotate-45"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <a 
                href="tel:+5492604272400"
                className="text-xl md:text-2xl font-medium text-black hover:text-gray-600 transition-colors duration-300"
              >
                +54 9 2604 272400
              </a>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <rect x="4" y="4" width="16" height="16" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17" cy="7" r="1" />
                </svg>
              </div>
              <a
                href="https://www.instagram.com/kuatrometric/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl font-medium text-black hover:text-gray-600 transition-colors duration-300"
              >
                @kuatrometric
              </a>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M6 9H9V19H6V9Z" />
                  <path d="M7.5 5C6.7 5 6 5.7 6 6.5C6 7.3 6.7 8 7.5 8C8.3 8 9 7.3 9 6.5C9 5.7 8.3 5 7.5 5Z" />
                  <path d="M11 9H14V10.5C14.4 9.8 15.3 9 16.7 9C19.1 9 19.5 10.6 19.5 12.6V19H16.5V13.3C16.5 12.3 16.3 11.5 15.3 11.5C14.3 11.5 13.9 12.2 13.9 13.3V19H11V9Z" />
                </svg>
              </div>
              <a
                href="https://www.linkedin.com/company/kuatrometric/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl font-medium text-black hover:text-gray-600 transition-colors duration-300"
              >
                LinkedIn / Kuatrometric
              </a>
            </div>
          </div>
        </div>

        {/* Large Brand Name */}
        <div className="text-center">
          <h1
            ref={brandRef}
            className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight text-black"
          >
            <span className="inline-block whitespace-nowrap">
              {'KUATRO'.split('').map((char, index) => (
                <span
                  key={`kuatro-${index}`}
                  data-footer-char
                  className="inline-block will-change-transform text-black"
                >
                  {char}
                </span>
              ))}
            </span>
            <wbr />
            <span className="inline-block whitespace-nowrap">
              {'METRIC'.split('').map((char, index) => (
                <span
                  key={`metric-${index}`}
                  data-footer-char
                  className="inline-block will-change-transform text-black"
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 md:mt-12 pt-4 md:pt-8 border-t border-gray-300 flex justify-center items-center h-0">
          <p className="text-sm text-gray-500">
            © 2026 Kuatrometric. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}