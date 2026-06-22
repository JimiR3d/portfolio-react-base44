import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Paperclip } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import ScrambleText from '@/components/ScrambleText';

export default function Contact() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [resumeFile, setResumeFile] = useState(null);

  const borderColor = isLight ? '#e0e0e0' : '#1E1E1E';
  const textColor = isLight ? '#0A0A0A' : '#F5F5F5';
  const mutedColor = '#888888';

  const LINKS = [
    {
      label: 'EMAIL',
      value: 'folajinmi13@gmail.com',
      href: 'mailto:folajinmi13@gmail.com',
      description: 'Primary contact',
      icon: Mail,
    },
    {
      label: 'GITHUB',
      value: 'github.com/JimiR3d',
      href: 'https://github.com/JimiR3d',
      description: 'Code & projects',
      icon: Github,
    },
    {
      label: 'LINKEDIN',
      value: 'Oluwafolajinmi Aboderin',
      href: 'https://www.linkedin.com/in/oluwafolajinmi-aboderin-695848249/',
      description: 'Professional network',
      icon: Linkedin,
    },
  ];

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '5rem 2.5rem',
        minHeight: 'calc(100vh - 60px - 80px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '5rem' }}
      >
        <p className="section-label" style={{ marginBottom: '1.5rem' }}>
          [SECTION.04 // CONNECT]
        </p>
        <h2
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 500,
            color: textColor,
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          <ScrambleText text="OPEN A" trigger speed={30} delay={200} />
          <br />
          <span style={{ color: '#00D4AA' }}>
            <ScrambleText text="CHANNEL" trigger speed={30} delay={600} />
          </span>
        </h2>
        <p
          style={{
            marginTop: '1.5rem',
            fontSize: '0.9rem',
            color: mutedColor,
            maxWidth: '440px',
            lineHeight: 1.7,
          }}
        >
          Open to data analyst, data engineering, and regulatory automation roles.
          Building RegTech tools for African financial institutions.
        </p>
      </motion.div>

      {/* Contact links */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1px',
          flex: 1,
        }}
      >
        {LINKS.map((link, i) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={i}
              href={link.href}
              target={link.href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr auto',
                alignItems: 'center',
                gap: '2rem',
                padding: '2rem 2.5rem',
                border: `1px solid ${borderColor}`,
                textDecoration: 'none',
                transition: 'border-color 0.25s ease, background-color 0.25s ease',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#00D4AA';
                e.currentTarget.style.backgroundColor = isLight
                  ? 'rgba(0,212,170,0.03)'
                  : 'rgba(0,212,170,0.03)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = borderColor;
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span className="section-label">[{link.label}]</span>
              <div>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.95rem', color: textColor, margin: 0 }}>
                  {link.value}
                </p>
                <p style={{ fontSize: '0.75rem', color: mutedColor, margin: '0.25rem 0 0' }}>
                  {link.description}
                </p>
              </div>
              <Icon size={14} style={{ color: '#00D4AA' }} />
            </motion.a>
          );
        })}
      </div>

      {/* Resume — bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '0.75rem',
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: `1px solid ${borderColor}`,
        }}
      >
        <label
          htmlFor="resume-upload"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            color: resumeFile ? '#00D4AA' : mutedColor,
            cursor: 'none',
            transition: 'color 0.2s ease',
            userSelect: 'none',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#00D4AA'}
          onMouseLeave={e => e.currentTarget.style.color = resumeFile ? '#00D4AA' : mutedColor}
        >
          <Paperclip size={10} />
          {resumeFile ? resumeFile.name : 'ATTACH RESUME // CV'}
        </label>
        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          style={{ display: 'none' }}
          onChange={e => e.target.files?.[0] && setResumeFile(e.target.files[0])}
        />
      </motion.div>
    </div>
  );
}
