'use client';

import Image from 'next/image';
import Link from 'next/link';

const WHATSAPP_NUMBER = '5492604272400';
const WHATSAPP_MESSAGE =
  'Hola%20Kuatrometric%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20sus%20servicios.';

export default function WhatsappButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 pointer-events-none flex flex-col items-end gap-2">
      {/* Avatar + burbuja de diálogo encima del botón */}
      <div className="hidden sm:block pointer-events-auto">
        <div className="flex items-center gap-3 mb-1 justify-end">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/15 bg-black/60 shadow-lg shadow-black/40">
            <Image
              src="/paolo.jpeg"
              alt="Contacto de Kuatrometric"
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative max-w-[280px] rounded-2xl border border-white/15 bg-black/80 px-5 py-3.5 shadow-lg shadow-black/40 backdrop-blur-md">
            <p className="text-xs md:text-sm text-white/90 font-semibold tracking-wide">
              ¿Hablamos por WhatsApp?
            </p>
            <p className="mt-1 text-[11px] md:text-sm text-white/75 leading-snug">
              Contáctanos y vemos tu proyecto.
            </p>
          </div>
        </div>
      </div>

      {/* Botón flotante */}
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversación de WhatsApp con Kuatrometric"
        className="pointer-events-auto group relative inline-flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-all duration-200 hover:shadow-xl hover:shadow-[#25D366]/60 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-black w-14 h-14 md:w-16 md:h-16"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#25D366]/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        <span
          aria-hidden="true"
          className="absolute -inset-1 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-200"
        />

        <svg
          aria-hidden="true"
          className="relative w-7 h-7 md:w-8 md:h-8"
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

        <span className="sr-only">WhatsApp</span>
      </Link>
    </div>
  );
}


