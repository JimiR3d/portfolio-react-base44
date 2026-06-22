import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import ScrambleText from '@/components/ScrambleText';
import RotatingText from '@/components/RotatingText';
import { useTheme } from '@/lib/ThemeContext';
import { motion } from 'framer-motion';

export default function Home() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const roles = [
    'DATA ANALYST',
    'REGULATORY AUTOMATION',
    'PYTHON · SQL · POWER BI',
    'FINTECH ENGINEER',
    'CBN // BASEL III',
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', position: 'relative', overflow: 'hidden' }}>

      {/* Grid background */}
      <div
        className="grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: isLight ? 0.6 : 1,
        }}
      />

      {/* Hero */}
      <section
        style={{
          minHeight: 'calc(100vh - 60px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 2.5rem',
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="section-label"
          style={{ marginBottom: '2rem' }}
        >
          [SECTION.01 // ORIGIN]
        </motion.p>

        {/* Main headline */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 'clamp(2.8rem, 8vw, 7rem)',
              fontWeight: 500,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: isLight ? '#0A0A0A' : '#F5F5F5',
              margin: 0,
            }}
          >
            <ScrambleText
              text="JIMI"
              trigger={mounted}
              speed={35}
              delay={300}
            />
          </h1>
          <h1
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 'clamp(2.8rem, 8vw, 7rem)',
              fontWeight: 500,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: '#00D4AA',
              margin: 0,
            }}
          >
            <ScrambleText
              text="ABODERIN"
              trigger={mounted}
              speed={35}
              delay={600}
            />
          </h1>
        </div>

        {/* Rotating subtitle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '1px',
              backgroundColor: '#00D4AA',
            }}
          />
          <span
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 'clamp(0.75rem, 2vw, 1rem)',
              letterSpacing: '0.15em',
              color: '#888888',
              minWidth: '260px',
            }}
          >
            <RotatingText items={roles} interval={2600} />
          </span>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          style={{
            maxWidth: '520px',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            color: isLight ? '#444' : '#888888',
            marginBottom: '3rem',
          }}
        >
          Data Analyst. Specialising in Basel III compliance, CBN regulatory reporting, and
          financial analytics. Based in Lagos, Nigeria.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
        >
          <Link
            to="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.7rem 1.5rem',
              backgroundColor: '#00D4AA',
              color: '#0A0A0A',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            VIEW ARCHIVE <ArrowRight size={12} />
          </Link>

          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.7rem 1.5rem',
              border: `1px solid ${isLight ? '#ccc' : '#333'}`,
              color: isLight ? '#0A0A0A' : '#F5F5F5',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#00D4AA';
              e.currentTarget.style.color = '#00D4AA';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = isLight ? '#ccc' : '#333';
              e.currentTarget.style.color = isLight ? '#0A0A0A' : '#F5F5F5';
            }}
          >
            CONNECT
          </Link>

          <div style={{ display: 'flex', gap: '0.75rem', marginLeft: '0.5rem' }}>
            <a
              href="https://github.com/JimiR3d"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#888', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#00D4AA'}
              onMouseLeave={e => e.currentTarget.style.color = '#888'}
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/oluwafolajinmi-aboderin-695848249/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#888', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#00D4AA'}
              onMouseLeave={e => e.currentTarget.style.color = '#888'}
            >
              <Linkedin size={16} />
            </a>
          </div>
        </motion.div>

        {/* Bottom status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            right: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <span className="section-label">STATUS // OPEN TO WORK</span>
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#00D4AA',
              boxShadow: '0 0 8px #00D4AA',
              animation: 'pulse 2s ease infinite',
            }}
          />
        </motion.div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
