import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

export default function ViewportBorder() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      style={{
        position: 'fixed',
        inset: '12px',
        border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.04)'}`,
        pointerEvents: 'none',
        zIndex: 100,
        transition: 'border-color 0.5s ease',
      }}
    />
  );
}