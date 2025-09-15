'use client';

import { useState, useEffect, useMemo } from 'react';

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Breakpoint = keyof typeof breakpoints;

export const useBreakpoint = (): { isMobile: boolean; screen: Record<Breakpoint, boolean> } => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    function getBreakpoint(width: number): Breakpoint {
      if (width >= breakpoints['2xl']) return '2xl';
      if (width >= breakpoints.xl) return 'xl';
      if (width >= breakpoints.lg) return 'lg';
      if (width >= breakpoints.md) return 'md';
      if (width >= breakpoints.sm) return 'sm';
      return 'xs';
    }

    function updateBreakpoint() {
      const width = window.innerWidth;
      setBreakpoint(getBreakpoint(width));
    }

    updateBreakpoint();

    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  const screen = useMemo(() => {
    const screens = {
      xs: breakpoint === 'xs',
      sm: breakpoint === 'sm',
      md: breakpoint === 'md',
      lg: breakpoint === 'lg',
      xl: breakpoint === 'xl',
      '2xl': breakpoint === '2xl',
    };

    return screens;
  }, [breakpoint]);

  const isMobile = useMemo(() => {
    if (!isClient) return false;
    return screen.xs || screen.sm || screen.md;
  }, [screen, isClient]);

  return { isMobile, screen };
};
