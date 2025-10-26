'use client';

import { useEffect, useRef, MutableRefObject } from 'react';

interface LocomotiveScrollInstance {
  init(): void;
  destroy(): void;
  start(): void;
  stop(): void;
  update(): void;
  scrollTo(target: string | number | HTMLElement, options?: any): void;
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
}

interface LocomotiveScrollOptions {
  el: HTMLElement;
  smooth?: boolean;
  direction?: 'horizontal' | 'vertical';
  lerp?: number;
  multiplier?: number;
  class?: string;
  scrollbarContainer?: HTMLElement | string | boolean;
  scrollbarClass?: string;
  scrollingClass?: string;
  draggingClass?: string;
  smoothClass?: string;
  initClass?: string;
  getSpeed?: boolean;
  getDirection?: boolean;
  scrollFromAnywhere?: boolean;
  touchMultiplier?: number;
  smartphone?: {
    smooth?: boolean;
    direction?: string;
    horizontalGesture?: boolean;
  };
  tablet?: {
    smooth?: boolean;
    direction?: string;
    horizontalGesture?: boolean;
    breakpoint?: number;
  };
  reloadOnContextChange?: boolean;
  resetNativeScroll?: boolean;
}

declare global {
  interface Window {
    LocomotiveScroll: new (options: LocomotiveScrollOptions) => LocomotiveScrollInstance;
  }
}

export const useLocomotiveScroll = (
  start: boolean = true,
  options: Partial<LocomotiveScrollOptions> = {}
): [MutableRefObject<HTMLDivElement | null>, LocomotiveScrollInstance | null] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const locomotiveScrollRef = useRef<LocomotiveScrollInstance | null>(null);

  useEffect(() => {
    if (!start || !ref.current) return;

    const initLocomotiveScroll = async () => {
      try {
        // Dynamically import locomotive-scroll
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        
        // Import CSS
        await import('locomotive-scroll/dist/locomotive-scroll.css');

        if (ref.current && !locomotiveScrollRef.current) {
          locomotiveScrollRef.current = new LocomotiveScroll({
            el: ref.current,
            smooth: true,
            lerp: 0.1,
            multiplier: 1,
            smartphone: {
              smooth: false
            },
            tablet: {
              smooth: false,
              breakpoint: 1024
            },
            ...options
          } as LocomotiveScrollOptions);

          // Initialize
          locomotiveScrollRef.current.init();
        }
      } catch (error) {
        console.error('Error initializing Locomotive Scroll:', error);
      }
    };

    initLocomotiveScroll();

    // Cleanup function
    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
        locomotiveScrollRef.current = null;
      }
    };
  }, [start, options]);

  // Update scroll on route changes or content changes
  useEffect(() => {
    if (locomotiveScrollRef.current) {
      const timer = setTimeout(() => {
        locomotiveScrollRef.current?.update();
      }, 500);

      return () => clearTimeout(timer);
    }
  });

  return [ref, locomotiveScrollRef.current];
};