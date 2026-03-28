'use client';

import { useEffect, useRef, useCallback } from 'react';

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

const DEFAULT_OPTIONS: RevealOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px',
  once: true,
};

/**
 * Custom hook that adds a `data-visible` attribute to observed elements
 * when they enter the viewport. Works with CSS-only scroll animations,
 * eliminating the need for framer-motion's `whileInView`.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: RevealOptions
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { threshold, rootMargin, once } = { ...DEFAULT_OPTIONS, ...options };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-visible', 'true');
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.removeAttribute('data-visible');
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}

/**
 * Attaches scroll-reveal to multiple children inside a container.
 * Each child with `[data-reveal]` gets staggered `data-visible`.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options?: RevealOptions & { staggerMs?: number }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const { threshold, rootMargin, once, staggerMs = 80 } = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    const children = container.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!children.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => {
              child.setAttribute('data-visible', 'true');
            }, i * staggerMs);
          });
          if (once) observer.unobserve(container);
        } else if (!once) {
          children.forEach((child) => child.removeAttribute('data-visible'));
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
