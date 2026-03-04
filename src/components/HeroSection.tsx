'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';

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
  const words = text.split(' ');

  return (
    <div
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
              className="overlap-char inline-block"
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

const QuoteText = ({ children }: { children: ReactNode }) => (
  <figure className="mt-[10%] max-w-3xl text-left">
    <blockquote className="hero-quote inline-block text-base sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-semibold tracking-tight text-left">
      <span className="inline-block border-l border-[#e40014]/70 pl-4 ml-1">
        {children}
      </span>
    </blockquote>
  </figure>
);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const titles = heroRef.current?.querySelectorAll<HTMLElement>('.hero-title');
      const quote = heroRef.current?.querySelector<HTMLElement>('.hero-quote');

      if (titles && titles.length) {
        // Animación constante y sutil sobre los títulos, sin afectar visibilidad inicial
        gsap.to(titles, {
          y: 6,
          duration: 2.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: {
            each: 0.4,
            yoyo: true,
          },
        });
      }

      if (quote) {
        // Aparición elegante del texto de la cita
        gsap.fromTo(
          quote,
          { opacity: 0, y: 20, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power2.out',
            delay: 0.3,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section h-screen flex flex-col items-center justify-center bg-transparent px-6 relative overflow-hidden"
    >
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
        <QuoteText>
          Agencia de growth marketing que combina estrategia, SEO &amp; performance, marketing de contenidos, desarrollo web, branding y automatización a medida para transformar tráfico en negocio real.
        </QuoteText>
      </div>
    </section>
  );
}
