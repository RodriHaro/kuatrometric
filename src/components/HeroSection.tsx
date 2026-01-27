'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface OverlapTextProps {
  text: string;
  direction?: 'back' | 'front';
  className?: string;
  highlightWord?: string;
}

const OverlapText = ({
  text,
  direction = 'back',
  className = '',
  highlightWord,
}: OverlapTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(' ');

  // Use useLayoutEffect to prevent FOUC
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = containerRef.current?.querySelectorAll('.overlap-char');
      
      if (chars) {
        // Use fromTo to ensure starting state is forced by GSAP, overriding any lingering CSS issues
        gsap.fromTo(chars, 
          { 
            y: 30, 
            opacity: 0,
            scale: 0.8 
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: {
               amount: 0.3,
               from: 'start'
            },
            delay: 0.1
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`overlap-text ${direction === 'back' ? 'overlap-back' : ''} ${className}`}
      data-text={text}
    >
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className={`overlap-word${word === highlightWord ? ' overlap-word-highlight' : ''}`}
        >
          {word.split('').map((char, index) => (
            <span
              key={`${wordIndex}-${index}`}
              style={{
                '--i': wordIndex * 100 + index,
                opacity: 0, // Ensure hidden initially
                display: 'inline-block',
              } as React.CSSProperties}
              className="overlap-char"
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 ? (
            <span className="overlap-space">&nbsp;</span>
          ) : null}
        </span>
      ))}
    </div>
  );
};

export default function HeroSection() {
  return (
    <section className="hero-section h-screen flex flex-col items-start justify-center bg-transparent px-6 relative overflow-hidden">
      <div className="w-full max-w-5xl -mt-20 select-none z-10 relative">
        <div className="space-y-2 text-left">
          <OverlapText
            text="Somos"
            direction="back"
            className="hero-title hero-overlap-text text-white"
          />
          <OverlapText
            text="KUATROMETRIC"
            direction="back"
            highlightWord="KUATROMETRIC"
            className="hero-title hero-overlap-text text-white"
          />
        </div>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-white/80 max-w-2xl">
          Agencia digital de marketing enfocada en estrategia, contenido y performance.
        </p>
      </div>
    </section>
  );
}
