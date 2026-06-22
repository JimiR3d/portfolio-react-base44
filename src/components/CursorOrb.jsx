import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';

export default function CursorOrb() {
  const posRef = useRef({ x: -200, y: -200 });
  const currentRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const orbRef = useRef(null);
  const dotRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, posRef.current.x, 0.08);
      currentRef.current.y = lerp(currentRef.current.y, posRef.current.y, 0.08);

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${currentRef.current.x - 100}px, ${currentRef.current.y - 100}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x - 3}px, ${posRef.current.y - 3}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const isLight = theme === 'light';
  const orbOpacity = isLight ? 0.25 : 0.12;

  return (
    <div className="custom-cursor">
      {/* Glow orb */}
      <div
        ref={orbRef}
        style={{
          position: 'fixed',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(0,212,170,${orbOpacity * 2}) 0%, rgba(0,212,170,${orbOpacity}) 40%, transparent 70%)`,
          pointerEvents: 'none',
          willChange: 'transform',
          top: 0,
          left: 0,
        }}
      />
      {/* Dot cursor */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: isLight ? '#111111' : '#00D4AA',
          boxShadow: isLight ? '0 0 0 1.5px rgba(0,212,170,0.6)' : '0 0 6px rgba(0,212,170,0.6)',
          pointerEvents: 'none',
          willChange: 'transform',
          top: 0,
          left: 0,
          opacity: 1,
        }}
      />
    </div>
  );
}