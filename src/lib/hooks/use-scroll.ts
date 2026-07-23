'use client';
import { useEffect, useState, useRef } from 'react';

export function useScroll() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const scrollDirectionRef = useRef<'up' | 'down'>('up');
  const isAtTopRef = useRef(true);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const nextDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      const nextIsAtTop = currentScrollY <= 0;

      if (nextDirection !== scrollDirectionRef.current || nextIsAtTop !== isAtTopRef.current) {
        scrollDirectionRef.current = nextDirection;
        isAtTopRef.current = nextIsAtTop;
        setScrollDirection(nextDirection);
        setIsAtTop(nextIsAtTop);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollDirection, isAtTop };
}
