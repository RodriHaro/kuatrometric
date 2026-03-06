'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';

declare global {
  interface WindowEventMap {
    mobileMenuStateChange: CustomEvent<{ isOpen: boolean }>;
  }
}

const WHATSAPP_NUMBER = '5492604272400';
const WHATSAPP_MESSAGE =
  'Hola%20Kuatrometric%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20sus%20servicios.';

const CARD_WIDTH = 320;
const ANIM_DURATION = 1.4;
const EASE = 'power2.out';

function WhatsAppIcon({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>
  );
}

export default function WhatsappButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const shouldShow = isVisible && !isMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible((previous) => {
        if (window.scrollY > 220) return true;
        if (window.scrollY < 140) return false;
        return previous;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncInitialState = () => {
      setIsMenuOpen(document.body.dataset.mobileMenuOpen === 'true');
    };

    const handleMenuState = (event: CustomEvent<{ isOpen: boolean }>) => {
      setIsMenuOpen(event.detail.isOpen);
    };

    syncInitialState();
    window.addEventListener('mobileMenuStateChange', handleMenuState);

    return () => {
      window.removeEventListener('mobileMenuStateChange', handleMenuState);
    };
  }, []);

  const getDuration = useCallback(() => {
    if (typeof window === 'undefined') return ANIM_DURATION;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 0.3
      : ANIM_DURATION;
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    const duration = getDuration();
    gsap.to(cardRef.current, {
      width: CARD_WIDTH,
      opacity: 1,
      x: 0,
      duration,
      ease: EASE,
      overwrite: true,
    });
  }, [getDuration]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    const duration = getDuration();
    gsap.to(cardRef.current, {
      width: 0,
      opacity: 0,
      x: 12,
      duration: duration * 0.8,
      ease: 'power2.in',
      overwrite: true,
    });
  }, [getDuration]);

  useEffect(() => {
    if (shouldShow || !cardRef.current) return;
    gsap.set(cardRef.current, { width: 0, opacity: 0, x: 12 });
  }, [shouldShow]);

  return (
    <div
      className={`fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 flex flex-col items-end gap-3 origin-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        shouldShow
          ? 'opacity-100 translate-y-0 scale-100 rotate-0 pointer-events-auto'
          : 'opacity-0 translate-y-2 scale-95 rotate-0 pointer-events-none'
      }`}
      aria-hidden={!shouldShow}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversación de WhatsApp con Kuatrometric"
        className="group pointer-events-auto flex items-end justify-end gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-black hidden sm:flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Card que se desprende del botón al hacer hover (animado con GSAP) */}
        <div
          ref={cardRef}
          className="overflow-hidden will-change-[width,opacity,transform]"
          style={{ width: 0, opacity: 0, transform: 'translateX(12px)' }}
          aria-hidden="true"
        >
          <div className="w-[300px] pr-2">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/70 px-4 py-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-shadow duration-500 group-hover:border-white/25 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.12),0_0_24px_rgba(37,211,102,0.14)]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(228,0,20,0.28),transparent_62%)] opacity-80"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#25D366]/15 to-transparent"
              />
              <div className="relative flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/20 ring-2 ring-white/5 md:h-14 md:w-14">
                  <Image
                    src="/paolo.jpeg"
                    alt="Contacto de Kuatrometric"
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border border-black/60 bg-[#25D366] motion-safe:animate-pulse"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff4f5f]">
                    Equipo Kuatrometric
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-tight text-white">
                    ¿Hablamos por WhatsApp?
                  </p>
                  <p className="mt-1 text-xs leading-snug text-white/75">
                    Contanos tu idea y te respondemos con una propuesta clara.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón circular siempre visible */}
        <span className="relative inline-flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_rgba(37,211,102,0.42)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[1px] group-hover:scale-[1.02] group-hover:shadow-[0_14px_32px_rgba(37,211,102,0.45),0_0_0_1px_rgba(255,255,255,0.2),0_0_22px_rgba(37,211,102,0.25)]">
          <span
            aria-hidden="true"
            className="absolute -inset-0.5 rounded-full border border-white/30 transition-colors duration-500 group-hover:border-white/45"
          />
          <span
            aria-hidden="true"
            className="absolute -inset-1 rounded-full border border-[#e40014]/0 transition-colors duration-500 group-hover:border-[#e40014]/45"
          />
          <WhatsAppIcon className="relative h-9 w-9 transition-transform duration-500 group-hover:-translate-y-[1px]" />
          <span className="sr-only">Abrir WhatsApp</span>
        </span>
      </Link>

      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversación de WhatsApp con Kuatrometric"
        className="sm:hidden group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_32px_rgba(37,211,102,0.45)] transition duration-500 ease-out hover:-translate-y-[1px] hover:scale-[1.005] hover:shadow-[0_14px_32px_rgba(37,211,102,0.45),0_0_0_1px_rgba(255,255,255,0.2),0_0_22px_rgba(37,211,102,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#25D366]/50 opacity-0 blur-md transition-opacity duration-500 ease-out group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          className="absolute -inset-0.5 rounded-full border border-white/25 transition-colors duration-500 ease-out group-hover:border-white/40"
        />
        <span
          aria-hidden="true"
          className="absolute -inset-0.5 rounded-full border border-[#e40014]/0 transition-colors duration-700 ease-out group-hover:border-[#e40014]/50"
        />
        <WhatsAppIcon className="relative h-9 w-9 transition-transform duration-500 ease-out group-hover:-translate-y-[1px]" />
        <span className="sr-only">Abrir WhatsApp</span>
      </Link>
    </div>
  );
}
