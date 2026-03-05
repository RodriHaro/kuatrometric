'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useCallback } from 'react';
import gsap from 'gsap';

const WHATSAPP_NUMBER = '5492604272400';
const WHATSAPP_MESSAGE =
  'Hola%20Kuatrometric%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20sus%20servicios.';

const CARD_WIDTH = 320;
const ANIM_DURATION = 1.4;
const EASE = 'power2.out';

export default function WhatsappButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  const cardRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 flex flex-col items-end gap-3">
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
          <svg
            aria-hidden="true"
            className="relative h-7 w-7 transition-transform duration-500 group-hover:-translate-y-[1px]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.04 3.5C7.88 3.5 4.5 6.77 4.5 10.86c0 1.5.45 2.88 1.23 4.04L4 20l5.3-1.7a7.9 7.9 0 0 0 2.74.47c4.16 0 7.56-3.27 7.56-7.36 0-4.1-3.4-7.37-7.56-7.37Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.4 9.03c-.16-.37-.33-.38-.48-.38h-.4c-.14 0-.37.05-.57.24-.2.19-.76.74-.76 1.8 0 1.06.78 2.1.89 2.25.11.15 1.52 2.4 3.77 3.27 1.87.74 2.25.7 2.65.62.41-.08 1.3-.52 1.48-1.03.18-.51.18-.95.13-1.03-.05-.08-.2-.13-.41-.24-.21-.11-1.3-.64-1.51-.71-.2-.08-.35-.11-.48.11-.14.22-.55.71-.67.86-.12.15-.25.17-.46.06-.21-.11-.88-.32-1.67-1.01-.62-.54-1.04-1.21-1.16-1.42-.12-.21-.01-.32.09-.43.09-.09.21-.24.32-.36.11-.12.14-.2.21-.33.07-.13.03-.24-.02-.35-.05-.11-.48-1.18-.66-1.61Z"
              fill="currentColor"
            />
          </svg>
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
          className="absolute -inset-1 rounded-full border border-white/25 transition-colors duration-500 ease-out group-hover:border-white/40"
        />
        <span
          aria-hidden="true"
          className="absolute -inset-1 rounded-full border border-[#e40014]/0 transition-colors duration-700 ease-out group-hover:border-[#e40014]/50"
        />
        <svg
          aria-hidden="true"
          className="relative h-7 w-7 transition-transform duration-500 ease-out group-hover:-translate-y-[1px]"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12.04 3.5C7.88 3.5 4.5 6.77 4.5 10.86c0 1.5.45 2.88 1.23 4.04L4 20l5.3-1.7a7.9 7.9 0 0 0 2.74.47c4.16 0 7.56-3.27 7.56-7.36 0-4.1-3.4-7.37-7.56-7.37Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.4 9.03c-.16-.37-.33-.38-.48-.38h-.4c-.14 0-.37.05-.57.24-.2.19-.76.74-.76 1.8 0 1.06.78 2.1.89 2.25.11.15 1.52 2.4 3.77 3.27 1.87.74 2.25.7 2.65.62.41-.08 1.3-.52 1.48-1.03.18-.51.18-.95.13-1.03-.05-.08-.2-.13-.41-.24-.21-.11-1.3-.64-1.51-.71-.2-.08-.35-.11-.48.11-.14.22-.55.71-.67.86-.12.15-.25.17-.46.06-.21-.11-.88-.32-1.67-1.01-.62-.54-1.04-1.21-1.16-1.42-.12-.21-.01-.32.09-.43.09-.09.21-.24.32-.36.11-.12.14-.2.21-.33.07-.13.03-.24-.02-.35-.05-.11-.48-1.18-.66-1.61Z"
            fill="currentColor"
          />
        </svg>
        <span className="sr-only">Abrir WhatsApp</span>
      </Link>
    </div>
  );
}


