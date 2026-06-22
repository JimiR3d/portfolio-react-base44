import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

export default function ThemeWipe() {
  const { wipeState, theme } = useTheme();

  if (!wipeState || wipeState.progress <= 0) return null;

  const { x, y, progress } = wipeState;

  // Max radius to cover full viewport diagonal
  const maxRadius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
  const radius = maxRadius * progress;

  // The circle shows the NEXT theme's color
  const nextThemeBg = theme === 'dark' ? '#F9F9F6' : '#0A0A0A';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9990,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          borderRadius: '50%',
          background: nextThemeBg,
          width: radius * 2,
          height: radius * 2,
          left: x - radius,
          top: y - radius,
          opacity: 0.15 + progress * 0.85, // fades in gradually
        }}
      />
    </div>
  );
}