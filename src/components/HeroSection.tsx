'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface OverlapTextProps {
  text: string;
  direction?: 'back' | 'front';
  className?: string;
}

const OverlapText = ({ text, direction = 'back', className = '' }: OverlapTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const textContent = textRef.current.textContent || '';
      textRef.current.innerHTML = [...textContent]
        .map((char, index) => `<span style="--i:${index}" class="overlap-char inline-block">${char}</span>`)
        .join('');
      
      // GSAP Stagger animation for characters
      const chars = textRef.current.querySelectorAll('.overlap-char');
      
      gsap.set(chars, { 
        y: 30, 
        opacity: 0,
        scale: 0.8
      });
      
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: {
          amount: 0.4,
          from: 'start'
        },
        delay: 0.2
      });
    }
  }, [text]);

  return (
    <div
      ref={textRef}
      className={`overlap-text ${direction === 'back' ? 'overlap-back' : ''} ${className}`}
      data-text={text}
    >
      {text}
    </div>
  );
};

export default function HeroSection() {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate subtitle
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, {
          y: 50,
          opacity: 0
        });
        
        gsap.to(subtitleRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.8
        });
      }

      // Animate buttons with stagger
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.querySelectorAll('button');
        
        gsap.set(buttons, {
          y: 80,
          opacity: 0,
          scale: 0.8
        });
        
        gsap.to(buttons, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: {
            amount: 0.15,
            from: 'start'
          },
          delay: 1.2
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section min-h-screen flex flex-col items-center justify-center bg-[#FFFEFA] px-6">
      <div className="text-center">
        <OverlapText
          text="KUATROMETRIC"
          direction="back"
          className="hero-title"
        />
        
        <p 
          ref={subtitleRef}
          className="mt-8 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Estrategias de marketing digital diseñadas para una sola métrica: el crecimiento de tu negocio.
        </p>
        
        <div 
          ref={buttonsRef}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-[#FF4444] to-[#FF6B6B] text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            Ver Nuestros Proyectos
          </button>
          <button className="px-8 py-4 border border-gray-300 text-gray-700 rounded-full font-medium hover:border-gray-400 transition-all duration-300 hover:-translate-y-1">
            Conocer Más
          </button>
        </div>
      </div>
    </section>
  );
}
