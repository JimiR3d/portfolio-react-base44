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

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <a
          href="/OLUWAFOLAJINMI_DAVID_ABODERIN_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            color: '#00D4AA',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#00B894'}
          onMouseLeave={e => e.currentTarget.style.color = '#00D4AA'}
        >
          [RESUME]
        </a>
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
      </div>
    </footer>
  );
}
