'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';

interface OverlapTextProps {
  text: string;
  direction?: 'back' | 'front';
  className?: string;
  highlightWord?: string;
  highlightWords?: string[];
}

const OverlapText = ({
  text,
  direction = 'back',
  className = '',
  highlightWord,
  highlightWords,
}: OverlapTextProps) => {
  const words = text.split(' ');
  const highlighted = new Set(highlightWords ?? []);
  const isHighlightedWord = (word: string) =>
    word === highlightWord || highlighted.has(word);

  return (
    <div
      className={`overlap-text ${direction === 'back' ? 'overlap-back' : ''} ${className}`}
      data-text={text}
    >
      {words.map((word, wordIndex) => {
        const isCurrentHighlighted = isHighlightedWord(word);
        const previousWord = words[wordIndex - 1];
        const nextWord = words[wordIndex + 1];
        const hasHighlightedPrevious =
          typeof previousWord === 'string' && isHighlightedWord(previousWord);
        const hasHighlightedNext =
          typeof nextWord === 'string' && isHighlightedWord(nextWord);

        let highlightJoinClass = '';
        if (isCurrentHighlighted && hasHighlightedPrevious && hasHighlightedNext) {
          highlightJoinClass = ' overlap-word-highlight-middle';
        } else if (isCurrentHighlighted && hasHighlightedPrevious) {
          highlightJoinClass = ' overlap-word-highlight-end';
        } else if (isCurrentHighlighted && hasHighlightedNext) {
          highlightJoinClass = ' overlap-word-highlight-start';
        }

        return (
          <span
            key={`${word}-${wordIndex}`}
            className={`overlap-word${isCurrentHighlighted ? ` overlap-word-highlight${highlightJoinClass}` : ''}`}
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
            <span
              className={`overlap-space${
                isCurrentHighlighted && hasHighlightedNext ? ' overlap-space-highlight-join' : ''
              }`}
            >
              &nbsp;
            </span>
          ) : null}
          </span>
        );
      })}
    </div>
  );
};

const QuoteText = ({ children }: { children: ReactNode }) => (
  <figure className="mt-8 sm:mt-[10%] max-w-full sm:max-w-3xl text-left">
    <blockquote className="hero-quote inline-block text-[1.35rem] sm:text-xl md:text-2xl lg:text-3xl text-white leading-snug sm:leading-relaxed font-semibold tracking-tight text-left">
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
      className="hero-section h-[1200px] flex flex-col items-center justify-center bg-transparent px-5 sm:px-6 relative overflow-hidden"
    >
      <div className="w-full max-w-5xl -mt-2 sm:-mt-20 select-none z-10 relative">
        <div className="space-y-2 text-left">
          <OverlapText
            text="Somos"
            direction="back"
            className="hero-title hero-overlap-text text-white"
          />
          <OverlapText
            text="KUATRO METRIC"
            direction="back"
            highlightWords={['KUATRO', 'METRIC']}
            className="hero-title hero-overlap-text text-white"
          />
        </div>
        <QuoteText>
          Agencia de growth marketing que combina estrategia, SEO &amp; performance, marketing de contenidos, desarrollo web, branding y automatización a medida para transformar tráfico en negocio real.
        </QuoteText>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="https://wa.me/5492604272400?text=Hola%20Kuatrometric%2C%20me%20gustar%C3%ADa%20agendar%20una%20llamada%20para%20hablar%20sobre%20mi%20proyecto."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-8 py-4 text-white font-semibold tracking-wide transition-transform duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
          >
            Hablemos por WhatsApp
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-white/80 font-semibold tracking-wide transition-colors duration-300 hover:text-white hover:border-white"
          >
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
}
