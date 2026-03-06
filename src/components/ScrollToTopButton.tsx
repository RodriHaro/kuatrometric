'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight;
      setIsVisible(scrollBottom >= pageBottom - 4);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className={`fixed bottom-6 md:bottom-8 left-6 md:left-8 z-40 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-[#111111] via-[#050205] to-[#e40014]/40 text-white shadow-lg shadow-black/50 backdrop-blur-md transition-[opacity,transform,border-color,background] duration-500 ease-out hover:-translate-y-0.5 hover:border-white/30 hover:from-[#181818] hover:via-[#050205] hover:to-[#e40014]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#e40014] focus-visible:ring-offset-black ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
      }`}
      aria-hidden={!isVisible}
    >
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 5L5 12M12 5L19 12M12 5V19"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
