import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';

export default function Navbar() {
  const location = useLocation();
  const { theme, startExpanding, stopExpanding } = useTheme();
  const toggleRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoverWipe, setHoverWipe] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleToggleHoverEnter = () => {
    setHoverWipe(true);
    const rect = toggleRef.current?.getBoundingClientRect();
    if (rect) {
      startExpanding(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  const handleToggleHoverLeave = () => {
    setHoverWipe(false);
    stopExpanding();
  };

  const handleToggleClick = () => {
    // Click does nothing extra — hover drives it
  };

  const navLinks = [
    { label: '01. ORIGIN', path: '/' },
    { label: '02. ARCHIVE', path: '/projects' },
    { label: '03. INTEL', path: '/about' },
    { label: '04. CONNECT', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isLight = theme === 'light';

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 2.5rem',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: scrolled
          ? isLight ? 'rgba(249,249,246,0.92)' : 'rgba(10,10,10,0.92)'
          : 'transparent',
        borderBottom: scrolled ? `1px solid ${isLight ? '#e0e0e0' : '#1E1E1E'}` : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          color: '#00D4AA',
          textDecoration: 'none',
          fontWeight: 500,
        }}
      >
        JA//SYSTEM
      </Link>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ gap: '2.5rem', alignItems: 'center' }}>
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${isActive(path) ? 'active' : ''}`}
              style={{
                color: isActive(path) ? '#00D4AA' : isLight ? '#0A0A0A' : '#F5F5F5',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          ref={toggleRef}
          onMouseEnter={handleToggleHoverEnter}
          onMouseLeave={handleToggleHoverLeave}
          onClick={handleToggleClick}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            border: `1px solid ${hoverWipe ? '#00D4AA' : isLight ? '#ccc' : '#333'}`,
            borderRadius: '4px',
            backgroundColor: 'transparent',
            cursor: 'none',
            transition: 'border-color 0.3s ease, color 0.3s ease',
            outline: 'none',
            flexShrink: 0,
            color: hoverWipe ? '#00D4AA' : isLight ? '#0A0A0A' : '#F5F5F5',
          }}
          title={`Switch to ${isLight ? 'dark' : 'light'} theme`}
        >
          {isLight ? <Moon size={13} /> : <Sun size={13} />}
        </button>
      </div>
    </nav>
  );
}