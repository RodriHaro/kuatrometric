'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-[#111111] via-[#050205] to-[#e40014]/40 text-white shadow-lg shadow-black/50 backdrop-blur-md transition-transform transition-colors duration-300 ease-out hover:-translate-y-0.5 hover:border-white/30 hover:from-[#181818] hover:via-[#050205] hover:to-[#e40014]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#e40014] focus-visible:ring-offset-black"
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

