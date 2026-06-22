import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/lib/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <footer
      style={{
        borderTop: `1px solid ${isLight ? '#e0e0e0' : '#1E1E1E'}`,
        padding: '2rem 2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <span
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          color: '#888888',
        }}
      >
        LAGOS // 6.5244° N, 3.3792° E
      </span>

      <span
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          color: '#888888',
        }}
      >
        ©2026 SYSTEM_CORE // JimiR3d
      </span>
    </footer>
  );
}