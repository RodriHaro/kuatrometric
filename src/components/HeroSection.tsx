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
}

const OverlapText = ({ text, direction = 'back', className = '' }: OverlapTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          style={{ 
            '--i': index, 
            opacity: 0, // Ensure hidden initially
            display: 'inline-block' 
          } as React.CSSProperties} 
          className="overlap-char"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default function HeroSection() {
  return (
    <section className="hero-section h-screen flex flex-col items-center justify-center bg-transparent px-6 relative overflow-hidden">
      <div className="text-center -mt-20 select-none z-10 relative"> 
        <OverlapText
          text="KUATROMETRIC"
          direction="back"
          className="hero-title text-white"
        />
      </div>
    </section>
  );
}
