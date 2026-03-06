'use client';

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';
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
    <span
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
              style={{ '--i': index + 1 } as CSSProperties}
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
    </span>
  );
};

const QuoteText = ({ children }: { children: ReactNode }) => (
  <figure className="mt-6 sm:mt-8 max-w-full sm:max-w-3xl text-left">
    <blockquote className="hero-quote inline-block text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-semibold tracking-tight text-left">
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
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const titles = heroRef.current?.querySelectorAll<HTMLElement>('.hero-title');
      const quote = heroRef.current?.querySelector<HTMLElement>('.hero-quote');

      if (titles && titles.length) {
        if (prefersReducedMotion) {
          gsap.set(titles, { opacity: 1, y: 0, filter: 'blur(0px)' });
        } else {
          gsap.fromTo(
            titles,
            { opacity: 0, y: 20, filter: 'blur(6px)' },
            {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.1,
            stagger: 0.08,
          }
          );
        }
      }

      if (titles && titles.length && !prefersReducedMotion) {
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
          delay: 0.95,
        });
      }

      if (quote) {
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
      className="hero-section min-h-[660px] md:min-h-[840px] flex flex-col items-center justify-start pt-14 sm:pt-24 md:pt-36 bg-transparent px-5 sm:px-6 relative overflow-hidden"
    >
      <div className="w-full max-w-5xl select-none z-10 relative">
        <h1 className="space-y-2 text-left flex flex-col">
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
        </h1>
        <QuoteText>
          Agencia de marketing digital que combina estrategia, SEO &amp; performance, contenidos, desarrollo web y automatización para convertir tráfico en negocio real.
        </QuoteText>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <a
            href="https://wa.me/5492604272400?text=Hola%20Kuatrometric%2C%20me%20gustar%C3%ADa%20agendar%20una%20llamada%20para%20hablar%20sobre%20mi%20proyecto."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-8 py-4 text-black font-semibold tracking-wide transition-[background-color,color,border-color,transform] duration-300 hover:scale-[1.02] hover:bg-[#e40014] hover:text-white hover:border-[#e40014] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e40014]"
          >
            Hablemos por WhatsApp
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center justify-center rounded-full border border-white px-8 py-4 text-white font-semibold tracking-wide transition-colors duration-300 hover:text-white hover:border-[#e40014]"
          >
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
}
